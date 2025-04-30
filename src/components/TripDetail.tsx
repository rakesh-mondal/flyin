
import React from 'react';
import { ArrowLeft, Star, Calendar, Clock, PlaneTakeoff, PlaneLanding, Hotel, MapPin, Utensils, Plus, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TripDetailProps {
  trip: any;
  onBack: () => void;
}

export default function TripDetail({ trip, onBack }: TripDetailProps) {
  const handleBookTrip = () => {
    toast.success("Trip reserved successfully!", {
      description: "Your booking confirmation has been sent to your email.",
    });
  };

  return (
    <div className="flex h-screen w-full flex-col bg-apple-gray text-apple-black">
      {/* Header with background image */}
      <div className="relative h-72">
        <img 
          src={trip.image} 
          alt={trip.destination}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Back button */}
        <Button 
          className="absolute left-4 top-4 rounded-full bg-black/30 text-white hover:bg-black/50"
          size="icon"
          variant="ghost"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <h1 className="text-3xl font-medium">{trip.title}</h1>
          <p className="mt-1 flex items-center text-lg">
            <MapPin className="mr-1.5 h-4 w-4" />
            {trip.destination}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Trip summary */}
        <div className="border-b border-gray-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm text-gray-500">Dates</p>
                <p className="flex items-center text-sm font-medium">
                  <Calendar className="mr-1 h-3.5 w-3.5 text-gray-400" />
                  {trip.dates}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="flex items-center text-sm font-medium">
                  <Clock className="mr-1 h-3.5 w-3.5 text-gray-400" />
                  {trip.duration}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price per person</p>
              <p className="text-xl font-medium">${trip.price}</p>
            </div>
          </div>
        </div>

        {/* Flight details */}
        {trip.flight && (
          <div className="mt-4 rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Flight</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline">
                  <span className="text-lg font-medium">{trip.flight.departure.split(' ')[1]}</span>
                  <span className="ml-2 text-sm text-gray-500">{trip.flight.departure.split(' ')[0]}</span>
                </div>
                <div className="mt-1">
                  <PlaneTakeoff className="inline h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              <div className="flex-1 px-4">
                <div className="relative">
                  <Separator className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-300" />
                  <div className="relative flex justify-center">
                    <span className="rounded bg-white px-2 text-xs text-gray-500">
                      {trip.flight.duration}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-center text-sm font-medium">{trip.flight.airline}</p>
              </div>
              
              <div>
                <div className="flex items-baseline">
                  <span className="text-lg font-medium">{trip.flight.arrival.split(' ')[1]}</span>
                  <span className="ml-2 text-sm text-gray-500">{trip.flight.arrival.split(' ')[0]}</span>
                </div>
                <div className="mt-1">
                  <PlaneLanding className="inline h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hotel details */}
        {trip.hotel && (
          <div className="mt-4 rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Accommodation</h2>
            
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <Hotel className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="font-medium">{trip.hotel.name}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{trip.hotel.type}</p>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {trip.hotel.amenities.map((amenity: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-4 flex items-center rounded-lg bg-gray-100 p-2 text-sm">
                <Star className="mr-1 h-4 w-4 text-amber-400" />
                <span>{trip.hotel.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Activities */}
        {trip.activities && (
          <div className="mt-4 rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Recommended Activities</h2>
            
            <div className="space-y-3">
              {trip.activities.map((activity: string, index: number) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center justify-between rounded-lg border border-gray-100 p-3",
                    "transition-all hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center">
                    <Utensils className="mr-3 h-5 w-5 text-gray-400" />
                    <span>{activity}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                className="mt-2 w-full justify-center rounded-lg border border-dashed border-gray-300 py-6 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                onClick={() => {
                  toast.success("Exploring more activities for your trip!");
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Discover more activities
              </Button>
            </div>
          </div>
        )}
        
        {/* Booking section with Apple Pay */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-5 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total for 2 travelers</p>
              <p className="text-2xl font-medium">${trip.price * 2}</p>
            </div>
            <Button
              className={cn(
                "rounded-full bg-black px-6 py-6 text-white hover:bg-black/90",
                "transition-all duration-300"
              )}
              onClick={handleBookTrip}
            >
              <span>Book with</span>
              <svg className="ml-2 h-4" viewBox="0 0 43 19" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.7 1.6c.4-.5 1.1-.9 1.9-.9.1 0 .3 0 .4.1-.1.1-.2.2-.3.3-1 1-1.2 2.8-.6 4.1.7-1.1 2.5-1.8 4-1.2-1 2.9-2.5 5.4-4.4 7.9-1.9 2.4-3.7 4.9-6.8 4.9H.8C.4 16.7 0 16.4 0 16v-5.8c0-.4.3-.7.7-.7h.1c3.1 0 3.8-2 6-2.7 1.3-.4 2.8-.9 3.9-1.5-1.1-1-2.8-2.3-4-3.7zm36.3 9c0 2.8-2.3 5.1-5.1 5.1H20.5c-.4 0-.7-.3-.7-.7V6.3c0-.4.3-.7.7-.7h17c3.3 0 5.5 2.3 5.5 5zm-15.2-1.8h-.7v-1.1h.7V7h1v.7h1.1v1h-1.1V10h-1V8.8zM28.7 7h1v3h-1V7zm-1.9 3h-1.1V7h1.1v3zm9.9-2h-3v-.9h3V8zm0 2h-3v-1h3v1z" fill="currentColor"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
