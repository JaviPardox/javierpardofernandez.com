import React from 'react';
import ImageCard from './ImageCard';  // Import ImageCard

interface CardProps {
  imageFolder?: string;   // Optional folder path for image versions
  imageName?: string;     // Optional image name (without extension)
  rotation?: number;      // Optional rotation
}

const Card: React.FC<CardProps> = ({ imageFolder, imageName, rotation = 0 }) => {
  return (
    <div
      className={`relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-800 sm:w-72 sm:rounded-2xl`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Conditionally render ImageCard if image props are passed */}
      {imageFolder && imageName && (
        <ImageCard imageFolder={imageFolder} imageName={imageName} />
      )}
    </div>
  );
};

export default Card;
