
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Luggage, BarChart4 } from 'lucide-react';

interface PriceBreakdownProps {
  price: number;
}

export function PriceBreakdown({ price }: PriceBreakdownProps) {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-medium">Price Breakdown</h2>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Base fare</span>
          <span>${(price * 0.7).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes & Fees</span>
          <span>${(price * 0.25).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Travel Insurance</span>
          <span>${(price * 0.05).toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${price}</span>
        </div>
      </div>
      
      <div className="mt-5 space-y-3">
        <div className="flex justify-between rounded-md bg-gray-50 p-4 text-sm">
          <div className="flex items-center">
            <Luggage className="mr-2 h-4 w-4 text-gray-500" />
            <span>Baggage Allowance</span>
          </div>
          <span>1 × 23kg</span>
        </div>
        
        <div className="flex items-center justify-between rounded-md bg-gray-50 p-4 text-sm">
          <div className="flex items-center">
            <BarChart4 className="mr-2 h-4 w-4 text-gray-500" />
            <span>CO₂ Emissions</span>
          </div>
          <span>295kg (15% below average)</span>
        </div>
      </div>
    </div>
  );
}
