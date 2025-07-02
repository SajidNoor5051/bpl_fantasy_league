import React from 'react';

interface IconProps {
  className?: string;
}

const GoldenBootIcon: React.FC<IconProps> = ({ className }) => {
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
      <path d="M7 17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V15.4336C17 15.1491 17.0858 14.8707 17.2442 14.6345L21 8.83261V7H3V8.83261L6.75584 14.6345C6.91417 14.8707 7 15.1491 7 15.4336V17Z" />
      <path d="M7.5 7V5.5C7.5 4.11929 8.61929 3 10 3H14C15.3807 3 16.5 4.11929 16.5 5.5V7" />
      <path d="M10 19V20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20V19" />
    </svg>
  );
};

export default GoldenBootIcon;