'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, ArrowLeft, Award, Users, Star, Repeat } from 'lucide-react'
import NavLayout from '@/components/layout/NavLayout'
import { useAuth } from '@/contexts/AuthContext'

export default function RulesPage() {
  const { user } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(user !== null)
  }, [user])

  const content = (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">BPL Rules and By-laws</h1>
        {isAuthenticated === false && (
          <Link 
            href="/" 
            className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        )}
      </div>

      {/* Section Navigation */}
      <div className="mb-8 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <a 
          href="#fantasy-rules" 
          className="flex items-center justify-center px-5 py-2.5 bg-gray-700 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium"
        >
          <Award className="h-5 w-5 mr-2" />
          Fantasy Rules
        </a>
        <a 
          href="#bylaws" 
          className="flex items-center justify-center px-5 py-2.5 bg-gray-700 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium"
        >
          <BookOpen className="h-5 w-5 mr-2" />
          Tournament By-laws
        </a>
      </div>

      {/* Fantasy Rules Section Anchor */}
      <div id="fantasy-rules"></div>
      
      {/* Team Selection Rules */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-primary-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Team Selection Rules</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Squad Formation</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Total squad size: 15 players (11 starters + 4 substitutes)</li>
            <li>Formation must include:
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li>1 Goalkeeper (GK)</li>
                <li>At least 3 Defenders (DEF)</li>
                <li>At least 2 Midfielders (MID)</li>
                <li>At least 1 Forward (FWD)</li>
              </ul>
            </li>
            <li>Valid formations: 3-4-3, 3-5-2, 4-3-3, 4-4-2, 4-5-1, 5-3-2, 5-4-1</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Player Restrictions</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li><strong>Maximum 5 players</strong> from any single BUET Premier League team</li>
            <li>You must select players within your budget constraints</li>
            <li>All players must be officially registered with a BUET Premier League team</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Budget Rules</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li><strong>Initial Budget: 100.0M BDT</strong> for your entire 15-player squad</li>
            <li>Player prices will fluctuate throughout the season based on performance and demand</li>
            <li>Team value increases as your players' market values increase</li>
            <li>When selling players, you receive the current market value (not necessarily what you paid)</li>
          </ul>
        </div>
      </div>
      
      {/* Scoring System */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <Award className="h-6 w-6 text-primary-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Scoring System</h2>
        </div>
        
        <div className="overflow-x-auto mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Standard Points</h3>
          <table className="w-full text-gray-300">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-2 pr-6">Action</th>
                <th className="pb-2">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="py-3 pr-6">For playing up to 60 minutes</td>
                <td className="py-3">1</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">For playing 60 minutes or more</td>
                <td className="py-3">2</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">For each goal scored by a forward/midfielder</td>
                <td className="py-3">5</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">For each goal scored by a defender/goalkeeper</td>
                <td className="py-3">6</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">For each assist</td>
                <td className="py-3">3</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="overflow-x-auto mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Clean Sheet Points</h3>
          <table className="w-full text-gray-300">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-2 pr-6">Position</th>
                <th className="pb-2">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="py-3 pr-6">Goalkeeper clean sheet</td>
                <td className="py-3">4</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Defender clean sheet</td>
                <td className="py-3">4</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Midfielder clean sheet</td>
                <td className="py-3">1</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Forward clean sheet</td>
                <td className="py-3">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="overflow-x-auto">
          <h3 className="text-xl font-semibold text-white mb-3">Penalty Points</h3>
          <table className="w-full text-gray-300">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-2 pr-6">Action</th>
                <th className="pb-2">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="py-3 pr-6">Each penalty save</td>
                <td className="py-3">5</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Each penalty miss</td>
                <td className="py-3">-2</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">For every 2 goals conceded by a goalkeeper/defender</td>
                <td className="py-3">-1</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Yellow card</td>
                <td className="py-3">-1</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Red card</td>
                <td className="py-3">-3</td>
              </tr>
              <tr>
                <td className="py-3 pr-6">Own goal</td>
                <td className="py-3">-2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Captain & Vice-Captain */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <Star className="h-6 w-6 text-primary-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Captain & Vice-Captain</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-4">
            In each gameweek, you must select a captain and vice-captain from your team.
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Your captain's points are <strong>doubled</strong> for that gameweek</li>
            <li>If your captain doesn't play in the gameweek, your vice-captain's points are doubled instead</li>
            <li>If neither plays, no player receives double points for that gameweek</li>
            <li>You can change your captain and vice-captain selections each gameweek</li>
            <li>Captains and vice-captains must be from your starting 11, not substitutes</li>
          </ul>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
          <h4 className="text-lg font-semibold text-white mb-2">Strategic Tip</h4>
          <p className="text-gray-300">
            Choose players with favorable fixtures or in good form as your captain, as their double points can significantly impact your gameweek score.
          </p>
        </div>
      </div>
      
      {/* Substitutions & Transfers */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <Repeat className="h-6 w-6 text-primary-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Substitutions & Transfers</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Automatic Substitutions</h3>
          <p className="text-gray-300 mb-4">
            If a player in your starting 11 doesn't play in the gameweek, they will be automatically substituted 
            with your first substitute player, following these rules:
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Substitutes will be prioritized in the order you have set them on your bench</li>
            <li>A substitute will only be used if their position doesn't violate your formation requirements</li>
            <li>E.g. If your goalkeeper doesn't play, only your substitute goalkeeper can replace them</li>
            <li>If a defender doesn't play, any defender, midfielder or forward can replace them as long as your formation remains valid</li>
            <li>A player who doesn't play any minutes in a gameweek is eligible for automatic substitution</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Transfers</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li><b className="text-primary-500">There is no limitation on the number of transfers you can make each gameweek. Happy transfering! 😀</b></li>

            
          </ul>
        </div>
      </div>
      
      {/* Bonus Points System */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <Award className="h-6 w-6 text-primary-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Bonus Points System</h2>
        </div>
        
        <p className="text-gray-300 mb-4">
          In addition to standard scoring, bonus points are awarded in each match to the best-performing player, 
          as determined by the BUET Premier League officials.
        </p>
        
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-gray-300">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-2 pr-6">Performance Rank</th>
                <th className="pb-2">Bonus Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="py-3 pr-6">Player of the Match</td>
                <td className="py-3">3</td>
              </tr>
            
            </tbody>
          </table>
        </div>
        
        <p className="text-gray-300">
          Performance is evaluated based on a comprehensive set of statistics including goals, assists, 
          passes, tackles, blocks, interceptions, saves, and other measurable in-match events.
        </p>
      </div>
      
      {/* By-laws Section Anchor */}
      <div id="bylaws"></div>
      
      {/* Tournament By-laws */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <div className="flex items-center mb-4">
          <BookOpen className="h-6 w-6 text-primary-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">BUET Premier League By-laws</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Tournament Structure</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Season duration: June 20 ,2025 - July 18, 2025</li>
            <li>5 teams will compete in a round-robin format</li>
            <li>Each team plays every other team once</li>
            <li>Total of 4 matches per team</li>
            <li>Points system: 3 points for a win, 1 for a draw, 0 for a loss</li>
            <li>League standings determined by: Points → Head-to-head → Goal Difference → Goals Scored  </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Match Rules</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Match duration: 90 minutes (two 45-minute halves)</li>
            <li>Teams must have 7 players minimum to start a match</li>
            <li>Maximum of 5 substitutions allowed per team per match</li>
            <li>All matches will have designated referees and assistant referees</li>
           
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Team Regulations</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Each team must register a squad of 23 players by auction</li>
           
            <li>Teams must wear designated kits to avoid color clashes</li>
            <li>Each team must have at least 2 dedicated goalkeepers in their squad</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Disciplinary Procedures</h3>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>2 yellow cards = 1 match suspension</li>
            <li>Red card = minimum 1 match suspension (subject to review)</li>
            
            <li>All disputes will be handled by the BUET Premier League Disciplinary Committee</li>
            <li>Serious misconduct may result in extended suspensions or tournament expulsion</li>
          </ul>
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
                  <BookOpen className="w-5 h-5 text-white" />
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