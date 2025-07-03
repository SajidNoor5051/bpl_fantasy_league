-- Function to automatically copy fantasy teams to next gameweek
CREATE OR REPLACE FUNCTION copy_fantasy_teams_to_next_gameweek()
RETURNS TRIGGER AS $$
DECLARE
    previous_gameweek_id INTEGER;
    new_current_gameweek_id INTEGER;
    fantasy_team_record RECORD;
BEGIN
    -- Only proceed if is_current is being set to TRUE
    IF NEW.is_current = TRUE AND (OLD.is_current = FALSE OR OLD.is_current IS NULL) THEN
        new_current_gameweek_id := NEW.gameweek_id;
        previous_gameweek_id := new_current_gameweek_id - 1;
        
        -- Only proceed if previous gameweek exists
        IF previous_gameweek_id > 0 THEN
            -- Loop through all fantasy teams by ID that have players in previous gameweek
            FOR fantasy_team_record IN 
                SELECT DISTINCT ftp.fantasy_team_id
                FROM fantasy_team_players ftp
                WHERE ftp.gameweek_id = previous_gameweek_id
                ORDER BY ftp.fantasy_team_id
            LOOP
                -- Copy all players from previous gameweek to new current gameweek
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
                    new_current_gameweek_id
                FROM fantasy_team_players
                WHERE fantasy_team_id = fantasy_team_record.fantasy_team_id 
                AND gameweek_id = previous_gameweek_id;
                
                RAISE NOTICE 'Copied fantasy team % from gameweek % to gameweek %', 
                    fantasy_team_record.fantasy_team_id, previous_gameweek_id, new_current_gameweek_id;
            END LOOP;
        ELSE
            RAISE NOTICE 'Previous gameweek % does not exist, skipping copy operation', previous_gameweek_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER trigger_copy_fantasy_teams_to_next_gameweek
    AFTER UPDATE ON gameweeks
    FOR EACH ROW
    EXECUTE FUNCTION copy_fantasy_teams_to_next_gameweek();