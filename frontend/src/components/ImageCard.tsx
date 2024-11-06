import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { startLoading, finishLoading } from '../store/loadingSlice';

interface ImageCardProps {
  imageFolder: string; // Path to the folder containing image versions
  imageName: string; // Image name (without extension)
}

const ImageCard: React.FC<ImageCardProps> = ({ imageFolder, imageName }) => {
  const dispatch = useDispatch();
  const resourceId = `image-${imageFolder}-${imageName}`;

  const resolutions = [
    16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
    3840,
  ];

  // Dynamically generate srcSet string
  const srcSet = resolutions
    .map((size) => `${imageFolder}/${imageName}-${size}.jpeg ${size}w`)
    .join(", ");

  // Fallback image (largest version)
  const fallbackSrc = `${imageFolder}/${imageName}-3840.jpeg`;

  useEffect(() => {
    // Start loading state
    dispatch(startLoading(resourceId));

    // Preload the largest image to track loading state
    const img = new Image();
    img.src = fallbackSrc;
    
    // Create a promise that resolves when the image loads
    const loadPromise = new Promise((resolve, reject) => {
      img.onload = resolve; // Called when image loads successfully
      img.onerror = reject; // Called if image fails to load
    });

    // Handle both success and failure
    loadPromise
      .then(() => {
        dispatch(finishLoading(resourceId));
      })
      .catch((error) => {
        console.error(`Failed to load image: ${fallbackSrc}`, error);
        dispatch(finishLoading(resourceId));
      });

    // Cleanup function
    // In case component stops mounting
    return () => {
      dispatch(finishLoading(resourceId));
    };
  }, [fallbackSrc, dispatch, resourceId]);

  return (
    <img
      src={fallbackSrc}
      srcSet={srcSet}
      alt="javier pardo fernandez"
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      width="5760"
      height="3840"
      decoding="async"
      style={{ color: "transparent" }}
      sizes="(min-width: 640px) 18rem, 11rem"
    />
  );
};

export default ImageCard;
