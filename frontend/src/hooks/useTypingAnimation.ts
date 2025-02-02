import { useState, useEffect, useRef } from 'react';

export const useTypingAnimation = (text: Record<string,string>) => {
    const [displayedText, setDisplayedText] = useState<Record<string, string>[]>([]);
    const isTyping = useRef<boolean>(true);
    const currentIndex = useRef<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [elementRef, setElementRef] = useState<HTMLHeadingElement | null>(null);

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
        let typingTimeout: NodeJS.Timeout;
        const splitAcademicTitle = splitKeysToChars(text);
    
        const type = () => {
          if (isTyping.current) {
            if (currentIndex.current < splitAcademicTitle.length - 1) {
              setDisplayedText((prev) => {
                // Leaving this for debugging due to the state skipping the first item of the array
                // Could be due to how React renders the page
                const updated = [
                  ...(prev || []),
                  splitAcademicTitle[currentIndex.current],
                ];
                return updated;
              });
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
          typingTimeout = setTimeout(type, nextDelay);
        };
    
        if (isVisible) {
          type();
        }
    
        return () => clearTimeout(typingTimeout);
      }, [isVisible]);
    
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
            threshold: 0.99, // trigger when 99% of element is visible
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