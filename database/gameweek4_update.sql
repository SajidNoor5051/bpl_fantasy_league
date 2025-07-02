-- Update Gameweek 4 fixtures to COMPLETED and add scores
UPDATE fixtures
SET status = 'COMPLETED',
    home_team_score = 2,
    away_team_score = 1,
    is_final = TRUE
WHERE fixture_id = 10;  -- Bernabuet vs M&S

UPDATE fixtures
SET status = 'COMPLETED',
    home_team_score = 0,
    away_team_score = 2,
    is_final = TRUE
WHERE fixture_id = 11;  -- Revenue vs Incredibles

UPDATE fixtures
SET status = 'COMPLETED',
    home_team_score = 3,
    away_team_score = 0,
    is_final = TRUE
WHERE fixture_id = 12;  -- Mighty vs Incredibles

-- Insert Player Match Stats for fixture 10: Santiago Bernabuet vs Team M&S (2-1)
-- Santiago Bernabuet players (team 1)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(1, 10, 90, 0, 0, FALSE, 0, 4, 4),    -- David Martinez (GK)
(2, 10, 90, 0, 1, FALSE, 0, 0, 3),    -- Carlos Rodriguez (DEF)
(3, 10, 90, 1, 0, FALSE, 0, 0, 6),    -- Miguel Hernandez (DEF)
(4, 10, 90, 0, 0, FALSE, 1, 0, 1),    -- Fernando Silva (MID)
(5, 10, 90, 1, 0, FALSE, 0, 0, 5),    -- Javier Gonzalez (MID)
(6, 10, 85, 0, 1, FALSE, 0, 0, 3);    -- Luis Morales (FWD)

-- Team M&S players (team 4)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(19, 10, 90, 0, 0, FALSE, 0, 5, 5),   -- Antoine Dupont (GK)
(20, 10, 90, 0, 0, FALSE, 1, 0, 1),   -- Pierre Martin (DEF)
(21, 10, 90, 0, 0, FALSE, 0, 0, 2),   -- Jean Bernard (DEF)
(22, 10, 90, 0, 0, FALSE, 0, 0, 2),   -- Michel Lambert (MID)
(23, 10, 90, 0, 1, FALSE, 0, 0, 3),   -- Paul Dubois (MID)
(24, 10, 90, 1, 0, FALSE, 0, 0, 4);   -- Thierry Henry (FWD)

-- Insert Player Match Stats for fixture 11: Revenue Soldier vs Team Incredibles (0-2)
-- Revenue Soldier players (team 2)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(7, 11, 90, 0, 0, FALSE, 0, 6, 6),    -- Peter Wilson (GK)
(8, 11, 90, 0, 0, FALSE, 0, 0, 2),    -- James Brown (DEF)
(9, 11, 90, 0, 0, FALSE, 1, 0, 1),    -- Harry Taylor (DEF)
(10, 11, 90, 0, 0, FALSE, 0, 0, 2),   -- Oliver Evans (MID)
(11, 11, 90, 0, 0, FALSE, 0, 0, 2),   -- Leo Smith (MID)
(12, 11, 80, 0, 0, FALSE, 0, 0, 2);   -- Jack Jones (FWD)

-- Team Incredibles players (team 5)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(25, 11, 90, 0, 0, TRUE, 0, 2, 6),   -- Marco Rossi (GK)
(26, 11, 90, 1, 0, TRUE, 0, 0, 8),   -- Alessandro Ferrari (DEF)
(27, 11, 90, 0, 1, TRUE, 0, 0, 7),   -- Leonardo Bianchi (DEF)
(28, 11, 90, 0, 1, TRUE, 0, 0, 4),   -- Roberto Conti (MID)
(29, 11, 90, 1, 0, TRUE, 0, 0, 6),   -- Andrea Marino (MID)
(30, 11, 90, 0, 0, TRUE, 0, 0, 3);   -- Giuseppe Romano (FWD)

-- Insert Player Match Stats for fixture 12: Team Mighty vs Team Incredibles (3-0)
-- Team Mighty players (team 3)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(13, 12, 90, 0, 0, TRUE, 0, 2, 6),   -- Manuel Schmidt (GK)
(14, 12, 90, 1, 0, TRUE, 0, 0, 8),   -- Thomas Müller (DEF)
(15, 12, 90, 0, 1, TRUE, 0, 0, 7),   -- Hans Wagner (DEF)
(16, 12, 90, 1, 0, TRUE, 0, 0, 6),   -- Franz Becker (MID)
(17, 12, 90, 0, 1, TRUE, 0, 0, 4),   -- Leon Kroos (MID)
(18, 12, 90, 1, 1, TRUE, 0, 0, 8);   -- Klaus Werner (FWD)

-- Team Incredibles players (team 5)
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, saves, fantasy_points)
VALUES
(25, 12, 90, 0, 0, FALSE, 0, 7, 7),   -- Marco Rossi (GK)
(26, 12, 90, 0, 0, FALSE, 1, 0, 1),   -- Alessandro Ferrari (DEF)
(27, 12, 90, 0, 0, FALSE, 0, 0, 2),   -- Leonardo Bianchi (DEF)
(28, 12, 90, 0, 0, FALSE, 0, 0, 2),   -- Roberto Conti (MID)
(29, 12, 90, 0, 0, FALSE, 0, 0, 2),   -- Andrea Marino (MID)
(30, 12, 85, 0, 0, FALSE, 1, 0, 1);   -- Giuseppe Romano (FWD)

-- Update Gameweek 4 to not be current anymore
UPDATE gameweeks
SET is_current = FALSE,
    is_processed = TRUE
WHERE gameweek_id = 4;

-- Update Gameweek 5 to be the current gameweek
UPDATE gameweeks
SET is_current = TRUE
WHERE gameweek_id = 5;