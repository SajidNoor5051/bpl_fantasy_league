import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  try {
    const { fantasy_team_id, captain_id, vice_captain_id, substitutes ,gameWeekID} = await request.json();
    
    // Validate required fields
    if (!fantasy_team_id) {
      return NextResponse.json({ 
        error: 'Fantasy team ID is required' 
      }, { status: 400 })
    }
    
    if (!captain_id || !vice_captain_id) {
      return NextResponse.json({ 
        error: 'Captain and vice captain IDs are required' 
      }, { status: 400 })
    }
    
    if (!Array.isArray(substitutes)) {
      return NextResponse.json({ 
        error: 'Bench players must be provided as an array' 
      }, { status: 400 })
    }
    
    if (!gameWeekID) {
      return NextResponse.json({ 
        error: 'Gameweek ID is required' 
      }, { status: 400 })
    }
    
    // 1. Reset all captain and vice-captain designations
    const { error: resetError } = await supabase
      .from('fantasy_team_players')
      .update({ 
        is_captain: false, 
        is_vice_captain: false 
      })
      .eq('fantasy_team_id', fantasy_team_id)
      .eq('gameweek_id', gameWeekID)
      
    if (resetError) {
      console.error('Error resetting captain/vice-captain:', resetError)
      return NextResponse.json({ 
        error: 'Failed to update team' 
      }, { status: 500 })
    }
    
    // 2. Set all players to starting
    const { error: startingError } = await supabase
      .from('fantasy_team_players')
      .update({ is_starting: true })
      .eq('fantasy_team_id', fantasy_team_id)
      .eq('gameweek_id', gameWeekID)
      
    if (startingError) {
      console.error('Error updating starting players:', startingError)
      return NextResponse.json({ 
        error: 'Failed to update team' 
      }, { status: 500 })
    }
    
    // 3. Set bench players to not starting
    if (substitutes.length > 0) {
      const { error: benchError } = await supabase
        .from('fantasy_team_players')
        .update({ is_starting: false })
        .eq('fantasy_team_id', fantasy_team_id)
        .eq('gameweek_id', gameWeekID)
        .in('player_id', substitutes)
        
      if (benchError) {
        console.error('Error updating bench players:', benchError)
        return NextResponse.json({ 
          error: 'Failed to update team' 
        }, { status: 500 })
      }
    }
    
    // 4. Set captain
    const { error: captainError } = await supabase
      .from('fantasy_team_players')
      .update({ is_captain: true })
      .eq('fantasy_team_id', fantasy_team_id)
      .eq('gameweek_id', gameWeekID)
      .eq('player_id', captain_id)
      
    if (captainError) {
      console.error('Error setting captain:', captainError)
      return NextResponse.json({ 
        error: 'Failed to update team' 
      }, { status: 500 })
    }
    
    // 5. Set vice-captain
    const { error: viceCaptainError } = await supabase
      .from('fantasy_team_players')
      .update({ is_vice_captain: true })
      .eq('fantasy_team_id', fantasy_team_id)
      .eq('gameweek_id', gameWeekID)
      .eq('player_id', vice_captain_id)
      
    if (viceCaptainError) {
      console.error('Error setting vice-captain:', viceCaptainError)
      return NextResponse.json({ 
        error: 'Failed to update team' 
      }, { status: 500 })
    }
    
    // 6. Update the last_updated timestamp
    const { error: updateTimestampError } = await supabase
      .from('fantasy_teams')
      .update({ last_updated: new Date().toISOString() })
      .eq('fantasy_team_id', fantasy_team_id)
      
    if (updateTimestampError) {
      console.error('Error updating timestamp:', updateTimestampError)
      return NextResponse.json({ 
        error: 'Failed to update team timestamp' 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Team updated successfully' 
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
    
  } catch (error) {
    console.error('Error in update team API route:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}