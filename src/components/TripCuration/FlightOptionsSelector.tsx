import React from 'react';
import { format } from 'date-fns';

interface FlightOption {
  id: string | number;
  departureTime: string;
  arrivalTime: string;
  departureCode: string;
  arrivalCode: string;
  duration: string;
  stops: number;
  date: Date;
  airline?: string;
  airlineCode?: string;
  layoverInfo?: string;
}

interface FlightOptionsSelectorProps {
  departureOptions: FlightOption[];
  returnOptions: FlightOption[];
  selectedDepartureId: string | number;
  selectedReturnId: string | number;
  onSelectDeparture: (id: string | number) => void;
  onSelectReturn: (id: string | number) => void;
}

const formatHeader = (from: string, to: string, date: Date) => {
  return `${from} → ${to} · ${format(date, 'EEEE, MMM dd')}`;
};

const FlightOptionCard = ({ option, isSelected, onClick }: {
  option: FlightOption;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    className={`p-4 rounded-lg cursor-pointer border transition-colors ${
      isSelected ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="text-lg font-semibold">{option.departureTime} - {option.arrivalTime}</div>
        <div className="text-gray-500 text-sm">{option.departureCode} - {option.arrivalCode}</div>
        {option.layoverInfo && (
          <div className="text-xs text-orange-500 mt-1">{option.layoverInfo}</div>
        )}
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">{option.duration} ({option.stops === 1 ? '1 stop' : `${option.stops} stops`})</div>
      </div>
    </div>
  </div>
);

const FlightOptionsSelector: React.FC<FlightOptionsSelectorProps> = ({
  departureOptions,
  returnOptions,
  selectedDepartureId,
  selectedReturnId,
  onSelectDeparture,
  onSelectReturn,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left column: Departures */}
      <div>
        <div className="font-semibold text-sm mb-2">
          {formatHeader(
            departureOptions[0].departureCode,
            departureOptions[0].arrivalCode,
            departureOptions[0].date
          )}
        </div>
        <div className="flex flex-col gap-2">
          {departureOptions.map((option) => (
            <FlightOptionCard
              key={option.id}
              option={option}
              isSelected={selectedDepartureId === option.id}
              onClick={() => onSelectDeparture(option.id)}
            />
          ))}
        </div>
      </div>
      {/* Right column: Returns */}
      <div>
        <div className="font-semibold text-sm mb-2">
          {formatHeader(
            returnOptions[0].departureCode,
            returnOptions[0].arrivalCode,
            returnOptions[0].date
          )}
        </div>
        <div className="flex flex-col gap-2">
          {returnOptions.map((option) => (
            <FlightOptionCard
              key={option.id}
              option={option}
              isSelected={selectedReturnId === option.id}
              onClick={() => onSelectReturn(option.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightOptionsSelector; 