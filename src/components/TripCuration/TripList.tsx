
import React, { useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { mockTrips } from './mockData';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Sliders, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import FlightResultCard from './FlightListCard';

// Mock flight data for Middle Eastern destinations with official airline logos
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

  // For demonstration, create FlightLegOption objects for each flight
  const roundTripOptions = [
    {
      outboundFlight: {
        airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[0].airlineCode.toLowerCase()}_350_100_r.png`,
        airlineName: mockFlights[0].airline,
        departureTime: mockFlights[0].departureTime,
        arrivalTime: mockFlights[0].arrivalTime,
        departureCode: mockFlights[0].departureCode,
        arrivalCode: mockFlights[0].arrivalCode,
        departureCity: mockFlights[0].departureCity,
        arrivalCity: mockFlights[0].arrivalCity,
        duration: mockFlights[0].duration,
        stops: mockFlights[0].stops === 0 ? 'non-stop' : `${mockFlights[0].stops} stop${mockFlights[0].stops > 1 ? 's' : ''}`,
        date: 'May 7, 2025',
        layover: mockFlights[0].stops > 0 ? '2h in Dubai' : undefined,
      },
      returnFlight: {
        airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[1].airlineCode.toLowerCase()}_350_100_r.png`,
        airlineName: mockFlights[1].airline,
        departureTime: mockFlights[1].departureTime,
        arrivalTime: mockFlights[1].arrivalTime,
        departureCode: mockFlights[1].departureCode,
        arrivalCode: mockFlights[1].arrivalCode,
        departureCity: mockFlights[1].departureCity,
        arrivalCity: mockFlights[1].arrivalCity,
        duration: mockFlights[1].duration,
        stops: mockFlights[1].stops === 0 ? 'non-stop' : `${mockFlights[1].stops} stop${mockFlights[1].stops > 1 ? 's' : ''}`,
        date: 'May 14, 2025',
        layover: mockFlights[1].stops > 0 ? '1h in Mumbai' : undefined,
      },
      price: mockFlights[0].price.toString(),
      currency: '₹',
      stock: '1 Left at this price',
      coupon: 'Book for ₹500 off using coupon FLY',
      promoBanner: 'Enjoy up to ₹500 off, use code SPRING Know more',
      baggageTag: 'Hand baggage only',
      moreOptions: [
        {
          outbound: {
            airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[0].airlineCode.toLowerCase()}_350_100_r.png`,
            airlineName: mockFlights[0].airline,
            departureTime: '22:00',
            arrivalTime: '06:00',
            departureCode: mockFlights[0].departureCode,
            arrivalCode: mockFlights[0].arrivalCode,
            departureCity: mockFlights[0].departureCity,
            arrivalCity: mockFlights[0].arrivalCity,
            duration: '8h 00m',
            stops: 'non-stop',
            date: 'May 7, 2025',
          },
          return: {
            airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[1].airlineCode.toLowerCase()}_350_100_r.png`,
            airlineName: mockFlights[1].airline,
            departureTime: '12:00',
            arrivalTime: '20:00',
            departureCode: mockFlights[1].departureCode,
            arrivalCode: mockFlights[1].arrivalCode,
            departureCity: mockFlights[1].departureCity,
            arrivalCity: mockFlights[1].arrivalCity,
            duration: '8h 00m',
            stops: 'non-stop',
            date: 'May 14, 2025',
          },
        },
        {
          outbound: {
            airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[0].airlineCode.toLowerCase()}_350_100_r.png`,
            airlineName: mockFlights[0].airline,
            departureTime: '23:30',
            arrivalTime: '07:30',
            departureCode: mockFlights[0].departureCode,
            arrivalCode: mockFlights[0].arrivalCode,
            departureCity: mockFlights[0].departureCity,
            arrivalCity: mockFlights[0].arrivalCity,
            duration: '8h 00m',
            stops: 'non-stop',
            date: 'May 7, 2025',
          },
          return: {
            airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[1].airlineCode.toLowerCase()}_350_100_r.png`,
            airlineName: mockFlights[1].airline,
            departureTime: '14:00',
            arrivalTime: '22:00',
            departureCode: mockFlights[1].departureCode,
            arrivalCode: mockFlights[1].arrivalCode,
            departureCity: mockFlights[1].departureCity,
            arrivalCity: mockFlights[1].arrivalCity,
            duration: '8h 00m',
            stops: 'non-stop',
            date: 'May 14, 2025',
          },
        },
      ],
    },
    {
      outboundFlight: {
        airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[2].airlineCode.toLowerCase()}_350_100_r.png`,
        airlineName: mockFlights[2].airline,
        departureTime: mockFlights[2].departureTime,
        arrivalTime: mockFlights[2].arrivalTime,
        departureCode: mockFlights[2].departureCode,
        arrivalCode: mockFlights[2].arrivalCode,
        departureCity: mockFlights[2].departureCity,
        arrivalCity: mockFlights[2].arrivalCity,
        duration: mockFlights[2].duration,
        stops: mockFlights[2].stops === 0 ? 'non-stop' : `${mockFlights[2].stops} stop${mockFlights[2].stops > 1 ? 's' : ''}`,
        date: 'May 7, 2025',
        layover: mockFlights[2].stops > 0 ? '3h in Abu Dhabi' : undefined,
      },
      returnFlight: {
        airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[0].airlineCode.toLowerCase()}_350_100_r.png`,
        airlineName: mockFlights[0].airline,
        departureTime: mockFlights[0].departureTime,
        arrivalTime: mockFlights[0].arrivalTime,
        departureCode: mockFlights[0].departureCode,
        arrivalCode: mockFlights[0].arrivalCode,
        departureCity: mockFlights[0].departureCity,
        arrivalCity: mockFlights[0].arrivalCity,
        duration: mockFlights[0].duration,
        stops: mockFlights[0].stops === 0 ? 'non-stop' : `${mockFlights[0].stops} stop${mockFlights[0].stops > 1 ? 's' : ''}`,
        date: 'May 14, 2025',
        layover: mockFlights[0].stops > 0 ? '2h in Dubai' : undefined,
      },
      price: mockFlights[2].price.toString(),
      currency: '₹',
      stock: '2 Left at this price',
      coupon: 'Book for ₹400 off using coupon FLY',
      promoBanner: 'Special deal for early birds!',
      baggageTag: 'Hand baggage only',
      moreOptions: [
        {
          outbound: {
            airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[2].airlineCode.toLowerCase()}_350_100_r.png`,
            airlineName: mockFlights[2].airline,
            departureTime: '09:00',
            arrivalTime: '18:00',
            departureCode: mockFlights[2].departureCode,
            arrivalCode: mockFlights[2].arrivalCode,
            departureCity: mockFlights[2].departureCity,
            arrivalCity: mockFlights[2].arrivalCity,
            duration: '9h 00m',
            stops: '1 stop',
            date: 'May 7, 2025',
          },
          return: {
            airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[0].airlineCode.toLowerCase()}_350_100_r.png`,
            airlineName: mockFlights[0].airline,
            departureTime: '20:00',
            arrivalTime: '05:00',
            departureCode: mockFlights[0].departureCode,
            arrivalCode: mockFlights[0].arrivalCode,
            departureCity: mockFlights[0].departureCity,
            arrivalCity: mockFlights[0].arrivalCity,
            duration: '9h 00m',
            stops: '1 stop',
            date: 'May 14, 2025',
          },
        },
        {
          outbound: {
            airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[2].airlineCode.toLowerCase()}_350_100_r.png`,
            airlineName: mockFlights[2].airline,
            departureTime: '13:00',
            arrivalTime: '22:00',
            departureCode: mockFlights[2].departureCode,
            arrivalCode: mockFlights[2].arrivalCode,
            departureCity: mockFlights[2].departureCity,
            arrivalCity: mockFlights[2].arrivalCity,
            duration: '9h 00m',
            stops: '1 stop',
            date: 'May 7, 2025',
          },
          return: {
            airlineLogo: `https://content.airhex.com/content/logos/airlines_${mockFlights[0].airlineCode.toLowerCase()}_350_100_r.png`,
            airlineName: mockFlights[0].airline,
            departureTime: '23:00',
            arrivalTime: '08:00',
            departureCode: mockFlights[0].departureCode,
            arrivalCode: mockFlights[0].arrivalCode,
            departureCity: mockFlights[0].departureCity,
            arrivalCity: mockFlights[0].arrivalCity,
            duration: '9h 00m',
            stops: '1 stop',
            date: 'May 14, 2025',
          },
        },
      ],
    },
  ];

  // Initialize selected indices arrays based on roundTripOptions length
  const [selectedOutboundIdxArr, setSelectedOutboundIdxArr] = useState(() => Array(roundTripOptions.length).fill(0));
  const [selectedReturnIdxArr, setSelectedReturnIdxArr] = useState(() => Array(roundTripOptions.length).fill(0));

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
        {roundTripOptions.map((option, idx) => {
          // Compose outbound and return options arrays, adding a 'date' property
          const outboundOptions = [option.outboundFlight, ...option.moreOptions.map(opt => opt.outbound)].map((opt, i) => ({
            ...(opt as any),
            date: (opt as any).date || `2025-06-0${i + 1}`
          }));
          const returnOptions = [option.returnFlight, ...option.moreOptions.map(opt => opt.return)].map((opt, i) => ({
            ...(opt as any),
            date: (opt as any).date || `2025-06-1${i + 1}`
          }));

          // Use lifted state
          const selectedOutboundIdx = selectedOutboundIdxArr[idx] || 0;
          const selectedReturnIdx = selectedReturnIdxArr[idx] || 0;

          const handleSelectOutbound = (newIdx: number) => {
            setSelectedOutboundIdxArr(arr => {
              const copy = [...arr];
              copy[idx] = newIdx;
              return copy;
            });
          };
          const handleSelectReturn = (newIdx: number) => {
            setSelectedReturnIdxArr(arr => {
              const copy = [...arr];
              copy[idx] = newIdx;
              return copy;
            });
          };

          return (
            <FlightResultCard
              key={idx}
              outboundOptions={outboundOptions}
              returnOptions={returnOptions}
              selectedOutboundIdx={selectedOutboundIdx}
              selectedReturnIdx={selectedReturnIdx}
              price={option.price}
              currency={option.currency}
              coupon={option.coupon}
              nonRefundable={true}
              onSelectOutbound={handleSelectOutbound}
              onSelectReturn={handleSelectReturn}
              onBook={() => onViewTrip(option)}
              onDetails={() => onViewTrip(option)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TripList;
