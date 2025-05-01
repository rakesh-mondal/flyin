import React, { useState, useEffect } from 'react';
import Header from './Header';
import AiMessage from './AiMessage';
import FilterChips from './FilterChips';
import TripList from './TripList';
import ChatInput from './ChatInput';
// import SelectedTripDetail from './SelectedTripDetail';  // Commented out as we're not using it
import { mockTrips } from './mockData';
import { toast } from 'sonner';
import { InsightProps } from './FlightInsights';
import { Button } from '../ui/button';
import { ArrowRightLeft, ArrowUpDown, X, MessageCircle } from 'lucide-react';
import '@/styles/animations.css';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

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
              <label className="block text-xs font-medium text-gray-500">
                From
              </label>
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
              <label className="block text-xs font-medium text-gray-500">
                To
              </label>
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
            <label className="block text-xs font-medium text-gray-500">
              Dates
            </label>
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
            <label className="block text-xs font-medium text-gray-500">
              Who
            </label>
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
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [cabinClass, setCabinClass] = useState<string>('economy');
  const [passengerCount, setPassengerCount] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
    // Implement location swap logic
    toast.success("Locations swapped!");
  };

  const handleUpdateSearch = () => {
    // Implement search update logic
    toast.success("Updating search results...");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <div className="animate-fade-in">
        <Header onBack={onBack} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Search Summary */}
          <div className="mb-4 animate-scale-in">
            <div className="rounded-xl">
              <SearchSummary
                origin="Bengaluru"
                destination="London"
                departureDate={departureDate}
                returnDate={returnDate}
                passengers={passengerCount}
                cabinClass={cabinClass}
                onSwap={handleSwapLocations}
                onUpdate={handleUpdateSearch}
              />
            </div>
          </div>

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
            <div className="order-2 lg:order-1 lg:col-span-3">
              <div className="space-y-4 lg:sticky lg:top-4">
                {/* Filter Chips */}
                <div 
                  ref={filterRef.elementRef}
                  className={`stagger-children ${filterRef.isVisible ? 'active' : ''}`}
                >
                  <div className="rounded-xl mb-4">
                    <FilterChips
                      selectedAirlines={selectedAirlines}
                      onAirlinesChange={setSelectedAirlines}
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
                    <TripList
                      trips={trips}
                      loading={loading}
                      onViewTrip={handleTripSelect}
                      selectedTrip={selectedTrip}
                    />
                  </div>
                </div>

                {/* Selected Trip Detail - Commented out as per requirement
                {selectedTrip && (
                  <div className="animate-scale-in">
                    <div className="hover-shadow hover-scale rounded-xl transition-all">
                      <SelectedTripDetail
                        trip={selectedTrip}
                        onProceedToBook={handleProceedToBook}
                      />
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input - Sticky Bottom */}
      {isChatOpen ? (
        <div className="sticky bottom-0 border-t border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out transform mobile-slide-up active">
          <div className="container mx-auto max-w-7xl p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Ask AI Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-100"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
