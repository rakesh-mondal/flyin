import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Shield, BadgeCheck } from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';
import { getAirlineLogo } from '../../../utils/airlineLogos';
import cashRegisterSound from '@/assets/cash-register.mp3'; // Place a short cash register sound in this path
import { SlidingNumber } from '@/components/ui/sliding-number';
import { FlightDetails } from '@/components/trip-detail/FlightDetails';
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from '@/translations';

interface FlightLegOption {
  id: string;
  departureTime: string;
  arrivalTime: string;
  departureCode: string;
  arrivalCode: string;
  departureCity?: string;
  arrivalCity?: string;
  duration: string;
  stops?: string;
  airline?: string;
  airlineName?: string;
  airlineCode?: string;
  airlineLogo?: string;
  price?: number;
  date?: string;
  layover?: string;
  onTimePerformance?: string;
  stock?: string;
  stopType?: string;
  flightNumber?: string;
  class?: string;
  aircraft?: {
    type?: string;
    seatConfiguration?: string;
    seatType?: string;
  };
  baggage?: {
    checkIn?: string;
    cabin?: string;
  };
  airport?: {
    prayerRoom?: string;
    lounges?: string;
    foodOptions?: {
      name: string;
      logo?: string;
    }[];
    amenities?: {
      name: string;
      icon?: React.ReactNode;
    }[];
  };
}

interface FlightListCardProps {
  outboundFlight: FlightLegOption;
  returnFlight: FlightLegOption;
  price: string;
  currency: string;
  stock?: string;
  coupon?: string;
  promoBanner?: string;
  baggageTag?: string;
  moreOptions?: Array<{
    outbound: FlightLegOption;
    return: FlightLegOption;
  }>;
  onBook: () => void;
  onDetails?: () => void;
  showOptions?: boolean;
}

const FlightLegRow = ({ option, isArabic, translateAirline, translateAirportCode, t }: { option: FlightLegOption; isArabic: boolean; translateAirline: (name: string) => string; translateAirportCode: (code: string) => string; t: (key: string) => string }) => {
  
  return (
  <div className="flex items-center gap-3 py-1">
    <img src={getAirlineLogo(option.airlineName)} alt={option.airlineName} className="h-5 w-8 object-contain bg-white border rounded" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-black">{formatNumber(option.departureTime, isArabic)}–{formatNumber(option.arrivalTime, isArabic)}</span>
        <span className="text-gray-500 text-xs">{translateAirportCode(option.departureCode)}–{translateAirportCode(option.arrivalCode)}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>{translateAirline(option.airlineName)}</span>
        <span>· {option.stops === 'non-stop' ? t('nonStop') : option.stops}</span>
        {option.layover && <span>· {formatNumber(option.layover, isArabic)}</span>}
      </div>
    </div>
  </div>
  );
};

const FlightListCard = ({
  outboundFlight,
  returnFlight,
  price,
  currency,
  stock,
  coupon,
  promoBanner,
  baggageTag,
  moreOptions = [],
  onBook,
  onDetails,
  showOptions = true,
}: FlightListCardProps) => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isArabic = language === 'ar';
  
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
      'Singapore Airlines': t('singaporeAirlines'),
      'British Airways': t('britishAirways')
    };
    return airlineTranslations[airlineName] || airlineName;
  };

  // Helper function to translate airport codes
  const translateAirportCode = (code: string) => {
    if (!isArabic) return code;
    const airportTranslations = {
      'JFK': t('jfkAirport'),
      'LHR': t('lhrAirport'),
      'CDG': t('cdgAirport'),
      'BOM': t('bomAirport'),
      'DXB': t('dxbAirport'),
      'FRA': t('fraAirport')
    };
    return airportTranslations[code] || code;
  };

  const [selectedOutboundIdx, setSelectedOutboundIdx] = useState(0);
  const [selectedReturnIdx, setSelectedReturnIdx] = useState(0);
  const [glow, setGlow] = useState(false);
  const prevPriceRef = useRef(parseInt(price.toString().replace(/[^0-9]/g, '')) || 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerFlight, setDrawerFlight] = useState<FlightLegOption | null>(null);
  const [activeTab, setActiveTab] = useState('trip');

  useEffect(() => {
    const numericPrice = parseInt(price.toString().replace(/[^0-9]/g, '')) || 0;
    if (numericPrice !== prevPriceRef.current) {
      setGlow(true);
      prevPriceRef.current = numericPrice;
      const timeout = setTimeout(() => setGlow(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [price]);

  // Create arrays for outbound and return options
  const outboundOptions = [
    outboundFlight,
    ...(moreOptions?.map(option => option.outbound) || [])
  ];
  
  const returnOptions = [
    returnFlight,
    ...(moreOptions?.map(option => option.return) || [])
  ];

  // Ensure we have valid selections
  const selectedOutbound = outboundOptions[selectedOutboundIdx] || outboundOptions[0];
  const selectedReturn = returnOptions[selectedReturnIdx] || returnOptions[0];
  
  console.log('selectedOutbound', selectedOutbound, 'selectedReturn', selectedReturn);
  if (!selectedOutbound || !selectedReturn) {
    return (
      <div style={{background: 'orange', padding: 20, color: 'black'}}>
        MISSING FLIGHT DATA
        <div>selectedOutbound: {JSON.stringify(selectedOutbound)}</div>
        <div>selectedReturn: {JSON.stringify(selectedReturn)}</div>
      </div>
    );
  }

  console.log('FlightListCard rendered');

  const handleSelectOutbound = (idx: number) => {
    setSelectedOutboundIdx(idx);
  };
  
  const handleSelectReturn = (idx: number) => {
    setSelectedReturnIdx(idx);
  };

  // Add a handler to open the drawer with logging
  const handleOpenDetail = (flightLeg: FlightLegOption) => {
    setDrawerFlight(flightLeg);
    setDrawerOpen(true);
    console.log("Opening flight details drawer for:", flightLeg);
  };

  return (
    <div
      className={cn(
        "bg-white rounded-t-xl overflow-visible transition-all duration-700 relative",
        glow ? "ring-4 ring-blue-400/80 shadow-blue-300 shadow-2xl scale-105 z-10" : ""
      )}
    >
      {stock && (
        <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
          <span className="px-4 py-1.5 text-sm font-bold bg-red-600 text-white rounded-full border-2 border-white shadow-lg flex items-center gap-2 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {stock.includes('seats') ? stock.split(' at')[0] : stock}
          </span>
        </div>
      )}
      {/* Compact summary card */}
      <div className="flex flex-row items-center px-4 py-4 gap-0">
        {/* Outbound */}
        <div className="flex flex-col items-center flex-1 min-w-0 relative">
          {stock && (
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10">
              <span className="px-3 py-1 text-[11px] font-bold bg-red-500 text-white rounded-full border border-red-600 shadow-md flex items-center gap-1 whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {stock.includes('seats') ? stock.split(' at')[0] : stock}
              </span>
            </div>
          )}
          <div className="flex flex-row items-center w-full justify-center gap-3">
            <div className="flex flex-col items-center min-w-[56px]">
              <img src={getAirlineLogo(selectedOutbound.airlineName)} alt={selectedOutbound.airlineName} className="h-7 w-7 rounded bg-[#f8f8f8] mb-0.5" />
              <span className="text-[10px] text-gray-500 leading-none mt-0.5">{translateAirline(selectedOutbound.airlineName)}</span>
            </div>
            <div className="flex flex-col items-center min-w-[48px]">
              <span className="text-lg font-bold text-black leading-none">{formatNumber(selectedOutbound.departureTime, isArabic)}</span>
              <span className="text-[11px] text-gray-500 leading-none">{translateAirportCode(selectedOutbound.departureCode)}</span>
            </div>
            <div className="flex flex-col items-center min-w-[64px] mx-1">
              <span className="text-[13px] font-semibold text-gray-400 leading-none">{formatNumber(selectedOutbound.duration, isArabic)}</span>
              <hr className="w-full border-t border-gray-300 my-1 mx-0" />
              <span className="text-xs text-gray-400 leading-none">{selectedOutbound.stops === 'non-stop' ? t('nonStop') : selectedOutbound.stops}</span>
            </div>
            <div className="flex flex-col items-center min-w-[48px]">
              <span className="text-lg font-bold text-black leading-none">{formatNumber(selectedOutbound.arrivalTime, isArabic)}</span>
              <span className="text-[11px] text-gray-500 leading-none">{translateAirportCode(selectedOutbound.arrivalCode)}</span>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="w-px h-16 bg-gray-200 mx-1" />
        {/* Return */}
        <div className="flex flex-col items-center flex-1 min-w-0 relative">
          {stock && (
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10">
              <span className="px-3 py-1 text-[11px] font-bold bg-red-500 text-white rounded-full border border-red-600 shadow-md flex items-center gap-1 whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {stock.includes('seats') ? stock.split(' at')[0] : stock}
              </span>
            </div>
          )}
          <div className="flex flex-row items-center w-full justify-center gap-3">
            <div className="flex flex-col items-center min-w-[56px]">
              <img src={getAirlineLogo(selectedReturn.airlineName)} alt={selectedReturn.airlineName} className="h-7 w-7 rounded bg-[#f8f8f8] mb-0.5" />
              <span className="text-[10px] text-gray-500 leading-none mt-0.5">{translateAirline(selectedReturn.airlineName)}</span>
            </div>
            <div className="flex flex-col items-center min-w-[48px]">
              <span className="text-lg font-bold text-black leading-none">{formatNumber(selectedReturn.departureTime, isArabic)}</span>
              <span className="text-[11px] text-gray-500 leading-none">{translateAirportCode(selectedReturn.departureCode)}</span>
            </div>
            <div className="flex flex-col items-center min-w-[64px] mx-1">
              <span className="text-[13px] font-semibold text-gray-400 leading-none">{formatNumber(selectedReturn.duration, isArabic)}</span>
              <hr className="w-full border-t border-gray-300 my-1 mx-0" />
              <span className="text-xs text-gray-400 leading-none">{selectedReturn.stops === 'non-stop' ? t('nonStop') : selectedReturn.stops}</span>
            </div>
            <div className="flex flex-col items-center min-w-[48px]">
              <span className="text-lg font-bold text-black leading-none">{formatNumber(selectedReturn.arrivalTime, isArabic)}</span>
              <span className="text-[11px] text-gray-500 leading-none">{translateAirportCode(selectedReturn.arrivalCode)}</span>
            </div>
          </div>
        </div>
        {/* Price & Action */}
        <div className="flex flex-row justify-center min-w-[280px] pl-4 gap-4">
          <div className="flex flex-col justify-center items-end">
            <div className="text-xl font-bold text-black flex items-center gap-1">
              <span>{currency}</span>
              <SlidingNumber value={parseInt(price.toString().replace(/[^0-9]/g, '')) || 0} useArabicNumerals={isArabic} />
            </div>
            <div className="text-xs text-gray-700 mt-1">{t('getOffWithFly').replace('{amount}', formatNumber('600', isArabic))}</div>
          </div>
          <div className="flex items-center">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground hover:text-[#194E91] font-semibold rounded-lg px-5 py-2 text-sm min-w-[110px]" onClick={onBook}>{t('bookNow')}</Button>
          </div>
        </div>
      </div>
      {showOptions && (
        <>
          <div className="bg-gray-50 border-t border-gray-100 px-4 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Departure column */}
              <div>
                <div className="mb-2 text-xs font-semibold text-gray-700">
                  {translateAirportCode(outboundOptions[0].departureCode)} → {translateAirportCode(outboundOptions[0].arrivalCode)} · {outboundOptions[0].date}
                </div>
                <div className="flex flex-col gap-2">
                  {outboundOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      style={idx !== selectedOutboundIdx ? { backgroundColor: '#fff' } : {}}
                      className={cn(
                        "rounded-md border px-3 py-2 min-w-[180px] text-left transition-all",
                        idx === selectedOutboundIdx ? "border-blue-500 bg-blue-50 font-semibold" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                      )}
                      onClick={() => handleSelectOutbound(idx)}
                    >
                      <FlightLegRow option={opt} isArabic={isArabic} translateAirline={translateAirline} translateAirportCode={translateAirportCode} t={t} />
                      {/* Info Row inside each outbound option */}
                      <div className="flex items-center justify-between mt-2 px-1 py-1 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-4 text-gray-700 text-xs">
                          {/* Visa */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2M5 7h14M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M9 11h6M9 15h6" /></svg>
                            <span>{t('visaReq')}</span>
                          </span>
                          {/* Prayer room */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 0a7 7 0 017 7v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a7 7 0 017-7z" /></svg>
                            <span>{t('prayerRm')}</span>
                          </span>
                          {/* Wi-Fi */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.53 16.11a6 6 0 016.94 0M5.07 12.66a10 10 0 0113.86 0M1.64 9.21a14 14 0 0120.72 0M12 20h.01" /></svg>
                            <span>{t('wifi')}</span>
                          </span>
                          {/* Baggage */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h6m-6 0a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2m-6 0V4a3 3 0 013-3h2a3 3 0 013 3v2" /></svg>
                            <span>{t('baggage')}</span>
                          </span>
                        </div>
                        <button
                          className="text-primary text-xs font-medium hover:underline flex items-center gap-1"
                          type="button"
                          onClick={e => { e.stopPropagation(); handleOpenDetail(opt); }}
                        >
                          {t('moreInfo')} <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Return column */}
              <div>
                <div className="mb-2 text-xs font-semibold text-gray-700">
                  {translateAirportCode(returnOptions[0].departureCode)} → {translateAirportCode(returnOptions[0].arrivalCode)} · {returnOptions[0].date}
                </div>
                <div className="flex flex-col gap-2">
                  {returnOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      style={idx !== selectedReturnIdx ? { backgroundColor: '#fff' } : {}}
                      className={cn(
                        "rounded-md border px-3 py-2 min-w-[180px] text-left transition-all",
                        idx === selectedReturnIdx ? "border-blue-500 bg-blue-50 font-semibold" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                      )}
                      onClick={() => handleSelectReturn(idx)}
                    >
                      <FlightLegRow option={opt} isArabic={isArabic} translateAirline={translateAirline} translateAirportCode={translateAirportCode} t={t} />
                      {/* Info Row inside each return option */}
                      <div className="flex items-center justify-between mt-2 px-1 py-1 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-4 text-gray-700 text-xs">
                          {/* Visa */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2M5 7h14M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M9 11h6M9 15h6" /></svg>
                            <span>{t('visaReq')}</span>
                          </span>
                          {/* Prayer room */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 0a7 7 0 017 7v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a7 7 0 017-7z" /></svg>
                            <span>{t('prayerRm')}</span>
                          </span>
                          {/* Wi-Fi */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.53 16.11a6 6 0 016.94 0M5.07 12.66a10 10 0 0113.86 0M1.64 9.21a14 14 0 0120.72 0M12 20h.01" /></svg>
                            <span>{t('wifi')}</span>
                          </span>
                          {/* Baggage */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h6m-6 0a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2m-6 0V4a3 3 0 013-3h2a3 3 0 013 3v2" /></svg>
                            <span>{t('baggage')}</span>
                          </span>
                        </div>
                        <button
                          className="text-primary text-xs font-medium hover:underline flex items-center gap-1"
                          type="button"
                          onClick={e => { e.stopPropagation(); handleOpenDetail(opt); }}
                        >
                          {t('moreInfo')} <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Flight details link in gray bar at bottom */}
          <div className="bg-gray-50 px-4 pt-10 pb-2 w-full text-right">
            <button className="text-primary text-sm font-medium hover:underline hover:text-[#194E91]" onClick={onDetails}>{t('flightDetails')}</button>
          </div>
          {/* Flight details drawer */}
          {drawerOpen && drawerFlight && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/40 transition-opacity duration-300" onClick={() => setDrawerOpen(false)}>
              <div
                className="bg-white shadow-lg h-full w-[420px] flex flex-col animate-slide-in-right relative overflow-auto"
                style={{
                  animation: 'slideInRight 0.3s ease-out',
                  transform: 'translateX(0)',
                  transition: 'transform 0.3s ease-out',
                }}
                onClick={e => e.stopPropagation()}
              >
                <FlightDetails 
                  flight={{
                    airline: drawerFlight.airline || drawerFlight.airlineName,
                    flightNumber: drawerFlight.flightNumber || "N/A",
                    class: drawerFlight.class || t('economy'),
                    departureTime: drawerFlight.departureTime,
                    departureCode: drawerFlight.departureCode,
                    departureCity: drawerFlight.departureCity || drawerFlight.departureCode,
                    arrivalTime: drawerFlight.arrivalTime,
                    arrivalCode: drawerFlight.arrivalCode,
                    arrivalCity: drawerFlight.arrivalCity || drawerFlight.arrivalCode,
                    duration: drawerFlight.duration,
                    stopType: drawerFlight.stopType || drawerFlight.stops || t('nonStop'),
                    aircraft: {
                      type: drawerFlight.aircraft?.type || "Boeing 777-300ER",
                      seatConfiguration: drawerFlight.aircraft?.seatConfiguration || "3-4-3",
                      seatType: drawerFlight.aircraft?.seatType || "Standard (Limited seat tile)"
                    },
                    baggage: {
                      checkIn: drawerFlight.baggage?.checkIn || "23kg",
                      cabin: drawerFlight.baggage?.cabin || "7kg"
                    },
                    airport: {
                      prayerRoom: drawerFlight.airport?.prayerRoom || "Near Gate 12",
                      lounges: drawerFlight.airport?.lounges || "Emirates Lounge, Priority Pass",
                      foodOptions: drawerFlight.airport?.foodOptions || [
                        { name: "Starbucks" },
                        { name: "Shake Shack" },
                        { name: "McDonald's" },
                        { name: "Subway" }
                      ],
                      amenities: drawerFlight.airport?.amenities || [
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
        </>
      )}
    </div>
  );
};

export default FlightListCard; 