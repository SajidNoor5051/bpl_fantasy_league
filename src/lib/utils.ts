import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatError = (error: any): string => {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.error_description) return error.error_description
  return 'An unexpected error occurred'
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const getPasswordStrength = (password: string): {
  score: number
  label: string
  color: string
} => {
  let score = 0
  
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/(?=.*[a-z])/.test(password)) score++
  if (/(?=.*[A-Z])/.test(password)) score++
  if (/(?=.*\d)/.test(password)) score++
  if (/(?=.*[!@#$%^&*])/.test(password)) score++
  
  if (score <= 2) {
    return { score, label: 'Weak', color: 'text-red-500' }
  } else if (score <= 4) {
    return { score, label: 'Medium', color: 'text-yellow-500' }
  } else {
    return { score, label: 'Strong', color: 'text-green-500' }
  }
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const formatName = (firstName: string, lastName: string): string => {
  return `${firstName.trim()} ${lastName.trim()}`.trim()
}

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
} 