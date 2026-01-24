import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { useContentReady } from '../../store/ContentReadyContext';

type AnimationType = 'words' | 'characters' | 'lines';

interface AnimatedTextProps {
    text: string;
    className?: string;
    /** Animation type - how to split the text */
    type?: AnimationType;
    /** Whether animation is scroll-linked or just on enter */
    scrollLinked?: boolean;
    /** Delay between each word/character (seconds) */
    staggerDelay?: number;
    /** Base animation delay (seconds) */
    delay?: number;
    /** Animation duration for each element (seconds) */
    duration?: number;
    /** Tag to use for the container */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    /** Preserve line breaks in text */
    preserveLineBreaks?: boolean;
}

/**
 * AnimatedText - Text reveal animation component
 * Splits text into words or characters and animates them sequentially
 * Waits for content ready state (after loading screen) before animating
 */
const AnimatedText = ({
    text,
    className = '',
    type = 'words',
    scrollLinked = false,
    staggerDelay = 0.03,
    delay = 0,
    duration = 0.5,
    as: Tag = 'div',
    preserveLineBreaks = false,
}: AnimatedTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isContentReady } = useContentReady();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.9', 'start 0.4'],
    });

    // Split text based on type
    const elements = useMemo(() => {
        if (type === 'characters') {
            return text.split('').map((char, i) => ({
                content: char === ' ' ? '\u00A0' : char,
                key: `char-${i}`,
            }));
        }
        if (type === 'lines' && preserveLineBreaks) {
            return text.split('\n').map((line, i) => ({
                content: line,
                key: `line-${i}`,
                isLine: true,
            }));
        }
        // Default: words
        return text.split(' ').map((word, i) => ({
            content: word,
            key: `word-${i}`,
        }));
    }, [text, type, preserveLineBreaks]);

    // Animation variants for each element
    const elementVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            filter: 'blur(4px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
        },
    };

    // Container variants for stagger
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    // For scroll-linked animation, we transform scroll progress to opacity/y per element
    const ScrollLinkedElement = ({ content, index }: { content: string; index: number }) => {
        // Calculate when this element should animate based on its index
        const elementStart = index / elements.length;
        const elementEnd = (index + 1) / elements.length;

        const opacity = useTransform(
            scrollYProgress,
            [elementStart, elementEnd],
            [0, 1]
        );

        const y = useTransform(
            scrollYProgress,
            [elementStart, elementEnd],
            [20, 0]
        );

        const blur = useTransform(
            scrollYProgress,
            [elementStart, elementEnd],
            [4, 0]
        );

        return (
            <motion.span
                style={{
                    opacity,
                    y,
                    filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none',
                }}
                className="inline-block"
            >
                {content}
                {type === 'words' && '\u00A0'}
            </motion.span>
        );
    };

    if (scrollLinked) {
        return (
            <Tag ref={containerRef as any} className={className}>
                {elements.map((el, index) => (
                    <ScrollLinkedElement
                        key={el.key}
                        content={el.content}
                        index={index}
                    />
                ))}
            </Tag>
        );
    }

    // Use animate prop controlled by isContentReady instead of whileInView
    // This ensures animations wait for loading screen to complete
    return (
        <motion.div
            ref={containerRef}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={isContentReady ? "visible" : "hidden"}
        >
            <Tag className="flex flex-wrap">
                {elements.map((el) => (
                    <motion.span
                        key={el.key}
                        variants={elementVariants}
                        transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
                        className="inline-block"
                    >
                        {el.content}
                        {type === 'words' && '\u00A0'}
                    </motion.span>
                ))}
            </Tag>
        </motion.div>
    );
};

export default AnimatedText;

