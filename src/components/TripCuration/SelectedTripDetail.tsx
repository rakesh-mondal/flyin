import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import FlightMap from './FlightMap';
import FlightInsights from './FlightInsights';

interface SelectedTripDetailProps {
  trip: any;
  insights?: any[];
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
    <div className="flex flex-col h-full overflow-hidden rounded-xl bg-white">
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
      <div className="flex flex-col lg:flex-row">
        {/* Left column */}
        <div className="flex-1 p-6">
          {/* Trip Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{trip.title || `Trip to ${trip.arrivalCity}`}</h2>
            <p className="text-gray-500 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {trip.dates || 'Dates not specified'}
            </p>
          </div>
          
          {/* AI Flight Insights */}
          {insights && insights.length > 0 && (
            <div className="mb-6">
              <FlightInsights insights={insights} />
            </div>
          )}
          
          {/* Flight Map */}
          <div className="mb-6 aspect-[16/9] w-full overflow-hidden rounded-lg">
            <FlightMap 
              departureCity={trip.departureCity} 
              departureCode={trip.departureCode}
              arrivalCity={trip.arrivalCity}
              arrivalCode={trip.arrivalCode}
            />
          </div>

          {/* Flight Details */}
          <div className="space-y-6">
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-3 text-lg font-medium">Outbound Flight</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{trip.departureCity}</span> ({trip.departureCode}) →{' '}
                  <span className="font-medium">{trip.arrivalCity}</span> ({trip.arrivalCode})
                </p>
                <p className="text-sm text-gray-500">
                  {trip.departureTime} - {trip.arrivalTime} • {trip.duration}
                </p>
                <p className="text-sm text-gray-500">{trip.airline}</p>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-3 text-lg font-medium">Return Flight</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">{trip.arrivalCity}</span> ({trip.arrivalCode}) →{' '}
                  <span className="font-medium">{trip.departureCity}</span> ({trip.departureCode})
                </p>
                <p className="text-sm text-gray-500">
                  {trip.returnDepartureTime} - {trip.returnArrivalTime} • {trip.duration}
                </p>
                <p className="text-sm text-gray-500">{trip.airline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Booking summary */}
        <div className="w-full border-t lg:w-80 lg:border-l lg:border-t-0 border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Price Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Base fare</span>
                <span>${trip.baseFare}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes & fees</span>
                <span>${trip.taxes}</span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-3 border-t border-gray-200">
                <span>Total per person</span>
                <span>${trip.price}</span>
              </div>
            </div>

            <Button
              onClick={onProceedToBook}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600"
            >
              Proceed to Book
            </Button>

            <p className="mt-4 text-xs text-center text-gray-500">
              By proceeding, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
