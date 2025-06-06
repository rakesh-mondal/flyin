import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SavedTraveller {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  passportNumber?: string;
  passportExpired?: boolean;
}

interface TravellerInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onTravellerSelect?: (traveller: SavedTraveller) => void;
  showSavedTravellers?: boolean;
  className?: string;
}

const savedTravellers: SavedTraveller[] = [
  { 
    id: '1', 
    firstName: 'Rakesh', 
    lastName: 'Mondal', 
    fullName: 'Rakesh Mondal',
    passportNumber: 'M1234567',
    passportExpired: false
  },
  { 
    id: '2', 
    firstName: 'Saanvi', 
    lastName: 'Mondal', 
    fullName: 'Saanvi Mondal',
    passportNumber: 'M7654321',
    passportExpired: true  // Edge case: Saanvi's passport is expired
  },
  { 
    id: '3', 
    firstName: 'Sharmistha', 
    lastName: 'Mondal', 
    fullName: 'Sharmistha Mondal',
    passportNumber: 'M1122334',
    passportExpired: false
  }
];

export default function TravellerInput({
  label,
  placeholder,
  value,
  onChange,
  onTravellerSelect,
  showSavedTravellers = false,
  className = ""
}: TravellerInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    if (showSavedTravellers && !hasTyped && value === "") {
      setShowDropdown(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setHasTyped(newValue.length > 0);
    
    if (newValue.length > 0) {
      setShowDropdown(false);
    } else if (showSavedTravellers && isFocused) {
      setShowDropdown(true);
    }
  };

  const handleTravellerClick = (traveller: SavedTraveller) => {
    onChange(traveller.firstName);
    setShowDropdown(false);
    setHasTyped(false);
    onTravellerSelect?.(traveller);
  };

  return (
    <div className={`relative ${className}`}>
      <Label className="text-xs font-medium text-gray-700 mb-1">{label}</Label>
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="h-8 text-sm"
        />
        
        {showDropdown && showSavedTravellers && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 mb-2">Saved travellers</div>
              {savedTravellers.map((traveller) => (
                <button
                  key={traveller.id}
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded transition-colors"
                  onClick={() => handleTravellerClick(traveller)}
                >
                  {traveller.fullName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 