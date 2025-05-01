
import React, { useState, useEffect } from 'react';
import Header from './Header';
import AiMessage from './AiMessage';
import FilterChips from './FilterChips';
import TripList from './TripList';
import ChatInput from './ChatInput';
import TripTools from './TripTools';
import SelectedTripDetail from './SelectedTripDetail';
import { mockTrips } from './mockData';
import { toast } from 'sonner';
import { InsightProps } from './FlightInsights';

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
}

export default function MainCuration({ searchQuery, onBack, onViewTrip }: TripCurationProps) {
  console.log('MainCuration rendering with searchQuery:', searchQuery);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [thinking, setThinking] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [budgetRange, setBudgetRange] = useState({ min: 1000, max: 5000 });
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [alternativeDates, setAlternativeDates] = useState<string[]>([
    'June 5 - June 12, 2025',
    'June 15 - June 22, 2025',
    'July 1 - July 8, 2025'
  ]);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

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

  useEffect(() => {
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
  }, [searchQuery]);

  const handleSubmitMessage = () => {
    if (!userMessage.trim()) return;
    
    toast.success("Message received!", {
      description: "I'll adjust your recommendations accordingly.",
    });
    setMessage(prev => `${prev} I've refined the options based on your preferences.`);
    setUserMessage('');
  };

  const handleSelectDate = (date: string) => {
    toast.success(`Selected alternative dates: ${date}`, {
      description: "Updating availability for the new dates...",
    });
  };

  const handleTripSelect = (trip: any) => {
    setSelectedTrip(trip);
  };

  const handleProceedToBook = () => {
    if (selectedTrip) {
      onViewTrip(selectedTrip);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <Header onBack={onBack} />

      {/* Main content - Two-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Chat & Flight List */}
        <div className="flex flex-col w-full md:w-5/12 lg:w-5/12 overflow-hidden border-r border-gray-200">
          {/* AI message */}
          <AiMessage loading={loading} thinking={thinking} message={message} />

          {/* Filter chips */}
          <FilterChips />

          {/* Trip proposals */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <TripList 
              trips={trips} 
              loading={loading} 
              onViewTrip={handleTripSelect} 
              selectedTrip={selectedTrip}
            />
          </div>
          
          {/* Assistant input */}
          <div className="sticky bottom-0 border-t border-gray-200 bg-white p-3">
            <ChatInput 
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              onSubmitMessage={handleSubmitMessage}
            />
            <TripTools 
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
              budgetRange={budgetRange}
              setBudgetRange={setBudgetRange}
              alternativeDates={alternativeDates}
              handleSelectDate={handleSelectDate}
            />
          </div>
        </div>

        {/* Right Column - Selected Trip Details */}
        <div className="hidden md:flex md:w-7/12 lg:w-7/12 flex-col overflow-hidden">
          {selectedTrip ? (
            <SelectedTripDetail 
              trip={selectedTrip} 
              insights={mockInsights}
              onProceedToBook={handleProceedToBook} 
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <p className="text-gray-500 text-lg">Select a trip to see details</p>
            </div>
          )}
        </div>

        {/* Mobile view - Only show the selected trip if it's selected */}
        {selectedTrip && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="bg-white h-full">
              <SelectedTripDetail 
                trip={selectedTrip} 
                insights={mockInsights}
                onProceedToBook={handleProceedToBook} 
                onBack={() => setSelectedTrip(null)}
                isMobile={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
