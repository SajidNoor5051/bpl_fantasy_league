'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trophy, Medal, Star, ArrowLeft } from 'lucide-react'

// Import logo images
import hithiumLogo from '@/Resources/images/hithium.jpg'
import fayLogo from '@/Resources/images/fay.jpg'
import nutechLogo from '@/Resources/images/nutech.jpg'
import eliteLogo from '@/Resources/images/elite.jpg'
import mideaLogo from '@/Resources/images/midea.jpg'


// Import custom football trophy icons
import ChampionsTrophyIcon from '@/components/icons/ChampionsTrophyIcon'
import GoldenBootIcon from '@/components/icons/GoldenBootIcon'
import GoldenGloveIcon from '@/components/icons/GoldenGloveIcon'

export default function PrizesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Simple header */}
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
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Prizes & Awards</h1>
            <Link 
              href="/" 
              className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          {/* Overview */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
            <div className="flex items-center mb-4">
              <Trophy className="h-7 w-7 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">BUET Fantasy League Prizes</h2>
            </div>
            <p className="text-gray-300 mb-4">
              The BUET Fantasy Premier League offers exciting prizes to recognize and reward outstanding performance 
              throughout the season. From team awards to individual achievements, there's glory to be captured 
              at every level of the competition.
            </p>
            <p className="text-gray-300">
              All prizes will be awarded at the season-end ceremony scheduled for August 30, 2025.
            </p>
          </div>
          
          {/* Team Awards */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
            <div className="flex items-center mb-4">
              <Trophy className="h-7 w-7 text-primary-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Team Awards</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-5 border border-gray-600 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-yellow-400 bg-opacity-20 rounded-full mr-4 flex-shrink-0">
                    <ChampionsTrophyIcon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Champions</h3>
                    <p className="text-sm text-gray-400">1st Place</p>
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
                    <p className="text-gray-300">Championship Trophy</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
                    <p className="text-gray-300">৳60,000 Prize Money</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-yellow-400 rounded-full mr-3"></div>
                    <p className="text-gray-300">Winner's Medals for Team</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-5 border border-gray-600 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-400 bg-opacity-20 rounded-full mr-4 flex-shrink-0">
                    <Medal className="h-6 w-6 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Runners Up</h3>
                    <p className="text-sm text-gray-400">2nd Place</p>
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gray-400 rounded-full mr-3"></div>
                    <p className="text-gray-300">Runners-up Trophy</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gray-400 rounded-full mr-3"></div>
                    <p className="text-gray-300">৳40,000 Prize Money</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-gray-400 rounded-full mr-3"></div>
                    <p className="text-gray-300">Runners-up Medals for Team</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-5 border border-gray-600 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-400 bg-opacity-20 rounded-full mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Fair Play Award</h3>
                    <p className="text-sm text-gray-400">Best Conduct</p>
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-green-400 rounded-full mr-3"></div>
                    <p className="text-gray-300">Fair Play Trophy</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-1 h-6 bg-green-400 rounded-full mr-3"></div>
                    <p className="text-gray-300">Recognition for Sportsmanship</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Individual Awards */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
            <div className="flex items-center mb-4">
              <Star className="h-7 w-7 text-primary-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Individual Awards</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-700 p-5 rounded-lg border border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-purple-500 bg-opacity-20 rounded-full mr-3 flex-shrink-0">
                    <Star className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Player of the Tournament</h3>
                </div>
                <p className="text-gray-300 mb-2">
                  Awarded to the player with the highest overall impact throughout the season.
                </p>
                <div className="flex items-center mt-3">
                  <Trophy className="h-5 w-5 text-purple-400 mr-2" />
                  <p className="text-gray-300">POTT Trophy + Special Recognition</p>
                </div>
              </div>
              
              <div className="bg-gray-700 p-5 rounded-lg border border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 bg-opacity-20 rounded-full mr-3 flex-shrink-0">
                    <GoldenBootIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Top Scorer</h3>
                </div>
                <p className="text-gray-300 mb-2">
                  Awarded to the player who scores the most goals in the tournament.
                </p>
                <div className="flex items-center mt-3">
                  <GoldenBootIcon className="h-5 w-5 text-yellow-400 mr-2" />
                  <p className="text-gray-300">Golden Boot Award</p>
                </div>
              </div>
              
              <div className="bg-gray-700 p-5 rounded-lg border border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-500 bg-opacity-20 rounded-full mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                      <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                      <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Emerging Player</h3>
                </div>
                <p className="text-gray-300 mb-2">
                  Recognizes the best performing young talent (U-23) in the tournament.
                </p>
                <div className="flex items-center mt-3">
                  <Trophy className="h-5 w-5 text-blue-400 mr-2" />
                  <p className="text-gray-300">Rising Star Trophy</p>
                </div>
              </div>
              
              <div className="bg-gray-700 p-5 rounded-lg border border-gray-600">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500 bg-opacity-20 rounded-full mr-3 flex-shrink-0">
                    <GoldenGloveIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Best Goalkeeper</h3>
                </div>
                <p className="text-gray-300 mb-2">
                  Awarded to the goalkeeper with the most clean sheets and exceptional saves.
                </p>
                <div className="flex items-center mt-3">
                  <GoldenGloveIcon className="h-5 w-5 text-green-400 mr-2" />
                  <p className="text-gray-300">Golden Glove Award</p>
                </div>
              </div>
            </div>
            
            {/* MOTM Awards section */}
            <div className="bg-gray-700 p-5 rounded-lg border border-gray-600 mt-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-amber-500 bg-opacity-20 rounded-full mr-3 flex-shrink-0">
                  <Star className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Man of the Match Awards</h3>
              </div>
              <p className="text-gray-300 mb-4">
                After each match, a Man of the Match (MOTM) is selected based on outstanding performance. 
                These awards recognize exceptional single-game contributions throughout the tournament.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-1 h-6 bg-amber-400 rounded-full mr-3 mt-1"></div>
                  <div>
                    <p className="text-gray-300 font-medium">MOTM Trophy</p>
                    <p className="text-sm text-gray-400">A miniature trophy awarded after each match</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-1 h-6 bg-amber-400 rounded-full mr-3 mt-1"></div>
                  <div>
                    <p className="text-gray-300 font-medium">Performance Bonus</p>
                    <p className="text-sm text-gray-400">Extra fantasy points awarded to the player's fantasy owners</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
          {/* Sponsors Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Sponsored By</h2>
            <p className="text-gray-300 mb-8">
              Our premium prizes are made possible by the generous support of our sponsors.
            </p>
            
            {/* Title Sponsor */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Title Sponsor</h3>
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-64 h-48 sm:w-80 sm:h-56 bg-white rounded-lg flex items-center justify-center mb-4 p-6 relative shadow-lg">
                    <Image 
                      src={hithiumLogo} 
                      alt="Hithium Logo" 
                      fill
                      sizes="(max-width: 640px) 256px, 320px"
                      className="object-contain p-4"
                      priority
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Hithium</h4>
                  <p className="text-sm text-primary-400">Title Sponsor</p>
                </div>
              </div>
            </div>
            
            {/* Other Sponsors */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Our Sponsors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Fay */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-24 sm:w-40 sm:h-32 lg:w-44 lg:h-36 bg-white rounded-lg flex items-center justify-center mb-3 p-3 relative shadow-md">
                    <Image 
                      src={fayLogo} 
                      alt="Fay Logo" 
                      fill
                      sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 176px"
                      className="object-contain p-2"
                    />
                  </div>
                  <h4 className="text-base font-medium text-white">Fay</h4>
                </div>
                
                {/* Nutech */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-24 sm:w-40 sm:h-32 lg:w-44 lg:h-36 bg-white rounded-lg flex items-center justify-center mb-3 p-3 relative shadow-md">
                    <Image 
                      src={nutechLogo} 
                      alt="Nutech Logo" 
                      fill
                      sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 176px"
                      className="object-contain p-2"
                    />
                  </div>
                  <h4 className="text-base font-medium text-white">Nutech</h4>
                </div>
                
                {/* Elite */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-24 sm:w-40 sm:h-32 lg:w-44 lg:h-36 bg-white rounded-lg flex items-center justify-center mb-3 p-3 relative shadow-md">
                    <Image 
                      src={eliteLogo} 
                      alt="Elite Logo" 
                      fill
                      sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 176px"
                      className="object-contain p-2"
                    />
                  </div>
                  <h4 className="text-base font-medium text-white">Elite</h4>
                </div>
                
                {/* Midea */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-24 sm:w-40 sm:h-32 lg:w-44 lg:h-36 bg-white rounded-lg flex items-center justify-center mb-3 p-3 relative shadow-md">
                    <Image 
                      src={mideaLogo} 
                      alt="Midea Logo" 
                      fill
                      sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 176px"
                      className="object-contain p-2"
                    />
                  </div>
                  <h4 className="text-base font-medium text-white">Midea</h4>
                </div>
                
                
                
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-950 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            © 2025 BUET Fantasy Premier League. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}