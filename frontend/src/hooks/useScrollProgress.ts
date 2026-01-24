import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useCallback, RefObject } from 'react';

interface ScrollProgressOptions {
    container?: RefObject<HTMLElement>;
    offset?: [string, string];
}

interface ScrollProgress {
    progress: number;
    direction: 'up' | 'down' | null;
    velocity: number;
}

/**
 * Custom hook to track scroll progress and direction
 * Uses framer-motion's useScroll for performance
 */
export const useScrollProgress = (options: ScrollProgressOptions = {}): ScrollProgress => {
    const [progress, setProgress] = useState(0);
    const [direction, setDirection] = useState<'up' | 'down' | null>(null);
    const [velocity, setVelocity] = useState(0);
    const [lastY, setLastY] = useState(0);

    const { scrollYProgress, scrollY } = useScroll({
        container: options.container,
        offset: options.offset as any,
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        setProgress(latest);
    });

    useMotionValueEvent(scrollY, 'change', (latest) => {
        // Calculate velocity from position change
        const delta = latest - lastY;
        setVelocity(Math.abs(delta));

        if (latest > lastY) {
            setDirection('down');
        } else if (latest < lastY) {
            setDirection('up');
        }
        setLastY(latest);
    });

    return { progress, direction, velocity };
};

/**
 * Hook to get scroll progress for a specific element
 */
export const useElementScrollProgress = (
    target: RefObject<HTMLElement>,
    offset: [string, string] = ['start end', 'end start']
) => {
    const { scrollYProgress } = useScroll({
        target,
        offset: offset as any,
    });

    return scrollYProgress;
};

export default useScrollProgress;
