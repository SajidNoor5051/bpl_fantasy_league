-- Insert 4 Gameweeks for BPL Fantasy League (2025)
-- First gameweek is current

INSERT INTO gameweeks (name, start_date, end_date, is_current, is_processed) VALUES 
('Gameweek 1', '2025-06-26 00:00:00', '2025-07-02 23:59:59', true, false),
('Gameweek 2', '2025-07-03 00:00:00', '2025-07-09 23:59:59', false, false),
('Gameweek 3', '2025-07-10 00:00:00', '2025-07-15 23:59:59', false, false),
('Gameweek 4', '2025-07-18 00:00:00', '2025-07-19 23:59:59', false, false);