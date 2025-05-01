
import React, { useState } from 'react';
import { Calendar, Clock, Leaf, PlaneTakeoff } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface FlightResultCardProps {
  flight: {
    id: number;
    airline: string;
    airlineCode: string;
    airlineLogo?: string;
    departureCity: string;
    departureCode: string;
    departureTime: string;
    arrivalCity: string;
    arrivalCode: string; 
    arrivalTime: string;
    duration: string;
    stops: number;
    price: number;
    baseFare: number;
    taxes: number;
    fees: number;
    carbonFootprint: string;
    tags?: string[];
    layoverInfo?: string;
  };
  onClick: () => void;
  isSelected?: boolean;
}

export default function FlightResultCard({ flight, onClick, isSelected = false }: FlightResultCardProps) {
  const [imgError, setImgError] = useState(false);
  
  const handleImgError = () => {
    setImgError(true);
  };

  return (
    <Card 
      className={cn(
        "mb-4 overflow-hidden transition-all hover:shadow-md", 
        isSelected ? "ring-2 ring-primary shadow-md" : ""
      )}
      onClick={onClick}
    >
      <div className={cn(
        "border-b border-gray-100 bg-gray-50 p-3",
        isSelected ? "bg-blue-50" : ""
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {flight.airlineLogo && !imgError ? (
              <img 
                src={flight.airlineLogo} 
                alt={flight.airline} 
                className="h-8 w-8 object-contain"
                onError={handleImgError}
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium">
                {flight.airlineCode}
              </div>
            )}
            <span className="font-medium">{flight.airline}</span>
          </div>
          {flight.tags && flight.tags.length > 0 && (
            <div className="flex gap-2">
              {flight.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className={cn(
                    "border-none text-xs font-normal",
                    tag === "Lowest Price" ? "bg-emerald-50 text-emerald-600" : 
                    tag === "Fastest Route" ? "bg-blue-50 text-blue-600" : 
                    tag === "Eco-Friendly" ? "bg-green-50 text-green-600" :
                    tag === "Direct Flight" ? "bg-purple-50 text-purple-600" :
                    tag === "Award Winning" ? "bg-amber-50 text-amber-600" :
                    "bg-gray-50 text-gray-600"
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Flight route info */}
          <div className="flex flex-1 flex-col md:flex-row md:items-center md:space-x-8">
            {/* Departure */}
            <div className="mb-2 text-center md:mb-0 md:text-left">
              <p className="text-lg font-bold">{flight.departureTime}</p>
              <p className="text-sm text-gray-500">{flight.departureCode}</p>
              <p className="text-xs text-gray-400">{flight.departureCity}</p>
            </div>
            
            {/* Flight path visualization */}
            <div className="relative mb-2 flex flex-1 items-center md:mb-0">
              <div className="relative flex w-full flex-col items-center">
                <div className="flex w-full items-center">
                  <div className="h-2 w-2 rounded-full bg-black"></div>
                  <div className="h-[1px] flex-1 bg-gray-300"></div>
                  {flight.stops > 0 && (
                    <div className="h-2 w-2 rounded-full border border-gray-400 bg-white"></div>
                  )}
                  <div className="h-[1px] flex-1 bg-gray-300"></div>
                  <div className="h-2 w-2 rounded-full bg-black"></div>
                </div>
                
                <div className="mt-2 flex w-full justify-between">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{flight.duration}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {flight.stops === 0 ? "Non-stop" : 
                     flight.stops === 1 ? "1 stop" : 
                     `${flight.stops} stops`}
                  </div>
                </div>
                
                {flight.layoverInfo && (
                  <div className="mt-1 text-center text-xs text-gray-500">
                    {flight.layoverInfo}
                  </div>
                )}
              </div>
            </div>
            
            {/* Arrival */}
            <div className="text-center md:text-left">
              <p className="text-lg font-bold">{flight.arrivalTime}</p>
              <p className="text-sm text-gray-500">{flight.arrivalCode}</p>
              <p className="text-xs text-gray-400">{flight.arrivalCity}</p>
            </div>
          </div>
          
          {/* Price info */}
          <div className="mt-4 rounded-lg bg-gray-50 p-3 md:mt-0 md:text-center">
            <p className="text-2xl font-bold">${flight.price}</p>
            <button className={cn(
              "mt-2 w-full rounded-full px-4 py-2 text-sm font-medium text-white transition-colors",
              isSelected ? "bg-primary hover:bg-primary/90" : "bg-black hover:bg-black/90"
            )}>
              {isSelected ? "Selected" : "Select"}
            </button>
            <div className="mt-2 text-center text-xs text-gray-500">
              <button className="underline hover:text-gray-700">Fare details</button>
            </div>
          </div>
        </div>
        
        {/* Additional info row */}
        <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <PlaneTakeoff className="h-3 w-3" />
            <span>{`${flight.airlineCode} ${Math.floor(Math.random() * 1000) + 1000}`}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Economy</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Leaf className="h-3 w-3" />
            <span>{flight.carbonFootprint} CO₂</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
