import React from 'react';

const AboutMeSectionSkeleton = ({ muiComponents }) => {
  if (!muiComponents) return null;
  return (
    <div className="flex overflow-hidden items-stretch w-full max-w-4xl mx-6 rounded-2xl shadow-lg border border-medium">
      {/* Sidebar skeleton */}
      <div className="min-w-[20%] max-w-[20%] gradient-primary p-6 flex items-center justify-center border-r border-medium">
        <muiComponents.Skeleton 
          variant="text" 
          width="80%" 
          height={24}
          sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}
        />
      </div>
      {/* Main content skeleton */}
      <div className="bg-bg-secondary p-6 flex-grow">
        <muiComponents.Skeleton 
          variant="text" 
          width="100%" 
          height={20}
          sx={{ bgcolor: 'var(--color-border-light)', mb: 1 }}
        />
        <muiComponents.Skeleton 
          variant="text" 
          width="85%" 
          height={20}
          sx={{ bgcolor: 'var(--color-border-light)', mb: 1 }}
        />
        <muiComponents.Skeleton 
          variant="text" 
          width="70%" 
          height={20}
          sx={{ bgcolor: 'var(--color-border-light)' }}
        />
      </div>
    </div>
  );
};

export default AboutMeSectionSkeleton;
