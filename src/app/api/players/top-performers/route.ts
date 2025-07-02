import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get top players by aggregating fantasy points from player_match_stats
    const { data, error } = await supabase
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
      .gt('fantasy_points', 0)
      
    if (error) {
      console.error('Error fetching top players:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Calculate total fantasy points per player
    const playerPointsMap = new Map()
    
    data?.forEach((stat:any) => {
      const playerId = stat.players.player_id
      const points = stat.fantasy_points || 0
      
      if (playerPointsMap.has(playerId)) {
        // Add points to existing player
        const playerData = playerPointsMap.get(playerId)
        playerPointsMap.set(playerId, {
          ...playerData,
          points: playerData.points + points
        })
      } else {
        // Create new player entry
        playerPointsMap.set(playerId, {
          id: playerId,
          name: `${stat.players.first_name} ${stat.players.last_name}`,
          position: stat.players.position,
          team: stat.players.teams?.team_name || 'Free Agent',
          team_short: stat.players.teams?.team_short_name,
          points: points
        })
      }
    })
    
    // Convert map to array and sort by points
    const playersList = Array.from(playerPointsMap.values())
      .sort((a, b) => b.points - a.points)
      .slice(0, 3) // Changed from 3 to 5
      
    return NextResponse.json(playersList, { status: 200 })
  } catch (error) {
    console.error('Error fetching top players:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}