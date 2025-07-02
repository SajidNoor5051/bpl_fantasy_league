'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import NavLayout from '@/components/layout/NavLayout'
import { ArrowLeft, Trophy } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Team {
  team_id: number
  team_name: string
  team_short_name: string
  logo_url: string | null
  founded_year: number | null
  home_stadium: string | null
  team_color: string | null
  manager_name: string | null
  points: number
  matches_played: number
  matches_won: number
  matches_drawn: number
  matches_lost: number
  goals_for: number
  goals_against: number
}

export default function TeamsPage() {
  const { user } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(user !== null)
    
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams data...')
        const response = await fetch('/api/teams')
        
        if (!response.ok) {
          throw new Error('Failed to fetch teams')
        }
        const data = await response.json()
        console.log('Teams fetched successfully:', data.teams)
        setTeams(data.teams)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching teams:', err)
        setError('Failed to load teams. Please try again later.')
        setLoading(false)
      }
    }

    fetchTeams()
  }, [user])

  // Content to be displayed regardless of authentication status
  const content = (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        {isAuthenticated === false && (
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">League Standings</h1>
            <Link 
              href="/" 
              className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
        )}
        <h1 className="text-3xl font-bold text-white mb-2">BUET Premier League Teams</h1>
        <p className="text-gray-400">Meet the teams competing in the BUET Premier League</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-gray-300">Loading teams data...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-red-400">{error}</div>
        </div>
      ) : (
        /* Teams Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <Card key={team.team_id} className="bg-gray-800 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
              <div className="p-6">
                {/* Team Header */}
                <div className="flex items-center mb-6">
                  {team.logo_url ? (
                    <div className="w-16 h-16 mr-4 relative">
                      <img 
                        src={team.logo_url} 
                        alt={`${team.team_name} logo`} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 mr-4 relative">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white border-2 border-gray-600" 
                        style={{ backgroundColor: team.team_color || '#374151' }}
                      >
                        {team.team_short_name?.substring(0, 2)}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">{team.team_name}</h3>
                  </div>
                </div>

                {/* Team Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Manager:</span>
                    <span className="text-white font-medium">{team.manager_name || 'TBD'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Founded:</span>
                    <span className="text-white">{team.founded_year || 'Unknown'}</span>
                  </div>

                  {team.team_color && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-400">Colors:</span>
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2 border border-gray-600" 
                          style={{ backgroundColor: team.team_color }}
                        ></div>
                        <span className="text-white text-sm">{team.team_color}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  // If authentication status is still loading or null, render a simple loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is authenticated, render within NavLayout, otherwise render standalone
  return isAuthenticated ? (
    <NavLayout>
      {content}
    </NavLayout>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Simple header for non-authenticated users */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">BUET Fantasy</h1>
                <p className="text-xs text-gray-400">2025 Season</p>
              </div>
            </Link>
            
            <div>
              <Link 
                href="/auth/signin" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto py-8">
        {content}
      </main>
      
      {/* Simple footer */}
      <footer className="bg-gray-950 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2025 BUET Fantasy Premier League. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}