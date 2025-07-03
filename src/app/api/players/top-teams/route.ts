import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Type definitions
interface FantasyTeam {
  fantasy_team_id: number
  team_name: string
  total_points: number
  user_id: string
}

interface LeaderboardEntry {
  id: number
  teamName: string
  points: number
  userName: string
  rank: number
  userId: string
}

export async function GET(request: NextRequest) {
  try {
    // Get limit from query params (default to 10, allow up to 20)
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 20)

    // Query to get top fantasy teams with proper ranking based on total_points
    const { data: teamsData, error: teamsError } = await supabase
      .from('fantasy_teams')
      .select(`
        fantasy_team_id,
        team_name,
        total_points,
        user_id
      `)
      .order('total_points', { ascending: false })
      .limit(limit)

    if (teamsError) {
      console.error('Error fetching fantasy teams:', teamsError)
      return NextResponse.json({ error: 'Failed to fetch teams data' }, { status: 500 })
    }

    const teams = teamsData as any[] | null

    if (!teams || teams.length === 0) {
      return NextResponse.json([])
    }



    // Fetch user profiles from auth.users via the admin client
    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers()

    if (usersError) {
      console.error('Error fetching users data:', usersError)
      // Return teams data without user names as fallback
      const fallbackTeams: LeaderboardEntry[] = teams.map((team, index) => ({
        id: team.fantasy_team_id,
        teamName: team.team_name,
        points: team.total_points || 0,
        userName: 'Unknown User',
        rank: index + 1,
        userId: team.user_id
      }))
      return NextResponse.json(fallbackTeams)
    }

    // Create a map of user_id to user data for quick lookup
    const userMap = new Map<string, any>()
    usersData.users.forEach(user => {
      const firstName = user.user_metadata?.first_name || user.user_metadata?.name?.split(' ')[0] || ''
      const lastName = user.user_metadata?.last_name || user.user_metadata?.name?.split(' ').slice(1).join(' ') || ''
      const email = user.email || ''
      
      userMap.set(user.id, {
        firstName,
        lastName,
        email,
        fullName: firstName && lastName ? `${firstName} ${lastName}` : (firstName || email.split('@')[0] || 'Unknown User')
      })
    })

    // Transform and rank the data
    const rankedTeams: LeaderboardEntry[] = teams.map((team, index) => {
      const userData = userMap.get(team.user_id)
      
      return {
        id: team.fantasy_team_id,
        teamName: team.team_name,
        points: team.total_points || 0,
        userName: userData?.fullName || 'Unknown User',
        rank: index + 1,
        userId: team.user_id
      }
    })

    // Sort by points again to ensure proper ranking (in case of ties)
    rankedTeams.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points // Higher points first
      }
      return a.teamName.localeCompare(b.teamName) // Alphabetical for ties
    })

    // Update ranks after sorting
    rankedTeams.forEach((team, index) => {
      team.rank = index + 1
    })

    return NextResponse.json(rankedTeams)

  } catch (error) {
    console.error('Unexpected error in top-teams API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
