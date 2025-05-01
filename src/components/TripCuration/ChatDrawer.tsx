
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import ChatInput from './ChatInput';
import TripTools from './TripTools';

interface ChatDrawerProps {
  message: string;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitMessage: () => void;
  selectedActivities: string[];
  setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>;
  budgetRange: { min: number; max: number };
  setBudgetRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  alternativeDates: string[];
  handleSelectDate: (date: string) => void;
  onClose: () => void;
}

const ChatDrawer = ({
  message,
  userMessage,
  setUserMessage,
  handleSubmitMessage,
  selectedActivities,
  setSelectedActivities,
  budgetRange,
  setBudgetRange,
  alternativeDates,
  handleSelectDate,
  onClose
}: ChatDrawerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-medium">Ask Flyin AI</h2>
        <Button 
          variant="ghost"
          size="icon"
          onClick={onClose} 
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
  );
};

export default ChatDrawer;
