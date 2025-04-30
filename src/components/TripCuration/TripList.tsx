
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import FlightResultCard from './FlightResultCard';
import FlightInsights from './FlightInsights';
import { InsightProps } from './FlightInsights';

// Mock flight data for Middle Eastern destinations
const mockFlights = [
  {
    id: 1,
    airline: 'Emirates',
    airlineCode: 'EK',
    airlineLogo: 'https://logos-world.net/wp-content/uploads/2021/08/Emirates-Logo.png',
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
  },
  {
    id: 2,
    airline: 'Turkish Airlines',
    airlineCode: 'TK',
    airlineLogo: 'https://logos-world.net/wp-content/uploads/2021/08/Turkish-Airlines-Logo.png',
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
  },
  {
    id: 3,
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    airlineLogo: 'https://logos-world.net/wp-content/uploads/2021/08/Qatar-Airways-Logo.png',
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
  }
];

// Mock AI insights for Middle Eastern travel
const mockInsights: InsightProps[] = [
  {
    type: 'info',
    content: 'The best time to visit Dubai is between November and March when the weather is pleasant.'
  },
  {
    type: 'price-drop',
    content: 'Flights to Istanbul are currently 15% lower than average for June.'
  },
  {
    type: 'warning',
    content: 'Summer temperatures in the Middle East can exceed 40°C (104°F). Consider booking activities in the morning or evening.'
  }
];

interface TripListProps {
  trips?: any[];
  loading: boolean;
  onViewTrip: (trip: any) => void;
}

const TripList = ({ trips, loading, onViewTrip }: TripListProps) => {
  console.log('TripList rendering - loading state:', loading);
  
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
      <FlightInsights insights={mockInsights} />
      
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
