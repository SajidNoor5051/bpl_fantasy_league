import { User } from '@supabase/supabase-js'

export type AuthUser = User & {
  user_metadata: {
    first_name?: string
    last_name?: string
    username?: string
  } & User['user_metadata']
}

export interface SignInFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  username: string
}

export interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{
    error?: string
    success?: boolean
  }>
  signUp: (data: Omit<SignUpFormData, 'confirmPassword'>) => Promise<{
    error?: string
    success?: boolean
  }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{
    error?: string
    success?: boolean
  }>
}

export interface AuthError {
  message: string
  status?: number
} 