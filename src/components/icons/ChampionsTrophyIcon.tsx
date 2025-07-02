import React from 'react';

interface IconProps {
  className?: string;
}

const ChampionsTrophyIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a1.5 1.5 0 0 1 0-3h.75" />
      <path d="M18 9h1.5a1.5 1.5 0 0 0 0-3h-.75" />
      <path d="M6 6h12" />
      <path d="M6 11.5v-5A2.5 2.5 0 0 1 8.5 4h7a2.5 2.5 0 0 1 2.5 2.5v5" />
      <path d="M12 11.5V20" />
      <path d="M9.44 18.57c.32.41.8.65 1.31.65h2.5c.5 0 .99-.24 1.31-.65" />
      <path d="M10 11.5v3" />
      <path d="M14 11.5v3" />
      <path d="M9 20h6" />
    </svg>
  );
};

export default ChampionsTrophyIcon;