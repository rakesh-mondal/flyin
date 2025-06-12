import React, { useState, useRef, useEffect } from 'react';
import { City, searchCities } from '../../data/cities';

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (city: City) => void;
  placeholder?: string;
  className?: string;
}

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
    onChange(`${city.name} (${city.code})`);
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
          className="absolute top-full left-0 right-0 z-[9999] bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1"
          style={{ position: 'absolute' }}
        >
          {results.map((city, index) => (
            <div
              key={city.id}
              className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-50 ${
                index === selectedIndex ? 'bg-blue-50 text-blue-600' : ''
              }`}
              onMouseDown={(e) => e.preventDefault()} // Prevent input blur
              onClick={() => handleItemSelect(city)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-900 text-sm">
                  {city.name} ({city.code})
                </span>
                <span className="text-xs text-gray-500">
                  {city.country}
                </span>
              </div>
              <div className="text-xs text-gray-400 ml-2">
                {city.code}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 