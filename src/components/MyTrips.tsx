
import React from 'react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

// Mock upcoming trips data
const upcomingTrips = [
  {
    id: 1,
    destination: 'Tokyo, Japan',
    dates: 'May 15 - May 22, 2025',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    status: 'Confirmed',
    countdown: '14 days to go',
    flightTime: '11:45 AM'
  }
];

// Mock past trips data
const pastTrips = [
  {
    id: 2,
    destination: 'Paris, France',
    dates: 'October 10 - October 17, 2024',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9088d4687e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    status: 'Completed'
  },
  {
    id: 3,
    destination: 'Barcelona, Spain',
    dates: 'July 5 - July 12, 2024',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80',
    status: 'Completed'
  }
];

interface MyTripsProps {
  onViewTrip: (trip: any) => void;
}

export default function MyTrips({ onViewTrip }: MyTripsProps) {
  return (
    <div className="flex flex-1 flex-col bg-apple-gray">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="px-5 py-5">
          <h1 className="text-2xl font-medium">My Trips</h1>
          <p className="text-sm text-gray-500">Manage your upcoming and past journeys</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Upcoming trips */}
        <section>
          <h2 className="mb-3 text-lg font-medium">Upcoming</h2>
          
          {upcomingTrips.length > 0 ? (
            <div className="space-y-4">
              {upcomingTrips.map(trip => (
                <div 
                  key={trip.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm"
                  onClick={() => onViewTrip(trip)}
                >
                  <div className="relative h-40">
                    <img 
                      src={trip.image} 
                      alt={trip.destination} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                      <h3 className="text-xl font-medium">{trip.destination}</h3>
                      <p className="flex items-center text-sm">
                        <Calendar className="mr-1 h-3.5 w-3.5" /> {trip.dates}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                        {trip.status}
                      </span>
                      <span className="text-sm font-medium text-apple-blue">{trip.countdown}</span>
                    </div>
                    
                    <div className="rounded-lg bg-gray-50 p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Next flight</p>
                          <p className="font-medium">{trip.flightTime}</p>
                        </div>
                        <button 
                          className="flex items-center rounded-full bg-apple-blue px-4 py-1.5 text-xs font-medium text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.alert("Boarding pass added to Apple Wallet");
                          }}
                        >
                          Add to Wallet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <p className="text-gray-600">No upcoming trips</p>
              <button className="mt-3 text-sm font-medium text-apple-blue">
                Start planning your next journey
              </button>
            </div>
          )}
        </section>

        {/* Past trips */}
        {pastTrips.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-lg font-medium">Past Journeys</h2>
            
            <div className="space-y-3">
              {pastTrips.map(trip => (
                <div 
                  key={trip.id}
                  className={cn(
                    "flex items-center rounded-xl bg-white p-3 shadow-sm transition-all",
                    "hover:shadow-md hover:ring-1 hover:ring-gray-200"
                  )}
                  onClick={() => onViewTrip(trip)}
                >
                  <img 
                    src={trip.image} 
                    alt={trip.destination} 
                    className="mr-4 h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{trip.destination}</h3>
                    <p className="flex items-center text-xs text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" /> {trip.dates}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
