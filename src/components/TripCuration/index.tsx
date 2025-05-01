
import React from 'react';
import MainCuration from './MainCuration';

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
}

export default function TripCuration({ searchQuery, onBack, onViewTrip }: TripCurationProps) {
  return (
    <MainCuration 
      searchQuery={searchQuery} 
      onBack={onBack} 
      onViewTrip={onViewTrip} 
    />
  );
}
