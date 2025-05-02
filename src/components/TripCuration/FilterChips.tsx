import React, { useState } from 'react';
import { Calendar, PlaneTakeoff, Hotel, DollarSign, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import FlightTimings from './FlightTimings';
import { cn } from '@/lib/utils';

interface FilterChipsProps {
  selectedAirlines: string[];
  onAirlinesChange: (airlines: string[]) => void;
  onDepartureTimeChange?: (time: string) => void;
  onReturnTimeChange?: (time: string) => void;
  departureRoute?: string;
  returnRoute?: string;
}

const FilterChips = ({
  selectedAirlines,
  onAirlinesChange,
  onDepartureTimeChange,
  onReturnTimeChange,
  departureRoute,
  returnRoute,
}: FilterChipsProps) => {
  const [selectedStop, setSelectedStop] = useState<'non-stop' | '1-stop' | '2-more' | null>(null);

  const handleRemoveAirline = (airline: string) => {
    onAirlinesChange(selectedAirlines.filter(a => a !== airline));
  };

  const handleStopSelect = (stop: 'non-stop' | '1-stop' | '2-more') => {
    setSelectedStop(selectedStop === stop ? null : stop);
    toast.success(`${stop} filter ${selectedStop === stop ? 'removed' : 'applied'}`);
  };

  return (
    <div className="sticky top-0 z-10 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="p-3 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-medium">1577</span> of <span className="text-blue-600">2000</span> flights
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Track prices</span>
          <div className="h-5 w-10 bg-gray-200 rounded-full relative">
            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Filter sections */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Stops</h3>
          <button 
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
            onClick={() => {
              setSelectedStop(null);
              toast.success("Stops filter reset");
            }}
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-3 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          <button 
            className={cn(
              "flex flex-col items-center py-3 px-2 transition-colors border-r border-gray-200",
              selectedStop === 'non-stop' 
                ? "bg-blue-50 text-blue-600" 
                : "hover:bg-gray-50"
            )}
            onClick={() => handleStopSelect('non-stop')}
          >
            <span className="text-sm font-medium">Non stop</span>
            <span className={cn(
              "text-sm mt-1",
              selectedStop === 'non-stop' ? "text-blue-600" : "text-gray-500"
            )}>₹26,909</span>
          </button>
          <button 
            className={cn(
              "flex flex-col items-center py-3 px-2 transition-colors border-r border-gray-200",
              selectedStop === '1-stop' 
                ? "bg-blue-50 text-blue-600" 
                : "hover:bg-gray-50"
            )}
            onClick={() => handleStopSelect('1-stop')}
          >
            <span className="text-sm font-medium">1 stop</span>
            <span className={cn(
              "text-sm mt-1",
              selectedStop === '1-stop' ? "text-blue-600" : "text-gray-500"
            )}>₹27,464</span>
          </button>
          <button 
            className={cn(
              "flex flex-col items-center py-3 px-2 transition-colors",
              selectedStop === '2-more' 
                ? "bg-blue-50 text-blue-600" 
                : "hover:bg-gray-50"
            )}
            onClick={() => handleStopSelect('2-more')}
          >
            <span className="text-sm font-medium">2 & more</span>
            <span className={cn(
              "text-sm mt-1",
              selectedStop === '2-more' ? "text-blue-600" : "text-gray-500"
            )}>₹39,393</span>
          </button>
        </div>
      </div>
      
      {/* Flight Timings */}
      <div className="p-3 border-t border-gray-100">
        <FlightTimings
          departureRoute={departureRoute}
          returnRoute={returnRoute}
          onDepartureTimeChange={onDepartureTimeChange}
          onReturnTimeChange={onReturnTimeChange}
        />
      </div>

      {/* Airlines section */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Airlines</h3>
          <button 
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
            onClick={() => {
              onAirlinesChange([]);
              toast.success("Airlines filter reset");
            }}
          >
            Reset
          </button>
        </div>

        <div className="space-y-3">
          {/* Multi-airline option */}
          <label className="flex items-center w-full cursor-pointer group">
            <div className="flex items-center flex-1">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={selectedAirlines.includes('multi')}
                onChange={(e) => {
                  if (e.target.checked) {
                    onAirlinesChange([...selectedAirlines, 'multi']);
                  } else {
                    onAirlinesChange(selectedAirlines.filter(a => a !== 'multi'));
                  }
                }}
              />
              <span className="ml-2 text-sm">Show multi-airline itineraries</span>
            </div>
          </label>

          {/* Airlines list */}
          <div className="space-y-3">
            {/* Emirates */}
            <label className="flex items-center w-full cursor-pointer group">
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedAirlines.includes('emirates')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onAirlinesChange([...selectedAirlines, 'emirates']);
                    } else {
                      onAirlinesChange(selectedAirlines.filter(a => a !== 'emirates'));
                    }
                  }}
                />
                <div className="ml-2 flex items-center justify-between flex-1">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://airhex.com/images/airline-logos/emirates.png"
                      alt="Emirates"
                      className="h-5 w-8 object-contain"
                    />
                    <span className="text-sm">Emirates</span>
                  </div>
                  <span className="text-xs text-gray-500">from ₹65,909</span>
                </div>
              </div>
            </label>

            {/* Air India */}
            <label className="flex items-center w-full cursor-pointer group">
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedAirlines.includes('air-india')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onAirlinesChange([...selectedAirlines, 'air-india']);
                    } else {
                      onAirlinesChange(selectedAirlines.filter(a => a !== 'air-india'));
                    }
                  }}
                />
                <div className="ml-2 flex items-center justify-between flex-1">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://airhex.com/images/airline-logos/air-india.png"
                      alt="Air India"
                      className="h-5 w-8 object-contain"
                    />
                    <span className="text-sm">Air India</span>
                  </div>
                  <span className="text-xs text-gray-500">from ₹59,035</span>
                </div>
              </div>
            </label>

            {/* Etihad Airways */}
            <label className="flex items-center w-full cursor-pointer group">
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedAirlines.includes('etihad')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onAirlinesChange([...selectedAirlines, 'etihad']);
                    } else {
                      onAirlinesChange(selectedAirlines.filter(a => a !== 'etihad'));
                    }
                  }}
                />
                <div className="ml-2 flex items-center justify-between flex-1">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://airhex.com/images/airline-logos/etihad-airways.png"
                      alt="Etihad Airways"
                      className="h-5 w-8 object-contain"
                    />
                    <span className="text-sm">Etihad Airways</span>
                  </div>
                  <span className="text-xs text-gray-500">from ₹45,717</span>
                </div>
              </div>
            </label>

            {/* Show more button */}
            <button
              className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium pt-1"
              onClick={() => {
                toast.info("Loading more airlines...");
              }}
            >
              Show 8 more airlines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
