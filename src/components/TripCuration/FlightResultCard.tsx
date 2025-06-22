import React, { useState, useRef, useEffect } from 'react';
import { Heart, Share } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn, formatNumber } from '@/lib/utils';
import { Button } from '../ui/button';
import { SlidingNumber } from '@/components/ui/sliding-number';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from '@/translations';

interface FlightResultCardProps {
  flight: {
    id: number;
    airline: string;
    airlineCode: string;
    airlineLogo?: string;
    departureCity: string;
    departureCode: string;
    departureTime: string;
    arrivalCity: string;
    arrivalCode: string; 
    arrivalTime: string;
    duration: string;
    stops: number;
    price: number;
    originalPrice?: number;
    baseFare: number;
    taxes: number;
    fees: number;
    carbonFootprint: string;
    tags?: string[];
    layoverInfo?: string;
  };
  onClick: () => void;
  isSelected?: boolean;
}

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

// Utility function to determine layover type from layover duration
const getLayoverTag = (layoverInfo?: string): { tag: string | React.ReactNode; color: string; isShort?: boolean; isLong?: boolean } | null => {
  if (!layoverInfo) return null;
  
  // Extract duration from layover info (e.g., "6h 55m in Colombo" -> "6h 55m")
  const durationMatch = layoverInfo.match(/(\d+h)\s*(\d+m)?/);
  if (!durationMatch) return null;
  
  const hours = parseInt(durationMatch[1]);
  const minutes = durationMatch[2] ? parseInt(durationMatch[2]) : 0;
  const totalMinutes = hours * 60 + minutes;
  
  if (totalMinutes < 120) { // Less than 2 hours
    return {
      tag: <ShortLayoverIcon />,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      isShort: true
    };
  } else if (totalMinutes > 240) { // More than 4 hours
    return {
      tag: <LongLayoverIcon />, 
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      isLong: true
    };
  }
  
  return null; // Normal layover (2-4 hours) - no tag
};

export default function FlightResultCard({ flight, onClick, isSelected = false }: FlightResultCardProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isArabic = language === 'ar';
  
  // Helper function to translate city names
  const translateCity = (cityName: string) => {
    if (!isArabic) return cityName;
    const cityKey = cityName.toLowerCase().replace(/\s+/g, '');
    const translatedCity = t(cityKey);
    return translatedCity !== cityKey ? translatedCity : cityName;
  };
  
  // Helper function to translate airline names
  const translateAirline = (airlineName: string) => {
    if (!isArabic) return airlineName;
    const airlineTranslations = {
      'Emirates': t('emirates'),
      'Air India': t('airIndia'),
      'Etihad': t('etihad'),
      'Vistara': t('vistara'),
      'Qatar Airways': t('qatarAirways'),
      'Lufthansa': t('lufthansa'),
      'Singapore Airlines': t('singaporeAirlines')
    };
    return airlineTranslations[airlineName] || airlineName;
  };
  const [imgError, setImgError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [glow, setGlow] = useState(false);
  const prevPriceRef = useRef(flight.price);
  
  useEffect(() => {
    if (flight.price !== prevPriceRef.current) {
      setGlow(true);
      prevPriceRef.current = flight.price;
      const timeout = setTimeout(() => setGlow(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [flight.price]);

  const handleImgError = () => {
    setImgError(true);
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality could be implemented here
  };

  const layoverTag = getLayoverTag(flight.layoverInfo);

  return (
    <TooltipProvider>
      <div className="space-y-2">
        <Card 
          onClick={onClick}
          className={cn(
            "overflow-visible border border-gray-200 cursor-pointer transition-all duration-500",
            isSelected ? "ring-2 ring-black shadow-sm" : "",
            glow ? "ring-4 ring-yellow-400/80 shadow-yellow-300 shadow-2xl scale-105 z-10" : ""
          )}
        >
          {/* Flight information section */}
          <div className="flex flex-col md:flex-row">
            {/* Left column for flights */}
            <div className="flex-grow p-4">
              {/* Save and Share buttons */}
              <div className="mb-4 flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1.5 rounded-full"
                  onClick={toggleSave}
                >
                  <Heart className={cn("h-4 w-4", isSaved ? "fill-red-500 text-red-500" : "")} />
                  <span>{t('save')}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1.5 rounded-full"
                  onClick={handleShare}
                >
                  <Share className="h-4 w-4" />
                  <span>{t('share')}</span>
                </Button>
              </div>
              
              {/* Outbound flight */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-xl font-bold">
                      {formatNumber(flight.departureTime, isArabic)} – {formatNumber(flight.arrivalTime, isArabic)}
                    </div>
                    {flight.tags && flight.tags.includes("Direct Flight") ? (
                      <Badge variant="outline" className="bg-purple-50 text-xs text-purple-600 border-none">
                        Direct
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-50 text-xs text-blue-600 border-none">
                        {flight.stops === 1 ? `${formatNumber(1, isArabic)} stop` : `${formatNumber(flight.stops, isArabic)} stops`}
                      </Badge>
                    )}
                    {/* Layover Tag */}
                    {layoverTag && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {layoverTag.isShort || layoverTag.isLong ? (
                            <div className="cursor-help">
                              {layoverTag.tag}
                            </div>
                          ) : (
                            <Badge 
                              variant="outline" 
                              className={cn("text-[8px] border cursor-help px-1.5 py-0.5", layoverTag.color)}
                            >
                              {layoverTag.tag}
                            </Badge>
                          )}
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-white border-black">
                          {layoverTag.isShort ? (
                            <div className="text-xs">
                              <p className="font-semibold">Short Layover Warning</p>
                              <p>Layover: {flight.layoverInfo}</p>
                              <p className="text-yellow-200 mt-1">⚠️ Less than 2 hours - may be risky for connections</p>
                            </div>
                          ) : layoverTag.isLong ? (
                            <div className="text-xs">
                              <p className="font-semibold">Long Layover</p>
                              <p>Layover: {flight.layoverInfo}</p>
                              <p className="text-blue-200 mt-1">ℹ️ Extended layover - time to explore the airport or city</p>
                            </div>
                          ) : (
                            <p className="text-xs">Layover: {flight.layoverInfo}</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                  <div className="text-lg font-semibold">{formatNumber(flight.duration, isArabic)}</div>
                </div>
                
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <div>
                    {flight.departureCode} {translateCity(flight.departureCity)} – {flight.arrivalCode} {translateCity(flight.arrivalCity)}
                  </div>
                  {flight.airlineLogo && !imgError ? (
                    <img 
                      src={flight.airlineLogo} 
                      alt={flight.airline} 
                      className="h-6 w-auto"
                      onError={handleImgError}
                    />
                  ) : (
                    <span className="font-medium">
                      {translateAirline(flight.airline)}
                    </span>
                  )}
                </div>

                {flight.layoverInfo && (
                  <div className="mt-2 text-sm text-gray-500">
                    {flight.layoverInfo}
                  </div>
                )}
              </div>
              
              {/* Return flight */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-xl font-bold">
                      {formatNumber('19:50', isArabic)} – {formatNumber('19:20', isArabic)}
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-xs text-blue-600 border-none">
                      {flight.stops === 1 ? `${formatNumber(1, isArabic)} stop` : `${formatNumber(flight.stops, isArabic)} stops`}
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold">{formatNumber('19', isArabic)}h {formatNumber('00', isArabic)}m</div>
                </div>
                
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <div>
                    {flight.arrivalCode} {translateCity(flight.arrivalCity)} – {flight.departureCode} {translateCity(flight.departureCity)}
                  </div>
                  {flight.airlineLogo && !imgError ? (
                    <img 
                      src={flight.airlineLogo} 
                      alt={flight.airline} 
                      className="h-6 w-auto"
                      onError={handleImgError}
                    />
                  ) : (
                    <span className="font-medium">
                      {translateAirline(flight.airline)}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                {translateAirline(flight.airline)}
              </div>
            </div>
            
            {/* Right column for price and action */}
            <div className="bg-gray-50 p-4 flex flex-col items-center justify-center border-l border-gray-200 min-w-[180px]">
              {/* Show original price if there's a discount */}
              {flight.originalPrice && flight.originalPrice > flight.price && (
                <div className="text-sm text-gray-500 line-through mb-1">
                  ₹{formatNumber(flight.originalPrice.toLocaleString(), isArabic)}
                </div>
              )}
              
              {/* Current price */}
              <div className="text-2xl font-bold">
                <span>₹</span><SlidingNumber value={flight.price} useArabicNumerals={isArabic} />
              </div>
              <div className="mb-1 text-xs text-gray-500">Economy</div>
              <Button 
                onClick={onClick}
                className={cn(
                  "w-full rounded-md text-sm font-medium py-2 mt-2",
                  isSelected 
                    ? "bg-gray-200 text-gray-800" 
                    : "bg-black text-white"
                )}
              >
                {isSelected ? t('selected') : t('select')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}
