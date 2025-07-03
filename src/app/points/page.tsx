'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import NavLayout from '@/components/layout/NavLayout'
import { 
  Award, 
  ArrowLeft, 
  RefreshCw, 
  Star, 
  Users, 
  ListFilter,
  Trophy
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

interface Gameweek {
  gameweek_id: number
  name: string
  is_current: boolean
}

interface PlayerGameweekPoints {
  player_id: number
  first_name: string
  last_name: string
  team_name: string
  position: string
  goals_scored: number | null
  assists: number | null
  clean_sheets: number | null
  saves: number | null
  yellow_cards: number | null
  red_cards: number | null
  fantasy_points: number | null
}

export default function PointsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [team, setTeam] = useState<FantasyTeam | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [currentGameweek, setCurrentGameweek] = useState<{gameweek_id: number, name: string} | null>(null)
  
  // Points tab state
  const [gameweeks, setGameweeks] = useState<Gameweek[]>([])
  const [selectedGameweek, setSelectedGameweek] = useState<number | null>(null)
  const [playerPoints, setPlayerPoints] = useState<PlayerGameweekPoints[]>([])
  const [loadingPoints, setLoadingPoints] = useState(false)
  
  // Captain/Vice captain state for display purposes
  const [selectedCaptain, setSelectedCaptain] = useState<number | null>(null)
  const [selectedViceCaptain, setSelectedViceCaptain] = useState<number | null>(null)
  const [benchPlayers, setBenchPlayers] = useState<number[]>([])
  
  // State for player details modal
  const [selectedPlayerStats, setSelectedPlayerStats] = useState<any>(null);
  
  // Toast notification state
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  } | null>(null);
  
  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(null);
    }, type === 'success' ? 3000 : 4000);
  };
  
  // Effect to load team data
  useEffect(() => {
    if (authLoading) return;
    
    if (!user && !authLoading) {
      router.push('/auth/signin');
      return;
    }
    
    const fetchTeamData = async () => {
      try {
        setLoading(true)
        
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
        
        // Initialize captain, vice captain and bench players for display
        const captain = data.players.find((p:any) => p.is_captain);
        const viceCaptain = data.players.find((p :any)=> p.is_vice_captain);
        const bench = data.players.filter((p :any)=> !p.is_starting).map((p:any) => p.player_id);
        
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
  
  // Effect to load gameweeks and player points
  useEffect(() => {
    if (loading || !user || !team) return;
    
    const loadPointsData = async () => {
      try {
        console.log('Loading gameweeks data for Points page...');
        await fetchGameweeks(currentGameweek?.gameweek_id);
      } catch (err) {
        console.error('Error loading points data:', err);
      }
    };
    
    loadPointsData();
  }, [loading, user, team, currentGameweek]);
  
  // Fetch team data for a specific gameweek (used by Points page)
  const fetchTeamDataForGameweek = async (gameweekId: number) => {
    if (!user?.id) return;
    
    try {
      setLoadingPoints(true);
      
      const response = await fetch(`/api/my-team?userId=${user.id}&gameweek_id=${gameweekId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch team data for gameweek');
      }
      
      const data = await response.json();
      
      // Update players to show the historical team composition for this gameweek
      if (data.players && Array.isArray(data.players)) {
        setPlayers(data.players);
        
        // Update captain, vice captain and bench for this gameweek
        const captain = data.players.find((p :any)=> p.is_captain);
        const viceCaptain = data.players.find((p :any)=> p.is_vice_captain);
        const bench = data.players.filter((p:any) => !p.is_starting).map((p :any)=> p.player_id);
        
        setSelectedCaptain(captain?.player_id || null);
        setSelectedViceCaptain(viceCaptain?.player_id || null);
        setBenchPlayers(bench);
      }
      
      console.log(`Fetched team data for gameweek ${gameweekId}:`, data.players?.length || 0, 'players');
      
    } catch (err) {
      console.error('Error fetching team data for gameweek:', err);
      showToast('Failed to load team data for selected gameweek.', 'error');
    } finally {
      setLoadingPoints(false);
    }
  };

  // Fetch gameweeks
  const fetchGameweeks = async (currentId?: number) => {
    try {
      const response = await fetch('/api/gameweeks');
      if (!response.ok) {
        throw new Error('Failed to fetch gameweeks');
      }
      
      const data = await response.json();
      setGameweeks(data.gameweeks || []);
      
      // Set selected gameweek to current one
      if (currentId) {
        setSelectedGameweek(currentId);
        // Fetch both team data and player points for the current gameweek
        await fetchTeamDataForGameweek(currentId);
        fetchPlayerPointsForGameweek(currentId);
      } else if (data.gameweeks?.length > 0) {
        const current = data.gameweeks.find((gw: Gameweek) => gw.is_current);
        const targetGameweek = current || data.gameweeks[0];
        
        setSelectedGameweek(targetGameweek.gameweek_id);
        // Fetch both team data and player points for the target gameweek
        await fetchTeamDataForGameweek(targetGameweek.gameweek_id);
        fetchPlayerPointsForGameweek(targetGameweek.gameweek_id);
      }
    } catch (err) {
      console.error('Error fetching gameweeks:', err);
      showToast('Failed to load gameweeks. Please try again.', 'error');
    }
  };
  
  // Fetch player points for a specific gameweek
  const fetchPlayerPointsForGameweek = async (gameweekId: number) => {
    if (!team || !team.fantasy_team_id) {
      console.log('Team data not available yet. Cannot fetch player points.');
      return;
    }
    
    setLoadingPoints(true);
    try {
      const response = await fetch(`/api/player-points?gameweek_id=${gameweekId}&team_id=${team.fantasy_team_id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from API:', errorData);
        throw new Error(errorData.error || 'Failed to fetch player points');
      }
      
      const data = await response.json();
      console.log('Player points data received:', data);
      
      if (!data.playerPoints || !Array.isArray(data.playerPoints)) {
        throw new Error('Invalid player points data received');
      }
      
      setPlayerPoints(data.playerPoints);
      console.log('Player points set successfully');
      
      if (data.meta) {
        if (data.meta.teamCreatedAfterGameweek) {
          showToast('Your team was created after this gameweek ended, so no points are available.', 'error');
        } 
        else if (data.meta.fixturesCount > 0 && data.meta.statsFound === 0) {
          showToast('No player statistics available for this gameweek yet.', 'error');
        }
      }
    } catch (err) {
      console.error('Error fetching player points:', err);
      showToast('Failed to load player points data. Please try again.', 'error');
    } finally {
      setLoadingPoints(false);
    }
  };

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
      
      // Refresh points data for current gameweek
      if (selectedGameweek) {
        fetchPlayerPointsForGameweek(selectedGameweek);
      }
    } catch (err) {
      console.error('Error refreshing team data:', err);
      setError('Failed to refresh team data. Please try again.');
      setTimeout(() => setError(null), 3000);
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
        if (a.player_id === selectedCaptain) return -1;
        if (b.player_id === selectedCaptain) return 1;
        if (a.player_id === selectedViceCaptain) return -1;
        if (b.player_id === selectedViceCaptain) return 1;
        return 0;
      });
  };

  // Render player card for points view
  const renderPlayerPointCard = (player: Player) => {
    const stats = playerPoints.find(p => p.player_id === player.player_id);
    
    return (
      <div 
        key={player.player_id}
        className={`
          flex flex-col items-center justify-center rounded-lg p-2 transition-all cursor-pointer hover:bg-opacity-70
          ${player.position === 'GK' ? 'bg-red-900/50 text-red-400' : ''}
          ${player.position === 'DEF' ? 'bg-blue-900/50 text-blue-400' : ''}
          ${player.position === 'MID' ? 'bg-green-900/50 text-green-400' : ''}
          ${player.position === 'FWD' ? 'bg-yellow-900/50 text-yellow-400' : ''}
          border border-gray-700 shadow-md
        `}
        onClick={() => {
          const playerWithStats = {
            ...player,
            stats: stats || null
          };
          setSelectedPlayerStats(playerWithStats);
        }}
      >
        {/* Player Name and Position */}
        <div className="text-sm font-medium mb-1">
          {player.first_name} 
          {player.player_id === selectedCaptain && (
            <span className="ml-1.5 bg-yellow-600 text-white text-xs font-bold px-1 rounded-sm">C</span>
          )}
          {player.player_id === selectedViceCaptain && (
            <span className="ml-1.5 bg-orange-600 text-white text-xs font-bold px-1 rounded-sm">VC</span>
          )}
        </div>
        <div className="text-xs text-gray-300 mb-2">{player.team_short_name}</div>
        
        {/* Points and Price */}
        <div className="flex gap-2 text-xs">
          <div className="flex items-center">
            <Star className="w-3 h-3 mr-0.5 text-yellow-500" />
            <span className="font-bold">{stats?.fantasy_points || 0}</span>
          </div>
          <div className="text-primary-300 font-bold">
            £{player.fantasy_price}m
          </div>
        </div>
        
        {/* Detailed Stats Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            const playerWithStats = {
              ...player,
              stats: stats || null
            };
            setSelectedPlayerStats(playerWithStats);
          }}
          className="mt-1 px-2 py-1 text-[10px] rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
        >
          View Stats
        </button>
      </div>
    );
  };
  
  // Render substitute player card for points view
  const renderSubstitutePointCard = (player: Player) => {
    const stats = playerPoints.find(p => p.player_id === player.player_id);
    
    return (
      <div 
        key={player.player_id}
        className="flex items-center bg-gray-900/80 border border-gray-800 rounded p-2 gap-2 cursor-pointer hover:bg-gray-800"
        onClick={() => {
          const playerWithStats = {
            ...player,
            stats: stats || null
          };
          setSelectedPlayerStats(playerWithStats);
        }}
      >
        {/* Position Badge */}
        <div className={`rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold ${player.position === 'GK' ? 'bg-red-900/50 text-red-400' : player.position === 'DEF' ? 'bg-blue-900/50 text-blue-400' : player.position === 'MID' ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
          {player.position}
        </div>
        
        {/* Player Info */}
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="text-white text-sm font-medium">{player.first_name}</span>
            {player.player_id === selectedCaptain && (
              <span className="ml-1.5 bg-yellow-600 text-white text-xs font-bold px-1 rounded-sm">C</span>
            )}
            {player.player_id === selectedViceCaptain && (
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
            {stats?.fantasy_points || 0}
          </div>
        </div>
        
        {/* View Stats Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            const playerWithStats = {
              ...player,
              stats: stats || null
            };
            setSelectedPlayerStats(playerWithStats);
          }}
          className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
        >
          Stats
        </button>
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

  return (
    <NavLayout>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with navigation and team info */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Player Points</h1>
              <div className="text-gray-400 mt-1 flex items-center">
                <Trophy className="w-4 h-4 mr-1.5" />
                {team?.team_name || 'My Team'} • Total Points: {team?.total_points || 0}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => router.push('/my-team')}
                className="flex items-center gap-1.5 py-2 px-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>My Team</span>
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
        </div>
        
        {/* Gameweek Selector and Controls */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <h2 className="text-lg font-bold text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-primary-400" /> 
              Player Points
            </h2>
            
            {/* Gameweek Selector */}
            <div className="flex items-center">
              <label className="text-gray-400 mr-2">Select Gameweek:</label>
              <select 
                value={selectedGameweek || ''}
                onChange={async (e) => {
                  const gwId = parseInt(e.target.value);
                  setSelectedGameweek(gwId);
                  // Fetch both historical team data and player points for the selected gameweek
                  await fetchTeamDataForGameweek(gwId);
                  fetchPlayerPointsForGameweek(gwId);
                }}
                className="bg-gray-700 border border-gray-600 text-white rounded py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {gameweeks.map((gw) => (
                  <option key={gw.gameweek_id} value={gw.gameweek_id}>
                    {gw.name} {gw.is_current ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading indicator or points summary */}
          {loadingPoints ? (
            <div className="flex justify-center py-4">
              <div className="w-8 h-8 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="text-center p-3 bg-gray-900/60 rounded-lg">
              <p className="text-xl font-bold text-white">
                Total Points: <span className="text-primary-400">{playerPoints.reduce((sum, p) => sum + (p.fantasy_points || 0), 0)}</span>
              </p>
            </div>
          )}
        </div>

        {/* Pitch View for Player Points */}
        {!loadingPoints && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6 mb-6">
            <h3 className="text-md font-semibold text-white mb-4 flex items-center">
              <Users className="w-4 h-4 mr-2 text-primary-400" /> 
              Starting XI Performance
            </h3>

            <div className="relative w-full bg-green-800 rounded-lg overflow-hidden" style={{ minHeight: "520px" }}>
              {/* Field Markings */}
              <div className="absolute inset-0">
                <div className="absolute rounded-full border border-white/30 w-1/4 h-1/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 bottom-0 left-1/2 border-l border-white/30 transform -translate-x-1/2"></div>
                <div className="absolute top-1/4 left-0 w-1/6 h-1/2 border-r border-t border-b border-white/30"></div>
                <div className="absolute top-1/4 right-0 w-1/6 h-1/2 border-l border-t border-b border-white/30"></div>
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
                        {renderPlayerPointCard(player)}
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
                          {renderPlayerPointCard(player)}
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
                          {renderPlayerPointCard(player)}
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
                          {renderPlayerPointCard(player)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Bench Players Performance */}
        {!loadingPoints && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6 mb-6">
            <h3 className="text-md font-semibold text-white mb-4 flex items-center">
              <Award className="w-4 h-4 mr-2 text-primary-400" /> 
              Substitutes Performance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {getSubstitutePlayers().map(player => (
                <div key={player.player_id}>
                  {renderSubstitutePointCard(player)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table View for Detailed Stats */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 md:p-6">
          <h3 className="text-md font-semibold text-white mb-4 flex items-center">
            <ListFilter className="w-4 h-4 mr-2 text-primary-400" /> 
            Detailed Stats
          </h3>

          {loadingPoints ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Player</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Position</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Team</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Goals</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Assists</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Clean Sheets</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Cards</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                  {players.map((player) => {
                    const stats = playerPoints.find(p => p.player_id === player.player_id);
                    const isCaptain = player.player_id === selectedCaptain;
                    const isViceCaptain = player.player_id === selectedViceCaptain;
                    
                    return (
                      <tr key={player.player_id} className="hover:bg-gray-750">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-white flex items-center">
                                {player.first_name} {player.last_name}
                                {isCaptain && (
                                  <span className="ml-1.5 bg-yellow-600 text-white text-xs font-bold px-1 rounded-sm">C</span>
                                )}
                                {isViceCaptain && (
                                  <span className="ml-1.5 bg-orange-600 text-white text-xs font-bold px-1 rounded-sm">VC</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${player.position === 'GK' ? 'bg-red-900/50 text-red-400' : ''}
                            ${player.position === 'DEF' ? 'bg-blue-900/50 text-blue-400' : ''}
                            ${player.position === 'MID' ? 'bg-green-900/50 text-green-400' : ''}
                            ${player.position === 'FWD' ? 'bg-yellow-900/50 text-yellow-400' : ''}
                          `}>
                            {player.position}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {player.team_name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-300">
                          {stats?.goals_scored ?? '-'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-300">
                          {stats?.assists ?? '-'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-300">
                          {stats?.clean_sheets ?? '-'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                          {stats?.yellow_cards ? <span className="text-yellow-400">{stats.yellow_cards}</span> : '0'} / 
                          {stats?.red_cards ? <span className="text-red-400">{stats.red_cards}</span> : '0'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-bold text-primary-400">
                          {stats?.fantasy_points ?? '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-900">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-right font-bold text-white" colSpan={7}>
                      Total Points:
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-primary-400">
                      {playerPoints.reduce((sum, p) => sum + (p.fantasy_points || 0), 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Player Stats Modal */}
        {selectedPlayerStats && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  {selectedPlayerStats.first_name} {selectedPlayerStats.last_name}
                </h3>
                <button 
                  onClick={() => setSelectedPlayerStats(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center mb-6">
                <div className={`
                  rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-3
                  ${selectedPlayerStats.position === 'GK' ? 'bg-red-900/50 text-red-400' : ''}
                  ${selectedPlayerStats.position === 'DEF' ? 'bg-blue-900/50 text-blue-400' : ''}
                  ${selectedPlayerStats.position === 'MID' ? 'bg-green-900/50 text-green-400' : ''}
                  ${selectedPlayerStats.position === 'FWD' ? 'bg-yellow-900/50 text-yellow-400' : ''}
                `}>
                  {selectedPlayerStats.position}
                </div>
                <div>
                  <div className="text-white text-sm">{selectedPlayerStats.team_name}</div>
                  <div className="text-primary-400 font-bold">£{selectedPlayerStats.fantasy_price}m</div>
                </div>
                <div className="ml-auto">
                  <div className="text-3xl font-bold text-primary-400 flex items-center">
                    {selectedPlayerStats.stats?.fantasy_points || 0}
                    <span className="text-sm text-gray-400 ml-2">points</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                  <div className="text-gray-400">Minutes Played</div>
                  <div className="font-semibold text-white">{selectedPlayerStats.stats?.minutes_played || 0}</div>
                </div>
                
                <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                  <div className="text-gray-400">Goals</div>
                  <div className="font-semibold text-white">{selectedPlayerStats.stats?.goals_scored || 0}</div>
                </div>
                
                <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                  <div className="text-gray-400">Assists</div>
                  <div className="font-semibold text-white">{selectedPlayerStats.stats?.assists || 0}</div>
                </div>
                
                <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                  <div className="text-gray-400">Clean Sheet</div>
                  <div className="font-semibold text-white">{selectedPlayerStats.stats?.clean_sheet ? 'Yes' : 'No'}</div>
                </div>
                
                {selectedPlayerStats.position === 'GK' && (
                  <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                    <div className="text-gray-400">Saves</div>
                    <div className="font-semibold text-white">{selectedPlayerStats.stats?.saves || 0}</div>
                  </div>
                )}
                
                <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                  <div className="text-gray-400">Yellow Cards</div>
                  <div className="font-semibold text-white">{selectedPlayerStats.stats?.yellow_cards || 0}</div>
                </div>
                
                <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                  <div className="text-gray-400">Red Cards</div>
                  <div className="font-semibold text-white">{selectedPlayerStats.stats?.red_cards || 0}</div>
                </div>
              </div>
            </div>
          </div>
        )}

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
