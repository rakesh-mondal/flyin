
import React from 'react';
import { Header } from './trip-detail/Header';
import { FlightSummary } from './trip-detail/FlightSummary';
import { FlightDetails } from './trip-detail/FlightDetails';
import { PriceBreakdown } from './trip-detail/PriceBreakdown';
import { TailoredRecommendations } from './trip-detail/TailoredRecommendations';
import { BookingSection } from './trip-detail/BookingSection';

interface TripDetailProps {
  trip: any;
  onBack: () => void;
}

// Default fallback image for trips without images
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?auto=format&fit=crop&q=80';

export default function TripDetail({ trip, onBack }: TripDetailProps) {
  // Ensure we have a valid title
  const tripTitle = trip.title || `${trip.arrivalCity || 'Destination'} Journey`;
  
  // Ensure we have a valid destination
  const tripDestination = trip.destination || (trip.arrivalCity ? `${trip.arrivalCity}, ${trip.arrivalCode}` : 'Unknown Destination');

  return (
    <div className="flex h-screen w-full flex-col bg-apple-gray text-apple-black">
      {/* Header with background image */}
      <Header 
        image={trip.image || DEFAULT_IMAGE}
        title={tripTitle}
        destination={tripDestination}
        onBack={onBack}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* Flight summary */}
        <FlightSummary 
          dates={trip.dates || ''} 
          duration={trip.flight?.duration || trip.duration || ''} 
          price={trip.price || 0}
        />

        {/* Flight details */}
        {(trip.flight || trip.airline) && (
          <FlightDetails 
            departure={trip.flight?.departure || trip.departureTime || ''} 
            arrival={trip.flight?.arrival || trip.arrivalTime || ''}
            airline={trip.flight?.airline || trip.airline || ''}
            duration={trip.flight?.duration || trip.duration || ''}
          />
        )}

        {/* Price breakdown */}
        <PriceBreakdown price={trip.price || 0} />

        {/* Tailored recommendations */}
        <TailoredRecommendations />

        {/* Booking section */}
        <BookingSection price={trip.price || 0} />
      </div>
    </div>
  );
}
