/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  webpack: (config, { isServer }) => {
    // Ignore the critical dependency warning for @supabase/realtime-js
    config.module.rules.push({
      test: /node_modules\/@supabase\/realtime-js\/dist\/main\/RealtimeClient\.js/,
      use: 'ignore-loader',
    });
    
    return config;
  },
}

module.exports = nextConfig