import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Airline {
  id: string;
  name: string;
  logo?: string;
}

interface HorizontalFiltersProps {
  selectedStops: string[];
  onStopsChange: (stops: string[]) => void;
  selectedDepartureTimeSlot: string | null;
  onDepartureTimeChange: (time: string | null) => void;
  selectedReturnTimeSlot: string | null;
  onReturnTimeChange: (time: string | null) => void;
  selectedAirlines: string[];
  onAirlinesChange: (airlines: string[]) => void;
}

const airlines: Airline[] = [
  { id: 'emirates', name: 'Emirates', logo: 'https://airhex.com/images/airline-logos/emirates.png' },
  { id: 'air-india', name: 'Air India', logo: 'https://airhex.com/images/airline-logos/air-india.png' },
  { id: 'etihad', name: 'Etihad', logo: 'https://airhex.com/images/airline-logos/etihad-airways.png' },
  { id: 'vistara', name: 'Vistara', logo: 'https://airhex.com/images/airline-logos/vistara.png' },
  { id: 'qatar', name: 'Qatar Airways', logo: 'https://airhex.com/images/airline-logos/qatar-airways.png' },
  { id: 'lufthansa', name: 'Lufthansa', logo: 'https://airhex.com/images/airline-logos/lufthansa.png' },
  { id: 'singapore', name: 'Singapore Airlines', logo: 'https://airhex.com/images/airline-logos/singapore-airlines.png' }
];

const stopsOptions = [
  { label: 'Non-stop', value: 'non-stop' },
  { label: '1 stop', value: '1-stop' },
  { label: '2+ stops', value: '2-more' }
];

const timeSlots = [
  { label: 'Before 6 AM', value: 'before-6am' },
  { label: '6 AM - 12 PM', value: '6am-12pm' },
  { label: '12 PM - 6 PM', value: '12pm-6pm' },
  { label: 'After 6 PM', value: 'after-6pm' }
];

const HorizontalFilters = ({
  selectedStops,
  onStopsChange,
  selectedDepartureTimeSlot,
  onDepartureTimeChange,
  selectedReturnTimeSlot,
  onReturnTimeChange,
  selectedAirlines,
  onAirlinesChange,
}: HorizontalFiltersProps) => {
  // By default, select all airlines if none are selected
  React.useEffect(() => {
    if (!selectedAirlines || selectedAirlines.length === 0) {
      onAirlinesChange(airlines.map(a => a.id));
    }
    // eslint-disable-next-line
  }, []);

  const allSelected = selectedAirlines.length === airlines.length;
  const someSelected = selectedAirlines.length > 0 && !allSelected;

  const handleToggleAirline = (id: string) => {
    if (selectedAirlines.includes(id)) {
      onAirlinesChange(selectedAirlines.filter(a => a !== id));
    } else {
      onAirlinesChange([...selectedAirlines, id]);
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      onAirlinesChange([]);
    } else {
      onAirlinesChange(airlines.map(a => a.id));
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center gap-4 p-4 bg-white w-full max-w-4xl">
        {/* Stops Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Stops:</span>
          <div className="flex gap-1">
            {stopsOptions.map(opt => (
              <Button
                key={opt.value}
                variant="outline"
                size="sm"
                className={cn(
                  'h-8 px-3',
                  selectedStops.includes(opt.value)
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white'
                )}
                onClick={() => {
                  if (selectedStops.includes(opt.value)) {
                    onStopsChange(selectedStops.filter(s => s !== opt.value));
                  } else {
                    onStopsChange([...selectedStops, opt.value]);
                  }
                }}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Flight Timing Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Departure:</span>
          <Select
            value={selectedDepartureTimeSlot || ''}
            onValueChange={(value) => onDepartureTimeChange(value || null)}
          >
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map(slot => (
                <SelectItem key={slot.value} value={slot.value}>
                  {slot.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Airlines Filter - Multi-select Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Airlines:</span>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 min-w-[140px] flex items-center justify-between"
              onClick={() => {
                const dropdown = document.getElementById('airlines-dropdown');
                if (dropdown) dropdown.classList.toggle('hidden');
              }}
            >
              {allSelected
                ? 'All Airlines'
                : someSelected
                ? `${selectedAirlines.length} selected`
                : 'Select airline'}
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </Button>
            <div
              id="airlines-dropdown"
              className="hidden absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-50"
            >
              <div className="px-3 py-2 border-b flex items-center gap-2 cursor-pointer hover:bg-gray-50" onClick={handleSelectAll}>
                <input type="checkbox" checked={allSelected} readOnly className="mr-2" />
                <span className="font-medium">All Airlines</span>
              </div>
              {airlines.map(airline => (
                <div
                  key={airline.id}
                  className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleToggleAirline(airline.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedAirlines.includes(airline.id)}
                    readOnly
                    className="mr-2"
                  />
                  {airline.logo && (
                    <img src={airline.logo} alt={airline.name} className="h-4 w-6 object-contain mr-2" />
                  )}
                  <span>{airline.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalFilters; 