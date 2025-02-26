import React from 'react';

const AvatarImage: React.FC = (props) => {
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
      srcSet="
        /img/avatar/avatar-16.jpeg 16w,
        /img/avatar/avatar-32.jpeg 32w, 
        /img/avatar/avatar-48.jpeg 48w, 
        /img/avatar/avatar-64.jpeg 64w, 
        /img/avatar/avatar-96.jpeg 96w, 
        /img/avatar/avatar-128.jpeg 128w, 
        /img/avatar/avatar-256.jpeg 256w, 
        /img/avatar/avatar-384.jpeg 384w, 
        /img/avatar/avatar-640.jpeg 640w, 
        /img/avatar/avatar-750.jpeg 750w, 
        /img/avatar/avatar-828.jpeg 828w, 
        /img/avatar/avatar-1080.jpeg 1080w, 
        /img/avatar/avatar-1200.jpeg 1200w, 
        /img/avatar/avatar-1920.jpeg 1920w, 
        /img/avatar/avatar-2048.jpeg 2048w, 
        /img/avatar/avatar-3840.jpeg 3840w"
      src="/img/avatar/avatar-3840.jpeg"
      style={{ color: "transparent" }}
    />
  );
};

export default AvatarImage;