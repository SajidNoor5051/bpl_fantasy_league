import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { number } from 'zod'

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Get user ID from the query params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    console.log('Fetching fantasy team for user ID:', userId)

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    //const dbUserId = userId;

    // Now get fantasy team data using the numeric user ID from the database
    const { data: teamData, error: teamError } = await supabase
      .from('fantasy_teams')
      .select('*')
      .eq('user_id', userId)
      .single() as any

    if (teamError) {
      console.error('Error fetching fantasy team:', teamError)
      
      // Return default data for better UX
      return NextResponse.json({
        teamName: "No Team Found",
        points: 0,
        rank: 0,
        captainPoints: 0,
        budget: 100.0,
        lastWeekPoints: 0,
        teamExists: false
      }, { status: 200 })
    }

    if (!teamData) {
      return NextResponse.json({
        teamName: "No Team Found",
        points: 0,
        rank: 0,
        captainPoints: 0,
        budget: 100.0,
        lastWeekPoints: 0,
        teamExists: false
      }, { status: 200 })
    }

    // Get current gameweek
    const { data: currentGameweek, error: gameweekError } = await supabase
      .from('gameweeks')
      .select('gameweek_id')
      .eq('is_current', true)
      .single() as any

    if (gameweekError && gameweekError.code !== 'PGRST116') {
      console.error('Error fetching current gameweek:', gameweekError)
    }

    // Calculate total points dynamically
    let totalPoints = 0;
    let captainPoints = 0;
    let lastWeekPoints = 0;

    if (currentGameweek && teamData?.fantasy_team_id) {
      const currentGameweekId = currentGameweek.gameweek_id;
      
      // Step 1: Get all gameweeks from 1 to current (inclusive)
      const { data: allGameweeks, error: allGameweeksError } = await supabase
        .from('gameweeks')
        .select('gameweek_id')
        .lte('gameweek_id', currentGameweekId)
        .order('gameweek_id', { ascending: true });

      if (!allGameweeksError && allGameweeks) {
        const gameweekIds = allGameweeks.map((gw: any) => gw.gameweek_id);
        console.log('Gameweeks to calculate points for:', gameweekIds);

        // Step 2: Get all team players for those gameweeks
        const { data: teamPlayers, error: teamPlayersError } = await supabase
          .from('fantasy_team_players')
          .select('player_id, gameweek_id, is_captain, is_vice_captain')
          .eq('fantasy_team_id', teamData.fantasy_team_id)
          .in('gameweek_id', gameweekIds);

        if (!teamPlayersError && teamPlayers) {
          console.log('Team players found:', teamPlayers.length);

          // Step 3: Get all fixtures for those gameweeks (only completed matches)
          const { data: fixtures, error: fixturesError } = await supabase
            .from('fixtures')
            .select('fixture_id, gameweek_id')
            .in('gameweek_id', gameweekIds)
            .eq('status', 'COMPLETED');

          if (!fixturesError && fixtures) {
            const fixtureIds = fixtures.map((f: any) => f.fixture_id);
            const playerIds = Array.from(new Set(teamPlayers.map((p: any) => p.player_id)));
            
            console.log('Completed fixtures found:', fixtures.length);
            console.log('Unique players to get stats for:', playerIds.length);

            // Step 4: Get player match stats for those players and fixtures
            const { data: playerStats, error: playerStatsError } = await supabase
              .from('player_match_stats')
              .select('player_id, fixture_id, fantasy_points, minutes_played')
              .in('player_id', playerIds)
              .in('fixture_id', fixtureIds);

            if (!playerStatsError && playerStats) {
              console.log('Player match stats found:', playerStats.length);

              // Step 5: Create fixture to gameweek mapping
              const fixtureToGameweek: { [key: number]: number } = {};
              fixtures.forEach((f: any) => {
                fixtureToGameweek[f.fixture_id] = f.gameweek_id;
              });

              // Step 6: Aggregate points with captain/vice-captain multipliers
              const gameweekPointsMap: { [key: number]: number } = {};
              
              // Group stats by gameweek first to apply captain logic per gameweek
              const statsByGameweek: { [key: number]: any[] } = {};
              
              playerStats.forEach((stat: any) => {
                const gameweekId = fixtureToGameweek[stat.fixture_id];
                if (!gameweekId) return;
                
                if (!statsByGameweek[gameweekId]) {
                  statsByGameweek[gameweekId] = [];
                }
                statsByGameweek[gameweekId].push(stat);
              });
              
              // Process each gameweek separately to apply captain/vice-captain logic
              Object.keys(statsByGameweek).forEach(gameweekIdStr => {
                const gameweekId = parseInt(gameweekIdStr);
                const gameweekStats = statsByGameweek[gameweekId];
                
                // Get captain and vice-captain for this gameweek
                const captain:any = teamPlayers.find((tp: any) => 
                  tp.gameweek_id === gameweekId && tp.is_captain
                );
                const viceCaptain:any = teamPlayers.find((tp: any) => 
                  tp.gameweek_id === gameweekId && tp.is_vice_captain
                );
                
                // Calculate total minutes played by captain and vice-captain for this gameweek
                let captainMinutes = 0;
                let viceCaptainMinutes = 0;
                
                if (captain) {
                  captainMinutes = gameweekStats
                    .filter(stat => stat.player_id === captain.player_id)
                    .reduce((total, stat) => total + (stat.minutes_played || 0), 0);
                }
                
                if (viceCaptain) {
                  viceCaptainMinutes = gameweekStats
                    .filter(stat => stat.player_id === viceCaptain.player_id)
                    .reduce((total, stat) => total + (stat.minutes_played || 0), 0);
                }
                
                console.log(`Gameweek ${gameweekId}: Captain (${captain?.player_id}) minutes: ${captainMinutes}, Vice-captain (${viceCaptain?.player_id}) minutes: ${viceCaptainMinutes}`);
                
                // Determine who gets the captain bonus
                let playerToDouble = null;
                if (captain && captainMinutes > 0) {
                  playerToDouble = captain.player_id;
                  console.log(`Gameweek ${gameweekId}: Captain played, doubling captain points`);
                } else if (viceCaptain && viceCaptainMinutes > 0) {
                  playerToDouble = viceCaptain.player_id;
                  console.log(`Gameweek ${gameweekId}: Captain didn't play, doubling vice-captain points`);
                } else {
                  console.log(`Gameweek ${gameweekId}: Neither captain nor vice-captain played, no doubling`);
                }
                
                // Calculate points for this gameweek
                gameweekStats.forEach((stat: any) => {
                  // Find the team player record for this player in this gameweek
                  const teamPlayer = teamPlayers.find((tp: any) => 
                    tp.player_id === stat.player_id && tp.gameweek_id === gameweekId
                  );

                  if (teamPlayer) {
                    let points = stat.fantasy_points || 0;
                    
                    // Apply captain multiplier (2x points) based on minutes played logic
                    if (playerToDouble && stat.player_id === playerToDouble) {
                      points = points * 2;
                      
                      // Track captain points for current gameweek
                      if (gameweekId === currentGameweekId) {
                        captainPoints += points;
                      }
                    }

                    // Add to total points
                    totalPoints += points;

                    // Track points by gameweek
                    if (!gameweekPointsMap[gameweekId]) {
                      gameweekPointsMap[gameweekId] = 0;
                    }
                    gameweekPointsMap[gameweekId] += points;
                  }
                });
              });

              // Get last week points (current gameweek points)
              lastWeekPoints = gameweekPointsMap[currentGameweekId] || 0;
              
              console.log('Calculated total points:', totalPoints);
              console.log('Current gameweek points:', lastWeekPoints);
             // console.log('Captain points for current gameweek:', captainPoints);
              
              // Update the fantasy_teams table with the calculated total points
              const { error: updatePointsError } = await supabase
                .from('fantasy_teams')
                .update({ 
                  total_points: totalPoints,
                  gameweek_points: lastWeekPoints,
                  last_updated: new Date().toISOString()
                })
                .eq('fantasy_team_id', (teamData as any).fantasy_team_id);
              
              if (updatePointsError) {
                console.error('Error updating team points:', updatePointsError);
              } else {
                console.log('Successfully updated team points in database');
              }
            }
          }
        }
      }
    }

    // Get user rank - default to 1 if there's an error
    let rank = 1;
    
    try {
      const { count: rankAbove, error: rankError } = await supabase
        .from('fantasy_teams')
        .select('*', { count: 'exact', head: false })
        .gte('total_points', (teamData as any).total_points || 0)
      
      if (!rankError && rankAbove !== null) {
        rank = rankAbove;
      }
    } catch (err) {
      console.error('Error getting rank:', err);
    }

    // Assemble response data
    const userStats = {
      teamName: teamData.team_name || "My Team",
      points: totalPoints, // Use calculated total points
      rank: rank,
      captainPoints: captainPoints, // Captain points for current gameweek
      budget: teamData.budget || 100.0,
      lastWeekPoints: lastWeekPoints, // Current gameweek points
      teamExists: true
    }

    return NextResponse.json(userStats, { status: 200 })
  } catch (error) {
    console.error('Error fetching fantasy team stats:', error)
    // Return default data in case of errors for better UX
    return NextResponse.json({
      teamName: "No Team Found",
      points: 0,
      rank: 0,
      captainPoints: 0,
      budget: 100.0,
      lastWeekPoints: 0,
      teamExists: false
    }, { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const session = await supabase.auth.getSession();
    console.log('Current session:', session);
    const { fantasy_team, players } = await request.json();

    const { data: currentGameweek, error: currentGameweekError } = await supabase
      .from('gameweeks')
      .select('gameweek_id, name, start_date, end_date')
      .eq('is_current', true)
      .single() as any
     
    if (currentGameweekError) {
      return NextResponse.json({
        error: 'Error fetching current gameweek',
        details: currentGameweekError.message
      }, { status: 500 })
    }
    

    
    const currentGameweekId = currentGameweek?.gameweek_id;
     console.log('Create Team API - Current gameweek ID :', currentGameweekId);
    if (!currentGameweekId) {
      return NextResponse.json({
        error: 'No current gameweek found',
      }, { status: 404 })
    }

    console.log('Received fantasy team data:', fantasy_team);
    //console.log('Received players data:', players);
    
    // Validate request data
    if (!fantasy_team || !players || !Array.isArray(players) || players.length !== 15) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid request data. Team must have exactly 15 players.'
      }, { status: 400 });
    }
    
    if (!fantasy_team.user_id || !fantasy_team.team_name) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields: user_id or team_name'
      }, { status: 400 });
    }
    
    // Check if user already has a fantasy team
    const { data: existingTeam, error: checkError } = await supabase
      .from('fantasy_teams')
      .select('fantasy_team_id')
      .eq('user_id', fantasy_team.user_id)
      .maybeSingle();
      
    if (checkError) {
      console.error('Error checking existing team:', checkError);
      return NextResponse.json({ 
        success: false, 
        message: 'Error checking existing team. Please try again.'
      }, { status: 500 });
    }
    
    // If user already has a team, return error
    if (existingTeam) {
      return NextResponse.json({ 
        success: false, 
        message: 'You already have a fantasy team. You cannot create multiple teams.'
      }, { status: 409 });
    }
    
    // Start a transaction (using Supabase's pattern of related operations)
    // 1. Insert fantasy team record
    const { data: teamData, error: teamError } = await supabase
      .from('fantasy_teams')
      .insert({
        user_id: fantasy_team.user_id,
        team_name: fantasy_team.team_name,
        budget: fantasy_team.budget || 100.0,
        total_points: 0,
        gameweek_points: 0
      })
      .select('fantasy_team_id')
      .single() as any ;
    
    if (teamError) {
      console.error('Error creating fantasy team:', teamError);
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to create fantasy team. Please try again.'
      }, { status: 500 });
    }
    
    // 2. Get the new fantasy_team_id
    const fantasy_team_id = teamData.fantasy_team_id;
    console.log('Created fantasy team with ID:', fantasy_team_id);
    
    // 3. Prepare player selection data with the fantasy_team_id
    const playerSelections = players.map(player => ({
      fantasy_team_id: fantasy_team_id,
      player_id: player.player_id,
      is_captain: player.is_captain || false,
      is_vice_captain: player.is_vice_captain || false,
      is_starting: player.is_starting || false,
      gameweek_id: Number(currentGameweekId +1)
    }));
    
    // 4. Insert all player selections
    const { error: playersError } = await supabase
      .from('fantasy_team_players')
      .insert(playerSelections);
    
    if (playersError) {
      console.error('Error adding players to team:', playersError);
      
      // Delete the fantasy team if player insertion fails (rollback)
      const { error: deleteError } = await supabase
        .from('fantasy_teams')
        .delete()
        .eq('fantasy_team_id', fantasy_team_id);
      
      if (deleteError) {
        console.error('Error rolling back fantasy team creation:', deleteError);
      }
      
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to add players to your team. Please try again.'
      }, { status: 500 });
    }
    
    // Successfully created team and added players
    return NextResponse.json({ 
      success: true, 
      message: 'Fantasy team created successfully!',
      data: {
        fantasy_team_id: fantasy_team_id,
        team_name: fantasy_team.team_name
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating fantasy team:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An unexpected error occurred. Please try again.'
    }, { status: 500 });
  }
}