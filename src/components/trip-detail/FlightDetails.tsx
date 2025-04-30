
import React from 'react';
import { PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FlightDetailsProps {
  departure: string;
  arrival: string;
  airline: string;
  duration: string;
}

export function FlightDetails({ departure, arrival, airline, duration }: FlightDetailsProps) {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-medium">Flight Details</h2>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline">
            <span className="text-lg font-medium">
              {(departure || '').split(' ')[1]}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {(departure || '').split(' ')[0]}
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
                {duration || ''}
              </span>
            </div>
          </div>
          <p className="mt-1 text-center text-sm font-medium">
            {airline || ''}
          </p>
        </div>
        
        <div>
          <div className="flex items-baseline">
            <span className="text-lg font-medium">
              {(arrival || '').split(' ')[1]}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {(arrival || '').split(' ')[0]}
            </span>
          </div>
          <div className="mt-1">
            <PlaneLanding className="inline h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Airplane details */}
      <div className="mt-5 rounded-md bg-gray-50 p-4 text-sm">
        <p className="font-medium">Boeing 787 Dreamliner</p>
        <div className="mt-1 flex justify-between text-gray-600">
          <span>Seat: Economy Premium</span>
          <span>Gate: B12</span>
        </div>
      </div>
    </div>
  );
}
