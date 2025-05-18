import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './switch';
import { Label } from './label';
import { Wifi, Moon, CreditCard, Bell, Plane, BaggageClaim } from 'lucide-react';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

// Basic switch example
export const Basic: Story = {
  args: {
    id: 'airplane-mode',
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id={args.id} />
      <Label htmlFor={args.id}>Airplane Mode</Label>
    </div>
  ),
};

// Checked switch
export const Checked: Story = {
  args: {
    id: 'airplane-mode',
    defaultChecked: true,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id={args.id} defaultChecked={args.defaultChecked} />
      <Label htmlFor={args.id}>Airplane Mode</Label>
    </div>
  ),
};

// Flight booking preferences switches
export function FlightPreferences() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6 border border-gray-200 rounded-lg p-6 max-w-md">
      <h3 className="text-lg font-medium border-b border-gray-200 pb-2 mb-4">Flight Booking Preferences</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="h-5 w-5 text-gray-500" />
          <div>
            <Label htmlFor="email-notifications" className="text-sm font-medium">
              Email Notifications
            </Label>
            <p className="text-xs text-gray-500">Receive booking confirmations and flight updates</p>
          </div>
        </div>
        <Switch 
          id="email-notifications" 
          checked={emailNotifications}
          onCheckedChange={setEmailNotifications}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="h-5 w-5 text-gray-500" />
          <div>
            <Label htmlFor="sms-notifications" className="text-sm font-medium">
              SMS Notifications
            </Label>
            <p className="text-xs text-gray-500">Receive real-time flight alerts via SMS</p>
          </div>
        </div>
        <Switch 
          id="sms-notifications" 
          checked={smsNotifications}
          onCheckedChange={setSmsNotifications}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CreditCard className="h-5 w-5 text-gray-500" />
          <div>
            <Label htmlFor="save-payment" className="text-sm font-medium">
              Save Payment Information
            </Label>
            <p className="text-xs text-gray-500">Securely store payment details for faster checkout</p>
          </div>
        </div>
        <Switch 
          id="save-payment" 
          checked={savePaymentInfo}
          onCheckedChange={setSavePaymentInfo}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Moon className="h-5 w-5 text-gray-500" />
          <div>
            <Label htmlFor="dark-mode" className="text-sm font-medium">
              Dark Mode
            </Label>
            <p className="text-xs text-gray-500">Switch to dark theme for low-light environments</p>
          </div>
        </div>
        <Switch 
          id="dark-mode" 
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
      </div>
    </div>
  );
}

// In-flight services toggles
export function InFlightServices() {
  const [wifiService, setWifiService] = useState(false);
  const [mealPreference, setMealPreference] = useState(true);
  const [extraLegroom, setExtraLegroom] = useState(false);
  const [priorityBaggage, setPriorityBaggage] = useState(false);

  return (
    <div className="space-y-6 border border-gray-200 rounded-lg p-6 max-w-md">
      <h3 className="text-lg font-medium border-b border-gray-200 pb-2 mb-4">In-Flight Services</h3>
      <p className="text-sm text-gray-500 mb-4">Select additional services for your Bengaluru to London flight</p>
      
      <div className="space-y-4 divide-y divide-gray-100">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Wifi className="h-5 w-5 text-gray-500" />
            <div>
              <Label htmlFor="wifi-service" className="text-sm font-medium">
                Wi-Fi Service
              </Label>
              <p className="text-xs text-gray-500">Stay connected during your flight</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">₹750</span>
            <Switch 
              id="wifi-service" 
              checked={wifiService}
              onCheckedChange={setWifiService}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <svg 
              className="h-5 w-5 text-gray-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
              <path d="M15 10h.01" />
              <path d="M11 10h.01" />
              <path d="M7 10h.01" />
              <path d="M15 15h.01" />
              <path d="M11 15h.01" />
              <path d="M7 15h.01" />
            </svg>
            <div>
              <Label htmlFor="meal-preference" className="text-sm font-medium">
                Vegetarian Meal
              </Label>
              <p className="text-xs text-gray-500">Special vegetarian meal option</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Free</span>
            <Switch 
              id="meal-preference" 
              checked={mealPreference}
              onCheckedChange={setMealPreference}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Plane className="h-5 w-5 text-gray-500" />
            <div>
              <Label htmlFor="extra-legroom" className="text-sm font-medium">
                Extra Legroom Seat
              </Label>
              <p className="text-xs text-gray-500">More comfortable seating with additional space</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">₹1,500</span>
            <Switch 
              id="extra-legroom" 
              checked={extraLegroom}
              onCheckedChange={setExtraLegroom}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <BaggageClaim className="h-5 w-5 text-gray-500" />
            <div>
              <Label htmlFor="priority-baggage" className="text-sm font-medium">
                Priority Baggage
              </Label>
              <p className="text-xs text-gray-500">Your luggage will be among the first to arrive</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">₹800</span>
            <Switch 
              id="priority-baggage" 
              checked={priorityBaggage}
              onCheckedChange={setPriorityBaggage}
            />
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between text-sm">
          <span>Selected Additions:</span>
          <span className="font-medium">
            ₹{(wifiService ? 750 : 0) + (extraLegroom ? 1500 : 0) + (priorityBaggage ? 800 : 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

// Flight checkout options
export function CheckoutOptions() {
  const [saveForLater, setSaveForLater] = useState(true);
  const [travelInsurance, setTravelInsurance] = useState(false);
  const [flexibleTicket, setFlexibleTicket] = useState(false);

  return (
    <div className="space-y-4 border border-gray-200 rounded-lg p-6 max-w-md">
      <h3 className="text-lg font-medium mb-4">Checkout Options</h3>
      
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <Label htmlFor="save-trip" className="text-sm font-medium">
            Save Trip Information
          </Label>
          <p className="text-xs text-gray-500">Save these details for future bookings</p>
        </div>
        <Switch 
          id="save-trip" 
          checked={saveForLater}
          onCheckedChange={setSaveForLater}
        />
      </div>
      
      <div className="flex items-center justify-between border-b border-gray-100 py-4">
        <div>
          <Label htmlFor="travel-insurance" className="text-sm font-medium">
            Add Travel Insurance
          </Label>
          <p className="text-xs text-gray-500">Cover trip cancellation, delays, and medical expenses</p>
          <p className="text-xs font-medium text-emerald-600 mt-1">₹1,250 for this trip</p>
        </div>
        <Switch 
          id="travel-insurance" 
          checked={travelInsurance}
          onCheckedChange={setTravelInsurance}
        />
      </div>
      
      <div className="flex items-center justify-between pt-4">
        <div>
          <Label htmlFor="flexible-ticket" className="text-sm font-medium">
            Flexible Ticket
          </Label>
          <p className="text-xs text-gray-500">Change dates without penalty fees</p>
          <p className="text-xs font-medium text-emerald-600 mt-1">₹2,500 additional</p>
        </div>
        <Switch 
          id="flexible-ticket" 
          checked={flexibleTicket}
          onCheckedChange={setFlexibleTicket}
        />
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-6">
        <div className="flex justify-between text-sm font-medium">
          <span>Subtotal:</span>
          <span>₹42,500</span>
        </div>
        {travelInsurance && (
          <div className="flex justify-between text-sm mt-1">
            <span>Travel Insurance:</span>
            <span>₹1,250</span>
          </div>
        )}
        {flexibleTicket && (
          <div className="flex justify-between text-sm mt-1">
            <span>Flexible Ticket:</span>
            <span>₹2,500</span>
          </div>
        )}
        <div className="flex justify-between text-base font-medium mt-2 pt-2 border-t border-gray-100">
          <span>Total:</span>
          <span>₹{42500 + (travelInsurance ? 1250 : 0) + (flexibleTicket ? 2500 : 0)}</span>
        </div>
      </div>
    </div>
  );
} 