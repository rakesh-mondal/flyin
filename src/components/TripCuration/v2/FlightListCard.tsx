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

  return (
    <div
      className={cn(
        "bg-white rounded-t-xl overflow-visible transition-all duration-700",
        glow ? "ring-4 ring-blue-400/80 shadow-blue-300 shadow-2xl scale-105 z-10" : ""
      )}
    >
      {/* Compact summary card */}
      <div className="flex flex-row items-center px-4 py-4 gap-0">
        {/* Outbound */}
        <div className="flex flex-col items-center flex-1 min-w-0">
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
        <div className="flex flex-col items-center flex-1 min-w-0">
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
                          onClick={e => { e.stopPropagation(); setDrawerFlight(opt); setDrawerOpen(true); }}
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
                          onClick={e => { e.stopPropagation(); setDrawerFlight(opt); setDrawerOpen(true); }}
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
          {/* Drawer for More info */}
          {drawerOpen && drawerFlight && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={() => setDrawerOpen(false)}>
              <div
                className="bg-white shadow-lg h-full w-[320px] p-6 flex flex-col animate-slide-in-right relative"
                style={{ animation: 'slideInRight 0.3s cubic-bezier(0.4,0,0.2,1)' }}
                onClick={e => e.stopPropagation()}
              >
                <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={() => setDrawerOpen(false)}>
                  ×
                </button>
                <h2 className="text-lg font-bold mb-4">Flight Details</h2>
                <div className="mb-3">
                  <div className="font-semibold">{drawerFlight.airlineName}</div>
                  <div className="text-xs text-gray-500">{drawerFlight.departureCode} → {drawerFlight.arrivalCode}</div>
                  <div className="text-xs text-gray-500">{drawerFlight.departureTime} - {drawerFlight.arrivalTime}</div>
                  <div className="text-xs text-gray-500">{drawerFlight.duration} · {drawerFlight.stops}</div>
                  {drawerFlight.layover && <div className="text-xs text-gray-500">Layover: {drawerFlight.layover}</div>}
                </div>
                {/* Add more mock details as needed */}
                <div className="font-semibold mt-4 mb-2">Baggage</div>
                <div className="text-xs text-gray-500 mb-2">Check-in: 23kg · Cabin: 7kg</div>
                <div className="font-semibold mt-4 mb-2">Amenities</div>
                <div className="text-xs text-gray-500 mb-2">Wi-Fi, Power, Entertainment, Meals</div>
                <div className="font-semibold mt-4 mb-2">Airport Info</div>
                <div className="text-xs text-gray-500 mb-2">Prayer room, Lounges, Food options</div>
                <button className="mt-auto bg-primary text-white rounded px-4 py-2 font-semibold" onClick={() => setDrawerOpen(false)}>Close</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FlightListCard; 