-- Demo data for teams table with manager_name
-- Created on: June 6, 2025

-- Clear any existing data from the teams table
TRUNCATE TABLE teams RESTART IDENTITY CASCADE;



-- Insert 5 demo teams with their managers and colors
INSERT INTO teams (
    team_name, 
    team_short_name, 
    logo_url, 
    founded_year, 
    home_stadium, 
    team_color,
    manager_name
) VALUES 
-- Team 1: Santiago Bernabuet
(
    'Santiago Bernabuet',
    'SBT',
    'https://example.com/logos/santiago.png',
    2010,
    'Bernabuet Stadium',
    '#FFFFFF', -- White
    'Miljer Machel'
),
-- Team 2: Revenue Soldier
(
    'Revenue Soldier',
    'RSO',
    'https://example.com/logos/revenue.png',
    2012,
    'Revenue Arena',
    '#008000', -- Green
    'Hamidur Rahman'
),
-- Team 3: Team Mighty
(
    'Team Mighty',
    'TMY',
    'https://example.com/logos/mighty.png',
    2015,
    'Mighty Stadium',
    '#0000FF', -- Blue
    'Amir Shafin'
),
-- Team 4: Team M&S
(
    'Team M&S',
    'TMS',
    'https://example.com/logos/ms.png',
    2018,
    'M&S Arena',
    '#000000', -- Black
    'Salman'
),
-- Team 5: Team Incredibles
(
    'Team Incredibles',
    'TIC',
    'https://example.com/logos/incredibles.png',
    2020,
    'Incredibles Stadium',
    '#FF0000', -- Red
    'Abu Ashraf'
);
