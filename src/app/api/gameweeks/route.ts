import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currentOnly = searchParams.get('currentOnly') === 'true';
    
    let query = supabase
      .from('gameweeks')
      .select('*')
      .order('start_date', { ascending: true });
    
    // Filter to only get the current gameweek if requested
    if (currentOnly) {
      query = query.eq('is_current', true).limit(1);
    }
    
    const { data: gameweeks, error } = await query;
    
    if (error) {
      console.error('Error fetching gameweeks:', error);
      return NextResponse.json(
        { error: 'Failed to fetch gameweeks' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ gameweeks }, { status: 200 });
  } catch (error) {
    console.error('Error in gameweeks API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}