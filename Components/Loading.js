import React from 'react';

const Loading = () => {
  return (
    <div className="">
      <div className="relative w-20 h-20 border-8 border-t-transparent border-b-transparent border-l-transparent border-r-purple-700 rounded-full animate-spin shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-transparent border-b-transparent border-l-transparent border-r-purple-400 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
