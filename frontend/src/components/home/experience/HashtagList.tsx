import React from 'react';
import HashtagListItem from './HashtagListItem';
import FadeOnScroll from '../../common/FadeOnScroll';

interface HashtagListProps {
  items: string[];
}

const randomDelay = (min: number, max: number) => Math.random() * (max - min) + min;

const HashtagList: React.FC<HashtagListProps> = ({ items }) => {
  const increasingFactor = 2
  const maxDelay = items.length / (10 * increasingFactor);
  
  return (
    <ul className="mt-6 gap-1 md:gap-2 flex flex-wrap text-zinc-300">
      {items.map((item, index) => (
        <FadeOnScroll delay={randomDelay(0.1, maxDelay)}>
          <HashtagListItem key={index} item={item} />
        </FadeOnScroll>
      ))}
    </ul>
  );
};

export default HashtagList;
