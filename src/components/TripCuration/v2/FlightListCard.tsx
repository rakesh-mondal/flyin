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
  
  const handleSelectOutbound = (idx: number) => {
    setSelectedOutboundIdx(idx);
  };
  
  const handleSelectReturn = (idx: number) => {
    setSelectedReturnIdx(idx);
  };

  if (!selectedOutbound || !selectedReturn) {
    return null;
  }

  console.log('FlightListCard rendered');

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
            <Button className="bg-black hover:bg-black/90 text-white font-semibold rounded-lg px-5 py-2 text-sm min-w-[110px]" onClick={onBook}>Book now</Button>
          </div>
        </div>
      </div>
      {/* Only show options and details if showOptions is true */}
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
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Flight details link in gray bar at bottom */}
          <div className="bg-gray-50 px-4 pt-10 pb-2 w-full text-right">
            <button className="text-blue-600 text-sm font-medium hover:underline" onClick={onDetails}>Flight details</button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlightListCard; 