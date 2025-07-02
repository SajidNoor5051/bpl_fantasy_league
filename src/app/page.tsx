'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Trophy, Users, Star, BarChart2, Zap, Shield, Menu, X, Award, Calendar, Info, Gift } from 'lucide-react'
import { useState } from 'react'

// Import sponsor logo images
import hithiumLogo from '@/Resources/images/hithium.jpg'
import fayLogo from '@/Resources/images/fay.jpg'
import nutechLogo from '@/Resources/images/nutech.jpg'
import eliteLogo from '@/Resources/images/elite.jpg'
import mideaLogo from '@/Resources/images/midea.jpg'

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Hero Header */}
      <header className="relative">
        {/* Gradient overlay at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600/20 to-transparent h-32 z-0"></div>
        
        {/* Navbar */}
        <nav className="container mx-auto relative z-20 flex items-center justify-between px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-primary-400 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                BUET Premier League
              </h1>
              <p className="text-xs sm:text-sm text-gray-300">
                Fantasy Season 6
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="space-x-3 sm:space-x-4 hidden lg:flex items-center">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">About</Link>
            <Link href="/rules" className="text-gray-300 hover:text-white transition-colors text-sm">Rules</Link>
            <Link href="/prizes" className="text-gray-300 hover:text-white transition-colors text-sm">Prizes</Link>
            <Link href="/stats" className="text-gray-300 hover:text-white transition-colors text-sm">Stats</Link>
            <Link href="/standings" className="text-gray-300 hover:text-white transition-colors text-sm">Standings</Link>
            <Link href="/fixtures" className="text-gray-300 hover:text-white transition-colors text-sm">Fixtures</Link>
            <Link href="/auth/signin" className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md transition-colors text-sm">
              Sign In
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <Link href="/auth/signin" className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md transition-colors text-sm">
              Sign In
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 relative z-30"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu - Fixed positioning and z-index */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-0 bg-gray-900/95 backdrop-blur-md  border-gray-800 shadow-xl z-10 pt-20">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all text-base py-3 px-4 rounded-lg  border-gray-800 flex items-center space-x-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Info className="w-5 h-5 text-gray-500" />
                  <span>About</span>
                </Link>
                <Link 
                  href="/rules" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all text-base py-3 px-4 rounded-lg  border-gray-800 flex items-center space-x-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Shield className="w-5 h-5 text-gray-500" />
                  <span>Rules</span>
                </Link>
                <Link 
                  href="/prizes" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all text-base py-3 px-4 rounded-lg  border-gray-800 flex items-center space-x-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Gift className="w-5 h-5 text-gray-500" />
                  <span>Prizes</span>
                </Link>
                <Link 
                  href="/stats" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all text-base py-3 px-4 rounded-lg  border-gray-800 flex items-center space-x-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BarChart2 className="w-5 h-5 text-gray-500" />
                  <span>Stats</span>
                </Link>
                <Link 
                  href="/standings" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all text-base py-3 px-4 rounded-lg  border-gray-800 flex items-center space-x-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Award className="w-5 h-5 text-gray-500" />
                  <span>Standings</span>
                </Link>
                <Link 
                  href="/fixtures" 
                  className="text-gray-300 hover:text-white hover:bg-gray-800 transition-all text-base py-3 px-4 rounded-lg flex items-center space-x-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>Fixtures</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay - Click to close */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 z-5"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-12 pb-20 sm:px-6 sm:pt-16 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Title Sponsor Announcement */}
            <div className="mb-6 flex flex-col items-center">
              <div className="w-24 h-16 sm:w-32 sm:h-20 md:w-36 md:h-24 bg-white rounded-xl flex items-center justify-center mb-4 p-3 relative shadow-lg border-2 lue-100">
                <Image 
                  src={hithiumLogo} 
                  alt="Hithium Logo" 
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
                  className="object-contain p-1"
                  priority
                />
              </div>
              <p className="text-blue-400 text-lg sm:text-xl md:text-2xl font-semibold">
                Hithium presents
              </p>
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-primary-300">
              BUET Premier League
            </h1>
            <p className="text-primary-300 text-xl sm:text-2xl font-bold mt-2 mb-6">
              Season 6
            </p>
            
            <div className="mt-8 mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-400 mb-4">
                & Fantasy Premier League
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the ultimate combination of live football action and fantasy team management. 
                Build your dream team and compete for glory!
              </p>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/signup"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 text-base sm:text-lg font-medium bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  Join Fantasy League
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 transform translate-y-12 group-hover:translate-y-0 bg-gradient-to-r from-primary-500 to-primary-400 transition-transform duration-300"></div>
              </Link>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 text-base sm:text-lg font-medium bg-gray-800 text-white hover:bg-gray-700 rounded-lg transition-colors shadow-md"
              >
                Sign In
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-3 sm:p-4 rounded-lg shadow-lg border border-gray-700">
                <div className="text-primary-400 font-bold text-xl sm:text-2xl">5</div>
                <div className="text-gray-400 text-xs sm:text-sm">Premier Teams</div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-3 sm:p-4 rounded-lg shadow-lg border border-gray-700">
                <div className="text-primary-400 font-bold text-xl sm:text-2xl">150+</div>
                <div className="text-gray-400 text-xs sm:text-sm">Players</div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-3 sm:p-4 rounded-lg shadow-lg border border-gray-700">
                <div className="text-primary-400 font-bold text-xl sm:text-2xl">10+</div>
                <div className="text-gray-400 text-xs sm:text-sm">Gameweeks</div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-3 sm:p-4 rounded-lg shadow-lg border border-gray-700">
                <div className="text-primary-400 font-bold text-xl sm:text-2xl">100M</div>
                <div className="text-gray-400 text-xs sm:text-sm">Budget</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* How to Play Fantasy League Section */}
      
        <div className="container mx-auto px-4 pt-12 pb-20 sm:px-6 sm:pt-16 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Play Fantasy League</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Follow the BUET Premier League action while managing your fantasy team for maximum points and glory
            </p>
          </div>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="bg-primary-600/20 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Build Your Team</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Select 15 players from BUET Premier League teams within your 100M budget. Choose wisely - every position matters!
              </p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="bg-primary-600/20 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Earn Points</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Your players earn points for goals, assists, clean sheets, and more based on their real BUET Premier League performances.
              </p>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="bg-primary-600/20 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Win Prizes</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Compete for the championship title and amazing prizes including cash rewards and trophies for top performers.
              </p>
            </div>
          </div>
        </div>
     
      
      {/* Fantasy League Rules */}
    
        <div className="container mx-auto px-4 pt-12 pb-20 sm:px-6 sm:pt-16 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Fantasy League Rules</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Everything you need to know about playing the BUET Fantasy Premier League
            </p>
          </div>
          
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex space-x-3 sm:space-x-4 items-start bg-gray-700/50 p-4 rounded-lg">
              <div className="bg-primary-600/20 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Team Formation</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Select 15 players: 2 GK, 5 DEF, 5 MID, 3 FWD within 100M budget. Set your starting XI each gameweek.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 sm:space-x-4 items-start bg-gray-700/50 p-4 rounded-lg">
              <div className="bg-primary-600/20 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Captain Bonus</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Your captain earns 2x points! If they don't play, your vice-captain gets the bonus instead.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 sm:space-x-4 items-start bg-gray-700/50 p-4 rounded-lg">
              <div className="bg-primary-600/20 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibent text-white mb-2">Unlimited Transfers</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Make <b className="text-primary-400">unlimited free transfers</b> between gameweeks. No restrictions!
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-10 text-center">
            <Link href="/rules" className="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm sm:text-base">
              View complete rules
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>
     
      
      {/* CTA Section */}
      
        <div className="container mx-auto px-4 pt-12 pb-20 sm:px-6 sm:pt-16 lg:px-8">
          <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-48 h-48 sm:w-64 sm:h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Ready to Join Season 6?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              Experience the thrill of BUET Premier League through fantasy football. Build your team and compete for glory!
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 text-base sm:text-lg font-medium bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 text-base sm:text-lg font-medium bg-gray-800 text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
     
      
      {/* Sponsors Section */}
      
        <div className="container mx-auto px-4 pt-12 pb-20 sm:px-6 sm:pt-16 lg:px-8 mt-10">
          {/* Title Sponsor */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Our Title Sponsor</h2>
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-56 h-40 sm:w-72 sm:h-48 md:w-80 md:h-56 bg-white rounded-lg flex items-center justify-center mb-3 p-6 relative">
                  <Image 
                    src={hithiumLogo} 
                    alt="Hithium Logo" 
                    fill
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, 320px"
                    className="object-contain p-3"
                    priority
                  />
                </div>
                <p className="text-primary-400 text-base sm:text-lg font-medium">Powering BUET Premier League Season 6</p>
              </div>
            </div>
          </div>
          
          {/* Other Sponsors */}
          <div className="border-gray-800 pt-8">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 text-center">Our Sponsors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {/* Fay */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-20 sm:w-36 sm:h-28 md:w-40 md:h-32 bg-white rounded-lg flex items-center justify-center mb-2 p-3 relative">
                  <Image 
                    src={fayLogo} 
                    alt="Fay Logo" 
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                    className="object-contain p-2"
                  />
                </div>
                <h4 className="text-sm sm:text-base font-medium text-white">Fay</h4>
              </div>
              
              {/* Nutech */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-20 sm:w-36 sm:h-28 md:w-40 md:h-32 bg-white rounded-lg flex items-center justify-center mb-2 p-3 relative">
                  <Image 
                    src={nutechLogo} 
                    alt="Nutech Logo" 
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                    className="object-contain p-2"
                  />
                </div>
                <h4 className="text-sm sm:text-base font-medium text-white">Nutech</h4>
              </div>
              
              {/* Elite */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-20 sm:w-36 sm:h-28 md:w-40 md:h-32 bg-white rounded-lg flex items-center justify-center mb-2 p-3 relative">
                  <Image 
                    src={eliteLogo} 
                    alt="Elite Logo" 
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                    className="object-contain p-2"
                  />
                </div>
                <h4 className="text-sm sm:text-base font-medium text-white">Elite</h4>
              </div>
              
              {/* Midea */}
              <div className="flex flex-col items-center">
                <div className="w-28 h-20 sm:w-36 sm:h-28 md:w-40 md:h-32 bg-white rounded-lg flex items-center justify-center mb-2 p-3 relative">
                  <Image 
                    src={mideaLogo} 
                    alt="Midea Logo" 
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                    className="object-contain p-2"
                  />
                </div>
                <h4 className="text-sm sm:text-base font-medium text-white">Midea</h4>
              </div>
            </div>
          </div>
        </div>
     

      {/* Footer */}
      <footer className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">BUET Premier League</h3>
                <p className="text-xs text-gray-400">Fantasy League Season 6</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">About</Link>
              <Link href="/rules" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Rules</Link>
              <Link href="/prizes" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Prizes</Link>
              <Link href="/stats" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Stats</Link>
              <Link href="/standings" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Standings</Link>
              <Link href="/fixtures" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Fixtures</Link>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
              © 2025 BUET Premier League Fantasy. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm mt-4 md:mt-0 text-center md:text-right">
              Powered by Hithium • Built for the BUET community
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}