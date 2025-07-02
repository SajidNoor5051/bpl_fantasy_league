-- BUET Fantasy Premier League - Simple Automation
-- Created on: June 6, 2025
-- This file contains essential triggers, procedures, and views

-- =============================================================================
-- SIMPLE VIEWS
-- =============================================================================

-- View: Current league standings
CREATE OR REPLACE VIEW v_standings AS
SELECT 
    t.team_id,
    t.team_name,
    t.team_short_name,
    s.points,
    s.matches_played,
    s.matches_won,
    s.matches_drawn,
    s.matches_lost,
    s.goals_for,
    s.goals_against,
    s.goal_difference
FROM teams t
JOIN standings s ON t.team_id = s.team_id
WHERE s.season_year = EXTRACT(YEAR FROM CURRENT_DATE)
ORDER BY s.points DESC, s.goal_difference DESC, s.goals_for DESC;

-- View: Fixture list (all matches)
CREATE OR REPLACE VIEW v_fixtures AS
SELECT 
    f.fixture_id,
    f.match_date,
    ht.team_name as home_team,
    at.team_name as away_team,
    f.home_team_score,
    f.away_team_score,
    f.status,
    gw.name as gameweek
FROM fixtures f
JOIN teams ht ON f.home_team_id = ht.team_id
JOIN teams at ON f.away_team_id = at.team_id
JOIN gameweeks gw ON f.gameweek_id = gw.gameweek_id
ORDER BY f.match_date;

-- View: Top players by fantasy points
CREATE OR REPLACE VIEW v_top_players AS
SELECT 
    p.player_id,
    p.first_name || ' ' || p.last_name as player_name,
    t.team_name,
    p.position,
    p.fantasy_points,
    p.fantasy_price,
    p.total_goals,
    p.total_assists
FROM players p
JOIN teams t ON p.team_id = t.team_id
ORDER BY p.fantasy_points DESC, p.fantasy_price DESC
LIMIT 20;

-- =============================================================================
-- SIMPLE PROCEDURES
-- =============================================================================

-- Procedure: Update league standings
CREATE OR REPLACE PROCEDURE update_standings()
LANGUAGE plpgsql AS $$
BEGIN
    -- Reset all standings
    UPDATE standings s SET
        points = 0,
        matches_played = 0,
        matches_won = 0,
        matches_drawn = 0,
        matches_lost = 0,
        goals_for = 0,
        goals_against = 0,
        goal_difference = 0
    WHERE season_year = EXTRACT(YEAR FROM CURRENT_DATE);
    
    -- Calculate standings from completed fixtures
    WITH match_stats AS (
        SELECT 
            home_team_id as team_id,
            COUNT(*) as home_played,
            SUM(CASE WHEN home_team_score > away_team_score THEN 1 ELSE 0 END) as home_wins,
            SUM(CASE WHEN home_team_score = away_team_score THEN 1 ELSE 0 END) as home_draws,
            SUM(CASE WHEN home_team_score < away_team_score THEN 1 ELSE 0 END) as home_losses,
            SUM(home_team_score) as home_goals_for,
            SUM(away_team_score) as home_goals_against
        FROM fixtures
        WHERE status = 'COMPLETED'
        GROUP BY home_team_id
        
        UNION ALL
        
        SELECT 
            away_team_id as team_id,
            COUNT(*) as away_played,
            SUM(CASE WHEN away_team_score > home_team_score THEN 1 ELSE 0 END) as away_wins,
            SUM(CASE WHEN away_team_score = home_team_score THEN 1 ELSE 0 END) as away_draws,
            SUM(CASE WHEN away_team_score < home_team_score THEN 1 ELSE 0 END) as away_losses,
            SUM(away_team_score) as away_goals_for,
            SUM(home_team_score) as away_goals_against
        FROM fixtures
        WHERE status = 'COMPLETED'
        GROUP BY away_team_id
    ),
    team_stats AS (
        SELECT 
            team_id,
            SUM(home_played + away_played) as played,
            SUM(home_wins + away_wins) as won,
            SUM(home_draws + away_draws) as drawn,
            SUM(home_losses + away_losses) as lost,
            SUM(home_goals_for + away_goals_for) as goals_for,
            SUM(home_goals_against + away_goals_against) as goals_against
        FROM match_stats
        GROUP BY team_id
    )
    UPDATE standings s SET
        matches_played = ts.played,
        matches_won = ts.won,
        matches_drawn = ts.drawn,
        matches_lost = ts.lost,
        goals_for = ts.goals_for,
        goals_against = ts.goals_against,
        goal_difference = ts.goals_for - ts.goals_against,
        points = (ts.won * 3) + ts.drawn,
        last_updated = CURRENT_TIMESTAMP
    FROM team_stats ts
    WHERE s.team_id = ts.team_id
    AND s.season_year = EXTRACT(YEAR FROM CURRENT_DATE);
    
    -- Update positions
    WITH ranked_teams AS (
        SELECT 
            team_id,
            ROW_NUMBER() OVER (
                ORDER BY points DESC, 
                goal_difference DESC, 
                goals_for DESC
            ) as position_rank
        FROM standings
        WHERE season_year = EXTRACT(YEAR FROM CURRENT_DATE)
    )
    UPDATE standings s SET
        position = rt.position_rank
    FROM ranked_teams rt
    WHERE s.team_id = rt.team_id
    AND s.season_year = EXTRACT(YEAR FROM CURRENT_DATE);
END;
$$;

-- Procedure: Schedule Final Match
CREATE OR REPLACE PROCEDURE schedule_final()
LANGUAGE plpgsql AS $$
DECLARE
    top_team_1 INTEGER;
    top_team_2 INTEGER;
    final_gameweek_id INTEGER;
BEGIN
    -- Get the top 2 teams
    SELECT team_id INTO top_team_1
    FROM standings
    WHERE season_year = EXTRACT(YEAR FROM CURRENT_DATE)
    ORDER BY points DESC, goal_difference DESC, goals_for DESC
    LIMIT 1;
    
    SELECT team_id INTO top_team_2
    FROM standings
    WHERE season_year = EXTRACT(YEAR FROM CURRENT_DATE)
    AND team_id != top_team_1
    ORDER BY points DESC, goal_difference DESC, goals_for DESC
    LIMIT 1;
    
    -- Get the final gameweek
    SELECT gameweek_id INTO final_gameweek_id
    FROM gameweeks
    WHERE name = 'Final';
    
    -- Schedule the final match
    IF top_team_1 IS NOT NULL AND top_team_2 IS NOT NULL AND final_gameweek_id IS NOT NULL THEN
        INSERT INTO fixtures (
            gameweek_id, 
            home_team_id, 
            away_team_id, 
            match_date, 
            status, 
            stadium, 
            is_final
        )
        VALUES (
            final_gameweek_id,
            top_team_1,
            top_team_2,
            (SELECT start_date FROM gameweeks WHERE gameweek_id = final_gameweek_id),
            'SCHEDULED',
            'BUET Stadium',
            TRUE
        );
    END IF;
END;
$$;

-- Procedure: Calculate player fantasy points
CREATE OR REPLACE PROCEDURE calculate_player_points(player_id_param INTEGER, fixture_id_param INTEGER)
LANGUAGE plpgsql AS $$
DECLARE
    player_stats RECORD;
    player_position player_position;
    points INTEGER := 0;
BEGIN
    -- Get player position
    SELECT position INTO player_position
    FROM players
    WHERE player_id = player_id_param;
    
    -- Get match stats
    SELECT * INTO player_stats
    FROM player_match_stats
    WHERE player_id = player_id_param AND fixture_id = fixture_id_param;
    
    IF NOT FOUND THEN
        RETURN;
    END IF;
    
    -- Base points for playing
    IF player_stats.minutes_played > 0 THEN
        points := points + 1;
    END IF;
    
    -- Bonus for playing 60+ minutes
    IF player_stats.minutes_played >= 60 THEN
        points := points + 1;
    END IF;
    
    -- Points for goals (vary by position)
    CASE player_position
        WHEN 'GK' THEN points := points + (player_stats.goals_scored * 6);
        WHEN 'DEF' THEN points := points + (player_stats.goals_scored * 6);
        WHEN 'MID' THEN points := points + (player_stats.goals_scored * 5);
        WHEN 'FWD' THEN points := points + (player_stats.goals_scored * 4);
    END CASE;
    
    -- Points for assists
    points := points + (player_stats.assists * 3);
    
    -- Points for clean sheet (defenders and goalkeepers only)
    IF player_stats.clean_sheet AND player_position IN ('GK', 'DEF') THEN
        points := points + 4;
    END IF;
    
    -- GK saves
    IF player_position = 'GK' THEN
        points := points + (player_stats.saves / 3); -- 1 point per 3 saves
    END IF;
    
    -- Deduct for cards and own goals
    points := points - player_stats.yellow_cards;
    points := points - (player_stats.red_cards * 3);
    points := points - (player_stats.own_goals * 2);
    
    -- Update player's match stats with calculated points
    UPDATE player_match_stats
    SET fantasy_points = points
    WHERE player_id = player_id_param AND fixture_id = fixture_id_param;
    
    -- Update player's total points
    UPDATE players
    SET fantasy_points = fantasy_points + points
    WHERE player_id = player_id_param;
END;
$$;

-- =============================================================================
-- SIMPLE TRIGGERS
-- =============================================================================

-- Trigger: Auto-update standings when match result is updated
CREATE OR REPLACE FUNCTION trigger_update_standings()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'COMPLETED' AND
       (OLD.status != 'COMPLETED' OR OLD.home_team_score != NEW.home_team_score OR OLD.away_team_score != NEW.away_team_score) 
    THEN
        CALL update_standings();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_update_standings
AFTER UPDATE ON fixtures
FOR EACH ROW
EXECUTE FUNCTION trigger_update_standings();

-- Trigger: Auto-calculate player points when match stats are updated
CREATE OR REPLACE FUNCTION trigger_calculate_player_points()
RETURNS TRIGGER AS $$
BEGIN
    CALL calculate_player_points(NEW.player_id, NEW.fixture_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_calculate_player_points
AFTER INSERT OR UPDATE ON player_match_stats
FOR EACH ROW
EXECUTE FUNCTION trigger_calculate_player_points();