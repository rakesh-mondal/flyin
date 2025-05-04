import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import AiMessage from './AiMessage';
import FilterChips from './FilterChips';
import TripListV1 from './v1/TripList';
import TripListV2 from './v2/TripList';
import ChatInput from './ChatInput';
// import SelectedTripDetail from './SelectedTripDetail';  // Commented out as we're not using it
import { mockTrips } from './mockData';
import { toast } from 'sonner';
import { InsightProps } from './FlightInsights';
import { Button } from '../ui/button';
import { ArrowRightLeft, ArrowUpDown, X, MessageCircle, MessageSquare } from 'lucide-react';
import '@/styles/animations.css';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import FlightOptionsSelector from './FlightOptionsSelector';

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
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
              {/* <label className="block text-xs font-medium text-gray-500">
                From
              </label> */}
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
              {/* <label className="block text-xs font-medium text-gray-500">
                To
              </label> */}
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
            {/* <label className="block text-xs font-medium text-gray-500">
              Dates
            </label> */}
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
            {/* <label className="block text-xs font-medium text-gray-500">
              Who
            </label> */}
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
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');

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

  // Mock airlines for filter
  const airlines = [
    { id: 'emirates', name: 'Emirates' },
    { id: 'etihad', name: 'Etihad Airways' },
    { id: 'qatar', name: 'Qatar Airways' },
    { id: 'turkish', name: 'Turkish Airlines' }
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
    if (!isAiSearch) {
      setLoading(false);
      const mockFlightData = mockTrips;
      setTrips(mockFlightData);
      if (mockFlightData.length > 0) {
        setSelectedTrip(mockFlightData[0]);
      }
      return;
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
    setTimeout(() => {
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
    }, 2500);

    return () => clearInterval(intervalId);
  }, [searchQuery, isAiSearch]);

  const handleSubmitMessage = () => {
    if (!userMessage.trim()) return;
    
    toast.success("Message received!", {
      description: "I'll adjust your recommendations accordingly.",
    });
    setMessage(prev => `${prev} I've refined the options based on your preferences.`);
    setUserMessage('');
  };

  const handleTripSelect = (trip: any) => {
    // Just call onViewTrip directly without setting selectedTrip
    if (onViewTrip) {
      onViewTrip(trip);
    }
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

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Compact Centered Version Toggle */}
      <div className="flex justify-center my-2">
        <div className="inline-flex gap-2 rounded-lg bg-gray-100 p-1">
          <button
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${version === 'v1' ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => setVersion('v1')}
          >
            v1
          </button>
          <button
            className={`px-3 py-1 rounded text-xs font-medium transition-all ${version === 'v2' ? 'bg-black text-white' : 'bg-white text-black'}`}
            onClick={() => setVersion('v2')}
          >
            v2
          </button>
        </div>
      </div>
      {/* Header */}
      <div className="animate-fade-in">
        <Header 
          onBack={onBack}
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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Column - Filters */}
            <div className="order-2 lg:order-1 lg:col-span-3 bg-gray-50">
              <div className="space-y-6 lg:sticky lg:top-4">
                {/* Filter Chips */}
                <div 
                  ref={filterRef.elementRef}
                  className={`stagger-children ${filterRef.isVisible ? 'active' : ''}`}
                >
                  <div className="rounded-xl mb-4">
                    <FilterChips
                      selectedAirlines={selectedAirlines}
                      onAirlinesChange={setSelectedAirlines}
                      departureRoute="DEL-BOM"
                      returnRoute="BOM-DEL"
                      onDepartureTimeChange={(time) => {
                        setDepartureTime(time);
                        toast.success("Departure time filter updated");
                      }}
                      onReturnTimeChange={(time) => {
                        setReturnTime(time);
                        toast.success("Return time filter updated");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Trip List */}
            <div className="order-1 lg:order-2 lg:col-span-9">
              <div className="space-y-4">
                {/* Trip List */}
                <div 
                  ref={tripListRef.elementRef}
                  className={`reveal ${tripListRef.isVisible ? 'visible' : ''}`}
                >
                  <div className="rounded-xl">
                    {version === 'v1' ? (
                      <TripListV1
                        trips={trips}
                        loading={loading}
                        onViewTrip={handleTripSelect}
                        selectedTrip={selectedTrip}
                      />
                    ) : (
                      <TripListV2
                        trips={trips}
                        loading={loading}
                        onViewTrip={handleTripSelect}
                        selectedTrip={selectedTrip}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input - Floating Card */}
      {isChatOpen ? (
        <div ref={chatCardRef} className="fixed bottom-6 left-1/2 -translate-x-1/2 w-1/2 min-w-[500px] max-w-3xl bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ease-in-out transform animate-fade-in">
          {/* Subtle close button in top-right corner */}
          <button
            onClick={() => setIsChatOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          
          <div className="p-6">
            <ChatInput
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              onSubmitMessage={handleSubmitMessage}
            />
          </div>
        </div>
      ) : (
        <Button
          className={cn(
            "fixed bottom-6 right-6 h-14 w-14 rounded-full bg-black text-white shadow-lg hover:bg-black/90",
            "flex items-center justify-center transition-all duration-200 hover:scale-105",
            "animate-bounce-in"
          )}
          size="icon"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
