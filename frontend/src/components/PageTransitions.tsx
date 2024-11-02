import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { useLocation } from 'react-router-dom';
import FadingLoadingScreen from './FadingLoadingScreen';


const FADE_DURATION = 1000;  // How long each fade animation takes
const LOADING_EXTRA_TIME = 2000;  // Additional time to show loading screen after isLoading becomes false
const CONTENT_READY_TIME = 500;  // Time it takes for the content to be labeled as ready

const PageTransitions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let contentReadyTimer: NodeJS.Timeout;
    let loadingScreenTimer: NodeJS.Timeout;

    if (isLoading) {
      setShowLoadingScreen(true);
      setIsContentReady(false);
    } else {
      // When loading finishes, start transition sequence
      contentReadyTimer = setTimeout(() => {
        setIsContentReady(true);
      }, CONTENT_READY_TIME);

      loadingScreenTimer = setTimeout(() => {
        setShowLoadingScreen(false);
      }, LOADING_EXTRA_TIME + FADE_DURATION);
    }

    return () => {
      clearTimeout(contentReadyTimer);
      clearTimeout(loadingScreenTimer);
    };
  }, [location.pathname, isLoading]);

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
            animation: fadeOut ${FADE_DURATION}ms ease-in-out forwards;
            animation-delay: ${LOADING_EXTRA_TIME}ms;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .content-fade-in {
            opacity: 0;
            animation: fadeIn ${FADE_DURATION}ms ease-in-out forwards;
            animation-delay: ${LOADING_EXTRA_TIME}ms;
          }
          @keyframes contentFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-contentFadeIn {
            opacity: 0;
            animation: contentFadeIn ${FADE_DURATION}ms ease-in-out forwards;
          }
        `}
      </style>
      <div className="relative flex-1">
        <div 
          className={`min-h-[calc(100vh-4rem)] ${isContentReady && !isLoading ? 'content-fade-in' : 'opacity-0'}`}
        >
          {children}
        </div>
        {(showLoadingScreen || isLoading) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fadeOut">
            <FadingLoadingScreen />
          </div>
        )}
      </div>
    </>
  );
};

export default PageTransitions;