import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const today = new Date()
    
    // Fetch the next 3 fixtures that haven't happened yet
    const { data: fixtures, error } = await supabase
      .from('fixtures')
      .select(`
        fixture_id,
        match_date,
        home_team:home_team_id(team_id, team_name, logo_url),
        away_team:away_team_id(team_id, team_name, logo_url)
      `)
      .gte('match_date', today.toISOString())
      .eq('status', 'SCHEDULED')
      .order('match_date', { ascending: true })
      .limit(3) as any

    if (error) {
      console.error('Error fetching upcoming fixtures:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Format the fixtures data
    const formattedFixtures = fixtures ? fixtures.map((fixture :any)=> ({
      id: fixture.fixture_id,
      homeTeam: fixture.home_team ? fixture.home_team.team_name : 'Unknown Team',
      awayTeam: fixture.away_team ? fixture.away_team.team_name : 'Unknown Team',
      homeTeamLogo: fixture.home_team ? fixture.home_team.logo_url : null,
      awayTeamLogo: fixture.away_team ? fixture.away_team.logo_url : null,
      date: new Date(fixture.match_date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })) : []

    return NextResponse.json(formattedFixtures, { status: 200 })
  } catch (error) {
    console.error('Error fetching upcoming fixtures:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}