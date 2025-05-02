import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface FlightInfo {
  airlineLogo: string;
  airlineName: string;
  departureTime: string;
  arrivalTime: string;
  departureCode: string;
  arrivalCode: string;
  duration: string;
  stops: string;
  date?: string; // e.g. '2024-07-01' or 'Mon, Jul 1'
}

interface MoreOption {
  outbound: FlightInfo;
  return: FlightInfo;
}

interface FlightListCardProps {
  outboundFlight: FlightInfo;
  returnFlight: FlightInfo;
  price: string;
  currency: string;
  stock?: string;
  coupon?: string;
  promoBanner?: string;
  baggageTag?: string;
  moreOptions?: MoreOption[];
  onBook?: () => void;
  onDetails?: () => void;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  // Try to format as 'Mon, Jul 1' if not already
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const FlightRow = ({ flight }: { flight: FlightInfo }) => (
  <div className="flex items-center gap-4 py-2">
    <img src={flight.airlineLogo} alt={flight.airlineName} className="h-5 w-8 object-contain bg-white border" />
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{flight.departureTime} – {flight.arrivalTime}</span>
        <span className="text-gray-500 text-sm">{flight.departureCode} – {flight.arrivalCode}</span>
      </div>
      <div className="text-xs text-gray-500">{flight.airlineName}</div>
    </div>
    <div className="text-right">
      <div className="text-sm font-medium">{flight.duration}</div>
      <div className="text-xs text-gray-500">{flight.stops}</div>
    </div>
  </div>
);

const FlightListCard: React.FC<FlightListCardProps> = ({
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
}) => {
  // Default selected: main summary flights
  const [showMore, setShowMore] = useState(false);
  const [selectedOutboundIdx, setSelectedOutboundIdx] = useState(0);
  const [selectedReturnIdx, setSelectedReturnIdx] = useState(0);

  // Compose all outbound/return options (main + moreOptions)
  const allOutbound = [outboundFlight, ...moreOptions.map(opt => opt.outbound)];
  const allReturn = [returnFlight, ...moreOptions.map(opt => opt.return)];

  // Selected flights for summary
  const selectedOutbound = allOutbound[selectedOutboundIdx];
  const selectedReturn = allReturn[selectedReturnIdx];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
      {/* Promo Banner */}
      {promoBanner && (
        <div className="bg-yellow-50 text-yellow-800 text-xs px-4 py-2 border-b border-yellow-100 font-medium">
          {promoBanner}
        </div>
      )}
      <div className="flex flex-col md:flex-row p-4 gap-4">
        <div className="flex-1">
          {/* Outbound Flight (selected) */}
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-sm">Outbound</span>
            {selectedOutbound.date && (
              <span className="text-xs text-gray-500">{formatDate(selectedOutbound.date)}</span>
            )}
          </div>
          <FlightRow flight={selectedOutbound} />
          <div className="border-b border-gray-100 my-2" />
          {/* Return Flight (selected) */}
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-sm">Return</span>
            {selectedReturn.date && (
              <span className="text-xs text-gray-500">{formatDate(selectedReturn.date)}</span>
            )}
          </div>
          <FlightRow flight={selectedReturn} />
          {/* Baggage Tag */}
          {baggageTag && (
            <div className="mt-2">
              <Badge variant="outline" className="text-xs text-gray-700 bg-gray-50 border-gray-200">{baggageTag}</Badge>
            </div>
          )}
        </div>
        {/* Price/Book Area */}
        <div className="flex flex-col items-end justify-center min-w-[160px] gap-2">
          {stock && <div className="text-xs text-red-600 font-semibold">{stock}</div>}
          <div className="text-2xl font-bold">{currency} {price}</div>
          {coupon && <div className="text-xs text-green-600 font-medium">{coupon}</div>}
          <Button className="mt-2 w-full bg-black hover:bg-black/90 text-white font-semibold rounded-lg" onClick={onBook}>Book</Button>
        </div>
      </div>
      {/* Flight Details Link */}
      <div className="flex justify-end px-4 pb-2">
        <button className="text-blue-600 text-sm font-medium hover:underline" onClick={onDetails}>Flight details &rarr;</button>
      </div>
      {/* Expandable More Options */}
      {moreOptions.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 px-4 py-2">
          {!showMore ? (
            <button
              className="text-blue-600 text-sm font-medium w-full text-center py-2"
              onClick={() => setShowMore(true)}
            >
              +{moreOptions.length} more options at same price
            </button>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                {/* Outbound options */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-gray-700">Outbound options</span>
                    {allOutbound[1]?.date && (
                      <span className="text-xs text-gray-500">{formatDate(allOutbound[1].date)}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    {allOutbound.map((flight, idx) => (
                      <div
                        key={idx + '-out'}
                        className={cn(
                          "bg-white border border-gray-200 rounded-lg p-3 mb-1 shadow-sm transition-all",
                          selectedOutboundIdx === idx ? "ring-2 ring-black" : ""
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">{flight.date ? formatDate(flight.date) : ''}</span>
                          <Button
                            size="sm"
                            variant={selectedOutboundIdx === idx ? 'default' : 'outline'}
                            className={cn("rounded-full px-3 py-1 text-xs", selectedOutboundIdx === idx ? 'bg-black text-white' : '')}
                            onClick={() => setSelectedOutboundIdx(idx)}
                          >
                            {selectedOutboundIdx === idx ? 'Selected' : 'Select'}
                          </Button>
                        </div>
                        <FlightRow flight={flight} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Return options */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-gray-700">Return options</span>
                    {allReturn[1]?.date && (
                      <span className="text-xs text-gray-500">{formatDate(allReturn[1].date)}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    {allReturn.map((flight, idx) => (
                      <div
                        key={idx + '-ret'}
                        className={cn(
                          "bg-white border border-gray-200 rounded-lg p-3 mb-1 shadow-sm transition-all",
                          selectedReturnIdx === idx ? "ring-2 ring-black" : ""
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">{flight.date ? formatDate(flight.date) : ''}</span>
                          <Button
                            size="sm"
                            variant={selectedReturnIdx === idx ? 'default' : 'outline'}
                            className={cn("rounded-full px-3 py-1 text-xs", selectedReturnIdx === idx ? 'bg-black text-white' : '')}
                            onClick={() => setSelectedReturnIdx(idx)}
                          >
                            {selectedReturnIdx === idx ? 'Selected' : 'Select'}
                          </Button>
                        </div>
                        <FlightRow flight={flight} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                className="text-blue-600 text-sm font-medium w-full text-center py-2"
                onClick={() => setShowMore(false)}
              >
                Hide options with same price
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightListCard; 