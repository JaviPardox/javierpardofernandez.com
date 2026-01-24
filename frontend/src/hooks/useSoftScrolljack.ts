import { useEffect, useRef, useCallback } from 'react';

interface SoftScrolljackOptions {
    /** Delay after scroll ends before snapping (ms) */
    debounceMs?: number;
    /** CSS selector for scroll sections */
    sectionSelector?: string;
    /** Disable on mobile */
    disableOnMobile?: boolean;
    /** Mobile breakpoint in pixels */
    mobileBreakpoint?: number;
    /** Minimum scroll velocity to skip snapping */
    velocityThreshold?: number;
}

/**
 * Soft scrolljacking hook - snaps to nearest section on scroll end
 * Does not interrupt active scrolling, only triggers after scroll stops
 */
export const useSoftScrolljack = (options: SoftScrolljackOptions = {}) => {
    const {
        debounceMs = 150,
        sectionSelector = '[data-scroll-section]',
        disableOnMobile = true,
        mobileBreakpoint = 768,
        velocityThreshold = 500,
    } = options;

    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastScrollTime = useRef<number>(Date.now());
    const isSnapping = useRef<boolean>(false);

    const isMobile = useCallback(() => {
        return disableOnMobile && window.innerWidth < mobileBreakpoint;
    }, [disableOnMobile, mobileBreakpoint]);

    const getClosestSection = useCallback((): HTMLElement | null => {
        const sections = document.querySelectorAll<HTMLElement>(sectionSelector);
        if (sections.length === 0) return null;

        const viewportCenter = window.innerHeight / 2;
        let closestSection: HTMLElement | null = null;
        let closestDistance = Infinity;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        return closestSection;
    }, [sectionSelector]);

    const snapToSection = useCallback(() => {
        if (isMobile() || isSnapping.current) return;

        const closestSection = getClosestSection();
        if (!closestSection) return;

        const rect = closestSection.getBoundingClientRect();
        const threshold = window.innerHeight * 0.3; // 30% of viewport

        // Only snap if we're reasonably close to a section boundary
        if (Math.abs(rect.top) < threshold) {
            isSnapping.current = true;
            closestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Reset snapping flag after animation completes
            setTimeout(() => {
                isSnapping.current = false;
            }, 500);
        }
    }, [getClosestSection, isMobile]);

    useEffect(() => {
        const handleScroll = () => {
            // Clear existing timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            lastScrollTime.current = Date.now();

            // Set new timeout for snap check
            scrollTimeoutRef.current = setTimeout(() => {
                // Calculate scroll velocity
                const timeSinceLastScroll = Date.now() - lastScrollTime.current;

                // Only snap if scroll has truly stopped (not just debounced)
                if (timeSinceLastScroll >= debounceMs) {
                    snapToSection();
                }
            }, debounceMs);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [debounceMs, snapToSection]);

    return {
        isSnapping: isSnapping.current,
    };
};

export default useSoftScrolljack;
