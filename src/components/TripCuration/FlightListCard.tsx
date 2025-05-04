import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Shield, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Figma-style wireframe ---
/*
-----------------------------------------------
| [AirlineLogo] 10:00–07:10  BLR–DUB  [AirlineName]
| [Stops/Layover]  [Date]
| [AirlineLogo] 09:05–02:15  DUB–BLR  [AirlineName]
| [Stops/Layover]  [Date]
| [Non-refundable] [Coupon/Offer]
| ₹91,200   [Book Button]   [Flight details →]
-----------------------------------------------
| Bangalore → Dublin · Wed, May 07
| [Option 1] [Option 2] [Option 3] ...
-----------------------------------------------
| Dublin → Bangalore · Fri, May 09
| [Option 1] [Option 2] [Option 3] ...
-----------------------------------------------
*/

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
  departureCity: string;
  arrivalCity: string;
}

interface FlightResultCardProps {
  outboundOptions: FlightLegOption[];
  returnOptions: FlightLegOption[];
  selectedOutboundIdx: number;
  selectedReturnIdx: number;
  price: string;
  currency: string;
  coupon?: string;
  nonRefundable?: boolean;
  onSelectOutbound: (idx: number) => void;
  onSelectReturn: (idx: number) => void;
  onBook: () => void;
  onDetails: () => void;
}

const FlightLegRow = ({ option }: { option: FlightLegOption }) => (
  <div className="flex items-center gap-3 py-1">
    <img src={option.airlineLogo} alt={option.airlineName} className="h-5 w-8 object-contain bg-white border rounded" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold">{option.departureTime}–{option.arrivalTime}</span>
        <span className="text-gray-500 text-xs">{option.departureCode}–{option.arrivalCode}</span>
        <span className="text-xs text-gray-500 ml-2">{option.date}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>{option.airlineName}</span>
        <span>· {option.stops}</span>
        {option.layover && <span>· {option.layover}</span>}
      </div>
    </div>
  </div>
);

const FlightResultCard: React.FC<FlightResultCardProps> = ({
  outboundOptions,
  returnOptions,
  selectedOutboundIdx,
  selectedReturnIdx,
  price,
  currency,
  coupon,
  nonRefundable,
  onSelectOutbound,
  onSelectReturn,
  onBook,
  onDetails,
}) => {
  // --- Top summary card ---
  const selectedOutbound = outboundOptions[selectedOutboundIdx];
  const selectedReturn = returnOptions[selectedReturnIdx];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
      {/* Top summary card */}
      <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100">
        {/* Left: Flight details, match reference design */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Outbound */}
          <div className="flex items-start w-full">
            {/* Logo and times/route */}
            <div className="flex items-start gap-3 min-w-[120px]">
              <img src={selectedOutbound.airlineLogo} alt={selectedOutbound.airlineName} className="h-8 w-8 object-contain bg-white border rounded" />
              <div>
                <div className="text-lg font-bold leading-tight">{selectedOutbound.departureTime} – {selectedOutbound.arrivalTime}</div>
                <div className="text-sm text-gray-500 leading-tight">{selectedOutbound.departureCode} {selectedOutbound.departureCity}–{selectedOutbound.arrivalCode} {selectedOutbound.arrivalCity}</div>
              </div>
            </div>
            {/* Center: Stops */}
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="font-semibold text-black text-sm">{selectedOutbound.stops}</span>
              {selectedOutbound.stops !== 'non-stop' && selectedOutbound.layover && (
                <span className="text-xs text-gray-500 mt-0.5">{selectedOutbound.layover.replace(/.*in\s+/i, '')}</span>
              )}
            </div>
            {/* Right: Duration */}
            <div className="font-bold text-sm text-black min-w-[60px] text-right flex items-center justify-end">{selectedOutbound.duration}</div>
          </div>
          {/* Return */}
          <div className="flex items-start w-full">
            {/* Logo and times/route */}
            <div className="flex items-start gap-3 min-w-[120px]">
              <img src={selectedReturn.airlineLogo} alt={selectedReturn.airlineName} className="h-8 w-8 object-contain bg-white border rounded" />
              <div>
                <div className="text-lg font-bold leading-tight">
                  {selectedReturn.departureTime} – {selectedReturn.arrivalTime}
                  <sup className="text-xs text-gray-400 font-semibold align-super">+1</sup>
                </div>
                <div className="text-sm text-gray-500 leading-tight">{selectedReturn.departureCode} {selectedReturn.departureCity}–{selectedReturn.arrivalCode} {selectedReturn.arrivalCity}</div>
              </div>
            </div>
            {/* Center: Stops */}
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="font-semibold text-black text-sm">{selectedReturn.stops}</span>
              {selectedReturn.stops !== 'non-stop' && selectedReturn.layover && (
                <span className="text-xs text-gray-500 mt-0.5">{selectedReturn.layover.replace(/.*in\s+/i, '')}</span>
              )}
            </div>
            {/* Right: Duration */}
            <div className="font-bold text-sm text-black min-w-[60px] text-right flex items-center justify-end">{selectedReturn.duration}</div>
          </div>
        </div>
        {/* Right: Price, class, select button */}
        <div className="flex flex-col items-end min-w-[160px] gap-2">
          <div className="text-2xl font-bold text-black">{currency} {price}</div>
          <div className="text-sm text-gray-500">Economy</div>
          <Button className="bg-black hover:bg-black/90 text-white font-semibold rounded-lg px-8 py-2 mt-2" onClick={onBook}>Select</Button>
        </div>
      </div>
      {/* Bottom section: Flight pickers */}
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
                  className={cn(
                    "rounded-lg border px-3 py-2 min-w-[180px] text-left transition-all",
                    idx === selectedOutboundIdx ? "border-black ring-2 ring-black bg-white" : "border-gray-200 bg-gray-50 hover:bg-white"
                  )}
                  onClick={() => onSelectOutbound(idx)}
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
                  className={cn(
                    "rounded-lg border px-3 py-2 min-w-[180px] text-left transition-all",
                    idx === selectedReturnIdx ? "border-black ring-2 ring-black bg-white" : "border-gray-200 bg-gray-50 hover:bg-white"
                  )}
                  onClick={() => onSelectReturn(idx)}
                >
                  <FlightLegRow option={opt} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResultCard; 