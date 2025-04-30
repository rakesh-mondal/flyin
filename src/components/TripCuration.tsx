
import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, PlaneTakeoff, Hotel, Calendar, DollarSign, Sliders, Send, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import TripProposal from './TripProposal';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock trip data
const mockTrips = [
  {
    id: 1,
    destination: 'Paris, France',
    title: 'Romantic City Escape',
    price: 3200,
    dates: 'June 10 - June 16, 2025',
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9088d4687e?auto=format&fit=crop&q=80',
    activities: ['Visit Eiffel Tower', 'Seine River Cruise', 'Louvre Museum'],
    flight: {
      airline: 'Air France',
      departure: 'JFK 10:25 AM',
      arrival: 'CDG 11:55 PM',
      duration: '7h 30m'
    },
    hotel: {
      name: 'Le Grand Paris',
      rating: 4.8,
      type: 'Boutique Hotel',
      amenities: ['Free Wi-Fi', 'Breakfast included', 'City view']
    }
  },
  {
    id: 2,
    destination: 'Santorini, Greece',
    title: 'Mediterranean Dream',
    price: 4500,
    dates: 'July 5 - July 12, 2025',
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80',
    activities: ['Sunset in Oia', 'Catamaran Cruise', 'Wine Tasting'],
    flight: {
      airline: 'Aegean Airlines',
      departure: 'JFK 7:15 PM',
      arrival: 'JTR 2:45 PM (+1)',
      duration: '12h 30m'
    },
    hotel: {
      name: 'Astra Suites',
      rating: 4.9,
      type: 'Luxury Resort',
      amenities: ['Infinity Pool', 'Ocean View', 'Spa Services']
    }
  },
  {
    id: 3,
    destination: 'Tokyo, Japan',
    title: 'Modern City Adventure',
    price: 5200,
    dates: 'August 12 - August 19, 2025',
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80',
    activities: ['Visit Tokyo Tower', 'Shibuya Crossing', 'Senso-ji Temple'],
    flight: {
      airline: 'Japan Airlines',
      departure: 'JFK 11:45 AM',
      arrival: 'NRT 2:35 PM (+1)',
      duration: '14h 50m'
    },
    hotel: {
      name: 'Park Hyatt Tokyo',
      rating: 4.7,
      type: 'Luxury Hotel',
      amenities: ['City View', 'Fine Dining', 'Indoor Pool']
    }
  }
];

interface TripCurationProps {
  searchQuery: string;
  onBack: () => void;
  onViewTrip: (trip: any) => void;
}

export default function TripCuration({ searchQuery, onBack, onViewTrip }: TripCurationProps) {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [thinking, setThinking] = useState('');

  useEffect(() => {
    const thinkingMessages = [
      "Finding the perfect matches for you...",
      "Checking availability for your dates...",
      "Curating personalized experiences...",
      "Finding the best value options..."
    ];

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setThinking(thinkingMessages[currentIndex]);
      currentIndex = (currentIndex + 1) % thinkingMessages.length;
    }, 2000);

    // Simulate AI processing
    setTimeout(() => {
      clearInterval(intervalId);
      setLoading(false);
      setTrips(mockTrips);
      
      // Set AI response based on search query
      if (searchQuery.toLowerCase().includes('beach')) {
        setMessage("Here are some beautiful beach destinations for your getaway. I've focused on places with pristine shores and excellent weather.");
      } else if (searchQuery.toLowerCase().includes('mountains')) {
        setMessage("I found these mountain retreats that offer stunning views and great hiking opportunities.");
      } else if (searchQuery.toLowerCase().includes('paris') || searchQuery.toLowerCase().includes('france')) {
        setMessage("Paris is beautiful year-round. Here are some options I think you'll love, with excellent accommodations near major attractions.");
      } else {
        setMessage(`Based on your interest in "${searchQuery}", I've curated these personalized journeys that I think you'll love.`);
      }
    }, 2500);

    return () => clearInterval(intervalId);
  }, [searchQuery]);

  const handleRefineSearch = () => {
    toast.success("Preferences updated! Refining your results...", {
      description: "We'll adjust your recommendations based on your preferences.",
    });
  };

  const handleSubmitMessage = () => {
    toast.success("Message received!", {
      description: "I'll adjust your recommendations accordingly.",
    });
    setMessage(prev => `${prev} I've refined the options based on your preferences.`);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-apple-gray text-apple-black">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">Your Journey</h1>
        <Button variant="ghost" size="icon" onClick={onBack}>
          <X className="h-5 w-5" />
        </Button>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* AI message */}
        <div className="w-full bg-white p-4 shadow-sm">
          {loading ? (
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-apple-blue/20"></div>
              <p className="text-lg">{thinking}</p>
            </div>
          ) : (
            <p className="text-lg">{message}</p>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex items-center space-x-2 overflow-x-auto bg-white/50 px-4 py-3 backdrop-blur-sm">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal"
            onClick={handleRefineSearch}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>June 2025</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal"
            onClick={handleRefineSearch}
          >
            <PlaneTakeoff className="h-3.5 w-3.5" />
            <span>Direct flights</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal"
            onClick={handleRefineSearch}
          >
            <Hotel className="h-3.5 w-3.5" />
            <span>4+ Stars</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal"
            onClick={handleRefineSearch}
          >
            <DollarSign className="h-3.5 w-3.5" />
            <span>Budget</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal"
            onClick={handleRefineSearch}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>More filters</span>
          </Button>
        </div>

        {/* Trip proposals */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            // Skeleton loading
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="overflow-hidden rounded-xl bg-white shadow-sm">
                  <div className="h-52 animate-pulse bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
                    <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
                    <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {trips.map((trip) => (
                <TripProposal 
                  key={trip.id}
                  trip={trip}
                  onClick={() => onViewTrip(trip)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Assistant input */}
        <div className={cn(
          "sticky bottom-0 border-t border-gray-200 bg-white p-3",
          "transition-all duration-300 ease-in-out"
        )}>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask a question or refine your search..."
              className="apple-transition flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm outline-none focus:border-apple-blue focus:ring-1 focus:ring-apple-blue"
            />
            <Button
              className="apple-transition absolute right-1 rounded-full bg-apple-blue p-2 text-white hover:bg-apple-blue/90"
              size="icon"
              onClick={handleSubmitMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-xs text-gray-600"
              size="sm"
              onClick={() => {
                toast.success("Adding activities to your search!");
              }}
            >
              <PlusCircle className="h-3 w-3" /> 
              <span>Add activities</span>
            </Button>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-xs text-gray-600"
              size="sm"
              onClick={() => {
                toast.success("Adjusting your budget range!");
              }}
            >
              <PlusCircle className="h-3 w-3" /> 
              <span>Adjust budget</span>
            </Button>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-xs text-gray-600"
              size="sm"
              onClick={() => {
                toast.success("Showing alternative dates!");
              }}
            >
              <PlusCircle className="h-3 w-3" /> 
              <span>Alternative dates</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
