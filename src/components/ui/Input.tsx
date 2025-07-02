import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showPasswordToggle?: boolean
  darkMode?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, leftIcon, rightIcon, showPasswordToggle, darkMode = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [inputType, setInputType] = React.useState(type)

    React.useEffect(() => {
      if (type === 'password' && showPasswordToggle) {
        setInputType(showPassword ? 'text' : 'password')
      }
    }, [showPassword, type, showPasswordToggle])

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="relative">
        <div className="relative">
          {leftIcon && (
            <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
              {leftIcon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              "flex h-12 w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              // Mobile-first optimizations
              "min-h-[48px] text-[16px]", // Prevent zoom on iOS
              // Dark mode styles
              darkMode && "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-primary-400",
              !darkMode && "border-input",
              // Spacing adjustments for icons
              leftIcon && "pl-10",
              (rightIcon || showPasswordToggle) && "pr-10",
              // State-based styling
              error && darkMode && "border-red-500 focus-visible:ring-red-500",
              error && !darkMode && "border-red-500 focus-visible:ring-red-500",
              success && darkMode && "border-green-500 focus-visible:ring-green-500",
              success && !darkMode && "border-green-500 focus-visible:ring-green-500",
              className
            )}
            ref={ref}
            {...props}
          />
          
          {(rightIcon || showPasswordToggle) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showPasswordToggle && type === 'password' ? (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-muted-foreground hover:text-foreground'} transition-colors p-1 -m-1`}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              ) : (
                rightIcon && <div className={darkMode ? 'text-gray-400' : 'text-muted-foreground'}>{rightIcon}</div>
              )}
            </div>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-500 mt-1 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }