import React from 'react';
import { ArrowLeft, X, ArrowRightLeft, ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  onBack: () => void;
  origin?: string;
  destination?: string;
  departureDate?: Date;
  returnDate?: Date;
  passengers?: number;
  cabinClass?: string;
  onSwap?: () => void;
  onUpdate?: () => void;
}

const Header = ({ 
  onBack, 
  origin = "Bengaluru",
  destination = "London",
  departureDate,
  returnDate,
  passengers = 1,
  cabinClass = "Economy",
  onSwap,
  onUpdate
}: HeaderProps) => {
  const formatDate = (date?: Date) => {
    if (!date) return "--/--";
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
    }).format(date);
  };

  return (
    <header className="border-b border-gray-200 bg-white w-full">
      <div className="flex h-16 items-center w-full">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-black">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {/* Logo removed */}
        {/* Search Pill */}
        <div className="flex-1 flex items-center justify-center">
          <div className="ml-6 w-[75%]">
            <div className="flex items-center w-full rounded-lg bg-white border border-gray-200 overflow-hidden">
              {/* Location Fields Wrapper */}
              <div className="relative flex flex-[1.5] flex-row items-center min-w-[180px]">
                {/* Origin input */}
                <div className="flex-1 flex items-center justify-between px-2 py-1">
                  <span className="text-sm font-medium text-gray-900 truncate max-w-[100px] capitalize">{origin}</span>
                </div>
                {/* Swap button */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={onSwap}
                    className="rounded-full bg-white border border-gray-300 text-gray-700 p-1 hover:bg-gray-100 transition-all mx-1 text-xs"
                    aria-label="Swap locations"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </button>
                </div>
                {/* Destination input */}
                <div className="flex-1 flex items-center justify-between px-2 py-1">
                  <span className="text-sm font-medium text-gray-900 truncate max-w-[100px] capitalize">{destination}</span>
                </div>
              </div>
              {/* Dates */}
              <div className="flex-1 flex items-center justify-center px-2 py-1 min-w-[160px] border-l border-gray-100">
                <span className="text-sm text-gray-700 font-normal truncate">
                  {formatDate(departureDate)} — {formatDate(returnDate)}
                </span>
              </div>
              {/* Passengers & Class */}
              <div className="flex-1 flex items-center justify-center px-2 py-1 min-w-[140px] border-l border-gray-100">
                <span className="text-sm text-gray-700 font-normal truncate">
                  {passengers} adult{passengers && passengers > 1 ? 's' : ''}, {cabinClass?.toLowerCase()}
                </span>
              </div>
              {/* Update button */}
              <div className="flex items-center justify-center px-2 py-1">
                <Button 
                  onClick={onUpdate}
                  className="bg-black hover:bg-gray-900 text-white font-semibold rounded-md px-3 py-[2px] text-xs"
                >
                  <span className="text-xs">Update</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
