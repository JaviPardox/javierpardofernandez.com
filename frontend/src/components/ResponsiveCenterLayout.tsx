import React from 'react';

const ResponsiveCenterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-openai-dark text-openai-light min-h-screen flex justify-center">
        {/* div className="ring-1 ring-zinc-300/20 fixed inset-0 bg-openai-center-content z-0 max-w-[76rem] mx-auto"></div> */}
      <div className="ring-1 ring-zinc-300/20 bg-openai-center-content w-full max-w-[76rem] min-w-[20rem] sm:mx-8 relative z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCenterLayout;