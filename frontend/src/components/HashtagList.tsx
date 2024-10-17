import React from 'react';
import HashtagListItem from './HashtagListItem';

interface HashtagListProps {
  items: string[];
}

const HashtagList: React.FC<HashtagListProps> = ({ items }) => {
  return (
    <ul className="mt-6 gap-1 md:gap-2 flex flex-wrap text-zinc-300">
      {items.map((item, index) => (
        <HashtagListItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default HashtagList;
