import React, { useState } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { mockTrips } from '../mockData';
import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';
import { Sliders, Info, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import FlightListCard from './FlightListCard';

// --- Copy of mockFlights and enrichFlightData from v1 ---
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
    title: 'Budget Abu Dhabi',
    destination: 'Abu Dhabi, UAE',
    dates: 'September 8 - September 15, 2025',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbcef7845?auto=format&fit=crop&q=80',
  }
];

const enrichFlightData = (flight: any) => {
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
// --- End copy ---

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
          <div className="h-24 w-24 rounded-lg loading-skeleton"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 w-3/4 rounded loading-skeleton"></div>
            <div className="h-4 w-1/2 rounded loading-skeleton"></div>
            <div className="flex items-center space-x-4">
              <div className="h-4 w-24 rounded loading-skeleton"></div>
              <div className="h-4 w-24 rounded loading-skeleton"></div>
            </div>
          </div>
          <div className="h-8 w-24 rounded loading-skeleton"></div>
        </div>
      </div>
    ))}
  </div>
);

// New component for Quick Price Filters
const QuickPriceFilters = ({ airlines, selectedAirlines, onAirlineSelect }) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {airlines.map((airline) => (
          <button
            key={airline.id}
            onClick={() => onAirlineSelect(
              selectedAirlines.includes(airline.id)
                ? selectedAirlines.filter(id => id !== airline.id)
                : [...selectedAirlines, airline.id]
            )}
            className={cn(
              "flex items-center justify-between p-2.5 rounded-lg border transition-all h-[52px]",
              selectedAirlines.includes(airline.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="flex items-center gap-2.5">
              <img 
                src={airline.logo} 
                alt={airline.name} 
                className="h-5 w-5 rounded bg-gray-100"
              />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900 leading-none">{airline.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">₹{airline.priceRange}</div>
              </div>
            </div>
            {selectedAirlines.includes(airline.id) && (
              <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const TripList = ({ trips, loading, onViewTrip, selectedTrip }: TripListProps) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selectedPriceCategory, setSelectedPriceCategory] = useState<'cheapest' | 'best' | 'quickest'>('best');
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedQuickFilters, setSelectedQuickFilters] = useState<string[]>([]);

  // For demonstration, create FlightLegOption objects for each flight (same as v1)
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

  // Mock airlines data with price ranges
  const airlines = [
    {
      id: 'emirates',
      name: 'Emirates',
      logo: 'https://airhex.com/images/airline-logos/emirates.png',
      priceRange: '45,717 - 65,909'
    },
    {
      id: 'etihad',
      name: 'Etihad Airways',
      logo: 'https://airhex.com/images/airline-logos/etihad-airways.png',
      priceRange: '47,000 - 68,000'
    },
    {
      id: 'qatar',
      name: 'Qatar Airways',
      logo: 'https://airhex.com/images/airline-logos/qatar-airways.png',
      priceRange: '46,000 - 67,000'
    },
    {
      id: 'turkish',
      name: 'Turkish Airlines',
      logo: 'https://airhex.com/images/airline-logos/turkish-airlines.png',
      priceRange: '44,000 - 64,000'
    }
  ];

  // Initialize selected airlines with all airlines when component mounts
  React.useEffect(() => {
    const allAirlineIds = airlines.map(a => a.id);
    setSelectedAirlines(allAirlineIds);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleQuickFilterSelect = (airlineId: string) => {
    // If the airline is already selected, deselect it
    if (selectedQuickFilters.includes(airlineId)) {
      const newSelectedFilters = selectedQuickFilters.filter(id => id !== airlineId);
      setSelectedQuickFilters(newSelectedFilters);
      // If no quick filters are selected, reset to all airlines
      if (newSelectedFilters.length === 0) {
        setSelectedAirlines(airlines.map(a => a.id));
      }
    } else {
      // Add the new airline to selected quick filters
      setSelectedQuickFilters([...selectedQuickFilters, airlineId]);
      // Clear left side airline selections
      setSelectedAirlines([]);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  // For the summary card, use the first roundTripOption as the default selection
  const summaryOption = roundTripOptions[0];

  return (
    <div>
      {/* Price Category Summary Cards */}
      <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex">
          <div className={cn(
            "flex-1 border-r border-gray-200 p-2.5 text-center relative",
            selectedPriceCategory === 'cheapest' && "bg-blue-50 border-b-2 border-b-blue-600"
          )}
          onClick={() => setSelectedPriceCategory('cheapest')}
          >
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip open={activeTooltip === 'cheapest'} onOpenChange={() => setActiveTooltip(activeTooltip === 'cheapest' ? null : 'cheapest')}>
                  <TooltipTrigger asChild>
                    <button className="focus:outline-none" onClick={() => setActiveTooltip(activeTooltip === 'cheapest' ? null : 'cheapest')}>
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
          <div className={cn(
            "flex-1 border-r border-gray-200 p-2.5 text-center relative",
            selectedPriceCategory === 'best' && "bg-blue-50 border-b-2 border-b-blue-600"
          )}
          onClick={() => setSelectedPriceCategory('best')}
          >
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip open={activeTooltip === 'best'} onOpenChange={() => setActiveTooltip(activeTooltip === 'best' ? null : 'best')}>
                  <TooltipTrigger asChild>
                    <button className="focus:outline-none" onClick={() => setActiveTooltip(activeTooltip === 'best' ? null : 'best')}>
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
          <div className={cn(
            "flex-1 p-2.5 text-center relative",
            selectedPriceCategory === 'quickest' && "bg-blue-50 border-b-2 border-b-blue-600"
          )}
          onClick={() => setSelectedPriceCategory('quickest')}
          >
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip open={activeTooltip === 'quickest'} onOpenChange={() => setActiveTooltip(activeTooltip === 'quickest' ? null : 'quickest')}>
                  <TooltipTrigger asChild>
                    <button className="focus:outline-none" onClick={() => setActiveTooltip(activeTooltip === 'quickest' ? null : 'quickest')}>
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
      {/* Summary Card (non-interactive, just summary) */}
      <div className="rounded-xl border border-gray-200 mb-6 overflow-hidden">
        <FlightListCard
          outboundFlight={summaryOption.outboundFlight}
          returnFlight={summaryOption.returnFlight}
          price={summaryOption.price}
          currency={summaryOption.currency}
          onBook={() => onViewTrip(summaryOption)}
          showOptions={false}
        />
        {/* Flight details link/section - just below summary row */}
        <div className="px-4 py-1.5 flex items-start">
          <button className="text-blue-600 text-sm font-medium hover:underline" onClick={() => {}}>Flight details</button>
        </div>
        {/* Divider after Flight Details Link */}
        <div className="border-t border-gray-100" />
        {/* Quick Price Filters inside summary card */}
        <div className="pt-3 pb-4 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {airlines.map((airline) => (
              <button
                key={airline.id}
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-lg border transition-all h-[52px]",
                  selectedQuickFilters.includes(airline.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
                onClick={() => handleQuickFilterSelect(airline.id)}
              >
                <div className="flex items-center gap-2.5">
                  <img 
                    src={airline.logo} 
                    alt={airline.name} 
                    className="h-5 w-5 rounded bg-gray-100"
                  />
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900 leading-none">{airline.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">₹{airline.priceRange}</div>
                  </div>
                </div>
                {selectedQuickFilters.includes(airline.id) && (
                  <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Outbound and Inbound Flight Lists inside summary card */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Outbound List */}
            <div>
              <div className="mb-2 text-xs font-semibold text-gray-700">
                {summaryOption.outboundFlight.departureCode} → {summaryOption.outboundFlight.arrivalCode} · {summaryOption.outboundFlight.date}
              </div>
              <div className="flex flex-col gap-2">
                {roundTripOptions.map((option, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      "rounded-md border px-3 py-2 min-w-[180px] text-left transition-all",
                      idx === 0 ? "border-blue-500 bg-blue-50 font-semibold" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                    )}
                    // TODO: Add selection logic if needed
                  >
                    <div className="flex items-center gap-3 py-1">
                      <img src={option.outboundFlight.airlineLogo} alt={option.outboundFlight.airlineName} className="h-5 w-8 object-contain bg-white border rounded" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-black">{option.outboundFlight.departureTime}–{option.outboundFlight.arrivalTime}</span>
                          <span className="text-gray-500 text-xs">{option.outboundFlight.departureCode}–{option.outboundFlight.arrivalCode}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{option.outboundFlight.airlineName}</span>
                          <span>· {option.outboundFlight.stops}</span>
                          {option.outboundFlight.layover && <span>· {option.outboundFlight.layover}</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Inbound List */}
            <div>
              <div className="mb-2 text-xs font-semibold text-gray-700">
                {summaryOption.returnFlight.departureCode} → {summaryOption.returnFlight.arrivalCode} · {summaryOption.returnFlight.date}
              </div>
              <div className="flex flex-col gap-2">
                {roundTripOptions.map((option, idx) => (
                  <button
                    key={idx}
                    className={cn(
                      "rounded-md border px-3 py-2 min-w-[180px] text-left transition-all",
                      idx === 0 ? "border-blue-500 bg-blue-50 font-semibold" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                    )}
                    // TODO: Add selection logic if needed
                  >
                    <div className="flex items-center gap-3 py-1">
                      <img src={option.returnFlight.airlineLogo} alt={option.returnFlight.airlineName} className="h-5 w-8 object-contain bg-white border rounded" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-black">{option.returnFlight.departureTime}–{option.returnFlight.arrivalTime}</span>
                          <span className="text-gray-500 text-xs">{option.returnFlight.departureCode}–{option.returnFlight.arrivalCode}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{option.returnFlight.airlineName}</span>
                          <span>· {option.returnFlight.stops}</span>
                          {option.returnFlight.layover && <span>· {option.returnFlight.layover}</span>}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripList; 