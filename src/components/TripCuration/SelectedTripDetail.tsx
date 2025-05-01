
import React from 'react';
import { ArrowLeft, Calendar, Info, Plane, PlaneTakeoff, Hotel } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { PriceBreakdown } from '../trip-detail/PriceBreakdown';
import FlightMap from './FlightMap';
import { Card, CardContent } from '../ui/card';
import FlightInsights from './FlightInsights';
import { InsightProps } from './FlightInsights';

interface SelectedTripDetailProps {
  trip: any;
  insights?: InsightProps[];
  onProceedToBook: () => void;
  onBack?: () => void;
  isMobile?: boolean;
}

export default function SelectedTripDetail({ 
  trip, 
  insights = [],
  onProceedToBook, 
  onBack,
  isMobile = false 
}: SelectedTripDetailProps) {
  if (!trip) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Mobile back button */}
      {isMobile && onBack && (
        <div className="p-4 border-b border-gray-200">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="flex items-center text-gray-700"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Flight Options
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Trip Title */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{trip.title || `Trip to ${trip.arrivalCity}`}</h2>
          <p className="text-gray-500 flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-1" />
            {trip.dates || 'Dates not specified'}
          </p>
        </div>
        
        {/* AI Flight Insights */}
        {insights && insights.length > 0 && (
          <div className="mb-4">
            <FlightInsights insights={insights} />
          </div>
        )}
        
        {/* Flight Map */}
        <div className="mb-4">
          <FlightMap 
            departureCity={trip.departureCity} 
            departureCode={trip.departureCode}
            arrivalCity={trip.arrivalCity}
            arrivalCode={trip.arrivalCode}
          />
        </div>
        
        {/* Flight Summary */}
        <Card className="mb-4 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 mb-1">Departure</div>
                <div className="text-lg font-medium">{trip.departureTime}</div>
                <div className="text-sm">{trip.departureCode} • {trip.departureCity}</div>
              </div>
              
              <div className="flex-1 px-4 flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-1">{trip.duration}</div>
                <div className="w-full h-[1px] bg-gray-300 relative">
                  <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-blue-500"></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Direct Flight</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Arrival</div>
                <div className="text-lg font-medium">{trip.arrivalTime}</div>
                <div className="text-sm">{trip.arrivalCode} • {trip.arrivalCity}</div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {trip.airlineLogo ? (
                  <img src={trip.airlineLogo} alt={trip.airline} className="h-6 w-6 mr-2" />
                ) : (
                  <Plane className="h-5 w-5 mr-2 text-gray-500" />
                )}
                <span>{trip.airline}</span>
              </div>
              <div className="text-sm text-gray-500">Flight {trip.airlineCode} {Math.floor(Math.random() * 1000) + 1000}</div>
            </div>
          </CardContent>
        </Card>
        
        {/* Hotel Details (if available) */}
        {trip.hotel && (
          <Card className="mb-4 bg-white">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md p-2 bg-gray-100">
                  <Hotel className="h-5 w-5 text-gray-700" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{trip.hotel.name}</h3>
                  <div className="text-sm text-gray-500 mt-1">{trip.hotel.location}</div>
                  <div className="flex items-center mt-2">
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-xs text-gray-500 ml-1">{trip.hotel.rating}/5</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-lg font-medium">${trip.hotel.pricePerNight}</div>
                  <div className="text-xs text-gray-500">per night</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Activities (if available) */}
        {trip.activities && trip.activities.length > 0 && (
          <Card className="mb-4 bg-white">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Included Activities</h3>
              <ul className="space-y-2">
                {trip.activities.slice(0, 3).map((activity: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    {activity}
                  </li>
                ))}
                {trip.activities.length > 3 && (
                  <li className="text-sm text-primary mt-1 cursor-pointer">
                    + {trip.activities.length - 3} more activities
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        )}
        
        {/* Price Breakdown */}
        <PriceBreakdown price={trip.price} />
        
        {/* Notes */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm flex items-start">
          <Info className="h-4 w-4 mr-2 text-blue-500 mt-0.5 shrink-0" />
          <div>
            For this {trip.arrivalCity} journey, we recommend booking at least 45 days in advance for the best rates. June is typically 15% more expensive than traveling in May.
          </div>
        </div>
      </div>
      
      {/* Booking Button */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <Button 
          onClick={onProceedToBook} 
          className="w-full bg-black text-white hover:bg-black/90"
        >
          <PlaneTakeoff className="mr-2 h-4 w-4" />
          Continue to Booking
        </Button>
      </div>
    </div>
  );
}
