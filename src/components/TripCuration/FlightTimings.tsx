import React from 'react';
import { Sun, Moon, CloudSun, CloudMoon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeOption {
  icon: React.ElementType;
  label: string;
  value: string;
}

interface FlightTimingsProps {
  departureRoute?: string;
  returnRoute?: string;
  onDepartureTimeChange?: (time: string) => void;
  onReturnTimeChange?: (time: string) => void;
}

const timeOptions: TimeOption[] = [
  { icon: CloudSun, label: 'Before 6 AM', value: 'before-6am' },
  { icon: Sun, label: '6 AM - 12 PM', value: '6am-12pm' },
  { icon: CloudSun, label: '12 PM - 6 PM', value: '12pm-6pm' },
  { icon: Moon, label: 'After 6 PM', value: 'after-6pm' },
];

export default function FlightTimings({
  departureRoute = 'DEL-BOM',
  returnRoute = 'BOM-DEL',
  onDepartureTimeChange,
  onReturnTimeChange
}: FlightTimingsProps) {
  const [selectedDeparture, setSelectedDeparture] = React.useState<string | null>(null);
  const [selectedReturn, setSelectedReturn] = React.useState<string | null>(null);

  const handleDepartureSelect = (value: string) => {
    setSelectedDeparture(selectedDeparture === value ? null : value);
    onDepartureTimeChange?.(value);
  };

  const handleReturnSelect = (value: string) => {
    setSelectedReturn(selectedReturn === value ? null : value);
    onReturnTimeChange?.(value);
  };

  const TimeButton = ({ option, isSelected, onClick }: { 
    option: TimeOption; 
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-full rounded-lg border py-1.5 px-3 transition-all min-h-[60px]",
        isSelected 
          ? "border-blue-600 bg-blue-50 text-blue-600" 
          : "border-gray-200 bg-white hover:bg-gray-50"
      )}
    >
      <option.icon className="h-4 w-4 mb-0.5" />
      <span className="text-sm font-medium text-center">{option.label}</span>
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Flight Timings</h3>
          <button 
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
            onClick={() => {
              setSelectedDeparture(null);
              setSelectedReturn(null);
            }}
          >
            Reset
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">Departing flight ({departureRoute})</p>
            <div className="grid grid-cols-2 gap-2">
              {timeOptions.map((option) => (
                <TimeButton
                  key={option.value}
                  option={option}
                  isSelected={selectedDeparture === option.value}
                  onClick={() => handleDepartureSelect(option.value)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Returning flight ({returnRoute})</p>
            <div className="grid grid-cols-2 gap-2">
              {timeOptions.map((option) => (
                <TimeButton
                  key={option.value}
                  option={option}
                  isSelected={selectedReturn === option.value}
                  onClick={() => handleReturnSelect(option.value)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 