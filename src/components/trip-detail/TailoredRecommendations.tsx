
import React from 'react';
import { Info, AlertTriangle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function TailoredRecommendations() {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-medium">Tailored for You</h2>
      
      <div className="space-y-3">
        <div className="flex items-start rounded-md bg-blue-50 p-4 text-sm">
          <Info className="mr-2 h-4 w-4 flex-shrink-0 text-blue-500" />
          <div>
            <p className="font-medium text-blue-700">Why we recommended this flight</p>
            <p className="mt-1 text-blue-600">Based on your preference for morning departures and direct flights. This option has the best price-to-comfort ratio for your typical budget range.</p>
          </div>
        </div>
        
        <div className="flex items-start rounded-md bg-amber-50 p-4 text-sm">
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
  );
}
