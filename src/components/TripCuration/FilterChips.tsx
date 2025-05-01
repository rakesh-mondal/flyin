
import React from 'react';
import { Calendar, PlaneTakeoff, Hotel, DollarSign, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const FilterChips = () => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="p-3 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-medium">1577</span> of <span className="text-blue-600">2000</span> flights
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Track prices</span>
          <div className="h-5 w-10 bg-gray-200 rounded-full relative">
            <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
          </div>
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
        </div>
      </div>
      
      {/* Filter sections */}
      <div className="p-3 border-t border-gray-100">
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
      
      <div className="p-3 border-t border-gray-100">
        <h3 className="text-sm font-medium mb-2">Times</h3>
        <div className="flex mb-3 border border-gray-200 rounded-md">
          <button className="flex-1 py-2 text-sm font-medium border-r border-gray-200 bg-white">Take-off</button>
          <button className="flex-1 py-2 text-sm font-medium bg-white">Landing</button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm mb-1">Take-off from BLR</p>
          <p className="text-xs text-gray-500 mb-2">Tue 00:00 - Tue 23:30</p>
          <div className="h-1.5 w-full bg-gray-200 relative rounded-full">
            <div className="absolute left-0 top-0 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="absolute right-0 top-0 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
        </div>
        
        <div className="mb-2">
          <p className="text-sm mb-1">Take-off from LHR</p>
          <p className="text-xs text-gray-500 mb-2">Fri 06:00 - Fri 22:30</p>
          <div className="h-1.5 w-full bg-gray-200 relative rounded-full">
            <div className="absolute left-0 top-0 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
            <div className="absolute right-0 top-0 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterChips;
