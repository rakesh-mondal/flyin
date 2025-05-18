import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator';
import { 
  Plane, 
  Clock, 
  CalendarDays, 
  MapPin, 
  CreditCard, 
  Luggage, 
  Shield, 
  Users,
  Phone
} from 'lucide-react';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

// Default separator
export const Default: Story = {
  args: {
    className: 'my-4',
  },
};

// Vertical separator
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-6 mx-4',
  },
  render: (args) => (
    <div className="flex items-center">
      <span>Item 1</span>
      <Separator {...args} />
      <span>Item 2</span>
    </div>
  ),
};

// Flight itinerary separator
export function FlightItinerary() {
  return (
    <div className="w-full max-w-md space-y-4 p-4">
      <h3 className="text-lg font-medium">Delhi to Mumbai</h3>
      <p className="text-sm text-muted-foreground">15 Aug 2023 • 1 Passenger</p>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between">
        <div className="space-y-1">
          <div className="text-sm font-medium">06:30</div>
          <div className="text-xs text-muted-foreground">Delhi (DEL)</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" /> Terminal 3
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-xs font-medium">2h 15m</div>
          <div className="flex items-center">
            <div className="h-[1px] w-12 bg-gray-300"></div>
            <Plane className="h-3 w-3 text-blue-500" />
            <div className="h-[1px] w-12 bg-gray-300"></div>
          </div>
          <div className="text-xs text-muted-foreground">Non-stop</div>
        </div>
        
        <div className="space-y-1 text-right">
          <div className="text-sm font-medium">08:45</div>
          <div className="text-xs text-muted-foreground">Mumbai (BOM)</div>
          <div className="flex items-center justify-end text-xs text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" /> Terminal 2
          </div>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Plane className="mr-2 h-4 w-4 text-blue-600" />
            <span>Air India AI-506</span>
          </div>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">On Time</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Luggage className="mr-2 h-4 w-4 text-gray-500" />
            <span>Baggage</span>
          </div>
          <span>20kg</span>
        </div>
      </div>
    </div>
  );
}

// Flight booking steps
export function BookingSteps() {
  return (
    <div className="w-full max-w-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
            <Plane className="h-4 w-4" />
          </div>
          <div className="mt-2 text-xs font-medium">Select Flight</div>
        </div>
        
        <Separator className="w-20" />
        
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
            <Users className="h-4 w-4" />
          </div>
          <div className="mt-2 text-xs font-medium text-gray-600">Traveler Details</div>
        </div>
        
        <Separator className="w-20" />
        
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
            <CreditCard className="h-4 w-4" />
          </div>
          <div className="mt-2 text-xs font-medium text-gray-600">Payment</div>
        </div>
        
        <Separator className="w-20" />
        
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600">
            <Shield className="h-4 w-4" />
          </div>
          <div className="mt-2 text-xs font-medium text-gray-600">Confirmation</div>
        </div>
      </div>
    </div>
  );
}

// Flight fare breakdown
export function FareBreakdown() {
  return (
    <div className="w-full max-w-md rounded-lg border p-4">
      <h4 className="text-base font-medium">Fare Details</h4>
      <p className="text-xs text-muted-foreground">Delhi to Mumbai • 15 Aug 2023</p>
      
      <Separator className="my-4" />
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Base Fare</span>
          <span className="font-medium">₹6,840</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Fee & Surcharges</span>
          <span className="font-medium">₹560</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>GST</span>
          <span className="font-medium">₹99</span>
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex justify-between text-sm font-medium">
          <span>Total Amount</span>
          <span className="text-base text-blue-600">₹7,499</span>
        </div>
      </div>
    </div>
  );
}

// Flight search filters
export function SearchFilters() {
  return (
    <div className="flex w-full max-w-md flex-col space-y-3 rounded-lg border p-4">
      <h4 className="text-base font-medium">Filter Results</h4>
      
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700">
            Non-Stop
          </div>
          <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700">
            1 Stop
          </div>
          <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
            2+ Stops
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-1">
          <h5 className="text-sm font-medium">Airlines</h5>
          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700">
              Air India
            </div>
            <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700">
              IndiGo
            </div>
            <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
              SpiceJet
            </div>
            <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
              Vistara
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-1">
          <h5 className="text-sm font-medium">Departure Time</h5>
          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700">
              Early Morning
            </div>
            <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
              Morning
            </div>
            <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
              Afternoon
            </div>
            <div className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700">
              Evening
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-1">
          <h5 className="text-sm font-medium">Price Range</h5>
          <div className="text-xs text-muted-foreground">
            ₹4,499 - ₹12,699
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact information section
export function ContactInformation() {
  return (
    <div className="w-full max-w-md space-y-4 p-4">
      <h3 className="text-lg font-medium">Contact Information</h3>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Phone className="h-4 w-4" />
          </div>
          <div className="ml-3">
            <p className="font-medium">Customer Support</p>
            <p className="text-sm text-muted-foreground">24x7 Helpline</p>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3 text-center">
            <p className="text-sm font-medium">Domestic</p>
            <p className="text-sm text-blue-600">1800-123-4567</p>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <p className="text-sm font-medium">International</p>
            <p className="text-sm text-blue-600">+91-124-456-7890</p>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Plane className="h-4 w-4" />
          </div>
          <div className="ml-3">
            <p className="font-medium">Airport Information</p>
            <p className="text-sm text-muted-foreground">Flight Status & Updates</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3 text-center">
            <p className="text-sm font-medium">Delhi (DEL)</p>
            <p className="text-sm text-blue-600">011-2345-6789</p>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <p className="text-sm font-medium">Mumbai (BOM)</p>
            <p className="text-sm text-blue-600">022-6789-1234</p>
          </div>
        </div>
      </div>
    </div>
  );
} 