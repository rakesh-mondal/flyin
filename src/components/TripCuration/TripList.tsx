import React, { useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import FlightResultCard from './FlightResultCard';
import { mockTrips } from './mockData';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Sliders, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

const LoadingSkeleton = () => (
  <div className="space-y-4 p-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-start space-x-4">
          {/* Image skeleton */}
          <div className="h-24 w-24 rounded-lg loading-skeleton"></div>
          
          {/* Content skeleton */}
          <div className="flex-1 space-y-3">
            <div className="h-6 w-3/4 rounded loading-skeleton"></div>
            <div className="h-4 w-1/2 rounded loading-skeleton"></div>
            <div className="flex items-center space-x-4">
              <div className="h-4 w-24 rounded loading-skeleton"></div>
              <div className="h-4 w-24 rounded loading-skeleton"></div>
            </div>
          </div>
          
          {/* Price skeleton */}
          <div className="h-8 w-24 rounded loading-skeleton"></div>
        </div>
      </div>
    ))}
  </div>
);

const TripList = ({ trips, loading, onViewTrip, selectedTrip }: TripListProps) => {
  console.log('TripList rendering - loading state:', loading);
  
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  const isSelected = (flight: any) => {
    return selectedTrip && selectedTrip.id === flight.id;
  };

  const handleTooltipClick = (tooltipId: string) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };
  
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      {/* Sort options */}
      <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex">
          <div className="flex-1 border-r border-gray-200 p-2.5 text-center relative">
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip open={activeTooltip === 'cheapest'} onOpenChange={() => handleTooltipClick('cheapest')}>
                  <TooltipTrigger asChild>
                    <button 
                      className="focus:outline-none"
                      onClick={() => handleTooltipClick('cheapest')}
                    >
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="end" className="w-[280px] p-4 bg-white border border-gray-200 shadow-lg rounded-lg text-left">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <p className="font-semibold text-gray-900">Cheapest Flight Option</p>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-sm text-gray-600 text-left">Lowest price available for your route</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-sm text-gray-600 text-left">May include longer layovers</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-sm text-gray-600 text-left">Best for budget-conscious travelers</p>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                          <span className="text-sm font-medium text-gray-900">Current best deal:</span>
                          <span className="text-sm font-semibold text-blue-600">₹45,717</span>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-sm text-gray-500">Cheapest</div>
              <div className="text-xs text-gray-500">28h 00m</div>
            </div>
            <div className="font-bold text-lg">₹45,717</div>
          </div>
          <div className="flex-1 border-r border-gray-200 p-2.5 text-center bg-blue-50 border-b-2 border-b-blue-600 relative">
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip open={activeTooltip === 'best'} onOpenChange={() => handleTooltipClick('best')}>
                  <TooltipTrigger asChild>
                    <button 
                      className="focus:outline-none"
                      onClick={() => handleTooltipClick('best')}
                    >
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="end" className="w-[280px] p-4 bg-white border border-gray-200 shadow-lg rounded-lg text-left">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <p className="font-semibold text-gray-900">AI Recommended Best Option</p>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-sm text-gray-600 text-left">Optimal balance of price and comfort</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-sm text-gray-600 text-left">Popular choice among travelers</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-sm text-gray-600 text-left">Good airline ratings and reviews</p>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                          <span className="text-sm font-medium text-gray-900">Current price:</span>
                          <span className="text-sm font-semibold text-blue-600">₹59,035</span>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-sm font-medium">Best</div>
              <div className="text-xs text-gray-500">10h 15m</div>
            </div>
            <div className="font-bold text-lg">₹59,035</div>
          </div>
          <div className="flex-1 p-2.5 text-center relative">
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip open={activeTooltip === 'quickest'} onOpenChange={() => handleTooltipClick('quickest')}>
                  <TooltipTrigger asChild>
                    <button 
                      className="focus:outline-none"
                      onClick={() => handleTooltipClick('quickest')}
                    >
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="end" className="w-[280px] p-4 bg-white border border-gray-200 shadow-lg rounded-lg text-left">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <p className="font-semibold text-gray-900">Fastest Travel Option</p>
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-sm text-gray-600 text-left">Shortest total travel time</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-sm text-gray-600 text-left">Minimal layover duration</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5 flex-shrink-0">•</span>
                          <p className="text-sm text-gray-600 text-left">Ideal for time-sensitive travelers</p>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                          <span className="text-sm font-medium text-gray-900">Current duration:</span>
                          <span className="text-sm font-semibold text-blue-600">10h 15m</span>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-sm text-gray-500">Quickest</div>
              <div className="text-xs text-gray-500">10h 15m</div>
            </div>
            <div className="font-bold text-lg">₹59,035</div>
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
