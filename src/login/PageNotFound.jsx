import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 px-4">
      <div className="text-center">
        <h1 className="text-6xl sm:text-4xl md:text-5xl lg:text-6xl text-red-600 font-bold mb-4">
          404
        </h1>
        <p className="text-lg sm:text-base md:text-lg text-gray-700">
          Oops! The page you’re looking for doesn’t exist.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
