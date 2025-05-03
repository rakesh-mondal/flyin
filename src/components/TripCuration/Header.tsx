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
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="flex h-14 items-center px-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-black">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        {/* Logo */}
        <img 
          src="/lovable-uploads/b3b14138-007e-4f04-b265-b44f5f351a9b.png" 
          alt="Flyin.com" 
          className="h-5 ml-2" 
        />

        {/* Search Details */}
        <div className="flex-1 flex justify-center">
          <div className="w-[75%]">
            <div className="overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="flex w-full flex-col sm:flex-row items-stretch">
                {/* Location Fields Wrapper */}
                <div className="relative flex flex-[1.5] flex-col sm:flex-row">
                  {/* Origin input */}
                  <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
                    <div className="px-2 sm:px-3 py-2.5">
                      <div className="flex items-center">
                        <span className="text-xs truncate max-w-[80px] sm:max-w-full">{origin}</span>
                        <button className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Destination input */}
                  <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
                    <div className="px-2 sm:px-3 py-2.5">
                      <div className="flex items-center">
                        <span className="text-xs truncate max-w-[80px] sm:max-w-full">{destination}</span>
                        <button className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile swap button */}
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 sm:hidden">
                    <button
                      type="button"
                      onClick={onSwap}
                      className="rounded-full bg-white border border-gray-200 text-gray-600 p-1 shadow-sm hover:bg-gray-50"
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Desktop swap button */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:block">
                    <button
                      type="button"
                      onClick={onSwap}
                      className="rounded-full bg-white border border-gray-200 text-gray-600 p-1.5 shadow-sm hover:bg-gray-50"
                    >
                      <ArrowRightLeft className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
                  <div className="px-2 sm:px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs truncate">
                        {formatDate(departureDate)}
                      </span>
                      <span className="text-xs truncate bg-gray-200 rounded px-2 py-0.5">
                        {formatDate(returnDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Passengers & Class */}
                <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
                  <div className="px-2 sm:px-3 py-2.5">
                    <div className="flex items-center">
                      <span className="text-xs truncate">{passengers} adult, {cabinClass}</span>
                    </div>
                  </div>
                </div>

                {/* Update button */}
                <div className="flex items-center justify-center p-1.5 sm:px-2">
                  <Button 
                    onClick={onUpdate}
                    className="w-full sm:w-auto h-7 px-2 bg-black hover:bg-black/90 text-white rounded-full text-xs"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
