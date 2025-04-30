
import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import SuggestionCard from './SuggestionCard';
import { cn } from '@/lib/utils';

const flightSuggestions = [
  { id: 1, title: 'Weekend in Paris', image: 'https://images.unsplash.com/photo-1499856871958-5b9088d4687e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', type: 'Trending', departure: 'JFK' },
  { id: 2, title: 'Beach Getaway to Miami', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', type: 'For You', departure: 'LGA' },
  { id: 3, title: 'Tokyo Adventure', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', type: 'Popular', departure: 'JFK' },
  { id: 4, title: 'Rome City Break', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', type: 'Trending', departure: 'EWR' },
];

// Search intent examples for rotating placeholder
const searchIntents = [
  "Return flight NYC to Rome, 2 people, September",
  "One-way to Tokyo, business class, next month",
  "Cheapest flights to Bali in December",
  "Non-stop to London, weekend of Aug 21"
];

export default function TravelCanvas({ onSearch }: { onSearch: (query: string) => void }) {
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

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {/* Main content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-gray-900">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/b3b14138-007e-4f04-b265-b44f5f351a9b.png" 
            alt="Flyin.com" 
            className="h-16 w-auto" 
          />
        </div>
        
        {/* Personalized greeting */}
        <h1 className="mb-4 text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
          Hello Rakesh,
        </h1>
        <p className="mb-8 text-center text-lg font-light opacity-90 md:text-xl">
          Where's your next flight taking you?
        </p>

        {/* Search bar */}
        <form 
          onSubmit={handleSubmit} 
          className={cn(
            "w-full max-w-2xl transition-all duration-300",
            isSearchFocused ? "scale-105" : ""
          )}
        >
          <div className="relative">
            <Input
              type="text"
              placeholder={currentPlaceholder}
              className={cn(
                "h-14 w-full rounded-full bg-gray-100 px-6 pr-12 text-lg",
                "placeholder:text-gray-500 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50",
              )}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 space-x-1">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button 
                type="submit" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-black text-white hover:bg-black/90"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </form>

        {/* Flight Suggestions */}
        <div className="mt-12 w-full max-w-5xl overflow-hidden">
          <h2 className="mb-4 text-xl font-medium text-gray-900">Discover Flight Deals</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {flightSuggestions.map(suggestion => (
              <SuggestionCard 
                key={suggestion.id}
                title={suggestion.title}
                image={suggestion.image}
                type={suggestion.type}
                departure={`From ${suggestion.departure}`}
                onClick={() => onSearch(suggestion.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
