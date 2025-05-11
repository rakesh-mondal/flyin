import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TripCuration from '@/components/TripCuration';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery();
  const navigate = useNavigate();

  // Extract search query from URL, e.g., /search?query=...
  const searchQuery = query.get('query') || '';

  const handleBack = () => {
    navigate('/');
  };

  const handleViewTrip = (trip: any) => {
    // You can navigate to a trip detail page or handle as needed
    // For now, just log
    console.log('View trip:', trip);
  };

  return (
    <TripCuration
      searchQuery={searchQuery}
      onBack={handleBack}
      onViewTrip={handleViewTrip}
      version="v2"
    />
  );
};

export default SearchPage; 