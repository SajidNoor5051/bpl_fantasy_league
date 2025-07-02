import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url)
    const gameweekId = searchParams.get('gameweek_id')
    const teamId = searchParams.get('team_id')
    
    // Validate required parameters
    if (!gameweekId || !teamId) {
      console.error('Missing required parameters: gameweek_id and team_id are required')
      return NextResponse.json({ 
        error: 'Missing required parameters: gameweek_id and team_id are required' 
      }, { status: 400 })
    }

    // First, get the team creation date
    const { data: teamData, error: teamError } = await supabase
      .from('fantasy_teams')
      .select('created_at')
      .eq('fantasy_team_id', teamId)
      .single() as any
    
    if (teamError) {
      console.error('Error fetching team data:', teamError)
      return NextResponse.json({ 
        error: 'Failed to fetch team data' 
      }, { status: 500 })
    }

    // Next, get the gameweek end date to compare with team creation
    const { data: gameweekData, error: gameweekError } = await supabase
      .from('gameweeks')
      .select('end_date')
      .eq('gameweek_id', gameweekId)
      .single() as any
    
    if (gameweekError) {
      console.error('Error fetching gameweek data:', gameweekError)
      return NextResponse.json({ 
        error: 'Failed to fetch gameweek data' 
      }, { status: 500 })
    }

    // Get the players in the fantasy team
    const { data: teamPlayers, error: playersError } = await supabase
      .from('fantasy_team_players')
      .select(`
        selection_id,
        player_id,
        is_captain,
        is_vice_captain,
        players (
          player_id,
          first_name,
          last_name,
          position,
          teams (
            team_name
          )
        )
      `)
      .eq('fantasy_team_id', teamId)
      .eq('gameweek_id', gameweekId) as any 
    
    if (playersError) {
      console.error('Error fetching team players:', playersError)
      return NextResponse.json({ 
        error: 'Failed to fetch team players' 
      }, { status: 500 })
    }

    // Check if team was created after the gameweek ended
    const teamCreationDate = new Date(teamData.created_at)
    const gameweekStartDate = new Date(gameweekData.start_date)
    const teamCreatedAfterGameweek = teamCreationDate > gameweekStartDate
    
    // If the team was created after the gameweek, return null points for all players
    if (teamCreatedAfterGameweek) {
      console.log(`Team ${teamId} was created after gameweek ${gameweekId} ended. Returning null points.`)
      const playerPoints = teamPlayers.map((tp :any) => ({
        player_id: tp.player_id,
        first_name: tp.players.first_name,
        last_name: tp.players.last_name,
        team_name: tp.players.teams.team_name,
        position: tp.players.position,
        goals_scored: null,
        assists: null,
        clean_sheets: null,
        saves: null,
        yellow_cards: null,
        red_cards: null,
        fantasy_points: null,
        is_captain: tp.is_captain,
        is_vice_captain: tp.is_vice_captain
      }))
      
      return NextResponse.json({ 
        playerPoints,
        meta: {
          gameweekId: gameweekId,
          teamCreatedAfterGameweek: teamCreatedAfterGameweek,
          fixturesCount: 0,
          statsFound: 0
        }
      }, { status: 200 })
    }

    // Get fixtures for the gameweek
    const { data: fixtures, error: fixtureError } = await supabase
      .from('fixtures')
      .select('fixture_id')
      .eq('gameweek_id', gameweekId)
    
    if (fixtureError) {
      console.error('Error fetching fixtures for gameweek:', fixtureError)
      return NextResponse.json({ 
        error: 'Failed to fetch fixtures for gameweek' 
      }, { status: 500 })
    }

    // If no fixtures found for this gameweek, return zero points for all players
    if (!fixtures || fixtures.length === 0) {
      console.log(`No fixtures found for gameweek ${gameweekId}. Returning zero points.`)
      const playerPoints = teamPlayers.map((tp:any) => ({
        player_id: tp.player_id,
        first_name: tp.players.first_name,
        last_name: tp.players.last_name,
        team_name: tp.players.teams.team_name,
        position: tp.players.position,
        goals_scored: 0,
        assists: 0,
        clean_sheets: 0,
        saves: 0,
        yellow_cards: 0,
        red_cards: 0,
        fantasy_points: 0,
        is_captain: tp.is_captain,
        is_vice_captain: tp.is_vice_captain
      }))
      
      return NextResponse.json({ 
        playerPoints,
        meta: {
          gameweekId: gameweekId,
          teamCreatedAfterGameweek: teamCreatedAfterGameweek,
          fixturesCount: 0,
          statsFound: 0
        }
      }, { status: 200 })
    }

    // Extract fixture IDs
    const fixtureIds = fixtures.map((fixture:any) => fixture.fixture_id)

    // Get player match stats for these fixtures
    const { data: playerStats, error: statsError } = await supabase
      .from('player_match_stats')
      .select('*')
      .in('fixture_id', fixtureIds)
      .in('player_id', teamPlayers.map((tp:any) => tp.player_id))
    
    if (statsError) {
      console.error('Error fetching player match stats:', statsError)
      return NextResponse.json({ 
        error: 'Failed to fetch player match statistics' 
      }, { status: 500 })
    }

    // Create a stats map to accumulate stats per player
    const playerStatsMap: { [key: string]: any } = {}
    
    // Initialize with zero values for all players
    teamPlayers.forEach((tp:any) => {
      playerStatsMap[tp.player_id] = {
        player_id: tp.player_id,
        first_name: tp.players.first_name,
        last_name: tp.players.last_name,
        team_name: tp.players.teams.team_name,
        position: tp.players.position,
        goals_scored: 0,
        assists: 0,
        clean_sheets: 0,
        saves: 0,
        yellow_cards: 0,
        red_cards: 0,
        fantasy_points: 0,
        minutes_played: 0,
        is_captain: tp.is_captain,
        is_vice_captain: tp.is_vice_captain
      }
    })

    // Accumulate stats from matches
    if (playerStats && playerStats.length > 0) {
      playerStats.forEach((stat:any) => {
        if (playerStatsMap[stat.player_id]) {
          playerStatsMap[stat.player_id].goals_scored += stat.goals_scored || 0
          playerStatsMap[stat.player_id].assists += stat.assists || 0
          playerStatsMap[stat.player_id].clean_sheets += stat.clean_sheet ? 1 : 0
          playerStatsMap[stat.player_id].saves += stat.saves || 0
          playerStatsMap[stat.player_id].yellow_cards += stat.yellow_cards || 0
          playerStatsMap[stat.player_id].red_cards += stat.red_cards || 0
          playerStatsMap[stat.player_id].fantasy_points += stat.fantasy_points || 0
          playerStatsMap[stat.player_id].minutes_played += stat.minutes_played || 0
        }
      })
    }

    // Apply captain and vice-captain logic
    const captain = teamPlayers.find((tp:any) => tp.is_captain);
    const viceCaptain = teamPlayers.find((tp:any) => tp.is_vice_captain);
    
    console.log('Captain player ID:', captain?.player_id);
    console.log('Vice-captain player ID:', viceCaptain?.player_id);
    
    if (captain && playerStatsMap[captain.player_id]) {
      const captainStats = playerStatsMap[captain.player_id];
      console.log('Captain minutes played:', captainStats.minutes_played);
      
      // If captain played (has minutes), double their points
      if (captainStats.minutes_played > 0) {
        captainStats.fantasy_points = captainStats.fantasy_points * 2;
        console.log('Captain played - doubled points to:', captainStats.fantasy_points);
      } 
      // If captain didn't play, check vice-captain
      else if (viceCaptain && playerStatsMap[viceCaptain.player_id]) {
        const viceCaptainStats = playerStatsMap[viceCaptain.player_id];
        console.log('Captain did not play. Vice-captain minutes played:', viceCaptainStats.minutes_played);
        
        // If vice-captain played, double their points
        if (viceCaptainStats.minutes_played > 0) {
          viceCaptainStats.fantasy_points = viceCaptainStats.fantasy_points * 2;
          console.log('Vice-captain played - doubled points to:', viceCaptainStats.fantasy_points);
        } else {
          console.log('Neither captain nor vice-captain played - no point doubling');
        }
      }
    }

    // Convert the map to an array
    const playerPoints = Object.values(playerStatsMap)
    
    // Return the player points
    return NextResponse.json({ 
      playerPoints,
      meta: {
        gameweekId: gameweekId,
        teamCreatedAfterGameweek: teamCreatedAfterGameweek,
        fixturesCount: fixtures.length,
        statsFound: playerStats ? playerStats.length : 0
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Unexpected error in player-stats API:', error) 
    return NextResponse.json({ 
      error: 'An unexpected error occurred while fetching player statistics'
    }, { status: 500 })
  }
}