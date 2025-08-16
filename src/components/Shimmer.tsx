import React from 'react';

interface ShimmerProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  delay?: number;
}

const Shimmer: React.FC<ShimmerProps> = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '8px',
  delay = 0 
}) => {
  return (
    <div 
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: `shimmer 2s infinite linear`,
        animationDelay: `${delay}ms`
      }}
    >
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Shimmer;
