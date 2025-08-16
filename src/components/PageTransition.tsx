import React, { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  trigger?: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, trigger = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform, opacity'
    }}>
      {children}
      
      <style>
        {`
          @keyframes pageSlideIn {
            0% {
              opacity: 0;
              transform: translateY(30px) scale(0.98);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes pageSlideOut {
            0% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-30px) scale(1.02);
            }
          }
          
          .page-enter {
            animation: pageSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          
          .page-exit {
            animation: pageSlideOut 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
        `}
      </style>
    </div>
  );
};

export default PageTransition;
