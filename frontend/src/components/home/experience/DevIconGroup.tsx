import React from "react";
import DevIcon from "./DevIcon";
import FadeOnScroll from '../../common/FadeOnScroll';

interface DevIconGroupProps {
  isHovered: boolean;
  icons: { content: string; iconClass?: string; customIcon?: string }[];
}

const randomDelay = (min: number, max: number) => Math.random() * (max - min) + min;

const DevIconGroup: React.FC<DevIconGroupProps> = ({ isHovered, icons }) => {
  const increasingFactor = 2
  const maxDelay = icons.length / (10 * increasingFactor);

  return (
    <ul className="text-center text-2xl flex mt-4 gap-3 flex-wrap mt-6 text-zinc-300">
      {icons.map((icon, index) => (
        <FadeOnScroll delay={randomDelay(0.1, maxDelay)}>
          <DevIcon
            key={index}
            content={icon.content}
            iconClass={icon.iconClass}
            isHovered={isHovered}
            customIcon={icon.customIcon}
          />
        </FadeOnScroll>
      ))}
    </ul>
  );
};

export default DevIconGroup;
