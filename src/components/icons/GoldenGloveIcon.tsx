import React from 'react';

interface IconProps {
  className?: string;
}

const GoldenGloveIcon: React.FC<IconProps> = ({ className }) => {
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
      <path d="M18 9C18 10.6569 16.6569 12 15 12C13.3431 12 12 10.6569 12 9C12 7.34315 13.3431 6 15 6C16.6569 6 18 7.34315 18 9Z" />
      <path d="M15 12V17" />
      <path d="M12 9H3V12.5C3 15 5.5 16.5 8 16.5C10.5 16.5 13 15 13 12.5V12" />
      <path d="M3 9V6C3 4.34315 4.34315 3 6 3H9" />
      <path d="M13 18L6 18" />
      <path d="M9 21L9 18" />
      <path d="M13 21L13 18" />
    </svg>
  );
};

export default GoldenGloveIcon;