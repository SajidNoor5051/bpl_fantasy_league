import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Fetch all completed fixtures
    const { data: fixtures, error } = await supabase
      .from('fixtures')
      .select(`
        fixture_id,
        match_date,
        home_team_id,
        away_team_id,
        home_team_score,
        away_team_score,
        status,
        home_team:home_team_id(team_id, team_name, team_short_name, logo_url),
        away_team:away_team_id(team_id, team_name, team_short_name, logo_url)
      `)
      .eq('status', 'COMPLETED')

    if (error) {
      console.error('Error fetching fixtures:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Fetch all teams with team colors
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('team_id, team_name, team_short_name, logo_url, team_color')

    if (teamsError) {
      console.error('Error fetching teams:', teamsError)
      return NextResponse.json({ error: teamsError.message }, { status: 500 })
    }

    // Initialize standings table with all teams
    const standingsMap = new Map()
    teams?.forEach((team :any)=> {
      standingsMap.set(team.team_id, {
        team_id: team.team_id,
        team_name: team.team_name,
        team_short_name: team.team_short_name,
        logo_url: team.logo_url,
        team_color: team.team_color || '#374151', // Default color if none is set
        points: 0,
        matches_played: 0,
        matches_won: 0,
        matches_drawn: 0,
        matches_lost: 0,
        goals_for: 0,
        goals_against: 0,
        goal_difference: 0,
        // For head-to-head records - in single round-robin, we only store direct match results
        h2h: {}
      })
    })

    // Process fixtures to calculate standings
    fixtures?.forEach((fixture:any) => {
      const homeTeamId = fixture.home_team_id
      const awayTeamId = fixture.away_team_id
      
      // Skip if scores are not available
      if (fixture.home_team_score === null || fixture.away_team_score === null) {
        return
      }

      const homeScore = fixture.home_team_score
      const awayScore = fixture.away_team_score

      // Update matches played
      standingsMap.get(homeTeamId).matches_played += 1
      standingsMap.get(awayTeamId).matches_played += 1

      // Update goals
      standingsMap.get(homeTeamId).goals_for += homeScore
      standingsMap.get(homeTeamId).goals_against += awayScore
      standingsMap.get(awayTeamId).goals_for += awayScore
      standingsMap.get(awayTeamId).goals_against += homeScore

      // Store direct head-to-head result
      // For single round-robin, we only need to track:
      // 1. Who won the direct match
      // 2. The score of the direct match
      
      // For home team's record against away team
      standingsMap.get(homeTeamId).h2h[awayTeamId] = {
        opponent_id: awayTeamId,
        points: homeScore > awayScore ? 3 : homeScore === awayScore ? 1 : 0,
        goals_for: homeScore,
        goals_against: awayScore
      }
      
      // For away team's record against home team
      standingsMap.get(awayTeamId).h2h[homeTeamId] = {
        opponent_id: homeTeamId,
        points: awayScore > homeScore ? 3 : awayScore === homeScore ? 1 : 0,
        goals_for: awayScore,
        goals_against: homeScore
      }

      // Update standings based on match result
      if (homeScore > awayScore) {
        // Home team won
        standingsMap.get(homeTeamId).points += 3
        standingsMap.get(homeTeamId).matches_won += 1
        standingsMap.get(awayTeamId).matches_lost += 1
      } else if (homeScore < awayScore) {
        // Away team won
        standingsMap.get(awayTeamId).points += 3
        standingsMap.get(awayTeamId).matches_won += 1
        standingsMap.get(homeTeamId).matches_lost += 1
      } else {
        // Draw
        standingsMap.get(homeTeamId).points += 1
        standingsMap.get(awayTeamId).points += 1
        standingsMap.get(homeTeamId).matches_drawn += 1
        standingsMap.get(awayTeamId).matches_drawn += 1
      }
    })

    // Calculate goal difference
    standingsMap.forEach(team => {
      team.goal_difference = team.goals_for - team.goals_against
    })

    // Convert to array and sort
    const standings = Array.from(standingsMap.values())
    
    // Sort by points first
    standings.sort((a, b) => {
      // Primary sort by points
      if (b.points !== a.points) {
        return b.points - a.points
      }
      
      // If points are equal, check head-to-head
      // In a single round-robin format, this is straightforward:
      // We simply check who won the direct match between the two teams
      if (a.h2h[b.team_id]) {
        // Direct head-to-head comparison
        return b.h2h[a.team_id].points - a.h2h[b.team_id].points
      }
      
      // If there's no direct match yet or they drew, check goal difference
      if (b.goal_difference !== a.goal_difference) {
        return b.goal_difference - a.goal_difference
      }
      
      // If still tied, use goals scored
      return b.goals_for - a.goals_for
    })

    // Clean up the response by removing h2h data
    const formattedStandings = standings.map((team, index) => ({
      position: index + 1,
      team_id: team.team_id,
      team_name: team.team_name,
      team_short_name: team.team_short_name,
      logo_url: team.logo_url,
      team_color: team.team_color,
      points: team.points,
      matches_played: team.matches_played,
      matches_won: team.matches_won,
      matches_drawn: team.matches_drawn,
      matches_lost: team.matches_lost,
      goals_for: team.goals_for,
      goals_against: team.goals_against,
      goal_difference: team.goal_difference
    }))

    return NextResponse.json({ standings: formattedStandings }, { status: 200 })
  } catch (error) {
    console.error('Error calculating standings:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}