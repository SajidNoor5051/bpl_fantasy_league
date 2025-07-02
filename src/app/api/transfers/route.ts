import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Extract userId from URL query parameters (no more gameweekId parameter)
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    // Debug info to track the issue
    console.log('Transfers API - userId:', userId);
    
    if (!userId) {
      return NextResponse.json({ 
        error: 'User ID is required' 
      }, { status: 400 })
    }

    // Get user's fantasy team
    const { data: teamData, error: teamError } = await supabase
      .from('fantasy_teams')
      .select('*')
      .eq('user_id', userId)
      .single() as any

    // Debug info for team lookup
    console.log('Transfers API - team data_id:', teamData?.fantasy_team_id, 'error:', teamError);

    if (teamError || !teamData) {
      return NextResponse.json({
        error: 'No team found for this user',
        details: teamError ? teamError.message : 'Team data is null'
      }, { status: 404 })
    }

    console.log('Transfers API - Found team ID:', teamData.fantasy_team_id);
    
    // First fetch the current gameweek
    const { data: currentGameweek, error: currentGameweekError } = await supabase
      .from('gameweeks')
      .select('gameweek_id, name, start_date, end_date')
      .eq('is_current', true)
      .single() as any
     
    if (currentGameweekError) {
      return NextResponse.json({
        error: 'Error fetching current gameweek',
        details: currentGameweekError.message
      }, { status: 500 })
    }
    
    console.log('Transfers API - Current gameweek:', currentGameweek);
    
    const currentGameweekId = currentGameweek?.gameweek_id;
    
    if (!currentGameweekId) {
      return NextResponse.json({
        error: 'No current gameweek found',
      }, { status: 404 })
    }
    
    // Get the next gameweek
    const { data: nextGameweek, error: nextGameweekError } = await supabase
      .from('gameweeks')
      .select('gameweek_id, name, start_date, end_date')
      .gt('gameweek_id', currentGameweekId)
      .order('gameweek_id', { ascending: true })
      .limit(1)
      .single() as any
      
    if (nextGameweekError && nextGameweekError.code !== 'PGRST116') { // PGRST116 is "no rows returned" which is fine
      return NextResponse.json({
        error: 'Error fetching next gameweek',
        details: nextGameweekError.message
      }, { status: 500 })
    }
    
    const nextGameweekId = nextGameweek?.gameweek_id;    
    // Only fetch players from the NEXT gameweek for transfers
    let formattedPlayers = [];
    
    if (!nextGameweekId) {
      return NextResponse.json({
        error: 'No next gameweek found for transfers',
      }, { status: 404 })
    }

    // Get all players in the fantasy team with their details for the NEXT gameweek only
    const { data: teamPlayers, error: playersError } = await supabase
      .from('fantasy_team_players')
      .select(`
        selection_id,
        player_id,
        is_captain,
        is_vice_captain,
        is_starting,
        gameweek_id,
        players (
          player_id,
          first_name,
          last_name,
          position,
          fantasy_price,
          fantasy_points,
          team_id,
          teams (
            team_id,
            team_name,
            team_short_name,
            logo_url
          )
        )
      `)
      .eq('fantasy_team_id', teamData.fantasy_team_id)
      .eq('gameweek_id', nextGameweekId)

    // Debug info for players query
    console.log('Transfers API - players query for NEXT gameweek only:', nextGameweekId);
    console.log('Transfers API - players query result count:', teamPlayers?.length || 0);
    
    if (playersError) {
      console.log('Transfers API - players error:', playersError);
      return NextResponse.json({
        error: 'Error fetching players',
        details: playersError.message
      }, { status: 500 })
    }
    
    if (!teamPlayers || teamPlayers.length === 0) {
      // No players found for next gameweek
      return NextResponse.json({
        team: teamData,
        players: [],
        currentGameweekId: Number(currentGameweekId) || null,
        nextGameweekId: Number(nextGameweekId) || null,
        fixtures: [],
        message: "No players found for this fantasy team for the next gameweek. Please add players to your team."
      }, { status: 200 })
    }

    // Format the players data to flatten the structure
    formattedPlayers = teamPlayers.map((tp: any) => ({
      selection_id: tp.selection_id,
      player_id: tp.player_id,
      gameweek_id: tp.gameweek_id,
      is_captain: tp.is_captain,
      is_vice_captain: tp.is_vice_captain,
      is_starting: tp.is_starting,
      first_name: tp.players?.first_name || 'Unknown',
      last_name: tp.players?.last_name || 'Player',
      position: tp.players?.position || 'MID',
      fantasy_price: tp.players?.fantasy_price || 5.0,
      fantasy_points: tp.players?.fantasy_points || 0,
      team_id: tp.players?.team_id,
      team_name: tp.players?.teams?.team_name || 'Unknown Team',
      team_short_name: tp.players?.teams?.team_short_name || '???',
      team_logo: tp.players?.teams?.logo_url
    }));
    
    console.log('Transfers API - Using players from NEXT gameweek:', nextGameweekId);
    console.log('Transfers API - Next gameweek ID:', nextGameweekId);
    
    // Get fixtures for the NEXT gameweek (for transfers)
    let fixtures: any[] = [];
    // Use nextGameweekId for fixtures since transfers are for the next gameweek
    if (nextGameweekId) {
      const { data: fixtureData, error: fixtureError } = await supabase
        .from('fixtures')
        .select(`
          fixture_id,
          home_team_id (team_id, team_name, team_short_name),
          away_team_id (team_id, team_name, team_short_name),
          match_date,
          stadium
        `)
        .eq('gameweek_id', nextGameweekId)
        .order('match_date', { ascending: true });

      if (!fixtureError) {
        fixtures = fixtureData;
      } else {
        console.log('Transfers API - fixtures error:', fixtureError);
      }
    }

    return NextResponse.json({
      team: teamData,
      players: formattedPlayers,
      currentGameweekId: Number(currentGameweekId) || null,
      nextGameweekId: Number(nextGameweekId) || null,
      fixtures: fixtures
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error: any) {
    console.error('Error fetching transfers data:', error)
    return NextResponse.json({ 
      error: 'Failed to load transfers data',
      details: error?.message || 'Unknown error'
    }, { status: 500 })
  }
}