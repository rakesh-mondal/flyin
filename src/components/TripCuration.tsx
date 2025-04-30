
import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, PlaneTakeoff, Hotel, Calendar, DollarSign, Sliders, Send, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import TripProposal from './TripProposal';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

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
  const [userMessage, setUserMessage] = useState('');
  const [budgetRange, setBudgetRange] = useState({ min: 1000, max: 5000 });
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [alternativeDates, setAlternativeDates] = useState<string[]>([
    'June 5 - June 12, 2025',
    'June 15 - June 22, 2025',
    'July 1 - July 8, 2025'
  ]);

  const activities = [
    'Sightseeing', 'Cultural Tours', 'Food & Wine', 'Adventure', 
    'Beach', 'Nightlife', 'Shopping', 'Nature', 'Museums'
  ];

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

  const handleSubmitMessage = () => {
    if (!userMessage.trim()) return;
    
    toast.success("Message received!", {
      description: "I'll adjust your recommendations accordingly.",
    });
    setMessage(prev => `${prev} I've refined the options based on your preferences.`);
    setUserMessage('');
  };

  const handleAddActivities = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
    
    toast.success(`${selectedActivities.includes(activity) ? 'Removed' : 'Added'} activity: ${activity}`, {
      description: "Updating your recommendations...",
    });
  };

  const handleSetBudget = (min: number, max: number) => {
    setBudgetRange({ min, max });
    toast.success(`Budget updated to $${min} - $${max}`, {
      description: "Adjusting your recommendations based on budget...",
    });
  };

  const handleSelectDate = (date: string) => {
    toast.success(`Selected alternative dates: ${date}`, {
      description: "Updating availability for the new dates...",
    });
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-black">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">Your Journey</h1>
        <Button variant="ghost" size="icon" onClick={onBack} className="text-black">
          <X className="h-5 w-5" />
        </Button>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* AI message */}
        <div className="w-full bg-white p-4 shadow-sm">
          {loading ? (
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-black/10"></div>
              <p className="text-lg">{thinking}</p>
            </div>
          ) : (
            <p className="text-lg">{message}</p>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex items-center space-x-2 overflow-x-auto bg-white px-4 py-3 shadow-sm">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Date preferences updated!")}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>June 2025</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Flight preferences updated!")}
          >
            <PlaneTakeoff className="h-3.5 w-3.5" />
            <span>Direct flights</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Hotel preferences updated!")}
          >
            <Hotel className="h-3.5 w-3.5" />
            <span>4+ Stars</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Budget preferences updated!")}
          >
            <DollarSign className="h-3.5 w-3.5" />
            <span>Budget</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Filter preferences updated!")}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>More filters</span>
          </Button>
        </div>

        {/* Trip proposals */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
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
        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-3">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask a question or refine your search..."
              className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-3 pr-10 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
            <Button
              className="absolute right-1 rounded-full bg-black p-2 text-white hover:bg-black/90"
              size="icon"
              onClick={handleSubmitMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center justify-center">
            {/* Activities Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-100"
                  size="sm"
                >
                  <Activity className="h-3 w-3" /> 
                  <span>Add activities</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-xl px-4 py-6">
                <SheetHeader className="mb-4 text-left">
                  <SheetTitle>Add Activities</SheetTitle>
                  <SheetDescription>Select activities you're interested in</SheetDescription>
                </SheetHeader>
                <div className="flex flex-wrap gap-2">
                  {activities.map((activity) => (
                    <Button
                      key={activity}
                      variant={selectedActivities.includes(activity) ? "default" : "outline"}
                      className={cn(
                        selectedActivities.includes(activity) 
                          ? "bg-black text-white hover:bg-black/90" 
                          : "bg-white hover:bg-gray-100"
                      )}
                      size="sm"
                      onClick={() => handleAddActivities(activity)}
                    >
                      {activity}
                    </Button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button 
                    className="bg-black text-white hover:bg-black/90"
                    onClick={() => {
                      toast.success(`Added ${selectedActivities.length} activities to your search!`);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <Separator orientation="vertical" className="mx-2 h-4" />
            
            {/* Budget Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-100"
                  size="sm"
                >
                  <DollarSign className="h-3 w-3" /> 
                  <span>Adjust budget</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-xl px-4 py-6">
                <SheetHeader className="mb-4 text-left">
                  <SheetTitle>Set Your Budget</SheetTitle>
                  <SheetDescription>Select budget range per person</SheetDescription>
                </SheetHeader>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <p className="font-medium">${budgetRange.min}</p>
                    <p className="font-medium">${budgetRange.max}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      className="bg-black text-white hover:bg-black/90" 
                      onClick={() => handleSetBudget(1000, 3000)}
                    >
                      Economy ($1,000 - $3,000)
                    </Button>
                    <Button 
                      variant="outline" 
                      className="hover:bg-gray-100"
                      onClick={() => handleSetBudget(3000, 5000)}
                    >
                      Standard ($3,000 - $5,000)
                    </Button>
                    <Button 
                      variant="outline" 
                      className="hover:bg-gray-100"
                      onClick={() => handleSetBudget(5000, 8000)}
                    >
                      Premium ($5,000 - $8,000)
                    </Button>
                    <Button 
                      variant="outline" 
                      className="hover:bg-gray-100"
                      onClick={() => handleSetBudget(8000, 15000)}
                    >
                      Luxury ($8,000+)
                    </Button>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button 
                    className="bg-black text-white hover:bg-black/90"
                    onClick={() => {
                      toast.success(`Budget set to $${budgetRange.min} - $${budgetRange.max} per person`);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            
            <Separator orientation="vertical" className="mx-2 h-4" />
            
            {/* Alternative Dates Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-100"
                  size="sm"
                >
                  <Calendar className="h-3 w-3" /> 
                  <span>Alternative dates</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  <h3 className="font-medium">Available Alternative Dates</h3>
                  <div className="space-y-2">
                    {alternativeDates.map((date, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start hover:bg-gray-100"
                        onClick={() => handleSelectDate(date)}
                      >
                        {date}
                      </Button>
                    ))}
                  </div>
                  <div className="pt-2">
                    <Button 
                      className="w-full bg-black text-white hover:bg-black/90"
                      onClick={() => {
                        toast.success("Showing more date options!");
                      }}
                    >
                      See More Dates
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
