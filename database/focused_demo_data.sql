-- BPL Fantasy League Focused Demo Data
-- Created on: June 12, 2025
-- Contains data for: players, gameweeks, fixtures, player_match_stats

-- Clear existing data with proper order to avoid constraint violations
TRUNCATE TABLE player_match_stats RESTART IDENTITY CASCADE;
TRUNCATE TABLE fixtures RESTART IDENTITY CASCADE;
TRUNCATE TABLE gameweeks RESTART IDENTITY CASCADE;
TRUNCATE TABLE players RESTART IDENTITY CASCADE;

-- Insert players for 5 teams (assuming teams already exist)
-- Team 1: Santiago Bernabuet (team_id = 1)
INSERT INTO players (team_id, first_name, last_name, position, jersey_number, date_of_birth, nationality, height, weight, fantasy_price)
VALUES
(1, 'David', 'Martinez', 'GK', 1, '1995-05-15', 'Spain', 188, 82, 5.5),
(1, 'Carlos', 'Rodriguez', 'DEF', 2, '1994-08-23', 'Spain', 182, 78, 5.0),
(1, 'Miguel', 'Hernandez', 'DEF', 3, '1996-04-12', 'Portugal', 185, 80, 5.5),
(1, 'Fernando', 'Silva', 'MID', 8, '1992-11-05', 'Brazil', 175, 70, 8.5),
(1, 'Javier', 'Gonzalez', 'MID', 10, '1993-09-24', 'Argentina', 172, 68, 9.0),
(1, 'Luis', 'Morales', 'FWD', 9, '1994-03-19', 'Spain', 180, 75, 10.5);

-- Team 2: Revenue Soldier (team_id = 2)
INSERT INTO players (team_id, first_name, last_name, position, jersey_number, date_of_birth, nationality, height, weight, fantasy_price)
VALUES
(2, 'Peter', 'Wilson', 'GK', 1, '1995-02-10', 'England', 190, 85, 5.0),
(2, 'James', 'Brown', 'DEF', 4, '1993-07-15', 'England', 184, 79, 4.5),
(2, 'Harry', 'Taylor', 'DEF', 5, '1994-11-28', 'England', 183, 78, 4.5),
(2, 'Oliver', 'Evans', 'MID', 6, '1997-06-09', 'Wales', 176, 72, 7.0),
(2, 'Leo', 'Smith', 'MID', 10, '1992-12-12', 'Scotland', 174, 70, 8.0),
(2, 'Jack', 'Jones', 'FWD', 9, '1994-04-20', 'England', 182, 78, 9.5);

-- Team 3: Team Mighty (team_id = 3)
INSERT INTO players (team_id, first_name, last_name, position, jersey_number, date_of_birth, nationality, height, weight, fantasy_price)
VALUES
(3, 'Manuel', 'Schmidt', 'GK', 1, '1996-03-18', 'Germany', 189, 83, 5.5),
(3, 'Thomas', 'Müller', 'DEF', 5, '1995-09-13', 'Germany', 185, 80, 5.0),
(3, 'Hans', 'Wagner', 'DEF', 3, '1994-07-22', 'Germany', 182, 78, 5.0),
(3, 'Franz', 'Becker', 'MID', 8, '1993-05-17', 'Germany', 178, 72, 7.5),
(3, 'Leon', 'Kroos', 'MID', 10, '1992-10-10', 'Germany', 180, 75, 8.5),
(3, 'Klaus', 'Werner', 'FWD', 11, '1995-01-15', 'Austria', 179, 74, 9.0);

-- Team 4: Team M&S (team_id = 4)
INSERT INTO players (team_id, first_name, last_name, position, jersey_number, date_of_birth, nationality, height, weight, fantasy_price)
VALUES
(4, 'Antoine', 'Dupont', 'GK', 1, '1996-08-24', 'France', 188, 82, 5.0),
(4, 'Pierre', 'Martin', 'DEF', 2, '1995-03-07', 'France', 183, 78, 4.5),
(4, 'Jean', 'Bernard', 'DEF', 4, '1994-11-19', 'France', 181, 77, 5.0),
(4, 'Michel', 'Lambert', 'MID', 6, '1993-06-28', 'France', 176, 70, 6.5),
(4, 'Paul', 'Dubois', 'MID', 10, '1992-09-15', 'France', 175, 69, 7.5),
(4, 'Thierry', 'Henry', 'FWD', 14, '1994-02-25', 'France', 183, 76, 9.0);

-- Team 5: Team Incredibles (team_id = 5)
INSERT INTO players (team_id, first_name, last_name, position, jersey_number, date_of_birth, nationality, height, weight, fantasy_price)
VALUES
(5, 'Marco', 'Rossi', 'GK', 1, '1995-04-30', 'Italy', 187, 81, 5.0),
(5, 'Alessandro', 'Ferrari', 'DEF', 3, '1994-09-05', 'Italy', 184, 79, 4.5),
(5, 'Leonardo', 'Bianchi', 'DEF', 5, '1996-01-12', 'Italy', 182, 78, 4.5),
(5, 'Roberto', 'Conti', 'MID', 8, '1993-07-27', 'Italy', 177, 72, 6.5),
(5, 'Andrea', 'Marino', 'MID', 10, '1992-11-08', 'Italy', 174, 68, 7.0),
(5, 'Giuseppe', 'Romano', 'FWD', 9, '1994-05-16', 'Italy', 180, 76, 8.5);

-- Insert Gameweeks
INSERT INTO gameweeks (name, start_date, end_date, is_current, is_processed)
VALUES
('Gameweek 1', '2025-08-10 00:00:00', '2025-08-12 23:59:59', FALSE, TRUE),
('Gameweek 2', '2025-08-17 00:00:00', '2025-08-19 23:59:59', FALSE, TRUE),
('Gameweek 3', '2025-08-24 00:00:00', '2025-08-26 23:59:59', FALSE, TRUE),
('Gameweek 4', '2025-08-31 00:00:00', '2025-09-02 23:59:59', TRUE, FALSE),
('Gameweek 5', '2025-09-14 00:00:00', '2025-09-16 23:59:59', FALSE, FALSE);

-- Insert Fixtures
INSERT INTO fixtures (gameweek_id, home_team_id, away_team_id, match_date, home_team_score, away_team_score, status, stadium, is_final)
VALUES
-- Gameweek 1
(1, 1, 2, '2025-08-10 15:00:00', 3, 1, 'COMPLETED', 'Bernabuet Stadium', TRUE),
(1, 3, 4, '2025-08-11 15:00:00', 2, 2, 'COMPLETED', 'Mighty Stadium', TRUE),
(1, 5, 1, '2025-08-12 19:45:00', 0, 2, 'COMPLETED', 'Incredibles Stadium', TRUE),
-- Gameweek 2
(2, 2, 3, '2025-08-17 15:00:00', 1, 3, 'COMPLETED', 'Revenue Arena', TRUE),
(2, 4, 5, '2025-08-18 17:30:00', 2, 0, 'COMPLETED', 'M&S Arena', TRUE),
(2, 1, 3, '2025-08-19 20:00:00', 1, 1, 'COMPLETED', 'Bernabuet Stadium', TRUE),
-- Gameweek 3
(3, 5, 2, '2025-08-24 14:00:00', 2, 1, 'COMPLETED', 'Incredibles Stadium', TRUE),
(3, 3, 1, '2025-08-25 16:30:00', 0, 3, 'COMPLETED', 'Mighty Stadium', TRUE),
(3, 4, 2, '2025-08-26 19:45:00', 1, 2, 'COMPLETED', 'M&S Arena', TRUE),
-- Gameweek 4 (Current)
(4, 1, 4, '2025-09-01 15:00:00', NULL, NULL, 'SCHEDULED', 'Bernabuet Stadium', FALSE),
(4, 2, 5, '2025-09-01 17:30:00', NULL, NULL, 'SCHEDULED', 'Revenue Arena', FALSE),
(4, 3, 5, '2025-09-02 20:00:00', NULL, NULL, 'SCHEDULED', 'Mighty Stadium', FALSE),
-- Gameweek 5
(5, 4, 3, '2025-09-14 14:00:00', NULL, NULL, 'SCHEDULED', 'M&S Arena', FALSE),
(5, 5, 1, '2025-09-15 16:30:00', NULL, NULL, 'SCHEDULED', 'Incredibles Stadium', FALSE),
(5, 2, 4, '2025-09-16 19:45:00', NULL, NULL, 'SCHEDULED', 'Revenue Arena', FALSE);

-- Insert Player Match Stats for completed games
-- Gameweek 1, Fixture 1: Santiago Bernabuet vs Revenue Soldier (3-1)
-- Santiago Bernabuet players (team 1)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(1, 1, 90, 0, 0, FALSE, 0, 3, 4),    -- David Martinez (GK)
(2, 1, 90, 0, 1, FALSE, 0, 0, 3),    -- Carlos Rodriguez (DEF)
(3, 1, 90, 0, 0, FALSE, 1, 0, 1),    -- Miguel Hernandez (DEF)
(4, 1, 90, 1, 0, FALSE, 0, 0, 5),    -- Fernando Silva (MID)
(5, 1, 90, 1, 1, FALSE, 0, 0, 8),    -- Javier Gonzalez (MID)
(6, 1, 90, 1, 0, FALSE, 0, 0, 4);    -- Luis Morales (FWD)

-- Revenue Soldier players (team 2)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(7, 1, 90, 0, 0, FALSE, 0, 5, 5),    -- Peter Wilson (GK)
(8, 1, 90, 0, 0, FALSE, 0, 0, 2),    -- James Brown (DEF)
(9, 1, 90, 0, 0, FALSE, 0, 0, 2),    -- Harry Taylor (DEF)
(10, 1, 90, 0, 1, FALSE, 0, 0, 3),   -- Oliver Evans (MID)
(11, 1, 90, 1, 0, FALSE, 0, 0, 5),   -- Leo Smith (MID)
(12, 1, 80, 0, 0, FALSE, 1, 0, 1);   -- Jack Jones (FWD)

-- Gameweek 1, Fixture 2: Team Mighty vs Team M&S (2-2)
-- Team Mighty players (team 3)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(13, 2, 90, 0, 0, FALSE, 0, 4, 4),   -- Manuel Schmidt (GK)
(14, 2, 90, 0, 1, FALSE, 0, 0, 3),   -- Thomas Müller (DEF)
(15, 2, 90, 0, 0, FALSE, 1, 0, 1),   -- Hans Wagner (DEF)
(16, 2, 90, 1, 0, FALSE, 0, 0, 5),   -- Franz Becker (MID)
(17, 2, 90, 0, 1, FALSE, 0, 0, 3),   -- Leon Kroos (MID)
(18, 2, 90, 1, 0, FALSE, 0, 0, 4);   -- Klaus Werner (FWD)

-- Team M&S players (team 4)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(19, 2, 90, 0, 0, FALSE, 0, 3, 3),   -- Antoine Dupont (GK)
(20, 2, 90, 0, 0, FALSE, 0, 0, 2),   -- Pierre Martin (DEF)
(21, 2, 90, 1, 0, FALSE, 0, 0, 6),   -- Jean Bernard (DEF)
(22, 2, 90, 0, 1, FALSE, 0, 0, 3),   -- Michel Lambert (MID)
(23, 2, 90, 0, 1, FALSE, 1, 0, 2),   -- Paul Dubois (MID)
(24, 2, 85, 1, 0, FALSE, 0, 0, 4);   -- Thierry Henry (FWD)

-- Gameweek 1, Fixture 3: Team Incredibles vs Santiago Bernabuet (0-2)
-- Team Incredibles players (team 5)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(25, 3, 90, 0, 0, FALSE, 0, 6, 6),   -- Marco Rossi (GK)
(26, 3, 90, 0, 0, FALSE, 1, 0, 1),   -- Alessandro Ferrari (DEF)
(27, 3, 90, 0, 0, FALSE, 0, 0, 2),   -- Leonardo Bianchi (DEF)
(28, 3, 90, 0, 0, FALSE, 0, 0, 2),   -- Roberto Conti (MID)
(29, 3, 90, 0, 0, FALSE, 2, 0, 0),   -- Andrea Marino (MID)
(30, 3, 75, 0, 0, FALSE, 0, 0, 2);   -- Giuseppe Romano (FWD)

-- Santiago Bernabuet players (team 1)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(1, 3, 90, 0, 0, TRUE, 0, 2, 6),    -- David Martinez (GK)
(2, 3, 90, 0, 1, TRUE, 0, 0, 7),    -- Carlos Rodriguez (DEF)
(3, 3, 90, 0, 0, TRUE, 0, 0, 6),    -- Miguel Hernandez (DEF)
(4, 3, 90, 0, 0, TRUE, 1, 0, 1),    -- Fernando Silva (MID)
(5, 3, 90, 1, 0, TRUE, 0, 0, 6),    -- Javier Gonzalez (MID)
(6, 3, 90, 1, 0, TRUE, 0, 0, 5);    -- Luis Morales (FWD)

-- Gameweek 2, Fixture 4: Revenue Soldier vs Team Mighty (1-3)
-- Revenue Soldier players (team 2)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(7, 4, 90, 0, 0, FALSE, 0, 4, 4),    -- Peter Wilson (GK)
(8, 4, 90, 0, 0, FALSE, 1, 0, 1),    -- James Brown (DEF)
(9, 4, 90, 0, 0, FALSE, 0, 0, 2),    -- Harry Taylor (DEF)
(10, 4, 90, 0, 0, FALSE, 0, 0, 2),   -- Oliver Evans (MID)
(11, 4, 90, 1, 0, FALSE, 0, 0, 5),   -- Leo Smith (MID)
(12, 4, 85, 0, 0, FALSE, 0, 0, 2);   -- Jack Jones (FWD)

-- Team Mighty players (team 3)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(13, 4, 90, 0, 0, FALSE, 0, 2, 2),   -- Manuel Schmidt (GK)
(14, 4, 90, 1, 0, FALSE, 0, 0, 6),   -- Thomas Müller (DEF)
(15, 4, 90, 0, 1, FALSE, 0, 0, 3),   -- Hans Wagner (DEF)
(16, 4, 90, 0, 1, FALSE, 1, 0, 2),   -- Franz Becker (MID)
(17, 4, 90, 1, 0, FALSE, 0, 0, 5),   -- Leon Kroos (MID)
(18, 4, 90, 1, 0, FALSE, 0, 0, 4);   -- Klaus Werner (FWD)

-- Gameweek 2, Fixture 5: Team M&S vs Team Incredibles (2-0)
-- Team M&S players (team 4)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(19, 5, 90, 0, 0, TRUE, 0, 3, 7),   -- Antoine Dupont (GK)
(20, 5, 90, 0, 1, TRUE, 0, 0, 7),   -- Pierre Martin (DEF)
(21, 5, 90, 0, 0, TRUE, 0, 0, 6),   -- Jean Bernard (DEF)
(22, 5, 90, 1, 0, TRUE, 0, 0, 6),   -- Michel Lambert (MID)
(23, 5, 90, 0, 1, TRUE, 0, 0, 4),   -- Paul Dubois (MID)
(24, 5, 90, 1, 0, TRUE, 0, 0, 5);   -- Thierry Henry (FWD)

-- Team Incredibles players (team 5)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(25, 5, 90, 0, 0, FALSE, 0, 5, 5),   -- Marco Rossi (GK)
(26, 5, 90, 0, 0, FALSE, 0, 0, 2),   -- Alessandro Ferrari (DEF)
(27, 5, 90, 0, 0, FALSE, 1, 0, 1),   -- Leonardo Bianchi (DEF)
(28, 5, 90, 0, 0, FALSE, 0, 0, 2),   -- Roberto Conti (MID)
(29, 5, 90, 0, 0, FALSE, 0, 0, 2),   -- Andrea Marino (MID)
(30, 5, 85, 0, 0, FALSE, 0, 0, 2);   -- Giuseppe Romano (FWD)

-- Gameweek 2, Fixture 6: Santiago Bernabuet vs Team Mighty (1-1)
-- Santiago Bernabuet players (team 1)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(1, 6, 90, 0, 0, FALSE, 0, 3, 3),    -- David Martinez (GK)
(2, 6, 90, 0, 0, FALSE, 0, 0, 2),    -- Carlos Rodriguez (DEF)
(3, 6, 90, 0, 0, FALSE, 0, 0, 2),    -- Miguel Hernandez (DEF)
(4, 6, 90, 0, 1, FALSE, 0, 0, 3),    -- Fernando Silva (MID)
(5, 6, 90, 1, 0, FALSE, 0, 0, 5),    -- Javier Gonzalez (MID)
(6, 6, 80, 0, 0, FALSE, 1, 0, 1);    -- Luis Morales (FWD)

-- Team Mighty players (team 3)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(13, 6, 90, 0, 0, FALSE, 0, 4, 4),   -- Manuel Schmidt (GK)
(14, 6, 90, 0, 0, FALSE, 1, 0, 1),   -- Thomas Müller (DEF)
(15, 6, 90, 0, 1, FALSE, 0, 0, 3),   -- Hans Wagner (DEF)
(16, 6, 90, 0, 0, FALSE, 0, 0, 2),   -- Franz Becker (MID)
(17, 6, 90, 0, 0, FALSE, 0, 0, 2),   -- Leon Kroos (MID)
(18, 6, 90, 1, 0, FALSE, 0, 0, 4);   -- Klaus Werner (FWD)

-- Gameweek 3, Fixture 7: Team Incredibles vs Revenue Soldier (2-1)
-- Team Incredibles players (team 5)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(25, 7, 90, 0, 0, FALSE, 0, 3, 3),   -- Marco Rossi (GK)
(26, 7, 90, 1, 0, FALSE, 0, 0, 6),   -- Alessandro Ferrari (DEF)
(27, 7, 90, 0, 0, FALSE, 0, 0, 2),   -- Leonardo Bianchi (DEF)
(28, 7, 90, 0, 1, FALSE, 0, 0, 3),   -- Roberto Conti (MID)
(29, 7, 90, 1, 0, FALSE, 0, 0, 5),   -- Andrea Marino (MID)
(30, 7, 90, 0, 1, FALSE, 1, 0, 2);   -- Giuseppe Romano (FWD)

-- Revenue Soldier players (team 2)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(7, 7, 90, 0, 0, FALSE, 0, 4, 4),    -- Peter Wilson (GK)
(8, 7, 90, 0, 0, FALSE, 0, 0, 2),    -- James Brown (DEF)
(9, 7, 90, 0, 0, FALSE, 1, 0, 1),    -- Harry Taylor (DEF)
(10, 7, 90, 0, 0, FALSE, 0, 0, 2),   -- Oliver Evans (MID)
(11, 7, 90, 0, 1, FALSE, 0, 0, 3),   -- Leo Smith (MID)
(12, 7, 90, 1, 0, FALSE, 0, 0, 4);   -- Jack Jones (FWD)

-- Gameweek 3, Fixture 8: Team Mighty vs Santiago Bernabuet (0-3)
-- Team Mighty players (team 3)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(13, 8, 90, 0, 0, FALSE, 0, 5, 5),   -- Manuel Schmidt (GK)
(14, 8, 90, 0, 0, FALSE, 0, 0, 2),   -- Thomas Müller (DEF)
(15, 8, 90, 0, 0, FALSE, 1, 0, 1),   -- Hans Wagner (DEF)
(16, 8, 90, 0, 0, FALSE, 0, 0, 2),   -- Franz Becker (MID)
(17, 8, 90, 0, 0, FALSE, 2, 0, 0),   -- Leon Kroos (MID)
(18, 8, 80, 0, 0, FALSE, 0, 0, 2);   -- Klaus Werner (FWD)

-- Santiago Bernabuet players (team 1)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(1, 8, 90, 0, 0, TRUE, 0, 2, 6),    -- David Martinez (GK)
(2, 8, 90, 1, 0, TRUE, 0, 0, 10),   -- Carlos Rodriguez (DEF)
(3, 8, 90, 0, 1, TRUE, 0, 0, 7),    -- Miguel Hernandez (DEF)
(4, 8, 90, 1, 0, TRUE, 0, 0, 6),    -- Fernando Silva (MID)
(5, 8, 90, 0, 1, TRUE, 0, 0, 4),    -- Javier Gonzalez (MID)
(6, 8, 90, 1, 0, TRUE, 0, 0, 5);    -- Luis Morales (FWD)

-- Gameweek 3, Fixture 9: Team M&S vs Revenue Soldier (1-2)
-- Team M&S players (team 4)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(19, 9, 90, 0, 0, FALSE, 0, 3, 3),   -- Antoine Dupont (GK)
(20, 9, 90, 0, 0, FALSE, 1, 0, 1),   -- Pierre Martin (DEF)
(21, 9, 90, 0, 0, FALSE, 0, 0, 2),   -- Jean Bernard (DEF)
(22, 9, 90, 0, 0, FALSE, 0, 0, 2),   -- Michel Lambert (MID)
(23, 9, 90, 0, 1, FALSE, 0, 0, 3),   -- Paul Dubois (MID)
(24, 9, 90, 1, 0, FALSE, 0, 0, 4);   -- Thierry Henry (FWD)

-- Revenue Soldier players (team 2)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(7, 9, 90, 0, 0, FALSE, 0, 4, 4),    -- Peter Wilson (GK)
(8, 9, 90, 1, 0, FALSE, 0, 0, 6),    -- James Brown (DEF)
(9, 9, 90, 0, 0, FALSE, 0, 0, 2),    -- Harry Taylor (DEF)
(10, 9, 90, 0, 1, FALSE, 0, 0, 3),   -- Oliver Evans (MID)
(11, 9, 90, 0, 1, FALSE, 0, 0, 3),   -- Leo Smith (MID)
(12, 9, 90, 1, 0, FALSE, 1, 0, 3);   -- Jack Jones (FWD)