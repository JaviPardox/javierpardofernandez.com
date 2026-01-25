import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import DevIconGroup from "./DevIconGroup";
import HashtagList from "./HashtagList";
import BriefcaseIconWork from "./BriefcaseIconWork";
import CompanyAndDateInfo from "./CompanyAndDateInfo";
import JobTitleAndDescription from "./JobTitleAndDescription";
import { WorkExperienceItem } from "../../../types";
import { ReactNode } from "react";

// Spring config for smooth scroll-linked animations
const springConfig = {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
};

interface PinnedExperienceEntryProps {
    experience: WorkExperienceItem;
    index: number;
    totalEntries: number;
    scrollYProgress: MotionValue<number>;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
}

const PinnedExperienceEntry = ({
    experience,
    index,
    totalEntries,
    scrollYProgress,
    hoveredIndex,
    setHoveredIndex,
}: PinnedExperienceEntryProps) => {
    // Each entry gets an equal chunk of the scroll progress
    const segmentSize = 1 / totalEntries;
    const entryStart = index * segmentSize;
    const entryEnd = (index + 1) * segmentSize;

    // For the first entry, start fully visible
    const fadeInStart = index === 0 ? 0 : entryStart;
    const fadeInEnd = index === 0 ? 0 : entryStart + segmentSize * 0.2;

    // Fade out near the end of this entry's segment
    const fadeOutStart = entryEnd - segmentSize * 0.2;
    const fadeOutEnd = entryEnd;

    // Raw opacity from scroll position
    const rawOpacity = useTransform(
        scrollYProgress,
        index === 0
            ? [0, fadeOutStart, fadeOutEnd]
            : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        index === 0
            ? [1, 1, 0]
            : [0, 1, 1, 0]
    );

    // Raw Y position from scroll
    const rawY = useTransform(
        scrollYProgress,
        index === 0
            ? [0, fadeOutStart, fadeOutEnd]
            : [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        index === 0
            ? [0, 0, -50]
            : [50, 0, 0, -50]
    );

    // Raw scale from scroll
    const rawScale = useTransform(
        scrollYProgress,
        [entryStart, (entryStart + entryEnd) / 2, entryEnd],
        [0.97, 1, 0.97]
    );

    // Apply spring smoothing for buttery smooth transitions
    const opacity = useSpring(rawOpacity, springConfig);
    const y = useSpring(rawY, springConfig);
    const scale = useSpring(rawScale, springConfig);

    // Disable pointer events when not visible to allow hover on visible entries
    const pointerEvents = useTransform(rawOpacity, (v) => v > 0.5 ? "auto" : "none");

    return (
        <motion.article
            className="absolute inset-x-0 top-0"
            style={{
                opacity,
                y,
                scale,
                pointerEvents,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            <div className="lg:grid md:grid-cols-4 lg:items-baseline group">
                <div className="relative">
                    <BriefcaseIconWork />
                    <CompanyAndDateInfo info={experience.companyAndDateInfo} />
                </div>
                <div className="md:col-span-3 relative flex flex-col items-start">
                    <span className="hidden lg:block absolute -inset-x-4 -inset-y-6 z-[-1] scale-95 bg-zinc-800/50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"></span>
                    <JobTitleAndDescription
                        position={experience.jobPosition}
                        description={experience.jobDescription}
                    />
                    <HashtagList items={experience.hashtags} />
                    <DevIconGroup
                        isHovered={hoveredIndex === index}
                        icons={experience.icons}
                    />
                </div>
            </div>
        </motion.article>
    );
};



interface PinnedExperienceContentProps {
    experiences: WorkExperienceItem[];
    title?: ReactNode;
}

const PinnedExperienceContent = ({ experiences, title }: PinnedExperienceContentProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const totalEntries = experiences.length;

    // Each entry gets 70vh of scroll space (slightly less for faster pacing)
    const scrollPerEntry = 70;
    const runwayHeight = `${totalEntries * scrollPerEntry}vh`;

    // Track scroll progress through this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: runwayHeight }}
        >
            {/* Sticky title */}
            {title && (
                <div className="sticky top-4 z-10 bg-gradient-to-b from-[#050505] via-[#050505] to-transparent pb-8">
                    {title}
                </div>
            )}

            {/* Sticky container that holds the current entry */}
            <div className="sticky top-20 min-h-[50vh] overflow-y-clip overflow-x-visible">
                <div className="md:border-l md:pl-6 md:border-zinc-700/40 relative min-h-[400px] ml-10 md:ml-0">
                    {experiences.map((experience, index) => (
                        <PinnedExperienceEntry
                            key={index}
                            experience={experience}
                            index={index}
                            totalEntries={totalEntries}
                            scrollYProgress={scrollYProgress}
                            hoveredIndex={hoveredIndex}
                            setHoveredIndex={setHoveredIndex}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PinnedExperienceContent;

