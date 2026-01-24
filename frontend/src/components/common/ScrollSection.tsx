import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useContentReady } from '../../store/ContentReadyContext';

type AnimationVariant = 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'none';

interface ScrollSectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
    /** Animation variant for the section entrance */
    variant?: AnimationVariant;
    /** Enable parallax effect on children */
    parallax?: boolean;
    /** Parallax strength (-1 to 1, negative moves opposite to scroll) */
    parallaxStrength?: number;
    /** Delay before animation starts (seconds) */
    delay?: number;
    /** Duration of the animation (seconds) */
    duration?: number;
    /** Enable scroll-based data attribute for scrolljacking */
    enableScrolljack?: boolean;
}

const variants = {
    hidden: {
        fade: { opacity: 0 },
        'slide-up': { opacity: 0, y: 100 },
        'slide-left': { opacity: 0, x: 80 },
        'slide-right': { opacity: 0, x: -80 },
        scale: { opacity: 0, scale: 0.85 },
        none: {},
    },
    visible: {
        fade: { opacity: 1 },
        'slide-up': { opacity: 1, y: 0 },
        'slide-left': { opacity: 1, x: 0 },
        'slide-right': { opacity: 1, x: 0 },
        scale: { opacity: 1, scale: 1 },
        none: {},
    },
};

/**
 * ScrollSection - A section wrapper with scroll-linked animations
 * Supports various entrance animations and optional parallax effects
 * Waits for content ready state (after loading screen) before animating
 */
const ScrollSection = ({
    children,
    id,
    className = '',
    variant = 'fade',
    parallax = false,
    parallaxStrength = 0.2,
    delay = 0,
    duration = 0.6,
    enableScrolljack = true,
}: ScrollSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { isContentReady } = useContentReady();

    const isInView = useInView(ref, {
        once: true,
        amount: 0.15,
        margin: '-50px' as any,
    });

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Parallax transform
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [parallaxStrength * 100, -parallaxStrength * 100]
    );

    const sectionContent = parallax ? (
        <motion.div style={{ y }}>{children}</motion.div>
    ) : (
        children
    );

    // Only animate if both content is ready AND element is in view
    const shouldAnimate = isContentReady && isInView;

    return (
        <motion.section
            ref={ref}
            id={id}
            className={className}
            data-scroll-section={enableScrolljack ? '' : undefined}
            initial={variants.hidden[variant]}
            animate={shouldAnimate ? variants.visible[variant] : variants.hidden[variant]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {sectionContent}
        </motion.section>
    );
};

export default ScrollSection;

