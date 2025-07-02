import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: teams, error } = await supabase
      .from('teams')
      .select('*') as any
      
     // console.log('Fetched teams:', teams)

    if (error) {
      console.error('Error fetching teams:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ teams }, { status: 200 })
  } catch (error) {
    console.error('Error fetching teams:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 