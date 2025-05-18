import type { Meta, StoryObj } from '@storybook/react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from './popover';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { CalendarIcon, ChevronDown, Plane, Clock, AlertCircle, Users } from 'lucide-react';
import { Calendar } from './calendar';
import { useState } from 'react';
import { format } from 'date-fns';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

// Basic popover example
export const Basic = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline">Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent className="w-80">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Basic Information</h4>
          <p className="text-sm text-muted-foreground">
            This is a basic popover example.
          </p>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              defaultValue="100%"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              defaultValue="25px"
              className="col-span-2 h-8"
            />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

// Flight date selector popover
export const FlightDateSelector = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-56 justify-between">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MMM dd, yyyy") : "Select departure date"}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        {date && (
          <div className="border-t border-border p-3">
            <Button variant="default" className="w-full">
              Confirm {format(date, "MMM dd, yyyy")}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

// Flight information popover
export const FlightInformation = () => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="h-8 text-xs">
        <Plane className="mr-1 h-3 w-3 rotate-45" />
        AI 308 Flight Details
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-96">
      <div className="grid gap-4">
        <div className="space-y-1">
          <h4 className="font-semibold">Air India AI 308</h4>
          <div className="text-sm flex items-center text-muted-foreground">
            <Plane className="mr-1 h-3 w-3 rotate-45" />
            <span>Boeing 787 Dreamliner</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Departure</p>
            <p className="font-medium">Bengaluru (BLR)</p>
            <p className="text-sm">09:45 AM, Terminal 1</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Arrival</p>
            <p className="font-medium">Delhi (DEL)</p>
            <p className="text-sm">12:35 PM, Terminal 3</p>
          </div>
        </div>
        <div className="border-t border-border pt-3 space-y-3">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Flight Duration: 2h 50m</p>
              <p className="text-xs text-muted-foreground">Non-stop flight</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">On-time Performance: 92%</p>
              <p className="text-xs text-muted-foreground">Based on last month's flights</p>
            </div>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

// Passenger selection popover
export const PassengerSelection = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  
  const totalPassengers = adults + children + infants;
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-56 justify-between">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            {totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium">Passenger Selection</h4>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Adults</p>
                <p className="text-xs text-muted-foreground">Ages 12+</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  disabled={adults <= 1}
                >
                  -
                </Button>
                <span className="w-5 text-center">{adults}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setAdults(Math.min(9, adults + 1))}
                  disabled={totalPassengers >= 9}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Children</p>
                <p className="text-xs text-muted-foreground">Ages 2-11</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  disabled={children <= 0}
                >
                  -
                </Button>
                <span className="w-5 text-center">{children}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setChildren(Math.min(8, children + 1))}
                  disabled={totalPassengers >= 9}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Infants</p>
                <p className="text-xs text-muted-foreground">Under 2</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setInfants(Math.max(0, infants - 1))}
                  disabled={infants <= 0}
                >
                  -
                </Button>
                <span className="w-5 text-center">{infants}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setInfants(Math.min(adults, infants + 1))}
                  disabled={infants >= adults || totalPassengers >= 9}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground border-t border-border pt-3">
            <p>• Maximum 9 passengers per booking</p>
            <p>• Infants must be under 2 years and sit on an adult's lap</p>
            <p>• Number of infants cannot exceed number of adults</p>
          </div>
          <Button>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}; 