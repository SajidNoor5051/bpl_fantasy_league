-- BUET Fantasy Premier League Database Schema
-- Created on: June 6, 2025

-- Create ENUM types for positions and match status
CREATE TYPE player_position AS ENUM ('GK', 'DEF', 'MID', 'FWD');
CREATE TYPE match_status AS ENUM ('SCHEDULED', 'LIVE', 'COMPLETED', 'POSTPONED', 'CANCELLED');

-- 1. Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- 2. Teams table
CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL UNIQUE,
    team_short_name VARCHAR(3) NOT NULL UNIQUE,
    logo_url VARCHAR(255),
    founded_year INTEGER,
    home_stadium VARCHAR(100),
    team_color VARCHAR(7),  -- Hex color code
    points INTEGER DEFAULT 0,
    matches_played INTEGER DEFAULT 0,
    matches_won INTEGER DEFAULT 0,
    matches_drawn INTEGER DEFAULT 0,
    matches_lost INTEGER DEFAULT 0,
    goals_for INTEGER DEFAULT 0,
    goals_against INTEGER DEFAULT 0
);

-- 3. Players table
CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams(team_id) ON DELETE SET NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    position player_position NOT NULL,
    jersey_number INTEGER,
    date_of_birth DATE,
    nationality VARCHAR(50),
    height INTEGER, -- in cm
    weight INTEGER, -- in kg
    fantasy_price DECIMAL(5,1) NOT NULL DEFAULT 5.0,
    fantasy_points INTEGER DEFAULT 0,
    total_goals INTEGER DEFAULT 0,
    total_assists INTEGER DEFAULT 0,
    total_clean_sheets INTEGER DEFAULT 0,
    total_yellow_cards INTEGER DEFAULT 0,
    total_red_cards INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_players_team_id ON players(team_id);
CREATE INDEX idx_players_position ON players(position);
CREATE INDEX idx_players_fantasy_price ON players(fantasy_price);
CREATE INDEX idx_players_fantasy_points ON players(fantasy_points);

-- 4. Gameweeks table
CREATE TABLE gameweeks (
    gameweek_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    is_processed BOOLEAN DEFAULT FALSE,
    CONSTRAINT gameweek_dates CHECK (end_date > start_date)
);

CREATE INDEX idx_gameweeks_current ON gameweeks(is_current);

-- 5. Fixtures table
CREATE TABLE fixtures (
    fixture_id SERIAL PRIMARY KEY,
    gameweek_id INTEGER NOT NULL REFERENCES gameweeks(gameweek_id) ON DELETE CASCADE,
    home_team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    away_team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    match_date TIMESTAMP NOT NULL,
    home_team_score INTEGER,
    away_team_score INTEGER,
    status match_status NOT NULL DEFAULT 'SCHEDULED',
    stadium VARCHAR(100),
    is_final BOOLEAN DEFAULT FALSE,
    CONSTRAINT different_teams CHECK (home_team_id <> away_team_id)
);

CREATE INDEX idx_fixtures_teams ON fixtures(home_team_id, away_team_id);
CREATE INDEX idx_fixtures_gameweek ON fixtures(gameweek_id);
CREATE INDEX idx_fixtures_date ON fixtures(match_date);
CREATE INDEX idx_fixtures_status ON fixtures(status);

-- 6. Standings table
CREATE TABLE standings (
    standing_id SERIAL PRIMARY KEY,
    team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    season_year INTEGER NOT NULL,
    position INTEGER,
    points INTEGER DEFAULT 0,
    matches_played INTEGER DEFAULT 0,
    matches_won INTEGER DEFAULT 0,
    matches_drawn INTEGER DEFAULT 0,
    matches_lost INTEGER DEFAULT 0,
    goals_for INTEGER DEFAULT 0,
    goals_against INTEGER DEFAULT 0,
    goal_difference INTEGER DEFAULT 0,
    form VARCHAR(5), -- Last 5 results: W, D, L
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id, season_year)
);

CREATE INDEX idx_standings_position ON standings(position);
CREATE INDEX idx_standings_points ON standings(points DESC);

-- 7. Fantasy Teams table
CREATE TABLE fantasy_teams (
    fantasy_team_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    team_name VARCHAR(100) NOT NULL,
    budget DECIMAL(5,1) NOT NULL DEFAULT 100.0,
    total_points INTEGER DEFAULT 0,
    gameweek_points INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT budget_positive CHECK (budget >= 0),
    UNIQUE(user_id)
);

CREATE INDEX idx_fantasy_teams_user_id ON fantasy_teams(user_id);
CREATE INDEX idx_fantasy_teams_points ON fantasy_teams(total_points DESC);

-- 8. Fantasy Team Players table
-- Modified Fantasy Team Players table without gameweek_  id and points_earned
CREATE TABLE fantasy_team_players (
    selection_id SERIAL PRIMARY KEY,
    fantasy_team_id INTEGER NOT NULL REFERENCES fantasy_teams(fantasy_team_id) ON DELETE CASCADE,
    player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    is_captain BOOLEAN DEFAULT FALSE,
    is_vice_captain BOOLEAN DEFAULT FALSE,
    is_starting BOOLEAN DEFAULT TRUE,
    gameweek_id INTEGER NOT NULL REFERENCES gameweeks(gameweek_id) ON DELETE CASCADE,    
    UNIQUE(fantasy_team_id, player_id)
);

CREATE INDEX idx_fantasy_team_players_team_id ON fantasy_team_players(fantasy_team_id);
CREATE INDEX idx_fantasy_team_players_player_id ON fantasy_team_players(player_id);

-- 9. Player Match Stats table
CREATE TABLE player_match_stats (
    stat_id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    fixture_id INTEGER NOT NULL REFERENCES fixtures(fixture_id) ON DELETE CASCADE,
    minutes_played INTEGER DEFAULT 0,
    goals_scored INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    clean_sheet BOOLEAN DEFAULT FALSE,
    yellow_cards INTEGER DEFAULT 0,
    red_cards INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    penalties_saved INTEGER DEFAULT 0,
    penalties_missed INTEGER DEFAULT 0,
    own_goals INTEGER DEFAULT 0,
    fantasy_points INTEGER DEFAULT 0,
    UNIQUE(player_id, fixture_id)
);

CREATE INDEX idx_player_match_stats_player_id ON player_match_stats(player_id);
CREATE INDEX idx_player_match_stats_fixture_id ON player_match_stats(fixture_id);
CREATE INDEX idx_player_match_stats_points ON player_match_stats(fantasy_points);

-- 10. Transfers table
CREATE TABLE transfers (
    transfer_id SERIAL PRIMARY KEY,
    fantasy_team_id INTEGER NOT NULL REFERENCES fantasy_teams(fantasy_team_id) ON DELETE CASCADE,
    player_in_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    player_out_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
    gameweek_id INTEGER NOT NULL REFERENCES gameweeks(gameweek_id) ON DELETE CASCADE,
    transfer_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cost DECIMAL(3,1) DEFAULT 0.0
);

CREATE INDEX idx_transfers_fantasy_team_id ON transfers(fantasy_team_id);
CREATE INDEX idx_transfers_gameweek_id ON transfers(gameweek_id);

ALTER TABLE fantasy_teams 
  DROP CONSTRAINT IF EXISTS fantasy_teams_user_id_fkey, -- Remove foreign key constraint
  DROP CONSTRAINT IF EXISTS fantasy_teams_user_id_key,  -- Remove unique constraint
  ALTER COLUMN user_id TYPE UUID USING user_id::text::uuid, -- Convert to UUID
  ADD CONSTRAINT user_id_unique UNIQUE(user_id); -- Add unique constraint back





-- Goals table

CREATE TABLE goals (
  goal_id SERIAL PRIMARY KEY,
  fixture_id INTEGER NOT NULL REFERENCES fixtures(fixture_id) ON DELETE CASCADE,
  player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
  minute INTEGER NOT NULL CHECK (minute >= 0),
  
  is_penalty BOOLEAN DEFAULT FALSE
  
);

CREATE INDEX idx_goals_fixture ON goals(fixture_id);
CREATE INDEX idx_goals_player ON goals(player_id);
CREATE INDEX idx_goals_team ON goals(team_id);

-- Assists table
CREATE TABLE assists (
  assist_id SERIAL PRIMARY KEY,
  fixture_id INTEGER NOT NULL REFERENCES fixtures(fixture_id) ON DELETE CASCADE,
  player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  assisted_to INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
  minute INTEGER NOT NULL CHECK (minute >= 0)
  
);

CREATE INDEX idx_assists_goal ON assists(assist_id);
CREATE INDEX idx_assists_fixture ON assists(fixture_id);
CREATE INDEX idx_assists_player ON assists(player_id);
CREATE INDEX idx_assists_team ON assists(team_id);

-- Yellow cards table
CREATE TABLE yellow_cards (
  yellow_card_id SERIAL PRIMARY KEY,
  fixture_id INTEGER NOT NULL REFERENCES fixtures(fixture_id) ON DELETE CASCADE,
  player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
  minute INTEGER NOT NULL CHECK (minute >= 0)

);

CREATE INDEX idx_yellow_cards_fixture ON yellow_cards(fixture_id);
CREATE INDEX idx_yellow_cards_player ON yellow_cards(player_id);
CREATE INDEX idx_yellow_cards_team ON yellow_cards(team_id);

-- Red cards table
CREATE TABLE red_cards (
  red_card_id SERIAL PRIMARY KEY,
  fixture_id INTEGER NOT NULL REFERENCES fixtures(fixture_id) ON DELETE CASCADE,
  player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
  minute INTEGER NOT NULL CHECK (minute >= 0),
  is_straight_red BOOLEAN DEFAULT TRUE
  
);

CREATE INDEX idx_red_cards_fixture ON red_cards(fixture_id);
CREATE INDEX idx_red_cards_player ON red_cards(player_id);
CREATE INDEX idx_red_cards_team ON red_cards(team_id);

-- Own goals table
CREATE TABLE own_goals (
  own_goal_id SERIAL PRIMARY KEY,
  fixture_id INTEGER NOT NULL REFERENCES fixtures(fixture_id) ON DELETE CASCADE,
  player_id INTEGER NOT NULL REFERENCES players(player_id) ON DELETE CASCADE,
  team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
  minute INTEGER NOT NULL CHECK (minute >= 0)
  
);

CREATE INDEX idx_own_goals_fixture ON own_goals(fixture_id);
CREATE INDEX idx_own_goals_player ON own_goals(player_id);
CREATE INDEX idx_own_goals_team ON own_goals(team_id);



ALTER TABLE fantasy_team_players 
DROP CONSTRAINT fantasy_team_players_fantasy_team_id_player_id_key;



ALTER TABLE fantasy_team_players 
ADD CONSTRAINT fantasy_team_players_team_player_gameweek_unique 
UNIQUE(fantasy_team_id, player_id, gameweek_id);