-- 1. Update players table with total fantasy points from player_match_stats
UPDATE players 
SET fantasy_points = subquery.total_points
FROM (
    SELECT 
        player_id,
        SUM(fantasy_points) AS total_points
    FROM player_match_stats 
    GROUP BY player_id
) AS subquery
WHERE players.player_id = subquery.player_id;




-- 2. Preview the update (SELECT version)
SELECT 
    p.player_id,
    p.first_name,
    p.fantasy_price,
    COALESCE(subquery.total_points, 0) AS new_fantasy_points
FROM players p
LEFT JOIN (
    SELECT 
        player_id,
        SUM(fantasy_points) AS total_points
    FROM player_match_stats 
    GROUP BY player_id
) AS subquery ON p.player_id = subquery.player_id
ORDER BY new_fantasy_points DESC;


--to be inserted in the database after gameweek 3 is current



INSERT INTO fantasy_team_players (
    fantasy_team_id,
    player_id,
    is_captain,
    is_vice_captain,
    is_starting,
    gameweek_id
)
SELECT 
    fantasy_team_id,
    player_id,
    is_captain,
    is_vice_captain,
    is_starting,
    4 as gameweek_id  -- Change gameweek_id to 4
FROM fantasy_team_players 
WHERE gameweek_id = 3;






----updating total pointss for each team 

-- First: Show what will be inserted (READ ONLY - no table update)
WITH team_players AS (
  -- 1. Get fantasy_team_players and gameweek_id for all fantasy_teams
  SELECT 
    ftp.fantasy_team_id,
    ftp.player_id,
    ftp.gameweek_id,
    ftp.is_captain,
    ftp.is_vice_captain
  FROM fantasy_team_players ftp
),
completed_fixtures AS (
  -- 2. Get completed fixtures by the gameweeks
  SELECT 
    f.fixture_id,
    f.gameweek_id
  FROM fixtures f
  WHERE f.status = 'COMPLETED'
  AND f.gameweek_id IN (SELECT DISTINCT gameweek_id FROM team_players)
),
player_stats AS (
  -- 3. Get player stats from player_match_stats for these players for those fixtures
  SELECT 
    pms.player_id,
    pms.fantasy_points,
    pms.minutes_played,
    cf.gameweek_id
  FROM player_match_stats pms
  JOIN completed_fixtures cf ON pms.fixture_id = cf.fixture_id
  WHERE pms.player_id IN (SELECT DISTINCT player_id FROM team_players)
),
player_gameweek_totals AS (
  -- Calculate total minutes and points per player per gameweek per team
  SELECT 
    tp.fantasy_team_id,
    tp.player_id,
    tp.gameweek_id,
    tp.is_captain,
    tp.is_vice_captain,
    COALESCE(SUM(ps.minutes_played), 0) as total_minutes,
    COALESCE(SUM(ps.fantasy_points), 0) as total_points
  FROM team_players tp
  LEFT JOIN player_stats ps ON tp.player_id = ps.player_id AND tp.gameweek_id = ps.gameweek_id
  GROUP BY tp.fantasy_team_id, tp.player_id, tp.gameweek_id, tp.is_captain, tp.is_vice_captain
),
captain_logic AS (
  -- 4. Apply captain 2x if minutes played, if captain doesn't play then vice captain
  SELECT 
    fantasy_team_id,
    gameweek_id,
    CASE 
      WHEN MAX(CASE WHEN is_captain = true AND total_minutes > 0 THEN 1 ELSE 0 END) = 1 THEN
        (SELECT player_id FROM player_gameweek_totals pgt2 
         WHERE pgt2.fantasy_team_id = pgt1.fantasy_team_id 
         AND pgt2.gameweek_id = pgt1.gameweek_id 
         AND pgt2.is_captain = true AND pgt2.total_minutes > 0)
      WHEN MAX(CASE WHEN is_vice_captain = true AND total_minutes > 0 THEN 1 ELSE 0 END) = 1 THEN
        (SELECT player_id FROM player_gameweek_totals pgt2 
         WHERE pgt2.fantasy_team_id = pgt1.fantasy_team_id 
         AND pgt2.gameweek_id = pgt1.gameweek_id 
         AND pgt2.is_vice_captain = true AND pgt2.total_minutes > 0)
      ELSE NULL
    END as captain_player_id
  FROM player_gameweek_totals pgt1
  GROUP BY fantasy_team_id, gameweek_id
),
team_totals AS (
  -- 5. Aggregate over all gameweeks found for each team
  SELECT 
    pgt.fantasy_team_id,
    SUM(
      CASE 
        WHEN cl.captain_player_id = pgt.player_id THEN pgt.total_points * 2
        ELSE pgt.total_points
      END
    ) as total_points
  FROM player_gameweek_totals pgt
  LEFT JOIN captain_logic cl ON pgt.fantasy_team_id = cl.fantasy_team_id AND pgt.gameweek_id = cl.gameweek_id
  GROUP BY pgt.fantasy_team_id
)
-- Show what will be inserted (READ ONLY)
SELECT 
  tt.fantasy_team_id,
  ft.team_name,
  ft.total_points as current_points,
  COALESCE(tt.total_points, 0) as calculated_points,
  CASE 
    WHEN ft.total_points != COALESCE(tt.total_points, 0) THEN 'WILL UPDATE'
    ELSE 'NO CHANGE'
  END as status
FROM team_totals tt
JOIN fantasy_teams ft ON tt.fantasy_team_id = ft.fantasy_team_id
ORDER BY tt.fantasy_team_id;






--update query

-- Now run the UPDATE query





WITH team_players AS (
  SELECT 
    ftp.fantasy_team_id,
    ftp.player_id,
    ftp.gameweek_id,
    ftp.is_captain,
    ftp.is_vice_captain
  FROM fantasy_team_players ftp
),
completed_fixtures AS (
  SELECT 
    f.fixture_id,
    f.gameweek_id
  FROM fixtures f
  WHERE f.status = 'COMPLETED'
  AND f.gameweek_id IN (SELECT DISTINCT gameweek_id FROM team_players)
),
player_stats AS (
  SELECT 
    pms.player_id,
    pms.fantasy_points,
    pms.minutes_played,
    cf.gameweek_id
  FROM player_match_stats pms
  JOIN completed_fixtures cf ON pms.fixture_id = cf.fixture_id
  WHERE pms.player_id IN (SELECT DISTINCT player_id FROM team_players)
),
player_gameweek_totals AS (
  SELECT 
    tp.fantasy_team_id,
    tp.player_id,
    tp.gameweek_id,
    tp.is_captain,
    tp.is_vice_captain,
    COALESCE(SUM(ps.minutes_played), 0) as total_minutes,
    COALESCE(SUM(ps.fantasy_points), 0) as total_points
  FROM team_players tp
  LEFT JOIN player_stats ps ON tp.player_id = ps.player_id AND tp.gameweek_id = ps.gameweek_id
  GROUP BY tp.fantasy_team_id, tp.player_id, tp.gameweek_id, tp.is_captain, tp.is_vice_captain
),
captain_logic AS (
  SELECT 
    fantasy_team_id,
    gameweek_id,
    CASE 
      WHEN MAX(CASE WHEN is_captain = true AND total_minutes > 0 THEN 1 ELSE 0 END) = 1 THEN
        (SELECT player_id FROM player_gameweek_totals pgt2 
         WHERE pgt2.fantasy_team_id = pgt1.fantasy_team_id 
         AND pgt2.gameweek_id = pgt1.gameweek_id 
         AND pgt2.is_captain = true AND pgt2.total_minutes > 0)
      WHEN MAX(CASE WHEN is_vice_captain = true AND total_minutes > 0 THEN 1 ELSE 0 END) = 1 THEN
        (SELECT player_id FROM player_gameweek_totals pgt2 
         WHERE pgt2.fantasy_team_id = pgt1.fantasy_team_id 
         AND pgt2.gameweek_id = pgt1.gameweek_id 
         AND pgt2.is_vice_captain = true AND pgt2.total_minutes > 0)
      ELSE NULL
    END as captain_player_id
  FROM player_gameweek_totals pgt1
  GROUP BY fantasy_team_id, gameweek_id
),
team_totals AS (
  SELECT 
    pgt.fantasy_team_id,
    SUM(
      CASE 
        WHEN cl.captain_player_id = pgt.player_id THEN pgt.total_points * 2
        ELSE pgt.total_points
      END
    ) as total_points
  FROM player_gameweek_totals pgt
  LEFT JOIN captain_logic cl ON pgt.fantasy_team_id = cl.fantasy_team_id AND pgt.gameweek_id = cl.gameweek_id
  GROUP BY pgt.fantasy_team_id
)
UPDATE fantasy_teams 
SET 
  total_points = COALESCE(tt.total_points, 0),
  last_updated = CURRENT_TIMESTAMP
FROM team_totals tt
WHERE fantasy_teams.fantasy_team_id = tt.fantasy_team_id;






-- Calculate fantasy points for one gameweek

-- Calculate total fantasy points for ALL teams for gameweek 3 and UPDATE gameweek_points
WITH team_players AS (
  -- 1. Get fantasy_team_players for all teams and gameweek_id=3
  SELECT 
    ftp.fantasy_team_id,
    ftp.player_id,
    ftp.gameweek_id,
    ftp.is_captain,
    ftp.is_vice_captain
  FROM fantasy_team_players ftp
  WHERE ftp.gameweek_id = 3
),
completed_fixtures AS (
  -- 2. Get completed fixtures for gameweek 3
  SELECT 
    f.fixture_id,
    f.gameweek_id
  FROM fixtures f
  WHERE f.status = 'COMPLETED' AND f.gameweek_id = 3
),
player_stats AS (
  -- 3. Get player stats from player_match_stats for these players for those fixtures
  SELECT 
    pms.player_id,
    pms.fantasy_points,
    pms.minutes_played,
    cf.gameweek_id
  FROM player_match_stats pms
  JOIN completed_fixtures cf ON pms.fixture_id = cf.fixture_id
  WHERE pms.player_id IN (SELECT DISTINCT player_id FROM team_players)
),
player_gameweek_totals AS (
  -- Calculate total minutes and points per player for gameweek 3
  SELECT 
    tp.fantasy_team_id,
    tp.player_id,
    tp.gameweek_id,
    tp.is_captain,
    tp.is_vice_captain,
    COALESCE(SUM(ps.minutes_played), 0) as total_minutes,
    COALESCE(SUM(ps.fantasy_points), 0) as total_points
  FROM team_players tp
  LEFT JOIN player_stats ps ON tp.player_id = ps.player_id AND tp.gameweek_id = ps.gameweek_id
  GROUP BY tp.fantasy_team_id, tp.player_id, tp.gameweek_id, tp.is_captain, tp.is_vice_captain
),
captain_logic AS (
  -- 4. Apply captain 2x if minutes played, if captain doesn't play then vice captain
  SELECT 
    fantasy_team_id,
    gameweek_id,
    CASE 
      WHEN MAX(CASE WHEN is_captain = true AND total_minutes > 0 THEN 1 ELSE 0 END) = 1 THEN
        (SELECT player_id FROM player_gameweek_totals pgt2 
         WHERE pgt2.fantasy_team_id = pgt1.fantasy_team_id 
         AND pgt2.gameweek_id = pgt1.gameweek_id 
         AND pgt2.is_captain = true AND pgt2.total_minutes > 0)
      WHEN MAX(CASE WHEN is_vice_captain = true AND total_minutes > 0 THEN 1 ELSE 0 END) = 1 THEN
        (SELECT player_id FROM player_gameweek_totals pgt2 
         WHERE pgt2.fantasy_team_id = pgt1.fantasy_team_id 
         AND pgt2.gameweek_id = pgt1.gameweek_id 
         AND pgt2.is_vice_captain = true AND pgt2.total_minutes > 0)
      ELSE NULL
    END as captain_player_id
  FROM player_gameweek_totals pgt1
  GROUP BY fantasy_team_id, gameweek_id
),
team_totals AS (
  -- 5. Calculate total points for gameweek 3 for each team
  SELECT 
    pgt.fantasy_team_id,
    SUM(
      CASE 
        WHEN cl.captain_player_id = pgt.player_id THEN pgt.total_points * 2
        ELSE pgt.total_points
      END
    ) as total_points
  FROM player_gameweek_totals pgt
  LEFT JOIN captain_logic cl ON pgt.fantasy_team_id = cl.fantasy_team_id AND pgt.gameweek_id = cl.gameweek_id
  GROUP BY pgt.fantasy_team_id
)
-- UPDATE the fantasy_teams table with calculated gameweek points
UPDATE fantasy_teams 
SET 
  gameweek_points = COALESCE(tt.total_points, 0),
  last_updated = CURRENT_TIMESTAMP
FROM team_totals tt
WHERE fantasy_teams.fantasy_team_id = tt.fantasy_team_id;