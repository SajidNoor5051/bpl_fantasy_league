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

    // Use a direct SQL query to get teams with owner names
    const { data: leaderboard, error } = await supabase
      .from('fantasy_teams')
      .select(`
        team_name,
        total_points,
        user_id
      `)
      .order('total_points', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching top teams:', error)
      return NextResponse.json({ error: 'Failed to fetch teams data' }, { status: 500 })
    }

    if (!leaderboard || leaderboard.length === 0) {
      return NextResponse.json([])
    }

    // Get user details for all teams using the user_profiles view
    const userIds = leaderboard.map((team: any) => team.user_id)
    
    const { data: usersData, error: usersError } = await supabase
      .from('user_profiles')
      .select('user_id, first_name, last_name, full_name')
      .in('user_id', userIds)

    if (usersError) {
      console.error('Error fetching users:', usersError)
      // Continue without user names if there's an error
    }

    // Create a map of user_id to user name
    const usersMap = new Map()
    if (usersData) {
      usersData.forEach((user: any) => {
        const fullName = user.full_name?.trim() || `${user.first_name || ''} ${user.last_name || ''}`.trim()
        usersMap.set(user.user_id, fullName || 'Unknown Owner')
      })
    }

    // Transform data with ranks and owner names
    const result = leaderboard.map((team: any, index: number) => ({
      teamName: team.team_name,
      ownerName: usersMap.get(team.user_id) || 'Unknown Owner',
      points: team.total_points || 0,
      rank: index + 1
    }))

    return NextResponse.json(result)

  } catch (error) {
    console.error('Unexpected error in top-teams API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
