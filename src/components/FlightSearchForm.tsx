
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, X, ArrowRightLeft, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowEffect } from './ui/glow-effect';

interface FlightSearchFormProps {
  onSearch: (query: string) => void;
}

export default function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const [origin, setOrigin] = useState('Bengaluru (BLR)');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('Departure — Return');
  const [passengers, setPassengers] = useState('1 adult, Economy');
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Origin input */}
        <div className="relative">
          {focusedField === 'origin' && (
            <GlowEffect
              colors={['#0894FF', '#C959DD']} 
              mode="static"
              blur="medium"
              scale={1.03}
              className="rounded-xl opacity-60"
            />
          )}
          <div className="relative z-10">
            <label htmlFor="origin" className="mb-1 block text-xs font-medium text-gray-600">From</label>
            <div className="relative">
              <Input
                id="origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                onFocus={() => setFocusedField('origin')}
                onBlur={() => setFocusedField(null)}
                placeholder="From?"
                className={cn(
                  "h-14 rounded-xl bg-gray-100 pl-4 pr-10 text-lg",
                  "focus:border-transparent focus:bg-white focus:ring-1 focus:ring-primary/50"
                )}
              />
              {origin && (
                <button
                  type="button"
                  onClick={clearOrigin}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Destination input */}
        <div className="relative">
          {focusedField === 'destination' && (
            <GlowEffect
              colors={['#C959DD', '#FF2E54']} 
              mode="static"
              blur="medium"
              scale={1.03}
              className="rounded-xl opacity-60"
            />
          )}
          <div className="relative z-10">
            <label htmlFor="destination" className="mb-1 block text-xs font-medium text-gray-600">To</label>
            <div className="relative">
              <Input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setFocusedField('destination')}
                onBlur={() => setFocusedField(null)}
                placeholder="To?"
                className={cn(
                  "h-14 rounded-xl bg-gray-100 pl-4 pr-3 text-lg",
                  "focus:border-transparent focus:bg-white focus:ring-1 focus:ring-primary/50"
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Swap button - positioned between the two inputs */}
      <div className="absolute left-1/2 top-[79px] z-20 -translate-x-1/2 -translate-y-1/2 md:block">
        <Button
          type="button"
          onClick={handleSwapLocations}
          size="icon"
          className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-50"
          variant="outline"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Date and Passengers row */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Date input */}
        <div className="relative">
          {focusedField === 'dates' && (
            <GlowEffect
              colors={['#FF2E54', '#FF9004']} 
              mode="static"
              blur="medium"
              scale={1.03}
              className="rounded-xl opacity-60"
            />
          )}
          <div className="relative z-10">
            <label htmlFor="dates" className="mb-1 block text-xs font-medium text-gray-600">When</label>
            <div className="relative">
              <Input
                id="dates"
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                onFocus={() => setFocusedField('dates')}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "h-14 rounded-xl bg-gray-100 pl-4 pr-10 text-lg",
                  "focus:border-transparent focus:bg-white focus:ring-1 focus:ring-primary/50"
                )}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Calendar className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Passengers input */}
        <div className="relative">
          {focusedField === 'passengers' && (
            <GlowEffect
              colors={['#FF9004', '#0894FF']} 
              mode="static"
              blur="medium"
              scale={1.03}
              className="rounded-xl opacity-60"
            />
          )}
          <div className="relative z-10">
            <label htmlFor="passengers" className="mb-1 block text-xs font-medium text-gray-600">Who</label>
            <div className="relative">
              <Input
                id="passengers"
                type="text"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                onFocus={() => setFocusedField('passengers')}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "h-14 rounded-xl bg-gray-100 pl-4 pr-10 text-lg",
                  "focus:border-transparent focus:bg-white focus:ring-1 focus:ring-primary/50"
                )}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Users className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search button */}
      <div className="flex justify-center">
        <Button 
          type="submit" 
          className="h-14 w-full max-w-xs rounded-xl bg-black text-lg font-medium text-white hover:bg-black/90"
        >
          <Search className="mr-2 h-5 w-5" />
          Search Flights
        </Button>
      </div>
    </form>
  );
}
