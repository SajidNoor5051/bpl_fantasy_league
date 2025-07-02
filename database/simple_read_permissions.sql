





-- Grant all permissions for the new match events tables
-- Created on: June 18, 2025

-- Grant all permissions to anonymous users for full access
GRANT ALL PRIVILEGES ON goals TO anon;
GRANT ALL PRIVILEGES ON assists TO anon;
GRANT ALL PRIVILEGES ON yellow_cards TO anon;
GRANT ALL PRIVILEGES ON red_cards TO anon;
GRANT ALL PRIVILEGES ON own_goals TO anon;

-- Grant all permissions to authenticated users for full access
GRANT ALL PRIVILEGES ON goals TO authenticated;
GRANT ALL PRIVILEGES ON assists TO authenticated;
GRANT ALL PRIVILEGES ON yellow_cards TO authenticated;
GRANT ALL PRIVILEGES ON red_cards TO authenticated;
GRANT ALL PRIVILEGES ON own_goals TO authenticated;

-- Grant sequence privileges
GRANT ALL PRIVILEGES ON SEQUENCE goals_goal_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE assists_assist_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE yellow_cards_yellow_card_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE red_cards_red_card_id_seq TO anon, authenticated;
GRANT ALL PRIVILEGES ON SEQUENCE own_goals_own_goal_id_seq TO anon, authenticated;