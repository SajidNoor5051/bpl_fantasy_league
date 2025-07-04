-- 1. Update players table with total fantasy points from player_match_stats
UPDATE players 
SET fantasy_points = subquery.total_points
FROM (
    SELECT 
        player_id,
        SUM(fantasy_points) AS total_points
    FROM player_match_stats 
    GROUP BY player_id
) AS subquery
WHERE players.player_id = subquery.player_id;




-- 2. Preview the update (SELECT version)
SELECT 
    p.player_id,
    p.first_name,
    p.fantasy_price,
    COALESCE(subquery.total_points, 0) AS new_fantasy_points
FROM players p
LEFT JOIN (
    SELECT 
        player_id,
        SUM(fantasy_points) AS total_points
    FROM player_match_stats 
    GROUP BY player_id
) AS subquery ON p.player_id = subquery.player_id
ORDER BY new_fantasy_points DESC;