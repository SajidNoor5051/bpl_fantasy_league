-- Drop automation objects from simple_automation.sql
-- Created on: June 12, 2025

-- First, drop all triggers
DROP TRIGGER IF EXISTS auto_update_standings ON fixtures;
DROP TRIGGER IF EXISTS auto_calculate_player_points ON player_match_stats;

-- Then, drop trigger functions
DROP FUNCTION IF EXISTS trigger_update_standings;
DROP FUNCTION IF EXISTS trigger_calculate_player_points;

-- Drop stored procedures
DROP PROCEDURE IF EXISTS update_standings;
DROP PROCEDURE IF EXISTS schedule_final;
DROP PROCEDURE IF EXISTS calculate_player_points;

-- Finally, drop views
DROP VIEW IF EXISTS v_standings;
DROP VIEW IF EXISTS v_fixtures;
DROP VIEW IF EXISTS v_top_players;

-- Confirmation message
SELECT 'All automation objects have been dropped successfully.' as message;