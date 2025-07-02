-- Insert Goals for Gameweek 1 Matches
-- BPL Fantasy League Season 6

-- Match 1: Team Mighty vs NR Warriors (Fixture ID: 1)
-- Result: Team Mighty 1 - 0 NR Warriors
INSERT INTO goals (fixture_id, player_id, team_id, minute, is_penalty) VALUES 
(1, 30, 3, 30, false); -- Tanmoy (Team Mighty) scored at 30 minutes

-- Match 2: Team M&S vs Team Incredibles (Fixture ID: 2)
-- Result: Team M&S 2 - 2 Team Incredibles
INSERT INTO goals (fixture_id, player_id, team_id, minute, is_penalty) VALUES 
(2, 79, 4, 12, false), -- Riad (Team M&S) scored at 12 minutes
(2, 4, 5, 20, false),  -- Sifat (Team Incredibles) scored at 20 minutes
(2, 12, 5, 26, false), -- Ananda (Team Incredibles) scored at 26 minutes
(2, 77, 4, 73, false); -- Arny (Team M&S) scored at 73 minutes

-- Match 3: Santiago Bernabeu vs NR Warriors (Fixture ID: 3)
-- Result: Santiago Bernabeu 2 - 1 NR Warriors
INSERT INTO goals (fixture_id, player_id, team_id, minute, is_penalty) VALUES 
(3, 117, 2, 19, false), -- Shovon (NR Warriors) scored at 19 minutes
(3, 54, 1, 45, false),  -- Nipun (Santiago Bernabeu) scored at 45 minutes
(3, 57, 1, 55, false);  -- Nadeem (Santiago Bernabeu) scored at 55 minutes 