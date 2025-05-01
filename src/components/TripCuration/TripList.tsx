
import React, { useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Share2, Heart, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

// Mock flight data for Middle Eastern destinations with official airline logo URLs
const mockFlights = [
  {
    id: 1,
    airline: 'Emirates',
    airlineCode: 'EK',
    airlineLogo: 'https://www.emirates.com/etc/designs/ecom/creative/emirates-logo.png',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '21:00',
    departureDate: 'Tue, Jun 10',
    arrivalCity: 'Dubai',
    arrivalCode: 'DXB',
    arrivalTime: '07:05',
    arrivalDate: 'Wed, Jun 11',
    duration: '14h 35m',
    stops: 1,
    stopCities: ['London (LHR)'],
    price: 65909,
    baseFare: 1050,
    taxes: 135,
    fees: 60,
    carbonFootprint: '2.3 tonnes',
    tags: ['Best Value'],
    returnFlight: {
      departureCity: 'Dubai',
      departureCode: 'DXB',
      departureTime: '03:30',
      departureDate: 'Tue, Jun 16',
      arrivalCity: 'New York',
      arrivalCode: 'JFK',
      arrivalTime: '09:45',
      arrivalDate: 'Tue, Jun 16',
      duration: '13h 45m',
      stops: 0,
    },
  },
  {
    id: 2,
    airline: 'Air India',
    airlineCode: 'AI',
    airlineLogo: 'https://airindia.com/content/dam/airindia/logos/airindia-logo.svg',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '14:20',
    departureDate: 'Wed, Jul 5',
    arrivalCity: 'Dubai',
    arrivalCode: 'DXB',
    arrivalTime: '20:20',
    arrivalDate: 'Thu, Jul 6',
    duration: '10h 30m',
    stops: 0,
    stopCities: [],
    price: 59035,
    baseFare: 820,
    taxes: 105,
    fees: 53,
    carbonFootprint: '1.9 tonnes',
    tags: ['Direct Flight', 'Cheapest'],
    returnFlight: {
      departureCity: 'Dubai',
      departureCode: 'DXB',
      departureTime: '10:15',
      departureDate: 'Wed, Jul 12',
      arrivalCity: 'New York',
      arrivalCode: 'JFK',
      arrivalTime: '16:45',
      arrivalDate: 'Wed, Jul 12',
      duration: '14h 30m',
      stops: 1,
      stopCities: ['Delhi (DEL)'],
    },
  },
  {
    id: 3,
    airline: 'Etihad Airways',
    airlineCode: 'EY',
    airlineLogo: 'https://www.etihad.com/content/dam/etihad/global/logo/etihad-logo.svg',
    departureCity: 'New York',
    departureCode: 'JFK',
    departureTime: '10:00',
    departureDate: 'Tue, Sep 8',
    arrivalCity: 'Abu Dhabi',
    arrivalCode: 'AUH',
    arrivalTime: '07:00',
    arrivalDate: 'Wed, Sep 9',
    duration: '25h 30m',
    stops: 1,
    stopCities: ['London (LHR)'],
    price: 45717,
    baseFare: 990,
    taxes: 140,
    fees: 60,
    carbonFootprint: '2.1 tonnes',
    tags: ['Cheapest'],
    returnFlight: {
      departureCity: 'Abu Dhabi',
      departureCode: 'AUH',
      departureTime: '08:50',
      departureDate: 'Tue, Sep 15',
      arrivalCity: 'New York',
      arrivalCode: 'JFK',
      arrivalTime: '14:30',
      arrivalDate: 'Tue, Sep 15',
      duration: '15h 40m',
      stops: 1,
      stopCities: ['London (LHR)'],
    },
  }
];

interface TripListProps {
  trips?: any[];
  loading: boolean;
  onViewTrip: (trip: any) => void;
  selectedTrip?: any;
}

const TripList = ({ trips, loading, onViewTrip, selectedTrip }: TripListProps) => {
  const [savedTrips, setSavedTrips] = useState<number[]>([]);
  const [activeSort, setActiveSort] = useState<'best' | 'cheapest' | 'quickest'>('best');
  
  const isSelected = (flight: any) => {
    return selectedTrip && selectedTrip.id === flight.id;
  };
  
  const toggleSaveTrip = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedTrips.includes(id)) {
      setSavedTrips(savedTrips.filter(tripId => tripId !== id));
      toast.success("Trip removed from saved trips");
    } else {
      setSavedTrips([...savedTrips, id]);
      toast.success("Trip saved to your collection");
    }
  };
  
  const shareTrip = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Trip sharing link copied to clipboard");
  };

  const handleInfoClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info("Flight details", {
      description: "This shows complete flight information including layovers, aircraft type, and amenities."
    });
  };

  const getSortedFlights = () => {
    // In a real app, we would sort the actual flight data based on activeSort
    // For this demo, we'll just return the mock data
    return mockFlights;
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-2 w-32" />
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Sponsored content banner
  const SponsoredBanner = () => (
    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-center">
        <img 
          src="https://www.emirates.com/etc/designs/ecom/creative/emirates-logo.png" 
          alt="Emirates" 
          className="h-6 mr-2" 
        />
        <div>
          <span className="text-xs text-gray-500">Sponsored</span>
          <h4 className="font-medium text-amber-900">Book Premium Economy to Dubai and earn extra miles</h4>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Sort options */}
      <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex">
          <button 
            onClick={() => setActiveSort('cheapest')}
            className={cn(
              "flex-1 border-r border-gray-200 p-3 text-center transition-all",
              activeSort === 'cheapest' ? "bg-blue-50 border-b-2 border-b-blue-600" : ""
            )}
          >
            <div className={cn("text-sm", activeSort === 'cheapest' ? "font-medium" : "text-gray-500")}>Cheapest</div>
            <div className="font-bold">$45,717</div>
            <div className="text-xs text-gray-500">28h 00m</div>
          </button>
          <button 
            onClick={() => setActiveSort('best')}
            className={cn(
              "flex-1 border-r border-gray-200 p-3 text-center transition-all",
              activeSort === 'best' ? "bg-blue-50 border-b-2 border-b-blue-600" : ""
            )}
          >
            <div className={cn("text-sm", activeSort === 'best' ? "font-medium" : "text-gray-500")}>Best</div>
            <div className="font-bold">$59,035</div>
            <div className="text-xs text-gray-500">10h 15m</div>
          </button>
          <button 
            onClick={() => setActiveSort('quickest')}
            className={cn(
              "flex-1 p-3 text-center transition-all",
              activeSort === 'quickest' ? "bg-blue-50 border-b-2 border-b-blue-600" : ""
            )}
          >
            <div className={cn("text-sm", activeSort === 'quickest' ? "font-medium" : "text-gray-500")}>Quickest</div>
            <div className="font-bold">$59,035</div>
            <div className="text-xs text-gray-500">10h 15m</div>
          </button>
        </div>
      </div>

      {/* Sponsored Banner */}
      <SponsoredBanner />

      {/* Flight cards list */}
      <div className="space-y-4">
        {getSortedFlights().map((flight) => (
          <Card 
            key={flight.id}
            onClick={() => onViewTrip(flight)}
            className={cn(
              "overflow-hidden hover:shadow-md transition-all cursor-pointer",
              isSelected(flight) && "ring-2 ring-blue-500"
            )}
          >
            {/* Flight info */}
            <div className="p-4">
              {/* Top row with airline and action buttons */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img 
                    src={flight.airlineLogo} 
                    alt={flight.airline} 
                    className="h-6 object-contain" 
                  />
                  <span className="text-sm font-medium">{flight.airline}</span>
                  <span className="text-xs text-gray-500">{flight.airlineCode}</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => toggleSaveTrip(flight.id, e)}
                  >
                    <Heart 
                      className={cn(
                        "h-4 w-4", 
                        savedTrips.includes(flight.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      )} 
                    />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => shareTrip(flight.id, e)}
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => handleInfoClick(flight.id, e)}
                  >
                    <Info className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              
              {/* Outbound flight */}
              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="text-xs text-gray-500 mb-1">Outbound • {flight.departureDate}</div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-center">
                    <div className="text-xl font-bold">{flight.departureTime}</div>
                    <div className="text-sm text-gray-500">{flight.departureCode}</div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="relative h-0.5 w-full bg-gray-200">
                      {flight.stops > 0 && (
                        <div className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-gray-400 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="text-[10px] text-gray-500">{flight.duration}</div>
                      {flight.stops > 0 ? (
                        <div className="text-[10px] text-gray-500">{flight.stops} stop</div>
                      ) : (
                        <div className="text-[10px] text-blue-600 font-medium">Direct</div>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{flight.arrivalTime}</div>
                    <div className="text-sm text-gray-500">{flight.arrivalCode}</div>
                  </div>
                </div>
                {flight.stops > 0 && (
                  <div className="text-xs text-gray-500">
                    via {flight.stopCities.join(", ")}
                  </div>
                )}
              </div>
              
              {/* Return flight */}
              <div>
                <div className="text-xs text-gray-500 mb-1">Return • {flight.returnFlight.departureDate}</div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-center">
                    <div className="text-xl font-bold">{flight.returnFlight.departureTime}</div>
                    <div className="text-sm text-gray-500">{flight.returnFlight.departureCode}</div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="relative h-0.5 w-full bg-gray-200">
                      {flight.returnFlight.stops > 0 && (
                        <div className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-gray-400 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between mt-1">
                      <div className="text-[10px] text-gray-500">{flight.returnFlight.duration}</div>
                      {flight.returnFlight.stops > 0 ? (
                        <div className="text-[10px] text-gray-500">{flight.returnFlight.stops} stop</div>
                      ) : (
                        <div className="text-[10px] text-blue-600 font-medium">Direct</div>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{flight.returnFlight.arrivalTime}</div>
                    <div className="text-sm text-gray-500">{flight.returnFlight.arrivalCode}</div>
                  </div>
                </div>
                {flight.returnFlight.stops > 0 && flight.returnFlight.stopCities && (
                  <div className="text-xs text-gray-500">
                    via {flight.returnFlight.stopCities.join(", ")}
                  </div>
                )}
              </div>
            </div>
            
            {/* Price and tags footer */}
            <div className="flex items-center justify-between bg-gray-50 p-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {flight.tags.map((tag, index) => {
                  let tagColor = "bg-blue-100 text-blue-800";
                  if (tag.includes("Cheapest")) tagColor = "bg-green-100 text-green-800";
                  if (tag.includes("Best")) tagColor = "bg-purple-100 text-purple-800";
                  
                  return (
                    <span 
                      key={index} 
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${tagColor}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Total price</div>
                <div className="font-bold text-lg">${(flight.price / 1000).toFixed(3)}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TripList;
