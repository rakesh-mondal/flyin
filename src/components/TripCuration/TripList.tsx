
import React from 'react';
import TripProposal from '../TripProposal';
import { Skeleton } from '../ui/skeleton';

interface TripListProps {
  trips: any[];
  loading: boolean;
  onViewTrip: (trip: any) => void;
}

const TripList = ({ trips, loading, onViewTrip }: TripListProps) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="h-52 animate-pulse bg-gray-200"></div>
            <div className="p-4">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
              <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {trips.map((trip) => (
        <TripProposal 
          key={trip.id}
          trip={trip}
          onClick={() => onViewTrip(trip)}
        />
      ))}
    </div>
  );
};

export default TripList;
