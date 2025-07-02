import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Define types for the request payload
interface PlayerData {
  player_id: number;
  selection_id?: number;
  is_captain: boolean;
  is_vice_captain: boolean;
  is_starting: boolean;
}

interface TransferRequest {
  userId: string | number;
  team: PlayerData[];
  gameweekId: number;
  budget: number;
}

export async function PUT(request: Request) {
  try {
    // Get data from frontend
    const {
      userId,
      team,  // Array of 15 players with player_id, is_captain, is_vice_captain, is_starting
      gameweekId, // The next gameweek ID for which we're making transfers
      budget // The updated budget after transfers
    } = await request.json() as TransferRequest;
    
    console.log('Transfer Update API - Received data:', { userId, gameweekId, budget, playerCount: team?.length });
    
    if (!userId || !gameweekId || !team || team.length !== 15 || budget === undefined) {
      return NextResponse.json({ 
        error: 'Missing required fields or invalid team data' 
      }, { status: 400 })
    }

    // Get user's fantasy team using userId 
    // Note: The type of user_id in your database schema may need to be reviewed
    const { data: fantasyTeams, error: teamError } = await supabase
      .from('fantasy_teams')
      .select('*')
      .filter('user_id', 'eq', userId);

    if (teamError || !fantasyTeams || fantasyTeams.length === 0) {
      console.log('Transfer Update API - Team error:', teamError);
      return NextResponse.json({
        error: 'No team found for this user'
      }, { status: 404 })
    }
    
    // Use the first team found (assuming one user has only one team)
    const fantasyTeam = fantasyTeams[0];
    // Use type assertion to handle TypeScript issue
    const teamId = (fantasyTeam as any).fantasy_team_id;
    
    // Verify the budget
    if (budget < 0) {
      return NextResponse.json({
        error: 'Insufficient budget for these transfers'
      }, { status: 400 })
    }

    // Step 1: First delete all existing players for this team and gameweek
    const { error: deleteError } = await supabase
      .from('fantasy_team_players')
      .delete()
      .eq('fantasy_team_id', teamId)
      .eq('gameweek_id', gameweekId)
    
    if (deleteError) {
      console.log('Transfer Update API - Delete error:', deleteError);
      return NextResponse.json({
        error: 'Failed to clear existing players: ' + deleteError.message
      }, { status: 500 })
    }

    // Step 2: Insert all 15 players for the team with the specified gameweek
    const playersToInsert = team.map((player: PlayerData) => ({
      fantasy_team_id: teamId,
      player_id: player.player_id,
      is_captain: player.is_captain || false,
      is_vice_captain: player.is_vice_captain || false,
      is_starting: player.is_starting || false,
      gameweek_id: gameweekId
    }));

    const { error: insertError } = await supabase
      .from('fantasy_team_players')
      .insert(playersToInsert)
    
    if (insertError) {
      console.log('Transfer Update API - Insert error:', insertError);
      return NextResponse.json({
        error: 'Failed to insert players: ' + insertError.message
      }, { status: 500 })
    }

    // Step 3: Update the team budget
    const { error: budgetError } = await supabase
      .from('fantasy_teams')
      .update({ budget: budget })
      .eq('fantasy_team_id', teamId)
      
    if (budgetError) {
      console.log('Transfer Update API - Budget update error:', budgetError);
      return NextResponse.json({
        error: 'Failed to update team budget: ' + budgetError.message
      }, { status: 500 })
    }

    // Get updated team data
    const { data: updatedTeam } = await supabase
      .from('fantasy_teams')
      .select('*')
      .eq('fantasy_team_id', teamId)
      .single()

    // Get updated team players for the next gameweek
    const { data: updatedPlayers, error: playersError } = await supabase
      .from('fantasy_team_players')
      .select('*, players(*)')
      .eq('fantasy_team_id', teamId)
      .eq('gameweek_id', gameweekId)
    
    if (playersError) {
      console.log('Transfer Update API - Error fetching updated players:', playersError);
    }

    return NextResponse.json({
      message: 'Transfers completed successfully',
      team: updatedTeam || fantasyTeam,
      players: updatedPlayers || [],
      newBudget: budget
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error: any) {
    console.error('Error executing transfers:', error);
    return NextResponse.json({ 
      error: 'Failed to execute transfers',
      details: error?.message || 'Unknown error'
    }, { status: 500 })
  }
}

// Forward POST requests to PUT handler for compatibility
export async function POST(request: Request) {
  return PUT(request);
}