import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-40 gap-6">
      <p className="text-2xl text-font-primary font-family-primary font-semibold">
        Loading the data...
      </p>
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
