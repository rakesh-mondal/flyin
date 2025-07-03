import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from './Header';
import AiMessage from './AiMessage';
import FilterChips from './FilterChips';
import TripListV2 from './v2/TripList';
import ChatInput from './ChatInput';
// import SelectedTripDetail from './SelectedTripDetail';  // Commented out as we're not using it
import { mockTrips } from './mockData';
import { toast } from 'sonner';
import { InsightProps } from './FlightInsights';
import { Button } from '../ui/button';
import { ArrowRightLeft, ArrowUpDown, X, MessageCircle, MessageSquare, Percent, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Ban, Luggage, MoreVertical, Clock, Plane, Building2 } from 'lucide-react';
import '@/styles/animations.css';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn, formatNumber, formatDate } from '@/lib/utils';
import FlightOptionsSelector from './FlightOptionsSelector';
import HorizontalFilters from './HorizontalFilters';
import FareSelectionModal from './FareSelectionModal';
import TopHeader from './TopHeader';
import SearchHeader from './SearchHeader';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { format, addDays } from 'date-fns';
import { GlowEffect } from '@/components/ui/glow-effect';
import { FlightDetails } from '../trip-detail/FlightDetails';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from '@/translations';

// Short Layover Icon Component
const ShortLayoverIcon = () => (
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_2086_100752" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21" style={{maskType: 'alpha'}}>
      <rect y="0.5" width="20" height="20" fill="#D9D9D9"></rect>
    </mask>
    <g mask="url(#mask0_2086_100752)">
      <path d="M11.25 4.95833C10.8194 4.95833 10.455 4.80889 10.1567 4.51C9.85778 4.21167 9.70834 3.84722 9.70834 3.41667C9.70834 2.98611 9.85778 2.62139 10.1567 2.3225C10.455 2.02417 10.8194 1.875 11.25 1.875C11.6806 1.875 12.045 2.02417 12.3433 2.3225C12.6422 2.62139 12.7917 2.98611 12.7917 3.41667C12.7917 3.84722 12.6422 4.21167 12.3433 4.51C12.045 4.80889 11.6806 4.95833 11.25 4.95833ZM11.6667 19.4583C11.4861 19.4583 11.3369 19.3994 11.2192 19.2817C11.1008 19.1633 11.0417 19.0139 11.0417 18.8333V14.6042L8.95834 12.6042L8.41667 15C8.31945 15.3889 8.10056 15.6944 7.76 15.9167C7.42 16.1389 7.04861 16.2083 6.64584 16.125L3.35417 15.4583C3.1875 15.4306 3.05223 15.3436 2.94834 15.1975C2.84389 15.0519 2.81945 14.8889 2.875 14.7083C2.90278 14.5417 2.98973 14.4097 3.13584 14.3125C3.28139 14.2153 3.4375 14.1875 3.60417 14.2292L6.72917 14.875C6.8125 14.8889 6.88195 14.875 6.9375 14.8333C6.99306 14.7917 7.02778 14.7361 7.04167 14.6667L8.4375 7.5625L6.625 8.29167C6.56945 8.31945 6.52778 8.35417 6.5 8.39583C6.47223 8.4375 6.45834 8.48611 6.45834 8.54167V10.5C6.45834 10.6806 6.39917 10.8297 6.28084 10.9475C6.16306 11.0658 6.01389 11.125 5.83334 11.125C5.65278 11.125 5.50362 11.0658 5.38584 10.9475C5.2675 10.8297 5.20834 10.6806 5.20834 10.5V8.54167C5.20834 8.23611 5.29167 7.95833 5.45834 7.70833C5.625 7.45833 5.84723 7.27083 6.125 7.14583L8.52084 6.14583C8.9375 5.96528 9.24667 5.84722 9.44834 5.79167C9.64945 5.73611 9.83334 5.70833 10 5.70833C10.25 5.70833 10.4861 5.77417 10.7083 5.90583C10.9306 6.03806 11.1111 6.21528 11.25 6.4375L12.0833 7.77083C12.3889 8.28472 12.8022 8.72222 13.3233 9.08333C13.8439 9.44445 14.4306 9.6875 15.0833 9.8125C15.2361 9.82639 15.3644 9.89222 15.4683 10.01C15.5728 10.1283 15.625 10.2639 15.625 10.4167C15.625 10.6111 15.5556 10.7744 15.4167 10.9067C15.2778 11.0383 15.1181 11.0903 14.9375 11.0625C14.2153 10.9514 13.5244 10.6978 12.865 10.3017C12.205 9.90611 11.6319 9.36806 11.1458 8.6875L10.5208 11.8125L11.8333 13.0625C11.9861 13.2153 12.1008 13.3819 12.1775 13.5625C12.2536 13.7431 12.2917 13.9375 12.2917 14.1458V18.8333C12.2917 19.0139 12.2328 19.1633 12.115 19.2817C11.9967 19.3994 11.8472 19.4583 11.6667 19.4583Z" fill="#808080"></path>
    </g>
  </svg>
);

// Long Layover Icon Component
const LongLayoverIcon = () => (
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_2091_83130" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21" style={{maskType: 'alpha'}}>
      <rect y="0.5" width="20" height="20" fill="#D9D9D9"></rect>
    </mask>
    <g mask="url(#mask0_2091_83130)">
      <path d="M6.83333 5.75029C6.40278 5.75029 6.03833 5.59751 5.74 5.29196C5.44111 4.9864 5.29167 4.62529 5.29167 4.20862C5.29167 3.77807 5.44111 3.41335 5.74 3.11446C6.03833 2.81612 6.40278 2.66696 6.83333 2.66696C7.25 2.66696 7.61111 2.81612 7.91667 3.11446C8.22222 3.41335 8.375 3.77807 8.375 4.20862C8.375 4.62529 8.22222 4.9864 7.91667 5.29196C7.61111 5.59751 7.25 5.75029 6.83333 5.75029ZM6.5 16.7503C6.08333 16.7503 5.70139 16.6081 5.35417 16.3236C5.00694 16.0386 4.79167 15.6809 4.70833 15.2503L3.0625 7.08362C3.02083 6.88918 3.0625 6.71557 3.1875 6.56279C3.3125 6.41001 3.47917 6.33362 3.6875 6.33362C3.84028 6.33362 3.97222 6.37862 4.08333 6.46862C4.19444 6.55918 4.26389 6.68085 4.29167 6.83362L6 15.2503C6.01389 15.3059 6.05222 15.3614 6.115 15.417C6.17722 15.4725 6.23611 15.5003 6.29167 15.5003H11.0417C11.2222 15.5003 11.3717 15.5592 11.49 15.677C11.6078 15.7953 11.6667 15.9447 11.6667 16.1253C11.6667 16.3059 11.6078 16.4553 11.49 16.5736C11.3717 16.6914 11.2222 16.7503 11.0417 16.7503H6.5ZM16.625 18.2711C16.4722 18.3545 16.3125 18.372 16.1458 18.3236C15.9792 18.2747 15.8542 18.1808 15.7708 18.042L13.7917 14.667H7.89583C7.54861 14.667 7.24639 14.5595 6.98917 14.3445C6.7325 14.1289 6.5625 13.8475 6.47917 13.5003L5.54167 8.93779C5.40278 8.32668 5.54528 7.79196 5.96917 7.33362C6.3925 6.87529 6.89583 6.64612 7.47917 6.64612C7.90972 6.64612 8.30556 6.77446 8.66667 7.03112C9.02778 7.28835 9.26389 7.64612 9.375 8.10446L10.3333 12.5836H13.2292C13.4792 12.5836 13.7153 12.6497 13.9375 12.782C14.1597 12.9136 14.3403 13.0906 14.4792 13.3128L16.8542 17.417C16.9375 17.5558 16.9583 17.7122 16.9167 17.8861C16.875 18.0595 16.7778 18.1878 16.625 18.2711Z" fill="#808080"></path>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5 6.73782C16.0464 6.73782 17.3 5.48422 17.3 3.93783C17.3 2.39143 16.0464 1.13783 14.5 1.13783C12.9536 1.13783 11.7 2.39143 11.7 3.93783C11.7 5.48422 12.9536 6.73782 14.5 6.73782ZM14.5 7.27116C16.3409 7.27116 17.8333 5.77877 17.8333 3.93783C17.8333 2.09688 16.3409 0.604492 14.5 0.604492C12.6591 0.604492 11.1667 2.09688 11.1667 3.93783C11.1667 5.77877 12.6591 7.27116 14.5 7.27116Z" fill="#808080"></path>
      <path d="M14.6442 0.604492C15.154 0.604492 15.6563 0.732204 16.1091 0.976924C16.5619 1.22164 16.9519 1.57624 17.2466 2.011C17.5412 2.44575 17.7319 2.948 17.8026 3.47564C17.8733 4.00328 17.8219 4.54094 17.6528 5.04356C17.4837 5.54618 17.2018 5.99911 16.8307 6.36439C16.4597 6.72967 16.0102 6.99667 15.5201 7.14299C15.0299 7.28931 14.5134 7.3107 14.0137 7.20536C13.514 7.10002 13.0458 6.87103 12.6482 6.53757L14.6442 3.93783V0.604492Z" fill="#808080"></path>
    </g>
  </svg>
);

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
  version?: 'v2';
  isAiSearch?: boolean;
}

// Search Summary Component
const SearchSummary = ({
  origin = "Bengaluru",
  destination = "London",
  departureDate,
  returnDate,
  passengers = 1,
  cabinClass = "Economy",
  onSwap,
  onUpdate
}: {
  origin?: string;
  destination?: string;
  departureDate?: Date;
  returnDate?: Date;
  passengers?: number;
  cabinClass?: string;
  onSwap: () => void;
  onUpdate: () => void;
}) => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isArabic = language === 'ar';
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'numeric' 
    }).format(date);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm">
      <div className="flex w-full flex-col sm:flex-row items-stretch">
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
                {formatDate(departureDate) || t('departure')} — {formatDate(returnDate) || t('return')}
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
            className="w-full sm:w-auto h-9 px-4 bg-primary hover:bg-primary-hover text-primary-foreground hover:text-[#194E91] rounded-full text-sm"
          >
            {t('update')}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Generate 14 days of dates from today
const today = new Date();
const mockDates = Array.from({ length: 14 }, (_, i) => ({
  date: format(addDays(today, i), 'EEE, d MMM'),
  price: Math.floor(5000 + Math.random() * 4000),
}));

function DatesCard({ dates, selectedIdx, onSelect, keyPrefix = '', maxDates = 3 }) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const minPrice = Math.min(...dates.map(d => d.price));
  
  // Calculate the indices for the dates to show based on maxDates
  const indices = [];
  const halfRange = Math.floor(maxDates / 2);
  
  if (maxDates === 3) {
    // Original logic for 3 dates
    indices.push(
      Math.max(0, selectedIdx - 1),
      selectedIdx,
      Math.min(dates.length - 1, selectedIdx + 1)
    );
  } else if (maxDates === 5) {
    // Logic for 5 dates: 2 before, current, 2 after
    for (let i = selectedIdx - halfRange; i <= selectedIdx + halfRange; i++) {
      if (i >= 0 && i < dates.length) {
        indices.push(i);
      }
    }
    // Ensure we always have 5 dates if possible
    while (indices.length < maxDates && indices.length < dates.length) {
      if (indices[0] > 0) {
        indices.unshift(indices[0] - 1);
      } else if (indices[indices.length - 1] < dates.length - 1) {
        indices.push(indices[indices.length - 1] + 1);
      } else {
        break;
      }
    }
  } else {
    // Generic logic for other maxDates values
    for (let i = selectedIdx - halfRange; i <= selectedIdx + halfRange; i++) {
      if (i >= 0 && i < dates.length) {
        indices.push(i);
      }
    }
  }

  return (
    <div className="flex items-center justify-between w-full py-2 mb-1 overflow-hidden">
      <button
        className="p-1 text-gray-400 hover:text-black"
        disabled={selectedIdx === 0}
        onClick={() => onSelect(Math.max(0, selectedIdx - 1))}
        style={{ minWidth: 28 }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="flex-1 flex justify-between gap-0 overflow-x-hidden">
        {indices.map((idx, i) => {
          // Find the index of the selected date in the indices array
          const isSelectedDate = idx === selectedIdx;
          return (
            <div
              key={`${keyPrefix}date-${idx}-${i}-${dates[idx]?.price}`}
              className={
                'flex flex-col items-center cursor-pointer ' +
                (isSelectedDate ? 'font-bold text-black' : 'text-gray-500')
              }
              onClick={() => onSelect(idx)}
              style={{ 
                fontSize: '12px', 
                lineHeight: '16px', 
                width: isArabic ? (maxDates === 5 ? 56 : 70) : (maxDates === 5 ? 48 : 60), 
                minWidth: isArabic ? (maxDates === 5 ? 56 : 70) : (maxDates === 5 ? 48 : 60), 
                maxWidth: isArabic ? (maxDates === 5 ? 56 : 70) : (maxDates === 5 ? 48 : 60) 
              }}
            >
              <div 
                className="mb-0.5 text-center" 
                style={{ 
                  fontSize: maxDates === 5 ? '10px' : '11px', 
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {dates[idx]?.date}
              </div>
              <div className={
                'font-semibold ' +
                (dates[idx]?.price === minPrice ? 'text-green-600' : '')
              } style={{ fontSize: maxDates === 5 ? '11px' : '12px' }}>
                ₹{formatNumber(dates[idx]?.price || 0, isArabic)}
              </div>
              {isSelectedDate && <div className="mt-0.5 h-0.5 w-10 rounded-full mx-auto" style={{ background: '#194E91' }} />}
            </div>
          );
        })}
      </div>
      <button
        className="p-1 text-gray-400 hover:text-black"
        disabled={selectedIdx === dates.length - 1}
        onClick={() => onSelect(Math.min(dates.length - 1, selectedIdx + 1))}
        style={{ minWidth: 28 }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// Skeleton Loader Components
function Skeleton({ className = '' }) {
  return <div className={`bg-gray-200 animate-pulse rounded ${className}`} />;
}

function MainCurationSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-12">
      {/* Left Column - FilterChips Skeleton */}
      <div className="order-2 lg:order-1 lg:col-span-3 bg-gray-50">
        <div className="space-y-4">
          <Skeleton className="rounded-xl h-[340px] w-full mb-4" />
        </div>
      </div>
      {/* Main Content Cards Skeleton (center, col-span-9) */}
      <div className="order-1 lg:order-2 lg:col-span-9 max-w-4xl mx-auto w-full">
        {/* Merchandising Banner Skeleton */}
        <div className="flex w-full gap-3 pb-4 -mx-2 px-2">
          {[1,2,3].map(i => (
            <Skeleton key={i} className="flex-1 h-16" />
          ))}
        </div>
        {/* Tabs Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
          <div className="flex">
            {[1,2,3].map(i => (
              <Skeleton key={i} className="flex-1 h-14 m-2" />
            ))}
          </div>
        </div>
        {/* Summary Row Card Skeleton */}
        <Skeleton className="w-full h-28 mb-4" />
        {/* DatesCard Skeleton */}
        <div className="flex items-center w-full py-2 mt-2 mb-2">
          <Skeleton className="h-8 w-8 mr-2" />
          <div className="flex gap-2 flex-1">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-20" />
            ))}
          </div>
          <Skeleton className="h-8 w-8 ml-2" />
        </div>
        {/* Flight List Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2].map(col => (
              <div key={col}>
                <Skeleton className="h-4 w-40 mb-3" />
                <div className="flex flex-col gap-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Line loading indicator component
function LineLoading({ duration = 4000 }) {
  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden">
      <div
        className="h-full bg-blue-600 transition-all"
        style={{
          width: '100%',
          animation: `line-loading-bar ${duration}ms linear forwards`
        }}
      />
      <style>{`
        @keyframes line-loading-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// Helper to extract airport code from layover string (e.g., '2h in DXB')
function extractAirportCode(layover: string | null | undefined): string | null {
  if (!layover) return null;
  const match = layover.match(/in ([A-Z]{3})/);
  return match ? match[1] : null;
}

// Custom Sort Icon Component
const SortIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <desc>Sort Streamline Icon: https://streamlinehq.com</desc>
    <path d="M22 7 2 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
    <path d="M19 12 5 12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
    <path d="M16 17H8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
  </svg>
);

// Unified Sorting Options Dropdown Component
const UnifiedSortingDropdown = ({ 
  selectedSort, 
  onSortChange 
}: { 
  selectedSort: string, 
  onSortChange: (value: string) => void 
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const sortOptions = [
    { value: 'price-lowest', label: t('priceLowestFirst'), icon: <Percent className="h-4 w-4" /> },
    { value: 'price-highest', label: t('priceHighestFirst'), icon: <Percent className="h-4 w-4" /> },
    { value: 'depart-earliest', label: t('departEarliestFirst'), icon: <Plane className="h-4 w-4" /> },
    { value: 'depart-latest', label: t('departLatestFirst'), icon: <Plane className="h-4 w-4" /> },
    { value: 'duration-shortest', label: t('durationShortestFirst'), icon: <Clock className="h-4 w-4" /> },
    { value: 'duration-longest', label: t('durationLongestFirst'), icon: <Clock className="h-4 w-4" /> },
    { value: 'airline-az', label: t('airlineAtoZ'), icon: <Building2 className="h-4 w-4" /> },
    { value: 'stops-fewest', label: t('stopsFewestFirst'), icon: <ArrowRightLeft className="h-4 w-4" /> },
  ];

  const getCurrentSortLabel = () => {
    switch (selectedSort) {
      case 'price-lowest':
        return t('priceUp');
      case 'price-highest':
        return t('priceDown');
      case 'depart-earliest':
        return t('departUp');
      case 'depart-latest':
        return t('departDown');
      case 'duration-shortest':
        return t('durationUp');
      case 'duration-longest':
        return t('durationDown');
      case 'airline-az':
        return t('airlineUp');
      case 'stops-fewest':
        return t('stopsUp');
      default:
        return t('priceUp');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="flex items-center gap-1 text-[#194E91] font-semibold text-sm focus:outline-none hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
          aria-label="Sort options"
        >
          {getCurrentSortLabel()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
        <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
          {t('sortBy')}
        </div>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`flex items-center gap-2 cursor-pointer ${
              selectedSort === option.value ? 'bg-blue-50 text-blue-700' : ''
            }`}
          >
            {option.icon}
            <span>{option.label}</span>
            {selectedSort === option.value && (
              <span className={cn("text-blue-600", isRTL ? "mr-auto" : "ml-auto")}>✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// 1. Add a helper to generate a unique key for a flight
function getFlightKey(f) {
  return [
    f.airlineName,
    f.departureTime,
    f.arrivalTime,
    f.departureCode,
    f.arrivalCode,
    f.price,
    f.duration,
    f.stops,
    f.layover
  ].join('|');
}

export default function MainCuration({ searchQuery, onBack, onViewTrip, isAiSearch = false }: TripCurationProps) {
  const { isRTL, language } = useLanguage();
  const { t } = useTranslation();
  const isArabic = language === 'ar';
  console.log('MainCuration rendering with searchQuery:', searchQuery);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [thinking, setThinking] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  
  // Filter states
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: new Date(),
    returnDate: new Date(),
    passengers: { adults: 1, children: 0, infants: 0 },
    cabinClass: 'Economy',
    isRoundTrip: true
  });

  // Add one-way detection
  const isOneWay = !searchParams.isRoundTrip;

  // Additional state variables
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [departureTime, setDepartureTime] = useState<string | null>(null);
  const [returnTime, setReturnTime] = useState<string | null>(null);
  const [currentFollowUpIndex, setCurrentFollowUpIndex] = useState(0);
  const [showOptionsSelector, setShowOptionsSelector] = useState(false);

  // --- State for summary tabs and quick filters (moved up from TripListV2) ---
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selectedPriceCategory, setSelectedPriceCategory] = useState<'cheapest' | 'best' | 'quickest'>('best');
  const [selectedQuickFilters, setSelectedQuickFilters] = useState<string[]>([]);
  
  // --- State for airport warning mockup ---
  const [airportWarningOpen, setAirportWarningOpen] = useState(false);
  const [selectedFlightForWarning, setSelectedFlightForWarning] = useState<any>(null);

  // Add state for stops and flight timings filters
  const [selectedStops, setSelectedStops] = useState<string[]>([]); // e.g., ['non-stop', '1-stop']
  const [selectedDepartureTimeSlot, setSelectedDepartureTimeSlot] = useState<string | null>(null); // e.g., 'before-6am'
  const [selectedReturnTimeSlot, setSelectedReturnTimeSlot] = useState<string | null>(null); // e.g., 'after-6pm'

  // Track if user has seen the manual selection toast
  const [hasShownManualSelectToast, setHasShownManualSelectToast] = useState(false);
  // Track if user has manually selected a flight
  const [userHasManuallySelected, setUserHasManuallySelected] = useState(false);

  // State for fare selection modal
  const [isFareModalOpen, setFareModalOpen] = useState(false);
  const [fareModalTrip, setFareModalTrip] = useState<any>(null);

  // Update airlines array to include baggage, wifi, meal, rating, etc.
  const airlines = [
    {
      id: 'emirates',
      name: 'Emirates',
      logo: 'https://airhex.com/images/airline-logos/emirates.png',
      price: '65,909',
      // Special return offer - Emirates gets this
      hasSpecialReturn: true,
      returnDiscount: 15, // 15% discount
      specialReturnPrice: '56,023',
      badgeText: 'Limited Time',
      baggage: '30kg checked, 7kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian, Vegan',
      rating: 4.7
    },
    {
      id: 'etihad',
      name: 'Etihad Airways',
      logo: 'https://airhex.com/images/airline-logos/etihad-airways.png',
      price: '47,000',
      // Second special offer - Etihad gets this
      hasSpecialReturn: true,
      returnDiscount: 20,
      specialReturnPrice: '37,600',
      badgeText: 'Best Deal',
      baggage: '23kg checked, 7kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian',
      rating: 4.5
    },
    {
      id: 'qatar',
      name: 'Qatar Airways',
      logo: 'https://airhex.com/images/airline-logos/qatar-airways.png',
      price: '46,000',
      hasSpecialReturn: false,
      baggage: '30kg checked, 7kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian, Vegan, Gluten-Free',
      rating: 4.8
    },
    {
      id: 'turkish',
      name: 'Turkish Airlines',
      logo: 'https://airhex.com/images/airline-logos/turkish-airlines.png',
      price: '44,000',
      hasSpecialReturn: false,
      baggage: '30kg checked, 8kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian, Vegan',
      rating: 4.4
    },
    {
      id: 'lufthansa',
      name: 'Lufthansa',
      logo: 'https://airhex.com/images/airline-logos/lufthansa.png',
      price: '61,000',
      hasSpecialReturn: false,
      baggage: '23kg checked, 8kg cabin',
      wifi: true,
      meal: 'Vegetarian, Vegan, Gluten-Free',
      rating: 4.2
    },
    {
      id: 'air-india',
      name: 'Air India',
      logo: 'https://airhex.com/images/airline-logos/air-india.png',
      price: '59,035',
      hasSpecialReturn: false,
      baggage: '25kg checked, 7kg cabin',
      wifi: false,
      meal: 'Vegetarian, Vegan',
      rating: 3.9
    },
    {
      id: 'singapore',
      name: 'Singapore Airlines',
      logo: 'https://airhex.com/images/airline-logos/singapore-airlines.png',
      price: '58,500',
      hasSpecialReturn: false,
      baggage: '30kg checked, 7kg cabin',
      wifi: true,
      meal: 'Halal, Vegetarian, Vegan, Gluten-Free',
      rating: 4.9
    },
    {
      id: 'british',
      name: 'British Airways',
      logo: 'https://airhex.com/images/airline-logos/british-airways.png',
      price: '62,000',
      hasSpecialReturn: false,
      baggage: '23kg checked, 8kg cabin',
      wifi: true,
      meal: 'Vegetarian, Vegan, Gluten-Free',
      rating: 4.3
    },
    {
      id: 'air-france',
      name: 'Air France',
      logo: 'https://airhex.com/images/airline-logos/air-france.png',
      price: '60,500',
      hasSpecialReturn: false,
      baggage: '23kg checked, 8kg cabin',
      wifi: true,
      meal: 'Vegetarian, Vegan, Gluten-Free',
      rating: 4.1
    },
    {
      id: 'klm',
      name: 'KLM',
      logo: 'https://airhex.com/images/airline-logos/klm.png',
      price: '59,800',
      hasSpecialReturn: false,
      baggage: '23kg checked, 8kg cabin',
      wifi: true,
      meal: 'Vegetarian, Vegan, Gluten-Free',
      rating: 4.0
    }
  ];

  // Handler for quick filter selection
  const handleQuickFilterSelect = (airlineId: string) => {
    if (selectedQuickFilters.includes(airlineId)) {
      const newSelectedFilters = selectedQuickFilters.filter(id => id !== airlineId);
      setSelectedQuickFilters(newSelectedFilters);
    } else {
      setSelectedQuickFilters([...selectedQuickFilters, airlineId]);
    }
  };

  // Helper function to identify Emirates flight for airport warning mockup
  const isEmiratesFlightForWarning = (option: any) => {
    return option.airlineName === 'Emirates' && 
           option.departureTime === '21:00' && 
           option.arrivalTime === '07:05';
  };

  // Helper function to identify Etihad flight for seats left tag mockup
  const isEtihadFlightForSeatsLeft = (option: any) => {
    return option.airlineName === 'Etihad Airways' && 
           option.departureTime === '22:30' && 
           option.arrivalTime === '09:00' &&
           option.stops === 'non-stop';
  };

  // Handler for airport warning confirmation
  const handleAirportWarningBooking = (flight: any) => {
    setSelectedFlightForWarning(flight);
    setAirportWarningOpen(true);
  };

  // Handler for confirmed booking after airport warning
  const handleConfirmedBooking = () => {
    setAirportWarningOpen(false);
    
    // Prepare trip data for fare selection modal
    const tripData = {
      outbound: selectedFlightForWarning,
      inbound: null,
      totalPrice: parseInt(selectedFlightForWarning?.price.replace(/[^0-9]/g, '') || '0', 10),
      isOneWay: true
    };
    
    // Open fare selection modal
    setFareModalTrip(tripData);
    setFareModalOpen(true);
    setSelectedFlightForWarning(null);
  };

  // --- Mock summaryOption and roundTripOptions (replace with real data as needed) ---
  const summaryOption = {
    outboundFlight: {
      airlineLogo: airlines[0].logo,
      airlineName: airlines[0].name,
      departureTime: '21:00',
      arrivalTime: '07:05',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '14h 35m',
      stops: '1 stop',
      date: 'May 7, 2025',
      layover: '2h in Dubai',
      price: '35,909'
    },
    returnFlight: {
      airlineLogo: airlines[1].logo,
      airlineName: airlines[1].name,
      departureTime: '14:20',
      arrivalTime: '20:20',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '10h 30m',
      stops: 'non-stop',
      date: 'May 14, 2025',
      layover: undefined,
      price: '30,000'
    },
    price: '65,909',
    currency: '₹'
  };
  const roundTripOptions = [summaryOption]; // For demo, use one option

  // Parse search query when component mounts or searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      try {
        const parsedQuery = JSON.parse(searchQuery);
        setSearchParams({
          origin: parsedQuery.origin,
          destination: parsedQuery.destination,
          departureDate: parsedQuery.departureDate ? new Date(parsedQuery.departureDate) : undefined,
          returnDate: parsedQuery.returnDate ? new Date(parsedQuery.returnDate) : undefined,
          passengers: parsedQuery.passengers,
          cabinClass: parsedQuery.cabinClass,
          isRoundTrip: parsedQuery.isRoundTrip
        });
      } catch (error) {
        console.error('Error parsing search query:', error);
      }
    }
  }, [searchQuery]);

  // Mock AI insights for Middle Eastern travel
  const mockInsights: InsightProps[] = [
    {
      type: 'info',
      content: 'The best time to visit Dubai is between November and March when the weather is pleasant.'
    },
    {
      type: 'price-drop',
      content: 'Flights to Istanbul are currently 15% lower than average for June.'
    },
    {
      type: 'warning',
      content: 'Summer temperatures in the Middle East can exceed 40°C (104°F). Consider booking activities in the morning or evening.'
    }
  ];

  // Mock cabin classes
  const cabinClasses = [
    { id: 'economy', name: 'Economy' },
    { id: 'premium', name: 'Premium Economy' },
    { id: 'business', name: 'Business' },
    { id: 'first', name: 'First Class' }
  ];

  const tripListRef = useIntersectionObserver();
  const filterRef = useIntersectionObserver();

  // Follow-up text suggestions
  const followUpSuggestions = [
    "Ask Flyin AI about flight options...",
    "Need help finding the best deals?",
    "Looking for travel recommendations?",
    "Want to know about layover times?",
    "Curious about baggage allowance?",
    "Need help with travel dates?"
  ];

  // Rotate follow-up text every 3 seconds when chat is open
  useEffect(() => {
    if (!isChatOpen) return;

    const intervalId = setInterval(() => {
      setCurrentFollowUpIndex((prev) => (prev + 1) % followUpSuggestions.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isChatOpen]);

  useEffect(() => {
    setLoading(true);
    let timeoutId;
    if (!isAiSearch) {
      timeoutId = setTimeout(() => setLoading(false), 4000);
      const mockFlightData = mockTrips;
      setTrips(mockFlightData);
      if (mockFlightData.length > 0) {
        setSelectedTrip(mockFlightData[0]);
      }
      return () => clearTimeout(timeoutId);
    }

    const thinkingMessages = [
      t('findingDestinations'),
      t('checkingAvailability'),
      t('curatingExperiences'),
      t('findingBestValue')
    ];

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setThinking(thinkingMessages[currentIndex]);
      currentIndex = (currentIndex + 1) % thinkingMessages.length;
    }, 2000);

    // Simulate AI processing
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setLoading(false);
      const mockFlightData = mockTrips;
      setTrips(mockFlightData);
      
      // Select the first trip by default when loaded
      if (mockFlightData.length > 0) {
        setSelectedTrip(mockFlightData[0]);
      }
      
      // Set AI response based on search query
      if (searchQuery.toLowerCase().includes('dubai')) {
        setMessage(t('dubaiMessage'));
      } else if (searchQuery.toLowerCase().includes('istanbul') || searchQuery.toLowerCase().includes('turkey')) {
        setMessage(t('istanbulMessage'));
      } else if (searchQuery.toLowerCase().includes('cairo') || searchQuery.toLowerCase().includes('egypt')) {
        setMessage(t('cairoMessage'));
      } else if (searchQuery.toLowerCase().includes('doha') || searchQuery.toLowerCase().includes('qatar')) {
        setMessage(t('dohaMessage'));
      } else if (searchQuery.toLowerCase().includes('beach')) {
        setMessage(t('beachMessage'));
      } else if (searchQuery.toLowerCase().includes('culture')) {
        setMessage(t('cultureMessage'));
      } else {
        setMessage(t('defaultMessage').replace('{searchQuery}', searchQuery));
      }
    }, 4000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [searchQuery, isAiSearch]);

  const handleSubmitMessage = () => {
    if (!userMessage.trim()) return;
    
    toast.success(t('messageReceived'), {
      description: t('adjustRecommendations'),
    });
    setMessage(prev => `${prev} ${t('refinedOptions')}`);
    setUserMessage('');
  };

  // Open fare selection modal instead of direct booking
  const handleTripSelect = (trip: any) => {
    setFareModalTrip(trip);
    setFareModalOpen(true);
  };

  // Called after fare is selected in modal
  const handleFareSelected = (selectedFare: any) => {
    setFareModalOpen(false);
    setFareModalTrip(null);
    // Proceed to next step with selected fare/trip
    onViewTrip(selectedFare);
  };

  const handleSwapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
    toast.success("Locations swapped!");
  };

  const handleUpdateSearch = () => {
    // Here you would typically make an API call to update the search results
    toast.success("Updating search results...");
  };

  const handleResetSearch = () => {
    setSearchParams({
      origin: '',
      destination: '',
      departureDate: undefined,
      returnDate: undefined,
      passengers: {
        adults: 1,
        children: 0,
        infants: 0
      },
      cabinClass: 'economy',
      isRoundTrip: true
    });
    setSelectedAirlines([]);
    setDepartureTime(null);
    setReturnTime(null);
    toast.success("Search parameters reset");
  };

  const chatCardRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close chat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatCardRef.current && !chatCardRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    }

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);

  // Minimal mock data for one departure and one return date/route
  const departureOptions = [
    {
      id: 'dep1',
      departureTime: '10:00',
      arrivalTime: '21:40',
      departureCode: 'BLR',
      arrivalCode: 'DXB',
      duration: '13h 10m',
      stops: 1,
      date: new Date('2025-05-03'),
      layoverInfo: '6h 55m in Colombo',
    },
    {
      id: 'dep2',
      departureTime: '03:05',
      arrivalTime: '21:40',
      departureCode: 'BLR',
      arrivalCode: 'DXB',
      duration: '20h 5m',
      stops: 1,
      date: new Date('2025-05-03'),
      layoverInfo: '13h 50m in Colombo',
    },
  ];
  const returnOptions = [
    {
      id: 'ret1',
      departureTime: '23:00',
      arrivalTime: '02:00',
      departureCode: 'DXB',
      arrivalCode: 'BLR',
      duration: '25h 30m',
      stops: 1,
      date: new Date('2025-05-06'),
      layoverInfo: '19h 40m in Colombo',
    },
    {
      id: 'ret2',
      departureTime: '01:00',
      arrivalTime: '12:00',
      departureCode: 'DXB',
      arrivalCode: 'BLR',
      duration: '11h 0m',
      stops: 1,
      date: new Date('2025-05-06'),
      layoverInfo: '2h 30m in Mumbai',
    },
  ];
  const [selectedDepartureId, setSelectedDepartureId] = useState<string | number>(departureOptions[0].id);
  const [selectedReturnId, setSelectedReturnId] = useState<string | number>(returnOptions[0].id);

  // 1. Move original arrays to baseOutboundFlights/baseInboundFlights (no showSeatsLeft/_key)
  const baseOutboundFlights = [
    {
      airlineLogo: airlines[0].logo,
      airlineName: airlines[0].name,
      departureTime: '21:00',
      arrivalTime: '07:05',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '14h 35m',
      stops: '1 stop',
      layover: '2h in Dubai',
      price: '35,909',
      originalPrice: '42,000',
      baggage: airlines[0].baggage,
      wifi: airlines[0].wifi,
      meal: airlines[0].meal,
      rating: airlines[0].rating,
      stock: '',
      onTimePerformance: '80% On time',
    },
    {
      airlineLogo: airlines[1].logo,
      airlineName: airlines[1].name,
      departureTime: '22:30',
      arrivalTime: '09:00',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '14h 30m',
      stops: 'non-stop',
      layover: null,
      price: '37,500',
      originalPrice: '42,500',
      baggage: airlines[1].baggage,
      wifi: airlines[1].wifi,
      meal: airlines[1].meal,
      rating: airlines[1].rating,
      stock: '2 seats left',
    },
    {
      airlineLogo: airlines[2].logo,
      airlineName: airlines[2].name,
      departureTime: '19:00',
      arrivalTime: '05:30',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '15h 00m',
      stops: '2 stops',
      layover: '6h 30m in Doha',
      price: '33,800',
      originalPrice: '38,900',
      baggage: airlines[2].baggage,
      wifi: airlines[2].wifi,
      meal: airlines[2].meal,
      rating: airlines[2].rating,
      stock: '',
    },
    {
      airlineLogo: airlines[3].logo,
      airlineName: airlines[3].name,
      departureTime: '23:15',
      arrivalTime: '10:00',
      departureCode: 'JFK',
      arrivalCode: 'DXB',
      departureCity: 'New York',
      arrivalCity: 'Dubai',
      duration: '14h 45m',
      stops: '1 stop',
      layover: '1h 30m in Istanbul',
      price: '36,200',
      originalPrice: '41,200',
      baggage: airlines[3].baggage,
      wifi: airlines[3].wifi,
      meal: airlines[3].meal,
      rating: airlines[3].rating,
    },
    // Additional airlines
    {
      airlineLogo: airlines[4].logo,
      airlineName: airlines[4].name,
      departureTime: '20:00',
      arrivalTime: '06:00',
      departureCode: 'JFK',
      arrivalCode: 'FRA',
      departureCity: 'New York',
      arrivalCity: 'Frankfurt',
      duration: '10h 00m',
      stops: 'non-stop',
      layover: null,
      price: '40,000',
      originalPrice: '45,000',
      baggage: airlines[4].baggage,
      wifi: airlines[4].wifi,
      meal: airlines[4].meal,
      rating: airlines[4].rating,
      onTimePerformance: '85% On time',
    },
    {
      airlineLogo: airlines[5].logo,
      airlineName: airlines[5].name,
      departureTime: '21:30',
      arrivalTime: '10:00',
      departureCode: 'JFK',
      arrivalCode: 'DEL',
      departureCity: 'New York',
      arrivalCity: 'Delhi',
      duration: '14h 00m',
      stops: '1 stop',
      layover: '2h in London',
      price: '38,500',
      originalPrice: '43,500',
      baggage: airlines[5].baggage,
      wifi: airlines[5].wifi,
      meal: airlines[5].meal,
      rating: airlines[5].rating,
    },
    {
      airlineLogo: airlines[6].logo,
      airlineName: airlines[6].name,
      departureTime: '18:00',
      arrivalTime: '06:30',
      departureCode: 'JFK',
      arrivalCode: 'SIN',
      departureCity: 'New York',
      arrivalCity: 'Singapore',
      duration: '16h 30m',
      stops: 'non-stop',
      layover: null,
      price: '42,000',
      originalPrice: '47,000',
      baggage: airlines[6].baggage,
      wifi: airlines[6].wifi,
      meal: airlines[6].meal,
      rating: airlines[6].rating,
    },
    {
      airlineLogo: airlines[7].logo,
      airlineName: airlines[7].name,
      departureTime: '19:45',
      arrivalTime: '09:00',
      departureCode: 'JFK',
      arrivalCode: 'LHR',
      departureCity: 'New York',
      arrivalCity: 'London',
      duration: '9h 15m',
      stops: 'non-stop',
      layover: null,
      price: '41,500',
      originalPrice: '46,500',
      baggage: airlines[7].baggage,
      wifi: airlines[7].wifi,
      meal: airlines[7].meal,
      rating: airlines[7].rating,
    },
    {
      airlineLogo: airlines[8].logo,
      airlineName: airlines[8].name,
      departureTime: '22:10',
      arrivalTime: '11:00',
      departureCode: 'JFK',
      arrivalCode: 'CDG',
      departureCity: 'New York',
      arrivalCity: 'Paris',
      duration: '10h 50m',
      stops: 'non-stop',
      layover: null,
      price: '43,000',
      originalPrice: '48,000',
      baggage: airlines[8].baggage,
      wifi: airlines[8].wifi,
      meal: airlines[8].meal,
      rating: airlines[8].rating,
    },
    {
      airlineLogo: airlines[9].logo,
      airlineName: airlines[9].name,
      departureTime: '17:30',
      arrivalTime: '07:00',
      departureCode: 'JFK',
      arrivalCode: 'AMS',
      departureCity: 'New York',
      arrivalCity: 'Amsterdam',
      duration: '13h 30m',
      stops: '1 stop',
      layover: '1h 45m in Paris',
      price: '39,800',
      originalPrice: '44,800',
      baggage: airlines[9].baggage,
      wifi: airlines[9].wifi,
      meal: airlines[9].meal,
      rating: airlines[9].rating,
    }
  ];
  const baseInboundFlights = [
    {
      airlineLogo: airlines[1].logo,
      airlineName: airlines[1].name,
      departureTime: '14:20',
      arrivalTime: '20:20',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '10h 30m',
      stops: 'non-stop',
      layover: null,
      price: '30,000',
      originalPrice: '34,500',
      baggage: airlines[1].baggage,
      wifi: airlines[1].wifi,
      meal: airlines[1].meal,
      rating: airlines[1].rating,
      stock: '3 seats left',
    },
    {
      airlineLogo: airlines[0].logo,
      airlineName: airlines[0].name,
      departureTime: '16:00',
      arrivalTime: '22:30',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '11h 00m',
      stops: '1 stop',
      layover: '2h in Dubai',
      price: '31,500',
      originalPrice: '36,500',
      baggage: airlines[0].baggage,
      wifi: airlines[0].wifi,
      meal: airlines[0].meal,
      rating: airlines[0].rating,
      stock: '',
    },
    {
      airlineLogo: airlines[2].logo,
      airlineName: airlines[2].name,
      departureTime: '18:30',
      arrivalTime: '01:00',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '12h 30m',
      stops: '2 stops',
      layover: '5h 15m in Doha',
      price: '29,800',
      originalPrice: '34,800',
      baggage: airlines[2].baggage,
      wifi: airlines[2].wifi,
      meal: airlines[2].meal,
      rating: airlines[2].rating,
      stock: '',
    },
    {
      airlineLogo: airlines[3].logo,
      airlineName: airlines[3].name,
      departureTime: '20:00',
      arrivalTime: '02:30',
      departureCode: 'DXB',
      arrivalCode: 'JFK',
      departureCity: 'Dubai',
      arrivalCity: 'New York',
      duration: '13h 00m',
      stops: '1 stop',
      layover: '1h 45m in Istanbul',
      price: '32,200',
      originalPrice: '37,200',
      baggage: airlines[3].baggage,
      wifi: airlines[3].wifi,
      meal: airlines[3].meal,
      rating: airlines[3].rating,
      onTimePerformance: '78% On time',
    },
    // Additional airlines
    {
      airlineLogo: airlines[4].logo,
      airlineName: airlines[4].name,
      departureTime: '12:00',
      arrivalTime: '22:00',
      departureCode: 'FRA',
      arrivalCode: 'JFK',
      departureCity: 'Frankfurt',
      arrivalCity: 'New York',
      duration: '10h 00m',
      stops: 'non-stop',
      layover: null,
      price: '40,000',
      originalPrice: '45,000',
      baggage: airlines[4].baggage,
      wifi: airlines[4].wifi,
      meal: airlines[4].meal,
      rating: airlines[4].rating,
    },
    {
      airlineLogo: airlines[5].logo,
      airlineName: airlines[5].name,
      departureTime: '13:30',
      arrivalTime: '03:00',
      departureCode: 'DEL',
      arrivalCode: 'JFK',
      departureCity: 'Delhi',
      arrivalCity: 'New York',
      duration: '14h 00m',
      stops: '1 stop',
      layover: '2h in London',
      price: '38,500',
      originalPrice: '43,500',
      baggage: airlines[5].baggage,
      wifi: airlines[5].wifi,
      meal: airlines[5].meal,
      rating: airlines[5].rating,
    },
    {
      airlineLogo: airlines[6].logo,
      airlineName: airlines[6].name,
      departureTime: '15:00',
      arrivalTime: '05:30',
      departureCode: 'SIN',
      arrivalCode: 'JFK',
      departureCity: 'Singapore',
      arrivalCity: 'New York',
      duration: '16h 30m',
      stops: 'non-stop',
      layover: null,
      price: '42,000',
      originalPrice: '47,000',
      baggage: airlines[6].baggage,
      wifi: airlines[6].wifi,
      meal: airlines[6].meal,
      rating: airlines[6].rating,
    },
    {
      airlineLogo: airlines[7].logo,
      airlineName: airlines[7].name,
      departureTime: '10:45',
      arrivalTime: '20:00',
      departureCode: 'LHR',
      arrivalCode: 'JFK',
      departureCity: 'London',
      arrivalCity: 'New York',
      duration: '9h 15m',
      stops: 'non-stop',
      layover: null,
      price: '41,500',
      originalPrice: '46,500',
      baggage: airlines[7].baggage,
      wifi: airlines[7].wifi,
      meal: airlines[7].meal,
      rating: airlines[7].rating,
    },
    {
      airlineLogo: airlines[8].logo,
      airlineName: airlines[8].name,
      departureTime: '11:10',
      arrivalTime: '22:00',
      departureCode: 'CDG',
      arrivalCode: 'JFK',
      departureCity: 'Paris',
      arrivalCity: 'New York',
      duration: '10h 50m',
      stops: 'non-stop',
      layover: null,
      price: '43,000',
      originalPrice: '48,000',
      baggage: airlines[8].baggage,
      wifi: airlines[8].wifi,
      meal: airlines[8].meal,
      rating: airlines[8].rating,
    },
    {
      airlineLogo: airlines[9].logo,
      airlineName: airlines[9].name,
      departureTime: '16:30',
      arrivalTime: '06:00',
      departureCode: 'AMS',
      arrivalCode: 'JFK',
      departureCity: 'Amsterdam',
      arrivalCity: 'New York',
      duration: '13h 30m',
      stops: '1 stop',
      layover: '2h in Paris',
      price: '39,800',
      originalPrice: '44,800',
      baggage: airlines[9].baggage,
      wifi: airlines[9].wifi,
      meal: airlines[9].meal,
      rating: airlines[9].rating,
    }
  ];
  // 2. Use useMemo to assign showSeatsLeft deterministically and _key
  const outboundFlights = useMemo(() =>
    baseOutboundFlights.map((f, i) => ({
      ...f,
      showSeatsLeft: f.stops !== 'non-stop' && (i % 3 === 1),
      _key: getFlightKey(f)
    })),
    []
  );
  const inboundFlights = useMemo(() =>
    baseInboundFlights.map((f, i) => ({
      ...f,
      showSeatsLeft: f.stops !== 'non-stop' && (i % 4 === 2),
      _key: getFlightKey(f)
    })),
    []
  );

  // Add state for selected outbound/inbound flight
  const [selectedOutboundKey, setSelectedOutboundKey] = useState(outboundFlights[0]?._key || '');
  const [selectedInboundKey, setSelectedInboundKey] = useState(inboundFlights[0]?._key || '');

  // Helper to get time slot from a time string (e.g., '21:00')
  function getTimeSlot(time: string) {
    const [h, m] = time.split(":").map(Number);
    if (h < 6) return 'before-6am';
    if (h < 12) return '6am-12pm';
    if (h < 18) return '12pm-6pm';
    return 'after-6pm';
  }

  // Add filtered outbound/inbound flights based on selectedAirlines, stops, and timings
  const filteredOutboundFlights = outboundFlights.filter(f => {
    // Airline filter: use selectedQuickFilters if any, else show all
    const airlineId = airlines.find(a => a.name === f.airlineName)?.id || '';
    const airlineMatch = selectedQuickFilters.length === 0 || selectedQuickFilters.includes(airlineId);
    // Stops filter
    let stopsMatch = true;
    if (selectedStops.length > 0) {
      stopsMatch = selectedStops.some(stop => {
        if (stop === 'non-stop') return f.stops === 'non-stop';
        if (stop === '1-stop') return f.stops === '1 stop';
        if (stop === '2-more') return f.stops === '2 stops' || f.stops === '2+ stops';
        return false;
      });
    }
    // Departure time slot filter
    let timeMatch = true;
    if (selectedDepartureTimeSlot) {
      timeMatch = getTimeSlot(f.departureTime) === selectedDepartureTimeSlot;
    }
    return airlineMatch && stopsMatch && timeMatch;
  });

  const filteredInboundFlights = inboundFlights.filter(f => {
    // Airline filter: use selectedQuickFilters if any, else show all
    const airlineId = airlines.find(a => a.name === f.airlineName)?.id || '';
    const airlineMatch = selectedQuickFilters.length === 0 || selectedQuickFilters.includes(airlineId);
    // Stops filter
    let stopsMatch = true;
    if (selectedStops.length > 0) {
      stopsMatch = selectedStops.some(stop => {
        if (stop === 'non-stop') return f.stops === 'non-stop';
        if (stop === '1-stop') return f.stops === '1 stop';
        if (stop === '2-more') return f.stops === '2 stops' || f.stops === '2+ stops';
        return false;
      });
    }
    // Return time slot filter
    let timeMatch = true;
    if (selectedReturnTimeSlot) {
      timeMatch = getTimeSlot(f.departureTime) === selectedReturnTimeSlot;
    }
    return airlineMatch && stopsMatch && timeMatch;
  });

  // Helper to get total duration in minutes from duration string (e.g., '14h 35m')
  function parseDuration(duration: string) {
    const match = duration.match(/(\d+)h\s*(\d+)?m?/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + minutes;
  }

  // Compute all possible outbound/inbound pairs (only for round-trip)
  const allPairs = isOneWay ? [] : filteredOutboundFlights.flatMap((out, oi) =>
    filteredInboundFlights.map((inn, ii) => ({
      out, inn, oi, ii,
      totalPrice: (parseInt(out.price.replace(/[^\d]/g, '') || '0', 10) + parseInt(inn.price.replace(/[^\d]/g, '') || '0', 10)),
      totalDuration: parseDuration(out.duration) + parseDuration(inn.duration)
    }))
  );

  // Find best pairs for each category (only for round-trip)
  let cheapestPair = null, quickestPair = null, bestPair = null;
  if (!isOneWay && allPairs.length > 0) {
    // Cheapest: lowest total price
    cheapestPair = allPairs.reduce((a, b) => a.totalPrice < b.totalPrice ? a : b);
    // Quickest: lowest total duration
    quickestPair = allPairs.reduce((a, b) => a.totalDuration < b.totalDuration ? a : b);
    // Best: lowest price among the 3 quickest pairs
    const sortedByDuration = [...allPairs].sort((a, b) => a.totalDuration - b.totalDuration).slice(0, 3);
    bestPair = sortedByDuration.reduce((a, b) => a.totalPrice < b.totalPrice ? a : b);
  }

  // For one-way, compute similar categories from outbound flights only
  let cheapestOutbound = null, quickestOutbound = null, bestOutbound = null;
  if (isOneWay && filteredOutboundFlights.length > 0) {
    // Cheapest: lowest price
    cheapestOutbound = filteredOutboundFlights.reduce((a, b) => 
      parseInt(a.price.replace(/[^\d]/g, '') || '0', 10) < parseInt(b.price.replace(/[^\d]/g, '') || '0', 10) ? a : b
    );
    // Quickest: shortest duration
    quickestOutbound = filteredOutboundFlights.reduce((a, b) => 
      parseDuration(a.duration) < parseDuration(b.duration) ? a : b
    );
    // Best: cheapest among the 3 quickest flights
    const sortedByDuration = [...filteredOutboundFlights].sort((a, b) => 
      parseDuration(a.duration) - parseDuration(b.duration)
    ).slice(0, 3);
    bestOutbound = sortedByDuration.reduce((a, b) => 
      parseInt(a.price.replace(/[^\d]/g, '') || '0', 10) < parseInt(b.price.replace(/[^\d]/g, '') || '0', 10) ? a : b
    );
  }

  // Compute selected outbound/inbound flights and total price (from filtered lists)
  const hasOutbound = filteredOutboundFlights.length > 0;
  const hasInbound = isOneWay ? true : filteredInboundFlights.length > 0; // For one-way, consider inbound as "available"
  const selectedOutbound = hasOutbound ? (filteredOutboundFlights.find(f => f._key === selectedOutboundKey) || filteredOutboundFlights[0]) : null;
  const selectedInbound = isOneWay ? null : (filteredInboundFlights.length > 0 ? (filteredInboundFlights.find(f => f._key === selectedInboundKey) || filteredInboundFlights[0]) : null);
  const totalPrice = isOneWay 
    ? (parseInt(selectedOutbound?.price?.replace(/[^0-9]/g, '') || '0', 10)).toLocaleString()
    : (parseInt(selectedOutbound?.price?.replace(/[^0-9]/g, '') || '0', 10) +
       parseInt(selectedInbound?.price?.replace(/[^0-9]/g, '') || '0', 10)).toLocaleString();

  // Add glow effect state for Summary Row Card (must be after totalPrice is defined)
  const [glow, setGlow] = useState(false);
  const prevTotalPriceRef = useRef(totalPrice);
  useEffect(() => {
    if (totalPrice !== prevTotalPriceRef.current) {
      setGlow(true);
      prevTotalPriceRef.current = totalPrice;
      const timeout = setTimeout(() => setGlow(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [totalPrice]);

  // Tab label helpers
  const formatPrice = (price) => `₹${formatNumber(price, isArabic)}`;
  const formatTime = (time) => formatNumber(time, isArabic);
  const formatDuration = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${formatNumber(h, isArabic)}h ${formatNumber(m.toString().padStart(2, '0'), isArabic)}m`;
  };
  
  const translateAirline = (airlineName) => {
    const airlineTranslations = {
      'Emirates': t('emirates'),
      'Air India': t('airIndia'),
      'Etihad': t('etihad'),
      'Etihad Airways': t('etihad'),
      'Vistara': t('vistara'),
      'Qatar Airways': t('qatarAirways'),
      'Lufthansa': t('lufthansa'),
      'Singapore Airlines': t('singaporeAirlines'),
      'British Airways': t('britishAirways'),
      'Air France': t('airFrance'),
      'KLM': t('klm'),
      'Turkish Airlines': t('turkishAirlines'),
      'Saudi Arabian Airlines': t('saudiArabian'),
      'EgyptAir': t('egyptAir'),
      'Royal Jordanian': t('royalJordanian'),
      'Middle East Airlines': t('middleEastAirlines'),
      'Oman Air': t('omanAir'),
      'Kuwait Airways': t('kuwaitAirways'),
      'Bahrain Air': t('bahrainAir'),
      'flydubai': t('flyDubai'),
      'Air Arabia Group': t('airArabiaGroup'),
      'Jazeera Airways': t('jazeera'),
      'Nas Air': t('nasAir'),
      'flynas': t('flynas'),
      'Pegasus Airlines': t('pegasusAirlines')
    };
    return airlineTranslations[airlineName] || airlineName;
  };

  // When tab changes, update selectedOutboundKey/selectedInboundKey to match best pair
  useEffect(() => {
    if (!hasOutbound || !hasInbound) return;
    // If user has not manually selected, auto-select best pair for tab
    if (!userHasManuallySelected) {
      let pair = null;
      if (selectedPriceCategory === 'cheapest') pair = cheapestPair;
      else if (selectedPriceCategory === 'quickest') pair = quickestPair;
      else pair = bestPair;
      if (pair) {
        setSelectedOutboundKey(pair.out._key);
        setSelectedInboundKey(pair.inn._key);
      }
    }
  }, [selectedPriceCategory, filteredOutboundFlights, filteredInboundFlights, userHasManuallySelected]);

  // Ensure selected indices are valid after filtering
  useEffect(() => {
    let outboundValid = filteredOutboundFlights.some(f => f._key === selectedOutboundKey);
    let inboundValid = filteredInboundFlights.some(f => f._key === selectedInboundKey);
    if (!outboundValid || !inboundValid) {
      // If user's selection is no longer valid, reset to best pair and allow auto-selection again
      let pair = null;
      if (selectedPriceCategory === 'cheapest') pair = cheapestPair;
      else if (selectedPriceCategory === 'quickest') pair = quickestPair;
      else pair = bestPair;
      if (pair) {
        setSelectedOutboundKey(pair.out._key);
        setSelectedInboundKey(pair.inn._key);
      } else {
        setSelectedOutboundKey(filteredOutboundFlights[0]._key);
        setSelectedInboundKey(filteredInboundFlights[0]._key);
      }
      setUserHasManuallySelected(false);
    }
  }, [filteredOutboundFlights, filteredInboundFlights, selectedOutboundKey, selectedInboundKey, selectedPriceCategory, cheapestPair, quickestPair, bestPair]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handler for manual outbound selection
  const handleManualOutboundSelect = (flight) => {
    if (flight) setSelectedOutboundKey(flight._key);
    setUserHasManuallySelected(true);
    if (!hasShownManualSelectToast) {
      toast.info("You can freely select any outbound and inbound flight combination.");
      setHasShownManualSelectToast(true);
    }
  };
  // Handler for manual inbound selection
  const handleManualInboundSelect = (flight) => {
    if (flight) setSelectedInboundKey(flight._key);
    setUserHasManuallySelected(true);
    if (!hasShownManualSelectToast) {
      toast.info("You can freely select any outbound and inbound flight combination.");
      setHasShownManualSelectToast(true);
    }
  };

  const [isDatesCardSticky, setIsDatesCardSticky] = useState(false);
  const datesCardRef = useRef<HTMLDivElement>(null);
  const datesCardSentinelRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainScrollRef.current || !datesCardSentinelRef.current) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsDatesCardSticky(!entry.isIntersecting);
      },
      {
        root: mainScrollRef.current,
        threshold: 0,
        rootMargin: "-108px 0px 0px 0px",
      }
    );
    observer.observe(datesCardSentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [mainScrollRef.current, datesCardSentinelRef.current]);

  // In MainCuration component, before the Outbound & Inbound Flight Lists Card rendering:
  // Add state for outbound/inbound date selection and mock date arrays
  const [selectedOutboundDateIdx, setSelectedOutboundDateIdx] = useState(0);
  const [selectedInboundDateIdx, setSelectedInboundDateIdx] = useState(0);
  const outboundDates = [
    { date: formatDate('Wed, 7 May', isArabic, t), price: 35000 },
    { date: formatDate('Thu, 8 May', isArabic, t), price: 35500 },
    { date: formatDate('Fri, 9 May', isArabic, t), price: 34000 },
    { date: formatDate('Sat, 10 May', isArabic, t), price: 36000 },
    { date: formatDate('Sun, 11 May', isArabic, t), price: 34500 },
  ];
  const inboundDates = [
    { date: formatDate('Wed, 14 May', isArabic, t), price: 30000 },
    { date: formatDate('Thu, 15 May', isArabic, t), price: 30500 },
    { date: formatDate('Fri, 16 May', isArabic, t), price: 29900 },
    { date: formatDate('Sat, 17 May', isArabic, t), price: 31000 },
    { date: formatDate('Sun, 18 May', isArabic, t), price: 30200 },
  ];

  const airlineChipsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position for enabling/disabling arrows
  useEffect(() => {
    const checkScroll = () => {
      const el = airlineChipsScrollRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    checkScroll();
    const el = airlineChipsScrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollAirlineChips = (dir: 'left' | 'right') => {
    const el = airlineChipsScrollRef.current;
    console.log('Arrow clicked', dir, el);
    if (!el) return;
    const scrollAmount = 192; // px (card + gap)
    if (el.scrollBy) {
      el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollLeft += dir === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  // Add state for unified sorting
  const [outboundSortBy, setOutboundSortBy] = useState<string>('price-lowest');
  const [inboundSortBy, setInboundSortBy] = useState<string>('price-lowest');

  function applySorting(flights, sortBy, selectedIdx) {
    const sortedFlights = [...flights];
    
    // Always keep selected flight on top if it exists
    const selectedFlight = selectedIdx >= 0 ? flights[selectedIdx] : null;
    
    sortedFlights.sort((a, b) => {
      // Selected flight always on top
      if (selectedFlight && a === selectedFlight && b !== selectedFlight) return -1;
      if (selectedFlight && b === selectedFlight && a !== selectedFlight) return 1;
      
      // Then selected airlines
      const airlineIdA = airlines.find(al => al.name === a.airlineName)?.id || '';
      const airlineIdB = airlines.find(al => al.name === b.airlineName)?.id || '';
      const aSelected = selectedQuickFilters.includes(airlineIdA);
      const bSelected = selectedQuickFilters.includes(airlineIdB);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      
      // Apply the selected sorting
      switch (sortBy) {
        case 'price-lowest':
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        
        case 'price-highest':
          const priceAHigh = parseInt(a.price.replace(/[^0-9]/g, ''));
          const priceBHigh = parseInt(b.price.replace(/[^0-9]/g, ''));
          return priceBHigh - priceAHigh;
        
        case 'depart-earliest':
          const timeA = a.departureTime.replace(':', '');
          const timeB = b.departureTime.replace(':', '');
          return timeA.localeCompare(timeB);
        
        case 'depart-latest':
          const timeALate = a.departureTime.replace(':', '');
          const timeBLate = b.departureTime.replace(':', '');
          return timeBLate.localeCompare(timeALate);
        
        case 'duration-shortest':
          const durationA = parseDuration(a.duration);
          const durationB = parseDuration(b.duration);
          return durationA - durationB;
        
        case 'duration-longest':
          const durationALong = parseDuration(a.duration);
          const durationBLong = parseDuration(b.duration);
          return durationBLong - durationALong;
        
        case 'airline-az':
          return a.airlineName.localeCompare(b.airlineName);
        
        case 'stops-fewest':
          const stopsA = a.stops === 'non-stop' ? 0 : parseInt(a.stops.charAt(0)) || 0;
          const stopsB = b.stops === 'non-stop' ? 0 : parseInt(b.stops.charAt(0)) || 0;
          return stopsA - stopsB;
        
        default:
          return 0;
      }
    });
    
    return sortedFlights;
  }
  
  // Apply sorting to flight lists
  const selectedOutboundIdx = filteredOutboundFlights.findIndex(f => f._key === selectedOutboundKey);
  const selectedInboundIdx = filteredInboundFlights.findIndex(f => f._key === selectedInboundKey);
  const sortedOutboundFlights = applySorting(filteredOutboundFlights, outboundSortBy, selectedOutboundIdx);
  const sortedInboundFlights = applySorting(filteredInboundFlights, inboundSortBy, selectedInboundIdx);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerFlight, setDrawerFlight] = useState<any>(null);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <TopHeader />
        <LineLoading duration={4000} />
        <div className="container mx-auto max-w-7xl px-4 pt-4 pb-4 sm:px-6 lg:px-8">
          <SearchHeader 
            origin={searchParams.origin}
            destination={searchParams.destination}
            departureDate={searchParams.departureDate}
            returnDate={searchParams.returnDate}
            passengers={searchParams.passengers.adults + searchParams.passengers.children + searchParams.passengers.infants}
            cabinClass={searchParams.cabinClass}
            onSwap={handleSwapLocations}
            onUpdate={handleUpdateSearch}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MainCurationSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* New Top Header */}
      <TopHeader />
      {/* Search Header (not sticky) */}
      <div className="container mx-auto max-w-7xl px-4 pt-4 pb-4 sm:px-6 lg:px-8">
        <SearchHeader 
          origin={searchParams.origin}
          destination={searchParams.destination}
          departureDate={searchParams.departureDate}
          returnDate={searchParams.returnDate}
          passengers={searchParams.passengers.adults + searchParams.passengers.children + searchParams.passengers.infants}
          cabinClass={searchParams.cabinClass}
          isOneWay={isOneWay}
          onSwap={handleSwapLocations}
          onUpdate={handleUpdateSearch}
        />
      </div>

      {/* Horizontal Filters for v3 only */}
      {/* {version === 'v3' && (
        <div className="bg-white border-b">
          <HorizontalFilters
            selectedStops={selectedStops}
            onStopsChange={setSelectedStops}
            selectedDepartureTimeSlot={selectedDepartureTimeSlot}
            onDepartureTimeChange={setSelectedDepartureTimeSlot}
            selectedReturnTimeSlot={selectedReturnTimeSlot}
            onReturnTimeChange={setSelectedReturnTimeSlot}
            selectedAirlines={selectedAirlines}
            onAirlinesChange={setSelectedAirlines}
          />
        </div>
      )} */}

      {/* Main Content */}
      <div className="flex-1" ref={mainScrollRef}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* AI Message */}
          {(message || thinking) && isAiSearch && (
            <div className="mb-4 animate-bounce-in">
              <AiMessage 
                message={message} 
                thinking={thinking}
                loading={loading} 
              />
            </div>
          )}

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 gap-4 lg:gap-8 lg:grid-cols-12">
            {/* Left Column - Filters (only for v2) */}
            <div className="order-2 lg:order-1 lg:col-span-3 bg-gray-50">
              <div className="space-y-4">
                <FilterChips
                  selectedAirlines={selectedAirlines}
                  onAirlinesChange={setSelectedAirlines}
                  selectedStops={selectedStops}
                  onStopsChange={setSelectedStops}
                  onDepartureTimeChange={setSelectedDepartureTimeSlot}
                  onReturnTimeChange={setSelectedReturnTimeSlot}
                  departureRoute="DEL-BOM"
                  returnRoute="BOM-DEL"
                />
              </div>
            </div>

            {/* Main Content Cards (center, col-span-9) */}
            <div className="order-1 lg:order-2 lg:col-span-9 max-w-4xl mx-auto w-full">
              <div data-debug-marker="main-curation-right-col" style={{display: 'none'}}>MainCuration Right Column Marker</div>
              {/* Only v2 modular cards, no v1/v2 toggle */}
              {(!hasOutbound || !hasInbound) ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-8 text-center text-gray-500 text-lg font-semibold">
                  {t('noFlightsFound')}
                </div>
              ) : (
                <>
                  {/* Merchandising Banner */}
                  <div className="flex w-full gap-3 pb-4 -mx-2 pl-2">
                    {/* Card 1 */}
                    <div className="flex-1 flex items-center rounded-xl px-4 py-3" style={{ background: '#ecf8f4' }}>
                      <div className="mr-3 flex-shrink-0">
                        <Percent className="h-5 w-5" style={{ color: '#11a670' }} strokeWidth={2} />
                      </div>
                      <div className="text-sm font-semibold leading-snug" style={{ color: '#11a670', fontSize: '12px' }}>
                        {t('useCodeADCB')}
                      </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex-1 flex items-center rounded-xl px-4 py-3" style={{ background: '#ecf8f4' }}>
                      <div className="mr-3 flex-shrink-0">
                        <Percent className="h-5 w-5" style={{ color: '#11a670' }} strokeWidth={2} />
                      </div>
                      <div className="text-sm font-semibold leading-snug" style={{ color: '#11a670', fontSize: '12px' }}>
                        {t('useCodeAHB')}
                      </div>
                    </div>
                    {/* Card 3 */}
                    <div className="flex-1 flex items-center rounded-xl px-4 py-3 relative" style={{ background: '#ecf8f4' }}>
                      <div className="mr-3 flex-shrink-0">
                        <Percent className="h-5 w-5" style={{ color: '#11a670' }} strokeWidth={2} />
                      </div>
                      <div className="text-sm font-semibold leading-snug" style={{ color: '#11a670', fontSize: '12px' }}>
                        {t('useCodeVIP')}
                      </div>
                    </div>
                  </div>

                  {/* Flight Options Cards: Cheapest/Best/Quickest - show for both one-way and round-trip */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className={cn("flex", isRTL && "flex-row-reverse")}>
                      <div className={cn(
                        "flex-1 border-r border-gray-200 p-3 text-center relative cursor-pointer",
                        selectedPriceCategory === 'cheapest' && "bg-blue-50 border-b-2 border-b-blue-600",
                        isRTL && "border-r-0 border-l border-gray-200"
                      )}
                      onClick={() => setSelectedPriceCategory('cheapest')}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-xs text-gray-500">{t('cheapest')}</div>
                          <div className="text-[10px] text-gray-500">
                            {isOneWay 
                              ? (cheapestOutbound ? formatDuration(parseDuration(cheapestOutbound.duration)) : '--')
                              : (cheapestPair ? formatDuration(cheapestPair.totalDuration) : '--')
                            }
                          </div>
                        </div>
                        <div className="font-bold text-base">
                          {isOneWay 
                            ? (cheapestOutbound ? formatPrice(parseInt(cheapestOutbound.price.replace(/[^0-9]/g, '') || '0')) : '--')
                            : (cheapestPair ? formatPrice(cheapestPair.totalPrice) : '--')
                          }
                        </div>
                      </div>
                      <div className={cn(
                        "flex-1 border-r border-gray-200 p-3 text-center relative cursor-pointer",
                        selectedPriceCategory === 'best' && "bg-blue-50 border-b-2 border-b-blue-600",
                        isRTL && "border-r-0 border-l border-gray-200"
                      )}
                      onClick={() => setSelectedPriceCategory('best')}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-xs font-medium">{t('best')}</div>
                          <div className="text-[10px] text-gray-500">
                            {isOneWay 
                              ? (bestOutbound ? formatDuration(parseDuration(bestOutbound.duration)) : '--')
                              : (bestPair ? formatDuration(bestPair.totalDuration) : '--')
                            }
                          </div>
                        </div>
                        <div className="font-bold text-base">
                          {isOneWay 
                            ? (bestOutbound ? formatPrice(parseInt(bestOutbound.price.replace(/[^0-9]/g, '') || '0')) : '--')
                            : (bestPair ? formatPrice(bestPair.totalPrice) : '--')
                          }
                        </div>
                      </div>
                      <div className={cn(
                        "flex-1 p-3 text-center relative cursor-pointer",
                        selectedPriceCategory === 'quickest' && "bg-blue-50 border-b-2 border-b-blue-600"
                      )}
                      onClick={() => setSelectedPriceCategory('quickest')}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="text-xs text-gray-500">{t('quickest')}</div>
                          <div className="text-[10px] text-gray-500">
                            {isOneWay 
                              ? (quickestOutbound ? formatDuration(parseDuration(quickestOutbound.duration)) : '--')
                              : (quickestPair ? formatDuration(quickestPair.totalDuration) : '--')
                            }
                          </div>
                        </div>
                        <div className="font-bold text-base">
                          {isOneWay 
                            ? (quickestOutbound ? formatPrice(parseInt(quickestOutbound.price.replace(/[^0-9]/g, '') || '0')) : '--')
                            : (quickestPair ? formatPrice(quickestPair.totalPrice) : '--')
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Row Card - only show for round-trip */}
                  {!isOneWay && selectedOutbound && selectedInbound && (
                    <div className={cn(
                      "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-4 transition-all duration-700 sticky top-2 z-30 mb-2"
                    )} style={{ position: 'relative', padding: '2px' }}>
                      {glow && (
                        <GlowEffect
                          colors={["#194E91", "#194E91", "#FEC524", "#194E91", "#194E91"]}
                          mode="breathe"
                          blur={32}
                          scale={1.16}
                          duration={1.1}
                          className="absolute inset-0 z-0 rounded-2xl pointer-events-none opacity-90"
                        />
                      )}
                      <div className="flex items-center justify-between relative z-10 bg-white rounded-xl p-4">
                        {/* Left Side - Airline Logo and Name */}
                        <div className="flex flex-col items-center gap-1">
                          <img src={selectedOutbound.airlineLogo} alt={selectedOutbound.airlineName} className="h-8 w-8 object-contain" />
                          <div className="text-xs text-gray-600">{translateAirline(selectedOutbound.airlineName)}</div>
                        </div>
                        
                        {/* Center - Flight Details */}
                        <div className="flex items-center gap-6 flex-1 justify-center">
                                                    {/* Outbound Flight */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-lg font-bold text-black">{formatTime(selectedOutbound.departureTime)}</div>
                              <div className="text-xs text-gray-500">{selectedOutbound.departureCode}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500">{formatDuration(parseDuration(selectedOutbound.duration))}</div>
                              <div className="w-8 h-px bg-gray-300 mx-auto my-1"></div>
                              <div className="text-xs text-gray-500">{t(selectedOutbound.stops) || selectedOutbound.stops}</div>
                            </div>
                            <div className="text-left">
                              <div className="text-lg font-bold text-black">{formatTime(selectedOutbound.arrivalTime)}</div>
                              <div className="text-xs text-gray-500">{selectedOutbound.arrivalCode}</div>
                            </div>
                          </div>
                          
                          {/* Vertical Divider */}
                          <div className="h-12 w-px bg-gray-300"></div>
                          
                          {/* Center Airline Logo and Name */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <img src={selectedInbound.airlineLogo} alt={selectedInbound.airlineName} className="h-6 w-6 object-contain" />
                            </div>
                            <div className="text-xs text-gray-600">{translateAirline(selectedInbound.airlineName)}</div>
                          </div>
                          
                          {/* Inbound Flight */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-lg font-bold text-black">{formatTime(selectedInbound.departureTime)}</div>
                              <div className="text-xs text-gray-500">{selectedInbound.departureCode}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xs text-gray-500">{formatDuration(parseDuration(selectedInbound.duration))}</div>
                              <div className="w-8 h-px bg-gray-300 mx-auto my-1"></div>
                              <div className="text-xs text-gray-500">{t(selectedInbound.stops) || selectedInbound.stops}</div>
                            </div>
                            <div className="text-left">
                              <div className="text-lg font-bold text-black">{formatTime(selectedInbound.arrivalTime)}</div>
                              <div className="text-xs text-gray-500">{selectedInbound.arrivalCode}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Side - Price and Book Button */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            {/* Strikethrough original price */}
                            <div className="text-sm text-gray-400 line-through">
                              ₹{formatNumber(Math.round((parseInt(selectedOutbound.price.replace(/[^0-9]/g, '') || '0') + parseInt(selectedInbound.price.replace(/[^0-9]/g, '') || '0')) * 1.12), isArabic)}
                            </div>
                            {/* Final price */}
                            <div className="text-xl font-bold text-black">
                              ₹ {formatNumber((parseInt(selectedOutbound.price.replace(/[^0-9]/g, '') || '0') + parseInt(selectedInbound.price.replace(/[^0-9]/g, '') || '0')), isArabic)}
                            </div>
                          </div>
                          <Button 
                            className="bg-[#194E91] hover:bg-[#FFC107] hover:text-[#194E91] text-white font-semibold rounded-lg px-6 py-3 transition-colors duration-200"
                            onClick={() => handleTripSelect({ 
                              outbound: selectedOutbound, 
                              inbound: selectedInbound, 
                              totalPrice: (parseInt(selectedOutbound.price.replace(/[^0-9]/g, '') || '0') + parseInt(selectedInbound.price.replace(/[^0-9]/g, '') || '0')),
                              isOneWay: false 
                            })}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Price Filters Card with Arrows - DatesCard style */}
                  <div className="relative mt-4 mb-2 max-w-full overflow-hidden" style={{ minHeight: 56 }}>
                    {/* Left Gradient */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10" style={{ background: "linear-gradient(to right, rgba(249,250,251,1) 0%, rgba(249,250,251,0.7) 60%, rgba(249,250,251,0) 100%)" }} />
                    {/* Right Gradient */}
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10" style={{ background: "linear-gradient(to left, rgba(249,250,251,1) 0%, rgba(249,250,251,0.7) 60%, rgba(249,250,251,0) 100%)" }} />
                    {/* Left Arrow (absolute, DatesCard style) */}
                    <button
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1 text-gray-400 hover:text-black"
                      style={{ minWidth: 28 }}
                      onClick={() => scrollAirlineChips('left')}
                      aria-label={t('scrollLeft')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    {/* Right Arrow (absolute, DatesCard style) */}
                    <button
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1 text-gray-400 hover:text-black"
                      style={{ minWidth: 28 }}
                      onClick={() => scrollAirlineChips('right')}
                      aria-label={t('scrollRight')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="flex-1 relative w-full">
                      <div
                        ref={airlineChipsScrollRef}
                        className="flex overflow-x-auto gap-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pl-0 pr-0 pt-1 pb-1 mx-auto w-[93%] scrollbar-none"
                        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        {airlines.map((airline) => (
                          <button
                            key={airline.id}
                            className={cn(
                              "flex items-center justify-between p-2.5 rounded-lg border transition-all h-[52px] min-w-[160px] max-w-[180px] flex-shrink-0",
                              selectedQuickFilters.includes(airline.id)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            )}
                            onClick={() => handleQuickFilterSelect(airline.id)}
                          >
                            <div className="flex items-center gap-2.5">
                              <img 
                                src={airline.logo} 
                                alt={airline.name} 
                                className="h-5 w-5 rounded bg-gray-100"
                              />
                              <div className="text-left">
                                <div className="text-sm font-medium text-gray-900 leading-none">{translateAirline(airline.name)}</div>
                                <div className="flex items-center gap-1 mt-0.5">
                                  {airline.hasSpecialReturn ? (
                                    <>
                                      <div className="text-xs text-gray-500">₹{formatNumber(airline.specialReturnPrice, isArabic)}</div>
                                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-yellow-100 text-yellow-700 border border-yellow-300">
                                        {t('returnDeal')}
                                      </span>
                                    </>
                                  ) : (
                                    <div className="text-xs text-gray-500">₹{formatNumber(airline.price, isArabic)}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {selectedQuickFilters.includes(airline.id) && !airline.hasSpecialReturn && (
                              <span className="h-4 w-4 text-blue-600 flex-shrink-0">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Outbound & Inbound Flight Lists Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="pt-2 pr-4 pb-4 pl-4">
                      <div className={cn("grid gap-6", isOneWay ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2")}>
                        {/* Outbound List */}
                        <div>
                          <div className="mb-2 text-sm font-semibold text-gray-700 py-2 flex items-center justify-between">
                            <span>{t('newYork')} → {t('dubai')}</span>
                            <UnifiedSortingDropdown 
                              selectedSort={outboundSortBy} 
                              onSortChange={setOutboundSortBy}
                            />
                          </div>
                          <hr className="my-1 border-gray-200" />
                          <DatesCard
                            dates={outboundDates}
                            selectedIdx={selectedOutboundDateIdx}
                            onSelect={setSelectedOutboundDateIdx}
                            keyPrefix="outbound-"
                            maxDates={isOneWay ? 5 : 3}
                          />
                          <div className="flex flex-col gap-2">
                            {sortedOutboundFlights.map((option, idx) => {
                              // Show 'e seats left' tag for demo (non-stop flights + specific Etihad flight)
                              const showSeatsLeft = (option.showSeatsLeft && option.stops !== 'non-stop') || isEtihadFlightForSeatsLeft(option);
                              const layoverTag = getLayoverTagType(option.layover);
                              return (
                                <TooltipProvider key={idx}>
                                  <button
                                    className={cn(
                                      "rounded-md border px-3 py-2 text-left transition-all h-[80px] w-full",
                                      option._key === selectedOutboundKey ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                                    )}
                                    onClick={() => handleManualOutboundSelect(option)}
                                  >
                                    <div className="flex items-center gap-2 py-1">
                                      <img src={option.airlineLogo} alt={option.airlineName} className="h-6 w-6 object-contain bg-white border rounded flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          {/* Time and Airport Codes Section */}
                                          {isOneWay ? (
                                            // One-way layout: Two rows for better alignment
                                            <div className="flex flex-col gap-1">
                                              {/* First row: Times and Via text aligned */}
                                              <div className="flex items-center gap-2">
                                                <span className="text-base font-bold text-black">
                                                  {formatTime(option.departureTime)}
                                                </span>
                                                <span className="text-base font-bold text-black mx-1">→</span>
                                                <span className="text-base font-bold text-black">
                                                  {formatTime(option.arrivalTime)}
                                                </span>
                                                {/* Via text aligned with times */}
                                                {option.stops === '1 stop' && (
                                                  <div className={cn("flex items-center gap-1", isRTL ? "mr-2" : "ml-2")}>
                                                    <span className="text-sm font-normal text-gray-600">
                                                      {t('via')} {t('dxbAirport')}
                                                    </span>
                                                    {/* Airport warning indicator for Emirates flight mockup */}
                                                    {isEmiratesFlightForWarning(option) && (
                                                      <Tooltip>
                                                        <TooltipTrigger asChild>
                                                          <div className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-orange-50 text-orange-700 border border-orange-200 cursor-help">
                                                            <AlertTriangle className="h-3 w-3 mr-0.5" />
                                                            Different Airport
                                                          </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-black text-white border-black max-w-xs">
                                                          <div className="text-xs">
                                                            <p className="font-semibold text-orange-200">⚠️ Airport Notice</p>
                                                            <p className="mt-1">This flight uses a different airport than your search.</p>
                                                            <p className="mt-1 text-yellow-200">You may need to take a connecting bus or transport to reach your final destination.</p>
                                                          </div>
                                                        </TooltipContent>
                                                      </Tooltip>
                                                    )}
                                                  </div>
                                                )}
                                                {/* Layover icon aligned with times */}
                                                {layoverTag && (layoverTag.isShort || layoverTag.isLong) && (
                                                  <div className={cn("cursor-help", isRTL ? "mr-1" : "ml-1")}>
                                                    {layoverTag.tag}
                                                  </div>
                                                )}
                                              </div>
                                              {/* Second row: Airport codes */}
                                              <div className="flex items-center gap-2">
                                                <div className="text-xs text-gray-500 font-medium min-w-[2.5rem]">
                                                  {option.departureCode}
                                                </div>
                                                <span className="text-xs text-transparent mx-1">→</span>
                                                <div className="text-xs text-gray-500 font-medium min-w-[2.5rem]">
                                                  {option.arrivalCode}
                                                </div>
                                              </div>
                                            </div>
                                          ) : (
                                            // Round-trip layout: Keep original column structure
                                            <div className="flex items-center gap-2">
                                              <div className="flex flex-col items-start">
                                                <span className="text-base font-bold text-black">
                                                  {formatTime(option.departureTime)}
                                                </span>
                                              </div>
                                              <span className="text-base font-bold text-black mx-1">→</span>
                                              <div className="flex flex-col items-start">
                                                <span className="text-base font-bold text-black">
                                                  {formatTime(option.arrivalTime)}
                                                </span>
                                              </div>
                                              {/* Via text and layover icons inline with times */}
                                              {option.stops === '1 stop' && (
                                                <span className={cn("text-sm font-normal text-black", isRTL ? "mr-2" : "ml-2")}>
                                                  {t('via')} {t('dxbAirport')}
                                                </span>
                                              )}
                                            </div>
                                          )}
                                          {/* Layover Tag - positioned next to time/via text for round-trip or remaining layover tags for one-way */}
                                          {layoverTag && (!isOneWay || (!layoverTag.isShort && !layoverTag.isLong)) && (
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                {layoverTag.isShort || layoverTag.isLong ? (
                                                  <div className={cn("cursor-help", isRTL ? "mr-1" : "ml-1")}>
                                                    {layoverTag.tag}
                                                  </div>
                                                ) : (
                                                  <span className={cn("inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium border cursor-help", isRTL ? "mr-1" : "ml-1", layoverTag.color)}>
                                                    {layoverTag.tag}
                                                  </span>
                                                )}
                                              </TooltipTrigger>
                                              <TooltipContent className="bg-black text-white border-black">
                                                {layoverTag.isShort ? (
                                                  <div className="text-xs">
                                                    <p className="font-semibold">{t('shortLayoverWarning')}</p>
                                                    <p>{t('layover')}: {option.layover}</p>
                                                    <p className="text-yellow-200 mt-1">⚠️ {t('lessThanTwoHours')}</p>
                                                  </div>
                                                ) : layoverTag.isLong ? (
                                                  <div className="text-xs">
                                                    <p className="font-semibold">{t('longLayover')}</p>
                                                    <p>{t('layover')}: {option.layover}</p>
                                                    <p className="text-blue-200 mt-1">ℹ️ {t('moreThanFourHours')}</p>
                                                  </div>
                                                ) : (
                                                  <p className="text-xs">{t('layover')}: {option.layover}</p>
                                                )}
                                              </TooltipContent>
                                            </Tooltip>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 overflow-hidden">
                                          <span className="flex-shrink-0">{translateAirline(option.airlineName)}</span>
                                          <span className="flex-shrink-0">· {t(option.stops) || option.stops}</span>
                                          {option.stops === 'non-stop' && (
                                            <span className={cn("flex items-center text-xs text-gray-500 relative group flex-shrink-0", isRTL ? "mr-1" : "ml-1")} style={{ cursor: 'pointer' }}>
                                              <Luggage className="h-4 w-4 mr-0.5" />
                                              <Ban className="h-3 w-3 text-red-500 -ml-1" />
                                              <span
                                                className="pointer-events-none absolute z-50 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{ left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 }}
                                              >
                                                {t('noCheckInBaggage')}
                                              </span>
                                            </span>
                                          )}
                                          {/* Show 'e seats left' tag randomly for non-non-stop flights */}
                                          {showSeatsLeft && (
                                            <span className={cn(
                                              "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-red-50 text-red-700 border border-red-100 whitespace-nowrap flex-shrink-0",
                                              isRTL ? "mr-0.5" : "ml-0.5"
                                            )}>
                                              {formatNumber(2, isArabic)} {t('seatsLeft')}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        {isOneWay ? (
                                          <>
                                            {/* First Row: Price and Book Now Button */}
                                            <div className="flex items-center justify-between gap-3">
                                              {/* Price Section */}
                                              <div className={cn(
                                                "text-right",
                                                isArabic ? "text-left" : "text-right"
                                              )}>
                                                {/* Original price with strikethrough */}
                                                {option.originalPrice && (
                                                  <div className="text-xs text-gray-500 line-through">
                                                    ₹{formatNumber(option.originalPrice, isArabic)}
                                                  </div>
                                                )}
                                                {/* Current price */}
                                                <div className="text-base font-bold text-black">₹{formatNumber(option.price, isArabic)}</div>
                                              </div>

                                              {/* Book Now Button */}
                                              <Button 
                                                className="bg-[#194E91] hover:bg-[#FFC107] hover:text-[#194E91] text-white font-semibold rounded-lg px-4 py-1 text-xs transition-colors duration-200 flex-shrink-0"
                                                onClick={(e) => { 
                                                  e.stopPropagation(); 
                                                  // Show airport warning dialog for Emirates flight mockup
                                                  if (isEmiratesFlightForWarning(option)) {
                                                    handleAirportWarningBooking(option);
                                                  } else {
                                                    // Normal booking flow for other flights
                                                    handleTripSelect({ 
                                                      outbound: option, 
                                                      inbound: null, 
                                                      totalPrice: parseInt(option.price.replace(/[^0-9]/g, '') || '0', 10),
                                                      isOneWay: true 
                                                    });
                                                  }
                                                }}
                                              >
                                                {t('bookNow')}
                                              </Button>
                                            </div>
                                            
                                            {/* Second Row: More Info Link */}
                                            <div className={cn("flex", isArabic ? "justify-start" : "justify-end")}>
                                              <span
                                                className={cn(
                                                  "text-primary text-xs font-medium hover:underline flex items-center gap-1 cursor-pointer",
                                                  isArabic ? "flex-row-reverse" : ""
                                                )}
                                                role="button"
                                                tabIndex={0}
                                                onClick={e => { e.stopPropagation(); setDrawerFlight(option); setDrawerOpen(true); }}
                                                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setDrawerFlight(option); setDrawerOpen(true); } }}
                                              >
                                                {t('moreInfo')} <span aria-hidden="true">{isArabic ? '←' : '→'}</span>
                                              </span>
                                            </div>
                                          </>
                                        ) : (
                                          <div className={cn("flex flex-col gap-1", isArabic ? "items-start" : "items-end")}>
                                            {/* Price Section - Side by Side for Round Trip */}
                                            <div className={cn(
                                              "flex items-center gap-2",
                                              isArabic ? "flex-row-reverse" : ""
                                            )}>
                                              {/* Original price with strikethrough */}
                                              {option.originalPrice && (
                                                <div className="text-xs text-gray-500 line-through">
                                                  ₹{formatNumber(option.originalPrice, isArabic)}
                                                </div>
                                              )}
                                              {/* Current price */}
                                              <div className="text-base font-bold text-black">₹{formatNumber(option.price, isArabic)}</div>
                                            </div>

                                            {/* More Info Section - Below Price */}
                                            <div className="flex-shrink-0">
                                              <span
                                                className={cn(
                                                  "text-primary text-xs font-medium hover:underline flex items-center gap-1 cursor-pointer",
                                                  isArabic ? "flex-row-reverse" : ""
                                                )}
                                                role="button"
                                                tabIndex={0}
                                                onClick={e => { e.stopPropagation(); setDrawerFlight(option); setDrawerOpen(true); }}
                                                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setDrawerFlight(option); setDrawerOpen(true); } }}
                                              >
                                                {t('moreInfo')} <span aria-hidden="true">{isArabic ? '←' : '→'}</span>
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </button>
                                </TooltipProvider>
                              );
                            })}
                          </div>
                        </div>
                        {/* Inbound List - only show for round-trip */}
                        {!isOneWay && (
                        <div>
                          <div className="mb-2 text-sm font-semibold text-gray-700 py-2 flex items-center justify-between">
                            <span>{t('dubai')} → {t('newYork')}</span>
                            <UnifiedSortingDropdown 
                              selectedSort={inboundSortBy} 
                              onSortChange={setInboundSortBy}
                            />
                          </div>
                          <hr className="my-1 border-gray-200" />
                          <DatesCard
                            dates={inboundDates}
                            selectedIdx={selectedInboundDateIdx}
                            onSelect={setSelectedInboundDateIdx}
                            keyPrefix="inbound-"
                            maxDates={3}
                          />
                          <div className="flex flex-col gap-2">
                            {sortedInboundFlights.map((option, idx) => {
                              // Show 'e seats left' tag for demo (non-stop flights + specific Etihad flight)
                              const showSeatsLeft = (option.showSeatsLeft && option.stops !== 'non-stop') || isEtihadFlightForSeatsLeft(option);
                              const layoverTag = getLayoverTagType(option.layover);
                              return (
                                <TooltipProvider key={idx}>
                                  <button
                                    className={cn(
                                      "rounded-md border px-3 py-2 min-w-[180px] text-left transition-all h-[80px]",
                                      option._key === selectedInboundKey ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                                    )}
                                    onClick={() => handleManualInboundSelect(option)}
                                  >
                                    <div className="flex items-center gap-2 py-1">
                                                                              <img src={option.airlineLogo} alt={option.airlineName} className="h-6 w-6 object-contain bg-white border rounded flex-shrink-0" />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          {/* Time and Airport Codes Section */}
                                          <div className="flex items-center gap-2">
                                            <div className="flex flex-col items-start">
                                              <span className="text-base font-bold text-black">
                                                {formatTime(option.departureTime)}
                                              </span>
                                              {isOneWay && (
                                                <div className="text-xs text-gray-500 font-medium">
                                                  {option.departureCode}
                                                </div>
                                              )}
                                            </div>
                                            <span className="text-base font-bold text-black mx-1">→</span>
                                            <div className="flex flex-col items-start">
                                              <span className="text-base font-bold text-black">
                                                {formatTime(option.arrivalTime)}
                                              </span>
                                              {isOneWay && (
                                                <div className="text-xs text-gray-500 font-medium">
                                                  {option.arrivalCode}
                                                </div>
                                              )}
                                            </div>
                                            {/* Via text and layover icons inline with times */}
                                            {option.stops === '1 stop' && (
                                              <span className={cn("text-sm font-normal text-black", isRTL ? "mr-2" : "ml-2")}>
                                                {t('via')} {t('dxbAirport')}
                                              </span>
                                            )}
                                          </div>
                                          {/* Layover Tag - positioned next to time/via text */}
                                          {layoverTag && (
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                {layoverTag.isShort || layoverTag.isLong ? (
                                                  <div className={cn("cursor-help", isRTL ? "mr-1" : "ml-1")}>
                                                    {layoverTag.tag}
                                                  </div>
                                                ) : (
                                                  <span className={cn("inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium border cursor-help", isRTL ? "mr-1" : "ml-1", layoverTag.color)}>
                                                    {layoverTag.tag}
                                                  </span>
                                                )}
                                              </TooltipTrigger>
                                              <TooltipContent className="bg-black text-white border-black">
                                                {layoverTag.isShort ? (
                                                  <div className="text-xs">
                                                    <p className="font-semibold">{t('shortLayoverWarning')}</p>
                                                    <p>{t('layover')}: {option.layover}</p>
                                                    <p className="text-yellow-200 mt-1">⚠️ {t('lessThanTwoHours')}</p>
                                                  </div>
                                                ) : layoverTag.isLong ? (
                                                  <div className="text-xs">
                                                    <p className="font-semibold">{t('longLayover')}</p>
                                                    <p>{t('layover')}: {option.layover}</p>
                                                    <p className="text-blue-200 mt-1">ℹ️ {t('moreThanFourHours')}</p>
                                                  </div>
                                                ) : (
                                                  <p className="text-xs">{t('layover')}: {option.layover}</p>
                                                )}
                                              </TooltipContent>
                                            </Tooltip>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 overflow-hidden">
                                          <span className="flex-shrink-0">{translateAirline(option.airlineName)}</span>
                                          <span className="flex-shrink-0">· {t(option.stops) || option.stops}</span>
                                          {option.stops === 'non-stop' && (
                                            <span className={cn("flex items-center text-xs text-gray-500 relative group flex-shrink-0", isRTL ? "mr-1" : "ml-1")} style={{ cursor: 'pointer' }}>
                                              <Luggage className="h-4 w-4 mr-0.5" />
                                              <Ban className="h-3 w-3 text-red-500 -ml-1" />
                                              <span
                                                className="pointer-events-none absolute z-50 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{ left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 }}
                                              >
                                                {t('noCheckInBaggage')}
                                              </span>
                                            </span>
                                          )}
                                          {/* Show 'e seats left' tag randomly for non-non-stop flights */}
                                          {showSeatsLeft && (
                                            <span className={cn(
                                              "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-medium bg-red-50 text-red-700 border border-red-100 whitespace-nowrap flex-shrink-0",
                                              isRTL ? "mr-0.5" : "ml-0.5"
                                            )}>
                                              {formatNumber(2, isArabic)} {t('seatsLeft')}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <div className={cn("flex flex-col gap-1", isArabic ? "items-start" : "items-end")}>
                                        {/* Price Section - Side by Side for Round Trip */}
                                        <div className={cn(
                                          "flex items-center gap-2",
                                          isArabic ? "flex-row-reverse" : ""
                                        )}>
                                          {/* Original price with strikethrough */}
                                          {option.originalPrice && (
                                            <div className="text-xs text-gray-500 line-through">
                                              ₹{formatNumber(option.originalPrice, isArabic)}
                                            </div>
                                          )}
                                          {/* Current price */}
                                          <div className="text-base font-bold text-black">₹{formatNumber(option.price, isArabic)}</div>
                                        </div>

                                        {/* More Info Section - Below Price */}
                                        <div className="flex-shrink-0">
                                          <span
                                            className={cn(
                                              "text-primary text-xs font-medium hover:underline flex items-center gap-1 cursor-pointer",
                                              isArabic ? "flex-row-reverse" : ""
                                            )}
                                            role="button"
                                            tabIndex={0}
                                            onClick={e => { e.stopPropagation(); setDrawerFlight(option); setDrawerOpen(true); }}
                                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); setDrawerFlight(option); setDrawerOpen(true); } }}
                                          >
                                            {t('moreInfo')} <span aria-hidden="true">{isArabic ? '←' : '→'}</span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </button>
                                </TooltipProvider>
                              );
                            })}
                          </div>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fare Selection Modal */}
      <FareSelectionModal
        open={isFareModalOpen}
        trip={fareModalTrip}
        onClose={() => setFareModalOpen(false)}
        onFareSelected={handleFareSelected}
      />
      {/* Drawer for More info */}
      {drawerOpen && drawerFlight && (
        <div className="fixed inset-0 z-[10000] flex justify-end bg-black/40" onClick={() => setDrawerOpen(false)}>
          <div
            className="bg-white shadow-lg h-full w-[570px] flex flex-col animate-slide-in-right relative overflow-auto"
            style={{
              animation: 'slideInRight 0.3s ease-out',
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease-out',
            }}
            onClick={e => e.stopPropagation()}
          >
            <FlightDetails 
              flight={{
                airline: drawerFlight.airlineName,
                flightNumber: "AI 840", 
                class: "Economy", 
                departureTime: drawerFlight.departureTime,
                departureCode: drawerFlight.departureCode,
                departureCity: drawerFlight.departureCity || drawerFlight.departureCode,
                arrivalTime: drawerFlight.arrivalTime,
                arrivalCode: drawerFlight.arrivalCode,
                arrivalCity: drawerFlight.arrivalCity || drawerFlight.arrivalCode,
                duration: drawerFlight.duration,
                stopType: drawerFlight.stops === 'Non-stop' ? 'non-stop' : drawerFlight.stops,
                date: "Fri, 30 May",
                segments: [
                  {
                    airline: drawerFlight.airlineName,
                    flightNumber: "AI 840",
                    departureTime: drawerFlight.departureTime,
                    departureCode: drawerFlight.departureCode,
                    departureCity: drawerFlight.departureCity || drawerFlight.departureCode,
                    departureAirport: "King Khaled Int'l",
                    arrivalTime: "15:05",
                    arrivalCode: "JED",
                    arrivalCity: "Jeddah",
                    arrivalAirport: "King Abdulaziz Int'l",
                    duration: "1h 55m",
                    date: "Mon, 19 May"
                  },
                  {
                    airline: drawerFlight.airlineName,
                    flightNumber: "AI 853",
                    departureTime: "16:05",
                    departureCode: "JED",
                    departureCity: "Jeddah",
                    departureAirport: "King Abdulaziz Int'l",
                    arrivalTime: drawerFlight.arrivalTime,
                    arrivalCode: drawerFlight.arrivalCode,
                    arrivalCity: drawerFlight.arrivalCity || drawerFlight.arrivalCode,
                    arrivalAirport: "Dubai Int'l",
                    duration: "3h",
                    date: "Mon, 19 May"
                  }
                ],
                layover: "1hr layover in Jeddah",
                price: "₹35,909",
                aircraft: {
                  type: "Boeing 777-300ER",
                  seatConfiguration: "3-4-3",
                  seatType: "Standard (Limited seat tile)"
                },
                baggage: {
                  checkIn: "23kg",
                  cabin: "7kg"
                },
                airport: {
                  prayerRoom: "Near Gate 12",
                  lounges: "Emirates Lounge, Priority Pass",
                  foodOptions: [
                    { name: "Starbucks" },
                    { name: "Shake Shack" },
                    { name: "McDonald's" },
                    { name: "Subway" }
                  ],
                  amenities: [
                    { name: "Wi-Fi" },
                    { name: "Power Outlets" },
                    { name: "Entertainment" },
                    { name: "Meals" }
                  ]
                }
              }}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Airport Warning Dialog for Emirates Flight Mockup */}
      <Dialog open={airportWarningOpen} onOpenChange={setAirportWarningOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Airport Notice
            </DialogTitle>
            <DialogDescription className="space-y-3 pt-2">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800 font-medium flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0 pt-0.5" />
                  This flight uses a different airport than your original search.
                </p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Flight Details:</strong> Emirates {selectedFlightForWarning?.departureTime} → {selectedFlightForWarning?.arrivalTime}
                </p>
                <p>
                  <strong>Airport:</strong> Via Dubai International (DXB)
                </p>
                <p>
                  You may need to take a connecting bus, taxi, or other transport to reach your final destination in the city.
                </p>
                <p className="text-xs text-gray-500">
                  Please check transportation options and additional costs before confirming your booking.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setAirportWarningOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmedBooking}
              className="flex-1 bg-[#194E91] hover:bg-[#FFC107] hover:text-[#194E91] text-white"
            >
              Continue Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Utility function to determine layover tag type
function getLayoverTagType(layoverInfo: string | null) {
  if (!layoverInfo) return null;
  
  // Extract duration from layover string (e.g., "6h 30m in Dubai" -> "6h 30m")
  const durationMatch = layoverInfo.match(/(\d+h)?\s*(\d+m)?/);
  if (!durationMatch) return null;
  
  const hours = durationMatch[1] ? parseInt(durationMatch[1]) : 0;
  const minutes = durationMatch[2] ? parseInt(durationMatch[2]) : 0;
  const totalMinutes = hours * 60 + minutes;
  
  if (totalMinutes < 120) { // Less than 2 hours
    return {
      tag: <ShortLayoverIcon />,
      color: 'bg-red-50 text-red-700 border-red-200',
      isShort: true
    };
  } else if (totalMinutes > 240) { // More than 4 hours
    return {
      tag: <LongLayoverIcon />, 
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      isLong: true
    };
  }
  
  return null; // Normal layover (2-4 hours) - no tag
}
