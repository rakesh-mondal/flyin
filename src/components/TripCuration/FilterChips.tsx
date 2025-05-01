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
      
      <div className="p-3 flex-col border-t border-gray-100">
        <h3 className="flex items-center text-sm font-medium mb-2">
          <span>Smart Filters</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">BETA</span>
        </h3>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-xs font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Date preferences updated!")}
          >
            <Calendar className="h-3 w-3" />
            <span>June 2025</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-xs font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Flight preferences updated!")}
          >
            <PlaneTakeoff className="h-3 w-3" />
            <span>Direct flights</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-xs font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Hotel preferences updated!")}
          >
            <Hotel className="h-3 w-3" />
            <span>4+ Stars</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-xs font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Budget preferences updated!")}
          >
            <DollarSign className="h-3 w-3" />
            <span>Budget</span>
          </Button>
        </div>
      </div>
      
      {/* Filter sections */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium">Stops</h3>
          <button 
            className="text-sm text-blue-600 hover:text-blue-700"
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
        <h3 className="text-sm font-medium mb-2">Airlines</h3>
        <div className="flex flex-wrap gap-2">
          {selectedAirlines.map(airline => (
            <Button
              key={airline}
              variant="outline"
              className="h-8 rounded-full bg-gray-50 px-3 text-sm"
              onClick={() => handleRemoveAirline(airline)}
            >
              {airline}
              <X className="ml-1 h-3 w-3" />
            </Button>
          ))}
          {selectedAirlines.length === 0 && (
            <span className="text-sm text-gray-500">No airlines selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
