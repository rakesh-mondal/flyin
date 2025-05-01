
import React from 'react';
import DualModeSearch from './DualModeSearch';
import AISearchInput from './AISearchInput';
import { Sparkles } from 'lucide-react';

interface TravelCanvasProps {
  onSearch: (query: string) => void;
  onAISearch: (query: string) => void;
}

export default function TravelCanvas({ onSearch, onAISearch }: TravelCanvasProps) {
  return (
    <div className="container relative mx-auto flex max-w-4xl flex-col items-center justify-center space-y-4 px-3 pt-6 sm:pt-12">
      <div className="flex flex-col items-center space-y-2 text-center">
        <h1 className="font-semibold text-3xl sm:text-5xl px-2">
          Let's plan your next escape.
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl px-2">
          Discover amazing places and experiences. Start planning your next adventure today!
        </p>
      </div>
      
      <DualModeSearch onSearch={onSearch} onAISearch={onAISearch}>
        <AISearchInput />
      </DualModeSearch>
      
      <div className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          width="2500"
          height="580"
          viewBox="0 0 2500 580"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 184V580L2500 580V0C1447.17 121.183 497.167 139.833 0 184Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
    </div>
  );
}
