import React from 'react'
import { Trophy, Users, Target } from 'lucide-react'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  darkMode?: boolean
}

export default function AuthLayout({ children, title, subtitle, darkMode = true }: AuthLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-900' : 'bg-gradient-to-br from-primary-50 via-white to-primary-100'}`}>
      {/* Header with Logo */}
      <header className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Link href="/" className="flex items-center justify-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="text-center">
              <h1 className={`text-xl font-bold sm:text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                BUET Fantasy League
              </h1>
              <p className={`text-sm mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Premier League Edition
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Page Title */}
          {title && (
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold sm:text-3xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h2>
              {subtitle && (
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Auth Card */}
          <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}>
            <div className="px-6 py-8 sm:px-8">
              {children}
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-primary-100'}`}>
                <Users className={`w-5 h-5 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              </div>
              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join Friends
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-primary-100'}`}>
                <Target className={`w-5 h-5 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              </div>
              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Win Prizes
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-primary-100'}`}>
                <Trophy className={`w-5 h-5 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              </div>
              <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Be Champion
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-6 text-center">
        <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          © 2025 BUET Fantasy Premier League. Built with ❤️ for the BUET community.
        </p>
      </footer>
    </div>
  )
}