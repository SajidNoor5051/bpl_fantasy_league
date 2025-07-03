import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    // Get limit from query params (default to 10, allow up to 20)
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 20)

    // Query to get top fantasy teams ranked by total_points
    const { data: teamsData, error: teamsError } = await supabase
      .from('fantasy_teams')
      .select('team_name, total_points')
      .order('total_points', { ascending: false })
      .limit(limit)

    if (teamsError) {
      console.error('Error fetching fantasy teams:', teamsError)
      return NextResponse.json({ error: 'Failed to fetch teams data' }, { status: 500 })
    }

    if (!teamsData || teamsData.length === 0) {
      return NextResponse.json([])
    }

    // Transform data with ranks
    const leaderboard = teamsData.map((team: any, index: number) => ({
      teamName: team.team_name,
      points: team.total_points || 0,
      rank: index + 1
    }))

    return NextResponse.json(leaderboard)

  } catch (error) {
    console.error('Unexpected error in top-teams API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
