'use client'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import NavLayout from '@/components/layout/NavLayout'
import { 
  Trophy, 
  Users, 
  Award,
  ArrowLeft, 
  ChevronRight, 
  RefreshCw, 
  Star, 
  Check, 
  Clock
} from 'lucide-react'

// Define types
interface Player {
  selection_id: number
  player_id: number
  first_name: string
  last_name: string
  position: 'GK' | 'DEF' | 'MID' | 'FWD'
  team_short_name: string
  team_name: string
  team_logo?: string
  fantasy_price: number
  fantasy_points: number
  is_captain: boolean
  is_vice_captain: boolean
  is_starting: boolean
}

interface FantasyTeam {
  fantasy_team_id: number
  team_name: string
  budget: number
  total_points: number
  gameweek_points: number
  created_at: string
  last_updated: string
}

type TabType = 'team';

export default function MyTeamPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [team, setTeam] = useState<FantasyTeam | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [currentGameweek, setCurrentGameweek] = useState<{gameweek_id: number, name: string} | null>(null)
  const [nextGameWeekID, setNextGameWeekID] = useState<number | null>(null)
  // New state variables for tabs and features
  const [activeTab, setActiveTab] = useState<TabType>('team')
  
  // State for managing team changes
  const [selectedCaptain, setSelectedCaptain] = useState<number | null>(null)
  const [selectedViceCaptain, setSelectedViceCaptain] = useState<number | null>(null)
  const [benchPlayers, setBenchPlayers] = useState<number[]>([])
  const [teamChanged, setTeamChanged] = useState(false)
  
  // New state for tracking substitutions
  const [substitutionMode, setSubstitutionMode] = useState<{playerId: number, position: string} | null>(null)
  
  // Toast notification state
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  } | null>(null);
  
  // State for player details modal
  const [selectedPlayerStats, setSelectedPlayerStats] = useState<any>(null);
  
  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(null);
    }, type === 'success' ? 3000 : 4000); // Success messages disappear faster than error messages
  };
  
  // Effect to load team data
  useEffect(() => {
    // Wait for the auth state to be determined before redirecting
    if (authLoading) return;
    
    // Only redirect if user is definitely not authenticated
    if (!user && !authLoading) {
      router.push('/auth/signin');
      return;
    }
    
    const fetchTeamData = async () => {
      try {
        setLoading(true)
        
        // Fetch team data with userId
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/my-team?userId=${user?.id}&t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            // User doesn't have a team yet
            router.push('/create-team');
            return;
          }
          throw new Error('Failed to fetch team data');
        }
        
        const data = await response.json();
        
        if (!data.team || !data.players || !Array.isArray(data.players)) {
          throw new Error('Invalid team data format');
        }
        
        setTeam(data.team);
        setPlayers(data.players);
        setCurrentGameweek(data.currentGameweek);

        //console.log("Next Game Week id " , data.nextGameweekId)
        setNextGameWeekID(data.nextGameweekId)
        
        // Initialize captain, vice captain and bench players
        const captain = data.players.find((p :any)=> p.is_captain);
        const viceCaptain = data.players.find((p :any)=> p.is_vice_captain);
        const bench = data.players.filter((p:any) => !p.is_starting).map((p:any) => p.player_id);
        
        if (captain) setSelectedCaptain(captain.player_id);
        if (viceCaptain) setSelectedViceCaptain(viceCaptain.player_id);
        setBenchPlayers(bench);
      } catch (err) {
        console.error('Error loading team data:', err);
        setError('Failed to load your team data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchTeamData();
    }
  }, [user, authLoading, router]);

  // Function to refresh team data
  const refreshTeamData = async () => {
    try {
      setRefreshing(true);
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/my-team?userId=${user?.id}&t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh team data');
      }
      
      const data = await response.json();
      setTeam(data.team);
      setPlayers(data.players);
      setCurrentGameweek(data.currentGameweek);
      
      // Reset captain, vice captain and bench players
      const captain = data.players.find((p: Player) => p.is_captain);
      const viceCaptain = data.players.find((p: Player) => p.is_vice_captain);
      const bench = data.players.filter((p: Player) => !p.is_starting).map((p: Player) => p.player_id);
      
      if (captain) setSelectedCaptain(captain.player_id);
      if (viceCaptain) setSelectedViceCaptain(viceCaptain.player_id);
      setBenchPlayers(bench);
      
      setTeamChanged(false);
    } catch (err) {
      console.error('Error refreshing team data:', err);
      setError('Failed to refresh team data. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setRefreshing(false);
    }
  };
  
  // Function to handle captain selection
  const handleCaptainSelection = (playerId: number) => {
    // Check if player is on bench
    if (benchPlayers.includes(playerId)) {
      showToast('Bench players cannot be captains. Please substitute this player into your starting XI first.', 'error');
      return;
    }
    
    // If selecting same player as vice captain, swap them
    if (playerId === selectedViceCaptain) {
      setSelectedViceCaptain(selectedCaptain);
    }
    
    setSelectedCaptain(playerId);
    setTeamChanged(true);
  };
  
  // Function to handle vice captain selection
  const handleViceCaptainSelection = (playerId: number) => {
    // Check if player is on bench
    if (benchPlayers.includes(playerId)) {
      showToast('Bench players cannot be vice-captains. Please substitute this player into your starting XI first.', 'error');
      return;
    }
    
    // If selecting same player as captain, swap them
    if (playerId === selectedCaptain) {
      setSelectedCaptain(selectedViceCaptain);
    }
    
    setSelectedViceCaptain(playerId);
    setTeamChanged(true);
  };
  
  // Function to start substitution process from Starting XI
  const handleStartSubOut = (playerId: number, position: string) => {
    const player = players.find(p => p.player_id === playerId);
    if (!player) return;
    
    // Can't sub out captain or vice captain
    if (playerId === selectedCaptain) {
      setError('Cannot substitute the captain. Please select another captain first.');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    if (playerId === selectedViceCaptain) {
      setError('Cannot substitute the vice captain. Please select another vice captain first.');
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    // Set substitution mode
    setSubstitutionMode({ playerId, position });
  };
  
  // Function to start substitution process from bench
  const handleStartSubIn = (playerId: number, position: string) => {
    const player = players.find(p => p.player_id === playerId);
    if (!player) return;
    
    // Set substitution mode
    setSubstitutionMode({ playerId, position });
  };
  
  // Function to complete substitution
  const handleCompleteSubstitution = (targetPlayerId: number) => {
    if (!substitutionMode) return;
    
    const sourcePlayer = players.find(p => p.player_id === substitutionMode.playerId);
    const targetPlayer = players.find(p => p.player_id === targetPlayerId);
    
    if (!sourcePlayer || !targetPlayer) {
      setSubstitutionMode(null);
      return;
    }
    
    // Get the starting status of both players
    const sourceIsStarting = !benchPlayers.includes(sourcePlayer.player_id);
    const targetIsStarting = !benchPlayers.includes(targetPlayer.player_id);
    
    // If both are starting or both are on bench, this isn't a valid substitution
    if (sourceIsStarting === targetIsStarting) {
      setSubstitutionMode(null);
      return;
    }

    // GK position validation - GKs can only be substituted with other GKs
    if ((sourcePlayer.position === 'GK' || targetPlayer.position === 'GK') && 
        sourcePlayer.position !== targetPlayer.position) {
      setError('Goalkeepers can only be substituted with other goalkeepers.');
      setTimeout(() => setError(null), 3000);
      setSubstitutionMode(null);
      return;
    }
    
    // Create a copy of the bench list for validation
    let newBench = [...benchPlayers];
    
    // If source is starting, remove target from bench and add source to bench
    if (sourceIsStarting) {
      newBench = newBench.filter(id => id !== targetPlayer.player_id);
      newBench.push(sourcePlayer.player_id);
    } 
    // If source is on bench, remove source from bench and add target to bench
    else {
      newBench = newBench.filter(id => id !== sourcePlayer.player_id);
      newBench.push(targetPlayer.player_id);
    }
    
    // Validate the new formation
    const startingPlayers = players.filter(p => !newBench.includes(p.player_id));
    const startingGKs = startingPlayers.filter(p => p.position === 'GK').length;
    const startingDEFs = startingPlayers.filter(p => p.position === 'DEF').length;
    const startingMIDs = startingPlayers.filter(p => p.position === 'MID').length;
    const startingFWDs = startingPlayers.filter(p => p.position === 'FWD').length;
    
    // Validate formation requirements
    let errorMessage = null;
    
    // Must have exactly 1 GK starting
    if (startingGKs !== 1) {
      showToast('Your squad must include at least 1 GoalKeeper', 'error');
      return;
    }
    // Must have at least 3 DEF
    else if (startingDEFs < 3) {
      showToast('Your squad must include at least 3 Defenders.', 'error');
      return;
    }
    // Must have at least 3 MID
    else if (startingMIDs < 3) {
      showToast('Your squad must include at least 3 Midfielders.', 'error');
      return;
    }
    // Must have at least 1 FWD
    else if (startingFWDs < 1) {
      showToast('Your squad must include at least 1 Forward.', 'error');
      return;
    }
    
    // If errorMessage is still null, all validations passed
    // All validations passed, apply the substitution
    setBenchPlayers(newBench);
    setTeamChanged(true);
    setSubstitutionMode(null);
  };
  
  // Function to cancel substitution
  const handleCancelSubstitution = () => {
    setSubstitutionMode(null);
  };
  
  // Legacy substitution handler (to be replaced)
  const handleSubstitution = (playerId: number) => {
    // This is kept for backward compatibility
    // Skip if in substitution mode - new handlers will take care of it
    if (substitutionMode) {
      handleCompleteSubstitution(playerId);
      return;
    }
    
    // Original code follows
    // Toggle player in/out of bench
    if (benchPlayers.includes(playerId)) {
      // Check if removing from bench will violate formation constraints
      const player = players.find(p => p.player_id === playerId);
      if (!player) return;
      
      const updatedBench = benchPlayers.filter(id => id !== playerId);
      
      // Count starting players by position after this substitution
      const startingPlayers = players.filter(p => !updatedBench.includes(p.player_id));
      const startingDEFs = startingPlayers.filter(p => p.position === 'DEF').length;
      const startingMIDs = startingPlayers.filter(p => p.position === 'MID').length;
      const startingFWDs = startingPlayers.filter(p => p.position === 'FWD').length;
      
      // Check if formation requirements are met (at least 3 DEF, 3 MID, 1 FWD)
      if (startingDEFs < 3 || startingMIDs < 3 || startingFWDs < 1) {
        setError('Invalid formation. Team must have at least 3 DEF, 3 MID, and 1 FWD.');
        setTimeout(() => setError(null), 3000);
        return;
      }
      
      // Requirements met, update bench
      setBenchPlayers(updatedBench);
    } else {
      // Add to bench - check if we're not benching captain or vice captain
      if (playerId === selectedCaptain) {
        setError('Cannot bench the captain. Please select another captain first.');
        setTimeout(() => setError(null), 3000);
        return;
      }
      
      if (playerId === selectedViceCaptain) {
        setError('Cannot bench the vice captain. Please select another vice captain first.');
        setTimeout(() => setError(null), 3000);
        return;
      }
      
      // Check if adding to bench will violate formation constraints
      const player = players.find(p => p.player_id === playerId);
      if (!player) return;
      
      const updatedBench = [...benchPlayers, playerId];
      
      // Count starting players by position after this substitution
      const startingPlayers = players.filter(p => !updatedBench.includes(p.player_id));
      const startingDEFs = startingPlayers.filter(p => p.position === 'DEF').length;
      const startingMIDs = startingPlayers.filter(p => p.position === 'MID').length;
      const startingFWDs = startingPlayers.filter(p => p.position === 'FWD').length;
      
      // Check if formation requirements are met (at least 3 DEF, 3 MID, 1 FWD)
      if (startingDEFs < 3 || startingMIDs < 3 || startingFWDs < 1) {
        setError('Invalid formation. Team must have at least 3 DEF, 3 MID, and 1 FWD.');
        setTimeout(() => setError(null), 3000);
        return;
      }
      
      // Requirements met, update bench
      setBenchPlayers(updatedBench);
    }
    
    setTeamChanged(true);
  };
  
  // Function to prepare data for team update
  const prepareTeamUpdateData = () => {
    // Validate selections
    if (!selectedCaptain || !selectedViceCaptain) {
      setError('Please select both a captain and vice captain.');
      setTimeout(() => setError(null), 3000);
      return null;
    }
    
    if (selectedCaptain === selectedViceCaptain) {
      setError('Captain and vice captain cannot be the same player.');
      setTimeout(() => setError(null), 3000);
      return null;
    }
    
    // Count starting players by position
    const startingPlayers = players.filter(p => !benchPlayers.includes(p.player_id));
    const startingDEFs = startingPlayers.filter(p => p.position === 'DEF').length;
    const startingMIDs = startingPlayers.filter(p => p.position === 'MID').length;
    const startingFWDs = startingPlayers.filter(p => p.position === 'FWD').length;
    
    // Validate formation
    if (startingDEFs < 3 || startingMIDs < 3 || startingFWDs < 1) {
      setError('Invalid formation. Team must have at least 3 DEF, 3 MID, and 1 FWD.');
      setTimeout(() => setError(null), 3000);
      return null;
    }
    
    // Prepare the formation string
    const formation = `${startingDEFs}-${startingMIDs}-${startingFWDs}`;
    console.log("Bench players are ", benchPlayers);
    
    // Create the update object
    return {
      fantasy_team_id: team?.fantasy_team_id,
      captain_id: selectedCaptain,
      vice_captain_id: selectedViceCaptain,
      substitutes: benchPlayers,
      formation: formation,
      gameWeekID: nextGameWeekID
    };
  };
  
  // Function to handle team update submission
  const handleTeamUpdate = async () => {
    const updateData = prepareTeamUpdateData();
    if (!updateData) return;
    
    // Show loading state
    setRefreshing(true);
    
    try {
      
      console.log('Team update data being sent:', updateData);
      
      const response = await fetch('/api/my-team/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update team');
      }
      
      // Show success message
      showToast('Team updated successfully!', 'success');
      setTeamChanged(false);
      
      // Refresh team data to reflect changes
      await refreshTeamData();
      
    } catch (error: any) {
      console.error('Error updating team:', error);
      showToast(error.message || 'Failed to update team. Please try again.', 'error');
    } finally {
      setRefreshing(false);
    }
  };
  
  // Get starting and substitutes players based on bench state
  const getStartingPlayers = () => players.filter(player => !benchPlayers.includes(player.player_id));
  const getSubstitutePlayers = () => players.filter(player => benchPlayers.includes(player.player_id));
  
  // Get players by position for formation display
  const getPositionPlayers = (position: 'GK' | 'DEF' | 'MID' | 'FWD', onlyStarting = true) => {
    return players
      .filter(p => p.position === position && (onlyStarting ? !benchPlayers.includes(p.player_id) : benchPlayers.includes(p.player_id)))
      .sort((a, b) => {
        // Captain first, then vice captain, then rest
        if (a.player_id === selectedCaptain) return -1;
        if (b.player_id === selectedCaptain) return 1;
        if (a.player_id === selectedViceCaptain) return -1;
        if (b.player_id === selectedViceCaptain) return 1;
        return 0;
      });
  };
  
  // Render player card on pitch
  const renderPlayerCard = (player: Player, allowInteraction = false) => {
    // Position-specific styling
    const positionStyle = {
      GK: 'bg-red-900/50 text-red-400',
      DEF: 'bg-blue-900/50 text-blue-400',
      MID: 'bg-green-900/50 text-green-400',
      FWD: 'bg-yellow-900/50 text-yellow-400'
    };
    
    const isCaptain = player.player_id === selectedCaptain;
    const isViceCaptain = player.player_id === selectedViceCaptain;
    const isOnBench = benchPlayers.includes(player.player_id);
    
    // Check if this card is eligible to complete a substitution
    const canCompleteSubstitution = substitutionMode && 
      ((substitutionMode.position === 'GK' && player.position === 'GK') || // GKs can only replace GKs
       (substitutionMode.position !== 'GK' && player.position !== 'GK')); // Non-GKs can replace other non-GKs
    
    // Check if we're in substitution mode and this is the selected player
    const isSelectedForSubstitution = substitutionMode?.playerId === player.player_id;
    
    // In substitution mode, only allow interaction with valid substitution targets
    const isInteractive = allowInteraction && 
      (!substitutionMode || // Not in substitution mode
       isSelectedForSubstitution || // Is the selected player
       (substitutionMode && canCompleteSubstitution && !isOnBench)); // Is a valid substitution target
    
    return (
      <div 
        key={player.player_id}
        className={`
          rounded flex flex-col justify-center items-center relative transition-all
          w-16 h-24 sm:w-18 sm:h-26 md:w-20 md:h-28
          ${isInteractive ? 'cursor-pointer hover:ring-2 hover:ring-primary-400' : 'cursor-default'}
          ${isOnBench ? 'opacity-75' : ''}
          ${isSelectedForSubstitution ? 'ring-2 ring-yellow-500' : ''}
          ${substitutionMode && canCompleteSubstitution && !isOnBench ? 'ring-1 ring-blue-500 hover:ring-2' : ''}
          bg-gray-900/90 border border-gray-700 shadow-lg
        `}
        onClick={() => {
          if (!isInteractive) return;
          
          if (substitutionMode) {
            if (isSelectedForSubstitution) {
              // Cancel substitution if clicking on the same player
              handleCancelSubstitution();
            } else if (canCompleteSubstitution && !isOnBench) {
              // Complete substitution with this player
              handleCompleteSubstitution(player.player_id);
            }
          } else if (!isOnBench) {
            // Open the player action menu (old behavior was to toggle bench status)
            // handleSubstitution(player.player_id);
          }
        }}
      >
        {/* Captain/Vice Captain Badge */}
        {isCaptain && (
          <div className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs font-bold w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center rounded-full shadow">
            C
          </div>
        )}
        {isViceCaptain && (
          <div className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold w-5 h-5 sm:w-4 sm:h4 flex items-center justify-center rounded-full shadow">
            VC
          </div>
        )}
        
        {/* Player Content */}
        <div className={`text-[10px] font-bold mb-0.5 rounded px-1 py-0.5 w-full text-center ${positionStyle[player.position]}`}>
          {player.position}
        </div>
        <div className="font-medium text-white text-[10px] text-center px-1 truncate w-full">
          {player.first_name}
        </div>
        <div className="text-gray-400 text-[10px] truncate w-full text-center">
          {player.team_short_name}
        </div>
        <div className="text-primary-300 text-[10px] font-bold mt-0.5">
          £{player.fantasy_price}m
        </div>
        <div className="text-gray-300 text-xs mt-0.5 flex items-center">
          <Star className="w-3 h-3 mr-0.5 text-yellow-500" />
          {player.fantasy_points || 0}
        </div>
        
        {/* Substitution mode indicator */}
        {isSelectedForSubstitution && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
            <div className="bg-yellow-500 text-black font-bold px-2 py-1 rounded text-xs">
              Subbing Out
            </div>
          </div>
        )}
        
        {/* Player actions menu */}
        {allowInteraction && activeTab === 'team' && !isOnBench && (
          <div className={`absolute bottom-0 left-0 right-0 ${substitutionMode ? 'hidden' : 'flex'} justify-center space-x-1 py-1 bg-gray-900/80`}>
            {/* Only show captain button if not already captain */}
            {!isCaptain && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCaptainSelection(player.player_id);
                }}
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-gray-700 text-gray-300 hover:bg-yellow-600 hover:text-white"
                title="Make Captain"
              >
                C
              </button>
            )}
            
            {/* Only show vice captain button if not captain and not already vice captain */}
            {!isCaptain && !isViceCaptain && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleViceCaptainSelection(player.player_id);
                }}
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-gray-700 text-gray-300 hover:bg-orange-600 hover:text-white"
                title="Make Vice Captain"
              >
                VC
              </button>
            )}
            
            {/* Sub out button - only if not captain and not vice captain */}
            {!isCaptain && !isViceCaptain && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartSubOut(player.player_id, player.position);
                }}
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-gray-700 text-white hover:bg-blue-600"
                title="Substitute Out"
              >
                S
              </button>
            )}
          </div>
        )}
      </div>
    );
  };
  
  // Render a substitute player card
  const renderSubstituteCard = (player: Player, allowInteraction = false) => {
    // Position-specific styling
    const positionStyle = {
      GK: 'bg-red-900/50 text-red-400',
      DEF: 'bg-blue-900/50 text-blue-400',
      MID: 'bg-green-900/50 text-green-400',
      FWD: 'bg-yellow-900/50 text-yellow-400'
    };
    
    const isCaptain = player.player_id === selectedCaptain;
    const isViceCaptain = player.player_id === selectedViceCaptain;
    const isOnBench = benchPlayers.includes(player.player_id);
    
    // Check if this card is eligible to complete a substitution
    const canCompleteSubstitution = substitutionMode && 
      ((substitutionMode.position === 'GK' && player.position === 'GK') || // GKs can only replace GKs
       (substitutionMode.position !== 'GK' && player.position !== 'GK')); // Non-GKs can replace other non-GKs
       
    // Check if we're in substitution mode and this is the selected player
    const isSelectedForSubstitution = substitutionMode?.playerId === player.player_id;
    
    // In substitution mode, only allow interaction with valid substitution targets
    const isInteractive = allowInteraction && 
      (!substitutionMode || // Not in substitution mode
       isSelectedForSubstitution || // Is the selected player
       (substitutionMode && canCompleteSubstitution && isOnBench)); // Is a valid substitution target
    
    return (
      <div 
        key={player.player_id}
        className={`
          flex items-center bg-gray-900/80 border border-gray-800 rounded p-2 gap-2
          ${isInteractive ? 'cursor-pointer hover:bg-gray-800' : 'cursor-default'}
          ${isSelectedForSubstitution ? 'ring-2 ring-yellow-500' : ''}
          ${substitutionMode && canCompleteSubstitution && isOnBench ? 'ring-1 ring-blue-500 hover:ring-2' : ''}
        `}
        onClick={() => {
          if (!isInteractive) return;
          
          if (substitutionMode) {
            if (isSelectedForSubstitution) {
              // Cancel substitution if clicking on the same player
              handleCancelSubstitution();
            } else if (canCompleteSubstitution && isOnBench) {
              // Complete substitution with this player
              handleCompleteSubstitution(player.player_id);
            }
          } else if (isOnBench) {
            // Start substitution process
            handleStartSubIn(player.player_id, player.position);
          }
        }}
      >
        {/* Position Badge */}
        <div className={`rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ${positionStyle[player.position]}`}>
          {player.position}
        </div>
        
        {/* Player Info */}
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="text-white text-sm font-medium">{player.first_name}</span>
            {isCaptain && (
              <span className="ml-1.5 bg-yellow-600 text-white text-xs font-bold px-1 rounded-sm">C</span>
            )}
            {isViceCaptain && (
              <span className="ml-1.5 bg-orange-600 text-white text-xs font-bold px-1 rounded-sm">VC</span>
            )}
          </div>
          <div className="text-gray-400 text-xs">{player.team_short_name}</div>
        </div>
        
        {/* Price & Points */}
        <div className="flex flex-col items-end">
          <div className="text-primary-300 text-xs font-bold">£{player.fantasy_price}m</div>
          <div className="text-gray-300 text-xs flex items-center">
            <Star className="w-3 h-3 mr-0.5 text-yellow-500" />
            {player.fantasy_points || 0}
          </div>
        </div>
        
        {/* Conditional rendering based on activeTab */}
        {allowInteraction && (
          <div className={`flex space-x-1 ${substitutionMode ? 'hidden' : 'flex'}`}>
            {/* Captain button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCaptainSelection(player.player_id);
              }}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] sm:text-xs
                ${isCaptain ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-yellow-600 hover:text-white'}
              `}
              title="Make Captain"
            >
              C
            </button>
            
            {/* Vice captain button - only if not captain */}
            {!isCaptain && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleViceCaptainSelection(player.player_id);
                }}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] sm:text-xs
                  ${isViceCaptain ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-orange-600 hover:text-white'}
                `}
                title="Make Vice Captain"
              >
                VC
              </button>
            )}
            
            {/* Sub in button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleStartSubIn(player.player_id, player.position);
              }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] sm:text-xs bg-gray-700 text-white hover:bg-blue-600"
              title="Substitute In"
            >
              S
            </button>
          </div>
        )}
      </div>
    );
  };

  // If still loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your team data...</p>
        </div>
      </div>
    );
  }

  // Determine team formation based on the starting players
  const startingPlayers = getStartingPlayers();
  const formation = `${getPositionPlayers('DEF', true).length}-${getPositionPlayers('MID', true).length}-${getPositionPlayers('FWD', true).length}`;

  return (
    <NavLayout>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with navigation and team info */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{team?.team_name || 'My Team'}</h1>
              <div className="text-gray-400 mt-1 flex items-center">
                <Trophy className="w-4 h-4 mr-1.5" />  GameWeek ID : {nextGameWeekID || 'Current Gameweek'} • Formation: {formation}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => router.push('/teams')}
                className="flex items-center gap-1.5 py-2 px-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Teams</span>
              </button>

              <button 
                onClick={refreshTeamData}
                disabled={refreshing}
                className={`flex items-center gap-1.5 py-2 px-3 rounded-lg text-gray-300 transition-colors 
                  ${refreshing ? 'bg-gray-700 cursor-wait' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
          
          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Total Points</div>
              <div className="text-2xl font-bold text-primary-400">{team?.total_points || 0}</div>
            </div>
            <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Gameweek Points</div>
              <div className="text-2xl font-bold text-green-400">{team?.gameweek_points || 0}</div>
            </div>
            <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Team Value</div>
              <div className="text-2xl font-bold text-yellow-400">
                £{players.reduce((sum, player) => sum + player.fantasy_price, 0).toFixed(1)}m
              </div>
            </div>
            <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Remaining Budget</div>
              <div className="text-2xl font-bold text-blue-400">£{team?.budget.toFixed(1) || 0}m</div>
            </div>
          </div>

          {error && (
            <div className={`border px-4 py-3 rounded-lg mb-6 ${
              error.includes('successfully') 
                ? 'bg-green-900/30 border-green-800 text-green-400' 
                : 'bg-red-900/30 border-red-800 text-red-400'
            }`}>
              {error}
            </div>
          )}
          
          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab('team')}
              className={`py-3 px-5 font-medium transition-colors ${
                activeTab === 'team' 
                  ? 'text-primary-400 border-b-2 border-primary-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Manage Team
              </span>
            </button>
          </div>
        </div>
        
        {/* Tab Content - Only Team Management */}
        {/* Football Pitch with Starting XI - With interaction */}
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-400" /> 
                  Starting XI
                </h2>
                
                {teamChanged && (
                  <button
                    onClick={handleTeamUpdate}
                    className="py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center transition-colors"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                )}
              </div>
              
              {/* Instructions */}
              <div className="bg-gray-900/60 p-3 rounded-lg mb-4 text-sm">
                <p className="text-gray-300">
                  <span className="text-primary-400 font-medium">Instructions:</span> Click on a player to move them between bench and starting XI. 
                  Click C or VC buttons to set captain and vice-captain. Formation must include at least 3 DEF, 3 MID, and 1 FWD.
                </p>
              </div>
              
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
                <div className="absolute inset-0 flex flex-col justify-between py-8">
                  {/* Goalkeeper Row */}
                  <div className="flex justify-center items-center">
                    <div className="w-20">
                      {getPositionPlayers('GK', true).map(player => (
                        <div key={player.player_id} className="flex justify-center">
                          {renderPlayerCard(player, true)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Defenders Row */}
                  <div className="flex justify-center items-center">
                    <div className="w-full max-w-3xl px-4">
                      <div className={`grid ${getPositionPlayers('DEF', true).length === 5 ? 'grid-cols-5' : getPositionPlayers('DEF', true).length === 4 ? 'grid-cols-4' : getPositionPlayers('DEF', true).length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                        {getPositionPlayers('DEF', true).map((player) => (
                          <div key={player.player_id} className="flex justify-center">
                            {renderPlayerCard(player, true)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Midfielders Row */}
                  <div className="flex justify-center items-center">
                    <div className="w-full max-w-3xl px-4">
                      <div className={`grid ${getPositionPlayers('MID', true).length === 5 ? 'grid-cols-5' : getPositionPlayers('MID', true).length === 4 ? 'grid-cols-4' : getPositionPlayers('MID', true).length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
                        {getPositionPlayers('MID', true).map((player) => (
                          <div key={player.player_id} className="flex justify-center">
                            {renderPlayerCard(player, true)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Forwards Row */}
                  <div className="flex justify-center items-center">
                    <div className="w-full max-w-xl px-4">
                      <div className={`grid ${getPositionPlayers('FWD', true).length === 3 ? 'grid-cols-3' : getPositionPlayers('FWD', true).length === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-8`}>
                        {getPositionPlayers('FWD', true).map((player) => (
                          <div key={player.player_id} className="flex justify-center">
                            {renderPlayerCard(player, true)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Substitutes Section - With interaction */}
            <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-400" /> 
                Substitutes
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {getSubstitutePlayers().map(player => (
                  <div key={player.player_id}>
                    {renderSubstituteCard(player, true)}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Team Info Section */}
            <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-primary-400" /> 
                Team Summary
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Formation */}
                <div className="space-y-1.5">
                  <div className="text-gray-400 text-sm">Formation</div>
                  <div className="text-white font-medium">{formation}</div>
                </div>
                
                {/* Position Counts */}
                <div className="space-y-1.5">
                  <div className="text-gray-400 text-sm">Position Breakdown</div>
                  <div className="text-white font-medium space-x-3">
                    <span className="text-red-400">GK: {players.filter(p => p.position === 'GK').length}</span>
                    <span className="text-blue-400">DEF: {players.filter(p => p.position === 'DEF').length}</span>
                    <span className="text-green-400">MID: {players.filter(p => p.position === 'MID').length}</span>
                    <span className="text-yellow-400">FWD: {players.filter(p => p.position === 'FWD').length}</span>
                  </div>
                </div>
                
                {/* Created Date */}
                <div className="space-y-1.5">
                  <div className="text-gray-400 text-sm">Team Created</div>
                  <div className="text-white font-medium">
                    {team?.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
  
        

        

       

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-4 right-4 z-50 max-w-sm w-full p-4 rounded-lg shadow-lg transition-all
            ${toast.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}
          `}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {toast.type === 'success' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m2-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{toast.message}</p>
              </div>
              <div className="ml-auto">
                <button 
                  onClick={() => setToast(null)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NavLayout>
  );
}