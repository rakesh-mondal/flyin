
import React from 'react';
import MainCuration from './MainCuration';

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
  searchSource?: 'fly' | 'ai';
}

export default function TripCuration({ 
  searchQuery, 
  onBack, 
  onViewTrip,
  searchSource = 'fly'
}: TripCurationProps) {
  return (
    <MainCuration 
      searchQuery={searchQuery} 
      onBack={onBack} 
      onViewTrip={onViewTrip}
      searchSource={searchSource}
    />
  );
}
