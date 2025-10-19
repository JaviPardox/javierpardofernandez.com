import React from 'react';

interface AvatarImageProps {
  imageId: string;
  [key: string]: any;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ imageId, ...props }) => {
  const resolutions = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
  
  const srcSet = resolutions
    .map(size => `/img/${imageId}/${imageId}-${size}.jpeg ${size}w`)
    .join(', ');

  return (
    <img
      {...props}
      alt="javier pardo fernandez"
      // @ts-ignore -- fetchpriority is a valid HTML attribute but not yet in React types
      fetchpriority="high"
      width="512"
      height="512"
      decoding="async"
      className="rounded-full bg-zinc-800 object-cover h-16 w-16"
      sizes="4rem"
      srcSet={srcSet}
      src={`/img/${imageId}/${imageId}-3840.jpeg`}
      style={{ color: "transparent" }}
    />
  );
};

export default AvatarImage;