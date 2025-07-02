# BPL Fantasy League - Database Data Insertion Sequence Plan

## Overview
This document outlines the correct sequence for inserting data into the BPL Fantasy League database tables, following foreign key dependencies and ensuring data integrity.

## Data Insertion Sequence

### **Phase 1: Foundation Data** (Insert First - No Dependencies)

#### 1. Teams Table
```sql
INSERT INTO teams (team_name, team_short_name, logo_url, founded_year, home_stadium, team_color) 
VALUES 
('Manchester United', 'MUN', 'logo_url', 1878, 'Old Trafford', '#DA291C'),
('Liverpool', 'LIV', 'logo_url', 1892, 'Anfield', '#C8102E'),
-- Add all BPL teams
```
**Dependencies:** None  
**Purpose:** Real football teams that players belong to

#### 2. Gameweeks Table
```sql
INSERT INTO gameweeks (name, start_date, end_date, is_current, is_processed) 
VALUES 
('Gameweek 1', '2025-06-26 00:00:00', '2025-07-02 23:59:59', true, false),
('Gameweek 2', '2025-07-03 00:00:00', '2025-07-09 23:59:59', false, false),
-- Add all gameweeks
```
**Dependencies:** None  
**Purpose:** Fantasy league gameweeks with dates

---

### **Phase 2: Player Data** (Insert Second - Depends on Teams)

#### 3. Players Table
```sql
INSERT INTO players (team_id, first_name, last_name, position, jersey_number, date_of_birth, nationality, height, weight, fantasy_price) 
VALUES 
(1, 'Marcus', 'Rashford', 'FWD', 10, '1997-10-31', 'England', 180, 70, 8.5),
(1, 'Bruno', 'Fernandes', 'MID', 8, '1994-09-08', 'Portugal', 179, 69, 8.0),
-- Add all players with correct team_id references
```
**Dependencies:** `teams` table (team_id)  
**Purpose:** Football players with their teams, positions, and fantasy prices

---

### **Phase 3: League Structure** (Insert Third - Depends on Teams & Gameweeks)

#### 4. Fixtures Table
```sql
INSERT INTO fixtures (gameweek_id, home_team_id, away_team_id, match_date, stadium, status) 
VALUES 
(1, 1, 2, '2025-06-26 20:00:00', 'Old Trafford', 'SCHEDULED'),
(1, 3, 4, '2025-06-27 15:00:00', 'Emirates Stadium', 'SCHEDULED'),
-- Add all fixtures
```
**Dependencies:** `gameweeks` table (gameweek_id), `teams` table (home_team_id, away_team_id)  
**Purpose:** Matches between teams in specific gameweeks

#### 5. Standings Table
```sql
INSERT INTO standings (team_id, season_year, position, points, matches_played, matches_won, matches_drawn, matches_lost, goals_for, goals_against, goal_difference, form) 
VALUES 
(1, 2025, 1, 0, 0, 0, 0, 0, 0, 0, 0, ''),
(2, 2025, 2, 0, 0, 0, 0, 0, 0, 0, 0, ''),
-- Add all teams with initial standings
```
**Dependencies:** `teams` table (team_id)  
**Purpose:** Current league standings for teams

---

### **Phase 4: Match Events** (Insert Fourth - After Fixtures are Created)

#### 6. Goals Table
```sql
INSERT INTO goals (fixture_id, player_id, team_id, minute, is_penalty) 
VALUES 
(1, 1, 1, 23, false),
(1, 2, 1, 67, true),
-- Add goals as matches are played
```
**Dependencies:** `fixtures` table (fixture_id), `players` table (player_id), `teams` table (team_id)

#### 7. Assists Table
```sql
INSERT INTO assists (fixture_id, player_id, assisted_to, team_id, minute) 
VALUES 
(1, 3, 1, 1, 23),
(1, 4, 2, 1, 67),
-- Add assists as matches are played
```
**Dependencies:** `fixtures` table (fixture_id), `players` table (player_id, assisted_to), `teams` table (team_id)

#### 8. Yellow Cards Table
```sql
INSERT INTO yellow_cards (fixture_id, player_id, team_id, minute) 
VALUES 
(1, 5, 2, 45),
-- Add yellow cards as matches are played
```
**Dependencies:** `fixtures` table (fixture_id), `players` table (player_id), `teams` table (team_id)

#### 9. Red Cards Table
```sql
INSERT INTO red_cards (fixture_id, player_id, team_id, minute, is_straight_red) 
VALUES 
(1, 6, 2, 78, true),
-- Add red cards as matches are played
```
**Dependencies:** `fixtures` table (fixture_id), `players` table (player_id), `teams` table (team_id)

#### 10. Own Goals Table
```sql
INSERT INTO own_goals (fixture_id, player_id, team_id, minute) 
VALUES 
(1, 7, 2, 89),
-- Add own goals as matches are played
```
**Dependencies:** `fixtures` table (fixture_id), `players` table (player_id), `teams` table (team_id)

---

### **Phase 5: Statistics** (Insert Last - After Match Events)

#### 11. Player Match Stats Table
```sql
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) 
VALUES 
(1, 1, 90, 1, 0, false, 0, 0, 0, 0, 0, 0, 7),
(2, 1, 90, 1, 1, false, 0, 0, 0, 0, 0, 0, 8),
-- Add player stats after matches are completed
```
**Dependencies:** `players` table (player_id), `fixtures` table (fixture_id)  
**Purpose:** Individual player performance stats per match

---

## **Tables That DON'T Need Manual Data Entry**

These tables are populated automatically by the application:

| Table | When Created | Purpose |
|-------|--------------|---------|
| `users` | User registration | User accounts |
| `fantasy_teams` | User creates team | User fantasy teams |
| `fantasy_team_players` | User selects players | Players in fantasy teams |
| `transfers` | User makes transfers | Player transfer history |

---

## **Quick Reference Checklist**

- [ ] **Phase 1:** Insert teams data
- [ ] **Phase 1:** Insert gameweeks data
- [ ] **Phase 2:** Insert players data
- [ ] **Phase 3:** Insert fixtures data
- [ ] **Phase 3:** Insert standings data
- [ ] **Phase 4:** Insert match events (as matches are played)
- [ ] **Phase 5:** Insert player match stats (after matches)

---

## **Important Notes**

### **Foreign Key Dependencies**
- Always check that referenced IDs exist before inserting
- Use correct `team_id`, `gameweek_id`, `player_id`, `fixture_id` values
- Ensure data consistency across related tables

### **Data Validation**
- Verify fantasy prices are reasonable (typically 4.0 - 15.0)
- Ensure match dates fall within gameweek dates
- Check that player positions are valid ('GK', 'DEF', 'MID', 'FWD')

### **Performance Considerations**
- Insert data in batches for large datasets
- Use transactions for related data insertions
- Consider using `COPY` command for bulk data insertion

---

## **Next Steps**

1. **Start with Phase 1** - Insert teams and gameweeks
2. **Move to Phase 2** - Insert players with correct team references
3. **Continue with Phase 3** - Create fixtures and standings
4. **Add match events** as the season progresses
5. **Update statistics** after each match

This sequence ensures data integrity and prevents foreign key constraint violations. 