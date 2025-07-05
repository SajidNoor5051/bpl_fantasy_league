


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