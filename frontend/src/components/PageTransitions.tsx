import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { useLocation } from 'react-router-dom';
import FadingLoadingScreen from './FadingLoadingScreen';

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
          @keyframes fadeInOut {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
          .animate-fadeInOut {
            animation: fadeInOut 1.4s ease-in-out forwards;
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
        {showLoadingScreen && <FadingLoadingScreen />}
      </div>
    </>
  );
};

export default PageTransitions;