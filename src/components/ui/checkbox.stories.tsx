import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './checkbox';
import { Label } from './label';
import { Button } from './button';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic checkbox example
export const Basic: Story = {
  args: {
    id: 'terms',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id={args.id} />
      <Label htmlFor={args.id}>Accept terms and conditions</Label>
    </div>
  ),
};

// Checked checkbox example
export const Checked: Story = {
  args: {
    id: 'terms',
    defaultChecked: true
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id={args.id} defaultChecked={args.defaultChecked} />
      <Label htmlFor={args.id}>Accept terms and conditions</Label>
    </div>
  ),
};

// Disabled checkbox example
export const Disabled: Story = {
  args: {
    id: 'terms',
    disabled: true
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id={args.id} disabled={args.disabled} />
      <Label 
        htmlFor={args.id} 
        className="text-muted-foreground"
      >
        Accept terms and conditions
      </Label>
    </div>
  ),
};

// Flight preferences example
export function FlightPreferences() {
  const [preferences, setPreferences] = useState({
    directFlights: true,
    refundable: false,
    nearAirport: true,
    emailPromos: false,
  });

  return (
    <div className="space-y-6 border rounded-lg p-6 max-w-md">
      <h3 className="text-lg font-medium border-b pb-2 mb-4">Flight Search Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="direct-flights" 
            checked={preferences.directFlights}
            onCheckedChange={(checked) => 
              setPreferences({...preferences, directFlights: checked as boolean})
            }
          />
          <div className="grid gap-1.5 leading-none">
            <Label 
              htmlFor="direct-flights" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Direct Flights Only
            </Label>
            <p className="text-xs text-muted-foreground">
              Show only non-stop flights in search results
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="refundable" 
            checked={preferences.refundable}
            onCheckedChange={(checked) => 
              setPreferences({...preferences, refundable: checked as boolean})
            }
          />
          <div className="grid gap-1.5 leading-none">
            <Label 
              htmlFor="refundable" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Refundable Tickets
            </Label>
            <p className="text-xs text-muted-foreground">
              Show only flights with refundable fare options
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="near-airport" 
            checked={preferences.nearAirport}
            onCheckedChange={(checked) => 
              setPreferences({...preferences, nearAirport: checked as boolean})
            }
          />
          <div className="grid gap-1.5 leading-none">
            <Label 
              htmlFor="near-airport" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include Nearby Airports
            </Label>
            <p className="text-xs text-muted-foreground">
              Show flights from airports within 100km of selected departure city
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="email-promos" 
            checked={preferences.emailPromos}
            onCheckedChange={(checked) => 
              setPreferences({...preferences, emailPromos: checked as boolean})
            }
          />
          <div className="grid gap-1.5 leading-none">
            <Label 
              htmlFor="email-promos" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email Promotions
            </Label>
            <p className="text-xs text-muted-foreground">
              Receive exclusive deals and flight offers via email
            </p>
          </div>
        </div>
      </div>
      
      <Button className="w-full mt-4">Apply Preferences</Button>
    </div>
  );
}

// Flight add-ons checklist
export function FlightAddOns() {
  const [selectedAddOns, setSelectedAddOns] = useState({
    extraLuggage: false,
    priorityBoarding: false,
    windowSeat: true,
    inFlightMeal: false,
  });
  
  const calculateTotal = () => {
    let total = 0;
    if (selectedAddOns.extraLuggage) total += 1200;
    if (selectedAddOns.priorityBoarding) total += 700;
    if (selectedAddOns.windowSeat) total += 500;
    if (selectedAddOns.inFlightMeal) total += 800;
    return total;
  };

  return (
    <div className="border rounded-lg p-6 max-w-md">
      <h3 className="text-lg font-medium mb-4">Optional Add-ons</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Enhance your Bengaluru to Delhi flight experience with these optional services
      </p>
      
      <div className="space-y-4 divide-y">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="extra-luggage" 
              checked={selectedAddOns.extraLuggage}
              onCheckedChange={(checked) => 
                setSelectedAddOns({...selectedAddOns, extraLuggage: checked as boolean})
              }
            />
            <div className="grid gap-1 leading-none">
              <Label 
                htmlFor="extra-luggage" 
                className="text-sm font-medium leading-none"
              >
                Extra Luggage (10kg)
              </Label>
              <p className="text-xs text-muted-foreground">
                Add additional check-in baggage allowance
              </p>
            </div>
          </div>
          <span className="text-sm font-medium">₹1,200</span>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="priority-boarding" 
              checked={selectedAddOns.priorityBoarding}
              onCheckedChange={(checked) => 
                setSelectedAddOns({...selectedAddOns, priorityBoarding: checked as boolean})
              }
            />
            <div className="grid gap-1 leading-none">
              <Label 
                htmlFor="priority-boarding" 
                className="text-sm font-medium leading-none"
              >
                Priority Boarding
              </Label>
              <p className="text-xs text-muted-foreground">
                Be among the first to board the aircraft
              </p>
            </div>
          </div>
          <span className="text-sm font-medium">₹700</span>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="window-seat" 
              checked={selectedAddOns.windowSeat}
              onCheckedChange={(checked) => 
                setSelectedAddOns({...selectedAddOns, windowSeat: checked as boolean})
              }
            />
            <div className="grid gap-1 leading-none">
              <Label 
                htmlFor="window-seat" 
                className="text-sm font-medium leading-none"
              >
                Window Seat Selection
              </Label>
              <p className="text-xs text-muted-foreground">
                Secure a window seat for your journey
              </p>
            </div>
          </div>
          <span className="text-sm font-medium">₹500</span>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="in-flight-meal" 
              checked={selectedAddOns.inFlightMeal}
              onCheckedChange={(checked) => 
                setSelectedAddOns({...selectedAddOns, inFlightMeal: checked as boolean})
              }
            />
            <div className="grid gap-1 leading-none">
              <Label 
                htmlFor="in-flight-meal" 
                className="text-sm font-medium leading-none"
              >
                In-Flight Gourmet Meal
              </Label>
              <p className="text-xs text-muted-foreground">
                Upgrade to a premium meal with beverage
              </p>
            </div>
          </div>
          <span className="text-sm font-medium">₹800</span>
        </div>
      </div>
      
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">Total Add-ons:</span>
          <span className="text-base font-medium">₹{calculateTotal()}</span>
        </div>
        
        <Button className="w-full">Add to Booking</Button>
      </div>
    </div>
  );
}

// Passenger information agreement
export function PassengerAgreement() {
  const [agreements, setAgreements] = useState({
    termsAccepted: false,
    dataConsent: false,
    insuranceDeclined: false,
  });
  
  const allChecked = Object.values(agreements).every(Boolean);

  return (
    <div className="border rounded-lg p-6 max-w-md">
      <h3 className="text-lg font-medium mb-4">Passenger Agreement</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="terms-accepted" 
            checked={agreements.termsAccepted}
            onCheckedChange={(checked) => 
              setAgreements({...agreements, termsAccepted: checked as boolean})
            }
          />
          <div className="grid gap-1 leading-none">
            <Label 
              htmlFor="terms-accepted" 
              className="text-sm font-medium leading-none"
            >
              Terms & Conditions
            </Label>
            <p className="text-xs text-muted-foreground">
              I accept the airline's <a href="#" className="text-primary underline">terms and conditions</a> and <a href="#" className="text-primary underline">fare rules</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="data-consent" 
            checked={agreements.dataConsent}
            onCheckedChange={(checked) => 
              setAgreements({...agreements, dataConsent: checked as boolean})
            }
          />
          <div className="grid gap-1 leading-none">
            <Label 
              htmlFor="data-consent" 
              className="text-sm font-medium leading-none"
            >
              Data Processing
            </Label>
            <p className="text-xs text-muted-foreground">
              I consent to the processing of my personal data as described in the <a href="#" className="text-primary underline">privacy policy</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="insurance-declined" 
            checked={agreements.insuranceDeclined}
            onCheckedChange={(checked) => 
              setAgreements({...agreements, insuranceDeclined: checked as boolean})
            }
          />
          <div className="grid gap-1 leading-none">
            <Label 
              htmlFor="insurance-declined" 
              className="text-sm font-medium leading-none"
            >
              Insurance Waiver
            </Label>
            <p className="text-xs text-muted-foreground">
              I understand that by declining travel insurance, I am responsible for all costs related to trip cancellation, delays, or medical emergencies
            </p>
          </div>
        </div>
      </div>
      
      <Button disabled={!allChecked} className="w-full">
        Continue to Payment
      </Button>
      {!allChecked && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Please accept all terms to continue
        </p>
      )}
    </div>
  );
} 