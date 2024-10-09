import React from 'react';
import HashtagListItem from './HashtagListItem';

interface HashtagListProps {
  items: string[];
}

const HashtagList: React.FC<HashtagListProps> = ({ items }) => {
  return (
    <ul className="mt-6 gap-1 md:gap-2 flex flex-wrap">
      {items.map((item, index) => (
        <HashtagListItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default HashtagList;
