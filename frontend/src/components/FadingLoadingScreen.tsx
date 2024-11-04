import React from 'react';
import { PulseLoader, ClipLoader, BeatLoader, RingLoader, HashLoader } from 'react-spinners';

const FadingLoadingScreen = () => {
  return (
    <div className="relative flex flex-col items-center gap-4 animate-contentFadeIn">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl font-light text-zinc">Welcome</p>
      </div>
      <HashLoader color="#14b8a6" size={65} />
    </div>
  );
};

export default FadingLoadingScreen;