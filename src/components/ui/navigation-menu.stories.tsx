import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu';
import { 
  Plane, 
  Hotel, 
  Train, 
  Bus, 
  Car, 
  Landmark, 
  CreditCard, 
  Phone, 
  User, 
  Gift, 
  Calendar, 
  MapPin,
  LifeBuoy,
  Star,
  Info,
  Briefcase,
  Wallet,
  Globe,
  Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const meta = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

// Default navigation menu
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <NavigationMenuLink asChild>
                <a 
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="/"
                >
                  <div className="mb-2 mt-4 text-lg font-medium">
                    Example Link
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    This is a description for an example navigation link.
                  </p>
                </a>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <div>
                <p className="font-medium">Navigation Content</p>
                <p className="text-sm text-muted-foreground">Content for Item Two</p>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Item Three
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// Main navigation for flight booking app
export function MainNavigation() {
  return (
    <NavigationMenu className="max-w-5xl">
      <NavigationMenuList>
        {/* Flights */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1">
            <Plane className="h-4 w-4" /> Flights
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-4 p-6">
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Popular Domestic Routes</h4>
                <ul className="grid gap-3">
                  <ListItem href="/flights/delhi-mumbai" title="Delhi to Mumbai">
                    Daily direct flights starting at ₹3,999
                  </ListItem>
                  <ListItem href="/flights/bangalore-delhi" title="Bengaluru to Delhi">
                    Over 50 daily connections from ₹4,499
                  </ListItem>
                  <ListItem href="/flights/mumbai-goa" title="Mumbai to Goa">
                    Weekend getaway flights from ₹2,999
                  </ListItem>
                  <ListItem href="/flights/chennai-kolkata" title="Chennai to Kolkata">
                    Direct flights starting from ₹3,799
                  </ListItem>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Popular International Routes</h4>
                <ul className="grid gap-3">
                  <ListItem href="/flights/delhi-dubai" title="Delhi to Dubai">
                    Multiple airlines from ₹14,999
                  </ListItem>
                  <ListItem href="/flights/mumbai-singapore" title="Mumbai to Singapore">
                    Direct flights from ₹18,500
                  </ListItem>
                  <ListItem href="/flights/chennai-kualalumpur" title="Chennai to Kuala Lumpur">
                    Affordable connections from ₹16,999
                  </ListItem>
                  <ListItem href="/flights/bangalore-bangkok" title="Bengaluru to Bangkok">
                    Weekend getaways from ₹17,999
                  </ListItem>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Flight Types</h4>
                <ul className="grid gap-3">
                  <ListItem href="/flights/one-way" icon={<Plane className="h-4 w-4 opacity-75" />} title="One Way">
                    Single journey flights
                  </ListItem>
                  <ListItem href="/flights/round-trip" icon={<Calendar className="h-4 w-4 opacity-75" />} title="Round Trip">
                    Return journey discounts
                  </ListItem>
                  <ListItem href="/flights/multi-city" icon={<MapPin className="h-4 w-4 opacity-75" />} title="Multi-City">
                    Multiple destinations in one trip
                  </ListItem>
                </ul>
              </div>
              <div className="rounded-md bg-blue-50 p-4">
                <h4 className="mb-2 text-sm font-medium text-blue-800">Monsoon Sale!</h4>
                <p className="mb-2 text-xs text-blue-600">Use code <span className="font-bold">MONSOON24</span> for extra 10% off on all domestic flights</p>
                <a href="/offers/monsoon-sale" className="text-xs font-medium text-blue-700 hover:underline">
                  View Offer →
                </a>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Hotels */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1">
            <Hotel className="h-4 w-4" /> Hotels
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-4 p-6">
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Popular Destinations</h4>
                <ul className="grid gap-3">
                  <ListItem href="/hotels/goa" title="Goa Hotels">
                    Beach resorts and boutique stays
                  </ListItem>
                  <ListItem href="/hotels/delhi" title="Delhi Hotels">
                    Luxury and budget accommodations
                  </ListItem>
                  <ListItem href="/hotels/jaipur" title="Jaipur Hotels">
                    Heritage properties and modern hotels
                  </ListItem>
                  <ListItem href="/hotels/kerala" title="Kerala Stays">
                    Backwater resorts and hill stations
                  </ListItem>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Property Types</h4>
                <ul className="grid gap-3">
                  <ListItem href="/hotels/luxury" icon={<Star className="h-4 w-4 opacity-75" />} title="Luxury Hotels">
                    5-star accommodations and resorts
                  </ListItem>
                  <ListItem href="/hotels/budget" icon={<Wallet className="h-4 w-4 opacity-75" />} title="Budget Stays">
                    Affordable options under ₹3,000
                  </ListItem>
                  <ListItem href="/hotels/homestays" icon={<Landmark className="h-4 w-4 opacity-75" />} title="Homestays">
                    Experience local hospitality
                  </ListItem>
                  <ListItem href="/hotels/resorts" icon={<Palm className="h-4 w-4 opacity-75" />} title="Resorts">
                    All-inclusive vacation packages
                  </ListItem>
                </ul>
              </div>
              <div className="col-span-2 rounded-md bg-gradient-to-r from-purple-50 to-indigo-50 p-4">
                <h4 className="mb-2 text-sm font-medium text-indigo-800">Hotel + Flight Packages</h4>
                <p className="mb-2 text-xs text-indigo-600">Save up to 25% when you book hotels and flights together</p>
                <a href="/packages" className="text-xs font-medium text-indigo-700 hover:underline">
                  Explore Packages →
                </a>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Holiday Packages */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1">
            <Gift className="h-4 w-4" /> Holiday Packages
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-4 p-6">
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Domestic Holidays</h4>
                <ul className="grid gap-3">
                  <ListItem href="/holidays/kerala" title="Kerala Packages">
                    Backwaters, beaches, and hill stations
                  </ListItem>
                  <ListItem href="/holidays/himachal" title="Himachal Packages">
                    Mountain adventures and scenic retreats
                  </ListItem>
                  <ListItem href="/holidays/andaman" title="Andaman Packages">
                    Island paradise getaways
                  </ListItem>
                  <ListItem href="/holidays/rajasthan" title="Rajasthan Packages">
                    Royal experiences and desert safaris
                  </ListItem>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">International Holidays</h4>
                <ul className="grid gap-3">
                  <ListItem href="/holidays/thailand" title="Thailand Packages">
                    Bangkok, Phuket, and Krabi trips
                  </ListItem>
                  <ListItem href="/holidays/dubai" title="Dubai Packages">
                    Desert adventures and luxury shopping
                  </ListItem>
                  <ListItem href="/holidays/bali" title="Bali Packages">
                    Beach resorts and cultural experiences
                  </ListItem>
                  <ListItem href="/holidays/singapore" title="Singapore Packages">
                    Family-friendly city adventures
                  </ListItem>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Holiday Types</h4>
                <ul className="grid gap-3">
                  <ListItem href="/holidays/family" icon={<User className="h-4 w-4 opacity-75" />} title="Family Trips">
                    Kid-friendly activities and resorts
                  </ListItem>
                  <ListItem href="/holidays/honeymoon" icon={<Heart className="h-4 w-4 opacity-75" />} title="Honeymoon">
                    Romantic getaways for couples
                  </ListItem>
                  <ListItem href="/holidays/adventure" icon={<Mountain className="h-4 w-4 opacity-75" />} title="Adventure">
                    Trekking, rafting, and outdoor activities
                  </ListItem>
                </ul>
              </div>
              <div className="rounded-md bg-emerald-50 p-4">
                <h4 className="mb-2 text-sm font-medium text-emerald-800">Exclusive Offer</h4>
                <p className="mb-2 text-xs text-emerald-600">Get a free airport transfer on international holiday packages</p>
                <a href="/offers/holiday-deals" className="text-xs font-medium text-emerald-700 hover:underline">
                  Book Now →
                </a>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* More Travel Options */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" /> More Travel
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-3 gap-4 p-6">
              <ListItem 
                href="/trains" 
                icon={<Train className="h-4 w-4 opacity-75" />} 
                title="Train Tickets"
                className="col-span-1"
              >
                Book IRCTC tickets across India
              </ListItem>
              <ListItem 
                href="/buses" 
                icon={<Bus className="h-4 w-4 opacity-75" />} 
                title="Bus Tickets"
                className="col-span-1"
              >
                Inter-city and sleeper options
              </ListItem>
              <ListItem 
                href="/cars" 
                icon={<Car className="h-4 w-4 opacity-75" />} 
                title="Car Rentals"
                className="col-span-1"
              >
                Self-drive and chauffeur services
              </ListItem>
              <ListItem 
                href="/visas" 
                icon={<Globe className="h-4 w-4 opacity-75" />} 
                title="Visa Services"
                className="col-span-1"
              >
                Fast-track visa processing
              </ListItem>
              <ListItem 
                href="/forex" 
                icon={<Wallet className="h-4 w-4 opacity-75" />} 
                title="Forex Cards"
                className="col-span-1"
              >
                Best currency exchange rates
              </ListItem>
              <ListItem 
                href="/insurance" 
                icon={<LifeBuoy className="h-4 w-4 opacity-75" />} 
                title="Travel Insurance"
                className="col-span-1"
              >
                Domestic and international coverage
              </ListItem>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Mobile App */}
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center gap-1")}>
            <Smartphone className="h-4 w-4" /> 
            <a href="/mobile-app">Download App</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Support */}
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center gap-1")}>
            <Phone className="h-4 w-4" /> 
            <a href="/contact">Support</a>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* My Account */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1">
            <User className="h-4 w-4" /> My Account
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[200px] p-4">
              <ul className="grid gap-3">
                <ListItem href="/account/trips" icon={<Plane className="h-4 w-4 opacity-75" />} title="My Trips">
                  View and manage bookings
                </ListItem>
                <ListItem href="/account/profile" icon={<User className="h-4 w-4 opacity-75" />} title="Profile">
                  Update personal information
                </ListItem>
                <ListItem href="/account/wallet" icon={<Wallet className="h-4 w-4 opacity-75" />} title="Wallet">
                  ₹500 available balance
                </ListItem>
                <ListItem href="/account/logout" icon={<LogOut className="h-4 w-4 opacity-75" />} title="Sign Out">
                  Log out of your account
                </ListItem>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Mobile responsive navigation
export function MobileNavigation() {
  return (
    <div className="flex flex-col space-y-2 p-4 md:hidden">
      <a href="/flights" className="flex items-center rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700">
        <Plane className="mr-2 h-5 w-5" /> Flight Booking
      </a>
      <div className="grid grid-cols-3 gap-2">
        <a href="/hotels" className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-3 hover:bg-gray-200">
          <Hotel className="h-5 w-5 text-gray-700" />
          <span className="mt-1 text-xs font-medium text-gray-700">Hotels</span>
        </a>
        <a href="/holidays" className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-3 hover:bg-gray-200">
          <Gift className="h-5 w-5 text-gray-700" />
          <span className="mt-1 text-xs font-medium text-gray-700">Holidays</span>
        </a>
        <a href="/trains" className="flex flex-col items-center justify-center rounded-md bg-gray-100 p-3 hover:bg-gray-200">
          <Train className="h-5 w-5 text-gray-700" />
          <span className="mt-1 text-xs font-medium text-gray-700">Trains</span>
        </a>
      </div>
      <div className="flex justify-between">
        <a href="/account" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <User className="mr-1 h-4 w-4" /> My Account
        </a>
        <a href="/support" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <LifeBuoy className="mr-1 h-4 w-4" /> Help
        </a>
      </div>
    </div>
  );
}

// Checkout-specific navigation
export function CheckoutNavigation() {
  return (
    <NavigationMenu className="max-w-2xl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center gap-1")}>
            <Plane className="h-4 w-4" /> 
            <a href="/flights">Back to Flights</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center gap-1")}>
            <Phone className="h-4 w-4" /> 
            <a href="/contact">Need Help?</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center gap-1 text-blue-600")}>
            <CreditCard className="h-4 w-4" /> 
            <a href="/payment">Secure Payment</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Business travel portal navigation
export function BusinessTravelNavigation() {
  return (
    <NavigationMenu className="max-w-3xl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" /> Business Travel
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[500px] grid-cols-2 gap-4 p-6">
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Corporate Solutions</h4>
                <ul className="grid gap-3">
                  <ListItem href="/business/flights" title="Corporate Flight Bookings">
                    Discounted fares and flexible changes
                  </ListItem>
                  <ListItem href="/business/hotels" title="Business Hotels">
                    Corporate rates and meeting facilities
                  </ListItem>
                  <ListItem href="/business/reporting" title="Travel Reporting">
                    Expense tracking and analytics
                  </ListItem>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-medium leading-none">Business Services</h4>
                <ul className="grid gap-3">
                  <ListItem href="/business/gst" icon={<CreditCard className="h-4 w-4 opacity-75" />} title="GST Invoicing">
                    Simplified GST compliance for travel
                  </ListItem>
                  <ListItem href="/business/credit" icon={<Wallet className="h-4 w-4 opacity-75" />} title="Corporate Credit">
                    30-day payment terms for businesses
                  </ListItem>
                  <ListItem href="/business/policy" icon={<FileText className="h-4 w-4 opacity-75" />} title="Policy Integration">
                    Customize travel policy settings
                  </ListItem>
                </ul>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center gap-1")}>
            <User className="h-4 w-4" /> 
            <a href="/business/dashboard">Company Dashboard</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "flex items-center gap-1")}>
            <Info className="h-4 w-4" /> 
            <a href="/business/support">Dedicated Support</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Helper component for menu items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon?: React.ReactNode;
  }
>(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-blue-600",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon && icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-gray-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// Custom icons not available in lucide-react
const Palm = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <path d="M18 8c0 4-3 6-6 8-3-2-6-4-6-8a6 6 0 0 1 12 0z" />
    <path d="M12 16v4" />
    <path d="M8 20h8" />
  </svg>
);

const Heart = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const Mountain = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
);

const LogOut = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const FileText = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-4 w-4", className)}
    {...props}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
); 