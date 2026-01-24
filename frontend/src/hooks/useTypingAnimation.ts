import { useState, useEffect, useRef } from 'react';
import { useContentReady } from '../store/ContentReadyContext';

export const useTypingAnimation = (text: Record<string, string>) => {
  const [displayedText, setDisplayedText] = useState<Record<string, string>[]>([]);
  const isTyping = useRef<boolean>(true);
  const currentIndex = useRef<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [elementRef, setElementRef] = useState<HTMLHeadingElement | null>(null);
  const textRef = useRef<Record<string, string>>(text);
  const hasStarted = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isContentReady } = useContentReady();

  function splitKeysToChars(inputDict: Record<string, string>): Record<string, string>[] {
    const arrayOfDictionaries: Record<string, string>[] = []

    Object.entries(inputDict).forEach(([key, value]) => {
      for (const char of key) {
        const tmpDict: Record<string, string> = {};
        tmpDict[char] = value;
        arrayOfDictionaries.push(tmpDict);
      }
    });
    return arrayOfDictionaries;
  }

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Only reset if text actually changed
    const textChanged = JSON.stringify(text) !== JSON.stringify(textRef.current);
    if (textChanged) {
      textRef.current = text;
      setDisplayedText([]);
      isTyping.current = true;
      currentIndex.current = 0;
      hasStarted.current = false;
    }

    const splitAcademicTitle = splitKeysToChars(text);

    const type = () => {
      if (isTyping.current) {
        if (currentIndex.current < splitAcademicTitle.length) {
          const currentChar = splitAcademicTitle[currentIndex.current];
          if (currentChar) {
            setDisplayedText((prev) => {
              // Create a new array with the current character
              const updated = [
                ...(prev || []),
                currentChar,
              ];
              return updated;
            });
          }
          currentIndex.current += 1;
        } else {
          isTyping.current = false;
        }
      }
      else {
        if (currentIndex.current > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          currentIndex.current -= 1;
        }
        else {
          isTyping.current = true;
        }
      }
      const nextDelay = Math.random() * (300 - 30) + 30;
      timeoutRef.current = setTimeout(type, nextDelay);
    };

    // Only start if visible AND content is ready (loading screen gone)
    if (isVisible && isContentReady && !hasStarted.current) {
      hasStarted.current = true;
      type();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, isContentReady, text]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // trigger when 10% of element is visible
      }
    );

    if (elementRef && !isVisible) {
      observer.observe(elementRef);
    }

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, [elementRef, isVisible]);

  return {
    displayedText,
    elementRef: setElementRef,
  };
}