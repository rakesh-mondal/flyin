
import React, { useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import FlightResultCard from './FlightResultCard';
import { mockTrips } from './mockData';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Share2, Heart } from 'lucide-react';
import { toast } from 'sonner';

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
  const [savedTrips, setSavedTrips] = useState<number[]>([]);
  
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
          <div 
            key={flight.id}
            onClick={() => onViewTrip(enrichFlightData(flight))}
            className={cn(
              "overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all cursor-pointer",
              isSelected(flight) && "ring-2 ring-blue-500"
            )}
          >
            {/* Card header with image */}
            <div className="relative h-40">
              <img 
                src={flight.image} 
                alt={flight.destination} 
                className="h-full w-full object-cover"
              />
              <div className="absolute top-3 right-3 flex space-x-2">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => toggleSaveTrip(flight.id, e)}
                >
                  <Heart 
                    className={cn(
                      "h-4 w-4", 
                      savedTrips.includes(flight.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                    )} 
                  />
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => shareTrip(flight.id, e)}
                >
                  <Share2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                <h3 className="text-xl font-medium">{flight.title}</h3>
                <p className="text-sm text-white/90">{flight.destination}</p>
              </div>
            </div>

            {/* Card body */}
            <div className="p-4">
              {/* Flight info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <img 
                    src={flight.airlineLogo} 
                    alt={flight.airline} 
                    className="h-6 object-contain" 
                  />
                  <span className="text-sm font-medium">{flight.airline}</span>
                </div>
                <div className="text-sm text-gray-500">{flight.dates}</div>
              </div>
              
              {/* Route info */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold">{flight.departureCode}</div>
                  <div className="text-sm text-gray-500">{flight.departureTime}</div>
                </div>
                <div className="flex-1 mx-3">
                  <div className="relative h-0.5 w-full bg-gray-200">
                    <div className="absolute -top-1 left-1/2 h-2 w-2 -ml-1 rounded-full bg-gray-400"></div>
                  </div>
                  <div className="text-xs text-center mt-1 text-gray-500">{flight.duration}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{flight.arrivalCode}</div>
                  <div className="text-sm text-gray-500">{flight.arrivalTime}</div>
                </div>
              </div>
              
              {/* Price and tags */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {flight.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total price</div>
                  <div className="font-bold text-lg">${(flight.price / 1000).toFixed(3)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripList;
