
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Heart, Share2, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FlightCardProps {
  flight: {
    id: number;
    airline: string;
    airlineCode: string;
    airlineLogo: string;
    departureCity: string;
    departureCode: string;
    departureTime: string;
    departureDate: string;
    arrivalCity: string;
    arrivalCode: string;
    arrivalTime: string;
    arrivalDate: string;
    duration: string;
    stops: number;
    stopCities?: string[];
    price: number;
    carbonFootprint: string;
    tags: string[];
    returnFlight: {
      departureCity: string;
      departureCode: string;
      departureTime: string;
      departureDate: string;
      arrivalCity: string;
      arrivalCode: string;
      arrivalTime: string;
      arrivalDate: string;
      duration: string;
      stops: number;
      stopCities?: string[];
    };
  };
  isSelected: boolean;
  onClick: () => void;
  onSave: (id: number, e: React.MouseEvent) => void;
  onShare: (id: number, e: React.MouseEvent) => void;
  onInfo: (id: number, e: React.MouseEvent) => void;
  isSaved: boolean;
}

const FlightRoute = ({ 
  departureTime, 
  departureCode, 
  arrivalTime, 
  arrivalCode, 
  duration, 
  stops, 
  stopCities 
}: { 
  departureTime: string; 
  departureCode: string; 
  arrivalTime: string; 
  arrivalCode: string; 
  duration: string; 
  stops: number; 
  stopCities?: string[]; 
}) => (
  <div className="flex items-center justify-between mb-2">
    <div className="text-center">
      <div className="text-xl font-bold">{departureTime}</div>
      <div className="text-sm text-gray-500">{departureCode}</div>
    </div>
    <div className="flex-1 mx-4">
      <div className="relative h-0.5 w-full bg-gray-200">
        {stops > 0 && (
          <div className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-gray-400 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-1">
        <div className="text-[10px] text-gray-500">{duration}</div>
        {stops > 0 ? (
          <div className="text-[10px] text-gray-500">{stops} stop</div>
        ) : (
          <div className="text-[10px] text-blue-600 font-medium">Direct</div>
        )}
      </div>
    </div>
    <div className="text-center">
      <div className="text-xl font-bold">{arrivalTime}</div>
      <div className="text-sm text-gray-500">{arrivalCode}</div>
    </div>
  </div>
);

const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  isSelected,
  onClick,
  onSave,
  onShare,
  onInfo,
  isSaved
}) => {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "overflow-hidden hover:shadow-md transition-all cursor-pointer",
        isSelected && "ring-2 ring-blue-500"
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
              onClick={(e) => onSave(flight.id, e)}
            >
              <Heart 
                className={cn(
                  "h-4 w-4", 
                  isSaved ? "fill-red-500 text-red-500" : "text-gray-600"
                )} 
              />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full"
              onClick={(e) => onShare(flight.id, e)}
            >
              <Share2 className="h-4 w-4 text-gray-600" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 rounded-full"
              onClick={(e) => onInfo(flight.id, e)}
            >
              <Info className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
        
        {/* Outbound flight */}
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Outbound • {flight.departureDate}</div>
          <FlightRoute 
            departureTime={flight.departureTime}
            departureCode={flight.departureCode}
            arrivalTime={flight.arrivalTime}
            arrivalCode={flight.arrivalCode}
            duration={flight.duration}
            stops={flight.stops}
            stopCities={flight.stopCities}
          />
          {flight.stops > 0 && flight.stopCities && (
            <div className="text-xs text-gray-500">
              via {flight.stopCities.join(", ")}
            </div>
          )}
        </div>
        
        {/* Return flight */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Return • {flight.returnFlight.departureDate}</div>
          <FlightRoute 
            departureTime={flight.returnFlight.departureTime}
            departureCode={flight.returnFlight.departureCode}
            arrivalTime={flight.returnFlight.arrivalTime}
            arrivalCode={flight.returnFlight.arrivalCode}
            duration={flight.returnFlight.duration}
            stops={flight.returnFlight.stops}
            stopCities={flight.returnFlight.stopCities}
          />
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
  );
};

export default FlightCard;
