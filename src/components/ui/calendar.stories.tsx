import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from './calendar';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

// Basic calendar example
export const Basic: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
    onSelect: () => {},
    className: 'rounded-md border',
  },
};

// Date range selection for flight booking
export function DateRangeBooking() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">Flight Date Selection</h3>
      <p className="text-sm text-gray-500">Select your departure and return dates</p>
      <div className="grid gap-2">
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="rounded-md border p-3"
        />
        <div className="flex justify-between px-3 pt-2">
          <div className="text-sm">
            <p className="font-medium">Departure:</p>
            <p>{date?.from ? format(date.from, 'PP') : 'Select date'}</p>
          </div>
          <div className="text-sm text-right">
            <p className="font-medium">Return:</p>
            <p>{date?.to ? format(date.to, 'PP') : 'Select date'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Calendar with flight price indicators (Legacy example - use PriceCalendar instead)
export function FlightPriceCalendar() {
  // Sample price data for demonstration
  const priceData: Record<string, number> = {
    '2023-06-15': 4200,
    '2023-06-16': 4500,
    '2023-06-17': 6700,
    '2023-06-18': 5200,
    '2023-06-19': 3800,
    '2023-06-20': 3500,
    '2023-06-21': 4800,
    '2023-06-22': 7200,
    '2023-06-23': 9500,
    '2023-06-24': 6100,
    '2023-06-25': 4200,
  };
  
  const [selected, setSelected] = useState<Date | undefined>(new Date('2023-06-15'));
  
  // Set the current month to June 2023 for demonstration
  const defaultMonth = new Date('2023-06-01');
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">Legacy Price Calendar (use PriceCalendar component instead)</h3>
      <p className="text-sm text-gray-500">This is the old implementation. Use the new PriceCalendar component for better functionality.</p>
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        defaultMonth={defaultMonth}
        className="rounded-md border"
        components={{
          DayContent: ({ date, ...props }) => {
            const dateString = format(date, 'yyyy-MM-dd');
            const price = priceData[dateString];
            return (
              <div className="flex flex-col items-center justify-center h-full">
                <span {...props}>{format(date, 'd')}</span>
                {price && (
                  <span className="text-[10px] text-emerald-600 font-medium">
                    ₹{price}
                  </span>
                )}
              </div>
            );
          },
        }}
      />
      <div className="text-center text-sm">
        <p className="font-medium">Selected Date:</p>
        <p>{selected ? format(selected, 'PP') : 'Select date'}</p>
        {selected && priceData[format(selected, 'yyyy-MM-dd')] && (
          <p className="text-emerald-600 font-medium">
            ₹{priceData[format(selected, 'yyyy-MM-dd')]} - ₹{Math.floor(priceData[format(selected, 'yyyy-MM-dd')] * 1.1)} 
          </p>
        )}
      </div>
    </div>
  );
}

// Calendar in a popover for flight search form
export function FlightSearchDatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">Flight Search</h3>
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select departure date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </PopoverContent>
        </Popover>
        <div className="mt-2 text-sm">
          <p>Selected departure date: {date ? format(date, 'PPP') : 'None'}</p>
          <p className="text-gray-500">Bengaluru (BLR) to London (LHR)</p>
        </div>
      </div>
    </div>
  );
} 