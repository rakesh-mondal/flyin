
import React, { useState } from 'react';
import { toast } from 'sonner';
import FlightCard from './FlightCard';
import SortOptions from './SortOptions';
import SponsoredBanner from './SponsoredBanner';
import LoadingSkeleton from './LoadingSkeleton';
import { mockFlights } from './mockFlights';

interface TripListProps {
  trips?: any[];
  loading: boolean;
  onViewTrip: (trip: any) => void;
  selectedTrip?: any;
}

const TripList: React.FC<TripListProps> = ({ 
  trips, 
  loading, 
  onViewTrip, 
  selectedTrip 
}) => {
  const [savedTrips, setSavedTrips] = useState<number[]>([]);
  const [activeSort, setActiveSort] = useState<'best' | 'cheapest' | 'quickest'>('best');
  
  const isSelected = (flight: any) => {
    return selectedTrip && selectedTrip.id === flight.id;
  };
  
  const toggleSaveTrip = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedTrips.includes(id)) {
      setSavedTrips(savedTrips.filter(tripId => tripId !== id));
      toast.success("Trip removed from saved trips");
    } else {
      setSavedTrips([...savedTrips, id]);
      toast.success("Trip saved to your collection");
    }
  };
  
  const shareTrip = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Trip sharing link copied to clipboard");
  };

  const handleInfoClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info("Flight details", {
      description: "This shows complete flight information including layovers, aircraft type, and amenities."
    });
  };

  const getSortedFlights = () => {
    // In a real app, we would sort the actual flight data based on activeSort
    // For this demo, we'll just return the mock data
    return mockFlights;
  };
  
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      {/* Sort options */}
      <SortOptions 
        activeSort={activeSort} 
        setActiveSort={setActiveSort} 
      />

      {/* Sponsored Banner */}
      <SponsoredBanner />

      {/* Flight cards list */}
      <div className="space-y-4">
        {getSortedFlights().map((flight) => (
          <FlightCard 
            key={flight.id}
            flight={flight}
            isSelected={isSelected(flight)}
            onClick={() => onViewTrip(flight)}
            onSave={toggleSaveTrip}
            onShare={shareTrip}
            onInfo={handleInfoClick}
            isSaved={savedTrips.includes(flight.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TripList;
