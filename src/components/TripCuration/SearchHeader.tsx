import React from 'react';
import { ArrowRightLeft, ArrowUpDown, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from '@/translations';
import { formatNumber } from '@/lib/utils';

interface SearchHeaderProps {
  origin?: string;
  destination?: string;
  departureDate?: Date;
  returnDate?: Date;
  passengers?: number;
  cabinClass?: string;
  onSwap: () => void;
  onUpdate: () => void;
}

const SearchHeader = ({
  origin = "Bengaluru",
  destination = "London",
  departureDate,
  returnDate,
  passengers = 1,
  cabinClass = "Economy",
  onSwap,
  onUpdate
}: SearchHeaderProps) => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isArabic = language === 'ar';
  
  const formatDate = (date?: Date) => {
    if (!date) return "--/--";
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
    }).format(date);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm">
      <div className="flex w-full flex-col sm:flex-row items-center">
        {/* Location Fields Wrapper */}
        <div className="relative flex flex-[2] flex-col sm:flex-row">
          {/* Origin input */}
          <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
            <div className="px-4 sm:px-6 py-2 sm:py-3">
              <div className="flex items-center">
                <span className="text-sm truncate max-w-[120px] sm:max-w-full">{origin}</span>
                <button className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
          {/* Destination input */}
          <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
            <div className="px-4 sm:px-6 py-2 sm:py-3">
              <div className="flex items-center">
                <span className="text-sm truncate max-w-[120px] sm:max-w-full">{destination}</span>
                <button className="ml-1 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
          {/* Mobile swap button */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 sm:hidden">
            <button
              type="button"
              onClick={onSwap}
              className="rounded-full bg-white border border-gray-200 text-gray-600 p-1.5 shadow-sm hover:bg-gray-50"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
          {/* Desktop swap button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden sm:block">
            <button
              type="button"
              onClick={onSwap}
              className="rounded-full bg-white border border-gray-200 text-gray-600 p-2 shadow-sm hover:bg-gray-50"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* Dates */}
        <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="px-4 sm:px-6 py-2 sm:py-3">
            <div className="flex items-center">
              <span className="text-sm truncate">
                {formatDate(departureDate) || 'Departure'} — {formatDate(returnDate) || 'Return'}
              </span>
            </div>
          </div>
        </div>
        {/* Passengers & Class */}
        <div className="flex-1 border-b sm:border-b-0 sm:border-r border-gray-200">
          <div className="px-4 sm:px-6 py-2 sm:py-3">
            <div className="flex items-center">
              <span className="text-sm truncate">{formatNumber(passengers, isArabic)} {t('adult')}, {t(cabinClass.toLowerCase())}</span>
            </div>
          </div>
        </div>
        {/* Update button */}
        <div className="flex items-center justify-center p-3 sm:px-4">
          <Button 
            onClick={onUpdate}
            className="w-full sm:w-auto h-9 px-4 bg-primary hover:bg-primary-hover text-primary-foreground hover:text-[#194E91] rounded-lg text-sm"
          >
            {t('update')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader; 