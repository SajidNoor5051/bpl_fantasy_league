-- BUET Fantasy Premier League Core Tables Permissions
-- Created on: June 18, 2025

-- Grant all permissions to anonymous users for full access
GRANT ALL PRIVILEGES ON gameweeks TO anon;
GRANT ALL PRIVILEGES ON fantasy_teams TO anon;
GRANT ALL PRIVILEGES ON fantasy_team_players TO anon;
GRANT ALL PRIVILEGES ON players TO anon;
GRANT ALL PRIVILEGES ON teams TO anon;
GRANT ALL PRIVILEGES ON fixtures TO anon;
GRANT ALL PRIVILEGES ON transfers TO anon;
GRANT ALL PRIVILEGES ON standings TO anon;
GRANT ALL PRIVILEGES ON player_match_stats TO anon;

-- Grant all permissions to authenticated users for full access
GRANT ALL PRIVILEGES ON gameweeks TO authenticated;
GRANT ALL PRIVILEGES ON fantasy_teams TO authenticated;
GRANT ALL PRIVILEGES ON fantasy_team_players TO authenticated;
GRANT ALL PRIVILEGES ON players TO authenticated;
GRANT ALL PRIVILEGES ON teams TO authenticated;
GRANT ALL PRIVILEGES ON fixtures TO authenticated;
GRANT ALL PRIVILEGES ON transfers TO authenticated;
GRANT ALL PRIVILEGES ON standings TO authenticated;
GRANT ALL PRIVILEGES ON player_match_stats TO authenticated;

-- Grant sequence privileges
GRANT ALL PRIVILEGES ON SEQUENCE gameweeks_gameweek_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE fantasy_teams_fantasy_team_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE fantasy_team_players_selection_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE players_player_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE teams_team_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE fixtures_fixture_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE transfers_transfer_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE standings_standing_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE player_match_stats_stat_id_seq TO anon, authenticated;

-- Grant function execution permissions (for the trigger function)
GRANT EXECUTE ON FUNCTION copy_fantasy_teams_to_next_gameweek() TO anon, authenticated; 