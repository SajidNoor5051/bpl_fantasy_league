-- Clear Demo Data and Reset Auto-Increment Sequences
-- This script deletes all demo data except teams table
-- Run this before inserting actual data

-- Step 1: Delete Match Event Data (in dependency order)
DELETE FROM own_goals;
DELETE FROM red_cards;
DELETE FROM yellow_cards;
DELETE FROM assists;
DELETE FROM goals;

-- Step 2: Delete Player Statistics
DELETE FROM player_match_stats;

-- Step 3: Delete Fantasy League Data
DELETE FROM transfers;
DELETE FROM fantasy_team_players;
DELETE FROM fantasy_teams;

-- Step 4: Delete Match Data
DELETE FROM fixtures;

-- Step 5: Delete League Data
DELETE FROM standings;

-- Step 6: Delete Players
DELETE FROM players;

-- Step 7: Delete Gameweeks
DELETE FROM gameweeks;

-- Reset Auto-Increment Sequences
ALTER SEQUENCE own_goals_own_goal_id_seq RESTART WITH 1;
ALTER SEQUENCE red_cards_red_card_id_seq RESTART WITH 1;
ALTER SEQUENCE yellow_cards_yellow_card_id_seq RESTART WITH 1;
ALTER SEQUENCE assists_assist_id_seq RESTART WITH 1;
ALTER SEQUENCE goals_goal_id_seq RESTART WITH 1;

ALTER SEQUENCE player_match_stats_stat_id_seq RESTART WITH 1;

ALTER SEQUENCE transfers_transfer_id_seq RESTART WITH 1;
ALTER SEQUENCE fantasy_team_players_selection_id_seq RESTART WITH 1;
ALTER SEQUENCE fantasy_teams_fantasy_team_id_seq RESTART WITH 1;

ALTER SEQUENCE fixtures_fixture_id_seq RESTART WITH 1;

ALTER SEQUENCE standings_standing_id_seq RESTART WITH 1;

ALTER SEQUENCE players_player_id_seq RESTART WITH 1;

ALTER SEQUENCE gameweeks_gameweek_id_seq RESTART WITH 1;

-- Note: teams table is preserved, so no need to reset teams_team_id_seq 