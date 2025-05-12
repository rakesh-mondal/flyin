import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TripCuration from '@/components/TripCuration';

const Curation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get('query') || '';

  const handleBack = () => navigate('/');

  const handleViewTrip = (trip: any) => {
    navigate('/Booking', { state: { trip } });
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

export default Curation; 