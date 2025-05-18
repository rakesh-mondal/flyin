import type { Meta, StoryObj } from '@storybook/react';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue,
  SelectSeparator
} from './select';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

// Basic select example
export const Basic = () => (
  <Select>
    <SelectTrigger className="w-[280px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

// Flight class selection
export const FlightClass = () => (
  <Select>
    <SelectTrigger className="w-[280px]">
      <SelectValue placeholder="Select cabin class" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Cabin Class</SelectLabel>
        <SelectItem value="economy">Economy</SelectItem>
        <SelectItem value="premium-economy">Premium Economy</SelectItem>
        <SelectItem value="business">Business</SelectItem>
        <SelectItem value="first">First Class</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

// Passenger count selection
export const PassengerCount = () => (
  <div className="space-y-4">
    <div>
      <label className="text-sm font-medium mb-2 block">Adults</label>
      <Select defaultValue="1">
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select passenger count" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">1 Adult</SelectItem>
            <SelectItem value="2">2 Adults</SelectItem>
            <SelectItem value="3">3 Adults</SelectItem>
            <SelectItem value="4">4 Adults</SelectItem>
            <SelectItem value="5">5 Adults</SelectItem>
            <SelectItem value="6">6 Adults</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500 mt-1">Age 12+</p>
    </div>
    
    <div>
      <label className="text-sm font-medium mb-2 block">Children</label>
      <Select defaultValue="0">
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select children count" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="0">0 Children</SelectItem>
            <SelectItem value="1">1 Child</SelectItem>
            <SelectItem value="2">2 Children</SelectItem>
            <SelectItem value="3">3 Children</SelectItem>
            <SelectItem value="4">4 Children</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500 mt-1">Age 2-11</p>
    </div>
    
    <div>
      <label className="text-sm font-medium mb-2 block">Infants</label>
      <Select defaultValue="0">
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select infant count" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="0">0 Infants</SelectItem>
            <SelectItem value="1">1 Infant</SelectItem>
            <SelectItem value="2">2 Infants</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500 mt-1">Under 2 years</p>
    </div>
  </div>
);

// Departure airport selection with grouped options
export const DepartureAirport = () => (
  <Select>
    <SelectTrigger className="w-[280px]">
      <SelectValue placeholder="Select departure city" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Popular Cities in India</SelectLabel>
        <SelectItem value="DEL">Delhi (DEL)</SelectItem>
        <SelectItem value="BOM">Mumbai (BOM)</SelectItem>
        <SelectItem value="BLR">Bengaluru (BLR)</SelectItem>
        <SelectItem value="MAA">Chennai (MAA)</SelectItem>
        <SelectItem value="HYD">Hyderabad (HYD)</SelectItem>
        <SelectItem value="CCU">Kolkata (CCU)</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>International Hubs</SelectLabel>
        <SelectItem value="DXB">Dubai (DXB)</SelectItem>
        <SelectItem value="SIN">Singapore (SIN)</SelectItem>
        <SelectItem value="LHR">London (LHR)</SelectItem>
        <SelectItem value="JFK">New York (JFK)</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

// Airlines selection
export const Airlines = () => (
  <Select>
    <SelectTrigger className="w-[280px]">
      <SelectValue placeholder="Preferred airline" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Indian Carriers</SelectLabel>
        <SelectItem value="AI">Air India</SelectItem>
        <SelectItem value="UK">Vistara</SelectItem>
        <SelectItem value="6E">IndiGo</SelectItem>
        <SelectItem value="SG">SpiceJet</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>International Carriers</SelectLabel>
        <SelectItem value="EK">Emirates</SelectItem>
        <SelectItem value="QR">Qatar Airways</SelectItem>
        <SelectItem value="SQ">Singapore Airlines</SelectItem>
        <SelectItem value="BA">British Airways</SelectItem>
        <SelectItem value="LH">Lufthansa</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

// Complete flight search form with multiple selects
export const FlightSearchSelects = () => (
  <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-white w-[500px]">
    <h3 className="text-lg font-medium mb-2">Search for Flights</h3>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium mb-2 block">From</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Departure city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BLR">Bengaluru (BLR)</SelectItem>
            <SelectItem value="DEL">Delhi (DEL)</SelectItem>
            <SelectItem value="BOM">Mumbai (BOM)</SelectItem>
            <SelectItem value="MAA">Chennai (MAA)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">To</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Destination city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LHR">London (LHR)</SelectItem>
            <SelectItem value="JFK">New York (JFK)</SelectItem>
            <SelectItem value="DXB">Dubai (DXB)</SelectItem>
            <SelectItem value="SIN">Singapore (SIN)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Trip Type</label>
        <Select defaultValue="round">
          <SelectTrigger>
            <SelectValue placeholder="Select trip type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="round">Round Trip</SelectItem>
            <SelectItem value="one">One Way</SelectItem>
            <SelectItem value="multi">Multi-City</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Cabin Class</label>
        <Select defaultValue="economy">
          <SelectTrigger>
            <SelectValue placeholder="Select cabin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="economy">Economy</SelectItem>
            <SelectItem value="premium">Premium Economy</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="first">First Class</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    
    <div>
      <label className="text-sm font-medium mb-2 block">Passengers</label>
      <Select defaultValue="1_0_0">
        <SelectTrigger>
          <SelectValue placeholder="Select passengers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1_0_0">1 Adult</SelectItem>
          <SelectItem value="2_0_0">2 Adults</SelectItem>
          <SelectItem value="2_1_0">2 Adults, 1 Child</SelectItem>
          <SelectItem value="2_2_0">2 Adults, 2 Children</SelectItem>
          <SelectItem value="2_1_1">2 Adults, 1 Child, 1 Infant</SelectItem>
          <SelectItem value="2_2_1">2 Adults, 2 Children, 1 Infant</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
); 