
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import FlightResultCard from './FlightResultCard';
import { mockTrips } from './mockData';
import { cn } from '@/lib/utils';

// Mock flight data for Middle Eastern destinations with official airline logo URLs
const mockFlights = [
  {
    id: 1,
    airline: 'Emirates',
    airlineCode: 'EK',
    airlineLogo: 'https://www.emirates.com/etc/designs/ecom/creative/emirates-logo.png',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '10:25 AM',
    arrivalCity: 'Dubai',
    arrivalCode: 'DXB',
    arrivalTime: '8:15 AM',
    duration: '12h 50m',
    stops: 0,
    price: 1245,
    baseFare: 1050,
    taxes: 135,
    fees: 60,
    carbonFootprint: '2.3 tonnes',
    tags: ['Direct Flight'],
    // Added properties for TripDetail component
    title: 'Cultural Dubai Experience',
    destination: 'Dubai, UAE',
    dates: 'June 10 - June 16, 2025',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    airline: 'Turkish Airlines',
    airlineCode: 'TK',
    airlineLogo: 'https://www.turkishairlines.com/theme/img/thy_logo.png',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '7:15 PM',
    arrivalCity: 'Istanbul',
    arrivalCode: 'IST',
    arrivalTime: '12:30 PM',
    duration: '10h 15m',
    stops: 0,
    price: 978,
    baseFare: 820,
    taxes: 105,
    fees: 53,
    carbonFootprint: '1.9 tonnes',
    tags: ['Lowest Price'],
    // Added properties for TripDetail component
    title: 'Magical Istanbul',
    destination: 'Istanbul, Turkey',
    dates: 'July 5 - July 12, 2025',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    airlineLogo: 'https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/brand/logo/h1-qr-logo.png',
    departureCity: 'New York',
    departureCode: 'EWR',
    departureTime: '10:30 PM',
    arrivalCity: 'Doha',
    arrivalCode: 'DOH',
    arrivalTime: '6:15 PM',
    duration: '12h 45m',
    stops: 0,
    price: 1190,
    baseFare: 990,
    taxes: 140,
    fees: 60,
    carbonFootprint: '2.1 tonnes',
    tags: ['Award Winning'],
    // Added properties for TripDetail component
    title: 'Magical Doha',
    destination: 'Doha, Qatar',
    dates: 'September 8 - September 15, 2025',
    image: 'https://images.unsplash.com/photos/a-kdjff86zE?auto=format&fit=crop&q=80',
  }
];

// Create a mapping between flight data and mockTrips data for consistent experience
const enrichFlightData = (flight: any) => {
  // Find the corresponding trip in mockTrips if it exists
  const matchingTrip = mockTrips.find(trip => 
    trip.destination === flight.destination || 
    trip.title === flight.title
  );
  
  if (matchingTrip) {
    return {
      ...flight,
      activities: matchingTrip.activities,
      hotel: matchingTrip.hotel,
      duration: matchingTrip.duration
    };
  }
  
  return flight;
};

interface TripListProps {
  trips?: any[];
  loading: boolean;
  onViewTrip: (trip: any) => void;
  selectedTrip?: any;
}

const TripList = ({ trips, loading, onViewTrip, selectedTrip }: TripListProps) => {
  console.log('TripList rendering - loading state:', loading);
  
  const isSelected = (flight: any) => {
    return selectedTrip && selectedTrip.id === flight.id;
  };
  
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
    <div className="space-y-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-medium">Flight Options</h3>
        <p className="text-sm text-gray-500">3 results found</p>
      </div>
      
      {mockFlights.map((flight) => (
        <FlightResultCard 
          key={flight.id}
          flight={flight}
          onClick={() => onViewTrip(enrichFlightData(flight))}
          isSelected={isSelected(flight)}
        />
      ))}
    </div>
  );
};

export default TripList;
