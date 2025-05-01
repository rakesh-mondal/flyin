
import React from 'react';
import Header from './Header';
import ContentArea from './ContentArea';
import ChatButton from './ChatButton';
import ChatDrawer from './ChatDrawer';
import { useTripCuration } from '@/hooks/use-trip-curation';

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
  searchSource?: 'fly' | 'ai'; // New prop to determine if AI features should be shown
}

export default function MainCuration({ 
  searchQuery, 
  onBack, 
  onViewTrip,
  searchSource = 'fly' // Default to 'fly' mode
}: TripCurationProps) {
  const {
    trips,
    loading,
    message,
    thinking,
    userMessage,
    setUserMessage,
    budgetRange,
    setBudgetRange,
    selectedActivities,
    setSelectedActivities,
    alternativeDates,
    selectedTrip,
    setSelectedTrip,
    isChatOpen,
    setIsChatOpen,
    handleSubmitMessage,
    handleSelectDate
  } = useTripCuration(searchQuery);

  const handleTripSelect = (trip: any) => {
    setSelectedTrip(trip);
    onViewTrip(trip);
  };

  const showAIFeatures = searchSource === 'ai';

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <Header onBack={onBack} />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-full overflow-hidden bg-white">
          <ContentArea
            loading={loading}
            thinking={thinking}
            message={message}
            trips={trips}
            selectedTrip={selectedTrip}
            handleTripSelect={handleTripSelect}
            isChatOpen={isChatOpen}
            showAIFeatures={showAIFeatures}
          />
          
          {/* Chat floating button - only visible when AI features are enabled and chat is closed */}
          {showAIFeatures && !isChatOpen && (
            <ChatButton onClick={() => setIsChatOpen(true)} />
          )}
          
          {/* Chat drawer - displayed when chat is open */}
          {showAIFeatures && isChatOpen && (
            <ChatDrawer
              message={message}
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              handleSubmitMessage={handleSubmitMessage}
              selectedActivities={selectedActivities}
              setSelectedActivities={setSelectedActivities}
              budgetRange={budgetRange}
              setBudgetRange={setBudgetRange}
              alternativeDates={alternativeDates}
              handleSelectDate={handleSelectDate}
              onClose={() => setIsChatOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
