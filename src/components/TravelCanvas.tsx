
import React, { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import SuggestionCard from './SuggestionCard';
import { cn } from '@/lib/utils';

const backgroundImages = [
  'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80'
];

const suggestions = [
  { id: 1, title: 'Weekend in Paris', image: 'https://images.unsplash.com/photo-1499856871958-5b9088d4687e?auto=format&fit=crop&q=80', type: 'Trending' },
  { id: 2, title: 'Beach Escape', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80', type: 'For You' },
  { id: 3, title: 'Mountains & Nature', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80', type: 'Popular' },
  { id: 4, title: 'Cultural Experience', image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&q=80', type: 'Trending' },
];

export default function TravelCanvas({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image with smooth transition */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-2000",
              index === currentBgIndex ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better text visibility */}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-white">
        {/* Personalized greeting instead of app name */}
        <h1 className="mb-4 text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
          Hello Rakesh,
        </h1>
        <p className="mb-8 text-center text-lg font-light opacity-90 md:text-xl">
          Where's your next adventure taking you?
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
              placeholder="Where to next?"
              className={cn(
                "h-14 w-full rounded-full bg-white/10 px-6 pr-12 text-lg backdrop-blur-lg transition-all",
                "placeholder:text-white/70 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50",
                "apple-blur"
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
                className="h-10 w-10 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button 
                type="submit" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </form>

        {/* Suggestions */}
        <div className="mt-12 w-full max-w-5xl overflow-hidden">
          <h2 className="mb-4 text-xl font-medium">Discover</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {suggestions.map(suggestion => (
              <SuggestionCard 
                key={suggestion.id}
                title={suggestion.title}
                image={suggestion.image}
                type={suggestion.type}
                onClick={() => onSearch(suggestion.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
