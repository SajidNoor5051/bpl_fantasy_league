-- Insert Fixtures for Gameweek 1
-- BPL Fantasy League Season 6

INSERT INTO fixtures (gameweek_id, home_team_id, away_team_id, match_date, home_team_score, away_team_score, status, stadium, is_final) VALUES 
(1, 3, 2, '2025-06-26 20:00:00', 1, 0, 'COMPLETED', 'BUET Central Field', true),
(1, 4, 5, '2025-06-27 20:00:00', 2, 2, 'COMPLETED', 'BUET Central Field', true),
(1, 1, 2, '2025-06-28 20:00:00', 2, 1, 'COMPLETED', 'BUET Central Field', true);

-- Insert Fixtures for Gameweek 2
-- BPL Fantasy League Season 6

INSERT INTO fixtures (gameweek_id, home_team_id, away_team_id, match_date, home_team_score, away_team_score, status, stadium, is_final) VALUES 
(2, 1, 5, '2025-07-03 20:00:00', NULL, NULL, 'SCHEDULED', 'BUET Central Field', false),
(2, 4, 3, '2025-07-04 20:00:00', NULL, NULL, 'SCHEDULED', 'BUET Central Field', false),
(2, 2, 5, '2025-07-05 20:00:00', NULL, NULL, 'SCHEDULED', 'BUET Central Field', false);

-- Insert Fixtures for Gameweek 3
-- BPL Fantasy League Season 6

INSERT INTO fixtures (gameweek_id, home_team_id, away_team_id, match_date, home_team_score, away_team_score, status, stadium, is_final) VALUES 
(3, 4, 1, '2025-07-10 20:00:00', NULL, NULL, 'SCHEDULED', 'BUET Central Field', false),
(3, 3, 5, '2025-07-11 20:00:00', NULL, NULL, 'SCHEDULED', 'BUET Central Field', false),
(3, 4, 2, '2025-07-12 20:00:00', NULL, NULL, 'SCHEDULED', 'BUET Central Field', false),
(3, 3, 1, '2025-07-13 20:00:00', NULL, NULL, 'SCHEDULED', 'BUET Central Field', false);

-- Insert Fixtures for Gameweek 4
-- BPL Fantasy League Season 6

INSERT INTO fixtures (gameweek_id, home_team_id, away_team_id, match_date, home_team_score, away_team_score, status, stadium, is_final) VALUES 
(4, NULL, NULL, '2025-07-18 20:00:00', NULL, NULL, 'SCHEDULED', 'BUET Central Field', false); 