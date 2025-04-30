
import React from 'react';
import { MapPin, Calendar, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TripProps {
  trip: {
    id: number;
    destination: string;
    title: string;
    price: number;
    dates: string;
    duration: string;
    image: string;
    flight?: {
      airline: string;
      departure: string;
      arrival: string;
      duration: string;
    };
    hotel?: {
      name: string;
      rating: number;
      type: string;
      amenities: string[];
    };
  };
  onClick: () => void;
}

export default function TripProposal({ trip, onClick }: TripProps) {
  return (
    <div 
      className={cn(
        "group overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300",
        "hover:shadow-md hover:ring-1 hover:ring-gray-200"
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.destination} 
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h3 className="text-2xl font-medium">{trip.title}</h3>
          <p className="flex items-center text-sm">
            <MapPin className="mr-1 h-3.5 w-3.5" /> {trip.destination}
          </p>
        </div>
      </div>
      
      {/* Details */}
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="mr-1 h-3.5 w-3.5" />
            <span>{trip.dates}</span>
          </div>
          <span className="text-lg font-medium">${trip.price} <span className="text-sm font-normal text-gray-500">per person</span></span>
        </div>
        
        {/* Trip highlights */}
        <div className="space-y-3">
          {trip.flight && (
            <div className="flex items-center rounded-lg bg-gray-50 p-2.5 text-sm">
              <div className="flex-1">
                <p className="font-medium text-gray-700">{trip.flight.airline}</p>
                <div className="flex items-center">
                  <p className="text-gray-600">{trip.flight.departure}</p>
                  <ArrowRight className="mx-2 h-3 w-3 text-gray-400" />
                  <p className="text-gray-600">{trip.flight.arrival}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{trip.flight.duration}</span>
            </div>
          )}

          {trip.hotel && (
            <div className="flex items-center rounded-lg bg-gray-50 p-2.5 text-sm">
              <div className="flex-1">
                <p className="font-medium text-gray-700">{trip.hotel.name}</p>
                <p className="text-xs text-gray-500">{trip.hotel.type}</p>
              </div>
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 text-amber-400" />
                <span className="ml-1 text-gray-700">{trip.hotel.rating.toFixed(1)}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Call to action */}
        <button 
          className={cn(
            "mt-3 w-full rounded-full bg-black px-4 py-2.5 text-center text-sm font-medium text-white",
            "transition-all duration-300 hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black/50"
          )}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
