-- Insert Player Match Stats for NR Warriors Players
-- BPL Fantasy League Season 6 - Gameweek 1

-- Match 1: Team Mighty vs NR Warriors (Fixture ID: 1)
-- NR Warriors players (23 players)

-- First 12 players with 70 minutes played and calculated fantasy points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
(113, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Jashim: 2 points (appearance)
(114, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Abir: 2 points (appearance)
(115, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sayem Fuad: 2 points (appearance)
(116, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Akash: 2 points (appearance)
(117, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Shovon: 2 points (appearance)
(118, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tooneer: 2 points (appearance)
(119, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Jamil: 2 points (appearance)
(120, 1, 70, 0, 0, false, 0, 0, 2, 0, 0, 0, 2), -- Shoumik: 2 points (appearance)
(121, 1, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Turno: 1 point (appearance - yellow card)
(122, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sabbir: 2 points (appearance)
(123, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Nazmul: 2 points (appearance)
(124, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Saurov: 2 points (appearance)

-- Remaining 11 players with 0 minutes played
(125, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shihabul: 0 minutes
(126, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Jisan: 0 minutes
(127, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Afif: 0 minutes
(128, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Nayeb: 0 minutes
(129, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Anirudda: 0 minutes
(130, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mostafizur: 0 minutes
(131, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Hasnat: 0 minutes
(132, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Azmain: 0 minutes
(133, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Arafat Alif: 0 minutes
(134, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Taki: 0 minutes
(135, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Sazzad: 0 minutes

-- Match 3: Santiago Bernabeu vs NR Warriors (Fixture ID: 3)
-- NR Warriors players (23 players)

-- First 12 players with 70 minutes played and calculated fantasy points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
(113, 3, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Jashim: 1 point (appearance - yellow card)
(114, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Abir: 2 points (appearance)
(115, 3, 70, 0, 1, false, 0, 0, 0, 0, 0, 0, 3), -- Sayem Fuad: 3 points (appearance + assist)
(116, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Akash: 2 points (appearance)
(117, 3, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 6), -- Shovon: 6 points (appearance + goal)
(118, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tooneer: 2 points (appearance)
(119, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Jamil: 2 points (appearance)
(120, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Shoumik: 2 points (appearance)
(121, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Turno: 2 points (appearance)
(122, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sabbir: 2 points (appearance)
(123, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Nazmul: 2 points (appearance)
(124, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Saurov: 2 points (appearance)

-- Remaining 11 players with 0 minutes played
(125, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shihabul: 0 minutes
(126, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Jisan: 0 minutes
(127, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Afif: 0 minutes
(128, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Nayeb: 0 minutes
(129, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Anirudda: 0 minutes
(130, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mostafizur: 0 minutes
(131, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Hasnat: 0 minutes
(132, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Azmain: 0 minutes
(133, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Arafat Alif: 0 minutes
(134, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Taki: 0 minutes
(135, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Sazzad: 0 minutes

-- Insert Player Match Stats for Santiago Bernabeu Players
-- Match 3: Santiago Bernabeu vs NR Warriors (Fixture ID: 3)

-- First 12 players with 70 minutes played and calculated fantasy points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
(49, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Badhon: 2 points (appearance)
(50, 3, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Sajid: 1 point (appearance - yellow card)
(51, 3, 70, 0, 1, false, 0, 0, 0, 0, 0, 0, 5), -- Bashar: 5 points (appearance + assist)
(52, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tusher: 2 points (appearance)
(53, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Shammo: 2 points (appearance)
(54, 3, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 6), -- Nipun: 6 points (appearance + goal)
(55, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sazzad Rony: 2 points (appearance)
(56, 3, 70, 0, 0, false, 0, 0, 3, 0, 0, 0, 3), -- Rudra: 3 points (appearance)
(57, 3, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 8), -- Nadeem: 8 points (appearance + goal)
(58, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Mushfiq: 2 points (appearance)
(59, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Noman: 2 points (appearance)
(60, 3, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Ebu: 2 points (appearance)

-- Remaining 11 players with 0 minutes played
(61, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Jaber: 0 minutes
(62, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Atik: 0 minutes
(63, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shiyam: 0 minutes
(64, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Sadi: 0 minutes
(65, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Tahmid: 0 minutes
(66, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mahir: 0 minutes
(67, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Sunzid: 0 minutes
(68, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Tripta: 0 minutes
(69, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shahriar Kabir: 0 minutes
(70, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Arko: 0 minutes
(71, 3, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Tasin: 0 minutes

-- Insert Player Match Stats for Team M&S Players
-- Match 2: Team M&S vs Team Incredibles (Fixture ID: 2)

-- First 12 players with 70 minutes played and calculated fantasy points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
(73, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Bilas: 2 points (appearance)
(74, 2, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Sayem: 1 point (appearance - yellow card)
(75, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sourov: 2 points (appearance)
(76, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tanveer: 2 points (appearance)
(77, 2, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 6), -- Arny: 6 points (appearance + goal)
(78, 2, 70, 0, 1, false, 0, 0, 0, 0, 0, 0, 5), -- Modhupom: 5 points (appearance + assist)
(79, 2, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 6), -- Riad: 6 points (appearance + goal)
(80, 2, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Sadat: 1 point (appearance - yellow card)
(81, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Faiyaz: 2 points (appearance)
(82, 2, 70, 0, 0, false, 0, 0, 3, 0, 0, 0, 3), -- Rabbi: 3 points (appearance)
(83, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tasfiq: 2 points (appearance)
(84, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Nahid: 2 points (appearance)

-- Remaining 11 players with 0 minutes played
(85, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mukit: 0 minutes
(86, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Sahin: 0 minutes
(87, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mamun: 0 minutes
(88, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Rony: 0 minutes
(89, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Touhid: 0 minutes
(90, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Maruf: 0 minutes
(91, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Siam: 0 minutes
(92, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shafkat: 0 minutes
(93, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Rafin: 0 minutes
(94, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Nayeem: 0 minutes
(95, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Nasif: 0 minutes

-- Insert Player Match Stats for Team Mighty Players
-- Match 1: Team Mighty vs NR Warriors (Fixture ID: 1)

-- First 12 players with 70 minutes played and calculated fantasy points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
(25, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Arittro: 2 points (appearance)
(26, 1, 70, 0, 1, false, 1, 0, 0, 0, 0, 0, 4), -- Adnan: 5 points (appearance + assist)
(27, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Mahmud: 2 points (appearance)
(28, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Shams: 2 points (appearance)
(29, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tomal: 2 points (appearance)
(30, 1, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 7), -- Tanmoy: 7 points (appearance + goal)
(31, 1, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Sagor: 1 point (appearance - yellow card)
(32, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Mostak: 2 points (appearance)
(33, 1, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 4), -- Monjur: 1+3 point (appearance - yellow card+bonus for MOTM)
(34, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Yeasir: 2 points (appearance)
(35, 1, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Mridul: 2 points (appearance)
(36, 1, 70, 0, 0, false, 0, 0, 3, 0, 0, 0, 3), -- Fahim: 3 points (appearance)

-- Remaining 11 players with 0 minutes played
(37, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Kamrool: 0 minutes
(38, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mashfi: 0 minutes
(39, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Nazmul: 0 minutes
(40, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Nayeem: 0 minutes
(41, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Rahad: 0 minutes
(42, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Hasib: 0 minutes
(43, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shahriar: 0 minutes
(44, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Moshiur: 0 minutes
(45, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Fahim: 0 minutes
(46, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Wasik: 0 minutes
(47, 1, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Mutakabbir: 0 minutesl: 0 

-- Insert Player Match Stats for Team Incredibles Players
-- Match 2: Team M&S vs Team Incredibles (Fixture ID: 2)

-- First 12 players with 70 minutes played and calculated fantasy points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
(1, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Nirab: 2 points (appearance)
(2, 2, 70, 0, 0, false, 0, 0, 3, 0, 0, 0, 3), -- Sakib: 2 points (appearance)
(3, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Shamim: 2 points (appearance)
(4, 2, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 10), -- Sifat: 10 points (appearance + goal)
(5, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- ASM Tanver: 2 points (appearance)
(6, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tanvir Rana: 2 points (appearance)
(7, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Ebrahim: 2 points (appearance)
(8, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Nayeem: 2 points (appearance)
(9, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Farzin: 2 points (appearance)
(10, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sami: 2 points (appearance)
(11, 2, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Mehrab: 2 points (appearance)
(12, 2, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 6), -- Ananda: 6 points (appearance + goal)

-- Remaining 11 players with 0 minutes played
(13, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Chiranjit: 0 minutes
(14, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Farhan: 0 minutes
(15, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Samin: 0 minutes
(16, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shimul: 0 minutes
(17, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shawon: 0 minutes
(18, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Kabbo: 0 minutes
(19, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shafin: 0 minutes
(20, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Reza: 0 minutes
(21, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Haseeb: 0 minutes
(22, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Azad: 0 minutes
(23, 2, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Adil: 0 minutes 





-- gameweek 2

-- Insert Player Match Stats for Santiago Bernabeu Players
-- Fixture ID 4: Santiago Bernabeu vs Team Incredibles
-- BPL Fantasy League Season 6

INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Players with 70 minutes played
(49, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Badhon: 0 points (appearance - conceded 4 goals)
(50, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sajid: 0 points (appearance - conceded 4 goals)
(51, 4, 70, 0, 1, false, 0, 0, 0, 0, 0, 0, 5), -- Bashar: 5 points (appearance + assist)
(52, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Tusher: 0 points (appearance - conceded 4 goals)
(53, 4, 30, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Shammo: 0 points (appearance - conceded 4 goals)
(54, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Nipun: 0 points (appearance - conceded 4 goals)
(55, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Sazzad Rony: 0 points (appearance - conceded 4 goals)
(56, 4, 70, 0, 0, false, 0, 0, 1, 0, 0, 0, -3), -- Rudra: -3 points (appearance + 1 save - conceded 4 goals - red card)
(57, 4, 70, 1, 0, false, 1, 0, 0, 0, 0, 0, 7), -- Nadeem: 3 points (appearance + goal - yellow card - conceded 4 goals)
(58, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mushfiq: 0 points (appearance - conceded 4 goals)
(59, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Noman: 0 points (appearance - conceded 4 goals)
(60, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Ebu: 0 points (appearance - conceded 4 goals)

-- Players with partial minutes
(66, 4, 30, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Mahir: 1 point (30 minutes played)
(67, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Sunzid (Sojib): 1 point (10 minutes played)
(62, 4, 20, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Atik: 1 point (20 minutes played)
(64, 4, 8, 0, 0, false, 0, 0, 1, 0, 0, 0, 1), -- Sadi: 2 points (8 minutes + 1 save)

-- Remaining players with 0 minutes
(61, 4, 15, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Jaber: 0 minutes
(63, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shiyam: 0 minutes
(65, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Tahmid: 0 minutes
(68, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Tripta: 0 minutes
(69, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shahriar Kabir: 0 minutes
(70, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Arko: 0 minutes
(71, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Tasin: 0 minutes




--team incredibles

-- Insert Player Match Stats for Team Incredibles Players
-- Fixture ID 4: Santiago Bernabeu vs Team Incredibles
-- BPL Fantasy League Season 6

INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Starting players with 70 minutes played
(1, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Nirab: 2 points (appearance)
(2, 4, 60, 0, 0, false, 0, 0, 2, 0, 0, 0, 2), -- Sakib: 2 points (60 minutes + 2 saves, no clean sheet)
(3, 4, 10, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Shamim: 1 point (10 minutes)
(4, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sifat: 2 points (appearance)
(5, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- ASM Tanver: 2 points (appearance)
(6, 4, 70, 2, 0, false, 0, 0, 0, 0, 0, 0, 13), -- Tanvir Rana: 13 points (appearance + 2 goals + bonus)
(7, 4, 0 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Ebrahim: 2 points (appearance)
(8, 4, 10, 1, 0, false, 0, 0, 0, 0, 0, 0, 5), -- Nayeem: 5 points (10 minutes + goal)
(9, 4, 60, 0, 2, false, 0, 0, 0, 0, 0, 0, 8), -- Farzin: 8 points (60 minutes + 2 assists)
(10, 4, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sami: 2 points (appearance)
(11, 4, 70, 0, 1, false, 0, 0, 0, 0, 0, 0, 5), -- Mehrab: 5 points (appearance + assist)
(12, 4, 65, 0, 1, false, 0, 0, 0, 0, 0, 0, 5), -- Ananda: 5 points (65 minutes + assist)
(13, 4, 60, 1, 0, false, 0, 0, 0, 0, 0, 0, 7), -- Chiranjit: 7 points (60 minutes + goal)

-- Remaining players with 0 minutes played
(14, 4, 55, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Farhan: 55 minutes
(15, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Samin: 0 minutes
(16, 4, 10, 0, 0, false, 0, 0, 1, 0, 0, 0, 0), -- Shimul: 0 minutes
(17, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shawon: 0 minutes
(18, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Kabbo: 0 minutes
(19, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shafin: 0 minutes
(20, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Reza: 0 minutes
(21, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Haseeb: 0 minutes
(22, 4, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Azad: 0 minutes
(23, 4, 5, 0, 0, false, 0, 0, 0, 0, 0, 0, 1); -- Adil: 5 minutes






-- Team M&S Player Match Stats for Gameweek 2 - Match vs Team Mighty (Fixture ID: 5)
--team M&S
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Starting XI who played 70 minutes
-- Update Mukit's stats - he saved 1 penalty and made 3 saves total
(85, 5, 70, 0, 0, false, 0, 0, 3, 1, 0, 0, 8), -- Mukit (GK): 8 points (2 appearance + 5 penalty save + 1 for saves)
(80, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sadat: 2 points (appearance)
(75, 5, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Sourov: 1 point (appearance - yellow card)
(93, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Rafin: 2 points (appearance)
(84, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Nahid: 2 points (appearance)
(79, 5, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 10), -- Riad: 10 points (appearance + goal + MOTM bonus)
(76, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tanveer: 2 points (appearance)
(74, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sayem: 2 points (appearance)
(77, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Arny: 2 points (appearance)
(78, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Modhupom: 2 points (appearance)

-- Substitutions
(83, 5, 68, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tasfiq: 2 points (68 minutes played)
(89, 5, 2, 0, 0, false, 1, 0, 0, 0, 0, 0, 0), -- Touhid: 0 points (2 minutes - yellow card)

-- Players who did not play
(73, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Bilas: 0 minutes
(81, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Faiyaz: 0 minutes
(82, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Rabbi: 0 minutes
(86, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Sahin: 0 minutes
(87, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mamun: 0 minutes
(88, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Rony: 0 minutes
(90, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Maruf: 0 minutes
(91, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Siam: 0 minutes
(92, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shafkat: 0 minutes
(94, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Nayeem: 0 minutes
(95, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Nasif: 0 minutes

--team mighty


INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Starting XI
(36, 5, 70, 0, 0, false, 0, 0, 3, 0, 0, 0, 3), -- Fahim (GK): 3 points (2 appearance + 1 for 3 saves)
(29, 5, 68, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Tomal: 0 points (2 appearance - 2 penalty miss)
(35, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Mridul: 2 points (appearance)
(31, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Sagor: 2 points (appearance)
(34, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Yeasir: 2 points (appearance)
(33, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Monjur: 2 points (appearance)
(30, 5, 68, 0, 0, false, 0, 0, 0, 0, 1, 0, 0), -- Tanmoy: 0 points (2 appearance - 2 penalty miss)
(25, 5, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Arittro: 2 points (appearance)
(28, 5, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 6), -- Shams: 6 points (2 appearance + 4 goal)
(26, 5, 70, 0, 1, false, 0, 0, 0, 0, 0, 0, 5), -- Adnan: 5 points (2 appearance + 3 assist)
(27, 5, 67, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Mahmud: 2 points (appearance)

-- Substitutions
(37, 5, 2, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Kamrool: 1 point (2 minutes, sub appearance)
(40, 5, 3, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Nayeem: 1 point (3 minutes, sub appearance)

-- Players who did not play
(32, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mostak: 0 minutes
(38, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mashfi: 0 minutes
(39, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Nazmul: 0 minutes
(41, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Rahad: 0 minutes
(42, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Hasib: 0 minutes
(43, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shahriar: 0 minutes
(44, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Moshiur: 0 minutes
(45, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Fahim: 0 minutes
(46, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Wasik: 0 minutes
(47, 5, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Mutakabbir: 0 minutes