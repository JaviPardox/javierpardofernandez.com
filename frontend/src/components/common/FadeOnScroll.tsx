import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useContentReady } from "../../store/ContentReadyContext";

type AnimationVariant = 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'parallax' | 'pop' | 'flip';

interface FadeOnScrollProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  amount?: number;
  /** Animation variant - defaults to fade for backwards compatibility */
  variant?: AnimationVariant;
  /** Duration of the animation in seconds */
  duration?: number;
  /** Parallax strength (only applies when variant is 'parallax') */
  parallaxStrength?: number;
  /** Enable flashy mode - adds rotation, blur, and spring physics */
  flashy?: boolean;
  /** Custom viewport margin for the intersection observer */
  viewportMargin?: string;
}

// Animation configurations for each variant - with optional flashy effects
const getVariantStyles = (
  variant: AnimationVariant,
  shouldAnimate: boolean,
  flashy: boolean,
  parallaxY?: any
) => {
  // Base flashy additions
  const flashyInitial = flashy ? {
    rotate: variant === 'slide-left' ? 3 : variant === 'slide-right' ? -3 : 2,
    filter: 'blur(8px)',
  } : {};

  const flashyAnimate = flashy ? {
    rotate: 0,
    filter: 'blur(0px)',
  } : {};

  switch (variant) {
    case 'slide-up':
      return {
        initial: { opacity: 0, y: 80, scale: flashy ? 0.95 : 1, ...flashyInitial },
        animate: {
          opacity: shouldAnimate ? 1 : 0,
          y: shouldAnimate ? 0 : 80,
          scale: shouldAnimate ? 1 : (flashy ? 0.95 : 1),
          ...flashyAnimate
        },
      };
    case 'slide-left':
      return {
        initial: { opacity: 0, x: 80, ...flashyInitial },
        animate: {
          opacity: shouldAnimate ? 1 : 0,
          x: shouldAnimate ? 0 : 80,
          ...flashyAnimate
        },
      };
    case 'slide-right':
      return {
        initial: { opacity: 0, x: -80, ...flashyInitial },
        animate: {
          opacity: shouldAnimate ? 1 : 0,
          x: shouldAnimate ? 0 : -80,
          ...flashyAnimate
        },
      };
    case 'scale':
      return {
        initial: { opacity: 0, scale: 0.7, ...flashyInitial },
        animate: {
          opacity: shouldAnimate ? 1 : 0,
          scale: shouldAnimate ? 1 : 0.7,
          ...flashyAnimate
        },
      };
    case 'pop':
      // Extra flashy pop effect with bigger scale and rotation
      return {
        initial: { opacity: 0, scale: 0.5, rotate: -10, filter: 'blur(10px)' },
        animate: {
          opacity: shouldAnimate ? 1 : 0,
          scale: shouldAnimate ? 1 : 0.5,
          rotate: shouldAnimate ? 0 : -10,
          filter: shouldAnimate ? 'blur(0px)' : 'blur(10px)',
        },
      };
    case 'flip':
      // 3D flip effect
      return {
        initial: { opacity: 0, rotateX: 90, y: 40 },
        animate: {
          opacity: shouldAnimate ? 1 : 0,
          rotateX: shouldAnimate ? 0 : 90,
          y: shouldAnimate ? 0 : 40,
        },
      };
    case 'parallax':
      return {
        initial: { opacity: 0, ...flashyInitial },
        animate: { opacity: shouldAnimate ? 1 : 0, ...flashyAnimate },
        style: { y: parallaxY },
      };
    case 'fade':
    default:
      return {
        initial: { opacity: 0, ...(flashy ? { scale: 0.98, filter: 'blur(4px)' } : {}) },
        animate: {
          opacity: shouldAnimate ? 1 : 0,
          ...(flashy ? { scale: shouldAnimate ? 1 : 0.98, filter: shouldAnimate ? 'blur(0px)' : 'blur(4px)' } : {})
        },
      };
  }
};

// Spring transition for bouncy, flashy feel
const getTransition = (duration: number, delay: number, flashy: boolean) => {
  if (flashy) {
    return {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay,
    };
  }
  return {
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1]
  };
};

const FadeOnScroll = ({
  children,
  className = "",
  id,
  delay = 0,
  amount = 0.9,
  variant = 'fade',
  duration = 0.6,
  parallaxStrength = 0.15,
  flashy = false,
  viewportMargin,
}: FadeOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [margin, setMargin] = useState<string>("-150px 0px -100px 0px");
  const { isContentReady } = useContentReady();

  // Scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxStrength * 100, -parallaxStrength * 100]
  );

  useEffect(() => {
    // If custom viewportMargin is provided, use it and don't listen to resize
    if (viewportMargin) {
      setMargin(viewportMargin);
      return;
    }

    const updateMargin = () => {
      if (window.innerWidth < 640) {
        setMargin("-50px 0px 0px 0px");
      } else {
        setMargin("-150px 0px -100px 0px");
      }
    };

    updateMargin();
    window.addEventListener('resize', updateMargin);
    return () => window.removeEventListener('resize', updateMargin);
  }, [viewportMargin]);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
    margin: margin as any
  });

  // Only animate if both content is ready AND element is in view
  const shouldAnimate = isContentReady && isInView;

  const variantStyles = getVariantStyles(variant, shouldAnimate, flashy, parallaxY);

  return (
    <motion.div
      ref={ref}
      initial={variantStyles.initial}
      animate={variantStyles.animate}
      style={variantStyles.style}
      transition={getTransition(duration, delay, flashy)}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
};

export default FadeOnScroll;



