import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, X, ArrowRightLeft, ArrowUpDown, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { format, addDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FlightSearchFormProps {
  onSearch: (query: string) => void;
}

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

const cabinClasses = [
  { id: 'economy', name: 'Economy' },
  { id: 'premium', name: 'Premium Economy' },
  { id: 'business', name: 'Business' },
  { id: 'first', name: 'First Class' }
];

export default function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState<PassengerCount>({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [cabinClass, setCabinClass] = useState('economy');
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!origin.trim()) {
      toast.error('Please enter departure city');
      return;
    }
    if (!destination.trim()) {
      toast.error('Please enter destination city');
      return;
    }
    if (!departureDate) {
      toast.error('Please select departure date');
      return;
    }
    if (isRoundTrip && !returnDate) {
      toast.error('Please select return date');
      return;
    }
    if (returnDate && isBefore(returnDate, departureDate)) {
      toast.error('Return date cannot be before departure date');
      return;
    }

    // Format dates
    const formattedDepartureDate = format(departureDate, 'MMM dd, yyyy');
    const formattedReturnDate = returnDate ? format(returnDate, 'MMM dd, yyyy') : '';

    // Create search query
    const searchQuery = {
      origin,
      destination,
      departureDate: formattedDepartureDate,
      returnDate: formattedReturnDate,
      passengers,
      cabinClass,
      isRoundTrip
    };

    onSearch(JSON.stringify(searchQuery));
  };

  const handleSwapLocations = () => {
    if (!origin.trim() || !destination.trim()) {
      toast.error('Please enter both cities to swap');
      return;
    }
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const clearOrigin = () => {
    setOrigin('');
  };

  const clearDestination = () => {
    setDestination('');
  };

  const updatePassengerCount = (type: keyof PassengerCount, action: 'increment' | 'decrement') => {
    setPassengers(prev => {
      const newCount = { ...prev };
      if (action === 'increment') {
        if (type === 'adults' && prev.adults < 9) {
          newCount.adults++;
        } else if (type === 'children' && prev.children < 9) {
          newCount.children++;
        } else if (type === 'infants' && prev.infants < 9) {
          newCount.infants++;
        }
      } else {
        if (type === 'adults' && prev.adults > 1) {
          newCount.adults--;
        } else if (type === 'children' && prev.children > 0) {
          newCount.children--;
        } else if (type === 'infants' && prev.infants > 0) {
          newCount.infants--;
        }
      }
      return newCount;
    });
  };

  const formatPassengerText = () => {
    const parts = [];
    if (passengers.adults > 0) {
      parts.push(`${passengers.adults} ${passengers.adults === 1 ? 'Adult' : 'Adults'}`);
    }
    if (passengers.children > 0) {
      parts.push(`${passengers.children} ${passengers.children === 1 ? 'Child' : 'Children'}`);
    }
    if (passengers.infants > 0) {
      parts.push(`${passengers.infants} ${passengers.infants === 1 ? 'Infant' : 'Infants'}`);
    }
    return parts.join(', ') + `, ${cabinClasses.find(c => c.id === cabinClass)?.name}`;
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
                  placeholder="City or Airport"
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

          {/* Swap button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="rounded-full bg-white border border-gray-200 text-gray-600 p-2 shadow-sm hover:bg-gray-50"
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
              <div className="relative">
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="City or Airport"
                  className="w-full border-none bg-transparent py-1.5 text-base outline-none placeholder:text-gray-400"
                />
                {destination && (
                  <button
                    type="button"
                    onClick={clearDestination}
                    className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="relative flex-1 border-b lg:border-b-0 lg:border-r border-border">
          <div className="px-5 py-3">
            <label className="block text-xs font-medium text-gray-500">
              Dates
            </label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center justify-between py-1.5 text-base outline-none",
                    !departureDate && "text-gray-400"
                  )}
                >
                  <span>
                    {departureDate ? format(departureDate, 'MMM dd') : 'Departure'} — {returnDate ? format(returnDate, 'MMM dd') : 'Return'}
                  </span>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex gap-2 p-3">
                  <button
                    type="button"
                    onClick={() => setIsRoundTrip(true)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full",
                      isRoundTrip ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                    )}
                  >
                    Round-trip
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRoundTrip(false);
                      setReturnDate(undefined);
                    }}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full",
                      !isRoundTrip ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                    )}
                  >
                    One-way
                  </button>
                </div>
                {isRoundTrip ? (
                  <CalendarComponent
                    mode="range"
                    selected={{ from: departureDate, to: returnDate }}
                    onSelect={(date) => {
                      if ('from' in date) {
                        setDepartureDate(date.from);
                        setReturnDate(date.to);
                      }
                    }}
                    disabled={(date) => isBefore(date, startOfDay(new Date()))}
                    numberOfMonths={2}
                  />
                ) : (
                  <CalendarComponent
                    mode="single"
                    selected={departureDate}
                    onSelect={(date) => {
                      setDepartureDate(date as Date);
                    }}
                    disabled={(date) => isBefore(date, startOfDay(new Date()))}
                    numberOfMonths={1}
                  />
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Passengers & Class */}
        <div className="relative flex-1 border-b lg:border-b-0 lg:border-r border-border">
          <div className="px-5 py-3">
            <label className="block text-xs font-medium text-gray-500">
              Who
            </label>
            <Popover open={isPassengerOpen} onOpenChange={setIsPassengerOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-1.5 text-base outline-none"
                >
                  <span>{formatPassengerText()}</span>
                  <Users className="h-4 w-4 text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Adults</p>
                      <p className="text-sm text-gray-500">Age 12+</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updatePassengerCount('adults', 'decrement')}
                        className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        disabled={passengers.adults <= 1}
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{passengers.adults}</span>
                      <button
                        type="button"
                        onClick={() => updatePassengerCount('adults', 'increment')}
                        className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        disabled={passengers.adults >= 9}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Children</p>
                      <p className="text-sm text-gray-500">Age 2-11</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updatePassengerCount('children', 'decrement')}
                        className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        disabled={passengers.children <= 0}
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{passengers.children}</span>
                      <button
                        type="button"
                        onClick={() => updatePassengerCount('children', 'increment')}
                        className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        disabled={passengers.children >= 9}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Infants</p>
                      <p className="text-sm text-gray-500">Under 2</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updatePassengerCount('infants', 'decrement')}
                        className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        disabled={passengers.infants <= 0}
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{passengers.infants}</span>
                      <button
                        type="button"
                        onClick={() => updatePassengerCount('infants', 'increment')}
                        className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                        disabled={passengers.infants >= 9}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Cabin Class */}
                  <div className="pt-4 border-t">
                    <p className="font-medium mb-2">Cabin Class</p>
                    <Select value={cabinClass} onValueChange={setCabinClass}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select cabin class" />
                      </SelectTrigger>
                      <SelectContent>
                        {cabinClasses.map((cabin) => (
                          <SelectItem key={cabin.id} value={cabin.id}>
                            {cabin.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Search button */}
        <div className="flex items-center justify-center p-3">
          <Button 
            type="submit" 
            className="h-12 w-12 rounded-full bg-black p-0 hover:bg-black/90"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
