
import React from 'react';
import AiMessage from './AiMessage';
import FilterChips from './FilterChips';
import TripList from './TripList';

interface ContentAreaProps {
  loading: boolean;
  thinking: string;
  message: string;
  trips: any[];
  selectedTrip: any;
  handleTripSelect: (trip: any) => void;
  isChatOpen: boolean;
  showAIFeatures: boolean;
}

const ContentArea = ({
  loading,
  thinking,
  message,
  trips,
  selectedTrip,
  handleTripSelect,
  isChatOpen,
  showAIFeatures
}: ContentAreaProps) => {
  return (
    <>
      {/* AI welcome message - only when AI features are enabled and chat is not open */}
      {showAIFeatures && !isChatOpen && (
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
    </>
  );
};

export default ContentArea;
