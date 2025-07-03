'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  User, 
  ChevronRight,
  Trophy,
  Crown
} from 'lucide-react'
import NavLayout from '@/components/layout/NavLayout'

type UserStats = {
  teamName: string;
  points: number;
  rank: number;
  captainPoints: number;
  budget: number;
  lastWeekPoints: number;
  teamExists?: boolean;
}

type Fixture = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
}

type Player = {
  id: number;
  name: string;
  team: string;
  points: number;
  position: string;
}

type TopTeam = {
  id: string;
  teamName: string;
  points: number;
  
  rank: number;
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // State for API data
  const [userStats, setUserStats] = useState<UserStats>({
    teamName: "",
    points: 0,
    rank: 0,
    captainPoints: 0,
    budget: 0,
    lastWeekPoints: 0
  })
  
  const [upcomingFixtures, setUpcomingFixtures] = useState<Fixture[]>([])
  
  const [topPlayers, setTopPlayers] = useState<Player[]>([])
  
  const [topTeams, setTopTeams] = useState<TopTeam[]>([])

  // Fetch data from APIs
  const fetchUserStats = async (userId: string) => {
    console.log('Fetching user stats for userId:', userId)
    try {
      const response = await fetch(`/api/fantasy-team?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        console.log('User stats fetched:', data)
        setUserStats(data)
      } else {
        console.error('Failed to fetch user stats')
        // Use placeholder data for new users
        setUserStats({
          teamName: "New Team",
          points: 0,
          rank: 0,
          captainPoints: 0,
          budget: 100.0,
          lastWeekPoints: 0
        })
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  const fetchUpcomingFixtures = async () => {
    try {
      const response = await fetch('/api/fixtures/upcoming')
      if (response.ok) {
        const data = await response.json()
        setUpcomingFixtures(data)
      }
    } catch (error) {
      console.error('Error fetching upcoming fixtures:', error)
    }
  }

  const fetchTopPlayers = async () => {
    try {
      const response = await fetch('/api/players/top-performers')
      if (response.ok) {
        const data = await response.json()
        setTopPlayers(data)
      }
    } catch (error) {
      console.error('Error fetching top players:', error)
    }
  }

  const fetchTopTeams = async () => {
    try {
      const response = await fetch('/api/players/top-teams')
      if (response.ok) {
        const data = await response.json()
        setTopTeams(data)
      }
    } catch (error) {
      console.error('Error fetching top teams:', error)
    }
  }

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      let userId = null;
      
      if (!user) {
        // Check if we have a session stored in localStorage
        const storedSession = localStorage.getItem('fantasy_user_session');
        
        if (!storedSession) {
          router.push('/auth/signin');
          return;
        }
        
        try {
          const sessionData = JSON.parse(storedSession);
          userId = sessionData.userId;
        } catch (error) {
          console.error('Invalid session data', error);
          router.push('/auth/signin');
          return;
        }
      } else {
        // Store session when we have a user
        userId = user.id;
        localStorage.setItem('fantasy_user_session', JSON.stringify({ 
          active: true, 
          userId: user.id
        }));
      }
      
      // Fetch all required data
      if (userId) {
        Promise.all([
          fetchUserStats(userId),
          fetchUpcomingFixtures(),
          fetchTopPlayers(),
          fetchTopTeams()
        ]).finally(() => {
          setLoading(false);
        });
      }
    };
    
    checkAuth();
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <NavLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.user_metadata?.first_name || "Manager"}</h1>
        <p className="text-gray-400">Here's how your fantasy team is performing</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Overall Points</p>
          <h3 className="text-2xl font-bold text-white">{userStats.points}</h3>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Global Rank</p>
          <h3 className="text-2xl font-bold text-white">#{userStats.rank}</h3>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Gameweek Points</p>
          <h3 className="text-2xl font-bold text-white">{userStats.lastWeekPoints}</h3>
        </div>
        
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-gray-400 text-sm">Budget</p>
          <h3 className="text-2xl font-bold text-white">£{userStats.budget}m</h3>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Team Quick View */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600/20 to-transparent p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">My Team</h2>
            <Link href="/my-team" className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
              Manage Team <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="p-5 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600/20 to-primary-600/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{userStats.teamName}</h3>
            <p className="text-gray-400 text-sm mb-4">Next deadline: June 12, 14:00</p>
            
            {userStats.teamExists ? (
              <Link href="/my-team">
                <span className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                  View Team
                </span>
              </Link>
            ) : (
              <Link href="/create-team">
                <span className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                  Create Team
                </span>
              </Link>
            )}
          </div>
        </div>
        
        {/* Upcoming Fixtures */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600/20 to-transparent p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Upcoming Fixtures</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {upcomingFixtures.length > 0 ? (
              upcomingFixtures.map(fixture => (
                <div key={fixture.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="w-5/12 text-right">
                      <p className="text-white font-medium">{fixture.homeTeam}</p>
                    </div>
                    <div className="w-2/12 text-center">
                      <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">vs</span>
                    </div>
                    <div className="w-5/12">
                      <p className="text-white font-medium">{fixture.awayTeam}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs text-center mt-2">{fixture.date}</p>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-400">No upcoming fixtures found</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Top Performing Players */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-primary-600/20 to-transparent p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Top Performers</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {topPlayers.length > 0 ? (
              topPlayers.slice(0, 5).map((player, index) => (
                <div key={player.id} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{player.name}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded mr-2">
                        {player.position}
                      </span>
                      <span className="text-xs text-gray-400">{player.team}</span>
                    </div>
                  </div>
                  <div className="bg-primary-600/20 px-2 py-1 rounded">
                    <span className="text-primary-300 font-medium">{player.points} pts</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-400">No top performers data</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Fantasy Teams Leaderboard */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-yellow-600/20 to-transparent p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Leaderboard</h2>
            <Trophy className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="divide-y divide-gray-800">
            {topTeams.length > 0 ? (
              topTeams.slice(0, 5).map((team, index) => (
                <div key={team.id} className="p-3 flex justify-between items-center">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      index === 0 ? 'bg-yellow-500 text-yellow-900' :
                      index === 1 ? 'bg-gray-400 text-gray-900' :
                      index === 2 ? 'bg-amber-600 text-amber-900' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {index === 0 ? <Crown className="w-3 h-3" /> : team.rank}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-white font-medium text-sm truncate">{team.teamName}</p>
                     
                    </div>
                  </div>
                  <div className="bg-yellow-500/20 px-2 py-1 rounded flex-shrink-0">
                    <span className="text-yellow-300 font-medium text-sm">{team.points} pts</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-400">No leaderboard data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </NavLayout>
  )
}