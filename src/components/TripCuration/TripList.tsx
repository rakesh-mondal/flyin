
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import FlightResultCard from './FlightResultCard';
import AIInsights from './AIInsights';

// Mock flight data
const mockFlights = [
  {
    id: 1,
    airline: 'Delta Airlines',
    airlineCode: 'DL',
    airlineLogo: 'https://logos-world.net/wp-content/uploads/2021/08/Delta-Logo.png',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '08:45 AM',
    arrivalCity: 'Rome',
    arrivalCode: 'FCO',
    arrivalTime: '11:20 PM',
    duration: '8h 35m',
    stops: 0,
    price: 875,
    baseFare: 720,
    taxes: 95,
    fees: 60,
    carbonFootprint: '1.2 tonnes',
    tags: ['Fastest Route'],
  },
  {
    id: 2,
    airline: 'United Airlines',
    airlineCode: 'UA',
    airlineLogo: 'https://logos-world.net/wp-content/uploads/2021/09/United-Airlines-Logo.png',
    departureCity: 'New York',
    departureCode: 'EWR',
    departureTime: '10:15 AM',
    arrivalCity: 'Rome',
    arrivalCode: 'FCO',
    arrivalTime: '02:45 PM',
    duration: '9h 30m',
    stops: 1,
    layoverInfo: '2h 15m in London (LHR)',
    price: 748,
    baseFare: 590,
    taxes: 105,
    fees: 53,
    carbonFootprint: '1.4 tonnes',
    tags: ['Lowest Price'],
  },
  {
    id: 3,
    airline: 'Lufthansa',
    airlineCode: 'LH',
    airlineLogo: 'https://logos-world.net/wp-content/uploads/2021/11/Lufthansa-Logo.png',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '06:30 PM',
    arrivalCity: 'Rome',
    arrivalCode: 'FCO',
    arrivalTime: '09:15 AM',
    duration: '8h 45m',
    stops: 0,
    price: 920,
    baseFare: 750,
    taxes: 110,
    fees: 60,
    carbonFootprint: '0.9 tonnes',
    tags: ['Eco-Friendly'],
  }
];

// Mock AI insights
const mockInsights = [
  {
    type: 'info' as const,
    content: 'Booking 3 weeks in advance is usually cheapest for New York to Rome routes.'
  },
  {
    type: 'price-drop' as const,
    content: 'Prices for this route are currently 12% lower than average for September.'
  },
  {
    type: 'warning' as const,
    content: 'Rome airports may experience delays in September due to seasonal maintenance.'
  }
];

interface TripListProps {
  trips?: any[];
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
    <div className="space-y-4">
      <AIInsights insights={mockInsights} />
      
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-medium">Flight Options</h3>
        <p className="text-sm text-gray-500">3 results found</p>
      </div>
      
      {mockFlights.map((flight) => (
        <FlightResultCard 
          key={flight.id}
          flight={flight}
          onClick={() => onViewTrip(flight)}
        />
      ))}
    </div>
  );
};

export default TripList;
