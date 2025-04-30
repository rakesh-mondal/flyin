
import React, { useState, useEffect } from 'react';
import Header from './Header';
import AiMessage from './AiMessage';
import FilterChips from './FilterChips';
import TripList from './TripList';
import ChatInput from './ChatInput';
import TripTools from './TripTools';
import { mockTrips } from './mockData';
import { toast } from 'sonner';

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
}

export default function TripCuration({ searchQuery, onBack, onViewTrip }: TripCurationProps) {
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

  useEffect(() => {
    const thinkingMessages = [
      "Finding the perfect matches for you...",
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
      setTrips(mockTrips);
      
      // Set AI response based on search query
      if (searchQuery.toLowerCase().includes('beach')) {
        setMessage("Here are some beautiful beach destinations for your getaway. I've focused on places with pristine shores and excellent weather.");
      } else if (searchQuery.toLowerCase().includes('mountains')) {
        setMessage("I found these mountain retreats that offer stunning views and great hiking opportunities.");
      } else if (searchQuery.toLowerCase().includes('paris') || searchQuery.toLowerCase().includes('france')) {
        setMessage("Paris is beautiful year-round. Here are some options I think you'll love, with excellent accommodations near major attractions.");
      } else {
        setMessage(`Based on your interest in "${searchQuery}", I've curated these personalized journeys that I think you'll love.`);
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

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <Header onBack={onBack} />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* AI message */}
        <AiMessage loading={loading} thinking={thinking} message={message} />

        {/* Filter chips */}
        <FilterChips />

        {/* Trip proposals */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <TripList 
            trips={trips} 
            loading={loading} 
            onViewTrip={onViewTrip} 
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
    </div>
  );
}
