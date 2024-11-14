import React from 'react';
import ImageCard from './ImageCard';

interface CardProps {
  imageId: string;
  rotation?: number;
}

const Card: React.FC<CardProps> = ({ imageId, rotation = 0 }) => {
  return (
    <div
      className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-800 sm:w-72 sm:rounded-2xl`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <ImageCard imageId={imageId} />
    </div>
  );
};

export default Card;
