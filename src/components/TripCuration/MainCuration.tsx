import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import AiMessage from './AiMessage';
import FilterChips from './FilterChips';
import TripListV2 from './v2/TripList';
import ChatInput from './ChatInput';
// import SelectedTripDetail from './SelectedTripDetail';  // Commented out as we're not using it
import { mockTrips } from './mockData';
import { toast } from 'sonner';
import { InsightProps } from './FlightInsights';
import { Button } from '../ui/button';
import { ArrowRightLeft, ArrowUpDown, X, MessageCircle, MessageSquare, Percent, ChevronLeft, ChevronRight } from 'lucide-react';
import '@/styles/animations.css';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import FlightOptionsSelector from './FlightOptionsSelector';
import HorizontalFilters from './HorizontalFilters';
import FareSelectionModal from './FareSelectionModal';
import TopHeader from './TopHeader';
import SearchHeader from './SearchHeader';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { format, addDays } from 'date-fns';

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
  version?: 'v2';
  isAiSearch?: boolean;
}

// Search Summary Component
const SearchSummary = ({
  origin = "Bengaluru",
  destination = "London",
  departureDate,
  returnDate,
  passengers = 1,
  cabinClass = "Economy",
  onSwap,
  onUpdate
}: {
  origin?: string;
  destination?: string;
  departureDate?: Date;
  returnDate?: Date;
  passengers?: number;
  cabinClass?: string;
  onSwap: () => void;
  onUpdate: () => void;
}) => {
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'numeric' 
    }).format(date);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm">
      <div className="flex w-full flex-col sm:flex-row items-stretch">
        {/* Location Fields Wrapper */}
        <div className="relative flex flex-[2] flex-col sm:flex-row">
          {/* Origin input */}
          <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
            <div className="px-4 sm:px-6 py-2 sm:py-3">
              <div className="flex items-center">
                <span className="text-sm truncate max-w-[120px] sm:max-w-full">{origin}</span>
                <button className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Destination input */}
          <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
            <div className="px-4 sm:px-6 py-2 sm:py-3">
              <div className="flex items-center">
                <span className="text-sm truncate max-w-[120px] sm:max-w-full">{destination}</span>
                <button className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile swap button */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 sm:hidden">
            <button
              type="button"
              onClick={onSwap}
              className="rounded-full bg-white border border-gray-200 text-gray-600 p-1.5 shadow-sm hover:bg-gray-50"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>

          {/* Desktop swap button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:block">
            <button
              type="button"
              onClick={onSwap}
              className="rounded-full bg-white border border-gray-200 text-gray-600 p-2 shadow-sm hover:bg-gray-50"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dates */}
        <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="px-4 sm:px-6 py-2 sm:py-3">
            <div className="flex items-center">
              <span className="text-sm truncate">
                {formatDate(departureDate) || 'Departure'} — {formatDate(returnDate) || 'Return'}
              </span>
            </div>
          </div>
        </div>

        {/* Passengers & Class */}
        <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="px-4 sm:px-6 py-2 sm:py-3">
            <div className="flex items-center">
              <span className="text-sm truncate">{passengers} adult, {cabinClass}</span>
            </div>
          </div>
        </div>

        {/* Update button */}
        <div className="flex items-center justify-center p-3 sm:px-4">
          <Button 
            onClick={onUpdate}
            className="w-full sm:w-auto h-9 px-4 bg-black hover:bg-black/90 text-white rounded-full text-sm"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

// Generate 14 days of dates from today
const today = new Date();
const mockDates = Array.from({ length: 14 }, (_, i) => ({
  date: format(addDays(today, i), 'EEE, d MMM'),
  price: Math.floor(5000 + Math.random() * 4000),
}));

function DatesCard({ dates, selectedIdx, onSelect }) {
  const minPrice = Math.min(...dates.map(d => d.price));
  const [windowStart, setWindowStart] = useState(0);
  const windowSize = 4;
  const canScrollLeft = windowStart > 0;
  const canScrollRight = windowStart + windowSize < dates.length;

  useEffect(() => {
    if (selectedIdx < windowStart) setWindowStart(selectedIdx);
    else if (selectedIdx >= windowStart + windowSize) setWindowStart(selectedIdx - windowSize + 1);
  }, [selectedIdx]);

  const visibleDates = dates.slice(windowStart, windowStart + windowSize);

  return (
    <div className="flex items-center w-full py-1 mb-1">
      <button
        className="p-1 text-gray-400 hover:text-black"
        disabled={!canScrollLeft}
        onClick={() => setWindowStart(Math.max(0, windowStart - 1))}
        style={{ minWidth: 28 }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="flex-1 flex justify-between gap-0 overflow-x-hidden">
        {visibleDates.map((d, i) => {
          const globalIdx = windowStart + i;
          return (
            <div
              key={d.date}
              className={
                'flex flex-col items-center cursor-pointer ' +
                (globalIdx === selectedIdx ? 'font-bold text-black' : 'text-gray-500')
              }
              onClick={() => onSelect(globalIdx)}
              style={{ fontSize: '12px', lineHeight: '16px', width: 70, minWidth: 70, maxWidth: 70 }}
            >
              <div className="mb-0.5" style={{ fontSize: '11px', fontWeight: 500 }}>{d.date}</div>
              <div className={
                'font-semibold ' +
                (d.price === minPrice ? 'text-green-600' : '')
              } style={{ fontSize: '12px' }}>
                ₹{d.price.toLocaleString()}
              </div>
              {globalIdx === selectedIdx && <div className="mt-0.5 h-0.5 w-5 bg-black rounded-full" />}
            </div>
          );
        })}
      </div>
      <button
        className="p-1 text-gray-400 hover:text-black"
        disabled={!canScrollRight}
        onClick={() => setWindowStart(Math.min(dates.length - windowSize, windowStart + 1))}
        style={{ minWidth: 28 }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// Skeleton Loader Components
function Skeleton({ className = '' }) {
  return <div className={`bg-gray-200 animate-pulse rounded ${className}`} />;
}

function MainCurationSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-12">
      {/* Left Column - FilterChips Skeleton */}
      <div className="order-2 lg:order-1 lg:col-span-3 bg-gray-50">
        <div className="space-y-4">
          <Skeleton className="rounded-xl h-[340px] w-full mb-4" />
        </div>
      </div>
      {/* Main Content Cards Skeleton (center, col-span-9) */}
      <div className="order-1 lg:order-2 lg:col-span-9 max-w-4xl mx-auto w-full">
        {/* Merchandising Banner Skeleton */}
        <div className="flex w-full gap-3 pb-4 -mx-2 px-2">
          {[1,2,3].map(i => (
            <Skeleton key={i} className="flex-1 h-16" />
          ))}
        </div>
        {/* Tabs Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
          <div className="flex">
            {[1,2,3].map(i => (
              <Skeleton key={i} className="flex-1 h-14 m-2" />
            ))}
          </div>
        </div>
        {/* Summary Row Card Skeleton */}
        <Skeleton className="w-full h-28 mb-4" />
        {/* DatesCard Skeleton */}
        <div className="flex items-center w-full py-2 mt-2 mb-2">
          <Skeleton className="h-8 w-8 mr-2" />
          <div className="flex gap-2 flex-1">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-20" />
            ))}
          </div>
          <Skeleton className="h-8 w-8 ml-2" />
        </div>
        {/* Flight List Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2].map(col => (
              <div key={col}>
                <Skeleton className="h-4 w-40 mb-3" />
                <div className="flex flex-col gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Line loading indicator component
function LineLoading({ duration = 4000 }) {
  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden">
      <div
        className="h-full bg-blue-600 transition-all"
        style={{
          width: '100%',
          animation: `line-loading-bar ${duration}ms linear forwards`
        }}
      />
      <style>{`
        @keyframes line-loading-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default function MainCuration({ searchQuery, onBack, onViewTrip, isAiSearch = false }: TripCurationProps) {
  console.log('MainCuration rendering with searchQuery:', searchQuery);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [thinking, setThinking] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  
  // Filter states
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    cabinClass: 'economy',
    isRoundTrip: true
  });

  // Additional state variables
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [departureTime, setDepartureTime] = useState<string | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);
  const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(0);
  const [showOptionsSelector, setShowOptionsSelector] = useState(false);

  // --- State for summary tabs and quick filters (moved up from TripListV2) ---
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selectedPriceCategory, setSelectedPriceCategory] = useState<'cheapest' | 'best' | 'quickest'>('best');
  const [selectedQuickFilters, setSelectedQuickFilters] = useState<string[]>([]);

  // Add state for stops and flight timings filters
  const [selectedStops, setSelectedStops] = useState<string[]>([]); // e.g., ['non-stop', '1-stop']
  const [selectedDepartureTimeSlot, setSelectedDepartureTimeSlot] = useState<string | null>(null); // e.g., 'before-6am'
  const [selectedReturnTimeSlot, setSelectedReturnTimeSlot] = useState<string | null>(null); // e.g., 'after-6pm'

  // Track if user has seen the manual selection toast
  const [hasShownManualSelectToast, setHasShownManualSelectToast] = useState(false);
  // Track if user has manually selected a flight
  const [userHasManuallySelected, setUserHasManuallySelected] = useState(false);

  // State for fare selection modal
  const [isFareModalOpen, setFareModalOpen] = useState(false);
  const [fareModalTrip, setFareModalTrip] = useState<any>(null);

  // Update airlines array to include baggage, wifi, meal, rating, etc.
  const airlines = [
    {
      id: 'emirates',
      name: 'Emirates',
      logo: 'https://airhex.com/images/airline-logos/emirates.png',
      price: '65,909',
      baggage: '30kg checked, 7kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian, Vegan',
      rating: 4.7
    },
    {
      id: 'etihad',
      name: 'Etihad Airways',
      logo: 'https://airhex.com/images/airline-logos/etihad-airways.png',
      price: '47,000',
      baggage: '23kg checked, 7kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian',
      rating: 4.5
    },
    {
      id: 'qatar',
      name: 'Qatar Airways',
      logo: 'https://airhex.com/images/airline-logos/qatar-airways.png',
      price: '46,000',
      baggage: '30kg checked, 7kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian, Vegan, Gluten-Free',
      rating: 4.8
    },
    {
      id: 'turkish',
      name: 'Turkish Airlines',
      logo: 'https://airhex.com/images/airline-logos/turkish-airlines.png',
      price: '44,000',
      baggage: '30kg checked, 8kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian, Vegan',
      rating: 4.4
    },
    {
      id: 'lufthansa',
      name: 'Lufthansa',
      logo: 'https://airhex.com/images/airline-logos/lufthansa.png',
      price: '61,000',
      baggage: '23kg checked, 8kg cabin',
      wifi: true,
      meal: 'Vegetarian, Vegan, Gluten-Free',
      rating: 4.2
    },
    {
      id: 'air-india',
      name: 'Air India',
      logo: 'https://airhex.com/images/airline-logos/air-india.png',
      price: '59,035',
      baggage: '25kg checked, 7kg cabin',
      wifi: false,
      meal: 'Vegetarian, Vegan',
      rating: 3.9
    },
    {
      id: 'singapore',
      name: 'Singapore Airlines',
      logo: 'https://airhex.com/images/airline-logos/singapore-airlines.png',
      price: '58,500',
      baggage: '30kg checked, 7kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian, Vegan, Gluten-Free',
      rating: 4.9
    },
    {
      id: 'british',
      name: 'British Airways',
      logo: 'https://airhex.com/images/airline-logos/british-airways.png',
      price: '62,000',
      baggage: '23kg checked, 8kg cabin',
      wifi: true,
      meal: 'Vegetarian, Vegan, Gluten-Free',
      rating: 4.3
    },
    {
      id: 'air-france',
      name: 'Air France',
      logo: 'https://airhex.com/images/airline-logos/air-france.png',
      price: '60,500',
      baggage: '23kg checked, 8kg cabin',
      wifi: true,
      meal: 'Vegetarian, Vegan, Gluten-Free',
      rating: 4.1
    },
    {
      id: 'klm',
      name: 'KLM',
      logo: 'https://airhex.com/images/airline-logos/klm.png',
      price: '59,800',
      baggage: '23kg checked, 8kg cabin',
      wifi: true,
      meal: 'Vegetarian, Vegan, Gluten-Free',
      rating: 4.0
    }
  ];

  // Handler for quick filter selection
  const handleQuickFilterSelect = (airlineId: string) => {
    if (selectedQuickFilters.includes(airlineId)) {
      const newSelectedFilters = selectedQuickFilters.filter(id => id !== airlineId);
      setSelectedQuickFilters(newSelectedFilters);
    } else {
      setSelectedQuickFilters([...selectedQuickFilters, airlineId]);
    }
  };

  // --- Mock summaryOption and roundTripOptions (replace with real data as needed) ---
  const summaryOption = {
    outboundFlight: {
      airlineLogo: airlines[0].logo,
      airlineName: airlines[0].name,
      departureTime: '21:00',
      arrivalTime: '07:05',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '14h 35m',
      stops: '1 stop',
      date: 'May 7, 2025',
      layover: '2h in Dubai',
      price: '35,909'
    },
    returnFlight: {
      airlineLogo: airlines[1].logo,
      airlineName: airlines[1].name,
      departureTime: '14:20',
      arrivalTime: '20:20',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '10h 30m',
      stops: 'non-stop',
      date: 'May 14, 2025',
      layover: undefined,
      price: '30,000'
    },
    price: '65,909',
    currency: '₹'
  };
  const roundTripOptions = [summaryOption]; // For demo, use one option

  // Parse search query when component mounts or searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      try {
        const parsedQuery = JSON.parse(searchQuery);
        setSearchParams({
          origin: parsedQuery.origin,
          destination: parsedQuery.destination,
          departureDate: parsedQuery.departureDate ? new Date(parsedQuery.departureDate) : undefined,
          returnDate: parsedQuery.returnDate ? new Date(parsedQuery.returnDate) : undefined,
          passengers: parsedQuery.passengers,
          cabinClass: parsedQuery.cabinClass,
          isRoundTrip: parsedQuery.isRoundTrip
        });
      } catch (error) {
        console.error('Error parsing search query:', error);
      }
    }
  }, [searchQuery]);

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

  // Mock cabin classes
  const cabinClasses = [
    { id: 'economy', name: 'Economy' },
    { id: 'premium', name: 'Premium Economy' },
    { id: 'business', name: 'Business' },
    { id: 'first', name: 'First Class' }
  ];

  const tripListRef = useIntersectionObserver();
  const filterRef = useIntersectionObserver();

  // Follow-up text suggestions
  const followUpSuggestions = [
    "Ask Flyin AI about flight options...",
    "Need help finding the best deals?",
    "Looking for travel recommendations?",
    "Want to know about layover times?",
    "Curious about baggage allowance?",
    "Need help with travel dates?"
  ];

  // Rotate follow-up text every 3 seconds when chat is open
  useEffect(() => {
    if (!isChatOpen) return;

    const intervalId = setInterval(() => {
      setCurrentFollowUpIndex((prev) => (prev + 1) % followUpSuggestions.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isChatOpen]);

  useEffect(() => {
    setLoading(true);
    let timeoutId;
    if (!isAiSearch) {
      timeoutId = setTimeout(() => setLoading(false), 4000);
      const mockFlightData = mockTrips;
      setTrips(mockFlightData);
      if (mockFlightData.length > 0) {
        setSelectedTrip(mockFlightData[0]);
      }
      return () => clearTimeout(timeoutId);
    }

    const thinkingMessages = [
      "Finding the perfect Middle Eastern destinations for you...",
      "Checking availability for your dates...",
      "Curating personalized experiences...",
      "Finding the best value options..."
    ];

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setThinking(thinkingMessages[currentIndex]);
      currentIndex = (currentIndex + 1) % thinkingMessages.length;
    }, 2000);

    // Simulate AI processing
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setLoading(false);
      const mockFlightData = mockTrips;
      setTrips(mockFlightData);
      
      // Select the first trip by default when loaded
      if (mockFlightData.length > 0) {
        setSelectedTrip(mockFlightData[0]);
      }
      
      // Set AI response based on search query
      if (searchQuery.toLowerCase().includes('dubai')) {
        setMessage("Dubai offers a perfect blend of modernity and tradition. I've curated these experiences with luxury accommodations and unique cultural activities.");
      } else if (searchQuery.toLowerCase().includes('istanbul') || searchQuery.toLowerCase().includes('turkey')) {
        setMessage("Istanbul is where East meets West. These journeys highlight the rich history and vibrant culture of this fascinating city at the crossroads of civilizations.");
      } else if (searchQuery.toLowerCase().includes('cairo') || searchQuery.toLowerCase().includes('egypt')) {
        setMessage("Explore the wonders of ancient Egypt with these carefully selected trips to Cairo. Experience the pyramids and the rich cultural heritage of this historic destination.");
      } else if (searchQuery.toLowerCase().includes('doha') || searchQuery.toLowerCase().includes('qatar')) {
        setMessage("Discover the modern marvels and traditional charm of Doha. These journeys offer luxury accommodations and unique cultural experiences in Qatar's capital.");
      } else if (searchQuery.toLowerCase().includes('beach')) {
        setMessage("The Middle East has some stunning beaches. I've selected some options with beautiful shorelines along the Arabian Gulf and Red Sea.");
      } else if (searchQuery.toLowerCase().includes('culture')) {
        setMessage("The Middle East is rich in cultural experiences. These journeys focus on historical sites, local traditions, and authentic cultural immersion.");
      } else {
        setMessage(`Based on your interest in "${searchQuery}", I've curated these Middle Eastern journeys that I think you'll love.`);
      }
    }, 4000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [searchQuery, isAiSearch]);

  const handleSubmitMessage = () => {
    if (!userMessage.trim()) return;
    
    toast.success("Message received!", {
      description: "I'll adjust your recommendations accordingly.",
    });
    setMessage(prev => `${prev} I've refined the options based on your preferences.`);
    setUserMessage('');
  };

  // Open fare selection modal instead of direct booking
  const handleTripSelect = (trip: any) => {
    setFareModalTrip(trip);
    setFareModalOpen(true);
  };

  // Called after fare is selected in modal
  const handleFareSelected = (selectedFare: any) => {
    setFareModalOpen(false);
    setFareModalTrip(null);
    // Proceed to next step with selected fare/trip
    onViewTrip(selectedFare);
  };

  const handleSwapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
    toast.success("Locations swapped!");
  };

  const handleUpdateSearch = () => {
    // Here you would typically make an API call to update the search results
    toast.success("Updating search results...");
  };

  const handleResetSearch = () => {
    setSearchParams({
      origin: '',
      destination: '',
      departureDate: undefined,
      returnDate: undefined,
      passengers: {
        adults: 1,
        children: 0,
        infants: 0
      },
      cabinClass: 'economy',
      isRoundTrip: true
    });
    setSelectedAirlines([]);
    setDepartureTime(null);
    setReturnTime(null);
    toast.success("Search parameters reset");
  };

  const chatCardRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close chat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatCardRef.current && !chatCardRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    }

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

  // Minimal mock data for one departure and one return date/route
  const departureOptions = [
    {
      id: 'dep1',
      departureTime: '10:00',
      arrivalTime: '21:40',
      departureCode: 'BLR',
      arrivalCode: 'DXB',
      duration: '13h 10m',
      stops: 1,
      date: new Date('2025-05-03'),
      layoverInfo: '6h 55m in Colombo',
    },
    {
      id: 'dep2',
      departureTime: '03:05',
      arrivalTime: '21:40',
      departureCode: 'BLR',
      arrivalCode: 'DXB',
      duration: '20h 5m',
      stops: 1,
      date: new Date('2025-05-03'),
      layoverInfo: '13h 50m in Colombo',
    },
  ];
  const returnOptions = [
    {
      id: 'ret1',
      departureTime: '23:00',
      arrivalTime: '02:00',
      departureCode: 'DXB',
      arrivalCode: 'BLR',
      duration: '25h 30m',
      stops: 1,
      date: new Date('2025-05-06'),
      layoverInfo: '19h 40m in Colombo',
    },
    {
      id: 'ret2',
      departureTime: '01:00',
      arrivalTime: '12:00',
      departureCode: 'DXB',
      arrivalCode: 'BLR',
      duration: '11h 0m',
      stops: 1,
      date: new Date('2025-05-06'),
      layoverInfo: '2h 30m in Mumbai',
    },
  ];
  const [selectedDepartureId, setSelectedDepartureId] = useState<string | number>(departureOptions[0].id);
  const [selectedReturnId, setSelectedReturnId] = useState<string | number>(returnOptions[0].id);

  // Add outboundFlights and inboundFlights arrays (copy from TripListV2)
  const outboundFlights = [
    {
      airlineLogo: airlines[0].logo,
      airlineName: airlines[0].name,
      departureTime: '21:00',
      arrivalTime: '07:05',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '14h 35m',
      stops: '1 stop',
      layover: '2h in Dubai',
      price: '35,909',
      baggage: airlines[0].baggage,
      wifi: airlines[0].wifi,
      meal: airlines[0].meal,
      rating: airlines[0].rating
    },
    {
      airlineLogo: airlines[1].logo,
      airlineName: airlines[1].name,
      departureTime: '22:30',
      arrivalTime: '09:00',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '14h 30m',
      stops: 'non-stop',
      layover: null,
      price: '37,500',
      baggage: airlines[1].baggage,
      wifi: airlines[1].wifi,
      meal: airlines[1].meal,
      rating: airlines[1].rating
    },
    {
      airlineLogo: airlines[2].logo,
      airlineName: airlines[2].name,
      departureTime: '19:00',
      arrivalTime: '05:30',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '15h 00m',
      stops: '2 stops',
      layover: '3h in Doha',
      price: '33,800',
      baggage: airlines[2].baggage,
      wifi: airlines[2].wifi,
      meal: airlines[2].meal,
      rating: airlines[2].rating
    },
    {
      airlineLogo: airlines[3].logo,
      airlineName: airlines[3].name,
      departureTime: '23:15',
      arrivalTime: '10:00',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '14h 45m',
      stops: '1 stop',
      layover: '1h 30m in Istanbul',
      price: '36,200',
      baggage: airlines[3].baggage,
      wifi: airlines[3].wifi,
      meal: airlines[3].meal,
      rating: airlines[3].rating
    },
    // Additional airlines
    {
      airlineLogo: airlines[4].logo,
      airlineName: airlines[4].name,
      departureTime: '20:00',
      arrivalTime: '06:00',
      departureCode: 'JFK',
      arrivalCode: 'FRA',
      departureCity: 'New York',
      arrivalCity: 'Frankfurt',
      duration: '10h 00m',
      stops: 'non-stop',
      layover: null,
      price: '40,000',
      baggage: airlines[4].baggage,
      wifi: airlines[4].wifi,
      meal: airlines[4].meal,
      rating: airlines[4].rating
    },
    {
      airlineLogo: airlines[5].logo,
      airlineName: airlines[5].name,
      departureTime: '21:30',
      arrivalTime: '10:00',
      departureCode: 'JFK',
      arrivalCode: 'DEL',
      departureCity: 'New York',
      arrivalCity: 'Delhi',
      duration: '14h 00m',
      stops: '1 stop',
      layover: '2h in London',
      price: '38,500',
      baggage: airlines[5].baggage,
      wifi: airlines[5].wifi,
      meal: airlines[5].meal,
      rating: airlines[5].rating
    },
    {
      airlineLogo: airlines[6].logo,
      airlineName: airlines[6].name,
      departureTime: '18:00',
      arrivalTime: '06:30',
      departureCode: 'JFK',
      arrivalCode: 'SIN',
      departureCity: 'New York',
      arrivalCity: 'Singapore',
      duration: '16h 30m',
      stops: 'non-stop',
      layover: null,
      price: '42,000',
      baggage: airlines[6].baggage,
      wifi: airlines[6].wifi,
      meal: airlines[6].meal,
      rating: airlines[6].rating
    },
    {
      airlineLogo: airlines[7].logo,
      airlineName: airlines[7].name,
      departureTime: '19:45',
      arrivalTime: '09:00',
      departureCode: 'JFK',
      arrivalCode: 'LHR',
      departureCity: 'New York',
      arrivalCity: 'London',
      duration: '9h 15m',
      stops: 'non-stop',
      layover: null,
      price: '41,500',
      baggage: airlines[7].baggage,
      wifi: airlines[7].wifi,
      meal: airlines[7].meal,
      rating: airlines[7].rating
    },
    {
      airlineLogo: airlines[8].logo,
      airlineName: airlines[8].name,
      departureTime: '22:10',
      arrivalTime: '11:00',
      departureCode: 'JFK',
      arrivalCode: 'CDG',
      departureCity: 'New York',
      arrivalCity: 'Paris',
      duration: '10h 50m',
      stops: 'non-stop',
      layover: null,
      price: '43,000',
      baggage: airlines[8].baggage,
      wifi: airlines[8].wifi,
      meal: airlines[8].meal,
      rating: airlines[8].rating
    },
    {
      airlineLogo: airlines[9].logo,
      airlineName: airlines[9].name,
      departureTime: '17:30',
      arrivalTime: '07:00',
      departureCode: 'JFK',
      arrivalCode: 'AMS',
      departureCity: 'New York',
      arrivalCity: 'Amsterdam',
      duration: '13h 30m',
      stops: '1 stop',
      layover: '2h in Paris',
      price: '39,800',
      baggage: airlines[9].baggage,
      wifi: airlines[9].wifi,
      meal: airlines[9].meal,
      rating: airlines[9].rating
    }
  ];
  const inboundFlights = [
    {
      airlineLogo: airlines[1].logo,
      airlineName: airlines[1].name,
      departureTime: '14:20',
      arrivalTime: '20:20',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '10h 30m',
      stops: 'non-stop',
      layover: null,
      price: '30,000',
      baggage: airlines[1].baggage,
      wifi: airlines[1].wifi,
      meal: airlines[1].meal,
      rating: airlines[1].rating
    },
    {
      airlineLogo: airlines[0].logo,
      airlineName: airlines[0].name,
      departureTime: '16:00',
      arrivalTime: '22:30',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '11h 00m',
      stops: '1 stop',
      layover: '2h in Dubai',
      price: '31,500',
      baggage: airlines[0].baggage,
      wifi: airlines[0].wifi,
      meal: airlines[0].meal,
      rating: airlines[0].rating
    },
    {
      airlineLogo: airlines[2].logo,
      airlineName: airlines[2].name,
      departureTime: '18:30',
      arrivalTime: '01:00',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '12h 30m',
      stops: '2 stops',
      layover: '3h in Doha',
      price: '29,800',
      baggage: airlines[2].baggage,
      wifi: airlines[2].wifi,
      meal: airlines[2].meal,
      rating: airlines[2].rating
    },
    {
      airlineLogo: airlines[3].logo,
      airlineName: airlines[3].name,
      departureTime: '20:00',
      arrivalTime: '02:30',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '13h 00m',
      stops: '1 stop',
      layover: '1h 45m in Istanbul',
      price: '32,200',
      baggage: airlines[3].baggage,
      wifi: airlines[3].wifi,
      meal: airlines[3].meal,
      rating: airlines[3].rating
    },
    // Additional airlines
    {
      airlineLogo: airlines[4].logo,
      airlineName: airlines[4].name,
      departureTime: '12:00',
      arrivalTime: '22:00',
      departureCode: 'FRA',
      arrivalCode: 'JFK',
      departureCity: 'Frankfurt',
      arrivalCity: 'New York',
      duration: '10h 00m',
      stops: 'non-stop',
      layover: null,
      price: '40,000',
      baggage: airlines[4].baggage,
      wifi: airlines[4].wifi,
      meal: airlines[4].meal,
      rating: airlines[4].rating
    },
    {
      airlineLogo: airlines[5].logo,
      airlineName: airlines[5].name,
      departureTime: '13:30',
      arrivalTime: '03:00',
      departureCode: 'DEL',
      arrivalCode: 'JFK',
      departureCity: 'Delhi',
      arrivalCity: 'New York',
      duration: '14h 00m',
      stops: '1 stop',
      layover: '2h in London',
      price: '38,500',
      baggage: airlines[5].baggage,
      wifi: airlines[5].wifi,
      meal: airlines[5].meal,
      rating: airlines[5].rating
    },
    {
      airlineLogo: airlines[6].logo,
      airlineName: airlines[6].name,
      departureTime: '15:00',
      arrivalTime: '05:30',
      departureCode: 'SIN',
      arrivalCode: 'JFK',
      departureCity: 'Singapore',
      arrivalCity: 'New York',
      duration: '16h 30m',
      stops: 'non-stop',
      layover: null,
      price: '42,000',
      baggage: airlines[6].baggage,
      wifi: airlines[6].wifi,
      meal: airlines[6].meal,
      rating: airlines[6].rating
    },
    {
      airlineLogo: airlines[7].logo,
      airlineName: airlines[7].name,
      departureTime: '10:45',
      arrivalTime: '20:00',
      departureCode: 'LHR',
      arrivalCode: 'JFK',
      departureCity: 'London',
      arrivalCity: 'New York',
      duration: '9h 15m',
      stops: 'non-stop',
      layover: null,
      price: '41,500',
      baggage: airlines[7].baggage,
      wifi: airlines[7].wifi,
      meal: airlines[7].meal,
      rating: airlines[7].rating
    },
    {
      airlineLogo: airlines[8].logo,
      airlineName: airlines[8].name,
      departureTime: '11:10',
      arrivalTime: '22:00',
      departureCode: 'CDG',
      arrivalCode: 'JFK',
      departureCity: 'Paris',
      arrivalCity: 'New York',
      duration: '10h 50m',
      stops: 'non-stop',
      layover: null,
      price: '43,000',
      baggage: airlines[8].baggage,
      wifi: airlines[8].wifi,
      meal: airlines[8].meal,
      rating: airlines[8].rating
    },
    {
      airlineLogo: airlines[9].logo,
      airlineName: airlines[9].name,
      departureTime: '16:30',
      arrivalTime: '06:00',
      departureCode: 'AMS',
      arrivalCode: 'JFK',
      departureCity: 'Amsterdam',
      arrivalCity: 'New York',
      duration: '13h 30m',
      stops: '1 stop',
      layover: '2h in Paris',
      price: '39,800',
      baggage: airlines[9].baggage,
      wifi: airlines[9].wifi,
      meal: airlines[9].meal,
      rating: airlines[9].rating
    }
  ];

  // Add state for selected outbound/inbound flight
  const [selectedOutboundIdx, setSelectedOutboundIdx] = useState(0);
  const [selectedInboundIdx, setSelectedInboundIdx] = useState(0);

  // Helper to get time slot from a time string (e.g., '21:00')
  function getTimeSlot(time: string) {
    const [h, m] = time.split(":").map(Number);
    if (h < 6) return 'before-6am';
    if (h < 12) return '6am-12pm';
    if (h < 18) return '12pm-6pm';
    return 'after-6pm';
  }

  // Add filtered outbound/inbound flights based on selectedAirlines, stops, and timings
  const filteredOutboundFlights = outboundFlights.filter(f => {
    // Airline filter: use selectedQuickFilters if any, else show all
    const airlineId = airlines.find(a => a.name === f.airlineName)?.id || '';
    const airlineMatch = selectedQuickFilters.length === 0 || selectedQuickFilters.includes(airlineId);
    // Stops filter
    let stopsMatch = true;
    if (selectedStops.length > 0) {
      stopsMatch = selectedStops.some(stop => {
        if (stop === 'non-stop') return f.stops === 'non-stop';
        if (stop === '1-stop') return f.stops === '1 stop';
        if (stop === '2-more') return f.stops === '2 stops' || f.stops === '2+ stops';
        return false;
      });
    }
    // Departure time slot filter
    let timeMatch = true;
    if (selectedDepartureTimeSlot) {
      timeMatch = getTimeSlot(f.departureTime) === selectedDepartureTimeSlot;
    }
    return airlineMatch && stopsMatch && timeMatch;
  });

  const filteredInboundFlights = inboundFlights.filter(f => {
    // Airline filter: use selectedQuickFilters if any, else show all
    const airlineId = airlines.find(a => a.name === f.airlineName)?.id || '';
    const airlineMatch = selectedQuickFilters.length === 0 || selectedQuickFilters.includes(airlineId);
    // Stops filter
    let stopsMatch = true;
    if (selectedStops.length > 0) {
      stopsMatch = selectedStops.some(stop => {
        if (stop === 'non-stop') return f.stops === 'non-stop';
        if (stop === '1-stop') return f.stops === '1 stop';
        if (stop === '2-more') return f.stops === '2 stops' || f.stops === '2+ stops';
        return false;
      });
    }
    // Return time slot filter
    let timeMatch = true;
    if (selectedReturnTimeSlot) {
      timeMatch = getTimeSlot(f.departureTime) === selectedReturnTimeSlot;
    }
    return airlineMatch && stopsMatch && timeMatch;
  });

  // Helper to get total duration in minutes from duration string (e.g., '14h 35m')
  function parseDuration(duration: string) {
    const match = duration.match(/(\d+)h\s*(\d+)?m?/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + minutes;
  }

  // Compute all possible outbound/inbound pairs
  const allPairs = filteredOutboundFlights.flatMap((out, oi) =>
    filteredInboundFlights.map((inn, ii) => ({
      out, inn, oi, ii,
      totalPrice: (parseInt(out.price.replace(/[^\d]/g, '') || '0', 10) + parseInt(inn.price.replace(/[^\d]/g, '') || '0', 10)),
      totalDuration: parseDuration(out.duration) + parseDuration(inn.duration)
    }))
  );

  // Find best pairs for each category
  let cheapestPair = null, quickestPair = null, bestPair = null;
  if (allPairs.length > 0) {
    // Cheapest: lowest total price
    cheapestPair = allPairs.reduce((a, b) => a.totalPrice < b.totalPrice ? a : b);
    // Quickest: lowest total duration
    quickestPair = allPairs.reduce((a, b) => a.totalDuration < b.totalDuration ? a : b);
    // Best: lowest price among the 3 quickest pairs
    const sortedByDuration = [...allPairs].sort((a, b) => a.totalDuration - b.totalDuration).slice(0, 3);
    bestPair = sortedByDuration.reduce((a, b) => a.totalPrice < b.totalPrice ? a : b);
  }

  // Compute selected outbound/inbound flights and total price (from filtered lists)
  const hasOutbound = filteredOutboundFlights.length > 0;
  const hasInbound = filteredInboundFlights.length > 0;
  const selectedOutbound = hasOutbound ? (filteredOutboundFlights[selectedOutboundIdx] || filteredOutboundFlights[0]) : null;
  const selectedInbound = hasInbound ? (filteredInboundFlights[selectedInboundIdx] || filteredInboundFlights[0]) : null;
  const totalPrice =
    (parseInt(selectedOutbound?.price?.replace(/[^0-9]/g, '') || '0', 10) +
     parseInt(selectedInbound?.price?.replace(/[^0-9]/g, '') || '0', 10)).toLocaleString();

  // Add glow effect state for Summary Row Card (must be after totalPrice is defined)
  const [glow, setGlow] = useState(false);
  const prevTotalPriceRef = useRef(totalPrice);
  useEffect(() => {
    if (totalPrice !== prevTotalPriceRef.current) {
      setGlow(true);
      prevTotalPriceRef.current = totalPrice;
      const timeout = setTimeout(() => setGlow(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [totalPrice]);

  // Tab label helpers
  const formatPrice = (price) => `₹${price.toLocaleString()}`;
  const formatDuration = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m`;
  };

  // When tab changes, update selectedOutboundIdx/selectedInboundIdx to match best pair
  useEffect(() => {
    if (!hasOutbound || !hasInbound) return;
    // If user has not manually selected, auto-select best pair for tab
    if (!userHasManuallySelected) {
      let pair = null;
      if (selectedPriceCategory === 'cheapest') pair = cheapestPair;
      else if (selectedPriceCategory === 'quickest') pair = quickestPair;
      else pair = bestPair;
      if (pair) {
        setSelectedOutboundIdx(pair.oi);
        setSelectedInboundIdx(pair.ii);
      }
    }
  }, [selectedPriceCategory, filteredOutboundFlights, filteredInboundFlights, userHasManuallySelected]);

  // Ensure selected indices are valid after filtering
  useEffect(() => {
    let outboundValid = selectedOutboundIdx < filteredOutboundFlights.length;
    let inboundValid = selectedInboundIdx < filteredInboundFlights.length;
    if (!outboundValid || !inboundValid) {
      // If user's selection is no longer valid, reset to best pair and allow auto-selection again
      let pair = null;
      if (selectedPriceCategory === 'cheapest') pair = cheapestPair;
      else if (selectedPriceCategory === 'quickest') pair = quickestPair;
      else pair = bestPair;
      if (pair) {
        setSelectedOutboundIdx(pair.oi);
        setSelectedInboundIdx(pair.ii);
      } else {
        setSelectedOutboundIdx(0);
        setSelectedInboundIdx(0);
      }
      setUserHasManuallySelected(false);
    }
  }, [filteredOutboundFlights, filteredInboundFlights, selectedOutboundIdx, selectedInboundIdx, selectedPriceCategory, cheapestPair, quickestPair, bestPair]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler for manual outbound selection
  const handleManualOutboundSelect = (idx: number) => {
    setSelectedOutboundIdx(idx);
    setUserHasManuallySelected(true);
    if (!hasShownManualSelectToast) {
      toast.info("You can freely select any outbound and inbound flight combination.");
      setHasShownManualSelectToast(true);
    }
  };
  // Handler for manual inbound selection
  const handleManualInboundSelect = (idx: number) => {
    setSelectedInboundIdx(idx);
    setUserHasManuallySelected(true);
    if (!hasShownManualSelectToast) {
      toast.info("You can freely select any outbound and inbound flight combination.");
      setHasShownManualSelectToast(true);
    }
  };

  const [isDatesCardSticky, setIsDatesCardSticky] = useState(false);
  const datesCardRef = useRef<HTMLDivElement>(null);
  const datesCardSentinelRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainScrollRef.current || !datesCardSentinelRef.current) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsDatesCardSticky(!entry.isIntersecting);
      },
      {
        root: mainScrollRef.current,
        threshold: 0,
        rootMargin: "-108px 0px 0px 0px",
      }
    );
    observer.observe(datesCardSentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [mainScrollRef.current, datesCardSentinelRef.current]);

  // In MainCuration component, before the Outbound & Inbound Flight Lists Card rendering:
  // Add state for outbound/inbound date selection and mock date arrays
  const [selectedOutboundDateIdx, setSelectedOutboundDateIdx] = useState(0);
  const [selectedInboundDateIdx, setSelectedInboundDateIdx] = useState(0);
  const outboundDates = [
    { date: 'Wed, 7 May', price: 35000 },
    { date: 'Thu, 8 May', price: 35500 },
    { date: 'Fri, 9 May', price: 34000 },
    { date: 'Sat, 10 May', price: 36000 },
    { date: 'Sun, 11 May', price: 34500 },
  ];
  const inboundDates = [
    { date: 'Wed, 14 May', price: 30000 },
    { date: 'Thu, 15 May', price: 30500 },
    { date: 'Fri, 16 May', price: 29900 },
    { date: 'Sat, 17 May', price: 31000 },
    { date: 'Sun, 18 May', price: 30200 },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <TopHeader />
        <LineLoading duration={4000} />
        <div className="container mx-auto max-w-7xl px-4 pt-4 pb-4 sm:px-6 lg:px-8">
          <SearchHeader 
            origin={searchParams.origin}
            destination={searchParams.destination}
            departureDate={searchParams.departureDate}
            returnDate={searchParams.returnDate}
            passengers={searchParams.passengers.adults + searchParams.passengers.children + searchParams.passengers.infants}
            cabinClass={searchParams.cabinClass}
            onSwap={handleSwapLocations}
            onUpdate={handleUpdateSearch}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MainCurationSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* New Top Header */}
      <TopHeader />
      {/* Search Header (not sticky) */}
      <div className="container mx-auto max-w-7xl px-4 pt-4 pb-4 sm:px-6 lg:px-8">
        <SearchHeader 
          origin={searchParams.origin}
          destination={searchParams.destination}
          departureDate={searchParams.departureDate}
          returnDate={searchParams.returnDate}
          passengers={searchParams.passengers.adults + searchParams.passengers.children + searchParams.passengers.infants}
          cabinClass={searchParams.cabinClass}
          onSwap={handleSwapLocations}
          onUpdate={handleUpdateSearch}
        />
      </div>

      {/* Horizontal Filters for v3 only */}
      {/* {version === 'v3' && (
        <div className="bg-white border-b">
          <HorizontalFilters
            selectedStops={selectedStops}
            onStopsChange={setSelectedStops}
            selectedDepartureTimeSlot={selectedDepartureTimeSlot}
            onDepartureTimeChange={setSelectedDepartureTimeSlot}
            selectedReturnTimeSlot={selectedReturnTimeSlot}
            onReturnTimeChange={setSelectedReturnTimeSlot}
            selectedAirlines={selectedAirlines}
            onAirlinesChange={setSelectedAirlines}
          />
        </div>
      )} */}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto max-h-screen" ref={mainScrollRef}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* AI Message */}
          {(message || thinking) && isAiSearch && (
            <div className="mb-4 animate-bounce-in">
              <AiMessage 
                message={message} 
                thinking={thinking}
                loading={loading} 
              />
            </div>
          )}

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-12">
            {/* Left Column - Filters (only for v2) */}
            <div className="order-2 lg:order-1 lg:col-span-3 bg-gray-50">
              <div className="space-y-4">
                <FilterChips
                  selectedAirlines={selectedAirlines}
                  onAirlinesChange={setSelectedAirlines}
                  selectedStops={selectedStops}
                  onStopsChange={setSelectedStops}
                  onDepartureTimeChange={setSelectedDepartureTimeSlot}
                  onReturnTimeChange={setSelectedReturnTimeSlot}
                  departureRoute="DEL-BOM"
                  returnRoute="BOM-DEL"
                />
              </div>
            </div>

            {/* Main Content Cards (center, col-span-9) */}
            <div className="order-1 lg:order-2 lg:col-span-9 max-w-4xl mx-auto w-full">
              <div data-debug-marker="main-curation-right-col" style={{display: 'none'}}>MainCuration Right Column Marker</div>
              {/* Only v2 modular cards, no v1/v2 toggle */}
              {(!hasOutbound || !hasInbound) ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-8 text-center text-gray-500 text-lg font-semibold">
                  No flights found matching your filters.
                </div>
              ) : (
                <>
                  {/* Merchandising Banner */}
                  <div className="flex w-full gap-3 pb-4 -mx-2 px-2">
                    {/* Card 1 */}
                    <div className="flex-1 flex items-center rounded-xl px-4 py-3" style={{ background: '#ecf8f4' }}>
                      <div className="mr-3 flex-shrink-0">
                        <Percent className="h-5 w-5" style={{ color: '#11a670' }} strokeWidth={2} />
                      </div>
                      <div className="text-sm font-semibold leading-snug" style={{ color: '#11a670', fontSize: '12px' }}>
                        Use code ADCB and get up to<br />
                        AED 350 off flights & hotels
                      </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex-1 flex items-center rounded-xl px-4 py-3" style={{ background: '#ecf8f4' }}>
                      <div className="mr-3 flex-shrink-0">
                        <Percent className="h-5 w-5" style={{ color: '#11a670' }} strokeWidth={2} />
                      </div>
                      <div className="text-sm font-semibold leading-snug" style={{ color: '#11a670', fontSize: '12px' }}>
                        Use code AHB and get up to 20% off flights & hotels
                      </div>
                    </div>
                    {/* Card 3 */}
                    <div className="flex-1 flex items-center rounded-xl px-4 py-3 relative" style={{ background: '#ecf8f4' }}>
                      <div className="mr-3 flex-shrink-0">
                        <Percent className="h-5 w-5" style={{ color: '#11a670' }} strokeWidth={2} />
                      </div>
                      <div className="text-sm font-semibold leading-snug" style={{ color: '#11a670', fontSize: '12px' }}>
                        Use code VIP and get up to AED<br />
                        300 off on bookings
                      </div>
                    </div>
                  </div>

                  {/* Tabs Card: Cheapest/Best/Quickest */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="flex">
                      <div className={cn(
                        "flex-1 border-r border-gray-200 p-2 text-center relative cursor-pointer",
                        selectedPriceCategory === 'cheapest' && "bg-blue-50 border-b-2 border-b-blue-600"
                      )}
                      onClick={() => setSelectedPriceCategory('cheapest')}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-xs text-gray-500">Cheapest</div>
                          <div className="text-[10px] text-gray-500">{cheapestPair ? formatDuration(cheapestPair.totalDuration) : '--'}</div>
                        </div>
                        <div className="font-bold text-base">{cheapestPair ? formatPrice(cheapestPair.totalPrice) : '--'}</div>
                      </div>
                      <div className={cn(
                        "flex-1 border-r border-gray-200 p-2 text-center relative cursor-pointer",
                        selectedPriceCategory === 'best' && "bg-blue-50 border-b-2 border-b-blue-600"
                      )}
                      onClick={() => setSelectedPriceCategory('best')}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-xs font-medium">Best</div>
                          <div className="text-[10px] text-gray-500">{bestPair ? formatDuration(bestPair.totalDuration) : '--'}</div>
                        </div>
                        <div className="font-bold text-base">{bestPair ? formatPrice(bestPair.totalPrice) : '--'}</div>
                      </div>
                      <div className={cn(
                        "flex-1 p-2 text-center relative cursor-pointer",
                        selectedPriceCategory === 'quickest' && "bg-blue-50 border-b-2 border-b-blue-600"
                      )}
                      onClick={() => setSelectedPriceCategory('quickest')}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-xs text-gray-500">Quickest</div>
                          <div className="text-[10px] text-gray-500">{quickestPair ? formatDuration(quickestPair.totalDuration) : '--'}</div>
                        </div>
                        <div className="font-bold text-base">{quickestPair ? formatPrice(quickestPair.totalPrice) : '--'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Row Card */}
                  {selectedOutbound && selectedInbound && (
                    <div className={cn(
                      "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6 transition-all duration-700 sticky top-2 z-30 mb-2",
                      glow && "ring-2 ring-blue-300/60 shadow-blue-200"
                    )}>
                      <div className="flex flex-row items-center px-4 py-4 gap-0">
                        {/* Outbound */}
                        <div className="flex flex-col items-center flex-1 min-w-0">
                          <div className="flex flex-row items-center w-full justify-center gap-3">
                            <div className="flex flex-col items-center min-w-[56px]">
                              <img src={selectedOutbound.airlineLogo} alt={selectedOutbound.airlineName} className="h-7 w-7 rounded bg-[#f8f8f8] mb-0.5" />
                              <span className="text-[10px] text-gray-500 leading-none mt-0.5">{selectedOutbound.airlineName}</span>
                            </div>
                            <div className="flex flex-col items-center min-w-[48px]">
                              <span className="text-lg font-bold text-black leading-none">{selectedOutbound.departureTime}</span>
                              <span className="text-[11px] text-gray-500 leading-none">{selectedOutbound.departureCode}</span>
                            </div>
                            <div className="flex flex-col items-center min-w-[64px] mx-1">
                              <span className="text-[13px] font-semibold text-gray-400 leading-none">{selectedOutbound.duration}</span>
                              <hr className="w-full border-t border-gray-300 my-1 mx-0" />
                              <span className="text-xs text-gray-400 leading-none">{selectedOutbound.stops}</span>
                            </div>
                            <div className="flex flex-col items-center min-w-[48px]">
                              <span className="text-lg font-bold text-black leading-none">{selectedOutbound.arrivalTime}</span>
                              <span className="text-[11px] text-gray-500 leading-none">{selectedOutbound.arrivalCode}</span>
                            </div>
                          </div>
                        </div>
                        {/* Divider */}
                        <div className="w-px h-16 bg-gray-200 mx-1" />
                        {/* Inbound */}
                        <div className="flex flex-col items-center flex-1 min-w-0">
                          <div className="flex flex-row items-center w-full justify-center gap-3">
                            <div className="flex flex-col items-center min-w-[56px]">
                              <img src={selectedInbound.airlineLogo} alt={selectedInbound.airlineName} className="h-7 w-7 rounded bg-[#f8f8f8] mb-0.5" />
                              <span className="text-[10px] text-gray-500 leading-none mt-0.5">{selectedInbound.airlineName}</span>
                            </div>
                            <div className="flex flex-col items-center min-w-[48px]">
                              <span className="text-lg font-bold text-black leading-none">{selectedInbound.departureTime}</span>
                              <span className="text-[11px] text-gray-500 leading-none">{selectedInbound.departureCode}</span>
                            </div>
                            <div className="flex flex-col items-center min-w-[64px] mx-1">
                              <span className="text-[13px] font-semibold text-gray-400 leading-none">{selectedInbound.duration}</span>
                              <hr className="w-full border-t border-gray-300 my-1 mx-0" />
                              <span className="text-xs text-gray-400 leading-none">{selectedInbound.stops}</span>
                            </div>
                            <div className="flex flex-col items-center min-w-[48px]">
                              <span className="text-lg font-bold text-black leading-none">{selectedInbound.arrivalTime}</span>
                              <span className="text-[11px] text-gray-500 leading-none">{selectedInbound.arrivalCode}</span>
                            </div>
                          </div>
                        </div>
                        {/* Price & Action */}
                        <div className="flex flex-row justify-center min-w-[280px] pl-4 gap-4">
                          <div className="flex flex-col justify-center items-end">
                            <div className="text-xl font-bold text-black">
                              <span className="whitespace-nowrap flex items-center gap-1 font-sans tabular-nums">
                                <span>₹</span>
                                <SlidingNumber value={parseInt(totalPrice.replace(/[^0-9]/g, '')) || 0} />
                              </span>
                            </div>
                            <div className="text-xs text-gray-700 mt-1">Get ₹600 off with FLY</div>
                          </div>
                          <div className="flex items-center">
                            <Button className="bg-black hover:bg-black/90 text-white font-semibold rounded-lg px-5 py-2 text-sm min-w-[110px]" onClick={() => handleTripSelect({ outbound: selectedOutbound, inbound: selectedInbound, totalPrice })}>Book now</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Price Filters Card */}
                  <div className="relative mt-2 mb-4">
                    {/* Scroll indicator (fade effect) */}
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-10 z-10 bg-gradient-to-l from-white via-white/80 to-transparent hidden sm:block" />
                    <div className="flex overflow-x-auto gap-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-1 pb-1"
                      style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                      {airlines.map((airline) => (
                        <button
                          key={airline.id}
                          className={cn(
                            "flex items-center justify-between p-2.5 rounded-lg border transition-all h-[52px] min-w-[160px] max-w-[180px] flex-shrink-0",
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
                              <div className="text-xs text-gray-500 mt-0.5">₹{airline.price}</div>
                            </div>
                          </div>
                          {selectedQuickFilters.includes(airline.id) && (
                            <span className="h-4 w-4 text-blue-600 flex-shrink-0">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Outbound & Inbound Flight Lists Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6">
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Outbound List */}
                        <div>
                          <DatesCard
                            dates={outboundDates}
                            selectedIdx={selectedOutboundDateIdx}
                            onSelect={setSelectedOutboundDateIdx}
                          />
                          <hr className="my-1 border-gray-200" />
                          <div className="mb-2 text-xs font-semibold text-gray-700">
                            New York → Dubai · {outboundDates[selectedOutboundDateIdx]?.date}
                          </div>
                          <div className="flex flex-col gap-2">
                            {filteredOutboundFlights.map((option, idx) => (
                              <button
                                key={idx}
                                className={cn(
                                  "rounded-md border px-3 py-2 min-w-[180px] text-left transition-all",
                                  idx === selectedOutboundIdx ? "border-blue-500 bg-blue-50 font-semibold" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                                )}
                                onClick={() => handleManualOutboundSelect(idx)}
                              >
                                <div className="flex items-center gap-3 py-1">
                                  <img src={option.airlineLogo} alt={option.airlineName} className="h-5 w-8 object-contain bg-white border rounded" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-base font-bold text-black">{option.departureTime}–{option.arrivalTime}</span>
                                      <span className="text-gray-500 text-xs">{option.departureCode}–{option.arrivalCode}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <span>{option.airlineName}</span>
                                      <span>· {option.stops}</span>
                                      {option.layover && <span>· {option.layover}</span>}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-base font-bold text-black">₹{option.price}</div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        {/* Inbound List */}
                        <div>
                          <DatesCard
                            dates={inboundDates}
                            selectedIdx={selectedInboundDateIdx}
                            onSelect={setSelectedInboundDateIdx}
                          />
                          <hr className="my-1 border-gray-200" />
                          <div className="mb-2 text-xs font-semibold text-gray-700">
                            Dubai → New York · {inboundDates[selectedInboundDateIdx]?.date}
                          </div>
                          <div className="flex flex-col gap-2">
                            {filteredInboundFlights.map((option, idx) => (
                              <button
                                key={idx}
                                className={cn(
                                  "rounded-md border px-3 py-2 min-w-[180px] text-left transition-all",
                                  idx === selectedInboundIdx ? "border-blue-500 bg-blue-50 font-semibold" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                                )}
                                onClick={() => handleManualInboundSelect(idx)}
                              >
                                <div className="flex items-center gap-3 py-1">
                                  <img src={option.airlineLogo} alt={option.airlineName} className="h-5 w-8 object-contain bg-white border rounded" />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-base font-bold text-black">{option.departureTime}–{option.arrivalTime}</span>
                                      <span className="text-gray-500 text-xs">{option.departureCode}–{option.arrivalCode}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <span>{option.airlineName}</span>
                                      <span>· {option.stops}</span>
                                      {option.layover && <span>· {option.layover}</span>}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-base font-bold text-black">₹{option.price}</div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fare Selection Modal */}
      <FareSelectionModal
        open={isFareModalOpen}
        trip={fareModalTrip}
        onClose={() => setFareModalOpen(false)}
        onFareSelected={handleFareSelected}
      />
    </div>
  );
}
