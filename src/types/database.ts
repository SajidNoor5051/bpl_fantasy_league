export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: string
          username: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          created_at: string
          last_login: string | null
          is_admin: boolean
        }
        Insert: {
          username: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          created_at?: string
          last_login?: string | null
          is_admin?: boolean
        }
        Update: {
          username?: string
          email?: string
          password_hash?: string
          first_name?: string
          last_name?: string
          created_at?: string
          last_login?: string | null
          is_admin?: boolean
        }
      }
      teams: {
        Row: {
          team_id: string
          team_name: string
          team_short_name: string
          logo_url: string | null
          founded_year: number | null
          home_stadium: string | null
          team_color: string | null
          points: number
          matches_played: number
          matches_won: number
          matches_drawn: number
          matches_lost: number
          goals_for: number
          goals_against: number
        }
        Insert: {
          team_name: string
          team_short_name: string
          logo_url?: string | null
          founded_year?: number | null
          home_stadium?: string | null
          team_color?: string | null
          points?: number
          matches_played?: number
          matches_won?: number
          matches_drawn?: number
          matches_lost?: number
          goals_for?: number
          goals_against?: number
        }
        Update: {
          team_name?: string
          team_short_name?: string
          logo_url?: string | null
          founded_year?: number | null
          home_stadium?: string | null
          team_color?: string | null
          points?: number
          matches_played?: number
          matches_won?: number
          matches_drawn?: number
          matches_lost?: number
          goals_for?: number
          goals_against?: number
        }
      }
      players: {
        Row: {
          player_id: string
          team_id: string | null
          first_name: string
          last_name: string
          position: 'GK' | 'DEF' | 'MID' | 'FWD'
          jersey_number: number | null
          date_of_birth: string | null
          nationality: string | null
          height: number | null
          weight: number | null
          fantasy_price: number
          fantasy_points: number
          total_goals: number
          total_assists: number
          total_clean_sheets: number
          total_yellow_cards: number
          total_red_cards: number
          is_active: boolean
        }
        Insert: {
          team_id?: string | null
          first_name: string
          last_name: string
          position: 'GK' | 'DEF' | 'MID' | 'FWD'
          jersey_number?: number | null
          date_of_birth?: string | null
          nationality?: string | null
          height?: number | null
          weight?: number | null
          fantasy_price?: number
          fantasy_points?: number
          total_goals?: number
          total_assists?: number
          total_clean_sheets?: number
          total_yellow_cards?: number
          total_red_cards?: number
          is_active?: boolean
        }
        Update: {
          team_id?: string | null
          first_name?: string
          last_name?: string
          position?: 'GK' | 'DEF' | 'MID' | 'FWD'
          jersey_number?: number | null
          date_of_birth?: string | null
          nationality?: string | null
          height?: number | null
          weight?: number | null
          fantasy_price?: number
          fantasy_points?: number
          total_goals?: number
          total_assists?: number
          total_clean_sheets?: number
          total_yellow_cards?: number
          total_red_cards?: number
          is_active?: boolean
        }
      }
      fantasy_teams: {
        Row: {
          fantasy_team_id: string
          user_id: string
          team_name: string
          budget: number
          total_points: number
          gameweek_points: number
          created_at: string
          last_updated: string
        }
        Insert: {
          user_id: string
          team_name: string
          budget?: number
          total_points?: number
          gameweek_points?: number
          created_at?: string
          last_updated?: string
        }
        Update: {
          user_id?: string
          team_name?: string
          budget?: number
          total_points?: number
          gameweek_points?: number
          created_at?: string
          last_updated?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      player_position: 'GK' | 'DEF' | 'MID' | 'FWD'
      match_status: 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'POSTPONED' | 'CANCELLED'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 