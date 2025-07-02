-- BUET Fantasy Premier League Match Events Demo Data
-- Created on: June 18, 2025

-- -----------------------------------------
-- Goals table data based on existing stats
-- -----------------------------------------
INSERT INTO goals (fixture_id, player_id, team_id, minute, is_penalty)
VALUES
-- Fixture 1: Santiago Bernabuet vs Revenue Soldier (3-1)
(1, 4, 1, 23, FALSE),    -- Fernando Silva (MID) scores at 23'
(1, 5, 1, 41, FALSE),    -- Javier Gonzalez (MID) scores at 41'
(1, 6, 1, 67, FALSE),    -- Luis Morales (FWD) scores at 67'
(1, 11, 2, 52, FALSE),   -- Leo Smith (MID) scores at 52'

-- Fixture 2: Team Mighty vs Team M&S (2-2)
(2, 16, 3, 12, FALSE),   -- Franz Becker (MID) scores at 12'
(2, 18, 3, 55, FALSE),   -- Klaus Werner (FWD) scores at 55'
(2, 21, 4, 38, FALSE),   -- Jean Bernard (DEF) scores at 38'
(2, 24, 4, 79, FALSE),   -- Thierry Henry (FWD) scores at 79'

-- Fixture 3: Team Incredibles vs Santiago Bernabuet (0-2)
(3, 5, 1, 29, FALSE),    -- Javier Gonzalez (MID) scores at 29'
(3, 6, 1, 63, FALSE),    -- Luis Morales (FWD) scores at 63'

-- Fixture 4: Revenue Soldier vs Team Mighty (1-3)
(4, 11, 2, 15, FALSE),   -- Leo Smith (MID) scores at 15'
(4, 14, 3, 35, FALSE),   -- Thomas Müller (DEF) scores at 35'
(4, 17, 3, 64, FALSE),   -- Leon Kroos (MID) scores at 64'
(4, 18, 3, 82, FALSE),   -- Klaus Werner (FWD) scores at 82'

-- Fixture 5: Team M&S vs Team Incredibles (2-0)
(5, 22, 4, 31, FALSE),   -- Michel Lambert (MID) scores at 31'
(5, 24, 4, 69, FALSE),   -- Thierry Henry (FWD) scores at 69'

-- Fixture 6: Santiago Bernabuet vs Team Mighty (1-1)
(6, 5, 1, 42, FALSE),    -- Javier Gonzalez (MID) scores at 42'
(6, 18, 3, 54, FALSE),   -- Klaus Werner (FWD) scores at 54'

-- Fixture 7: Team Incredibles vs Revenue Soldier (2-1)
(7, 26, 5, 26, FALSE),   -- Alessandro Ferrari (DEF) scores at 26'
(7, 29, 5, 58, FALSE),   -- Andrea Marino (MID) scores at 58'
(7, 12, 2, 70, FALSE),   -- Jack Jones (FWD) scores at 70'

-- Fixture 8: Team Mighty vs Santiago Bernabuet (0-3)
(8, 2, 1, 22, FALSE),    -- Carlos Rodriguez (DEF) scores at 22'
(8, 4, 1, 45, FALSE),    -- Fernando Silva (MID) scores at 45'
(8, 6, 1, 75, TRUE),     -- Luis Morales (FWD) scores at 75' (penalty)

-- Fixture 9: Team M&S vs Revenue Soldier (1-2)
(9, 24, 4, 51, FALSE),   -- Thierry Henry (FWD) scores at 51'
(9, 8, 2, 34, FALSE),    -- James Brown (DEF) scores at 34'
(9, 12, 2, 67, FALSE),   -- Jack Jones (FWD) scores at 67'

-- Fixture 10: Santiago Bernabuet vs Team M&S (2-1) from gameweek4_update
(10, 3, 1, 27, FALSE),   -- Miguel Hernandez (DEF) scores at 27'
(10, 5, 1, 62, FALSE),   -- Javier Gonzalez (MID) scores at 62'
(10, 24, 4, 39, FALSE),  -- Thierry Henry (FWD) scores at 39'

-- Fixture 11: Revenue Soldier vs Team Incredibles (0-2) from gameweek4_update
(11, 26, 5, 44, FALSE),  -- Alessandro Ferrari (DEF) scores at 44'
(11, 29, 5, 73, FALSE),  -- Andrea Marino (MID) scores at 73'

-- Fixture 12: Mighty vs Team Incredibles (3-0) from gameweek4_update
(12, 14, 3, 18, FALSE),  -- Thomas Müller (DEF) scores at 18'
(12, 16, 3, 51, FALSE),  -- Franz Becker (MID) scores at 51'
(12, 18, 3, 65, FALSE);  -- Klaus Werner (FWD) scores at 65'

-- -----------------------------------------
-- Assists table data based on existing stats
-- -----------------------------------------
INSERT INTO assists (fixture_id, player_id, assisted_to, team_id, minute)
VALUES
-- Fixture 1: Santiago Bernabuet vs Revenue Soldier (3-1)
(1, 2, 4, 1, 23),     -- Carlos Rodriguez assists Fernando Silva at 23'
(1, 5, 6, 1, 67),     -- Javier Gonzalez assists Luis Morales at 67'
(1, 10, 11, 2, 52),   -- Oliver Evans assists Leo Smith at 52'

-- Fixture 2: Team Mighty vs Team M&S (2-2)
(2, 14, 16, 3, 12),   -- Thomas Müller assists Franz Becker at 12'
(2, 17, 18, 3, 55),   -- Leon Kroos assists Klaus Werner at 55'
(2, 22, 21, 4, 38),   -- Michel Lambert assists Jean Bernard at 38'
(2, 23, 24, 4, 79),   -- Paul Dubois assists Thierry Henry at 79'

-- Fixture 3: Team Incredibles vs Santiago Bernabuet (0-2)
(3, 2, 5, 1, 29),     -- Carlos Rodriguez assists Javier Gonzalez at 29'

-- Fixture 4: Revenue Soldier vs Team Mighty (1-3)
(4, 15, 14, 3, 35),   -- Hans Wagner assists Thomas Müller at 35'
(4, 16, 17, 3, 64),   -- Franz Becker assists Leon Kroos at 64'

-- Fixture 5: Team M&S vs Team Incredibles (2-0)
(5, 20, 22, 4, 31),   -- Pierre Martin assists Michel Lambert at 31'
(5, 23, 24, 4, 69),   -- Paul Dubois assists Thierry Henry at 69'

-- Fixture 6: Santiago Bernabuet vs Team Mighty (1-1)
(6, 4, 5, 1, 42),     -- Fernando Silva assists Javier Gonzalez at 42'
(6, 15, 18, 3, 54),   -- Hans Wagner assists Klaus Werner at 54'

-- Fixture 7: Team Incredibles vs Revenue Soldier (2-1)
(7, 28, 26, 5, 26),   -- Roberto Conti assists Alessandro Ferrari at 26'
(7, 30, 29, 5, 58),   -- Giuseppe Romano assists Andrea Marino at 58'
(7, 11, 12, 2, 70),   -- Leo Smith assists Jack Jones at 70'

-- Fixture 8: Team Mighty vs Santiago Bernabuet (0-3)
(8, 3, 2, 1, 22),     -- Miguel Hernandez assists Carlos Rodriguez at 22'
(8, 5, 4, 1, 45),     -- Javier Gonzalez assists Fernando Silva at 45'

-- Fixture 9: Team M&S vs Revenue Soldier (1-2)
(9, 23, 24, 4, 51),   -- Paul Dubois assists Thierry Henry at 51'
(9, 10, 8, 2, 34),    -- Oliver Evans assists James Brown at 34'
(9, 11, 12, 2, 67),   -- Leo Smith assists Jack Jones at 67'

-- Fixture 10: Santiago Bernabuet vs Team M&S (2-1) from gameweek4_update
(10, 2, 3, 1, 27),    -- Carlos Rodriguez assists Miguel Hernandez at 27'
(10, 6, 5, 1, 62),    -- Luis Morales assists Javier Gonzalez at 62'
(10, 23, 24, 4, 39),  -- Paul Dubois assists Thierry Henry at 39'

-- Fixture 11: Revenue Soldier vs Team Incredibles (0-2) from gameweek4_update
(11, 27, 26, 5, 44),  -- Leonardo Bianchi assists Alessandro Ferrari at 44'
(11, 28, 29, 5, 73),  -- Roberto Conti assists Andrea Marino at 73'

-- Fixture 12: Mighty vs Team Incredibles (3-0) from gameweek4_update
(12, 15, 14, 3, 18),  -- Hans Wagner assists Thomas Müller at 18'
(12, 17, 16, 3, 51),  -- Leon Kroos assists Franz Becker at 51'
(12, 17, 18, 3, 65);  -- Leon Kroos assists Klaus Werner at 65'

-- -----------------------------------------
-- Yellow Cards table data based on existing stats
-- -----------------------------------------
INSERT INTO yellow_cards (fixture_id, player_id, team_id, minute)
VALUES
-- Fixture 1: Santiago Bernabuet vs Revenue Soldier (3-1)
(1, 3, 1, 32),     -- Miguel Hernandez at 32'
(1, 12, 2, 75),    -- Jack Jones at 75'

-- Fixture 2: Team Mighty vs Team M&S (2-2)
(2, 15, 3, 41),    -- Hans Wagner at 41'
(2, 23, 4, 59),    -- Paul Dubois at 59'

-- Fixture 3: Team Incredibles vs Santiago Bernabuet (0-2)
(3, 26, 5, 18),    -- Alessandro Ferrari at 18'
(3, 29, 5, 36),    -- Andrea Marino first yellow at 36'
(3, 29, 5, 67),    -- Andrea Marino second yellow at 67' (should result in red card)

-- Fixture 4: Revenue Soldier vs Team Mighty (1-3)
(4, 8, 2, 28),     -- James Brown at 28'
(4, 16, 3, 55),    -- Franz Becker at 55'

-- Fixture 6: Santiago Bernabuet vs Team Mighty (1-1)
(6, 6, 1, 50),     -- Luis Morales at 50'
(6, 14, 3, 62),    -- Thomas Müller at 62'

-- Fixture 7: Team Incredibles vs Revenue Soldier (2-1)
(7, 30, 5, 81),    -- Giuseppe Romano at 81'
(7, 9, 2, 44),     -- Harry Taylor at 44'

-- Fixture 8: Team Mighty vs Santiago Bernabuet (0-3)
(8, 15, 3, 37),    -- Hans Wagner at 37'
(8, 17, 3, 52),    -- Leon Kroos first yellow at 52'
(8, 17, 3, 78),    -- Leon Kroos second yellow at 78' (should result in red card)

-- Fixture 9: Team M&S vs Revenue Soldier (1-2)
(9, 20, 4, 29),    -- Pierre Martin at 29'
(9, 12, 2, 84),    -- Jack Jones at 84'

-- Fixture 10: Santiago Bernabuet vs Team M&S (2-1) from gameweek4_update
(10, 4, 1, 33),    -- Fernando Silva at 33'
(10, 20, 4, 47),   -- Pierre Martin at 47'

-- Fixture 11: Revenue Soldier vs Team Incredibles (0-2) from gameweek4_update
(11, 9, 2, 56),    -- Harry Taylor at 56'

-- Fixture 12: Mighty vs Team Incredibles (3-0) from gameweek4_update
(12, 26, 5, 42),   -- Alessandro Ferrari at 42'
(12, 30, 5, 76);   -- Giuseppe Romano at 76'

-- -----------------------------------------
-- Red Cards table data based on existing stats
-- -----------------------------------------
INSERT INTO red_cards (fixture_id, player_id, team_id, minute, is_straight_red)
VALUES
-- Fixture 3: Team Incredibles vs Santiago Bernabuet (0-2)
(3, 29, 5, 67, FALSE),    -- Andrea Marino second yellow at 67' (resulted in red)

-- Fixture 8: Team Mighty vs Santiago Bernabuet (0-3)
(8, 17, 3, 78, FALSE);    -- Leon Kroos second yellow at 78' (resulted in red)

-- -----------------------------------------
-- Own Goals table data
-- -----------------------------------------
INSERT INTO own_goals (fixture_id, player_id, team_id, minute)
VALUES
-- Adding a few own goals that weren't in the original data for demonstration
(2, 20, 4, 88),     -- Pierre Martin own goal at 88' (not in original data)
(7, 9, 2, 32),      -- Harry Taylor own goal at 32' (not in original data)
(11, 8, 2, 61);     -- James Brown own goal at 61' (not in original data)