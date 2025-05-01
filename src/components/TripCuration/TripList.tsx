
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import FlightResultCard from './FlightResultCard';
import { mockTrips } from './mockData';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Sliders } from 'lucide-react';

// Mock flight data for Middle Eastern destinations with official airline logo URLs
const mockFlights = [
  {
    id: 1,
    airline: 'Emirates',
    airlineCode: 'EK',
    airlineLogo: 'https://www.emirates.com/etc/designs/ecom/creative/emirates-logo.png',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '21:00',
    arrivalCity: 'Dubai',
    arrivalCode: 'DXB',
    arrivalTime: '07:05',
    duration: '14h 35m',
    stops: 1,
    price: 65909,
    baseFare: 1050,
    taxes: 135,
    fees: 60,
    carbonFootprint: '2.3 tonnes',
    tags: ['Eco Saver'],
    // Added properties for TripDetail component
    title: 'Cultural Dubai Experience',
    destination: 'Dubai, UAE',
    dates: 'June 10 - June 16, 2025',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    airline: 'Air India',
    airlineCode: 'AI',
    airlineLogo: 'https://airindia.com/content/dam/airindia/logos/airindia-logo.svg',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '14:20',
    arrivalCity: 'Dubai',
    arrivalCode: 'DXB',
    arrivalTime: '20:20',
    duration: '10h 30m',
    stops: 0,
    price: 59035,
    baseFare: 820,
    taxes: 105,
    fees: 53,
    carbonFootprint: '1.9 tonnes',
    tags: ['Direct Flight'],
    // Added properties for TripDetail component
    title: 'Business Dubai',
    destination: 'Dubai, UAE',
    dates: 'July 5 - July 12, 2025',
    image: 'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    airline: 'Etihad Airways',
    airlineCode: 'EY',
    airlineLogo: 'https://www.etihad.com/content/dam/etihad/global/logo/etihad-logo.svg',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '10:00',
    arrivalCity: 'Abu Dhabi',
    arrivalCode: 'AUH',
    arrivalTime: '07:00',
    duration: '25h 30m',
    stops: 1,
    price: 45717,
    baseFare: 990,
    taxes: 140,
    fees: 60,
    carbonFootprint: '2.1 tonnes',
    tags: ['Cheapest'],
    // Added properties for TripDetail component
    title: 'Budget Abu Dhabi',
    destination: 'Abu Dhabi, UAE',
    dates: 'September 8 - September 15, 2025',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbcef7845?auto=format&fit=crop&q=80',
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
    <div>
      {/* Sort options */}
      <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex">
          <div className="flex-1 border-r border-gray-200 p-3 text-center">
            <div className="text-sm text-gray-500">Cheapest</div>
            <div className="font-bold">$45,717</div>
            <div className="text-xs text-gray-500">28h 00m</div>
          </div>
          <div className="flex-1 border-r border-gray-200 p-3 text-center bg-blue-50 border-b-2 border-b-blue-600">
            <div className="text-sm font-medium">Best</div>
            <div className="font-bold">$59,035</div>
            <div className="text-xs text-gray-500">10h 15m</div>
          </div>
          <div className="flex-1 p-3 text-center">
            <div className="text-sm text-gray-500">Quickest</div>
            <div className="font-bold">$59,035</div>
            <div className="text-xs text-gray-500">10h 15m</div>
          </div>
        </div>
      </div>

      {/* Flight cards list */}
      <div className="space-y-4">
        {mockFlights.map((flight) => (
          <FlightResultCard 
            key={flight.id}
            flight={flight}
            onClick={() => onViewTrip(enrichFlightData(flight))}
            isSelected={isSelected(flight)}
          />
        ))}
      </div>
    </div>
  );
};

export default TripList;
