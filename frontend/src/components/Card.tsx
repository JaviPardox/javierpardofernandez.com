import React from 'react';

interface CardProps {
  rotation?: number; // Optional rotation
}

const Card: React.FC<CardProps> = ({ rotation = 0 }) => {
  return (
    <div
      className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-800 sm:w-72 sm:rounded-2xl`}
      style={{ transform: `rotate(${rotation}deg)` }}
    ></div>
  );
};

export default Card;
