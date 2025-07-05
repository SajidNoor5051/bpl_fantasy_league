'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import NavLayout from '@/components/layout/NavLayout'
import { Award, Shield, AlertTriangle, Ban, Save, Star, Menu, Home, ArrowLeft, Trophy } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface PlayerStat {
  player_id: number
  player_name: string
  team_name: string
  team_short_name: string
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  value: number
  fantasy_price: number
}

interface StatCategory {
  id: string
  name: string
  icon: React.ReactNode
  label: string
}

const categories: StatCategory[] = [
  { id: 'goals', name: 'Top Goalscorers', icon: <Award className="h-5 w-5" />, label: 'Goals' },
  { id: 'assists', name: 'Most Assists', icon: <Award className="h-5 w-5" />, label: 'Assists' },
  { id: 'yellow_cards', name: 'Most Yellow Cards', icon: <AlertTriangle className="h-5 w-5" />, label: 'Cards' },
  { id: 'red_cards', name: 'Most Red Cards', icon: <Ban className="h-5 w-5" />, label: 'Cards' },
  { id: 'saves', name: 'Most Saves', icon: <Save className="h-5 w-5" />, label: 'Saves' },
  { id: 'fantasy_points', name: 'Top Fantasy Points', icon: <Star className="h-5 w-5" />, label: 'Points' },
]

export default function StatsPage() {
  const { user } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [statsData, setStatsData] = useState<Record<string, PlayerStat[]>>({})
  const [activeCategory, setActiveCategory] = useState('goals')
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Refs for section navigation
  const sectionRefs = {
    goals: useRef<HTMLDivElement>(null),
    assists: useRef<HTMLDivElement>(null),
    yellow_cards: useRef<HTMLDivElement>(null),
    red_cards: useRef<HTMLDivElement>(null),
    saves: useRef<HTMLDivElement>(null),
    fantasy_points: useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(user !== null);
    
    // Fetch stats for all categories
    const fetchAllStats = async () => {
      setLoading(true)
      try {
        const results: Record<string, PlayerStat[]> = {};
        
        // Fetch each category sequentially to avoid overwhelming the API
        for (const category of categories) {
          const response = await fetch(`/api/stats?category=${category.id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${category.id} stats: ${response.statusText}`);
          }
          const data = await response.json();
          results[category.id] = data.data || [];
        }
        
        setStatsData(results);
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAllStats()
    
    // Set up scroll event listener for sticky navigation
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)
      
      // Update active category based on scroll position
      for (const [category, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current
          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveCategory(category)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [user])

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setMobileMenuOpen(false)
    
    // Scroll to the selected section
    const ref = sectionRefs[category as keyof typeof sectionRefs]
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: 'smooth',
      })
    }
  }
  
  // Get current category info
  const getCurrentCategory = () => {
    return categories.find(c => c.id === activeCategory) || categories[0]
  }
  
  const { name, icon, label } = getCurrentCategory()

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'GK': return 'bg-red-500'
      case 'DEF': return 'bg-blue-500'
      case 'MID': return 'bg-green-500'
      case 'FWD': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  // Main content for the stats page
  const content = (
    <>
      <div className="bg-gray-900 bg-opacity-95 border-b border-gray-800 mb-8">
        <div className="container mx-auto px-4">
          {isAuthenticated === false && (
            <div className="py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Player Statistics</h1>
              <Link 
                href="/" 
                className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>
          )}
          
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center justify-between py-3">
            <h3 className="text-white font-semibold">{name}</h3>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-gray-800"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute z-40 top-auto left-0 right-0 bg-gray-800 bg-opacity-95 shadow-xl" style={{ backdropFilter: 'blur(8px)' }}>
              <div className="container mx-auto px-4 py-2">
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryChange(category.id)}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                          activeCategory === category.id
                            ? 'bg-primary-600 text-white'
                            : 'text-gray-200 hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Desktop navigation */}
          <nav className="hidden lg:block py-2">
            <ul className="flex space-x-1 justify-center">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-md flex items-center transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-200 hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {isAuthenticated === false && (
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Player Statistics</h1>
          </div>
        )}
        {isAuthenticated !== false && (
          <h1 className="text-3xl font-bold text-white mb-8">Player Statistics</h1>
        )}
        
        {/* Stats sections */}
        {categories.map((category) => (
          <div
            key={category.id}
            ref={sectionRefs[category.id as keyof typeof sectionRefs]}
            id={category.id}
            className="mb-12"
          >
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700 flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-600 bg-opacity-20 flex items-center justify-center mr-3">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold text-white">{category.name}</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="text-gray-300 px-6 py-3 text-left text-lg font-semibold">Rank</th>
                      <th className="text-gray-300 px-6 py-3 text-left text-lg font-semibold">Player</th>
                      <th className="text-gray-300 px-6 py-3 text-left text-lg font-semibold">Team</th>
                      <th className="text-gray-300 px-6 py-3 text-left text-lg font-semibold">Pos</th>
                      <th className="text-gray-300 px-6 py-3 text-left text-lg font-semibold">{category.label}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                          </div>
                        </td>
                      </tr>
                    ) : statsData[category.id] && statsData[category.id].length > 0 ? (
                      statsData[category.id].map((player, index) => (
                        <tr key={player.player_id} className="hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-200">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-white">
                            {player.player_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-300">
                            {player.team_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center justify-center px-2 py-1 text-sm font-bold rounded-md ${getPositionColor(player.position)} bg-opacity-80 text-white`}>
                              {player.position}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-primary-400">
                            {player.value}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                          No statistics available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
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