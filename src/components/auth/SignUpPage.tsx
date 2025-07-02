'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { useAuth } from '@/contexts/AuthContext'
import AuthLayout from '@/components/layout/AuthLayout'

// Form validation schema
const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsLoading(true)
      
      const { confirmPassword, ...signUpData } = data
      
      const result = await signUp(signUpData)

      if (result?.error) {
        if (result.error.toLowerCase().includes('email')) {
          setError('email', { message: 'Email is already in use' })
        } else if (result.error.toLowerCase().includes('username')) {
          setError('username', { message: 'Username is already taken' })
        } else {
          setError('email', { message: result.error })
        }
      }
    } catch (error) {
      setError('email', { message: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join BUET Fantasy League and start building your dream team"
      darkMode={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Personal Info Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-300">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.firstName?.message}
              {...register('firstName')}
              className="transition-all duration-200"
              darkMode={true}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-300">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.lastName?.message}
              {...register('lastName')}
              className="transition-all duration-200"
              darkMode={true}
            />
          </div>
        </div>

        {/* Username Field */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-300">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Choose a username"
            leftIcon={<User className="h-4 w-4" />}
            error={errors.username?.message}
            {...register('username')}
            className="transition-all duration-200"
            darkMode={true}
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register('email')}
            className="transition-all duration-200"
            darkMode={true}
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            leftIcon={<Lock className="h-4 w-4" />}
            showPasswordToggle
            error={errors.password?.message}
            {...register('password')}
            className="transition-all duration-200"
            darkMode={true}
          />
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-300">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            leftIcon={<Lock className="h-4 w-4" />}
            showPasswordToggle
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
            className="transition-all duration-200"
            darkMode={true}
          />
        </div>

        {/* Terms & Conditions */}
        <div className="text-sm text-gray-400 mt-4">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="text-primary-400 hover:text-primary-300">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary-400 hover:text-primary-300">
            Privacy Policy
          </Link>
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          className="w-full text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mt-6"
          size="lg"
          loading={isLoading}
          disabled={!isValid || isLoading}
          rightIcon={!isLoading && <ArrowRight className="h-5 w-5" />}
        >
          Create Account
        </Button>

        {/* Sign In Link */}
        <div className="text-center pt-4">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}