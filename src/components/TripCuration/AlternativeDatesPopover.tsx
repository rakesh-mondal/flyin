
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface AlternativeDatesPopoverProps {
  alternativeDates: string[];
  handleSelectDate: (date: string) => void;
}

const AlternativeDatesPopover = ({ alternativeDates, handleSelectDate }: AlternativeDatesPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-xs text-gray-600 hover:bg-gray-100"
          size="sm"
        >
          <Calendar className="h-3 w-3" /> 
          <span>Alternative dates</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-medium">Available Alternative Dates</h3>
          <div className="space-y-2">
            {alternativeDates.map((date, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start hover:bg-gray-100"
                onClick={() => handleSelectDate(date)}
              >
                {date}
              </Button>
            ))}
          </div>
          <div className="pt-2">
            <Button 
              className="w-full bg-black text-white hover:bg-black/90"
              onClick={() => {
                toast.success("Showing more date options!");
              }}
            >
              See More Dates
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AlternativeDatesPopover;
