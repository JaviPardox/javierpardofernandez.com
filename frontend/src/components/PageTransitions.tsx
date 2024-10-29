import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { useLocation } from 'react-router-dom';
import SlidingLoadingScreen from './SlidingLoadingScreen';

const PageTransitions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [isExiting, setIsExiting] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    if (isLoading) {
      setIsExiting(true);
      setShowLoadingScreen(true);
      
      // Update content after fade out
      const contentTimer = setTimeout(() => {
        setCurrentChildren(children);
        setIsExiting(false);
      }, 700);

      // Remove loading screen after animation completes
      const loadingTimer = setTimeout(() => {
        setShowLoadingScreen(false);
      }, 1400);

      return () => {
        clearTimeout(contentTimer);
        clearTimeout(loadingTimer);
      };
    }
  }, [isLoading, children, location]);

  return (
    <>
      <style>
        {`
          @keyframes slideInOut {
            0% { transform: translateY(100%); }
            50% { transform: translateY(0); }
            100% { transform: translateY(-100%) }
          }
          .animate-slideInOut {
            animation: slideInOut 1.4s ease-in-out forwards;
          }
        `}
      </style>
      <div className="relative flex-1">
        <div
          className={`transition-all duration-700 min-h-[calc(100vh-4rem)] ${
            isExiting
              ? 'opacity-0 translate-y-8'
              : 'opacity-100 translate-y-0'
          }`}
        >
          {currentChildren}
        </div>
        {showLoadingScreen && <SlidingLoadingScreen />}
      </div>
    </>
  );
};

export default PageTransitions;