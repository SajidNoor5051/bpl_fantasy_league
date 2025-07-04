import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';


export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch all players with their team information
   // console.log("Inside fetch players ");
    const { data, error } = await supabase
      .from('players')
      .select(`
        player_id,
        first_name,
        last_name,
        position,
        fantasy_price,
        team_id,
        fantasy_points,
        teams (
          team_name,
          team_short_name
        )
      `)
      .order('fantasy_price', { ascending: false });

    if (error) {
      console.error('Error fetching players:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If no players found, return an empty array
    if (!data || data.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Reshape the data for easier consumption by the frontend
    const formattedPlayers = data.map((player:any) => ({
      player_id: player.player_id,
      first_name: player.first_name,
      last_name: player.last_name,
      position: player.position,
      team_id: player.team_id,
      team_name: player.teams?.team_name || 'Free Agent',
      team_short_name: player.teams?.team_short_name || 'FA',
      fantasy_price: player.fantasy_price,
      fantasy_points: player.fantasy_points // In a real implementation, this would be calculated from match stats
    }));

    //console.log(formattedPlayers[0].total_points + ' name : ' + formattedPlayers[0].first_name)

    return NextResponse.json(formattedPlayers, { status: 200 });
  } catch (error) {
    console.error('Error in players API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}