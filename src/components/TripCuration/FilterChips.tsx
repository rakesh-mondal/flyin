
import React from 'react';
import { Calendar, PlaneTakeoff, Hotel, DollarSign, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const FilterChips = () => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto bg-white px-4 py-3 shadow-sm">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
        onClick={() => toast.success("Date preferences updated!")}
      >
        <Calendar className="h-3.5 w-3.5" />
        <span>June 2025</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
        onClick={() => toast.success("Flight preferences updated!")}
      >
        <PlaneTakeoff className="h-3.5 w-3.5" />
        <span>Direct flights</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
        onClick={() => toast.success("Hotel preferences updated!")}
      >
        <Hotel className="h-3.5 w-3.5" />
        <span>4+ Stars</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
        onClick={() => toast.success("Budget preferences updated!")}
      >
        <DollarSign className="h-3.5 w-3.5" />
        <span>Budget</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 rounded-full border-gray-300 bg-white text-sm font-normal text-gray-900 hover:bg-gray-100"
        onClick={() => toast.success("Filter preferences updated!")}
      >
        <Sliders className="h-3.5 w-3.5" />
        <span>More filters</span>
      </Button>
    </div>
  );
};

export default FilterChips;
