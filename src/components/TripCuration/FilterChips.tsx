
import React, { useState } from 'react';
import { Calendar, PlaneTakeoff, Hotel, DollarSign, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Switch } from '../ui/switch';

const FilterChips = () => {
  const [trackPrices, setTrackPrices] = useState(false);
  
  const handleTrackPrices = () => {
    setTrackPrices(!trackPrices);
    toast.success(trackPrices ? "Price tracking turned off" : "Price tracking turned on");
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="p-3 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-medium">1577</span> of <span className="text-blue-600">2000</span> flights
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Track prices</span>
          <Switch 
            checked={trackPrices} 
            onCheckedChange={handleTrackPrices} 
          />
        </div>
      </div>
      
      <div className="p-3 flex-col border-t border-gray-100">
        <h3 className="flex items-center text-sm font-medium mb-2">
          <span>Smart Filters</span>
          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">BETA</span>
        </h3>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-xs font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Date preferences updated!")}
          >
            <Calendar className="h-3 w-3" />
            <span>June 2025</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-xs font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Flight preferences updated!")}
          >
            <PlaneTakeoff className="h-3 w-3" />
            <span>Direct flights</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-xs font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Hotel preferences updated!")}
          >
            <Hotel className="h-3 w-3" />
            <span>4+ Stars</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-xs font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("Budget preferences updated!")}
          >
            <DollarSign className="h-3 w-3" />
            <span>Budget</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-xs font-normal text-gray-900 hover:bg-gray-100"
            onClick={() => toast.success("All filters opened")}
          >
            <Sliders className="h-3 w-3" />
            <span>More filters</span>
          </Button>
        </div>
      </div>
      
      {/* Filter sections - collapsed by default */}
      <div className="hidden p-3 border-t border-gray-100">
        <h3 className="text-sm font-medium mb-2">Stops</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="direct" className="h-4 w-4 rounded border-gray-300" defaultChecked />
              <label htmlFor="direct" className="ml-2 text-sm">Direct</label>
            </div>
            <span className="text-sm">$59,035</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="1stop" className="h-4 w-4 rounded border-gray-300" defaultChecked />
              <label htmlFor="1stop" className="ml-2 text-sm">1 stop</label>
            </div>
            <span className="text-sm">$45,717</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="2stops" className="h-4 w-4 rounded border-gray-300" defaultChecked />
              <label htmlFor="2stops" className="ml-2 text-sm">2+ stops</label>
            </div>
            <span className="text-sm">$78,636</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
