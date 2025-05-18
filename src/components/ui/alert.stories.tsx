import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Button } from './button';
import {
  AlertCircle,
  AlertTriangle,
  Clock,
  Plane,
  Info,
  CheckCircle,
  Umbrella,
  Waves,
  Landmark,
} from 'lucide-react';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

// Basic alert example
export const Default: Story = {
  args: {
    className: 'w-[450px]',
    children: (
      <>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          This is an important alert message.
        </AlertDescription>
      </>
    ),
  },
};

// Destructive alert example
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    className: 'w-[450px]',
    children: (
      <>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </>
    ),
  },
};

// Flight delay alert
export function FlightDelayAlert() {
  return (
    <Alert variant="destructive" className="w-[450px] border-red-600">
      <AlertTriangle className="h-5 w-5" />
      <div className="ml-3">
        <AlertTitle className="text-red-600">Flight Delayed</AlertTitle>
        <AlertDescription className="mt-1">
          <p className="mb-2">Air India flight AI-505 from Bengaluru to Delhi has been delayed by 45 minutes.</p>
          <div className="flex justify-between text-sm font-medium mt-2">
            <div>New departure time:</div>
            <div>08:15 (originally 07:30)</div>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
}

// Flight cancellation alert
export function FlightCancellationAlert() {
  return (
    <Alert variant="destructive" className="w-[450px] bg-red-50">
      <AlertCircle className="h-5 w-5 text-red-600" />
      <div className="ml-3">
        <AlertTitle className="text-red-600">Flight Cancelled</AlertTitle>
        <AlertDescription className="mt-1">
          <p className="mb-2">IndiGo flight 6E-456 from Mumbai to Chennai on August 23 has been cancelled due to operational constraints.</p>
          <div className="mt-3 flex justify-between">
            <Button variant="outline" size="sm" className="text-xs">View alternatives</Button>
            <Button variant="default" size="sm" className="text-xs bg-red-600 hover:bg-red-700">Request refund</Button>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
}

// Weather advisory alert
export function WeatherAdvisoryAlert() {
  return (
    <Alert className="w-[450px] border-amber-500 bg-amber-50">
      <AlertTriangle className="h-5 w-5 text-amber-600" />
      <div className="ml-3">
        <AlertTitle className="text-amber-800">Weather Advisory</AlertTitle>
        <AlertDescription className="mt-1 text-amber-700">
          <p className="mb-2">Thunderstorms expected in the Mumbai area today. Flights may experience turbulence and possible delays.</p>
          <div className="mt-2 flex items-center text-xs">
            <Umbrella className="h-3 w-3 mr-1" />
            <span>Carry rain protection if traveling to Mumbai</span>
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
}

// Boarding alert
export function BoardingAlert() {
  return (
    <Alert className="w-[450px] border-green-500 bg-green-50">
      <div className="flex">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <div className="ml-3">
          <AlertTitle className="text-green-800">Boarding Now</AlertTitle>
          <AlertDescription className="mt-1 text-green-700">
            <p className="text-sm">
              Air India AI-505 | Bengaluru to Delhi | Gate 14B
            </p>
            <div className="flex items-center text-xs mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Boarding closes in 20 minutes</span>
            </div>
            <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700 text-xs">
              View boarding pass
            </Button>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

// Check-in reminder
export function CheckInReminderAlert() {
  return (
    <Alert className="w-[450px] border-blue-500 bg-blue-50">
      <div className="flex">
        <Clock className="h-5 w-5 text-blue-600" />
        <div className="ml-3">
          <AlertTitle className="text-blue-800">Check-in Open</AlertTitle>
          <AlertDescription className="mt-1 text-blue-700">
            <p className="mb-2">Web check-in is now open for your IndiGo flight 6E-789 from Delhi to Goa on August 25.</p>
            <div className="flex justify-between text-sm mt-2">
              <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700">
                Check-in now
              </Button>
              <div className="text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Closes 2 hours before departure</span>
              </div>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

// Gate change alert
export function GateChangeAlert() {
  return (
    <Alert className="w-[450px] border-amber-500 bg-amber-50">
      <div className="flex">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <div className="ml-3">
          <AlertTitle className="text-amber-800">Gate Change</AlertTitle>
          <AlertDescription className="mt-1 text-amber-700">
            <div className="space-y-2">
              <p className="text-sm">
                Your flight SpiceJet SG-105 from Bengaluru to Hyderabad has changed gates.
              </p>
              <div className="flex items-center justify-between text-sm p-2 bg-white rounded-md border border-amber-200">
                <div className="flex items-center">
                  <span className="text-amber-800 line-through">Gate 9A</span>
                </div>
                <div className="h-0.5 w-5 bg-amber-500"></div>
                <div className="flex items-center">
                  <span className="text-amber-900 font-medium">Gate 12C</span>
                </div>
              </div>
              <div className="text-xs flex items-center">
                <Info className="h-3 w-3 mr-1" />
                <span>Terminal remains unchanged (Terminal 1)</span>
              </div>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

// Travel advisory alert
export function TravelAdvisoryAlert() {
  return (
    <Alert className="w-[450px] border-indigo-500 bg-indigo-50">
      <div className="flex">
        <Info className="h-5 w-5 text-indigo-600" />
        <div className="ml-3">
          <AlertTitle className="text-indigo-800">Travel Advisory</AlertTitle>
          <AlertDescription className="mt-1 text-indigo-700">
            <p className="mb-2">Increased security measures at Delhi Airport. Please arrive 3 hours prior to international flights.</p>
            <div className="mt-2 text-xs space-y-1">
              <div className="flex items-center">
                <Landmark className="h-3 w-3 mr-1" />
                <span>Carry valid ID proof for all passengers</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Security checks may take longer than usual</span>
              </div>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

// Special requirements alert
export function SpecialRequirementsAlert() {
  return (
    <Alert className="w-[450px] border-purple-500 bg-purple-50">
      <div className="flex">
        <Plane className="h-5 w-5 text-purple-600" />
        <div className="ml-3">
          <AlertTitle className="text-purple-800">Special Requirements Confirmed</AlertTitle>
          <AlertDescription className="mt-1 text-purple-700">
            <p className="text-sm">
              Your special meal request (Vegetarian Hindu Meal) has been confirmed for your Air India flight AI-861 from Delhi to Bangkok.
            </p>
            <div className="mt-2 p-2 bg-white rounded-md border border-purple-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-purple-800">Flight</span>
                <span className="font-medium">AI-861</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-800">Date</span>
                <span className="font-medium">30 Aug 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-800">Seat</span>
                <span className="font-medium">18D (Aisle)</span>
              </div>
            </div>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

// Monsoon travel alert
export function MonsoonTravelAlert() {
  return (
    <Alert className="w-[450px] border-cyan-500 bg-cyan-50">
      <div className="flex">
        <Waves className="h-5 w-5 text-cyan-600" />
        <div className="ml-3">
          <AlertTitle className="text-cyan-800">Monsoon Travel Alert</AlertTitle>
          <AlertDescription className="mt-1 text-cyan-700">
            <p className="mb-2">Heavy rainfall expected in Kerala, Chennai, and Mumbai regions during your travel dates (25-30 August).</p>
            <div className="mt-3 space-y-1 text-xs">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Plan for potential delays in these regions</span>
              </div>
              <div className="flex items-center">
                <Umbrella className="h-3 w-3 mr-1" />
                <span>Carry rain gear and waterproof essentials</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-3 text-xs border-cyan-500 text-cyan-700 hover:bg-cyan-100">
              View weather forecast
            </Button>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
} 