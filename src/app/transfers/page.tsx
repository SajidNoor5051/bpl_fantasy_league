'use client'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import NavLayout from '@/components/layout/NavLayout'
import toast from 'react-hot-toast'
import { 
  Search, 
  Filter, 
  ArrowRight, 
  RefreshCw, 
  Info,
  Trophy,
  Users,
  X,
  ArrowRightLeft,
  Calendar,
  Save,
  AlertCircle
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
  fantasy_points?: number
  selection_id?: number
  is_captain?: boolean
  is_vice_captain?: boolean
  is_starting?: boolean
}

// Define transfer interface
interface PendingTransfer {
  selectionId: number | undefined
  outgoingPlayerId: number
  incomingPlayerId: number
  outgoingPlayer: Player
  incomingPlayer: Player
  priceDifference: number
}

// Define gameweek interface
interface Gameweek {
  gameweek_id: number
  name: string
  start_date: string
  end_date: string
  is_current: boolean
}

// Define fixture interface
interface Fixture {
  fixture_id: number
  home_team_id: {
    team_id: number
    team_name: string
    team_short_name: string
  }
  away_team_id: {
    team_id: number
    team_name: string
    team_short_name: string
  }
  match_date: string
  stadium?: string
}

// Define team counts interface
interface TeamCounts {
  [key: number]: number
}

export default function TransfersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Team players state
  const [originalTeamPlayers, setOriginalTeamPlayers] = useState<Player[]>([])
  const [myTeamPlayers, setMyTeamPlayers] = useState<Player[]>([])
  const [budgetRemaining, setBudgetRemaining] = useState(0)
  const [originalBudget, setOriginalBudget] = useState(0)
  const [initialBudget, setInitialBudget] = useState(0)
  const [teamCounts, setTeamCounts] = useState<TeamCounts>({})
  const [currentSquadPlayerIds, setCurrentSquadPlayerIds] = useState<number[]>([])
  
  // Pending transfers state
  const [pendingTransfers, setPendingTransfers] = useState<PendingTransfer[]>([])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = useState(false)
  
  // Gameweek state
  const [gameweeks, setGameweeks] = useState<Gameweek[]>([])
  const [currentGameweekId, setCurrentGameweekId] = useState<number | null>(null)
  const [nextGameweekId, setNextGameweekId] = useState<number | null>(null)
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  
  // Transfer state
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [selectedPlayerOut, setSelectedPlayerOut] = useState<Player | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false)
  const [playerForWarning, setPlayerForWarning] = useState<Player | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'price' | 'points'>('price')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [transferringPosition, setTransferringPosition] = useState<'GK' | 'DEF' | 'MID' | 'FWD' | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const warningModalRef = useRef<HTMLDivElement>(null)
  const saveConfirmModalRef = useRef<HTMLDivElement>(null)
  
  // Effect to load team data
  useEffect(() => {
    // Wait for the auth state to be determined before redirecting
    if (authLoading) return;
    
    // Only redirect if user is definitely not authenticated
    if (!user && !authLoading) {
      router.push('/auth/signin');
      return;
    }
    
    const fetchTransfersData = async () => {
      try {
        // Fetch transfers data (no longer need gameweekId from URL)
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/transfers?userId=${user?.id || ''}&t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
        
        if (response.ok) {
          const data = await response.json()

          console.log("Data from databse initially : " , data.players)
          
          // Set team players
          setMyTeamPlayers(data.players || [])
          setOriginalTeamPlayers(data.players || [])
          
          // Initialize current squad player IDs for tracking
          setCurrentSquadPlayerIds((data.players || []).map((p: Player) => p.player_id))
          
          // Set budget
          setBudgetRemaining(data.team?.budget || 0)
          setOriginalBudget(data.team?.budget || 0)
          setInitialBudget(data.team?.budget || 0)
          
          // Set gameweeks and both current and next gameweek IDs
          setGameweeks(data.gameweeks || [])
          setCurrentGameweekId(data.currentGameweekId || null)
          setNextGameweekId(data.nextGameweekId || null)
          
          // Set fixtures (these are now for the next gameweek)
          setFixtures(data.fixtures || [])
          
          // Initialize team counts
          const newTeamCounts: TeamCounts = {}
          data.players.forEach((player: Player) => {
            if (newTeamCounts[player.team_id]) {
              newTeamCounts[player.team_id]++
            } else {
              newTeamCounts[player.team_id] = 1
            }
          })
          setTeamCounts(newTeamCounts)
          
          // Fetch available players for transfers
          fetchAllPlayers()
        } else {
          const errorData = await response.json()
          setError(errorData.error || 'Failed to fetch team data')
        }
      } catch (err) {
        setError('Error loading team data')
      } finally {
        setLoading(false)
      }
    }
    
    const fetchAllPlayers = async () => {
      try {
        const response = await fetch('/api/players', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })
        if (response.ok) {
          const data = await response.json()
          setAvailablePlayers(data)
        } else {
          setError('Failed to fetch players for transfer')
        }
      } catch (err) {
        setError('Error loading available players')
      }
    }
    
    if (user) {
      fetchTransfersData()
    }
  }, [user, authLoading, router])
  
  // Effect to update filtered players for modal based on position
  useEffect(() => {
    if (availablePlayers.length && transferringPosition) {
      // Filter players by position and exclude players in current team
      let filtered = availablePlayers.filter(player => {
        // Only show players of the selected position
        const isCorrectPosition = player.position === transferringPosition;
        
        // Check if player is not in current team (myTeamPlayers) 
        const isNotInCurrentTeam = !myTeamPlayers.some(p => p.player_id === player.player_id);
        
        // Check if player was transferred out (so they can be selected again)
        const isTransferredOut = pendingTransfers.some(
          t => t.outgoingPlayerId === player.player_id
        );
        
        // Include either players not in current team OR players that have been transferred out
        return isCorrectPosition && (isNotInCurrentTeam || isTransferredOut);
      });
      
      // Apply search filter if term exists
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        filtered = filtered.filter(player => 
          `${player.first_name} ${player.last_name}`.toLowerCase().includes(term) || 
          player.team_name?.toLowerCase().includes(term)
        )
      }
      
      // Sort players
      filtered.sort((a, b) => {
        if (sortBy === 'price') {
          return sortOrder === 'asc' 
            ? a.fantasy_price - b.fantasy_price
            : b.fantasy_price - a.fantasy_price
        } else {
          const aPoints = a.fantasy_points || 0
          const bPoints = b.fantasy_points || 0
          return sortOrder === 'asc' ? aPoints - bPoints : bPoints - aPoints
        }
      })
      
      setFilteredPlayers(filtered)
    }
  }, [transferringPosition, searchTerm, availablePlayers, sortBy, sortOrder, myTeamPlayers, pendingTransfers])
  
  // Effect to handle clicking outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
        setSearchTerm('')
        setSelectedPlayerOut(null)
      }
    }
    
    // Effect to handle ESC key to close modal
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false)
        setSearchTerm('')
        setSelectedPlayerOut(null)
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
  
  // Effect to handle clicking outside warning modal
  useEffect(() => {
    const handleWarningClickOutside = (event: MouseEvent) => {
      if (warningModalRef.current && !warningModalRef.current.contains(event.target as Node)) {
        setIsWarningModalOpen(false)
      }
    }
    
    // Effect to handle ESC key to close warning modal
    const handleWarningEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsWarningModalOpen(false)
      }
    }
    
    if (isWarningModalOpen) {
      document.addEventListener('mousedown', handleWarningClickOutside)
      document.addEventListener('keydown', handleWarningEscKey)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleWarningClickOutside)
      document.removeEventListener('keydown', handleWarningEscKey)
    }
  }, [isWarningModalOpen])
  
  // Effect to handle clicking outside save confirmation modal
  useEffect(() => {
    const handleSaveConfirmClickOutside = (event: MouseEvent) => {
      if (saveConfirmModalRef.current && !saveConfirmModalRef.current.contains(event.target as Node)) {
        setIsSaveConfirmModalOpen(false)
      }
    }
    
    // Effect to handle ESC key to close save confirmation modal
    const handleSaveConfirmEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSaveConfirmModalOpen(false)
      }
    }
    
    if (isSaveConfirmModalOpen) {
      document.addEventListener('mousedown', handleSaveConfirmClickOutside)
      document.addEventListener('keydown', handleSaveConfirmEscKey)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleSaveConfirmClickOutside)
      document.removeEventListener('keydown', handleSaveConfirmEscKey)
    }
  }, [isSaveConfirmModalOpen])
  
  // Function to handle selecting a player to transfer out
  const selectPlayerToTransferOut = (player: Player) => {
    // Check if player is captain or vice-captain
    if (player.is_captain || player.is_vice_captain) {
      // Show warning modal instead of proceeding directly
      setPlayerForWarning(player)
      setIsWarningModalOpen(true)
    } else {
      // For regular players, proceed as usual
      setSelectedPlayerOut(player)
      setTransferringPosition(player.position)
      setIsModalOpen(true)
      setSearchTerm('')
    }
  }
  
  // Function to continue with captain/vice-captain transfer after warning
  const continueWithCaptainTransfer = () => {
    if (playerForWarning) {
      // Set the player as selected for transfer out
      setSelectedPlayerOut(playerForWarning)
      setTransferringPosition(playerForWarning.position)
      // Close the warning modal
      setIsWarningModalOpen(false)
      // Open the player selection modal
      setIsModalOpen(true)
      setSearchTerm('')
    }
  }
  
  // Function to handle selecting a player to transfer in
  const selectPlayerToTransferIn = (newPlayer: Player) => {
    if (!selectedPlayerOut || !nextGameweekId) return
    
    // Check if the incoming player is already in the current team (except if they were transferred out)
    const isPlayerAlreadyInTeam = myTeamPlayers.some(p => 
      p.player_id === newPlayer.player_id && 
      p.selection_id !== selectedPlayerOut.selection_id
    );
    
    if (isPlayerAlreadyInTeam) {
      const errorMsg = 'This player is already in your team';
      setError(errorMsg);
      toast.error(errorMsg, {
        duration: 3000,
        position: 'top-right',
      });
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    // Validate team limit (max 5 players from one team)
    const teamCountsCopy = {...teamCounts}
    
    // Decrement count for the outgoing player's team
    if (teamCountsCopy[selectedPlayerOut.team_id]) {
      teamCountsCopy[selectedPlayerOut.team_id]--
    }
    
    // Increment count for the incoming player's team
    if (teamCountsCopy[newPlayer.team_id]) {
      teamCountsCopy[newPlayer.team_id]++
    } else {
      teamCountsCopy[newPlayer.team_id] = 1
    }
    
    if (teamCountsCopy[newPlayer.team_id] > 5) {
      const errorMsg = 'Maximum 5 players allowed from one team';
      setError(errorMsg);
      toast.error(errorMsg, {
        duration: 3000,
        position: 'top-right',
      });
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    // Calculate new budget
    const priceDifference = newPlayer.fantasy_price - selectedPlayerOut.fantasy_price
    const newBudget = budgetRemaining - priceDifference
    
    // Validate budget
    if (newBudget < 0) {
      const errorMsg = 'Not enough budget remaining for this transfer';
      setError(errorMsg);
      toast.error(errorMsg, {
        duration: 3000,
        position: 'top-right',
      });
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    // Create a new pending transfer
    const newTransfer: PendingTransfer = {
      selectionId: selectedPlayerOut.selection_id,
      outgoingPlayerId: selectedPlayerOut.player_id,
      incomingPlayerId: newPlayer.player_id,
      outgoingPlayer: selectedPlayerOut,
      incomingPlayer: {
        ...newPlayer,
        selection_id: selectedPlayerOut.selection_id,
        is_captain: selectedPlayerOut.is_captain,
        is_vice_captain: selectedPlayerOut.is_vice_captain,
        is_starting: selectedPlayerOut.is_starting
      },
      priceDifference: priceDifference
    }
    
    // Check if this player is already in a pending transfer
    const existingTransferIndex = pendingTransfers.findIndex(
      t => t.outgoingPlayerId === selectedPlayerOut.player_id || 
           t.selectionId === selectedPlayerOut.selection_id
    )
    
    let updatedTransfers = [...pendingTransfers]
    
    if (existingTransferIndex >= 0) {
      // Replace the existing transfer
      updatedTransfers[existingTransferIndex] = newTransfer
    } else {
      // Add a new transfer
      updatedTransfers.push(newTransfer)
    }
    
    setPendingTransfers(updatedTransfers)
    setHasUnsavedChanges(true)
    
   
    
    // Update team players in the UI
    const updatedPlayers = myTeamPlayers.map(p => {
      if (p.selection_id === selectedPlayerOut.selection_id) {
        // Return the new player with the same selection details
        return {
          ...newPlayer,
          selection_id: selectedPlayerOut.selection_id,
          is_captain: selectedPlayerOut.is_captain,
          is_vice_captain: selectedPlayerOut.is_vice_captain,
          is_starting: selectedPlayerOut.is_starting
        }
      }
      return p
    })
    
    // Update current squad player IDs to track who's in the team
    const updatedSquadPlayerIds = updatedPlayers.map(p => p.player_id);
    setCurrentSquadPlayerIds(updatedSquadPlayerIds);
    
    // Update team counts and budget
    setMyTeamPlayers(updatedPlayers)
    setTeamCounts(teamCountsCopy)
    setBudgetRemaining(newBudget)
    
    // Close modal
    setIsModalOpen(false)
    setSearchTerm('')
    setSelectedPlayerOut(null)
  }
  
  // Function to revert a pending transfer
  const revertTransfer = (transferToRevert: PendingTransfer) => {
    // Remove this transfer from pending transfers
    const updatedTransfers = pendingTransfers.filter(
      t => t.selectionId !== transferToRevert.selectionId
    )
    
    setPendingTransfers(updatedTransfers)
    
    // Restore the original player in the team UI
    const updatedPlayers = myTeamPlayers.map(p => {
      if (p.selection_id === transferToRevert.selectionId) {
        return transferToRevert.outgoingPlayer
      }
      return p
    })
    
    // Update team counts for reverting
    const teamCountsCopy = {...teamCounts}
    if (teamCountsCopy[transferToRevert.incomingPlayer.team_id]) {
      teamCountsCopy[transferToRevert.incomingPlayer.team_id]--
    }
    if (teamCountsCopy[transferToRevert.outgoingPlayer.team_id]) {
      teamCountsCopy[transferToRevert.outgoingPlayer.team_id]++
    } else {
      teamCountsCopy[transferToRevert.outgoingPlayer.team_id] = 1
    }
    
    // Restore the budget
    const newBudget = budgetRemaining + transferToRevert.priceDifference
    
    // Update current squad player IDs
    const updatedSquadPlayerIds = updatedPlayers.map(p => p.player_id);
    setCurrentSquadPlayerIds(updatedSquadPlayerIds);
    
    setMyTeamPlayers(updatedPlayers)
    setTeamCounts(teamCountsCopy)
    setBudgetRemaining(newBudget)
    
    // Update the unsaved changes status
    setHasUnsavedChanges(updatedTransfers.length > 0)
    
    // Show revert toast
    toast(`${transferToRevert.incomingPlayer.first_name} ${transferToRevert.incomingPlayer.last_name} transfer reverted`, {
      duration: 3000,
      position: 'top-right',
      icon: '↩️',
    });
  }
  
  // Function to get players transferred out (comparing original team with current team)
  const getPlayersOut = () => {
    // Find players that were in original team but not in current team
    return originalTeamPlayers.filter(originalPlayer => 
      !myTeamPlayers.some(currentPlayer => 
        currentPlayer.player_id === originalPlayer.player_id && 
        currentPlayer.selection_id === originalPlayer.selection_id
      )
    );
  }
  
  // Function to get players transferred in (comparing current team with original team)
  const getPlayersIn = () => {
    // Find players that are in current team but were not in original team
    return myTeamPlayers.filter(currentPlayer => 
      !originalTeamPlayers.some(originalPlayer => 
        originalPlayer.player_id === currentPlayer.player_id && 
        originalPlayer.selection_id === currentPlayer.selection_id
      )
    );
  }
  
  // Function to show save confirmation modal
  const showSaveConfirmation = () => {
    setIsSaveConfirmModalOpen(true);
  }
  
  // Function to get final players in/out for the confirmation modal
  const getFinalTransfers = () => {
    // Create a map of the initial team players by selection_id
    const initialTeamMap = new Map<number | undefined, Player>();
    originalTeamPlayers.forEach(player => {
      if (player.selection_id !== undefined) {
        initialTeamMap.set(player.selection_id, player);
      }
    });
    
    // Create a map of the current team with pending transfers applied
    const finalTeamMap = new Map<number | undefined, Player>();
    myTeamPlayers.forEach(player => {
      if (player.selection_id !== undefined) {
        finalTeamMap.set(player.selection_id, player);
      }
    });
    
    // Compare initial and final team to find which players changed
    const playersOut: Player[] = [];
    const playersIn: Player[] = [];
    
    // Check each selection_id to see if the player has changed
    initialTeamMap.forEach((initialPlayer, selectionId) => {
      const finalPlayer = finalTeamMap.get(selectionId);
      if (finalPlayer && initialPlayer.player_id !== finalPlayer.player_id) {
        playersOut.push(initialPlayer);
        playersIn.push(finalPlayer);
      }
    });
    
    return { playersOut, playersIn };
  };

  // Function to save all pending transfers
  const saveTransfers = async () => {
    // Close modal
    setIsSaveConfirmModalOpen(false);
    
    try {
      setLoading(true);
      
      // Get the final transfer data
      const { playersOut, playersIn } = getFinalTransfers();
      
      // Create a complete team data (all 15 players) with transfers applied
      const finalTeam = myTeamPlayers.map(player => {
        return {
          player_id: player.player_id,
          selection_id: player.selection_id,
          is_captain: player.is_captain || false,
          is_vice_captain: player.is_vice_captain || false,
          is_starting: player.is_starting || false,
        };
      });
      
      // Prepare data for API call
      const transferData = {
        userId: user?.id,
        team: finalTeam,
        gameweekId: nextGameweekId,
        budget: budgetRemaining
      };
      
      console.log("Sending data to API:", transferData);
      
      // Make the API call to update the transfers
      const response = await fetch('/api/transfers/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transferData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save transfers');
      }
      
      const result = await response.json();
      console.log("Transfer update successful:", result);
      
      // Update the original team to the new team
      setOriginalTeamPlayers([...myTeamPlayers]);
      setOriginalBudget(budgetRemaining);
      
      // Clear pending transfers
      setPendingTransfers([]);
      setHasUnsavedChanges(false);
      
      // Show success toast message
      toast.success('Transfers saved successfully!', {
        duration: 4000,
        position: 'top-right',
      });
      
      // Clear any existing error messages
      setError(null);
    } catch (err: any) {
      console.error("Error saving transfers:", err);
      const errorMessage = err.message || 'Failed to save transfers';
      
      // Show error toast message
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right',
      });
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  
  // Function to cancel all pending transfers
  const cancelAllTransfers = () => {
    // Reset to original state
    setMyTeamPlayers(originalTeamPlayers)
    setBudgetRemaining(originalBudget)
    setPendingTransfers([])
    setHasUnsavedChanges(false)
    
    // Reset squad player IDs to original team
    setCurrentSquadPlayerIds(originalTeamPlayers.map(p => p.player_id))
    
    // Recalculate team counts
    const newTeamCounts: TeamCounts = {}
    originalTeamPlayers.forEach(player => {
      if (newTeamCounts[player.team_id]) {
        newTeamCounts[player.team_id]++
      } else {
        newTeamCounts[player.team_id] = 1
      }
    })
    setTeamCounts(newTeamCounts)
    
    // Show cancellation toast
    toast('All pending transfers cancelled', {
      duration: 3000,
      position: 'top-right',
      icon: '↩️',
    });
  }
  
  // Function to render player slot on the pitch
  const renderPlayerSlot = (position: 'GK' | 'DEF' | 'MID' | 'FWD', index: number) => {
    const positionPlayers = myTeamPlayers.filter(p => p.position === position);
    const player = positionPlayers[index];
    
    // Check if this player is part of a pending transfer (incoming player)
    const isPendingTransfer = player && pendingTransfers.some(
      t => t.incomingPlayerId === player.player_id
    )
    
    // Position-specific styling
    const positionStyle = {
      GK: 'bg-red-900/50 text-red-400',
      DEF: 'bg-blue-900/50 text-blue-400',
      MID: 'bg-green-900/50 text-green-400',
      FWD: 'bg-yellow-900/50 text-yellow-400'
    };
    
    return (
      <div 
        key={`${position}-${index}`}
        className={`
          rounded flex flex-col justify-center items-center relative transition-all
          w-16 h-24 sm:w-18 sm:h-26 md:w-20 md:h-28
          ${isPendingTransfer 
            ? 'bg-gray-900/90 border-2 border-primary-500 shadow-lg shadow-primary-500/20' 
            : 'bg-gray-900/90 border border-gray-700 shadow-lg'}
        `}
      >
        {player && (
          <>
            <button 
              className={`
                absolute -top-1 -left-1 p-0.5 rounded-full z-10 transition-colors
                ${isPendingTransfer 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'}
              `}
              onClick={() => selectPlayerToTransferOut(player)}
              disabled={loading}
            >
              {isPendingTransfer 
                ? <RefreshCw className="w-3 h-3" /> 
                : <ArrowRightLeft className="w-3 h-3" />
              }
            </button>
            <div className={`text-xs font-bold mb-0.5 rounded px-1 py-0.5 w-full text-center ${positionStyle[position]}`}>
              {player.position}
            </div>
            <div className="font-medium text-white text-xs text-center px-1 truncate w-full">
              {player.first_name}
            </div>
            <div className="text-gray-400 text-xs truncate w-full text-center">
              {player.team_short_name}
            </div>
            <div className="text-primary-300 text-xs font-bold mt-0.5">
              £{player.fantasy_price}m
            </div>
            {player.is_captain && (
              <div className="absolute -bottom-1 -right-1 bg-yellow-600 text-white p-0.5 rounded-full text-xs">
                C
              </div>
            )}
            {player.is_vice_captain && (
              <div className="absolute -bottom-1 -right-1 bg-yellow-700 text-white p-0.5 rounded-full text-xs">
                V
              </div>
            )}
          </>
        )}
      </div>
    )
  }
  
  // If not authenticated or still loading
  if (loading && authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading transfers data...</p>
        </div>
      </div>
    )
  }

  return (
    <NavLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Transfers</h1>
            <p className="text-gray-400 mt-2">Make changes to your team for upcoming gameweeks</p>
          </div>
          
          {/* Next Gameweek Display */}
          <div className="mt-4 sm:mt-0 bg-gray-900/50 border border-gray-800 rounded-lg p-2">
            <div className="flex items-center">
              <Calendar className="text-primary-400 w-5 h-5 mr-2" />
              <span className="text-white">
                Transfers for Gameweek {nextGameweekId}
              </span>
            </div>
          </div>
        </div>
        
        {/* Budget Info */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Budget</span>
            <span className="text-primary-400 font-medium">£{budgetRemaining.toFixed(1)}m</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 rounded-full transition-all" 
              style={{ width: `${(budgetRemaining / initialBudget) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Selection Messages */}
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}
        
        {/* Pending Transfers Summary */}
        {hasUnsavedChanges && (
          <div className="mb-6 bg-amber-900/30 border border-amber-800 text-amber-400 px-4 py-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>
                You have pending transfer request. Save your changes to confirm.
              </span>
            </div>
            <div className="flex gap-2 sm:flex-shrink-0">
              <button 
                onClick={cancelAllTransfers}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 text-sm rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={showSaveConfirmation}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 text-sm rounded-md flex items-center transition-colors"
              >
                <Save className="w-4 h-4 mr-1" /> Save Changes
              </button>
            </div>
          </div>
        )}
        
        {/* Fixtures for Next Gameweek */}
        <div className="mb-6 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-primary-400" /> 
            Fixtures for Gameweek {nextGameweekId}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {fixtures.length > 0 ? fixtures.map(fixture => (
              <div 
                key={fixture.fixture_id} 
                className="bg-gray-800/40 border border-gray-700 rounded-lg p-3"
              >
                <div className="flex justify-between items-center">
                  <div className="w-5/12 text-right">
                    <p className="text-white font-medium">{fixture.home_team_id.team_name}</p>
                  </div>
                  <div className="w-2/12 text-center">
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">vs</span>
                  </div>
                  <div className="w-5/12">
                    <p className="text-white font-medium">{fixture.away_team_id.team_name}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs text-center mt-2">
                  {new Date(fixture.match_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            )) : (
              <div className="col-span-3 text-center py-6 text-gray-400">
                No fixtures found for this gameweek
              </div>
            )}
          </div>
        </div>
        
        {/* Football Pitch Visualization */}
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary-400" /> 
            Your Team
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
        
        {/* Save Changes Button - Only show if there are changes */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-6 right-6 z-30">
            <button
              onClick={showSaveConfirmation}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors shadow-lg"
            >
              <Save className="w-5 h-5 mr-2" /> 
              Save Changes
            </button>
          </div>
        )}
        
        {/* Player Selection Modal */}
        {isModalOpen && selectedPlayerOut && (
          <>
            {/* Modal Backdrop */}
            <div className="fixed inset-0 bg-black/75 z-40" />
            
            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
              <div 
                ref={modalRef}
                className="bg-gray-900 rounded-xl shadow-lg w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl min-h-0 max-h-[95vh] sm:max-h-[90vh] flex flex-col my-2 sm:my-4"
              >
                {/* Modal Header */}
                <div className="p-3 sm:p-4 border-b border-gray-800 flex justify-between items-start">
                  <h3 className="text-sm sm:text-lg font-bold text-white leading-tight pr-2">
                    Transfer {selectedPlayerOut.first_name} {selectedPlayerOut.last_name} ({selectedPlayerOut.position})
                  </h3>
                  <button 
                    onClick={() => {
                      setIsModalOpen(false)
                      setSearchTerm('')
                      setSelectedPlayerOut(null)
                    }}
                    className="text-gray-400 hover:text-white flex-shrink-0 p-1"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                {/* Search and Sort */}
                <div className="p-3 sm:p-4 border-b border-gray-800 bg-gray-800/50">
                  <div className="flex flex-col gap-3">
                    <div className="relative">
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
                        className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        <option value="price">Sort by Price</option>
                        <option value="points">Sort by Points</option>
                      </select>
                      
                      <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-300 hover:bg-gray-700 flex-shrink-0"
                      >
                        <Filter className={`w-4 h-4 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Player List */}
                <div className="flex-grow overflow-y-auto min-h-0">
                  {filteredPlayers.length > 0 ? (
                    <div className="block sm:hidden">
                      {/* Mobile Card Layout */}
                      <div className="divide-y divide-gray-800">
                        {filteredPlayers.map(player => {
                          // Calculate price difference with selected player
                          const priceDifference = player.fantasy_price - selectedPlayerOut.fantasy_price
                          
                          // Check if player can be selected based on budget
                          const canSelect = budgetRemaining >= priceDifference
                          
                          // Check team limit
                          const teamCountsCopy = {...teamCounts}
                          if (teamCountsCopy[selectedPlayerOut.team_id]) {
                            teamCountsCopy[selectedPlayerOut.team_id]--
                          }
                          
                          if (teamCountsCopy[player.team_id]) {
                            teamCountsCopy[player.team_id]++
                          } else {
                            teamCountsCopy[player.team_id] = 1
                          }
                          
                          const withinTeamLimit = teamCountsCopy[player.team_id] <= 5
                          const canSelectFinal = canSelect && withinTeamLimit
                          
                          return (
                            <div 
                              key={player.player_id} 
                              className={`
                                p-3 ${!canSelectFinal ? 'opacity-50' : 'hover:bg-gray-800/50'}
                              `}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-white text-sm truncate">
                                    {player.first_name} {player.last_name}
                                  </div>
                                  <div className="text-gray-400 text-xs mt-1">
                                    {player.team_short_name} • {player.fantasy_points || 0} pts
                                  </div>
                                  <div className={`text-xs mt-1 ${priceDifference > 0 ? 'text-red-400' : priceDifference < 0 ? 'text-green-400' : 'text-gray-400'}`}>
                                    {priceDifference === 0 ? '£0.0m' : 
                                     priceDifference > 0 ? `+£${priceDifference.toFixed(1)}m` : 
                                     `-£${Math.abs(priceDifference).toFixed(1)}m`}
                                  </div>
                                </div>
                                <button
                                  onClick={() => canSelectFinal && selectPlayerToTransferIn(player)}
                                  disabled={!canSelectFinal}
                                  className={`
                                    p-2 rounded-full ml-3 flex-shrink-0
                                    ${canSelectFinal 
                                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'}
                                  `}
                                >
                                  <ArrowRightLeft className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}
                  
                  {filteredPlayers.length > 0 && (
                    <div className="hidden sm:block">
                      {/* Desktop Table Layout */}
                      <table className="w-full table-auto">
                        <thead className="bg-gray-800/70 sticky top-0">
                          <tr>
                            <th className="text-left text-xs text-gray-400 font-medium px-3 sm:px-4 py-3">Player</th>
                            <th className="text-left text-xs text-gray-400 font-medium px-2 py-3 hidden md:table-cell">Team</th>
                            <th className="text-right text-xs text-gray-400 font-medium px-2 py-3">Price</th>
                            <th className="text-xs text-gray-400 font-medium px-2 py-3 w-12 sm:w-16 hidden lg:table-cell">Points</th>
                            <th className="text-xs text-gray-400 font-medium px-2 py-3 w-12 sm:w-16"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {filteredPlayers.map(player => {
                            // Calculate price difference with selected player
                            const priceDifference = player.fantasy_price - selectedPlayerOut.fantasy_price
                            
                            // Check if player can be selected based on budget
                            const canSelect = budgetRemaining >= priceDifference
                            
                            // Check team limit
                            const teamCountsCopy = {...teamCounts}
                            if (teamCountsCopy[selectedPlayerOut.team_id]) {
                              teamCountsCopy[selectedPlayerOut.team_id]--
                            }
                            
                            if (teamCountsCopy[player.team_id]) {
                              teamCountsCopy[player.team_id]++
                            } else {
                              teamCountsCopy[player.team_id] = 1
                            }
                            
                            const withinTeamLimit = teamCountsCopy[player.team_id] <= 5
                            const canSelectFinal = canSelect && withinTeamLimit
                            
                            return (
                              <tr 
                                key={player.player_id} 
                                className={`
                                  ${!canSelectFinal ? 'opacity-50' : 'hover:bg-gray-800/50'}
                                  border-b border-gray-800/50
                                `}
                              >
                                <td className="px-3 sm:px-4 py-3 text-white text-sm">
                                  <div className="font-medium">{player.first_name} {player.last_name}</div>
                                  <div className="text-gray-400 text-xs md:hidden">{player.team_short_name}</div>
                                </td>
                                <td className="px-2 py-3 text-gray-400 text-sm hidden md:table-cell">
                                  {player.team_short_name}
                                </td>
                                <td className="px-2 py-3 text-right font-medium text-sm">
                                  <div className={`${priceDifference > 0 ? 'text-red-400' : priceDifference < 0 ? 'text-green-400' : 'text-gray-400'}`}>
                                    {priceDifference === 0 ? '£0.0m' : 
                                     priceDifference > 0 ? `+£${priceDifference.toFixed(1)}m` : 
                                     `-£${Math.abs(priceDifference).toFixed(1)}m`}
                                  </div>
                                  <div className="text-gray-400 text-xs lg:hidden">{player.fantasy_points || 0} pts</div>
                                </td>
                                <td className="px-2 py-3 text-center text-gray-300 text-sm hidden lg:table-cell">
                                  {player.fantasy_points || 0}
                                </td>
                                <td className="px-2 py-3 text-right">
                                  <button
                                    onClick={() => canSelectFinal && selectPlayerToTransferIn(player)}
                                    disabled={!canSelectFinal}
                                    className={`
                                      p-1.5 rounded-full 
                                      ${canSelectFinal 
                                        ? 'bg-primary-600 text-white hover:bg-primary-700' 
                                        : 'bg-gray-800 text-gray-600 cursor-not-allowed'}
                                    `}
                                  >
                                    <ArrowRightLeft className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {filteredPlayers.length === 0 && (
                    <div className="flex items-center justify-center h-32 sm:h-48">
                      <p className="text-gray-400 text-sm">No players found matching your criteria</p>
                    </div>
                  )}
                </div>
                
                {/* Modal Footer */}
                <div className="p-3 border-t border-gray-800 bg-gray-800/50 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between sm:items-center text-xs text-gray-400">
                  <div className="text-center sm:text-left">
                    {filteredPlayers.length} players available
                  </div>
                  <div className="text-center sm:text-right">
                    Budget: <span className="text-primary-300">£{budgetRemaining.toFixed(1)}m</span> remaining
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Captain/Vice-Captain Transfer Warning Modal */}
      {isWarningModalOpen && playerForWarning && (
        <>
          {/* Warning Modal Backdrop */}
          <div className="fixed inset-0 bg-black/75 z-50" />
          
          {/* Warning Modal Content */}
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div 
              ref={warningModalRef}
              className="bg-gray-900 border border-amber-500 rounded-xl shadow-lg w-full max-w-xs sm:max-w-md min-h-0 max-h-[95vh] flex flex-col my-4 sm:my-0"
            >
              {/* Warning Modal Header */}
              <div className="p-3 sm:p-4 border-b border-gray-800 flex justify-between items-start bg-amber-900/30">
                <h3 className="text-sm sm:text-lg font-bold text-amber-400 flex items-start pr-2">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="leading-tight">Captain Transfer Warning</span>
                </h3>
                <button 
                  onClick={() => setIsWarningModalOpen(false)}
                  className="text-gray-400 hover:text-white flex-shrink-0 p-1"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              {/* Warning Modal Body */}
              <div className="p-4 sm:p-6 overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 flex items-center justify-center sm:mr-4 mb-3 sm:mb-0 w-fit mx-auto sm:mx-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      {playerForWarning.is_captain ? 'C' : 'V'}
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-white text-sm sm:text-base">{playerForWarning.first_name} {playerForWarning.last_name}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">{playerForWarning.team_short_name} | {playerForWarning.position}</p>
                  </div>
                </div>
                
                <p className="text-white mb-4 text-sm sm:text-base leading-relaxed">
                  This player is your {playerForWarning.is_captain ? 'Captain' : 'Vice-Captain'}. If you transfer them out, you will need to select a new {playerForWarning.is_captain ? 'Captain' : 'Vice-Captain'} after saving your changes.
                </p>
                
                <p className="text-amber-400 text-xs sm:text-sm mb-6">
                  Are you sure you want to continue with this transfer?
                </p>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => setIsWarningModalOpen(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={continueWithCaptainTransfer}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center justify-center text-sm order-1 sm:order-2"
                  >
                    <ArrowRightLeft className="w-4 h-4 mr-1" /> 
                    <span className="hidden sm:inline">Continue with Transfer</span>
                    <span className="sm:hidden">Continue</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Save Confirmation Modal */}
      {isSaveConfirmModalOpen && (
        <>
          {/* Save Confirmation Modal Backdrop */}
          <div className="fixed inset-0 bg-black/75 z-50" />
          
          {/* Save Confirmation Modal Content */}
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div 
              ref={saveConfirmModalRef}
              className="bg-gray-900 border border-primary-500 rounded-xl shadow-lg w-full max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl min-h-0 max-h-[95vh] sm:max-h-[90vh] flex flex-col my-2 sm:my-4"
            >
              {/* Save Confirmation Modal Header */}
              <div className="p-3 sm:p-4 border-b border-gray-800 flex justify-between items-start bg-primary-900/30">
                <h3 className="text-sm sm:text-lg font-bold text-primary-400 flex items-start pr-2">
                  <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span className="leading-tight">Confirm Transfers</span>
                </h3>
                <button 
                  onClick={() => setIsSaveConfirmModalOpen(false)}
                  className="text-gray-400 hover:text-white flex-shrink-0 p-1"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              {/* Save Confirmation Modal Body */}
              <div className="p-3 sm:p-6 overflow-y-auto min-h-0">
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-bold text-white mb-2 text-sm sm:text-base">Transfer Summary</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">You have pending transfer request.</p>
                </div>
                
                {/* Players Out Section */}
                <div className="mb-4">
                  <h5 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    Players Out
                  </h5>
                  <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 mb-4">
                    <div className="grid grid-cols-1 gap-2">
                      {getFinalTransfers().playersOut.map((player) => (
                        <div key={`out-${player.player_id}`} className="flex items-center">
                          <div className="bg-gray-800 rounded-md p-1 sm:p-1.5 mr-2 flex-shrink-0">
                            <div className={`text-xs font-bold rounded px-1 sm:px-1.5 py-0.5 
                              ${player.position === 'GK' ? 'bg-red-900/50 text-red-400' :
                                player.position === 'DEF' ? 'bg-blue-900/50 text-blue-400' :
                                player.position === 'MID' ? 'bg-green-900/50 text-green-400' :
                                'bg-yellow-900/50 text-yellow-400'}`}>
                              {player.position}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-white text-xs sm:text-sm truncate">
                              {player.first_name} {player.last_name}
                            </div>
                            <div className="text-gray-400 text-xs flex items-center flex-wrap">
                              <span className="truncate">{player.team_short_name} | £{player.fantasy_price}m</span>
                              {player.is_captain && <span className="ml-1 text-yellow-500 font-bold whitespace-nowrap">• C</span>}
                              {player.is_vice_captain && <span className="ml-1 text-yellow-600 font-bold whitespace-nowrap">• VC</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Players In Section */}
                <div className="mb-4 sm:mb-6">
                  <h5 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    Players In
                  </h5>
                  <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3">
                    <div className="grid grid-cols-1 gap-2">
                      {getFinalTransfers().playersIn.map((player) => (
                        <div key={`in-${player.player_id}`} className="flex items-center">
                          <div className="bg-gray-800 rounded-md p-1 sm:p-1.5 mr-2 flex-shrink-0">
                            <div className={`text-xs font-bold rounded px-1 sm:px-1.5 py-0.5 
                              ${player.position === 'GK' ? 'bg-red-900/50 text-red-400' :
                                player.position === 'DEF' ? 'bg-blue-900/50 text-blue-400' :
                                player.position === 'MID' ? 'bg-green-900/50 text-green-400' :
                                'bg-yellow-900/50 text-yellow-400'}`}>
                              {player.position}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-white text-xs sm:text-sm truncate">
                              {player.first_name} {player.last_name}
                            </div>
                            <div className="text-gray-400 text-xs flex items-center flex-wrap">
                              <span className="truncate">{player.team_short_name} | £{player.fantasy_price}m</span>
                              {player.is_captain && <span className="ml-1 text-yellow-500 font-bold whitespace-nowrap">• C</span>}
                              {player.is_vice_captain && <span className="ml-1 text-yellow-600 font-bold whitespace-nowrap">• VC</span>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Budget Summary */}
                <div className="bg-gray-800/30 rounded-lg p-2 sm:p-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">Original Budget:</span>
                    <span className="text-white">£{originalBudget.toFixed(1)}m</span>
                  </div>
                  <div className="flex justify-between mt-1 text-xs sm:text-sm">
                    <span className="text-gray-400">New Budget:</span>
                    <span className="text-primary-400 font-medium">£{budgetRemaining.toFixed(1)}m</span>
                  </div>
                  <div className="flex justify-between mt-1 text-xs sm:text-sm">
                    <span className="text-gray-400">Budget Difference:</span>
                    <span className={`font-medium ${(budgetRemaining - originalBudget) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {(budgetRemaining - originalBudget) >= 0 
                        ? `+£${(budgetRemaining - originalBudget).toFixed(1)}m` 
                        : `-£${Math.abs(budgetRemaining - originalBudget).toFixed(1)}m`}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => setIsSaveConfirmModalOpen(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveTransfers}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 sm:px-6 py-2 rounded flex items-center justify-center text-sm order-1 sm:order-2"
                  >
                    <Save className="w-4 h-4 mr-1 sm:mr-2" /> 
                    <span className="hidden sm:inline">Confirm Transfers</span>
                    <span className="sm:hidden">Confirm</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </NavLayout>
  )
}