
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface FlightSummaryProps {
  dates: string;
  duration: string;
  price: number;
}

export function FlightSummary({ dates, duration, price }: FlightSummaryProps) {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm text-gray-500">Departure</p>
            <p className="flex items-center text-sm font-medium">
              <Calendar className="mr-1 h-3.5 w-3.5 text-gray-400" />
              {dates?.split(' - ')[0]}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="flex items-center text-sm font-medium">
              <Clock className="mr-1 h-3.5 w-3.5 text-gray-400" />
              {duration}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-xl font-medium">${price}</p>
        </div>
      </div>
    </div>
  );
}
