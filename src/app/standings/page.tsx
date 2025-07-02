'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import NavLayout from '@/components/layout/NavLayout'
import { ArrowLeft, Trophy, Medal } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface TeamStanding {
  position: number;
  team_id: number;
  team_name: string;
  team_short_name: string;
  logo_url: string | null;
  team_color: string | null;
  points: number;
  matches_played: number;
  matches_won: number;
  matches_drawn: number;
  matches_lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
}

export default function StandingsPage() {
  const { user } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [standings, setStandings] = useState<TeamStanding[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(user !== null)
    
    const fetchStandings = async () => {
      try {
        console.log('Fetching standings data...')
        const response = await fetch('/api/standings')
        
        if (!response.ok) {
          throw new Error('Failed to fetch standings')
        }
        const data = await response.json()
        console.log('Standings fetched successfully:', data.standings)
        setStandings(data.standings)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching standings:', err)
        setError('Failed to load standings. Please try again later.')
        setLoading(false)
      }
    }

    fetchStandings()
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
        <h1 className="text-3xl font-bold text-white mb-2">BUET Premier League Standings</h1>
        <p className="text-gray-400">Current team standings in the BUET Premier League</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-gray-300">Loading standings data...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-red-400">{error}</div>
        </div>
      ) : (
        /* Standings Table */
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-12 text-center">Pos</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Team</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider w-12">MP</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider w-12">W</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider w-12">D</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider w-12">L</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider w-12">GF</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider w-12">GA</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider w-12">GD</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider w-12">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {standings.map((team) => {
                  // Create a subtle gradient style using the team color
                  const teamColorStyle = team.team_color ? {
                    background: `linear-gradient(90deg, rgba(${hexToRgb(team.team_color)}, 0.15) 0%, rgba(31, 41, 55, 0) 100%)`,
                    borderLeft: `3px solid ${team.team_color}`
                  } : {};
                  
                  return (
                    <tr 
                      key={team.team_id} 
                      className={`hover:bg-gray-750 transition-colors ${team.position <= 2 ? 'bg-gray-750' : ''}`}
                      style={teamColorStyle}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-center font-medium">
                        {team.position <= 2 ? (
                          <span className={`
                            inline-block w-6 h-6 rounded-full text-white text-xs flex items-center justify-center
                            ${team.position === 1 ? 'bg-yellow-500' : 'bg-gray-400'}
                          `}>
                            {team.position === 1 ? 
                              <Trophy className="w-3 h-3" /> : 
                              <Medal className="w-3 h-3" />
                            }
                          </span>
                        ) : (
                          <span className="text-gray-300">{team.position}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium text-white">{team.team_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-300">
                        {team.matches_played}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-300">
                        {team.matches_won}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-300">
                        {team.matches_drawn}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-300">
                        {team.matches_lost}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-300">
                        {team.goals_for}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-gray-300">
                        {team.goals_against}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-center ${team.goal_difference > 0 ? 'text-green-400' : team.goal_difference < 0 ? 'text-red-400' : 'text-gray-300'}`}>
                        {team.goal_difference > 0 ? `+${team.goal_difference}` : team.goal_difference}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-white">
                        {team.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-8">
        <h3 className="text-xl font-bold text-white mb-3">Key</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="inline-block w-6 h-6 rounded-full bg-yellow-500 mr-3 flex items-center justify-center">
              <Trophy className="w-3 h-3 text-white" />
            </span>
            <span className="text-gray-300">Champion (1st Place)</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-6 h-6 rounded-full bg-gray-400 mr-3 flex items-center justify-center">
              <Medal className="w-3 h-3 text-white" />
            </span>
            <span className="text-gray-300">Runner-up (2nd Place)</span>
          </div>
          <div className="flex items-center pt-2">
            <span className="text-primary-400 font-medium">
              * The top two teams will play directly in the final match
            </span>
          </div>
          <hr className="border-gray-700 my-2" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">MP</span>
              <span className="text-gray-300">Matches Played</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">W</span>
              <span className="text-gray-300">Wins</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">D</span>
              <span className="text-gray-300">Draws</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">L</span>
              <span className="text-gray-300">Losses</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">GF</span>
              <span className="text-gray-300">Goals For</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">GA</span>
              <span className="text-gray-300">Goals Against</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">GD</span>
              <span className="text-gray-300">Goal Difference</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">Pts</span>
              <span className="text-gray-300">Points</span>
            </div>
          </div>
        </div>
      </div>
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

// Utility function to convert hex color to RGB format for CSS gradients
function hexToRgb(hex: string | null): string {
  if (!hex) return "31, 41, 55"; // Default color if none provided
  
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');
  
  // Parse the r, g, b values
  let r, g, b;
  
  if (hex.length === 3) {
    // For shorthand like #ABC
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else {
    // For full hex like #AABBCC
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  
  // Return the rgb values as a string
  return `${r}, ${g}, ${b}`;
}