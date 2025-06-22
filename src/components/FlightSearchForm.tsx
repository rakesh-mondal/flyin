import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, X, ArrowRightLeft, ArrowUpDown, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { format, addDays, isAfter, isBefore, startOfDay, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { PriceCalendar } from './ui/PriceCalendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Autocomplete } from './ui/Autocomplete';
import { City } from '../data/cities';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../translations';

interface FlightSearchFormProps {
  onSearch: (query: string) => void;
}

interface PassengerCount {
  adults: number;
  children: number;
  infants: number;
}

type TripType = 'one-way' | 'round-trip' | 'multi-city';

const cabinClasses = [
  { id: 'economy', name: 'Economy' },
  { id: 'premium', name: 'Premium Economy' },
  { id: 'business', name: 'Business' },
  { id: 'first', name: 'First Class' }
];

export default function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const { isRTL, language } = useLanguage();
  const { t } = useTranslation();
  const [tripType, setTripType] = useState<TripType>('round-trip');
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
  const [selectedOriginCity, setSelectedOriginCity] = useState<City | null>(null);
  const [selectedDestinationCity, setSelectedDestinationCity] = useState<City | null>(null);

  // Update isRoundTrip when tripType changes
  React.useEffect(() => {
    setIsRoundTrip(tripType === 'round-trip');
    if (tripType !== 'round-trip') {
      setReturnDate(undefined);
    }
  }, [tripType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format dates
    const formattedDepartureDate = departureDate ? format(departureDate, 'MMM dd, yyyy') : '';
    const formattedReturnDate = returnDate ? format(returnDate, 'MMM dd, yyyy') : '';
    // Create search query
    const searchQuery = {
      tripType,
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
    const tempOrigin = origin;
    const tempOriginCity = selectedOriginCity;
    setOrigin(destination);
    setDestination(tempOrigin);
    setSelectedOriginCity(selectedDestinationCity);
    setSelectedDestinationCity(tempOriginCity);
  };

  const clearOrigin = () => {
    setOrigin('');
    setSelectedOriginCity(null);
  };

  const clearDestination = () => {
    setDestination('');
    setSelectedDestinationCity(null);
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
      parts.push(`${passengers.adults} ${passengers.adults === 1 ? t('adult') : t('adults')}`);
    }
    if (passengers.children > 0) {
      parts.push(`${passengers.children} ${passengers.children === 1 ? t('child') : t('children')}`);
    }
    if (passengers.infants > 0) {
      parts.push(`${passengers.infants} ${passengers.infants === 1 ? t('infant') : t('infants')}`);
    }
    const cabinClassName = cabinClasses.find(c => c.id === cabinClass)?.name;
    const translatedCabinClass = cabinClassName === 'Economy' ? t('economy') : 
                                cabinClassName === 'Premium Economy' ? t('premiumEconomy') :
                                cabinClassName === 'Business' ? t('business') :
                                cabinClassName === 'First' ? t('first') : cabinClassName;
    return parts.join(', ') + `, ${translatedCabinClass}`;
  };

  return (
    <div className="space-y-4" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Trip Type Radio Buttons */}
      <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
          <input
            type="radio"
            name="tripType"
            value="one-way"
            checked={tripType === 'one-way'}
            onChange={(e) => setTripType(e.target.value as TripType)}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
          />
          <span className="text-sm font-medium text-gray-900">{t('oneWay')}</span>
        </label>
        
        <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
          <input
            type="radio"
            name="tripType"
            value="round-trip"
            checked={tripType === 'round-trip'}
            onChange={(e) => setTripType(e.target.value as TripType)}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
          />
          <span className="text-sm font-medium text-gray-900">{t('roundTrip')}</span>
        </label>
        
        <label className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}>
          <input
            type="radio"
            name="tripType"
            value="multi-city"
            checked={tripType === 'multi-city'}
            onChange={(e) => setTripType(e.target.value as TripType)}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
          />
          <span className="text-sm font-medium text-gray-900">{t('multiCity')}</span>
        </label>
      </div>

      {/* Search Form */}
      <div className="rounded-3xl bg-white border border-border shadow-sm">
        <form onSubmit={handleSubmit} className={`flex w-full flex-col lg:flex-row ${isRTL ? 'lg:flex-row-reverse' : ''}`} style={{ overflow: 'visible' }}>
          
          {/* Conditional rendering for RTL vs LTR layout */}
          {isRTL ? (
            <>
              {/* RTL Layout: Search button first, then form fields reversed */}
              
              {/* Search button */}
              <div className="flex items-center justify-center p-3 order-1">
                <Button 
                  type="submit" 
                  className="h-12 w-12 rounded-full bg-primary p-0 hover:bg-primary-hover text-primary-foreground group"
                >
                  <Search className="h-5 w-5 group-hover:text-primary transition-colors" />
                </Button>
              </div>

              {/* Passengers & Class */}
              <div className="relative flex-1 border-b lg:border-b-0 lg:border-l border-border order-2">
                <div className="px-5 py-3">
                  <label className="block text-xs font-medium text-gray-500 text-right">
                    {t('who')}
                  </label>
                  <Popover open={isPassengerOpen} onOpenChange={setIsPassengerOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between py-1.5 text-base outline-none flex-row-reverse"
                      >
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{formatPassengerText()}</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4" align="end">
                      <div className="space-y-4" style={{ direction: 'rtl' }}>
                        {/* Adults */}
                        <div className="flex items-center justify-between flex-row-reverse">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('adults', 'increment')}
                              className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                              disabled={passengers.adults >= 9}
                            >
                              +
                            </button>
                            <span className="w-6 text-center">{passengers.adults}</span>
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('adults', 'decrement')}
                              className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                              disabled={passengers.adults <= 1}
                            >
                              -
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{t('adults')}</p>
                            <p className="text-sm text-gray-500">{t('age12Plus')}</p>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between flex-row-reverse">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('children', 'increment')}
                              className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                              disabled={passengers.children >= 9}
                            >
                              +
                            </button>
                            <span className="w-6 text-center">{passengers.children}</span>
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('children', 'decrement')}
                              className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                              disabled={passengers.children <= 0}
                            >
                              -
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{t('children')}</p>
                            <p className="text-sm text-gray-500">{t('age2to11')}</p>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex items-center justify-between flex-row-reverse">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('infants', 'increment')}
                              className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                              disabled={passengers.infants >= 9}
                            >
                              +
                            </button>
                            <span className="w-6 text-center">{passengers.infants}</span>
                            <button
                              type="button"
                              onClick={() => updatePassengerCount('infants', 'decrement')}
                              className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                              disabled={passengers.infants <= 0}
                            >
                              -
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{t('infants')}</p>
                            <p className="text-sm text-gray-500">{t('under2')}</p>
                          </div>
                        </div>

                        {/* Cabin Class */}
                        <div className="pt-4 border-t">
                          <p className="font-medium mb-2 text-right">{t('cabinClass')}</p>
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

              {/* Dates */}
              <div className="relative flex-1 border-b lg:border-b-0 lg:border-l border-border order-3">
                <div className="px-5 py-3">
                  <label className="block text-xs font-medium text-gray-500 text-right">
                    {t('dates')}
                  </label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "w-full flex items-center justify-between py-1.5 text-base outline-none flex-row-reverse",
                          !departureDate && "text-gray-400"
                        )}
                      >
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          {departureDate ? format(departureDate, 'MMM dd', { locale: language === 'ar' ? ar : undefined }) : t('departure')} — {returnDate ? format(returnDate, 'MMM dd', { locale: language === 'ar' ? ar : undefined }) : t('return')}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      {isRoundTrip ? (
                        <PriceCalendar
                          mode="range"
                          selected={{ from: departureDate, to: returnDate }}
                          onSelect={(date) => {
                            if ('from' in date) {
                              setDepartureDate(date.from);
                              setReturnDate(date.to);
                            }
                          }}
                          onDateSelect={(date, price) => {
                            console.log('Selected date:', format(date, 'MMM dd, yyyy'), 'Price:', price);
                          }}
                          disabled={(date) => isBefore(date, startOfDay(new Date()))}
                          numberOfMonths={2}
                        />
                      ) : (
                        <PriceCalendar
                          mode="single"
                          selected={departureDate}
                          onSelect={(date) => {
                            setDepartureDate(date as Date);
                          }}
                          onDateSelect={(date, price) => {
                            console.log('Selected date:', format(date, 'MMM dd, yyyy'), 'Price:', price);
                          }}
                          disabled={(date) => isBefore(date, startOfDay(new Date()))}
                          numberOfMonths={1}
                        />
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Location Fields Group - RTL: To field first, then From field */}
              <div className="relative flex flex-1 lg:flex-[2] flex-col sm:flex-row-reverse order-4" style={{ overflow: 'visible' }}>
                {/* To/Destination input - First in RTL */}
                <div className="relative flex-1 border-b sm:border-b-0 sm:border-l border-border" style={{ overflow: 'visible' }}>
                  <div className="px-5 py-3">
                    <label htmlFor="destination" className="block text-xs font-medium text-gray-500 text-right">
                      {t('to')}
                    </label>
                    <div className="relative">
                      <Autocomplete
                        value={destination}
                        onChange={setDestination}
                        onSelect={setSelectedDestinationCity}
                        placeholder={t('countryOrAirport')}
                        className="w-full border-none bg-transparent py-1.5 text-base outline-none placeholder:text-gray-400 text-right"
                      />
                      {destination && (
                        <button
                          type="button"
                          onClick={clearDestination}
                          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 z-10"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* From/Origin input - Second in RTL */}
                <div className="relative flex-1 border-b sm:border-b-0 sm:border-l border-border" style={{ overflow: 'visible' }}>
                  <div className="px-5 py-3">
                    <label htmlFor="origin" className="block text-xs font-medium text-gray-500 text-right">
                      {t('from')}
                    </label>
                    <div className="relative">
                      <Autocomplete
                        value={origin}
                        onChange={setOrigin}
                        onSelect={setSelectedOriginCity}
                        placeholder={t('countryOrAirport')}
                        className="w-full border-none bg-transparent py-1.5 text-base outline-none placeholder:text-gray-400 text-right"
                      />
                      {origin && (
                        <button
                          type="button"
                          onClick={clearOrigin}
                          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 z-10"
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
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* LTR Layout: Original order */}
              {/* Location Fields Group */}
              <div className="relative flex flex-1 lg:flex-[2] flex-col sm:flex-row" style={{ overflow: 'visible' }}>
                {/* Origin input */}
                <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-border" style={{ overflow: 'visible' }}>
                  <div className="px-5 py-3">
                    <label htmlFor="origin" className="block text-xs font-medium text-gray-500">
                      {t('from')}
                    </label>
                    <div className="relative">
                      <Autocomplete
                        value={origin}
                        onChange={setOrigin}
                        onSelect={setSelectedOriginCity}
                        placeholder={t('countryOrAirport')}
                        className="w-full border-none bg-transparent py-1.5 text-base outline-none placeholder:text-gray-400"
                      />
                      {origin && (
                        <button
                          type="button"
                          onClick={clearOrigin}
                          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 z-10"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Destination input */}
                <div className="relative flex-1 border-b sm:border-b-0 sm:border-r border-border" style={{ overflow: 'visible' }}>
                  <div className="px-5 py-3">
                    <label htmlFor="destination" className="block text-xs font-medium text-gray-500">
                      {t('to')}
                    </label>
                    <div className="relative">
                      <Autocomplete
                        value={destination}
                        onChange={setDestination}
                        onSelect={setSelectedDestinationCity}
                        placeholder={t('countryOrAirport')}
                        className="w-full border-none bg-transparent py-1.5 text-base outline-none placeholder:text-gray-400"
                      />
                      {destination && (
                        <button
                          type="button"
                          onClick={clearDestination}
                          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 z-10"
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
              </div>

              {/* Dates */}
              <div className="relative flex-1 border-b lg:border-b-0 lg:border-r border-border">
                <div className="px-5 py-3">
                  <label className="block text-xs font-medium text-gray-500">
                    {t('dates')}
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
                          {departureDate ? format(departureDate, 'MMM dd', { locale: language === 'ar' ? ar : undefined }) : t('departure')} — {returnDate ? format(returnDate, 'MMM dd', { locale: language === 'ar' ? ar : undefined }) : t('return')}
                        </span>
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {isRoundTrip ? (
                        <PriceCalendar
                          mode="range"
                          selected={{ from: departureDate, to: returnDate }}
                          onSelect={(date) => {
                            if ('from' in date) {
                              setDepartureDate(date.from);
                              setReturnDate(date.to);
                            }
                          }}
                          onDateSelect={(date, price) => {
                            console.log('Selected date:', format(date, 'MMM dd, yyyy'), 'Price:', price);
                          }}
                          disabled={(date) => isBefore(date, startOfDay(new Date()))}
                          numberOfMonths={2}
                        />
                      ) : (
                        <PriceCalendar
                          mode="single"
                          selected={departureDate}
                          onSelect={(date) => {
                            setDepartureDate(date as Date);
                          }}
                          onDateSelect={(date, price) => {
                            console.log('Selected date:', format(date, 'MMM dd, yyyy'), 'Price:', price);
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
                    {t('who')}
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
                            <p className="font-medium">{t('adults')}</p>
                            <p className="text-sm text-gray-500">{t('age12Plus')}</p>
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
                            <p className="font-medium">{t('children')}</p>
                            <p className="text-sm text-gray-500">{t('age2to11')}</p>
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
                            <p className="font-medium">{t('infants')}</p>
                            <p className="text-sm text-gray-500">{t('under2')}</p>
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
                          <p className="font-medium mb-2">{t('cabinClass')}</p>
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
                  className="h-12 w-12 rounded-full bg-primary p-0 hover:bg-primary-hover text-primary-foreground group"
                >
                  <Search className="h-5 w-5 group-hover:text-primary transition-colors" />
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
