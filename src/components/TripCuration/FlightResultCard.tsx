import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Leaf, PlaneTakeoff, Heart, Share, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import SimilarFlightOptions from './SimilarFlightOptions';
import { similarFlightOptions } from '@/data/sampleFlightData';
import { SlidingNumber } from '@/components/ui/sliding-number';

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
  const [isSaved, setIsSaved] = useState(false);
  const [glow, setGlow] = useState(false);
  const prevPriceRef = useRef(flight.price);
  
  useEffect(() => {
    if (flight.price !== prevPriceRef.current) {
      setGlow(true);
      prevPriceRef.current = flight.price;
      const timeout = setTimeout(() => setGlow(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [flight.price]);

  const handleImgError = () => {
    setImgError(true);
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality could be implemented here
  };

  return (
    <div className="space-y-2">
      <Card 
        onClick={onClick}
        className={cn(
          "overflow-visible border border-gray-200 cursor-pointer transition-all duration-500",
          isSelected ? "ring-2 ring-black shadow-sm" : "",
          glow ? "ring-4 ring-yellow-400/80 shadow-yellow-300 shadow-2xl scale-105 z-10" : ""
        )}
      >
        {/* Flight information section */}
        <div className="flex flex-col md:flex-row">
          {/* Left column for flights */}
          <div className="flex-grow p-4">
            {/* Save and Share buttons */}
            <div className="mb-4 flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5 rounded-full"
                onClick={toggleSave}
              >
                <Heart className={cn("h-4 w-4", isSaved ? "fill-red-500 text-red-500" : "")} />
                <span>Save</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1.5 rounded-full"
                onClick={handleShare}
              >
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            
            {/* Outbound flight */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-xl font-bold">
                    {flight.departureTime} – {flight.arrivalTime}
                  </div>
                  {flight.tags && flight.tags.includes("Direct Flight") ? (
                    <Badge variant="outline" className="bg-purple-50 text-xs text-purple-600 border-none">
                      Direct
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-xs text-blue-600 border-none">
                      {flight.stops === 1 ? "1 stop" : `${flight.stops} stops`}
                    </Badge>
                  )}
                </div>
                <div className="text-lg font-semibold">{flight.duration}</div>
              </div>
              
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <div>
                  {flight.departureCode} {flight.departureCity} – {flight.arrivalCode} {flight.arrivalCity}
                </div>
                {flight.airlineLogo && !imgError ? (
                  <img 
                    src={flight.airlineLogo} 
                    alt={flight.airline} 
                    className="h-6 w-auto"
                    onError={handleImgError}
                  />
                ) : (
                  <span className="font-medium">
                    {flight.airline}
                  </span>
                )}
              </div>

              {flight.layoverInfo && (
                <div className="mt-2 text-sm text-gray-500">
                  {flight.layoverInfo}
                </div>
              )}
            </div>
            
            {/* Return flight */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-xl font-bold">
                    19:50 – 19:20
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-xs text-blue-600 border-none">
                    {flight.stops === 1 ? "1 stop" : `${flight.stops} stops`}
                  </Badge>
                </div>
                <div className="text-lg font-semibold">19h 00m</div>
              </div>
              
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <div>
                  {flight.arrivalCode} {flight.arrivalCity} – {flight.departureCode} {flight.departureCity}
                </div>
                {flight.airlineLogo && !imgError ? (
                  <img 
                    src={flight.airlineLogo} 
                    alt={flight.airline} 
                    className="h-6 w-auto"
                    onError={handleImgError}
                  />
                ) : (
                  <span className="font-medium">
                    {flight.airline}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              {flight.airline}
            </div>
          </div>
          
          {/* Right column for price and action */}
          <div className="bg-gray-50 p-4 flex flex-col items-center justify-center border-l border-gray-200 min-w-[180px]">
            <div className="text-2xl font-bold">
              <span>₹</span><SlidingNumber value={flight.price} />
            </div>
            <div className="mb-1 text-xs text-gray-500">Economy</div>
            <Button 
              onClick={onClick}
              className={cn(
                "w-full rounded-md text-sm font-medium py-2 mt-2",
                isSelected 
                  ? "bg-gray-200 text-gray-800" 
                  : "bg-black text-white"
              )}
            >
              {isSelected ? "Selected" : "Select"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
