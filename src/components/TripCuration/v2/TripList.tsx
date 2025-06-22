import React, { useState } from 'react';
import { Skeleton } from '../../ui/skeleton';
import { mockTrips } from '../mockData';
import { cn, formatDate, formatNumber } from '@/lib/utils';
import { Button } from '../../ui/button';
import { Sliders, Info, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import FlightListCard from './FlightListCard';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from '@/translations';

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
const QuickPriceFilters = ({ airlines, selectedAirlines, onAirlineSelect, isArabic, t }) => {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <h3 className="text-sm font-semibold text-gray-800 mb-2.5">Quick Filters</h3>
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
                className="h-5 w-5 rounded object-contain bg-white p-0.5 border border-gray-100"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-left cursor-pointer">
                <div className="text-sm font-medium text-gray-900 leading-none">{airline.name}</div>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="w-[260px] p-4 bg-white border border-gray-200 shadow-lg rounded-lg text-left">
                    <div className="space-y-1">
                      <div className="font-semibold text-gray-900">{airline.name} ({airline.iata})</div>
                      <div className="text-xs text-gray-500 mb-1">{airline.country} · {airline.alliance}</div>
                      <div className="flex items-center gap-2 text-xs">
                        <span>⭐ {airline.rating}</span>
                        <span>On-time: {airline.onTime}%</span>
                      </div>
                      <div className="text-xs">Baggage: {airline.baggage}</div>
                      <div className="text-xs">WiFi: {airline.wifi ? 'Yes' : 'No'}</div>
                      <div className="text-xs">Meal: {airline.meal}</div>
                      <div className="text-xs italic text-gray-600 mt-1">"{airline.review}"</div>
                      <a href={airline.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline hover:text-[#194E91] mt-1 block">Visit website</a>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="text-left">
                <div className="flex items-center gap-1 mt-0.5">
                  {airline.hasSpecialReturn ? (
                    <>
                      <div className="text-xs text-gray-500">₹{formatNumber(airline.specialReturnPrice, isArabic)}</div>
                                             <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-yellow-100 text-yellow-700 border border-yellow-300">
                         {t('returnDeal')}
                       </span>
                    </>
                  ) : (
                    <div className="text-xs text-gray-500">₹{formatNumber(airline.price, isArabic)}</div>
                  )}
                </div>
              </div>
            </div>
            
            {selectedAirlines.includes(airline.id) && !airline.hasSpecialReturn && (
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Component for price range filters
const PriceRangeFilters = ({ ranges, selectedRange, onChange }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {ranges.map((range) => (
        <button
          key={range.id}
          onClick={() => onChange(range.id === selectedRange ? null : range.id)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
            range.id === selectedRange
              ? "bg-blue-50 border-blue-500 text-blue-700"
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

// Improved DatesCard component
function DatesCard({ dates, selectedIdx, onSelect }) {
  // Find lowest price for green highlight
  const minPrice = Math.min(...dates.map(d => d.price));
  
  // Calculate visible date indices with better logic
  const visibleDates = [];
  const totalToShow = Math.min(7, dates.length);
  
  if (dates.length <= totalToShow) {
    // If we have 7 or fewer dates, show all of them
    for (let i = 0; i < dates.length; i++) {
      visibleDates.push(i);
    }
  } else {
    // For more than 7 dates, create a sliding window
    let startIdx = Math.max(0, selectedIdx - Math.floor(totalToShow / 2));
    if (startIdx + totalToShow > dates.length) {
      startIdx = dates.length - totalToShow;
    }
    
    for (let i = 0; i < totalToShow; i++) {
      visibleDates.push(startIdx + i);
    }
  }
  
  return (
    <div className="flex flex-col w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">Flexible Dates</h3>
        <div className="text-xs text-gray-500">Prices shown are for round trips</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-1">
        <div className="flex items-center w-full overflow-hidden">
          <button 
            className="p-1 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={selectedIdx === 0} 
            onClick={() => onSelect(Math.max(0, selectedIdx - 1))}
          >
        <ChevronLeft className="h-5 w-5" />
      </button>
          
          <div className="flex-1 grid grid-cols-7 gap-0">
            {visibleDates.map(idx => (
              <button
                key={dates[idx]?.date || idx}
                className={cn(
                  "flex flex-col items-center p-2 rounded-md transition-all",
                  selectedIdx === idx 
                    ? "bg-blue-50 border-blue-100" 
                    : "hover:bg-gray-50"
                )}
            onClick={() => onSelect(idx)}
          >
                <div className={cn(
                  "text-sm mb-1",
                  selectedIdx === idx ? "font-bold text-black" : "text-gray-600"
                )}>
                  {dates[idx]?.date}
                </div>
                <div className={cn(
                  "text-sm font-medium",
                  dates[idx]?.price === minPrice 
                    ? "text-green-600" 
                    : selectedIdx === idx ? "text-blue-600" : "text-gray-700"
                )}>
              ₹{dates[idx]?.price?.toLocaleString()}
            </div>
                {selectedIdx === idx && (
                  <div className="mt-1 h-1 w-4 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>
          
          <button 
            className="p-1 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={selectedIdx === dates.length - 1} 
            onClick={() => onSelect(Math.min(dates.length - 1, selectedIdx + 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// SortOptions Component
const SortOptions = ({ sortOption, onSortChange }) => {
  const options = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'price_low', label: 'Price: Low to High' },
    { id: 'price_high', label: 'Price: High to Low' },
    { id: 'duration', label: 'Duration: Shortest' },
    { id: 'early_departure', label: 'Earliest Departure' },
    { id: 'late_departure', label: 'Latest Departure' }
  ];
  
  return (
    <div className="flex items-center gap-2 border-t border-gray-200 pt-4 pb-2">
      <div className="text-sm font-medium text-gray-700">Sort by:</div>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => onSortChange(option.id)}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-medium transition-all",
              sortOption === option.id
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const TripList = ({ trips, loading, onViewTrip, selectedTrip }: TripListProps) => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isArabic = language === 'ar';
  
  const [expanded, setExpanded] = useState(false);
  const [selectedFilterTab, setSelectedFilterTab] = useState('all');
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState(null);
  const [sortOption, setSortOption] = useState('recommended');
  const [selectedDateIdx, setSelectedDateIdx] = useState(2); // Default to middle date
  const [showCouponValue, setShowCouponValue] = useState(false);
  
  // Mock dates data with translation
  const mockDates = [
    { date: formatDate('Sun, 11 May', isArabic, t), price: 6774 },
    { date: formatDate('Mon, 12 May', isArabic, t), price: 5264 },
    { date: formatDate('Tue, 13 May', isArabic, t), price: 6089 },
    { date: formatDate('Wed, 14 May', isArabic, t), price: 6946 },
    { date: formatDate('Thu, 15 May', isArabic, t), price: 7890 },
    { date: formatDate('Fri, 16 May', isArabic, t), price: 8120 },
    { date: formatDate('Sat, 17 May', isArabic, t), price: 7450 },
  ];
  
  // Mock data for the airline quick filter
  const mockAirlines = [
    {
      id: 'emirates',
      name: 'Emirates',
      iata: 'EK',
      logo: 'https://www.emirates.com/etc/designs/ecom/creative/emirate-logo-circle.svg',
      price: '65,909',
      // Special return offer - Emirates gets this
      hasSpecialReturn: true,
      returnDiscount: 15,
      specialReturnPrice: '56,023',
      badgeText: 'Limited Time',
      country: 'United Arab Emirates',
      alliance: 'None',
      rating: '4.3/5',
      onTime: 82,
      baggage: '2 x 23kg included',
      wifi: true,
      meal: 'Full meal service',
      website: 'https://www.emirates.com',
      review: 'Great service and modern aircraft with excellent entertainment options.'
    },
    { 
      id: 'airindia', 
      name: 'Air India', 
      iata: 'AI',
      logo: 'https://airindia.com/image/AI_CircleLogo.png',
      price: '59,035',
      hasSpecialReturn: false,
      country: 'India',
      alliance: 'Star Alliance',
      rating: '3.8/5',
      onTime: 76,
      baggage: '2 x 23kg included',
      wifi: false,
      meal: 'Full meal service',
      website: 'https://www.airindia.com',
      review: 'Good value with decent service and generous baggage allowance.'
    },
    {
      id: 'etihad',
      name: 'Etihad', 
      iata: 'EY',
      logo: 'https://www.etihad.com/content/dam/eag/etihadairways/etihadcom/Global/logos/etihad-airways-logo-flag.svg',
      price: '45,717',
      // Second special offer - Etihad gets this
      hasSpecialReturn: true,
      returnDiscount: 20,
      specialReturnPrice: '36,574',
      badgeText: 'Best Deal',
      country: 'United Arab Emirates',
      alliance: 'None',
      rating: '4.2/5',
      onTime: 84,
      baggage: '2 x 23kg included',
      wifi: true,
      meal: 'Full meal service',
      website: 'https://www.etihad.com',
      review: 'Excellent in-flight experience with attentive cabin crew.'
    },
    { 
      id: 'lufthansa', 
      name: 'Lufthansa', 
      iata: 'LH',
      logo: 'https://www.lufthansa.com/content/dam/lh/images/local_images/lcn_assets/lufthansa-logo.svg',
      price: '72,500',
      hasSpecialReturn: false,
      country: 'Germany',
      alliance: 'Star Alliance',
      rating: '4.1/5',
      onTime: 81,
      baggage: '1 x 23kg included',
      wifi: true,
      meal: 'Full meal service',
      website: 'https://www.lufthansa.com',
      review: 'German efficiency with good service and clean aircraft.'
    }
  ];
  
  // Price range options
  const priceRanges = [
    { id: 'budget', label: 'Under ₹50,000' },
    { id: 'mid', label: '₹50,000 - ₹70,000' },
    { id: 'premium', label: 'Above ₹70,000' }
  ];
  
  // Handle filter tab selection
  const handleFilterTabSelect = (tab: string) => {
    setSelectedFilterTab(tab);
  };
  
  // Handle airline quick filter selection
  const handleQuickFilterSelect = (airlineIds: string[]) => {
    setSelectedAirlines(airlineIds);
  };
  
  // Handle price range filter selection
  const handlePriceRangeSelect = (rangeId) => {
    setSelectedRange(rangeId);
  };
  
  // Toggle coupon visibility
  const toggleCouponValue = () => {
    setShowCouponValue(!showCouponValue);
  };
  
  // Pass mock flights through the enrichFlightData function
  const enrichedFlights = mockFlights.map(flight => enrichFlightData(flight));

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Date selection card */}
      <DatesCard 
        dates={mockDates} 
        selectedIdx={selectedDateIdx} 
        onSelect={setSelectedDateIdx} 
      />
      
      {/* Quick filters section */}
      <QuickPriceFilters 
        airlines={mockAirlines} 
        selectedAirlines={selectedAirlines} 
        onAirlineSelect={handleQuickFilterSelect}
        isArabic={isArabic}
        t={t}
      />
      
      {/* Price range filters */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">Price Range</h3>
        <button 
          className="text-xs text-primary font-medium hover:underline flex items-center"
          onClick={toggleCouponValue}
        >
          {showCouponValue ? 'Hide coupon values' : 'Show prices with coupon applied'}
        </button>
      </div>
      <PriceRangeFilters 
        ranges={priceRanges} 
        selectedRange={selectedRange} 
        onChange={handlePriceRangeSelect} 
      />
      
      {/* Sorting options */}
      <SortOptions 
        sortOption={sortOption} 
        onSortChange={setSortOption} 
      />
      
      {/* Trips/Flights list */}
      <div className="rounded-md space-y-4 mt-2">
        {/* Display enriched flights from mockFlights */}
        {enrichedFlights.map((flight) => (
          <div key={flight.id} className="relative">
            <FlightListCard
              outboundFlight={{
                id: `outbound-${flight.id}`,
                airlineLogo: flight.airlineLogo,
                airlineName: flight.airline,
                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,
                departureCode: flight.departureCode,
                arrivalCode: flight.arrivalCode,
                duration: flight.duration,
                stops: flight.stops === 0 ? t('nonStop') : `${flight.stops} stop`,
                date: "Wed, 15 May"
              }}
              returnFlight={{
                id: `return-${flight.id}`,
                airlineLogo: flight.airlineLogo,
                airlineName: flight.airline,
                departureTime: "08:20",
                arrivalTime: "14:35",
                departureCode: flight.arrivalCode,
                arrivalCode: flight.departureCode,
                duration: flight.duration,
                stops: flight.stops === 0 ? t('nonStop') : `${flight.stops} stop`,
                date: "Thu, 22 May"
              }}
              price={flight.price.toString()}
              currency="₹"
              stock={
                flight.id === 1 ? "Only 3 seats left at this price" : 
                flight.id === 2 ? "Only 4 seats left" : 
                flight.id === 3 ? "Only 2 seats left" : 
                "Last seat available!"
              }
              coupon="Special Offer"
              promoBanner={flight.tags.includes('Eco Saver') ? "Eco-friendly choice - 20% less carbon emissions" : undefined}
              baggageTag={flight.tags.includes('Direct Flight') ? "Extra Baggage" : undefined}
              moreOptions={[
                {
                  outbound: {
                    airlineLogo: flight.airlineLogo,
                    airlineName: flight.airline,
                    departureTime: "18:45",
                    arrivalTime: "06:25",
                    departureCode: flight.departureCode,
                    arrivalCode: flight.arrivalCode,
                    duration: "12h 40m",
                    stops: flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`,
                    layover: flight.stops > 0 ? "2h 15m in DEL" : undefined,
                    date: "Wed, 15 May"
                  },
                  return: {
                    airlineLogo: flight.airlineLogo,
                    airlineName: flight.airline,
                    departureTime: "10:30",
                    arrivalTime: "16:45",
                    departureCode: flight.arrivalCode,
                    arrivalCode: flight.departureCode,
                    duration: "11h 15m",
                    stops: flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`,
                    layover: flight.stops > 0 ? "1h 30m in AUH" : undefined,
                    date: "Thu, 22 May"
                  }
                },
                {
                  outbound: {
                    airlineLogo: flight.airlineLogo,
                    airlineName: flight.airline,
                    departureTime: "06:15",
                    arrivalTime: "16:55",
                    departureCode: flight.departureCode,
                    arrivalCode: flight.arrivalCode,
                    duration: "15h 40m",
                    stops: "1 stop",
                    layover: "3h 30m in DOH",
                    date: "Wed, 15 May"
                  },
                  return: {
                    airlineLogo: flight.airlineLogo,
                    airlineName: flight.airline,
                    departureTime: "22:45",
                    arrivalTime: "05:20",
                    departureCode: flight.arrivalCode,
                    arrivalCode: flight.departureCode,
                    duration: "11h 35m",
                    stops: "1 stop",
                    layover: "2h 15m in DOH",
                    date: "Thu, 22 May"
                  }
                }
              ]}
              onBook={() => onViewTrip(flight)}
              onDetails={() => console.log('View details', flight)}
              showOptions={expanded}
            />
            {!expanded && (
            <button
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 text-xs font-medium rounded-full border border-gray-200 shadow-sm text-gray-600 hover:text-primary"
                onClick={() => setExpanded(true)}
              >
                Show more options
            </button>
            )}
          </div>
        ))}
        {expanded && (
          <button
            className="w-full bg-white py-2 text-sm font-medium text-gray-600 hover:text-primary border border-gray-200 rounded-md mt-2"
            onClick={() => setExpanded(false)}
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default TripList; 