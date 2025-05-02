import React from 'react';
import { format } from 'date-fns';
import { ChevronUp } from 'lucide-react';

interface FlightOption {
  departureTime: string;
  arrivalTime: string;
  departureCode: string;
  arrivalCode: string;
  duration: string;
  stops: number;
  layover?: {
    duration: string;
    city: string;
  };
  date: Date;
  airlineCode: string;
}

interface SimilarFlightOptionsProps {
  departureOptions: FlightOption[];
  returnOptions: FlightOption[];
  onHideOptions: () => void;
  selectedOutbound?: string;
  selectedReturn?: string;
}

export default function SimilarFlightOptions({
  departureOptions,
  returnOptions,
  onHideOptions,
  selectedOutbound,
  selectedReturn
}: SimilarFlightOptionsProps) {
  const formatRouteHeader = (option: FlightOption, type: 'departure' | 'return') => {
    const from = type === 'departure' ? option.departureCode : option.arrivalCode;
    const to = type === 'departure' ? option.arrivalCode : option.departureCode;
    const day = format(option.date, 'EEEE, MMM dd');
    return `${from} → ${to} · ${day}`;
  };

  const FlightOptionCard = ({ option, isSelected }: { option: FlightOption; isSelected: boolean }) => (
    <div 
      className={`p-4 rounded-lg transition-colors ${
        isSelected ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-gray-100'
      }`}
    >
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="text-lg font-semibold">
            {option.departureTime} - {option.arrivalTime}
          </div>
          <div className="text-gray-500 text-sm">
            {option.departureCode} - {option.arrivalCode}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium">
            {option.duration} ({option.stops} stop)
          </div>
          {option.layover && (
            <div className="flex items-center text-sm text-gray-500">
              <img 
                src={`https://airhex.com/images/airline-logos/${option.airlineCode.toLowerCase()}.png`}
                alt={`${option.airlineCode} logo`}
                className="h-4 w-4 mr-1 inline-block"
              />
              {option.layover.duration} in {option.layover.city}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Departure Options */}
      <div>
        <div className="flex items-center mb-4">
          <img 
            src={`https://airhex.com/images/airline-logos/${departureOptions[0].airlineCode.toLowerCase()}.png`}
            alt={`${departureOptions[0].airlineCode} logo`}
            className="h-5 w-5 mr-2"
          />
          <h3 className="text-base font-medium">
            {formatRouteHeader(departureOptions[0], 'departure')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {departureOptions.map((option, index) => (
            <FlightOptionCard
              key={index}
              option={option}
              isSelected={selectedOutbound === `${option.departureTime}-${option.arrivalTime}`}
            />
          ))}
        </div>
      </div>

      {/* Return Options */}
      <div>
        <div className="flex items-center mb-4">
          <img 
            src={`https://airhex.com/images/airline-logos/${returnOptions[0].airlineCode.toLowerCase()}.png`}
            alt={`${returnOptions[0].airlineCode} logo`}
            className="h-5 w-5 mr-2"
          />
          <h3 className="text-base font-medium">
            {formatRouteHeader(returnOptions[0], 'return')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {returnOptions.map((option, index) => (
            <FlightOptionCard
              key={index}
              option={option}
              isSelected={selectedReturn === `${option.departureTime}-${option.arrivalTime}`}
            />
          ))}
        </div>
      </div>

      {/* Hide Options Button */}
      <div className="flex justify-center border-t border-gray-100 pt-4 mt-2">
        <button
          onClick={onHideOptions}
          className="flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium"
        >
          Hide options with same price
          <ChevronUp className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 