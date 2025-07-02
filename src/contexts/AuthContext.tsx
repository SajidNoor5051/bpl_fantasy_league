'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { createSupabaseClient, signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut, resetPassword as supabaseResetPassword } from '@/lib/supabase'
import { formatError } from '@/lib/utils'
import type { AuthContextType, AuthUser, SignUpFormData } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isInitialAuthCheck, setIsInitialAuthCheck] = useState(true)
  const router = useRouter()
  const supabase = createSupabaseClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
        } else {
          setUser(session?.user ?? null)
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
      } finally {
        setLoading(false)
        setIsInitialAuthCheck(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)

        // Only show toast notifications after the initial auth check
        // and only for explicit sign in/out events
        if (!isInitialAuthCheck) {
          if (event === 'SIGNED_IN') {
            toast.success('Successfully signed in!')
          } else if (event === 'SIGNED_OUT') {
            toast.success('Successfully signed out!')
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth, isInitialAuthCheck])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabaseSignIn(email, password)

      if (error) {
        const errorMessage = formatError(error)
        toast.error(errorMessage)
        return { error: errorMessage }
      }

      if (data?.user) {
        // Redirect will be handled by the auth state change listener
        router.push('/dashboard')
        return { success: true }
      }

      return { error: 'An unexpected error occurred' }
    } catch (error) {
      const errorMessage = formatError(error)
      toast.error(errorMessage)
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (userData: Omit<SignUpFormData, 'confirmPassword'>) => {
    try {
      setLoading(true)
      const { data, error } = await supabaseSignUp(
        userData.email,
        userData.password,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
        }
      )

      if (error) {
        const errorMessage = formatError(error)
        toast.error(errorMessage)
        return { error: errorMessage }
      }

      if (data.user) {
        toast.success('Account created successfully! Please check your email to verify your account.')
        return { success: true }
      }

      return { error: 'An unexpected error occurred' }
    } catch (error) {
      const errorMessage = formatError(error)
      toast.error(errorMessage)
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabaseSignOut()

      if (error) {
        const errorMessage = formatError(error)
        toast.error(errorMessage)
      } else {
        router.push('/auth/signin')
      }
    } catch (error) {
      const errorMessage = formatError(error)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabaseResetPassword(email)

      if (error) {
        const errorMessage = formatError(error)
        toast.error(errorMessage)
        return { error: errorMessage }
      }

      toast.success('Password reset email sent! Please check your inbox.')
      return { success: true }
    } catch (error) {
      const errorMessage = formatError(error)
      toast.error(errorMessage)
      return { error: errorMessage }
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}