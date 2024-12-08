import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNoScroll = () => {
    const location = useLocation();
    
    useEffect(() => {
        // Prevent scrolling
        const preventScroll = (e: Event) => {
          e.preventDefault();
        };
    
        // Add no-scroll class and prevent scrolling
        document.body.classList.add('no-scroll');
        window.scrollTo({ top: 0, behavior: "auto" });
    
        // Add event listeners to prevent scrolling
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
    
        // Cleanup function
        return () => {
          document.body.classList.remove('no-scroll');
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          window.removeEventListener('wheel', preventScroll);
          window.removeEventListener('touchmove', preventScroll);
        };
      }, [location.pathname]);
};
