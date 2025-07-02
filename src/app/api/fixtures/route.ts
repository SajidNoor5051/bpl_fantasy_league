import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameweekId = searchParams.get('gameweekId');
    const fixtureId = searchParams.get('fixtureId');
    
    // If specific fixture details are requested
    if (fixtureId) {
      // Get the fixture details
      const { data: fixture, error: fixtureError } = await supabase
        .from('fixtures')
        .select(`
          fixture_id,
          match_date,
          home_team_score,
          away_team_score,
          status,
          stadium,
          is_final,
          gameweek_id,
          gameweeks(name),
          home_team_id(team_id, team_name, team_short_name, logo_url),
          away_team_id(team_id, team_name, team_short_name, logo_url)
        `)
        .eq('fixture_id', fixtureId)
        .single();
        
      if (fixtureError) {
        console.error('Error fetching fixture:', fixtureError);
        return NextResponse.json(
          { error: 'Failed to fetch fixture details' },
          { status: 500 }
        );
      }
      
      // Get goals with scorer info
      const { data: goals, error: goalsError } = await supabase
        .from('goals')
        .select(`
          goal_id,
          minute,
          is_penalty,
          player_id(
            player_id,
            first_name,
            last_name,
            position,
            team_id
          ),
          team_id(
            team_id,
            team_name,
            team_short_name
          )
        `)
        .eq('fixture_id', fixtureId)
        .order('minute', { ascending: true });
        
      if (goalsError) {
        console.error('Error fetching goals:', goalsError);
        return NextResponse.json(
          { error: 'Failed to fetch goals' },
          { status: 500 }
        );
      }
      
      // Get assists information
      const { data: assists, error: assistsError } = await supabase
        .from('assists')
        .select(`
          assist_id,
          minute,
          player_id(
            player_id,
            first_name,
            last_name,
            position,
            team_id
          ),
          assisted_to(
            player_id,
            first_name,
            last_name,
            position,
            team_id
          ),
          team_id(
            team_id,
            team_name,
            team_short_name
          )
        `)
        .eq('fixture_id', fixtureId)
        .order('minute', { ascending: true });
        
      if (assistsError) {
        console.error('Error fetching assists:', assistsError);
        return NextResponse.json(
          { error: 'Failed to fetch assists' },
          { status: 500 }
        );
      }
      
      // Get yellow cards
      const { data: yellowCards, error: yellowCardsError } = await supabase
        .from('yellow_cards')
        .select(`
          yellow_card_id,
          minute,
          player_id(
            player_id,
            first_name,
            last_name,
            position,
            team_id
          ),
          team_id(
            team_id,
            team_name,
            team_short_name
          )
        `)
        .eq('fixture_id', fixtureId)
        .order('minute', { ascending: true });
        
      if (yellowCardsError) {
        console.error('Error fetching yellow cards:', yellowCardsError);
        return NextResponse.json(
          { error: 'Failed to fetch yellow cards' },
          { status: 500 }
        );
      }
      
      // Get red cards
      const { data: redCards, error: redCardsError } = await supabase
        .from('red_cards')
        .select(`
          red_card_id,
          minute,
          is_straight_red,
          player_id(
            player_id,
            first_name,
            last_name,
            position,
            team_id
          ),
          team_id(
            team_id,
            team_name,
            team_short_name
          )
        `)
        .eq('fixture_id', fixtureId)
        .order('minute', { ascending: true });
        
      if (redCardsError) {
        console.error('Error fetching red cards:', redCardsError);
        return NextResponse.json(
          { error: 'Failed to fetch red cards' },
          { status: 500 }
        );
      }
      
      // Get own goals
      const { data: ownGoals, error: ownGoalsError } = await supabase
        .from('own_goals')
        .select(`
          own_goal_id,
          minute,
          player_id(
            player_id,
            first_name,
            last_name,
            position,
            team_id
          ),
          team_id(
            team_id,
            team_name,
            team_short_name
          )
        `)
        .eq('fixture_id', fixtureId)
        .order('minute', { ascending: true });
        
      if (ownGoalsError) {
        console.error('Error fetching own goals:', ownGoalsError);
        return NextResponse.json(
          { error: 'Failed to fetch own goals' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({ 
        fixture,
        goals,
        assists,
        yellowCards,
        redCards,
        ownGoals
      }, { status: 200 });
    }
    
    // Build query based on whether a gameweek ID was provided
    let query = supabase
      .from('fixtures')
      .select(`
        fixture_id,
        match_date,
        home_team_score,
        away_team_score,
        status,
        stadium,
        is_final,
        gameweek_id,
        gameweeks(name),
        home_team_id(team_id, team_name, team_short_name, logo_url),
        away_team_id(team_id, team_name, team_short_name, logo_url)
      `)
      .order('match_date', { ascending: true });
    
    // Filter by gameweek if specified
    if (gameweekId) {
      query = query.eq('gameweek_id', gameweekId);
    }
    
    const { data: fixtures, error } = await query;
    
    if (error) {
      console.error('Error fetching fixtures:', error);
      return NextResponse.json(
        { error: 'Failed to fetch fixtures' },
        { status: 500 }
      );
    }
    
    // Get all gameweeks for the dropdown
    const { data: gameweeks, error: gameweekError } = await supabase
      .from('gameweeks')
      .select('gameweek_id, name, is_current')
      .order('start_date', { ascending: true });
    
    if (gameweekError) {
      console.error('Error fetching gameweeks:', gameweekError);
      return NextResponse.json(
        { error: 'Failed to fetch gameweeks' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      fixtures, 
      gameweeks,
      currentGameweek: gameweeks?.find((gw:any) => gw.is_current) || null 
    }, { status: 200 });
  } catch (error) {
    console.error('Error in fixtures API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}