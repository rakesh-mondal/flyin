
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, X, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlightSearchFormProps {
  onSearch: (query: string) => void;
}

export default function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const [origin, setOrigin] = useState('Bengaluru (BLR)');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('Departure — Return');
  const [passengers, setPassengers] = useState('1 adult, Economy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination) {
      onSearch(`${origin} to ${destination}`);
    }
  };

  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const clearOrigin = () => {
    setOrigin('');
  };

  return (
    <div className="overflow-hidden rounded-full bg-white border border-border shadow-sm relative">
      <form onSubmit={handleSubmit} className="flex w-full flex-col md:flex-row">
        {/* Origin input */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-border">
          <div className="px-6 py-2">
            <label htmlFor="origin" className="block text-xs font-medium text-gray-500">
              From
            </label>
            <div className="relative">
              <input
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="From?"
                className="w-full border-none bg-transparent py-1 text-base outline-none"
              />
              {origin && (
                <button
                  type="button"
                  onClick={clearOrigin}
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Destination input */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-border">
          <div className="px-6 py-2">
            <label htmlFor="destination" className="block text-xs font-medium text-gray-500">
              To
            </label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="To?"
              className="w-full border-none bg-transparent py-1 text-base outline-none"
            />
          </div>
        </div>

        {/* Dates input */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-border">
          <div className="px-6 py-2">
            <label htmlFor="dates" className="block text-xs font-medium text-gray-500">
              Dates
            </label>
            <input
              id="dates"
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="w-full border-none bg-transparent py-1 text-base outline-none"
            />
          </div>
        </div>

        {/* Passengers input */}
        <div className="relative flex-1 border-b md:border-b-0 md:border-r border-border">
          <div className="px-6 py-2">
            <label htmlFor="passengers" className="block text-xs font-medium text-gray-500">
              Who
            </label>
            <input
              id="passengers"
              type="text"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full border-none bg-transparent py-1 text-base outline-none"
            />
          </div>
        </div>

        {/* Search button */}
        <div className="flex items-center justify-center p-2">
          <Button 
            type="submit" 
            className="h-12 w-12 rounded-full bg-black p-0 hover:bg-black/90"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>
      
      {/* Swap button positioned at the border between From and To */}
      <button
        type="button"
        onClick={handleSwapLocations}
        className="absolute left-0 top-1/2 -translate-y-1/2 md:translate-x-0 z-10 md:left-[25%] rounded-full bg-white p-2 shadow-sm border border-border hover:bg-gray-50"
        style={{ transform: 'translate(50%, -50%)' }}
      >
        <ArrowRightLeft className="h-4 w-4" />
      </button>
    </div>
  );
}
