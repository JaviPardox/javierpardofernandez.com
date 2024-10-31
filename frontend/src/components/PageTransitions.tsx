import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { useLocation } from 'react-router-dom';
import FadingLoadingScreen from './FadingLoadingScreen';

const PageTransitions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start the content fade-in
    const contentReadyTimer = setTimeout(() => {
      setIsContentReady(true);
    }, 2000);

    // Remove loading screen after fade-out animation completes
    const loadingScreenTimer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2700); // 2000ms delay + 700ms for fade out

    return () => {
      clearTimeout(contentReadyTimer);
      clearTimeout(loadingScreenTimer);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          .animate-fadeOut {
            opacity: 1;
            animation: fadeOut 0.7s ease-in-out forwards;
            animation-delay: 2s;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .content-fade-in {
            opacity: 0;
            animation: fadeIn 0.7s ease-in-out forwards;
            animation-delay: 2s;
          }
          @keyframes contentFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-contentFadeIn {
            opacity: 0;
            animation: contentFadeIn 0.7s ease-in-out forwards;
          }
        `}
      </style>
      <div className="relative flex-1">
        {isContentReady && (
          <div className="min-h-[calc(100vh-4rem)] content-fade-in">
            {children}
          </div>
        )}
        {showLoadingScreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fadeOut">
            <FadingLoadingScreen />
          </div>
        )}
      </div>
    </>
  );
};

export default PageTransitions;