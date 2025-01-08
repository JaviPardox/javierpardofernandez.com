import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { startLoading, finishLoading, setError } from '../../../store/loadingSlice';

interface ImageCardProps {
  imageId: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageId }) => {
  const [imageSources, setImageSources] = useState<{
    srcSet: string;
    fallbackSrc: string;
  } | null>(null);
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const resourceId = `image-${imageId}`;

  const resolutions = [
    16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
    3840,
  ]; //dependency?

  const backendPort = process.env.REACT_APP_BACKEND_PORT;
  const serverIP = process.env.REACT_APP_SERVER_IP;
  useEffect(() => {
    setIsLoadingLocal(true)
    dispatch(startLoading(resourceId));
    const fetchImageUrls = async () => {
      try {
        const response = await axios.get(
          `http://${serverIP}:${backendPort}/images/${imageId}/urls`
        );
        
        const imageUrls = response.data.urls;
        const srcSet = resolutions
          .map((size) => {
            const url = imageUrls[size];
            return url ? `${url} ${size}w` : '';
          })
          .filter(Boolean)
          .join(', ');

        setImageSources({
          srcSet,
          fallbackSrc: imageUrls[640] || imageUrls[Object.keys(imageUrls).pop()!],
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load image';
        dispatch(setError({ resource: resourceId, error: errorMessage }))
        setLocalError(errorMessage);
      } finally {
        dispatch(finishLoading(resourceId));
        setIsLoadingLocal(false);
      }
    };

    fetchImageUrls();

    return () => {
      dispatch(finishLoading(resourceId));
      setIsLoadingLocal(false);
    };
  }, [imageId, backendPort, serverIP, dispatch, resourceId]);

  if (isLoadingLocal) {
    return (
      <div className="absolute inset-0 h-full w-full bg-zinc-700 animate-pulse" />
    );
  }

  if (localError || !imageSources) {
    return (
      <div className="absolute inset-0 h-full w-full bg-zinc-800 flex items-center justify-center">
        <span className="text-red-500">Failed to load image</span>
      </div>
    );
  }

  return (
    <img
      src={imageSources.fallbackSrc}
      srcSet={imageSources.srcSet}
      alt="javier pardo fernandez" // Consider passing alt text as a prop
      className="absolute inset-0 h-full w-full object-cover"
      loading="lazy"
      width="5760"
      height="3840"
      decoding="async"
      style={{ color: 'transparent' }}
      sizes="(min-width: 640px) 18rem, 11rem"
    />
  );
};

export default ImageCard;
