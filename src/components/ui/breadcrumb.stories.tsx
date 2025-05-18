import type { Meta, StoryObj } from '@storybook/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';
import { 
  Home, 
  Plane, 
  User, 
  CreditCard, 
  Check, 
  Search, 
  Map, 
  Calendar, 
  Building, 
  Luggage,
  FileText,
  HelpCircle 
} from 'lucide-react';

const meta = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Default basic breadcrumb
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

// Flight booking process breadcrumb
export function FlightBookingProcess() {
  return (
    <Breadcrumb className="max-w-xl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/search" className="flex items-center">
            <Search className="mr-1 h-3.5 w-3.5" />
            <span>Search</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/select-flights" className="flex items-center font-medium text-blue-600">
            <Plane className="mr-1 h-3.5 w-3.5" />
            <span>Select Flights</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/passenger-details" className="flex items-center text-gray-400">
            <User className="mr-1 h-3.5 w-3.5" />
            <span>Passenger Details</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/payment" className="flex items-center text-gray-400">
            <CreditCard className="mr-1 h-3.5 w-3.5" />
            <span>Payment</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/confirmation" className="flex items-center text-gray-400">
            <Check className="mr-1 h-3.5 w-3.5" />
            <span>Confirmation</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Domestic flight search breadcrumb
export function DomesticFlightSearch() {
  return (
    <Breadcrumb className="max-w-xl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Home className="mr-1 h-3.5 w-3.5" />
            <span>Flyin</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/flights" className="flex items-center">
            <Plane className="mr-1 h-3.5 w-3.5" />
            <span>Flights</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/flights/domestic" className="flex items-center">
            <Map className="mr-1 h-3.5 w-3.5" />
            <span>Domestic</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center">
            <Building className="mr-1 h-3.5 w-3.5" />
            <span>Delhi to Mumbai</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// International flight search breadcrumb
export function InternationalFlightSearch() {
  return (
    <Breadcrumb className="max-w-xl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Home className="mr-1 h-3.5 w-3.5" />
            <span>Flyin</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/flights" className="flex items-center">
            <Plane className="mr-1 h-3.5 w-3.5" />
            <span>Flights</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/flights/international" className="flex items-center">
            <Map className="mr-1 h-3.5 w-3.5" />
            <span>International</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center">
            <Building className="mr-1 h-3.5 w-3.5" />
            <span>Delhi to Singapore</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Trip management breadcrumb
export function TripManagement() {
  return (
    <Breadcrumb className="max-w-xl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Home className="mr-1 h-3.5 w-3.5" />
            <span>Flyin</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/account" className="flex items-center">
            <User className="mr-1 h-3.5 w-3.5" />
            <span>My Account</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/account/trips" className="flex items-center">
            <Plane className="mr-1 h-3.5 w-3.5" />
            <span>My Trips</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center">
            <FileText className="mr-1 h-3.5 w-3.5" />
            <span>Trip #FL7845</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Holiday package breadcrumb
export function HolidayPackage() {
  return (
    <Breadcrumb className="max-w-xl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Home className="mr-1 h-3.5 w-3.5" />
            <span>Flyin</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/holidays" className="flex items-center">
            <Calendar className="mr-1 h-3.5 w-3.5" />
            <span>Holiday Packages</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/holidays/kerala" className="flex items-center">
            <Map className="mr-1 h-3.5 w-3.5" />
            <span>Kerala</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center">
            <Building className="mr-1 h-3.5 w-3.5" />
            <span>Kerala Backwaters & Beach Stay</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Multi-city flight booking breadcrumb
export function MultiCityFlightSearch() {
  return (
    <Breadcrumb className="max-w-xl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Home className="mr-1 h-3.5 w-3.5" />
            <span>Flyin</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/flights" className="flex items-center">
            <Plane className="mr-1 h-3.5 w-3.5" />
            <span>Flights</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/flights/multi-city" className="flex items-center">
            <Map className="mr-1 h-3.5 w-3.5" />
            <span>Multi-City</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center">
            <Building className="mr-1 h-3.5 w-3.5" />
            <span>Delhi-Mumbai-Chennai</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Post-booking baggage selection breadcrumb
export function BaggageSelection() {
  return (
    <Breadcrumb className="max-w-xl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/account" className="flex items-center">
            <User className="mr-1 h-3.5 w-3.5" />
            <span>My Account</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/account/trips" className="flex items-center">
            <Plane className="mr-1 h-3.5 w-3.5" />
            <span>My Trips</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/account/trips/AI-505" className="flex items-center">
            <FileText className="mr-1 h-3.5 w-3.5" />
            <span>AI-505</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center">
            <Luggage className="mr-1 h-3.5 w-3.5" />
            <span>Baggage Selection</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Help center breadcrumb
export function HelpCenter() {
  return (
    <Breadcrumb className="max-w-xl">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center">
            <Home className="mr-1 h-3.5 w-3.5" />
            <span>Flyin</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/help" className="flex items-center">
            <HelpCircle className="mr-1 h-3.5 w-3.5" />
            <span>Help Center</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/help/cancellation" className="flex items-center">
            <FileText className="mr-1 h-3.5 w-3.5" />
            <span>Cancellation Policy</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center">
            <Plane className="mr-1 h-3.5 w-3.5" />
            <span>Flight Cancellation</span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
} 