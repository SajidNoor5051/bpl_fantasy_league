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