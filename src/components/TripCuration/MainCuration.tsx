
import React, { useState, useEffect } from 'react';
import Header from './Header';
import AiMessage from './AiMessage';
import FilterChips from './FilterChips';
import TripList from './TripList';
import ChatInput from './ChatInput';
import TripTools from './TripTools';
import { mockTrips } from './mockData';
import { toast } from 'sonner';
import { InsightProps } from './FlightInsights';
import { Button } from '../ui/button';
import { MessageSquareText, X } from 'lucide-react';

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
}

export default function MainCuration({ searchQuery, onBack, onViewTrip }: TripCurationProps) {
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
    // Close chat after submission on mobile
    if (window.innerWidth < 768) {
      setIsChatOpen(false);
    }
  };

  const handleSelectDate = (date: string) => {
    toast.success(`Selected alternative dates: ${date}`, {
      description: "Updating availability for the new dates...",
    });
  };

  const handleTripSelect = (trip: any) => {
    setSelectedTrip(trip);
    onViewTrip(trip);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <Header onBack={onBack} />

      {/* Main content - Single column layout */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-full overflow-hidden bg-white">
          {/* AI welcome message */}
          {!isChatOpen && (
            <AiMessage loading={loading} thinking={thinking} message={message} />
          )}
          
          {/* Filter chips */}
          <FilterChips />
          
          {/* Trip list */}
          <div className="flex-1 overflow-y-auto p-3">
            <TripList 
              trips={trips} 
              loading={loading} 
              onViewTrip={handleTripSelect} 
              selectedTrip={selectedTrip}
            />
          </div>
          
          {/* Chat floating button - only visible when chat is closed */}
          {!isChatOpen && (
            <div className="fixed bottom-6 right-6 z-50">
              <Button 
                onClick={() => setIsChatOpen(true)} 
                className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
                size="icon"
              >
                <MessageSquareText className="h-6 w-6" />
              </Button>
            </div>
          )}
          
          {/* Chat drawer - displayed when chat is open */}
          {isChatOpen && (
            <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h2 className="text-lg font-medium">Ask Flyin AI</h2>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsChatOpen(false)} 
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="bg-blue-50 p-4 rounded-xl mb-4">
                  <p className="text-blue-800">{message}</p>
                </div>
                
                {/* Previous conversations would go here */}
              </div>
              
              <div className="border-t border-gray-200 p-4">
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
          )}
        </div>
      </div>
    </div>
  );
}
