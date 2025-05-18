import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './hover-card';
import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { CalendarDays, Plane, MapPin, Info, Clock, CreditCard, Star, Shield, Users, ArrowUpDown, Utensils, Wifi, Luggage } from 'lucide-react';

const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof HoverCard>;

// Default hover card example
export const Default: Story = {
  args: {
    openDelay: 200,
  },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button variant="link">Hover over me</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

// Flight price trend hover card
export function FlightPriceTrend() {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>₹7,499</span>
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Price Trend: Delhi to Mumbai</h4>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
                Today
              </span>
              <span className="font-medium text-orange-600">₹7,499</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
                Next 7 days
              </span>
              <span className="font-medium text-green-600">₹6,899</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
                Next 30 days
              </span>
              <span className="font-medium text-blue-600">₹6,499</span>
            </div>
          </div>
          <div className="rounded-md bg-muted p-2 text-xs">
            <p className="flex items-center">
              <Info className="mr-1 h-3 w-3" />
              Prices are lowest typically on Tuesdays and Wednesdays
            </p>
          </div>
          <div className="pt-1 text-xs text-muted-foreground">
            Last updated 2 hours ago
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Flight details hover card
export function FlightDetails() {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="link" className="flex items-center gap-1">
          AI-506
          <Info className="h-3.5 w-3.5" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-semibold">Air India AI-506</h4>
                <p className="text-xs text-muted-foreground">Airbus A320neo</p>
              </div>
            </div>
            <div className="text-xs">
              <span className="rounded-sm bg-green-100 px-1.5 py-0.5 text-green-800">On Time</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>2h 15m</span>
              </div>
              <div className="text-xs text-muted-foreground">Non-stop flight</div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-gray-500" />
                <span>Departure</span>
              </div>
              <div className="font-medium">06:30 AM • 15 Aug</div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Terminal</span>
              </div>
              <div className="font-medium">T3, Delhi (DEL)</div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Plane className="h-4 w-4 text-gray-500 rotate-180" />
                <span>Arrival</span>
              </div>
              <div className="font-medium">08:45 AM • 15 Aug</div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Terminal</span>
              </div>
              <div className="font-medium">T2, Mumbai (BOM)</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
              <Wifi className="mr-1 h-3 w-3" /> Wi-Fi
            </span>
            <span className="flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
              <Utensils className="mr-1 h-3 w-3" /> Meal
            </span>
            <span className="flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
              <Luggage className="mr-1 h-3 w-3" /> 15kg
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Fare class details hover card
export function FareClassDetails() {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="h-auto p-1 text-sm underline decoration-dashed underline-offset-4">
          Economy Flexi
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <h4 className="text-sm font-semibold">Economy Flexi Benefits</h4>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="flex items-center">
                <Check className="mr-1.5 h-3.5 w-3.5 text-green-600" />
                Seat Selection
              </span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                <Check className="mr-1.5 h-3.5 w-3.5 text-green-600" />
                Flight Changes
              </span>
              <span className="text-green-600">₹1,500</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                <Check className="mr-1.5 h-3.5 w-3.5 text-green-600" />
                Cancellation
              </span>
              <span className="text-green-600">₹2,000</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                <Check className="mr-1.5 h-3.5 w-3.5 text-green-600" />
                Meal
              </span>
              <span className="text-green-600">Included</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                <Check className="mr-1.5 h-3.5 w-3.5 text-green-600" />
                Baggage
              </span>
              <span className="text-green-600">20kg</span>
            </div>
          </div>
          
          <div className="pt-2 text-xs text-muted-foreground">
            <p>Recommended for business travelers who need flexibility</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Airport information hover card
export function AirportInformation() {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="link" className="flex items-center gap-1">
          BOM
          <Info className="h-3.5 w-3.5" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold">Chhatrapati Shivaji International Airport</h4>
              <p className="text-xs text-muted-foreground">Mumbai, Maharashtra, India</p>
            </div>
            <div className="text-xs font-medium text-blue-600">BOM</div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-gray-500" />
              <span>24 km from city center</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              <span>Terminal 2 - International & Domestic</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-gray-500" />
              <span>48.8M passengers annually</span>
            </div>
          </div>
          
          <div className="space-y-1 rounded-md bg-blue-50 p-2 text-xs text-blue-700">
            <p className="font-medium">Terminal Tips:</p>
            <p>• Arrive 2 hours early for domestic flights</p>
            <p>• Free Wi-Fi available for 45 minutes</p>
            <p>• Premium lounge access at ₹1,500</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Payment options hover card
export function PaymentOptions() {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <CreditCard className="mr-1 h-4 w-4" />
          Payment Options
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Available Payment Methods</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Credit/Debit Cards</span>
              </div>
              <span className="text-xs text-green-600">No convenience fee</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Net Banking</span>
              </div>
              <span className="text-xs text-green-600">No convenience fee</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-sm">UPI</span>
              </div>
              <span className="text-xs text-green-600">No convenience fee</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-orange-600" />
                <span className="text-sm">EMI</span>
              </div>
              <span className="text-xs">From ₹1,250/month</span>
            </div>
          </div>
          
          <div className="rounded-md bg-blue-50 p-2 text-xs text-blue-700">
            <p className="flex items-center">
              <Star className="mr-1 h-3 w-3" />
              <span>
                Get 5% cashback up to ₹1,000 using HDFC Bank cards
              </span>
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Helper icon components
const Check = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Phone = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <line x1="12" x2="12.01" y1="18" y2="18" />
  </svg>
);

const Landmark = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <rect width="18" height="7" x="3" y="3" rx="1" />
  </svg>
);

const Wallet = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
); 