import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';
import { Clock, Check, X, AlertTriangle, Plane, CreditCard, MapPin, Wifi, Utensils, Shield } from 'lucide-react';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

// Flight-specific badges

export function FlightStatusBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1.5">
        <Check className="h-3 w-3" />
        <span>On Time</span>
      </Badge>
      
      <Badge className="bg-amber-500 hover:bg-amber-600 flex items-center gap-1.5">
        <Clock className="h-3 w-3" />
        <span>Delayed</span>
      </Badge>
      
      <Badge className="bg-red-500 hover:bg-red-600 flex items-center gap-1.5">
        <X className="h-3 w-3" />
        <span>Cancelled</span>
      </Badge>
      
      <Badge className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1.5">
        <Plane className="h-3 w-3" />
        <span>Boarding</span>
      </Badge>
      
      <Badge className="bg-purple-500 hover:bg-purple-600 flex items-center gap-1.5">
        <Plane className="h-3 w-3" />
        <span>Landed</span>
      </Badge>
    </div>
  );
}

export function FlightClassBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100">
        Economy
      </Badge>
      
      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
        Premium Economy
      </Badge>
      
      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100">
        Business
      </Badge>
      
      <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100">
        First Class
      </Badge>
    </div>
  );
}

export function AirlineBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-indigo-500 hover:bg-indigo-600">
        IndiGo
      </Badge>
      
      <Badge className="bg-red-500 hover:bg-red-600">
        Air India
      </Badge>
      
      <Badge className="bg-amber-500 hover:bg-amber-600">
        SpiceJet
      </Badge>
      
      <Badge className="bg-blue-500 hover:bg-blue-600">
        Vistara
      </Badge>
      
      <Badge className="bg-green-500 hover:bg-green-600">
        Go First
      </Badge>
    </div>
  );
}

export function PromotionalBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-green-500 hover:bg-green-600">
        20% OFF
      </Badge>
      
      <Badge className="bg-amber-500 hover:bg-amber-600">
        SALE
      </Badge>
      
      <Badge className="bg-purple-500 hover:bg-purple-600">
        Diwali Special
      </Badge>
      
      <Badge className="bg-blue-500 hover:bg-blue-600">
        Weekend Deal
      </Badge>
      
      <Badge className="bg-rose-500 hover:bg-rose-600">
        Monsoon Offer
      </Badge>
    </div>
  );
}

export function PriceBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-emerald-500 hover:bg-emerald-600">
        ₹1,999 only
      </Badge>
      
      <Badge className="bg-blue-500 hover:bg-blue-600">
        Price Drop
      </Badge>
      
      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100">
        <span className="line-through">₹4,500</span> <span className="font-bold">₹3,299</span>
      </Badge>
      
      <Badge className="bg-amber-500 hover:bg-amber-600">
        Best Value
      </Badge>
    </div>
  );
}

export function ConnectivityBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 flex items-center gap-1.5">
        <Check className="h-3 w-3" />
        <span>Direct Flight</span>
      </Badge>
      
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1.5">
        <Plane className="h-3 w-3" />
        <span>1 Stop</span>
      </Badge>
      
      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-1.5">
        <Clock className="h-3 w-3" />
        <span>2+ Stops</span>
      </Badge>
    </div>
  );
}

export function LuggageBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100">
        15kg Check-in
      </Badge>
      
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100">
        7kg Cabin
      </Badge>
      
      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 flex items-center gap-1.5">
        <AlertTriangle className="h-3 w-3" />
        <span>Extra Baggage</span>
      </Badge>
    </div>
  );
}

export function FareBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-red-500 hover:bg-red-600">
        Saver
      </Badge>
      
      <Badge className="bg-amber-500 hover:bg-amber-600">
        Value
      </Badge>
      
      <Badge className="bg-blue-500 hover:bg-blue-600">
        Flexi
      </Badge>
      
      <Badge className="bg-emerald-500 hover:bg-emerald-600">
        Premium
      </Badge>
    </div>
  );
}

export function AmenityBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-1.5">
        <Wifi className="h-3 w-3" />
        <span>Wi-Fi</span>
      </Badge>
      
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-1.5">
        <Utensils className="h-3 w-3" />
        <span>Meals</span>
      </Badge>
      
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-1.5">
        <Shield className="h-3 w-3" />
        <span>Travel Insurance</span>
      </Badge>
      
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-1.5">
        <CreditCard className="h-3 w-3" />
        <span>EMI Available</span>
      </Badge>
    </div>
  );
}

export function LocationBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="secondary" className="flex items-center gap-1.5">
        <MapPin className="h-3 w-3" />
        <span>BLR Bengaluru</span>
      </Badge>
      
      <Badge variant="secondary" className="flex items-center gap-1.5">
        <MapPin className="h-3 w-3" />
        <span>DEL Delhi</span>
      </Badge>
      
      <Badge variant="secondary" className="flex items-center gap-1.5">
        <MapPin className="h-3 w-3" />
        <span>BOM Mumbai</span>
      </Badge>
      
      <Badge variant="secondary" className="flex items-center gap-1.5">
        <MapPin className="h-3 w-3" />
        <span>MAA Chennai</span>
      </Badge>
      
      <Badge variant="secondary" className="flex items-center gap-1.5">
        <MapPin className="h-3 w-3" />
        <span>GOI Goa</span>
      </Badge>
    </div>
  );
}

export function RecommendationBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge className="bg-blue-500 hover:bg-blue-600">
        Recommended
      </Badge>
      
      <Badge className="bg-amber-500 hover:bg-amber-600">
        Best Seller
      </Badge>
      
      <Badge className="bg-emerald-500 hover:bg-emerald-600">
        Trending
      </Badge>
      
      <Badge className="bg-rose-500 hover:bg-rose-600">
        Popular
      </Badge>
      
      <Badge className="bg-purple-500 hover:bg-purple-600">
        Eco-friendly
      </Badge>
    </div>
  );
} 