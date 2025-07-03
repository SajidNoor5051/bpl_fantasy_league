'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, Home, ArrowLeft, Award, Target, Star, Shield } from 'lucide-react'
import NavLayout from '@/components/layout/NavLayout'
import { useAuth } from '@/contexts/AuthContext'

// Import sponsor logo images
// TODO: Add actual sponsor images when provided
 import hithiumLogo from '@/Resources/images/hithium.jpg'
import fayLogo from '@/Resources/images/fay.jpg'
import nutechLogo from '@/Resources/images/nutech.jpg'
import eliteLogo from '@/Resources/images/elite.jpg'
import mideaLogo from '@/Resources/images/midea.jpg'

export default function AboutPage() {
  const { user } = useAuth()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(user !== null)
  }, [user])

  const content = (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">About Buet Premier League</h1>
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
      
      {/* Our Mission */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-gray-300 mb-4">
          BPL Premier League aims to bring the excitement of  sports to Bangladesh footbal
          fans. Our platform allows users to create their dream teams, compete with friends, and track
          their performance throughout the season.
        </p>
        <p className="text-gray-300">
          Whether you're a casual fan or a dedicated football enthusiast, our fantasy league offers
          an immersive experience that enhances your enjoyment of the beautiful game.
        </p>
      </div>
      
      {/* History */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">History</h2>
        <p className="text-gray-300 mb-4">
          The BUET Premier League  has a rich history dating back to 2012. This marks our 6th season, 
          with each year bringing more excitement, competition, and community engagement than the last.
        </p>
        <p className="text-gray-300 mb-4">
          What started as a small competition among engineering students has grown into one of the most anticipated 
           leagues in BUET, bringing together football enthusiasts from all departments of BUET and beyond.
        </p>
        <p className="text-gray-300">
          Each season has seen innovations to the platform, new features, and an ever-growing community of passionate managers.
        </p>
        
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-3">Previous Season Winners</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-300">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-2 pr-6">Season</th>
                  <th className="pb-2 pr-6">Year</th>
                  <th className="pb-2 pr-6">Champion</th>
                  <th className="pb-2">Runner-up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="py-3 pr-6">Season 5</td>
                  <td className="py-3 pr-6">2024</td>
                  <td className="py-3 pr-6">Revenue Soldiers</td>
                  <td className="py-3">Team M&S</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Season 4</td>
                  <td className="py-3 pr-6">2023</td>
                  <td className="py-3 pr-6">Santiago Bernabuet</td>
                  <td className="py-3">Team M&S</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Season 3</td>
                  <td className="py-3 pr-6">2016</td>
                  <td className="py-3 pr-6">Team Invictus</td>
                  <td className="py-3">The Invincible</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Season 2</td>
                  <td className="py-3 pr-6">2014</td>
                  <td className="py-3 pr-6">Team Khobaib</td>
                  <td className="py-3">---</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Season 1</td>
                  <td className="py-3 pr-6">2013</td>
                  <td className="py-3 pr-6">Team Phenomenon FC</td>
                  <td className="py-3">Slasher FC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Our Sponsors */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Our Sponsors</h2>
        
        {/* Title Sponsor */}
        <div className="mb-8">
          <p className="text-gray-300 mb-6">
            We are proud to have <span className="text-primary-400 font-semibold">Hithium</span> as our title sponsor. 
            Their partnership enables us to offer an exciting platform and valuable prizes to our community.
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
              <div className="w-64 h-48 bg-white rounded-lg flex items-center justify-center mb-4 p-6 relative">
                {/* TODO: Replace with actual Hithium logo when provided */}
                <div className="text-gray-800 text-center">
                  <h3 className="text-2xl font-bold">HITHIUM</h3>
                  <p className="text-sm">Title Sponsor</p>
                </div>
               
                <Image 
                  src={hithiumLogo} 
                  alt="Hithium Logo" 
                  fill
                  sizes="256px"
                  className="object-contain p-4"
                  priority
                /> 
              </div>
              <h3 className="text-xl font-semibold text-white">Hithium</h3>
              <p className="text-primary-400 text-sm">Title Sponsor</p>
            </div>
          </div>
        </div>
        
        {/* Other Sponsors */}
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Our Sponsors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Fay */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-24 bg-white rounded-lg flex items-center justify-center mb-3 p-3 relative">
                {/* TODO: Replace with actual Fay logo when provided */}
                <div className="text-gray-800 text-center">
                  <h4 className="text-lg font-bold">FAY</h4>
                </div>
               
                <Image 
                  src={fayLogo} 
                  alt="Fay Logo" 
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                />
              </div>
              <h4 className="text-sm font-medium text-white">Fay</h4>
            </div>
            
            {/* Nutech */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-24 bg-white rounded-lg flex items-center justify-center mb-3 p-3 relative">
                {/* TODO: Replace with actual Nutech logo when provided */}
                <div className="text-gray-800 text-center">
                  <h4 className="text-lg font-bold">NUTECH</h4>
                </div>
                
                <Image 
                  src={nutechLogo} 
                  alt="Nutech Logo" 
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                />
              </div>
              <h4 className="text-sm font-medium text-white">Nutech</h4>
            </div>
            
            {/* Elite */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-24 bg-white rounded-lg flex items-center justify-center mb-3 p-3 relative">
                {/* TODO: Replace with actual Elite logo when provided */}
                <div className="text-gray-800 text-center">
                  <h4 className="text-lg font-bold">ELITE</h4>
                </div>
                
                <Image 
                  src={eliteLogo} 
                  alt="Elite Logo" 
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                />
              </div>
              <h4 className="text-sm font-medium text-white">Elite</h4>
            </div>
            
            {/* Midea */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-24 bg-white rounded-lg flex items-center justify-center mb-3 p-3 relative">
                {/* TODO: Replace with actual Midea logo when provided */}
                <div className="text-gray-800 text-center">
                  <h4 className="text-lg font-bold">MIDEA</h4>
                </div>
                
                <Image 
                  src={mideaLogo} 
                  alt="Midea Logo" 
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                />
              </div>
              <h4 className="text-sm font-medium text-white">Midea</h4>
            </div>
          </div>
        </div>
      </div>
      
      {/* Prizes */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Prizes</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-3">Team Awards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center mb-2">
                <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                <h4 className="text-lg font-semibold text-white">Champions</h4>
              </div>
              <p className="text-gray-300">
                Championship trophy + ৳60,000 prize money
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center mb-2">
                <Trophy className="h-5 w-5 text-gray-300 mr-2" />
                <h4 className="text-lg font-semibold text-white">Runners Up</h4>
              </div>
              <p className="text-gray-300">
                Runners-up trophy + ৳40,000 prize money
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h4 className="text-lg font-semibold text-white">Fair Play Award</h4>
              </div>
              <p className="text-gray-300">
                Fair Play Trophy + Recognition for Sportsmanship
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Individual Awards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center mb-2">
                <Award className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="text-lg font-semibold text-white">Player of the Tournament</h4>
              </div>
              <p className="text-gray-300">POTT Trophy</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center mb-2">
                <Target className="h-5 w-5 text-red-400 mr-2" />
                <h4 className="text-lg font-semibold text-white">Top Scorer</h4>
              </div>
              <p className="text-gray-300">Golden Boot award</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-purple-400 mr-2" />
                <h4 className="text-lg font-semibold text-white">Emerging Player</h4>
              </div>
              <p className="text-gray-300">Rising Star trophy</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-green-400 mr-2" />
                <h4 className="text-lg font-semibold text-white">Best Goalkeeper</h4>
              </div>
              <p className="text-gray-300">Golden Glove award </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Us */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
        <p className="text-gray-300 mb-4">
          Have questions or suggestions? We'd love to hear from you!
        </p>
        <p className="text-gray-300">
          Email: <a href="mailto:contact@bplfantasy.com" className="text-blue-400 hover:underline">contact@bplfantasy.com</a>
        </p>
        <p className="text-gray-300 mb-4">
          Follow us on social media for updates and announcements.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
            </svg>
          </a>
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