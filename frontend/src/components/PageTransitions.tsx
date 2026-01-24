// Start rendering children content right away and make it visible after the loading screen is removed
// The loading screen takes precedence over child content visibility, even if the child is fully opaque

import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import LoadingScreenAnimation from "./LoadingScreenAnimation";
import { ContentReadyProvider, useContentReady } from "../store/ContentReadyContext";

const FADE_DURATION = 1000; // How long each fade animation takes
const MINIMUM_LOADING_SCREEN_DURATION = 3000; // Minimun time the loading screen takes
const START_CONTENT_FADE_IN = 100; // After loading screen is gone, start content fade in

// Inner component that manages loading state and updates context
const PageTransitionsInner: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [isContentReadyLocal, setIsContentReadyLocal] = useState(false);
  const [fadeOutLoadingScreen, setfadeOutLoadingScreen] = useState(false);
  const { setContentReady } = useContentReady();

  useEffect(() => {
    let fadeOutTimer: NodeJS.Timeout;
    let unmountTimer: NodeJS.Timeout;
    let contentFadeinTimer: NodeJS.Timeout;
    let scrollTimer: NodeJS.Timeout;

    const html = document.documentElement;

    if (showLoadingScreen) {
      //dependency?
      html.classList.add("no-scroll-height");
      document.body.classList.add("no-scroll-height");
    }

    if (!isLoading) {
      // Run procedure when loading home
      if (window.location.pathname === "/") {
        // Once isLoading is false start nested timeouts
        // It goes from outer to inner timeouts
        fadeOutTimer = setTimeout(() => {
          setfadeOutLoadingScreen(true);

          unmountTimer = setTimeout(() => {
            setShowLoadingScreen(false);

            contentFadeinTimer = setTimeout(() => {
              setIsContentReadyLocal(true);
              // Signal to all animation components that content is now visible
              setContentReady(true);

              scrollTimer = setTimeout(() => {
                html.classList.remove("no-scroll-height");
                document.body.classList.remove("no-scroll-height");
              }, FADE_DURATION);
            }, START_CONTENT_FADE_IN);
          }, FADE_DURATION);
        }, MINIMUM_LOADING_SCREEN_DURATION);
      } else {
        setShowLoadingScreen(false);
        setIsContentReadyLocal(true);
        setContentReady(true);

        html.classList.remove("no-scroll-height");
        document.body.classList.remove("no-scroll-height");
      }
    }

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
      clearTimeout(contentFadeinTimer);
      clearTimeout(scrollTimer);

      html.classList.remove("no-scroll-height");
      document.body.classList.remove("no-scroll-height");
    };
  }, [isLoading, setContentReady]);

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .content-fade-in {
            opacity: 0;
            animation: fadeIn ${FADE_DURATION}ms ease-in-out forwards;
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
          className={`min-h-[calc(100vh-4rem)] ${isContentReadyLocal ? "content-fade-in" : "opacity-0"
            }`}
        >
          {children}
        </div>
        {showLoadingScreen && window.location.pathname === "/" && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${fadeOutLoadingScreen ? "opacity-0" : "opacity-100"
              }`}
          >
            <LoadingScreenAnimation />
          </div>
        )}
      </div>
    </>
  );
};

// Wrapper component that provides the context
const PageTransitions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ContentReadyProvider>
      <PageTransitionsInner>{children}</PageTransitionsInner>
    </ContentReadyProvider>
  );
};

export default PageTransitions;

