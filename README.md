# BUET Fantasy Premier League - Frontend

A modern, mobile-first fantasy premier league application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Mobile-First Design**: Optimized for mobile phones with touch-friendly interfaces
- **Modern Authentication**: Secure sign-in/sign-up with Supabase
- **Beautiful UI**: Green-white theme with smooth animations and micro-interactions
- **Type-Safe**: Full TypeScript support with proper type definitions
- **Responsive**: Seamless experience across all device sizes
- **Accessible**: ARIA labels, keyboard navigation, and focus management

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom green-white theme
- **Database & Auth**: Supabase
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand for auth state
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🔧 Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the Project URL and anon/public key
4. Run the database schema from `database/schema.sql` in your Supabase SQL editor

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check
```

## 🎨 Design System

### Color Palette
- **Primary Green**: #10B981 (emerald-500)
- **Secondary Green**: #059669 (emerald-600) 
- **Accent Green**: #34D399 (emerald-400)
- **Light Green**: #D1FAE5 (emerald-100)
- **Dark Green**: #047857 (emerald-700)
- **White**: #FFFFFF
- **Gray Accents**: #F8FAFC, #F1F5F9, #64748B

### Typography
- **Font Family**: Inter
- **Headings**: Bold with generous spacing
- **Body Text**: 16px minimum for mobile readability
- **Labels**: 14px with proper contrast

### Spacing & Layout
- **Mobile-First**: Touch-friendly 48px minimum for interactive elements
- **Form Fields**: 52px height with 16px padding
- **Card Padding**: 24px on mobile, 32px on desktop
- **Grid System**: 8px base spacing unit

## 📱 Mobile-First Approach

This application is designed with mobile-first principles:

- **Touch-Friendly**: All interactive elements meet 44px minimum touch target
- **Readable Text**: 16px minimum font size to prevent zoom
- **Generous Spacing**: Adequate space between touch targets
- **Portrait Optimized**: Layout optimized for portrait orientation
- **Performance**: Optimized bundle size for mobile networks

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── auth/           # Authentication components
│   ├── ui/             # Reusable UI components
│   └── layout/         # Layout components
├── contexts/           # React contexts
├── lib/               # Utility functions and configurations
├── types/             # TypeScript type definitions
└── styles/            # Global styles
```

## 🔐 Authentication Flow

1. User visits sign-in page
2. Enters email and password
3. Supabase validates credentials
4. On success, user is redirected to dashboard
5. Auth state is managed globally via React Context

## 🎯 Key Components

- **SignInPage**: Beautiful, mobile-optimized sign-in form
- **AuthLayout**: Full-screen auth layout with branding
- **Button**: Touch-friendly button with consistent styling
- **Input**: Elegant form input with validation states
- **Card**: Premium card component with proper elevation

## 📊 Performance

- **Core Web Vitals**: Optimized for excellent performance scores
- **Bundle Size**: Minimal dependencies for fast loading
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for optimal loading

## 🔒 Security

- **Row Level Security**: Supabase RLS policies for data protection
- **Environment Variables**: Sensitive data stored in environment variables
- **Type Safety**: TypeScript for compile-time error prevention
- **Form Validation**: Client and server-side validation

## 🚀 Deployment

This project is ready for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any platform supporting Next.js**

## 📝 License

This project is private and proprietary to BUET Fantasy Premier League.

## 🤝 Contributing

Please follow the established coding standards and design system when contributing to this project.

---

Built with ❤️ for the BUET community 