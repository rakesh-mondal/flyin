import React from 'react';
import { Sun, Moon, CloudSun, CloudMoon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/translations';

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

// Move timeOptions inside component to access translations

// Add color mapping for icons
const iconColorMap: Record<string, string> = {
  'before-6am': 'text-blue-500',
  '6am-12pm': 'text-yellow-500',
  '12pm-6pm': 'text-orange-500',
  'after-6pm': 'text-purple-500',
};

export default function FlightTimings({
  departureRoute = 'DEL-BOM',
  returnRoute = 'BOM-DEL',
  onDepartureTimeChange,
  onReturnTimeChange
}: FlightTimingsProps) {
  const { t } = useTranslation();
  const [selectedDeparture, setSelectedDeparture] = React.useState<string | null>(null);
  const [selectedReturn, setSelectedReturn] = React.useState<string | null>(null);

  const timeOptions: TimeOption[] = [
    { icon: CloudSun, label: t('before6am'), value: 'before-6am' },
    { icon: Sun, label: t('am12pm'), value: '6am-12pm' },
    { icon: CloudSun, label: t('pm6pm'), value: '12pm-6pm' },
    { icon: Moon, label: t('after6pm'), value: 'after-6pm' },
  ];

  const handleDepartureSelect = (value: string) => {
    setSelectedDeparture(selectedDeparture === value ? null : value);
    onDepartureTimeChange?.(selectedDeparture === value ? '' : value);
  };

  const handleReturnSelect = (value: string) => {
    setSelectedReturn(selectedReturn === value ? null : value);
    onReturnTimeChange?.(selectedReturn === value ? '' : value);
  };

  const TimeButton = ({ option, isSelected, onClick }: { 
    option: TimeOption; 
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-full rounded-lg border py-1 px-2 transition-all min-h-[48px]",
        isSelected 
          ? "border-blue-600 bg-blue-50 text-blue-600 shadow-sm" 
          : "border-gray-200 bg-white hover:bg-gray-50"
      )}
    >
      <option.icon className="h-4 w-4 mb-0.5 text-gray-500" />
      <span className="text-xs font-medium text-center leading-tight">{option.label}</span>
    </button>
  );

  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1 text-xs font-semibold text-gray-700 tracking-wide">{t('departingFlight')} <span className="font-normal text-gray-400">({departureRoute})</span></p>
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
        <p className="mb-1 text-xs font-semibold text-gray-700 tracking-wide">{t('returningFlight')} <span className="font-normal text-gray-400">({returnRoute})</span></p>
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
  );
} 