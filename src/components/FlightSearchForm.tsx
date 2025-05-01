import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, X, ArrowRightLeft, ArrowUpDown } from 'lucide-react';
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
    <div className="overflow-hidden rounded-3xl bg-white border border-border shadow-sm">
      <form onSubmit={handleSubmit} className="flex w-full flex-col lg:flex-row">
        {/* Location Fields Group */}
        <div className="relative flex flex-1 lg:flex-[2] flex-col sm:flex-row">
          {/* Origin input */}
          <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-border">
            <div className="px-5 py-3">
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
                  className="w-full border-none bg-transparent py-1.5 text-base outline-none placeholder:text-gray-400"
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

          {/* Swap button - positioned relative to the location group */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            {/* Mobile swap button */}
            <button
              type="button"
              onClick={handleSwapLocations}
              className="sm:hidden rounded-full bg-white border border-gray-200 text-gray-600 p-1.5 shadow-sm hover:bg-gray-50"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
            {/* Desktop swap button */}
            <button
              type="button"
              onClick={handleSwapLocations}
              className="hidden sm:block rounded-full bg-white border border-gray-200 text-gray-600 p-2 shadow-sm hover:bg-gray-50"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </button>
          </div>

          {/* Destination input */}
          <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-border">
            <div className="px-5 py-3">
              <label htmlFor="destination" className="block text-xs font-medium text-gray-500">
                To
              </label>
              <input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="To?"
                className="w-full border-none bg-transparent py-1.5 text-base outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Dates input */}
        <div className="relative flex-1 border-b lg:border-b-0 lg:border-r border-border">
          <div className="px-5 py-3">
            <label htmlFor="dates" className="block text-xs font-medium text-gray-500">
              Dates
            </label>
            <input
              id="dates"
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="w-full border-none bg-transparent py-1.5 text-base outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Passengers input */}
        <div className="relative flex-1 border-b lg:border-b-0 lg:border-r border-border">
          <div className="px-5 py-3">
            <label htmlFor="passengers" className="block text-xs font-medium text-gray-500">
              Who
            </label>
            <input
              id="passengers"
              type="text"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full border-none bg-transparent py-1.5 text-base outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Search button */}
        <div className="flex items-center justify-center p-3">
          {/* Mobile search button */}
          <Button 
            type="submit" 
            className="sm:hidden h-10 px-6 rounded-full bg-black text-white hover:bg-black/90"
          >
            Search Flight
          </Button>
          {/* Desktop search button */}
          <Button 
            type="submit" 
            className="hidden sm:flex h-12 w-12 rounded-full bg-black p-0 hover:bg-black/90"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
