import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Shield, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAirlineLogo } from '../../../utils/airlineLogos';
import cashRegisterSound from '@/assets/cash-register.mp3'; // Place a short cash register sound in this path
import { SlidingNumber } from '@/components/ui/sliding-number';

interface FlightLegOption {
  airlineLogo: string;
  airlineName: string;
  departureTime: string;
  arrivalTime: string;
  departureCode: string;
  arrivalCode: string;
  duration: string;
  stops: string;
  layover?: string;
  date: string;
  departureCity?: string;
  arrivalCity?: string;
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

const FlightLegRow = ({ option }: { option: FlightLegOption }) => (
  <div className="flex items-center gap-3 py-1">
    <img src={getAirlineLogo(option.airlineName)} alt={option.airlineName} className="h-5 w-8 object-contain bg-white border rounded" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-black">{option.departureTime}–{option.arrivalTime}</span>
        <span className="text-gray-500 text-xs">{option.departureCode}–{option.arrivalCode}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>{option.airlineName}</span>
        <span>· {option.stops}</span>
        {option.layover && <span>· {option.layover}</span>}
      </div>
    </div>
  </div>
);

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
  const handleOpenDrawer = (flight: FlightLegOption) => {
    console.log('Opening drawer for flight:', flight);
    setDrawerFlight(flight);
    setDrawerOpen(true);
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
              <span className="text-[10px] text-gray-500 leading-none mt-0.5">{selectedOutbound.airlineName}</span>
            </div>
            <div className="flex flex-col items-center min-w-[48px]">
              <span className="text-lg font-bold text-black leading-none">{selectedOutbound.departureTime}</span>
              <span className="text-[11px] text-gray-500 leading-none">{selectedOutbound.departureCode}</span>
            </div>
            <div className="flex flex-col items-center min-w-[64px] mx-1">
              <span className="text-[13px] font-semibold text-gray-400 leading-none">{selectedOutbound.duration}</span>
              <hr className="w-full border-t border-gray-300 my-1 mx-0" />
              <span className="text-xs text-gray-400 leading-none">{selectedOutbound.stops}</span>
            </div>
            <div className="flex flex-col items-center min-w-[48px]">
              <span className="text-lg font-bold text-black leading-none">{selectedOutbound.arrivalTime}</span>
              <span className="text-[11px] text-gray-500 leading-none">{selectedOutbound.arrivalCode}</span>
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
              <span className="text-[10px] text-gray-500 leading-none mt-0.5">{selectedReturn.airlineName}</span>
            </div>
            <div className="flex flex-col items-center min-w-[48px]">
              <span className="text-lg font-bold text-black leading-none">{selectedReturn.departureTime}</span>
              <span className="text-[11px] text-gray-500 leading-none">{selectedReturn.departureCode}</span>
            </div>
            <div className="flex flex-col items-center min-w-[64px] mx-1">
              <span className="text-[13px] font-semibold text-gray-400 leading-none">{selectedReturn.duration}</span>
              <hr className="w-full border-t border-gray-300 my-1 mx-0" />
              <span className="text-xs text-gray-400 leading-none">{selectedReturn.stops}</span>
            </div>
            <div className="flex flex-col items-center min-w-[48px]">
              <span className="text-lg font-bold text-black leading-none">{selectedReturn.arrivalTime}</span>
              <span className="text-[11px] text-gray-500 leading-none">{selectedReturn.arrivalCode}</span>
            </div>
          </div>
        </div>
        {/* Price & Action */}
        <div className="flex flex-row justify-center min-w-[280px] pl-4 gap-4">
          <div className="flex flex-col justify-center items-end">
            <div className="text-xl font-bold text-black flex items-center gap-1">
              <span>{currency}</span>
              <SlidingNumber value={parseInt(price.toString().replace(/[^0-9]/g, '')) || 0} />
            </div>
            <div className="text-xs text-gray-700 mt-1">Get ₹600 off with FLY</div>
          </div>
          <div className="flex items-center">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground hover:text-[#194E91] font-semibold rounded-lg px-5 py-2 text-sm min-w-[110px]" onClick={onBook}>Book now</Button>
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
                  {outboundOptions[0].departureCode} → {outboundOptions[0].arrivalCode} · {outboundOptions[0].date}
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
                      <FlightLegRow option={opt} />
                      {/* Info Row inside each outbound option */}
                      <div className="flex items-center justify-between mt-2 px-1 py-1 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-4 text-gray-700 text-xs">
                          {/* Visa */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2M5 7h14M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M9 11h6M9 15h6" /></svg>
                            <span>Visa req.</span>
                          </span>
                          {/* Prayer room */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 0a7 7 0 017 7v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a7 7 0 017-7z" /></svg>
                            <span>Prayer rm.</span>
                          </span>
                          {/* Wi-Fi */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.53 16.11a6 6 0 016.94 0M5.07 12.66a10 10 0 0113.86 0M1.64 9.21a14 14 0 0120.72 0M12 20h.01" /></svg>
                            <span>Wi-Fi</span>
                          </span>
                          {/* Baggage */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h6m-6 0a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2m-6 0V4a3 3 0 013-3h2a3 3 0 013 3v2" /></svg>
                            <span>Baggage</span>
                          </span>
                        </div>
                        <button
                          className="text-primary text-xs font-medium hover:underline flex items-center gap-1"
                          type="button"
                          onClick={e => { e.stopPropagation(); handleOpenDrawer(opt); }}
                        >
                          More info <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Return column */}
              <div>
                <div className="mb-2 text-xs font-semibold text-gray-700">
                  {returnOptions[0].departureCode} → {returnOptions[0].arrivalCode} · {returnOptions[0].date}
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
                      <FlightLegRow option={opt} />
                      {/* Info Row inside each return option */}
                      <div className="flex items-center justify-between mt-2 px-1 py-1 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-4 text-gray-700 text-xs">
                          {/* Visa */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7V5a2 2 0 012-2h10a2 2 0 012 2v2M5 7h14M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M9 11h6M9 15h6" /></svg>
                            <span>Visa req.</span>
                          </span>
                          {/* Prayer room */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 0a7 7 0 017 7v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a7 7 0 017-7z" /></svg>
                            <span>Prayer rm.</span>
                          </span>
                          {/* Wi-Fi */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.53 16.11a6 6 0 016.94 0M5.07 12.66a10 10 0 0113.86 0M1.64 9.21a14 14 0 0120.72 0M12 20h.01" /></svg>
                            <span>Wi-Fi</span>
                          </span>
                          {/* Baggage */}
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m-6 0h6m-6 0a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2m-6 0V4a3 3 0 013-3h2a3 3 0 013 3v2" /></svg>
                            <span>Baggage</span>
                          </span>
                        </div>
                        <button
                          className="text-primary text-xs font-medium hover:underline flex items-center gap-1"
                          type="button"
                          onClick={e => { e.stopPropagation(); handleOpenDrawer(opt); }}
                        >
                          More info <span aria-hidden="true">→</span>
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
            <button className="text-primary text-sm font-medium hover:underline hover:text-[#194E91]" onClick={onDetails}>Flight details</button>
          </div>
          {/* Drawer for More info - Updated with tabbed interface */}
          {drawerOpen && drawerFlight && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={() => setDrawerOpen(false)}>
              <div
                className="bg-white shadow-lg h-full w-[480px] flex flex-col animate-slide-in-right relative"
                style={{ animation: 'slideInRight 0.3s cubic-bezier(0.4,0,0.2,1)' }}
                onClick={e => e.stopPropagation()}
              >
                {/* Tabs Header */}
                <div className="flex border-b bg-gray-50">
                  <button
                    className={cn(
                      "flex-1 py-4 text-center font-medium",
                      activeTab === 'trip' 
                        ? "text-blue-600 border-b-2 border-blue-600 bg-white" 
                        : "text-gray-500 hover:text-gray-800"
                    )}
                    onClick={() => setActiveTab('trip')}
                  >
                    Trip Details
                  </button>
                  <button
                    className={cn(
                      "flex-1 py-4 text-center font-medium",
                      activeTab === 'facility' 
                        ? "text-blue-600 border-b-2 border-blue-600 bg-white" 
                        : "text-gray-500 hover:text-gray-800"
                    )}
                    onClick={() => setActiveTab('facility')}
                  >
                    Flight and Facility Details
                  </button>
                  <button 
                    className="p-4 text-gray-500 hover:text-black"
                    onClick={() => setDrawerOpen(false)}
                  >
                    ✕
                </button>
                </div>

                {/* Trip Details Tab Content */}
                {activeTab === 'trip' && (
                  <div className="p-6 flex-1 overflow-auto">
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-semibold">{drawerFlight.departureCity || drawerFlight.departureCode}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                        <span className="text-lg font-semibold">{drawerFlight.arrivalCity || drawerFlight.arrivalCode}</span>
                      </div>
                      <div className="text-sm text-gray-700 flex items-center gap-2">
                        <span>{drawerFlight.duration}</span>
                        <span>•</span>
                        <span>{drawerFlight.stops}</span>
                        <span>•</span>
                        <span>{drawerFlight.date}</span>
                        <span>•</span>
                        <span>Economy</span>
                      </div>
                    </div>

                    <div className="border rounded-lg p-5 mb-5">
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={getAirlineLogo(drawerFlight.airlineName)} 
                          alt={drawerFlight.airlineName} 
                          className="h-8 w-10 object-contain"
                        />
                        <div>
                          <div className="font-medium">{drawerFlight.airlineName}</div>
                          <div className="text-sm text-gray-500">AI {Math.floor(Math.random() * 900) + 100}</div>
                        </div>
                      </div>

                      <div className="flex items-center mb-3">
                        <div className="text-center mr-4">
                          <div className="text-sm text-gray-500">{drawerFlight.date}</div>
                          <div className="text-2xl font-bold">{drawerFlight.departureTime}</div>
                          <div className="text-sm font-medium">{drawerFlight.departureCode} - {drawerFlight.departureCity || 'City'}</div>
                          <div className="text-xs text-gray-500">King Airport Intl</div>
                        </div>

                        <div className="flex-1 px-4">
                          <div className="text-sm text-center font-medium text-gray-500 mb-1">{drawerFlight.duration}</div>
                          <div className="h-0.5 bg-gray-300 w-full relative flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-500 absolute"></div>
                          </div>
                        </div>

                        <div className="text-center ml-4">
                          <div className="text-sm text-gray-500">{drawerFlight.date}</div>
                          <div className="text-2xl font-bold">{drawerFlight.arrivalTime}</div>
                          <div className="text-sm font-medium">{drawerFlight.arrivalCode} - {drawerFlight.arrivalCity || 'City'}</div>
                          <div className="text-xs text-gray-500">King Airport Intl</div>
                        </div>
                      </div>

                      {drawerFlight.layover && (
                        <div className="my-4 border-t border-b border-dashed py-2">
                          <button className="text-blue-600 text-sm font-medium w-full text-center">
                            Change of flights • {drawerFlight.layover} layover in {drawerFlight.arrivalCode}
                          </button>
                        </div>
                      )}

                      {/* Add a second leg if there's a layover */}
                      {drawerFlight.layover && (
                        <div className="mt-5">
                          <div className="flex items-center gap-3 mb-4">
                            <img 
                              src={getAirlineLogo(drawerFlight.airlineName)} 
                              alt={drawerFlight.airlineName} 
                              className="h-8 w-10 object-contain"
                            />
                            <div>
                              <div className="font-medium">{drawerFlight.airlineName}</div>
                              <div className="text-sm text-gray-500">AI {Math.floor(Math.random() * 900) + 100}</div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <div className="text-center mr-4">
                              <div className="text-sm text-gray-500">{drawerFlight.date}</div>
                              <div className="text-2xl font-bold">16:05</div>
                              <div className="text-sm font-medium">{drawerFlight.arrivalCode} - Jeddah</div>
                              <div className="text-xs text-gray-500">King Abdulaziz Intl</div>
                            </div>

                            <div className="flex-1 px-4">
                              <div className="text-sm text-center font-medium text-gray-500 mb-1">3h</div>
                              <div className="h-0.5 bg-gray-300 w-full relative flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-gray-500 absolute"></div>
                              </div>
                            </div>

                            <div className="text-center ml-4">
                              <div className="text-sm text-gray-500">{drawerFlight.date}</div>
                              <div className="text-2xl font-bold">20:05</div>
                              <div className="text-sm font-medium">DXB - Dubai</div>
                              <div className="text-xs text-gray-500">Dubai Intl</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Special Offers */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3">Special Offers for you</h3>
                      <div className="bg-orange-50 rounded-lg p-4 mb-4 flex justify-between">
                        <div>
                          <div className="text-orange-600 font-bold text-lg">TRAVEL UPDATE</div>
                          <div className="text-sm mt-1">Due to evolving air travel conditions, please stay informed about the latest updates.</div>
                          <button className="mt-2 bg-orange-500 text-white px-3 py-1 rounded text-sm">
                            Know More
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price and CTA */}
                    <div className="py-4 border-t mt-auto flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold">₹{price}</div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                      <Button 
                        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-medium"
                        onClick={() => { setDrawerOpen(false); onBook(); }}
                      >
                        Add flight
                      </Button>
                    </div>
                  </div>
                )}

                {/* Flight and Facility Details Tab Content */}
                {activeTab === 'facility' && (
                  <div className="p-6 flex-1 overflow-auto">
                    {/* Aircraft Information */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Aircraft Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex justify-between py-2">
                            <span className="text-gray-700">Type</span>
                            <span className="font-medium">Boeing 777-300ER</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-gray-700">Seat Configuration</span>
                            <span className="font-medium">3-4-3</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="text-gray-700">Seat Type</span>
                            <span className="font-medium">Standard (Limited seat rile)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Airport Facilities */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Airport Facilities</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between items-center py-2">
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                              <span>Prayer room</span>
                            </div>
                            <span className="text-gray-600">Near gate 12</span>
                          </div>

                          <div className="flex justify-between items-center py-2">
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                              <span>Lounges</span>
                            </div>
                            <span className="text-gray-600">Emirates lounge, priority pass</span>
                          </div>

                          <div className="py-2">
                            <div className="flex items-center gap-2 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              <span>Food options</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pl-7">
                              <div className="flex items-center gap-1">
                                <span className="text-green-600">☕</span>
                                <span>Starbucks</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-green-600">🍔</span>
                                <span>Shake Shack</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-green-600">🥪</span>
                                <span>Subway</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-600">🍟</span>
                                <span>McDonald's</span>
                              </div>
                            </div>
                          </div>

                          <div className="py-2">
                            <div className="flex items-center gap-2 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Amenities</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pl-7">
                              <div className="flex items-center gap-1">
                                <span className="text-blue-500">📶</span>
                                <span>Wi-fi</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-gray-600">🔌</span>
                                <span>Power outlets</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-purple-500">🎬</span>
                                <span>Entertainment</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-pink-500">👶</span>
                                <span>Baby care</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special Offers */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3">Special Offers for you</h3>
                      <div className="bg-orange-50 rounded-lg p-4 mb-4 flex justify-between">
                        <div>
                          <div className="text-orange-600 font-bold text-lg">TRAVEL UPDATE</div>
                          <div className="text-sm mt-1">Due to evolving air travel conditions, please stay informed about the latest updates.</div>
                          <button className="mt-2 bg-orange-500 text-white px-3 py-1 rounded text-sm">
                            Know More
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price and CTA */}
                    <div className="py-4 border-t mt-auto flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold">₹{price}</div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                      <Button 
                        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-medium"
                        onClick={() => { setDrawerOpen(false); onBook(); }}
                      >
                        Add flight
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FlightListCard; 