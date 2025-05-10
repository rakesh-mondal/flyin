import React from 'react';
import MainCuration from './MainCuration';

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
  version: 'v2' | 'v3';
}

export default function TripCuration({ searchQuery, onBack, onViewTrip, version }: TripCurationProps) {
  return (
    <MainCuration 
      searchQuery={searchQuery} 
      onBack={onBack} 
      onViewTrip={onViewTrip}
      version={version}
    />
  );
}
