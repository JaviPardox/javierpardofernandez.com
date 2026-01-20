import React from 'react';
import InteractiveDotMesh from './common/InteractiveDotMesh';

const ResponsiveCenterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <InteractiveDotMesh />
      <div className="bg-openai-dark text-openai-light min-h-[calc(100vh-144px)] sm:min-h-[calc(100vh-102px)] flex justify-center">
        {/* div className="ring-1 ring-zinc-300/20 fixed inset-0 bg-openai-center-content z-0 max-w-[76rem] mx-auto"></div> */}
        <div className="sm:border-t sm:border-x sm:border-zinc-300/20 sm:border-b-zinc-700/40 sm:border border-b-zinc-700/40 border-b bg-openai-center-content w-full max-w-[76rem] min-w-[20rem] sm:mx-[5%] relative z-10">
          <div className="px-2 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveCenterLayout;