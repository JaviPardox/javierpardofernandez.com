import React from 'react';
import ImageCard from './ImageCard';

interface CardProps {
  imageId: string;
  rotation?: number;
}

const Card: React.FC<CardProps> = ({ imageId, rotation = 0 }) => {
  return (
    <div
      className={`relative aspect-[9/10] w-60 flex-none rounded-xl bg-zinc-800 sm:w-72 sm:rounded-2xl isolate`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
      <ImageCard imageId={imageId} />
      </div>
    </div>
  );
};

export default Card;
