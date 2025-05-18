import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';
import { Badge } from './badge';
import { Calendar, Clock, PlaneTakeoff, Heart, Share } from 'lucide-react';
import { SlidingNumber } from './sliding-number';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { MapPin, CreditCard, Plane, ArrowRight, Star, Shield, Luggage, Wifi } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px] border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const FlightResult: Story = {
  render: () => (
    <Card className="w-[450px] overflow-visible border border-gray-200 cursor-pointer transition-all duration-500">
      {/* Flight information section */}
      <div className="flex flex-col md:flex-row">
        {/* Left column for flights */}
        <div className="flex-grow p-4">
          {/* Save and Share buttons */}
          <div className="mb-4 flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5 rounded-full"
            >
              <Heart className="h-4 w-4" />
              <span>Save</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5 rounded-full"
            >
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
          
          {/* Outbound flight */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-xl font-bold">
                  09:25 – 13:40
                </div>
                <Badge variant="outline" className="bg-purple-50 text-xs text-purple-600 border-none">
                  Direct
                </Badge>
              </div>
              <div className="text-lg font-semibold">4h 15m</div>
            </div>
            
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <div>
                BLR Bengaluru – LHR London
              </div>
              <span className="font-medium">
                British Airways
              </span>
            </div>
          </div>
          
          {/* Return flight */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-xl font-bold">
                  19:50 – 19:20
                </div>
                <Badge variant="outline" className="bg-blue-50 text-xs text-blue-600 border-none">
                  1 stop
                </Badge>
              </div>
              <div className="text-lg font-semibold">19h 00m</div>
            </div>
            
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <div>
                LHR London – BLR Bengaluru
              </div>
              <span className="font-medium">
                British Airways
              </span>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            British Airways
          </div>
        </div>
        
        {/* Right column for price and action */}
        <div className="bg-gray-50 p-4 flex flex-col items-center justify-center border-l border-gray-200 min-w-[180px]">
          <div className="text-2xl font-bold">
            <span>₹</span>98,500
          </div>
          <div className="mb-1 text-xs text-gray-500">Economy</div>
          <Button 
            className="w-full rounded-md text-sm font-medium py-2 mt-2 bg-black text-white"
          >
            Select
          </Button>
        </div>
      </div>
    </Card>
  )
};

export const FlightSummary: Story = {
  render: () => (
    <Card className="w-[450px] mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm text-gray-500">Departure</p>
            <p className="flex items-center text-sm font-medium">
              <Calendar className="mr-1 h-3.5 w-3.5 text-gray-400" />
              Aug 12, 2024
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="flex items-center text-sm font-medium">
              <Clock className="mr-1 h-3.5 w-3.5 text-gray-400" />
              4h 15m
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-xl font-medium">₹98,500</p>
        </div>
      </div>
    </Card>
  )
};

export const BookingCard: Story = {
  render: () => (
    <Card className="w-[450px] sticky bottom-0 mt-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total price</p>
          <p className="text-2xl font-medium">₹98,500</p>
        </div>
        <Button
          className={cn(
            "rounded-full bg-black px-6 py-6 text-white hover:bg-black/90",
            "transition-all duration-300"
          )}
        >
          <span>Book with</span>
          <svg className="ml-2 h-4" viewBox="0 0 43 19" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.7 1.6c.4-.5 1.1-.9 1.9-.9.1 0 .3 0 .4.1-.1.1-.2.2-.3.3-1 1-1.2 2.8-.6 4.1.7-1.1 2.5-1.8 4-1.2-1 2.9-2.5 5.4-4.4 7.9-1.9 2.4-3.7 4.9-6.8 4.9H.8C.4 16.7 0 16.4 0 16v-5.8c0-.4.3-.7.7-.7h.1c3.1 0 3.8-2 6-2.7 1.3-.4 2.8-.9 3.9-1.5-1.1-1-2.8-2.3-4-3.7zm36.3 9c0 2.8-2.3 5.1-5.1 5.1H20.5c-.4 0-.7-.3-.7-.7V6.3c0-.4.3-.7.7-.7h17c3.3 0 5.5 2.3 5.5 5zm-15.2-1.8h-.7v-1.1h.7V7h1v.7h1.1v1h-1.1V10h-1V8.8zM28.7 7h1v3h-1V7zm-1.9 3h-1.1V7h1.1v3zm9.9-2h-3v-.9h3V8zm0 2h-3v-1h3v1z" fill="currentColor"/>
          </svg>
        </Button>
      </div>
    </Card>
  )
};

export function FlightCard() {
  return (
    <Card className="w-[380px]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="https://www.logodesign.net/logo/abstract-airplane-with-check-mark-4551ld.png" 
              alt="IndiGo" 
              className="h-6" 
            />
            <div>
              <CardTitle className="text-lg font-bold">IndiGo</CardTitle>
              <CardDescription className="text-xs">6E-4392</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            Economy
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-4 pt-2">
          <div className="text-center">
            <p className="text-2xl font-bold">07:55</p>
            <p className="text-xs text-gray-500">BLR</p>
          </div>
          <div className="flex-1 px-4">
            <div className="relative">
              <div className="flex-1 border-t border-dashed border-gray-300 my-3"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-2">
                <p className="text-xs text-gray-500">2h 15m</p>
              </div>
              <Plane className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 h-3 w-3" />
              <Plane className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90 text-blue-500 h-3 w-3" />
            </div>
            <p className="text-xs text-center text-gray-500 mt-1">Direct</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">10:10</p>
            <p className="text-xs text-gray-500">DEL</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-600">22 Aug</span>
          </div>
          <div className="flex items-center gap-1">
            <Luggage className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-600">15kg</span>
          </div>
          <div className="flex items-center gap-1">
            <Wifi className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-600">Wi-Fi</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-gray-100">
        <div>
          <p className="text-lg font-bold text-blue-600">₹4,250</p>
          <p className="text-xs text-gray-500">per person</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Select Flight
        </Button>
      </CardFooter>
    </Card>
  );
}

export function PromotionalCard() {
  return (
    <Card className="w-[380px] bg-gradient-to-r from-indigo-50 to-blue-50 border-blue-100">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-indigo-700">Monsoon Special Offer</CardTitle>
            <CardDescription className="text-indigo-500">Limited time deals on flights across India</CardDescription>
          </div>
          <Badge className="bg-amber-500 hover:bg-amber-600">20% OFF</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/80 border border-blue-100">
            <div className="rounded-full bg-blue-100 p-2">
              <Plane className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Delhi to Goa</p>
              <p className="text-xs text-gray-500">Starting from ₹3,799</p>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-500" />
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/80 border border-blue-100">
            <div className="rounded-full bg-blue-100 p-2">
              <Plane className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Mumbai to Kochi</p>
              <p className="text-xs text-gray-500">Starting from ₹2,999</p>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-500" />
          </div>
          
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/80 border border-blue-100">
            <div className="rounded-full bg-blue-100 p-2">
              <Plane className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Bengaluru to Chennai</p>
              <p className="text-xs text-gray-500">Starting from ₹1,999</p>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-500" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-blue-100">
        <div className="flex items-center text-xs text-blue-600 w-full justify-between">
          <p>Use code: <span className="font-bold">MONSOON24</span></p>
          <p>Valid till 31 August</p>
        </div>
      </CardFooter>
    </Card>
  );
}

export function HotelPackageCard() {
  return (
    <Card className="w-[380px] overflow-hidden">
      <div className="relative h-48">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Taj Palace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold">Taj Palace, New Delhi</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-xs text-white ml-2">5-star luxury</span>
          </div>
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Diplomatic Enclave</p>
              <p className="text-xs text-gray-500">2.5 km from city center</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            4.8/5
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs">
            <div className="rounded-full bg-blue-100 p-1">
              <Wifi className="h-3 w-3 text-blue-600" />
            </div>
            <span>Free WiFi</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <div className="rounded-full bg-blue-100 p-1">
              <Shield className="h-3 w-3 text-blue-600" />
            </div>
            <span>Front Desk 24/7</span>
          </div>
        </div>
        
        <div className="p-2 bg-amber-50 rounded-md border border-amber-100 mb-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-amber-100 p-1">
              <Calendar className="h-3 w-3 text-amber-600" />
            </div>
            <div className="text-xs text-amber-800">
              <span className="font-medium">Flight + Hotel Package</span>
              <p>3 nights, 2 adults</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-100 pt-3">
        <div>
          <div className="flex items-center gap-1">
            <p className="text-lg font-bold text-blue-600">₹36,999</p>
            <p className="text-xs text-gray-400 line-through">₹45,500</p>
          </div>
          <p className="text-xs text-gray-500">includes flight + taxes</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
          View Deal
        </Button>
      </CardFooter>
    </Card>
  );
}

export function TravelerProfileCard() {
  return (
    <Card className="w-[380px]">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-blue-100">
              <AvatarImage src="https://i.pravatar.cc/300" alt="Rajesh Kumar" />
              <AvatarFallback className="bg-blue-100 text-blue-600">RK</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Rajesh Kumar</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>Gold Tier Member</span>
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            875 points
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">15 Flights</p>
                <p className="text-xs text-gray-500">in last 12 months</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">6 Cities</p>
                <p className="text-xs text-gray-500">visited</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-md p-3">
            <p className="text-sm font-medium mb-2">Travel Preferences</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <div className="rounded-full bg-blue-100 p-1">
                  <Badge className="h-2 w-2 bg-blue-600" />
                </div>
                <span className="text-xs">Window seat</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="rounded-full bg-blue-100 p-1">
                  <Badge className="h-2 w-2 bg-blue-600" />
                </div>
                <span className="text-xs">Vegetarian meal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="rounded-full bg-blue-100 p-1">
                  <Badge className="h-2 w-2 bg-blue-600" />
                </div>
                <span className="text-xs">Early check-in</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="rounded-full bg-blue-100 p-1">
                  <Badge className="h-2 w-2 bg-blue-600" />
                </div>
                <span className="text-xs">Extra legroom</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-3 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs">
          Edit Profile
        </Button>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
          Book New Trip
        </Button>
      </CardFooter>
    </Card>
  );
}

export function PaymentSummaryCard() {
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="text-lg">Payment Summary</CardTitle>
        <CardDescription>Air India AI-505 • Delhi to Mumbai</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Base fare (2 adults)</p>
            <p>₹8,500</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Taxes & surcharges</p>
            <p>₹1,250</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Baggage (extra 10kg)</p>
            <p>₹800</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Seat selection (2×)</p>
            <p>₹400</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Meal preference</p>
            <p>₹350</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Travel insurance</p>
            <p>₹699</p>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <p>MONSOON24 discount</p>
            <p>-₹1,200</p>
          </div>
          <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between font-medium">
            <p>Total Amount</p>
            <p className="text-blue-600">₹10,799</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 w-full p-2 rounded-md bg-gray-50">
          <CreditCard className="h-4 w-4 text-gray-500" />
          <div className="flex-1">
            <p className="text-sm font-medium">HDFC Bank Credit Card</p>
            <p className="text-xs text-gray-500">Ending with 4352</p>
          </div>
          <Badge variant="outline" className="text-xs">Change</Badge>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Pay ₹10,799
        </Button>
        <p className="text-xs text-center text-gray-500">
          By clicking "Pay", you agree to our terms and conditions
        </p>
      </CardFooter>
    </Card>
  );
} 