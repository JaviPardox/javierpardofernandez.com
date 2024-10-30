import React from 'react';

const FadingLoadingScreen = () => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700
        animate-fadeInOut"
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* Custom loading animation */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-8 border-gray-200 rounded-full" />
          <div 
            className="absolute inset-0 border-8 border-blue-500 rounded-full animate-spin" 
            style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }} 
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-medium text-gray-800">Loading</p>
          <div className="flex gap-1">
            <div 
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
              style={{ animationDelay: '0ms' }} 
            />
            <div 
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
              style={{ animationDelay: '150ms' }} 
            />
            <div 
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
              style={{ animationDelay: '300ms' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FadingLoadingScreen;