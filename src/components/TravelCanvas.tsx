import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import SuggestionCard from './SuggestionCard';
import { cn } from '@/lib/utils';
import { GlowEffect } from './ui/glow-effect';
import DualModeSearch from './DualModeSearch';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../translations';

// Custom SearchButton component with state management
const SearchButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <Button 
      type="submit" 
      size="icon" 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        height: '40px',
        width: '40px',
        borderRadius: '9999px',
        backgroundColor: isHovering ? '#FFD700' : '#2A5298',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Search 
        style={{
          height: '20px',
          width: '20px',
          color: isHovering ? '#0894FF' : 'white',
          transition: 'color 0.3s ease',
        }} 
      />
    </Button>
  );
};

const flightSuggestions = [
  { id: 1, titleKey: 'culturalDubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', type: 'Trending', departure: 'JFK' },
  { id: 2, titleKey: 'magicalIstanbul', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', type: 'For You', departure: 'LGA' },
  { id: 3, titleKey: 'ancientCairo', image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', type: 'Popular', departure: 'JFK' },
  { id: 4, titleKey: 'magicalDoha', image: 'https://images.unsplash.com/photos/a-kdjff86zE?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', type: 'Trending', departure: 'EWR' },
];

// Search intent examples for rotating placeholder
const searchIntents = [
  "Return flight NYC to Dubai, 2 people, September",
  "One-way to Doha, business class, next month",
  "Cheapest flights to Istanbul in December",
  "Non-stop to Abu Dhabi, weekend of Aug 21"
];

export default function TravelCanvas({ onSearch }: { onSearch: (query: string) => void }) {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(searchIntents[0]);
  const [isTyping, setIsTyping] = useState(true);
  const [typingText, setTypingText] = useState('');

  // Rotating placeholder effect
  useEffect(() => {
    // Type current placeholder
    if (isTyping) {
      if (typingText.length < searchIntents[placeholderIndex].length) {
        const timeout = setTimeout(() => {
          setTypingText(searchIntents[placeholderIndex].substring(0, typingText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        // Wait a bit before starting to delete
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // Delete text
      if (typingText.length > 0) {
        const timeout = setTimeout(() => {
          setTypingText(typingText.substring(0, typingText.length - 1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        // Move to next placeholder after deleting
        const nextIndex = (placeholderIndex + 1) % searchIntents.length;
        setPlaceholderIndex(nextIndex);
        setIsTyping(true);
      }
    }
  }, [typingText, isTyping, placeholderIndex]);

  // Set current placeholder for display
  useEffect(() => {
    setCurrentPlaceholder(typingText || "Where to next?");
  }, [typingText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  // The AI search component that will be passed to the DualModeSearch
  const AISearchComponent = (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full transition-all duration-300 search-form",
        isSearchFocused ? "scale-105" : ""
      )}
    >
      <div className="relative">
        {isSearchFocused && (
          <GlowEffect
            colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']} 
            mode="static"
            blur="medium"
            scale={1.05}
            className="rounded-full opacity-60"
          />
        )}
        <Input
          type="text"
          placeholder={currentPlaceholder}
          className={cn(
            "h-12 w-full rounded-full bg-gray-100 px-6 pr-12 text-lg relative z-10",
            "placeholder:text-gray-500 focus:outline-none",
            isSearchFocused ? "bg-gray-50 border-transparent shadow-lg focus:ring-1 focus:ring-primary/50" : "border border-gray-200",
          )}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 space-x-1 z-20">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900"
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          {/* COMPLETELY REPLACEMENT BUTTON */}
          <button 
            type="submit"
            onClick={() => {
              console.log("SEARCH BUTTON CLICKED!");
              document.body.style.backgroundColor = 'yellow';
            }}
            onMouseEnter={() => {
              console.log("HOVERING ON SEARCH BUTTON!");
              const btn = document.getElementById('search-btn');
              if (btn) {
                btn.style.backgroundColor = '#FFD700'; // Yellow
                const icon = btn.querySelector('svg');
                if (icon) icon.style.color = '#0894FF'; // Blue
              }
            }}
            onMouseLeave={() => {
              console.log("LEFT SEARCH BUTTON!");
              const btn = document.getElementById('search-btn');
              if (btn) {
                btn.style.backgroundColor = '#2A5298'; // Blue
                const icon = btn.querySelector('svg');
                if (icon) icon.style.color = 'white';
              }
            }}
            id="search-btn"
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '50%',
              backgroundColor: '#2A5298',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Search style={{ color: 'white', height: '20px', width: '20px' }} />
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Main content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-gray-900 pb-6">
        {/* Personalized greeting */}
        <h1 className="mb-2 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-center content-text">
          {t('userGreeting').replace('{name}', 'Rakesh')}
        </h1>
        <p className="mb-6 sm:mb-8 text-center text-base sm:text-lg md:text-xl font-light opacity-90 content-text">
          {t('whereIsYourNextFlight')} {t('takingYou')}
        </p>

        {/* Dual-mode Search Component */}
        <DualModeSearch onSearch={onSearch} className="w-full max-w-5xl mx-auto px-0 sm:px-4">
          {AISearchComponent}
        </DualModeSearch>

        {/* Flight Suggestions */}
        <div className="mt-8 sm:mt-12 w-full max-w-5xl overflow-hidden px-0 sm:px-4">
          <h2 className="mb-4 text-lg sm:text-xl font-medium text-gray-900 px-4 sm:px-0 content-text">{t('discoverMiddleEastern')}</h2>
          <div className="relative w-full">
            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 z-10 h-full w-8 sm:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
            
            {/* Scrollable container */}
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-4 sm:px-0 scrollbar-hide">
              {flightSuggestions.map(suggestion => (
                <SuggestionCard 
                  key={suggestion.id}
                  title={t(suggestion.titleKey)}
                  image={suggestion.image}
                  type={suggestion.type}
                  departure={`${t('from')} ${suggestion.departure}`}
                  onClick={() => onSearch(t(suggestion.titleKey))}
                />
              ))}
            </div>
            
            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 z-10 h-full w-8 sm:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
