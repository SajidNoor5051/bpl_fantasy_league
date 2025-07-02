'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import NavLayout from '@/components/layout/NavLayout'
import { 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Info,
  Trophy,
  Users,
  X
} from 'lucide-react'

// Define player interface
interface Player {
  player_id: number
  first_name: string
  last_name: string
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  team_id: number
  team_name: string
  team_short_name: string
  fantasy_price: number
  form?: number
  total_points?: number
}

// Define team interface
interface TeamCounts {
  [key: number]: number
}

export default function CreateTeamPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [teamName, setTeamName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activePosition, setActivePosition] = useState<'GK' | 'DEF' | 'MID' | 'FWD'>('GK')
  const [sortBy, setSortBy] = useState<'price' | 'points'>('price')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [error, setError] = useState<string | null>(null)
  const [budgetRemaining, setBudgetRemaining] = useState(100)
  const [teamCounts, setTeamCounts] = useState<TeamCounts>({})
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalPosition, setModalPosition] = useState<'GK' | 'DEF' | 'MID' | 'FWD'>('GK')
  const modalRef = useRef<HTMLDivElement>(null)
  
  // Position counts for validation
  const positionLimits = {
    GK: 2,
    DEF: 5,
    MID: 5,
    FWD: 3
  }
  
  // Function to calculate current position counts
  const getPositionCounts = () => {
    const counts = {
      GK: selectedPlayers.filter(p => p.position === 'GK').length,
      DEF: selectedPlayers.filter(p => p.position === 'DEF').length,
      MID: selectedPlayers.filter(p => p.position === 'MID').length,
      FWD: selectedPlayers.filter(p => p.position === 'FWD').length
    }
    return counts
  }
  
  const positionCounts = getPositionCounts()
  
  // Effect to load players data - modified to handle authentication more gracefully
  useEffect(() => {
    // Wait for the auth state to be determined before redirecting
    if (authLoading) return;
    
    // Only redirect if user is definitely not authenticated
    if (!user && !authLoading) {
      router.push('/auth/signin');
      return;
    }
    
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players')
        if (response.ok) {
          const data = await response.json()
          setPlayers(data)
          setFilteredPlayers(data.filter((p: Player) => p.position === activePosition))
        } else {
          setError('Failed to fetch players')
        }
      } catch (err) {
        setError('Error loading players data')
      } finally {
        setLoading(false)
      }
    }
    
    if (user) {
      fetchPlayers()
    }
  }, [user, authLoading, router])
  
  // Effect to filter players for the modal
  useEffect(() => {
    if (players.length) {
      let filtered = players.filter(player => 
        // Only show players of the selected position
        player.position === modalPosition &&
        // Exclude already selected players
        !selectedPlayers.some(p => p.player_id === player.player_id)
      )
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(player => 
          `${player.first_name} ${player.last_name}`.toLowerCase().includes(term) || 
          player.team_name.toLowerCase().includes(term)
        )
      }
      
      // Sort players
      filtered.sort((a, b) => {
        if (sortBy === 'price') {
          return sortOrder === 'asc' 
            ? a.fantasy_price - b.fantasy_price
            : b.fantasy_price - a.fantasy_price
        } else {
          const aPoints = a.total_points || 0
          const bPoints = b.total_points || 0
          return sortOrder === 'asc' ? aPoints - bPoints : bPoints - aPoints
        }
      })
      
      setFilteredPlayers(filtered)
    }
  }, [modalPosition, searchTerm, players, sortBy, sortOrder, selectedPlayers])
  
  // Effect to update budget and team counts whenever selected players change
  useEffect(() => {
    const newBudget = 100 - selectedPlayers.reduce((sum, player) => sum + player.fantasy_price, 0)
    setBudgetRemaining(newBudget)
    
    const newTeamCounts: TeamCounts = {}
    selectedPlayers.forEach(player => {
      if (newTeamCounts[player.team_id]) {
        newTeamCounts[player.team_id]++
      } else {
        newTeamCounts[player.team_id] = 1
      }
    })
    setTeamCounts(newTeamCounts)
  }, [selectedPlayers])
  
  // Effect to handle clicking outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
        setSearchTerm('')
      }
    }
    
    // Effect to handle ESC key to close modal
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
        setSearchTerm('')
      }
    }
    
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscKey)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isModalOpen])
  
  // Function to open modal for selecting a player at a specific position
  const openPlayerSelectionModal = (position: 'GK' | 'DEF' | 'MID' | 'FWD') => {
    // Check if we can add more players at this position
    if (positionCounts[position] >= positionLimits[position]) {
      setError(`Maximum ${positionLimits[position]} ${position} players allowed`)
      setTimeout(() => setError(null), 3000)
      return
    }
    
    setModalPosition(position)
    setSearchTerm('')
    setIsModalOpen(true)
  }
  
  // Function to select a player from the modal
  const selectPlayer = (player: Player) => {
    // Validate team limit (max 5 players from one team)
    if (teamCounts[player.team_id] >= 5) {
      setError('Maximum 5 players allowed from one team')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    // Validate budget
    if (budgetRemaining - player.fantasy_price < 0) {
      setError('Not enough budget remaining')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    // Add player to selection
    setSelectedPlayers([...selectedPlayers, player])
    setIsModalOpen(false)
    setSearchTerm('')
  }
  
  // Function to handle removing a player from the pitch
  const removePlayerFromPitch = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.player_id !== playerId));
  }
  
  // Function to handle team submission
  const handleSubmitTeam = async () => {
    // Validate team name
    if (!teamName.trim()) {
      setError('Please enter a team name')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    // Validate team composition
    if (selectedPlayers.length !== 15) {
      setError('Your team must have exactly 15 players')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    // Check if all position requirements are met
    const counts = getPositionCounts()
    if (
      counts.GK !== positionLimits.GK || 
      counts.DEF !== positionLimits.DEF || 
      counts.MID !== positionLimits.MID || 
      counts.FWD !== positionLimits.FWD
    ) {
      setError('Team must have 2 GK, 5 DEF, 5 MID, and 3 FWD players')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    try {
      setLoading(true)
      
      // Select 11 starting players (1 GK, 4 DEF, 3 MID, 3 FWD)
      const startingPlayers : Player [] = [];
      const positionsNeeded = { GK: 1, DEF: 4, MID: 3, FWD: 3 };
      
      Object.keys(positionsNeeded).forEach(pos => {
        const positionPlayers = selectedPlayers.filter(p => p.position === pos);
        startingPlayers.push(...positionPlayers.slice(0, positionsNeeded[pos as keyof typeof positionsNeeded]));
      });
      
      // Select captain and vice-captain from starting 11
      const captainIndex = Math.floor(Math.random() * startingPlayers.length);
      let viceCaptainIndex;
      do {
        viceCaptainIndex = Math.floor(Math.random() * startingPlayers.length);
      } while (viceCaptainIndex === captainIndex);
      
      const captainId = startingPlayers[captainIndex].player_id;
      const viceCaptainId = startingPlayers[viceCaptainIndex].player_id;
      
      // Create data object for API submission
      const teamData = {
        // Fantasy Teams Table Data
        fantasy_team: {
          user_id: user?.id, // UUID from Supabase auth
          team_name: teamName,
          budget: budgetRemaining,
          // total_points and gameweek_points default to 0 in the database
        },
        
        // Fantasy Team Players Table Data
        players: selectedPlayers.map(player => ({
          player_id: player.player_id,
          is_captain: player.player_id === captainId,
          is_vice_captain: player.player_id === viceCaptainId,
          is_starting: startingPlayers.some(p => p.player_id === player.player_id)
        }))
      };
      
      // Send data to API
      const response = await fetch('/api/fantasy-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to create team');
      }
      
      // Show success message
      alert(result.message || 'Team created successfully!');
      
      // Redirect to teams/my-team page
      router.push('/my-team');
      
    } catch (err:any) {
      console.error('Error creating team:', err);
      setError(err.message || 'Error creating team. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  }
  
  // Function to render player slot on the pitch
  const renderPlayerSlot = (position: 'GK' | 'DEF' | 'MID' | 'FWD', index: number) => {
    const positionPlayers = selectedPlayers.filter(p => p.position === position);
    const player = positionPlayers[index];
    
    // Position-specific styling
    const positionStyle = {
      GK: 'bg-red-900/50 text-red-400',
      DEF: 'bg-blue-900/50 text-blue-400',
      MID: 'bg-green-900/50 text-green-400',
      FWD: 'bg-yellow-900/50 text-yellow-400'
    };
    
    const labelText = {
      GK: 'Select GK',
      DEF: 'Select DEF',
      MID: 'Select MID',
      FWD: 'Select FWD'
    };
    
    return (
      <div 
        key={`${position}-${index}`}
        className={`
          rounded flex flex-col justify-center items-center relative transition-all cursor-pointer
          w-16 h-24 sm:w-18 sm:h-26 md:w-20 md:h-28
          ${player ? 'bg-gray-900/90 border border-gray-700 shadow-lg' : 'bg-gray-900/30 border border-gray-800/40 hover:bg-gray-900/50'}
        `}
        onClick={() => !player && openPlayerSelectionModal(position)}
      >
        {player ? (
          <>
            <button 
              className="absolute -top-1 -left-1 bg-red-600 text-white p-0.5 rounded-full z-10 hover:bg-red-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                removePlayerFromPitch(player.player_id);
              }}
            >
              <X className="w-3 h-3" />
            </button>
            <div className={`text-xs font-bold mb-0.5 rounded px-1 py-0.5 w-full text-center ${positionStyle[position]}`}>
              {player.position}
            </div>
            <div className="font-medium text-white text-xs text-center px-1 truncate w-full">
              {position === 'DEF' || position === 'MID' ? player.last_name : `${player.first_name} ${player.last_name}`}
            </div>
            <div className="text-gray-400 text-xs truncate w-full text-center">
              {player.team_short_name}
            </div>
            <div className="text-primary-300 text-xs font-bold mt-0.5">
              £{player.fantasy_price}m
            </div>
          </>
        ) : (
          <div className="text-gray-500 text-xs font-medium flex flex-col items-center">
            <div className={`rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mb-1 ${positionStyle[position]}`}>
              {position}
            </div>
            {labelText[position]}
          </div>
        )}
      </div>
    );
  };
  
  // Position-specific titles for modal
  const positionTitles = {
    GK: 'Goalkeepers',
    DEF: 'Defenders',
    MID: 'Midfielders',
    FWD: 'Forwards'
  };
  
  // If not authenticated or still loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading players data...</p>
        </div>
      </div>
    )
  }

  return (
    <NavLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Create Your Fantasy Team</h1>
          <p className="text-gray-400 mt-2">Select 15 players to build your dream team</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Selected: {selectedPlayers.length}/15 players</span>
            <span className="text-primary-400 font-medium">£{budgetRemaining.toFixed(1)}m remaining</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 rounded-full transition-all" 
              style={{ width: `${(selectedPlayers.length / 15) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Team Name */}
        <div className="mb-6">
          <label htmlFor="team-name" className="block mb-2 font-medium text-gray-300">Team Name</label>
          <input
            type="text"
            id="team-name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your team name"
            className="w-full md:w-1/2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        {/* Selection Messages */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
        
        {/* Football Pitch Visualization */}
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-primary-400" /> 
            Team Formation
          </h2>
          
          <div className="relative w-full bg-green-800 rounded-lg overflow-hidden" style={{ minHeight: "520px" }}>
            {/* Field Markings */}
            <div className="absolute inset-0">
              {/* Center Circle */}
              <div className="absolute rounded-full border border-white/30 w-1/4 h-1/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              
              {/* Center Line */}
              <div className="absolute top-0 bottom-0 left-1/2 border-l border-white/30 transform -translate-x-1/2"></div>
              
              {/* Penalty Areas */}
              <div className="absolute top-1/4 left-0 w-1/6 h-1/2 border-r border-t border-b border-white/30"></div>
              <div className="absolute top-1/4 right-0 w-1/6 h-1/2 border-l border-t border-b border-white/30"></div>
              
              {/* Goal Areas */}
              <div className="absolute top-1/3 left-0 w-1/12 h-1/3 border-r border-t border-b border-white/30"></div>
              <div className="absolute top-1/3 right-0 w-1/12 h-1/3 border-l border-t border-b border-white/30"></div>
            </div>
            
            {/* Player Formations */}
            <div className="absolute inset-0 flex flex-col">
              {/* Goalkeeper Row */}
              <div className="flex justify-center items-center h-1/6 mt-4">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {[0, 1].map(index => renderPlayerSlot('GK', index))}
                </div>
              </div>
              
              {/* Defenders Row */}
              <div className="flex justify-center items-center h-1/4 mt-6">
                <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full max-w-3xl px-2 sm:px-0">
                  {[0, 1, 2, 3, 4].map(index => renderPlayerSlot('DEF', index))}
                </div>
              </div>
              
              {/* Midfielders Row */}
              <div className="flex justify-center items-center h-1/4 mt-2">
                <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full max-w-3xl px-2 sm:px-0">
                  {[0, 1, 2, 3, 4].map(index => renderPlayerSlot('MID', index))}
                </div>
              </div>
              
              {/* Forwards Row */}
              <div className="flex justify-center items-center h-1/4 mb-4">
                <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-xl">
                  {[0, 1, 2].map(index => renderPlayerSlot('FWD', index))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Position Summary */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className={`p-3 rounded-lg border text-center ${positionCounts.GK === positionLimits.GK ? 'bg-green-900/20 border-green-800' : 'bg-gray-800/40 border-gray-700'}`}>
            <div className="text-sm text-gray-300">Goalkeepers</div>
            <div className="font-bold text-lg">
              <span className={positionCounts.GK === positionLimits.GK ? 'text-green-400' : 'text-white'}>
                {positionCounts.GK}
              </span>
              /{positionLimits.GK}
            </div>
          </div>
          <div className={`p-3 rounded-lg border text-center ${positionCounts.DEF === positionLimits.DEF ? 'bg-green-900/20 border-green-800' : 'bg-gray-800/40 border-gray-700'}`}>
            <div className="text-sm text-gray-300">Defenders</div>
            <div className="font-bold text-lg">
              <span className={positionCounts.DEF === positionLimits.DEF ? 'text-green-400' : 'text-white'}>
                {positionCounts.DEF}
              </span>
              /{positionLimits.DEF}
            </div>
          </div>
          <div className={`p-3 rounded-lg border text-center ${positionCounts.MID === positionLimits.MID ? 'bg-green-900/20 border-green-800' : 'bg-gray-800/40 border-gray-700'}`}>
            <div className="text-sm text-gray-300">Midfielders</div>
            <div className="font-bold text-lg">
              <span className={positionCounts.MID === positionLimits.MID ? 'text-green-400' : 'text-white'}>
                {positionCounts.MID}
              </span>
              /{positionLimits.MID}
            </div>
          </div>
          <div className={`p-3 rounded-lg border text-center ${positionCounts.FWD === positionLimits.FWD ? 'bg-green-900/20 border-green-800' : 'bg-gray-800/40 border-gray-700'}`}>
            <div className="text-sm text-gray-300">Forwards</div>
            <div className="font-bold text-lg">
              <span className={positionCounts.FWD === positionLimits.FWD ? 'text-green-400' : 'text-white'}>
                {positionCounts.FWD}
              </span>
              /{positionLimits.FWD}
            </div>
          </div>
        </div>
        
        {/* Submit Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2" /> Submit Your Team
          </h2>
          
          <div className="text-gray-300 space-y-2 mb-4">
            <p className={selectedPlayers.length === 15 ? 'text-green-400' : 'text-gray-400'}>
              {selectedPlayers.length === 15 ? '✓' : '○'} Your team must have exactly 15 players
            </p>
            <p className={budgetRemaining >= 0 ? 'text-green-400' : 'text-gray-400'}>
              {budgetRemaining >= 0 ? '✓' : '○'} Your team budget must be within the £100m limit
            </p>
            <p className={Object.values(teamCounts).every(count => count <= 5) ? 'text-green-400' : 'text-gray-400'}>
              {Object.values(teamCounts).every(count => count <= 5) ? '✓' : '○'} Maximum 5 players from any single team
            </p>
            <p className={
              positionCounts.GK === positionLimits.GK &&
              positionCounts.DEF === positionLimits.DEF &&
              positionCounts.MID === positionLimits.MID &&
              positionCounts.FWD === positionLimits.FWD
              ? 'text-green-400' : 'text-gray-400'
            }>
              {
                positionCounts.GK === positionLimits.GK &&
                positionCounts.DEF === positionLimits.DEF &&
                positionCounts.MID === positionLimits.MID &&
                positionCounts.FWD === positionLimits.FWD
                ? '✓' : '○'
              } Team composition must be 2 GK, 5 DEF, 5 MID, 3 FWD
            </p>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleSubmitTeam}
              disabled={
                selectedPlayers.length !== 15 ||
                budgetRemaining < 0 ||
                positionCounts.GK !== positionLimits.GK ||
                positionCounts.DEF !== positionLimits.DEF ||
                positionCounts.MID !== positionLimits.MID ||
                positionCounts.FWD !== positionLimits.FWD ||
                !teamName.trim()
              }
              className={`
                py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors
                ${
                  selectedPlayers.length === 15 &&
                  budgetRemaining >= 0 &&
                  positionCounts.GK === positionLimits.GK &&
                  positionCounts.DEF === positionLimits.DEF &&
                  positionCounts.MID === positionLimits.MID &&
                  positionCounts.FWD === positionLimits.FWD &&
                  teamName.trim()
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              Submit Team <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          
          {/* Debug Information */}
          <div className="mt-8 p-4 border border-gray-700 rounded-lg bg-gray-900">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Debug Information (To be removed in production)</h3>
            <pre className="text-xs text-gray-500 overflow-x-auto">
              User ID: {user?.id}
              {"\n"}
              Team Name: {teamName}
              {"\n"}
              Player IDs: {JSON.stringify(selectedPlayers.map(p => p.player_id))}
            </pre>
          </div>
        </div>
        
        {/* Player Selection Modal */}
        {isModalOpen && (
          <>
            {/* Modal Backdrop */}
            <div className="fixed inset-0 bg-black/75 z-40" />
            
            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                ref={modalRef}
                className="bg-gray-900 rounded-xl shadow-lg w-full max-w-3xl max-h-[80vh] flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">
                    Select {positionTitles[modalPosition]}
                  </h3>
                  <button 
                    onClick={() => {
                      setIsModalOpen(false)
                      setSearchTerm('')
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Search and Sort */}
                <div className="p-4 border-b border-gray-800 bg-gray-800/50">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-4 h-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search players or teams"
                        className="block w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent"
                        autoFocus
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'price' | 'points')}
                        className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        <option value="price">Sort by Price</option>
                        <option value="points">Sort by Points</option>
                      </select>
                      
                      <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-300 hover:bg-gray-700"
                      >
                        <Filter className={`w-4 h-4 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Player List */}
                <div className="flex-grow overflow-y-auto">
                  {filteredPlayers.length > 0 ? (
                    <table className="w-full table-auto">
                      <thead className="bg-gray-800/70 sticky top-0">
                        <tr>
                          <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">Player</th>
                          <th className="text-left text-xs text-gray-400 font-medium px-2 py-3">Team</th>
                          <th className="text-right text-xs text-gray-400 font-medium px-2 py-3">Price</th>
                          <th className="text-xs text-gray-400 font-medium px-2 py-3 w-16">Points</th>
                          <th className="text-xs text-gray-400 font-medium px-2 py-3 w-16"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {filteredPlayers.map(player => {
                          // Check if player can be selected based on budget and team limits
                          const canSelect = (teamCounts[player.team_id] || 0) < 5 && 
                                          budgetRemaining >= player.fantasy_price
                          
                          return (
                            <tr 
                              key={player.player_id} 
                              className={`
                                ${!canSelect ? 'opacity-50' : 'hover:bg-gray-800/50'}
                                border-b border-gray-800/50
                              `}
                            >
                              <td className="px-4 py-3 text-white text-sm">
                                <div className="font-medium">{player.first_name} {player.last_name}</div>
                              </td>
                              <td className="px-2 py-3 text-gray-400 text-sm">
                                {player.team_short_name}
                              </td>
                              <td className="px-2 py-3 text-right text-primary-300 font-medium text-sm">
                                £{player.fantasy_price}m
                              </td>
                              <td className="px-2 py-3 text-center text-gray-300 text-sm">
                                {player.total_points || 0}
                              </td>
                              <td className="px-2 py-3 text-right">
                                <button
                                  onClick={() => canSelect && selectPlayer(player)}
                                  disabled={!canSelect}
                                  className={`
                                    p-1.5 rounded-full 
                                    ${canSelect 
                                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'}
                                  `}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex items-center justify-center h-48">
                      <p className="text-gray-400">No players found matching your criteria</p>
                    </div>
                  )}
                </div>
                
                {/* Modal Footer */}
                <div className="p-3 border-t border-gray-800 bg-gray-800/50 flex justify-between items-center text-xs text-gray-400">
                  <div>
                    {filteredPlayers.length} players available
                  </div>
                  <div>
                    Budget: <span className="text-primary-300">£{budgetRemaining.toFixed(1)}m</span> remaining
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </NavLayout>
  )
}