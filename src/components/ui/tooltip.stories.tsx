import type { Meta, StoryObj } from '@storybook/react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from './tooltip';
import { Button } from './button';
import { Info, HelpCircle, AlertCircle, Clock, Package, Users } from 'lucide-react';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(Story) => (
    <TooltipProvider>
      <Story />
    </TooltipProvider>
  )],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Basic tooltip example
export const Basic = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <Info className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Basic tooltip information</p>
    </TooltipContent>
  </Tooltip>
);

// Flight fare rules tooltip
export const FareRules = () => (
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium">Economy</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-gray-400 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="w-[200px]">
          <div className="text-xs">
            <p className="font-medium">Economy Class</p>
            <ul className="list-disc pl-3 mt-1 space-y-1">
              <li>1 checked bag (23kg)</li>
              <li>Free seat selection</li>
              <li>Free meals</li>
              <li>₹3,500 cancellation fee</li>
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
    
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium">Business</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-gray-400 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="w-[200px]">
          <div className="text-xs">
            <p className="font-medium">Business Class</p>
            <ul className="list-disc pl-3 mt-1 space-y-1">
              <li>2 checked bags (32kg each)</li>
              <li>Priority boarding</li>
              <li>Premium meals and drinks</li>
              <li>Access to lounge</li>
              <li>₹5,000 cancellation fee</li>
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
);

// Baggage allowance tooltip
export const BaggageAllowance = () => (
  <div className="flex items-center gap-2">
    <span className="text-sm">Baggage Allowance</span>
    <Tooltip>
      <TooltipTrigger asChild>
        <Package className="h-4 w-4 text-gray-500 cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="w-[220px]">
        <div className="text-xs space-y-2">
          <div>
            <p className="font-medium">Checked Baggage</p>
            <p>1 bag up to 23kg included</p>
            <p className="text-gray-500">Additional bags: ₹2,000 per bag</p>
          </div>
          <div>
            <p className="font-medium">Cabin Baggage</p>
            <p>1 bag up to 7kg (55x35x25cm)</p>
            <p className="text-gray-500">Plus 1 personal item (laptop/handbag)</p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  </div>
);

// Layover information tooltip
export const LayoverInfo = () => (
  <div className="flex items-center gap-2">
    <span className="text-sm">Layover: 2h 45m at Dubai (DXB)</span>
    <Tooltip>
      <TooltipTrigger asChild>
        <Clock className="h-4 w-4 text-gray-500 cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="w-[250px]">
        <div className="text-xs space-y-2">
          <p className="font-medium">Layover Information</p>
          <div className="grid grid-cols-2 gap-x-2">
            <p className="text-gray-500">Arrival Terminal:</p>
            <p>Terminal 3</p>
            <p className="text-gray-500">Departure Terminal:</p>
            <p>Terminal 3</p>
            <p className="text-gray-500">Minimum Connection Time:</p>
            <p>1h 15m</p>
            <p className="text-gray-500">Terminal Transfer:</p>
            <p>Not Required</p>
          </div>
          <p className="text-emerald-600 text-[10px] font-medium">✓ Sufficient connection time</p>
        </div>
      </TooltipContent>
    </Tooltip>
  </div>
);

// Fare breakdown tooltip
export const FareBreakdown = () => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium">₹42,500</span>
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="w-[220px]">
        <div className="text-xs space-y-1">
          <p className="font-medium">Fare Breakdown</p>
          <div className="grid grid-cols-2 gap-x-2 mt-1">
            <p className="text-gray-500">Base Fare:</p>
            <p className="text-right">₹36,750</p>
            <p className="text-gray-500">Fuel Surcharge:</p>
            <p className="text-right">₹2,500</p>
            <p className="text-gray-500">Airport Taxes:</p>
            <p className="text-right">₹2,850</p>
            <p className="text-gray-500">Service Fee:</p>
            <p className="text-right">₹400</p>
            <div className="col-span-2 border-t border-gray-200 mt-1 pt-1"></div>
            <p className="font-medium">Total:</p>
            <p className="text-right font-medium">₹42,500</p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  </div>
);

// Seat selection fees tooltip
export const SeatSelectionFees = () => (
  <div className="flex items-center gap-2">
    <span className="text-sm">Seat Selection</span>
    <Tooltip>
      <TooltipTrigger asChild>
        <Users className="h-4 w-4 text-gray-500 cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="w-[220px]">
        <div className="text-xs space-y-2">
          <p className="font-medium">Seat Selection Fees</p>
          <div className="grid grid-cols-2 gap-x-2 mt-1">
            <p className="text-gray-500">Regular Seats:</p>
            <p>₹600 - ₹800</p>
            <p className="text-gray-500">Extra Legroom:</p>
            <p>₹1,200 - ₹1,800</p>
            <p className="text-gray-500">Bulkhead Seats:</p>
            <p>₹1,600 - ₹2,200</p>
            <p className="text-gray-500">Exit Row:</p>
            <p>₹1,400 - ₹2,000</p>
          </div>
          <p className="text-[10px] text-gray-500 pt-1">
            Prices may vary based on route and aircraft type
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  </div>
);

// Flight amenities tooltip
export const FlightAmenities = () => (
  <div className="flex items-center gap-2">
    <span className="text-sm">Flight Amenities</span>
    <Tooltip>
      <TooltipTrigger asChild>
        <AlertCircle className="h-4 w-4 text-gray-500 cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="w-[200px]">
        <div className="text-xs">
          <p className="font-medium">Boeing 787 Dreamliner</p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2">
            <p className="flex items-center">
              <span className="inline-block w-4">✓</span> Wi-Fi
            </p>
            <p className="flex items-center">
              <span className="inline-block w-4">✓</span> Power Outlets
            </p>
            <p className="flex items-center">
              <span className="inline-block w-4">✓</span> Entertainment
            </p>
            <p className="flex items-center">
              <span className="inline-block w-4">✓</span> Meals Included
            </p>
            <p className="flex items-center">
              <span className="inline-block w-4">✓</span> USB Charging
            </p>
            <p className="flex items-center">
              <span className="inline-block w-4">✗</span> Lie-Flat Seats
            </p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  </div>
); 