import React from 'react';

interface HastagListItemProps {
  item: string;
}

const HastagListItem: React.FC<HastagListItemProps> = ({ item }) => {
  return (
    <li>
      <span className="uppercase text-xs font-semibold bg-gradient-to-r from-teal-800 to-teal-400 px-1.5 py-0.5 rounded-md bg-none bg-zinc-700 inline-block">
        #{item}
      </span>
    </li>
  );
};

export default HastagListItem;
