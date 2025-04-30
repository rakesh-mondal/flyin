
import React from 'react';
import { ArrowLeft, Star, Calendar, Clock, PlaneTakeoff, PlaneLanding, User, AlertTriangle, Info, BarChart4, Luggage, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TripDetailProps {
  trip: any;
  onBack: () => void;
}

// Default fallback image for trips without images
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?auto=format&fit=crop&q=80';

export default function TripDetail({ trip, onBack }: TripDetailProps) {
  const handleBookFlight = () => {
    toast.success("Flight reserved successfully!", {
      description: "Your booking confirmation has been sent to your email.",
    });
  };

  // Ensure we have a valid title
  const tripTitle = trip.title || `${trip.arrivalCity || 'Destination'} Journey`;
  
  // Ensure we have a valid destination
  const tripDestination = trip.destination || (trip.arrivalCity ? `${trip.arrivalCity}, ${trip.arrivalCode}` : 'Unknown Destination');

  return (
    <div className="flex h-screen w-full flex-col bg-apple-gray text-apple-black">
      {/* Header with background image */}
      <div className="relative h-52">
        <img 
          src={trip.image || DEFAULT_IMAGE} 
          alt={tripDestination}
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
          <h1 className="text-3xl font-medium">{tripTitle}</h1>
          <p className="mt-1 flex items-center text-lg">
            <PlaneTakeoff className="mr-1.5 h-4 w-4" />
            {tripDestination}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Flight summary */}
        <div className="border-b border-gray-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm text-gray-500">Departure</p>
                <p className="flex items-center text-sm font-medium">
                  <Calendar className="mr-1 h-3.5 w-3.5 text-gray-400" />
                  {trip.dates?.split(' - ')[0]}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="flex items-center text-sm font-medium">
                  <Clock className="mr-1 h-3.5 w-3.5 text-gray-400" />
                  {trip.flight?.duration}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-xl font-medium">${trip.price}</p>
            </div>
          </div>
        </div>

        {/* Flight details */}
        {/* Check for either trip.flight or if trip itself is a flight */}
        {(trip.flight || trip.airline) && (
          <div className="mt-4 rounded-lg bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Flight Details</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline">
                  <span className="text-lg font-medium">
                    {(trip.flight?.departure || trip.departureTime || '').split(' ')[1]}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {(trip.flight?.departure || trip.departureTime || '').split(' ')[0]}
                  </span>
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
                      {trip.flight?.duration || trip.duration || ''}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-center text-sm font-medium">
                  {trip.flight?.airline || trip.airline || ''}
                </p>
              </div>
              
              <div>
                <div className="flex items-baseline">
                  <span className="text-lg font-medium">
                    {(trip.flight?.arrival || trip.arrivalTime || '').split(' ')[1]}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    {(trip.flight?.arrival || trip.arrivalTime || '').split(' ')[0]}
                  </span>
                </div>
                <div className="mt-1">
                  <PlaneLanding className="inline h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Airplane details */}
            <div className="mt-5 rounded-md bg-gray-50 p-3 text-sm">
              <p className="font-medium">Boeing 787 Dreamliner</p>
              <div className="mt-1 flex justify-between text-gray-600">
                <span>Seat: Economy Premium</span>
                <span>Gate: B12</span>
              </div>
            </div>
          </div>
        )}

        {/* Transparency section */}
        <div className="mt-4 rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Price Breakdown</h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base fare</span>
              <span>${(trip.price * 0.7).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>${(trip.price * 0.25).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Travel Insurance</span>
              <span>${(trip.price * 0.05).toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${trip.price}</span>
            </div>
          </div>
          
          <div className="mt-5 space-y-3">
            <div className="flex justify-between rounded-md bg-gray-50 p-3 text-sm">
              <div className="flex items-center">
                <Luggage className="mr-2 h-4 w-4 text-gray-500" />
                <span>Baggage Allowance</span>
              </div>
              <span>1 × 23kg</span>
            </div>
            
            <div className="flex items-center justify-between rounded-md bg-gray-50 p-3 text-sm">
              <div className="flex items-center">
                <BarChart4 className="mr-2 h-4 w-4 text-gray-500" />
                <span>CO₂ Emissions</span>
              </div>
              <span>295kg (15% below average)</span>
            </div>
          </div>
        </div>

        {/* Personalization & Proactive section */}
        <div className="mt-4 rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Tailored for You</h2>
          
          <div className="space-y-3">
            <div className="flex items-start rounded-md bg-blue-50 p-3 text-sm">
              <Info className="mr-2 h-4 w-4 flex-shrink-0 text-blue-500" />
              <div>
                <p className="font-medium text-blue-700">Why we recommended this flight</p>
                <p className="mt-1 text-blue-600">Based on your preference for morning departures and direct flights. This option has the best price-to-comfort ratio for your typical budget range.</p>
              </div>
            </div>
            
            <div className="flex items-start rounded-md bg-amber-50 p-3 text-sm">
              <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0 text-amber-500" />
              <div>
                <p className="font-medium text-amber-700">Booking Insight</p>
                <p className="mt-1 text-amber-600">Prices for this route are predicted to increase by 12% in the next 48 hours based on historical data and current demand.</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full justify-center rounded-lg py-5 text-sm"
              onClick={() => {
                toast.success("Preferences updated! We'll use these for future recommendations.");
              }}
            >
              <User className="mr-2 h-4 w-4" /> Customize Flight Preferences
            </Button>
          </div>
        </div>

        {/* Booking section with Apple Pay */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-5 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total price</p>
              <p className="text-2xl font-medium">${trip.price}</p>
            </div>
            <Button
              className={cn(
                "rounded-full bg-black px-6 py-6 text-white hover:bg-black/90",
                "transition-all duration-300"
              )}
              onClick={handleBookFlight}
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
