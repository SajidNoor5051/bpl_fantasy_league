import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Stats categories available in the API
const validCategories = ['goals', 'assists', 'yellow_cards', 'red_cards', 'saves', 'fantasy_points'];

export async function GET(request: NextRequest) {
  // Parse the category from the URL
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'goals';
  
  // Validate category
  if (!validCategories.includes(category)) {
    return NextResponse.json(
      { error: `Invalid category. Valid options are: ${validCategories.join(', ')}` }, 
      { status: 400 }
    );
  }

  try {
    
    let data;
    let error;
    
    // Different query logic based on category
    if (category === 'goals') {
      // Query goals table
      ({ data, error } = await supabase
        .from('goals')
        .select(`
          player_id,
          players!inner(
            player_id,
            first_name,
            last_name,
            position,
            fantasy_price,
            teams!inner(team_name, team_short_name)
          )
        `));
    } 
    else if (category === 'assists') {
      // Query assists table - use the specific foreign key for the assisting player
      ({ data, error } = await supabase
        .from('assists')
        .select(`
          player_id,
          players!assists_player_id_fkey(
            player_id,
            first_name,
            last_name,
            position,
            fantasy_price,
            teams!inner(team_name, team_short_name)
          )
        `));
    }
    else if (category === 'yellow_cards') {
      // Query yellow_cards table
      ({ data, error } = await supabase
        .from('yellow_cards')
        .select(`
          player_id,
          players!inner(
            player_id,
            first_name,
            last_name,
            position,
            fantasy_price,
            teams!inner(team_name, team_short_name)
          )
        `));
    }
    else if (category === 'red_cards') {
      // Query red_cards table
      ({ data, error } = await supabase
        .from('red_cards')
        .select(`
          player_id,
          players!inner(
            player_id,
            first_name,
            last_name,
            position,
            fantasy_price,
            teams!inner(team_name, team_short_name)
          )
        `));
    }
    else if (category === 'saves') {
      // Query player_match_stats for saves (GK only)
      ({ data, error } = await supabase
        .from('player_match_stats')
        .select(`
          players!inner(
            player_id,
            first_name,
            last_name,
            position,
            fantasy_price,
            teams!inner(team_name, team_short_name)
          ),
          saves
        `)
        .eq('players.position', 'GK')
        .gt('saves', 0));
    }
    else if (category === 'fantasy_points') {
      // Query player_match_stats for fantasy points
      ({ data, error } = await supabase
        .from('player_match_stats')
        .select(`
          players!inner(
            player_id,
            first_name,
            last_name,
            position,
            fantasy_price,
            teams!inner(team_name, team_short_name)
          ),
          fantasy_points
        `)
        .gt('fantasy_points', 0));
    }
    
    if (error) {
      console.error('Database query error:', error);
      return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
    }
    
    // Aggregate results by player
    if (data) {
      const playerStatsMap = new Map();
      
      // Process data based on category
      data.forEach((item: any) => {
        const playerId = item.players.player_id;
        let statValue = 1; // Default value for event-based stats (goals, assists, cards)
        
        // For saves and fantasy_points, get the actual value
        if (category === 'saves') {
          statValue = item.saves || 0;
        } else if (category === 'fantasy_points') {
          statValue = item.fantasy_points || 0;
        }
        
        if (playerStatsMap.has(playerId)) {
          // Update existing entry with additional stats
          const currentValue = playerStatsMap.get(playerId).value;
          playerStatsMap.get(playerId).value = currentValue + statValue;
        } else {
          // Create new entry for this player
          playerStatsMap.set(playerId, {
            player_id: playerId,
            player_name: `${item.players.first_name} ${item.players.last_name}`,
            team_name: item.players.teams.team_name,
            team_short_name: item.players.teams.team_short_name,
            position: item.players.position,
            value: statValue,
            fantasy_price: item.players.fantasy_price
          });
        }
      });
      
      // Convert map to array and sort by the stat value
      data = Array.from(playerStatsMap.values())
        .filter(player => player.value > 0)  // Only include players with positive stats
        .sort((a, b) => b.value - a.value)
        .slice(0, 10); // Limit to top 10 players
    }

    return NextResponse.json({ 
      category,
      data: data || []
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}