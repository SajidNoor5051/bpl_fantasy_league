import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/database'
import * as crypto from 'crypto'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// For server-side usage
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// For client-side usage in components
export const createSupabaseClient = () => {
  return createClientComponentClient<Database>()
}

// Function to create a secure password hash
const hashPassword = (password: string): string => {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex')
  
  // Hash the password with the salt using SHA-256
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha256')
    .toString('hex')
  
  // Return the salt and hash together
  return `${salt}:${hash}`
}

// Auth helper functions
export const getUser = async () => {
  const supabase = createSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error getting user:', error)
    return null
  }
  
  return user
}

export const signIn = async (email: string, password: string) => {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

export const signUp = async (email: string, password: string, userData?: {
  firstName: string
  lastName: string
  username: string
}) => {
  const supabase = createSupabaseClient()
  
  // First, sign up the user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData ? {
        first_name: userData.firstName,
        last_name: userData.lastName,
        username: userData.username,
      } : undefined,
    },
  })
  
  // If signup was successful and we have user data, also insert into public.users table
  if (!error && data.user && userData) {
    try {
      // Create a secure password hash for the public users table
      const passwordHash = hashPassword(password)
      
      // Insert the user into the public users table with correct column names
      const { error: insertError } = await supabase.from('users').insert({
        // Don't specify user_id to let the SERIAL do its work
        username: userData.username,
        email: email,
        password_hash: passwordHash,
        first_name: userData.firstName,
        last_name: userData.lastName,
        created_at: new Date().toISOString(),
      })
      
      if (insertError) {
        console.error('Error inserting into public.users:', insertError)
        // You might want to handle this error, potentially by deleting the auth user
        // or by showing a specific error message to the user
        return { data, error: insertError }
      }
    } catch (err) {
      console.error('Exception inserting into public.users:', err)
      return { data, error: { message: 'Failed to create user record' } }
    }
  }
  
  return { data, error }
}

export const signOut = async () => {
  const supabase = createSupabaseClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const resetPassword = async (email: string) => {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: typeof window !== 'undefined' 
      ? `${window.location.origin}/auth/reset-password`
      : undefined,
  })
  
  return { data, error }
}