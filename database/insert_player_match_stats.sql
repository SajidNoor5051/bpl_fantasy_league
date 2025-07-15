


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





 -- Match Team Incredibles vs NR Warriors (Fixture ID: 6)




-- Team Incredibles Player Match Stats for Gameweek 2 - Match vs NR Warriors (Fixture ID: 6)

INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Starting XI
(2, 6, 70, 0, 0, false, 0, 0, 2, 0, 0, 0, 2), -- Sakib (GK): 2 points (appearance + saves)
(5, 6, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- ASM Tanver: 2 points (appearance)
(10, 6, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Sami: 1 point (appearance - yellow card)
(14, 6, 65, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Farhan: 2 points (65 minutes)
(11, 6, 58, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Mehrab: 2 point (58 minutes, <60min)
(4, 6, 70, 1, 0, false, 0, 0, 0, 0, 0, 0, 8), -- Sifat: 8 points (appearance + goal + bonus)
(6, 6, 70, 0, 1, false, 0, 0, 0, 0, 0, 0, 5), -- Tanvir Rana: 5 points (appearance + assist)
(9, 6, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Farzin: 2 points (appearance)
(13, 6, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Chiranjit: 2 points (appearance)
(1, 6, 55, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Nirab: 2 point (55 minutes, <60min)
(12, 6, 65, 2, 0, false, 0, 0, 0, 0, 0, 0, 13), -- Ananda: 13 points (appearance + 2 goals + MOTM bonus)

-- Substitutes
(3, 6, 12, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Shamim: 1 point (12 minutes)
(8, 6, 15, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Nayeem: 1 point (15 minutes)
(15, 6, 5, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Samin: 1 point (5 minutes)
(7, 6, 5, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Ebrahim: 1 point (5 minutes)

-- Players who did not play
(16, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shimul: 0 minutes
(17, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shawon: 0 minutes
(18, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Kabbo: 0 minutes
(19, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shafin: 0 minutes
(20, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Reza: 0 minutes
(21, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Haseeb: 0 minutes
(22, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Azad: 0 minutes
(23, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Adil: 0 minutes






-- NR Warriors Player Match Stats for Gameweek 2 - Match vs Team Incredibles (Fixture ID: 6)

INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Starting XI
(113, 6, 70, 1, 0, false, 0, 0, 2, 0, 0, 0, 6), -- Jashim: 6 points (2 appearance + 4 goal)
(118, 6, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Tooneer (DEF): 1 point (no clean sheet)
(116, 6, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Akash (DEF): 1 point (no clean sheet)
(114, 6, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Abir (DEF): 1 point (no clean sheet)
(136, 6, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- faiyaz (DEF): 1 point (no clean sheet)

(128, 6, 55, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Nayeb: 1 point (55 minutes - yellow card)
(124, 6, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Saurov: 2 points (appearance)
(119, 6, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Jamil: 2 points (appearance)
(121, 6, 50, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Turno (DEF): 1 point (50 minutes, no clean sheet)
(117, 6, 70, 0, 1, false, 0, 0, 0, 0, 0, 0, 5), -- Shovon: 5 points (2 appearance + 3 assist)
(115, 6, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Fuad: 1 point (2 appearance - 1 yellow)

-- Substitutes
(129, 6, 10, 0, 0, false, 0, 0, 1, 0, 0, 0, 1), -- Aniruddha: 1 point (10 minutes + 1 save)
(123, 6, 20, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Nazmul: 1 point (20 minutes)

-- Players who did not play
(120, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Soumik: 0 minutes
(122, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Sabbir: 0 minutes
(125, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shihabul: 0 minutes
(126, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Jisan: 0 minutes
(127, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Afif: 0 minutes
(130, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mostafizur: 0 minutes
(131, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Hasnat: 0 minutes
(132, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Azmain: 0 minutes
(133, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Alif: 0 minutes
(134, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Taki: 0 minutes
(135, 6, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Sazzad: 0 minutes





-- Badhon: 70 mins, 2 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (49, 16, 70, 2);

-- Sajid: 70 mins, 2 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (50, 16, 70, 2);

-- Bashar: 70 mins, 2 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (51, 16, 70, 2);

-- Tusher: 70 mins, own goal, 2 goals conceded, 1 yellow, -2 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points, own_goals, goals_conceded, yellow_cards)
VALUES (52, 16, 70, -2, 1, 2, 1);

-- Shammo: 70 mins, 2 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (53, 16, 70, 2);

-- Nipun: 50 mins (sub), 2 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (54, 16, 50, 2);

-- Sazzad Rony: 70 mins, 2 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (55, 16, 70, 2);

-- Rudra: 0 mins, 0 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (56, 16, 0, 0);

-- Nadeem: 70 mins, 2 goals conceded, 1 point
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points, goals_conceded)
VALUES (57, 16, 70, 1, 2);

-- Mushfiq: 70 mins, 2 goals conceded, 1 point
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points, goals_conceded)
VALUES (58, 16, 70, 1, 2);

-- Noman: 0 mins, 0 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (59, 16, 0, 0);

-- Ebu: 70 mins, 2 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (60, 16, 70, 2);

-- Jaber: 0 mins, 0 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (61, 16, 0, 0);

-- Atik: 20 mins (sub), 1 point
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (62, 16, 20, 1);

-- Shiyam: 0 mins, 0 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (63, 16, 0, 0);

-- Sadi (GK): 70 mins, 2 goals conceded, 2 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points, goals_conceded)
VALUES (64, 16, 70, 2, 2);

-- Tahmid: 15 mins (sub), 1 point
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (65, 16, 15, 1);

-- Mahir: 20 mins, 1 point
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (66, 16, 20, 1);

-- Sunzid: 0 mins, 0 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (67, 16, 0, 0);

-- Tripta: 0 mins, 0 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (68, 16, 0, 0);

-- Shahriar Kabir: 0 mins, 0 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (69, 16, 0, 0);

-- Arko: 0 mins, 0 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (70, 16, 0, 0);

-- Tasin: 0 mins, 0 points
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, fantasy_points)
VALUES (71, 16, 0, 0);

-- Team Mighty Player Match Stats for Fixture 17: Team Mighty vs The Incredibles
-- Result: Team Mighty 0 - 0 The Incredibles
-- BPL Fantasy League Season 6

INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Starting XI
(36, 17, 70, 0, 0, true, 0, 0, 2, 0, 0, 0, 6), -- Fahim (GK): 6 points (2 appearance + 4 clean sheet)
(29, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 9), -- Tomal: 9 points (2 appearance + 4 clean sheet + 3 MOTM bonus)
(31, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 6), -- Sagor: 6 points (2 appearance + 4 clean sheet)
(35, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 6), -- Mridul: 6 points (2 appearance + 4 clean sheet)
(34, 17, 70, 0, 0, true, 1, 0, 0, 0, 0, 0, 5), -- Yeasir: 5 points (2 appearance + 4 clean sheet - 1 yellow card)
(33, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 3), -- Monjur: 3 points (2 appearance + 1 midfielder)
(30, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 3), -- Tanmoy: 3 points (2 appearance + 1 midfielder)
(25, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 3), -- Arittro: 3 points (2 appearance + 1 midfielder)
(28, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 2), -- Shams: 2 points (appearance)
(26, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 2), -- Adnan: 2 points (appearance)
(27, 17, 70, 0, 0, true, 1, 0, 0, 0, 0, 0, 1), -- Mahmud: 1 point (2 appearance - 1 yellow card)

-- Players who did not play
(32, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mostak: 0 minutes
(37, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Kamrool: 0 minutes
(38, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Mashfi: 0 minutes
(39, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Nazmul: 0 minutes
(40, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Nayeem: 0 minutes
(41, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Rahad: 0 minutes
(42, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Hasib: 0 minutes
(43, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shahriar: 0 minutes
(44, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Moshiur: 0 minutes
(45, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Fahim: 0 minutes
(46, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Wasik: 0 minutes
(47, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Mutakabbir: 0 minutes

-- Team Incredibles Player Match Stats for Fixture 17: Team Mighty vs The Incredibles
-- Result: Team Mighty 0 - 0 The Incredibles
-- BPL Fantasy League Season 6

INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Starting XI
(2, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 6), -- Sakib (GK): 6 points (2 appearance + 4 clean sheet)
(14, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 6), -- Farhan: 6 points (2 appearance + 4 clean sheet)
(10, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 6), -- Sami: 6 points (2 appearance + 4 clean sheet)
(5, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 6), -- ASM Tanver: 6 points (2 appearance + 4 clean sheet)
(11, 17, 55, 0, 0, true, 0, 0, 0, 0, 0, 0, 6), -- Mehrab: 6 points (2 appearance + 4 clean sheet)
(4, 17, 70, 0, 0, true, 0, 0, 0, 0, 0, 0, 6), -- Sifat: 6 points (2 appearance + 4 clean sheet)
(1, 17, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 3), -- Nirab: 3 points (2 appearance + 1 midfielder)
(9, 17, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 3), -- Farzin: 3 points (2 appearance + 1 midfielder)
(12, 17, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Ananda: 2 points (appearance)
(6, 17, 70, 0, 0, false, 1, 0, 0, 0, 0, 0, 1), -- Tanvir Rana: 1 point (2 appearance - 1 yellow card)
(13, 17, 63, 0, 0, false, 0, 0, 0, 0, 0, 0, 2), -- Chiranjit: 2 points (appearance)

-- Substitutes
(8, 17, 7, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Nayeem: 1 point (7 minutes)
(20, 17, 5, 0, 0, false, 0, 0, 0, 0, 0, 0, 1), -- Reza: 1 point (5 minutes)

-- Players who did not play
(3, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shamim: 0 minutes
(7, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Ebrahim: 0 minutes
(15, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Samin: 0 minutes
(16, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shimul: 0 minutes
(17, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shawon: 0 minutes
(18, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Kabbo: 0 minutes
(19, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Shafin: 0 minutes
(21, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Haseeb: 0 minutes
(22, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0), -- Azad: 0 minutes
(23, 17, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0); -- Adil: 0 minutes









-- Insert Player Match Stats for Fixture ID 19: Team Mighty vs Santiago Bernabeu

-- Team Mighty Players
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Players with special events
(27, 19, 62, 2, 0, false, 0, 0, 0, 0, 0, 0, 13), -- Mahmud: 13 points (2 appearance + 8 goals + 3 MOTM bonus)
(26, 19, 70, 0, 1, false, 0, 0, 0, 0, 0, 0, 5),  -- Adnan: 5 points (2 appearance + 3 assist)
(28, 19, 63, 0, 1, false, 1, 0, 0, 0, 0, 0, 4),  -- Shams: 4 points (2 appearance + 3 assist - 1 yellow)
(30, 19, 60, 0, 0, false, 1, 0, 0, 0, 0, 0, 1),  -- Tanmoy: 1 point (2 appearance - 1 yellow)
(35, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 1, 0),  -- Mridul: 0 points (2 appearance - 2 own goal)

-- Starting XI (appearance only)
(36, 19, 70, 0, 0, false, 0, 0, 3, 0, 0, 0, 3),  -- Fahim (GK)
(29, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Tomal
(31, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Sagor
(34, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Yeasir
(33, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Monjur
(25, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Arittro

-- Substitutes
(38, 19, 10, 0, 0, false, 0, 0, 0, 0, 0, 0, 1),  -- Mashfi: 1 point (10 minutes)
(42, 19, 8, 0, 0, false, 0, 0, 0, 0, 0, 0, 1),   -- Hasib: 1 point (8 minutes)
(39, 19, 7, 0, 0, false, 0, 0, 0, 0, 0, 0, 1),   -- Nazmul: 1 point (7 minutes)

-- Players who did not play
(32, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Mostak
(37, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Kamrool
(40, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Nayeem
(41, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Rahad
(43, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Shahriar
(44, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Moshiur
(45, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Fahim
(46, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Wasik
(47, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Mutakabbir
(48, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0);   -- Nishat



-- Santiago Bernabeu Players
INSERT INTO player_match_stats (player_id, fixture_id, minutes_played, goals_scored, assists, clean_sheet, yellow_cards, red_cards, saves, penalties_saved, penalties_missed, own_goals, fantasy_points) VALUES 
-- Players with special events
(57, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 1, -1),  -- Nadeem: 0 points (2 appearance - 2 own goal)

-- Starting XI (appearance only)
(49, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Badhon
(50, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Sajid
(51, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Bashar
(52, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 1),  -- Tusher: 1 point (2 appearance - 1 for conceding 3 goals)
(53, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Shammo
(54, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Nipun
(55, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Sazzad Rony
(56, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Rudra
(58, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 1),  -- Mushfiq: 1 point (2 appearance - 1 for conceding 3 goals)
(59, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),  -- Noman
(60, 19, 70, 0, 0, false, 0, 0, 0, 0, 0, 0, 2),  -- Ebu

-- Players who did not play
(61, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Jaber
(62, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Atik
(63, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Shiyam
(64, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Sadi
(65, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Tahmid
(66, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Mahir
(67, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Sunzid
(68, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Tripta
(69, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Shahriar Kabir
(70, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),   -- Arko
(71, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0),  -- Tasin
(72, 19, 0, 0, 0, false, 0, 0, 0, 0, 0, 0, 0);   -- Sayem