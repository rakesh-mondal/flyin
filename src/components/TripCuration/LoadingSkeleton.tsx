
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Card } from '../ui/card';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-2 w-32" />
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
