'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  Trophy, 
  LogOut, 
  Menu, 
  X, 
  User, 
  PieChart, 
  RefreshCw, 
  BarChart2, 
  ChevronDown,
  Bell,
  Calendar,
  Award
} from 'lucide-react'

type NavLayoutProps = {
  children: React.ReactNode
}

export default function NavLayout({ children }: NavLayoutProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const userButtonRef = useRef<HTMLButtonElement>(null)

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if clicking outside both the menu and the button
      if (
        userMenuRef.current && 
        !userMenuRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    
    // Use mousedown instead of click to handle the event before it bubbles
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    localStorage.removeItem('fantasy_user_session');
    await signOut();
    router.push('/');
  }

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header/Navbar */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Always visible */}
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-white">BUET Fantasy</h1>
                  <p className="text-xs text-gray-400">2025 Season</p>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link 
                href="/dashboard" 
                className={isActive('/dashboard') 
                  ? "text-white font-medium border-b-2 border-primary-500 pb-1" 
                  : "text-gray-400 hover:text-white transition-colors"}
              >
                Dashboard
              </Link>
              <Link 
                href="/my-team" 
                className={isActive('/my-team') 
                  ? "text-white font-medium border-b-2 border-primary-500 pb-1" 
                  : "text-gray-400 hover:text-white transition-colors"}
              >
                My Team
              </Link>
              <Link 
                href="/points" 
                className={isActive('/points') 
                  ? "text-white font-medium border-b-2 border-primary-500 pb-1" 
                  : "text-gray-400 hover:text-white transition-colors"}
              >
                Points
              </Link>
              <Link 
                href="/transfers" 
                className={isActive('/transfers') 
                  ? "text-white font-medium border-b-2 border-primary-500 pb-1" 
                  : "text-gray-400 hover:text-white transition-colors"}
              >
                Transfers
              </Link>
              <Link 
                href="/fixtures" 
                className={isActive('/fixtures') 
                  ? "text-white font-medium border-b-2 border-primary-500 pb-1" 
                  : "text-gray-400 hover:text-white transition-colors"}
              >
                Fixtures
              </Link>
              <Link 
                href="/stats" 
                className={isActive('/stats') 
                  ? "text-white font-medium border-b-2 border-primary-500 pb-1" 
                  : "text-gray-400 hover:text-white transition-colors"}
              >
                Stats
              </Link>
              <Link 
                href="/standings" 
                className={isActive('/standings') 
                  ? "text-white font-medium border-b-2 border-primary-500 pb-1" 
                  : "text-gray-400 hover:text-white transition-colors"}
              >
                Standings
              </Link>
              <Link 
                href="/teams" 
                className={isActive('/teams') 
                  ? "text-white font-medium border-b-2 border-primary-500 pb-1" 
                  : "text-gray-400 hover:text-white transition-colors"}
              >
                Teams
              </Link>


              <Link 
                href="/about" 
                className={isActive('/about') 
                  ? "text-white font-medium border-b-2 border-primary-500 pb-1" 
                  : "text-gray-400 hover:text-white transition-colors"}
              >
                About
              </Link>
            </nav>
            
            {/* User menu & Mobile menu button - Visible on all screens */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white p-1">
                <Bell className="w-5 h-5" />
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button 
                  ref={userButtonRef}
                  onClick={toggleUserMenu} 
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-1.5 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600/30 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="text-sm">{user?.user_metadata?.first_name || user?.email?.split('@')[0]}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {/* Desktop User Dropdown */}
                {isUserMenuOpen && (
                  <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-700">
                    
                    <div className="py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                        Profile
                      </Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                        Settings
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation - Only visible when menu is open */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-3 border-t border-gray-800">
              <nav className="flex flex-col space-y-3 px-2">
                <Link 
                  href="/dashboard" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive('/dashboard')
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PieChart className={`w-5 h-5 ${isActive('/dashboard') ? "text-primary-400" : "text-gray-500"}`} />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  href="/my-team" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive('/my-team')
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className={`w-5 h-5 ${isActive('/my-team') ? "text-primary-400" : "text-gray-500"}`} />
                  <span>My Team</span>
                </Link>
                <Link 
                  href="/points" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive('/points')
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Award className={`w-5 h-5 ${isActive('/points') ? "text-primary-400" : "text-gray-500"}`} />
                  <span>Points</span>
                </Link>
                <Link 
                  href="/transfers" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive('/transfers')
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <RefreshCw className={`w-5 h-5 ${isActive('/transfers') ? "text-primary-400" : "text-gray-500"}`} />
                  <span>Transfers</span>
                </Link>
                <Link 
                  href="/fixtures" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive('/fixtures')
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className={`w-5 h-5 ${isActive('/fixtures') ? "text-primary-400" : "text-gray-500"}`} />
                  <span>Fixtures</span>
                </Link>
                <Link 
                  href="/stats" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive('/stats')
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BarChart2 className={`w-5 h-5 ${isActive('/stats') ? "text-primary-400" : "text-gray-500"}`} />
                  <span>Stats</span>
                </Link>
                <Link 
                  href="/standings" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive('/standings')
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Trophy className={`w-5 h-5 ${isActive('/standings') ? "text-primary-400" : "text-gray-500"}`} />
                  <span>Standings</span>
                </Link>
                <Link 
                  href="/teams" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive('/teams')
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Trophy className={`w-5 h-5 ${isActive('/teams') ? "text-primary-400" : "text-gray-500"}`} />
                  <span>Teams</span>
                </Link>

                <Link 
                  href="/about" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    isActive('/about')
                      ? "text-white bg-gray-800/50"
                      : "text-gray-300 hover:bg-gray-800/30"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Trophy className={`w-5 h-5 ${isActive('/about') ? "text-primary-400" : "text-gray-500"}`} />
                  <span>About</span>
                </Link>
                <div className="pt-2 mt-2 border-t border-gray-800">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center space-x-2 text-red-400 hover:bg-gray-800/30 px-3 py-2 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}