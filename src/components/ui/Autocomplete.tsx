import React, { useState, useRef, useEffect } from 'react';
import { City, searchCities } from '../../data/cities';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (city: City) => void;
  placeholder?: string;
  className?: string;
}

const getIconForCityType = (city: City) => {
  // Use MapPinIcon for both cities and airports as requested
  return <MapPinIcon className="h-4 w-4 text-gray-500" />;
};

const formatLocationDisplay = (city: City) => {
  if (city.type === 'city') {
    return `${city.name} (${city.code})`;
  }
  
  if (city.airportName) {
    return `${city.name} ${city.airportName} (${city.code})`;
  }
  
  return `${city.name} (${city.code})`;
};

const formatLocationSubtext = (city: City) => {
  if (city.type === 'nearby' && city.distance) {
    return `${city.distance} km from ${city.name}, ${city.country}`;
  }
  return city.country;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<City[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length > 0) {
      const searchResults = searchCities(value);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleItemSelect = (city: City) => {
    const displayValue = city.type === 'city' 
      ? `${city.name} (${city.code})`
      : `${city.name} (${city.code})`;
    onChange(displayValue);
    onSelect?.(city);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleItemSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    // Delay closing to allow click on dropdown items or clear button
    setTimeout(() => {
      if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }, 200);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className={`w-full px-0 py-0 border-none bg-transparent focus:outline-none ${className}`}
        autoComplete="off"
      />
      
      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 z-[9999] bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1"
          style={{ 
            position: 'absolute',
            minWidth: '400px',
            width: 'max-content',
            maxWidth: '500px'
          }}
        >
          {results.map((city, index) => (
            <div
              key={city.id}
              className={`px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-gray-50 ${
                index === selectedIndex ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onMouseDown={(e) => e.preventDefault()} // Prevent input blur
              onClick={() => handleItemSelect(city)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                {getIconForCityType(city)}
              </div>
              
              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="font-medium text-gray-900 text-sm">
                      {formatLocationDisplay(city)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatLocationSubtext(city)}
                    </div>
                  </div>
                  
                  {/* Airport code on the right */}
                  <div className="text-xs text-gray-400 flex-shrink-0">
                    {city.code}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 