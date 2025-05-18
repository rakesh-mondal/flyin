import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Plane, Calendar, CreditCard, Clock, Map, Info, Users } from 'lucide-react';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

// Basic tabs example
export const Basic: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account settings here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Username</p>
              <p className="text-sm text-muted-foreground">johndoe</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">johndoe@example.com</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Password</p>
              <p className="text-sm text-muted-foreground">••••••••</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">New Password</p>
              <p className="text-sm text-muted-foreground">••••••••••</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Change password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

// Flight booking tabs example
export function FlightBookingTabs() {
  return (
    <Tabs defaultValue="flights" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="flights" className="flex items-center gap-2">
          <Plane className="h-4 w-4" />
          <span>Flights</span>
        </TabsTrigger>
        <TabsTrigger value="schedule" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Schedule</span>
        </TabsTrigger>
        <TabsTrigger value="payment" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span>Payment</span>
        </TabsTrigger>
        <TabsTrigger value="details" className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span>Details</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="flights" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Flight Selection</CardTitle>
            <CardDescription>
              Choose your departure and return flights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">Bengaluru to Delhi</p>
                  <p className="text-sm text-muted-foreground">Fri, 23 Aug 2024</p>
                </div>
                <span className="font-medium">₹5,400</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium">BLR</span>
                <span className="mx-2 text-muted-foreground">07:30</span>
                <div className="flex-1 border-t mx-2 border-dashed"></div>
                <Clock className="h-3 w-3 mx-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mr-2">2h 15m</span>
                <div className="flex-1 border-t mx-2 border-dashed"></div>
                <span className="text-muted-foreground mx-2">09:45</span>
                <span className="font-medium">DEL</span>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">Delhi to Bengaluru</p>
                  <p className="text-sm text-muted-foreground">Mon, 26 Aug 2024</p>
                </div>
                <span className="font-medium">₹4,950</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium">DEL</span>
                <span className="mx-2 text-muted-foreground">18:20</span>
                <div className="flex-1 border-t mx-2 border-dashed"></div>
                <Clock className="h-3 w-3 mx-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mr-2">2h 30m</span>
                <div className="flex-1 border-t mx-2 border-dashed"></div>
                <span className="text-muted-foreground mx-2">20:50</span>
                <span className="font-medium">BLR</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Continue to Schedule</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="schedule" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Flight Schedule</CardTitle>
            <CardDescription>
              Review your flight timing and details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Plane className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Outbound Flight</p>
                    <p className="text-sm text-muted-foreground">Air India AI-505</p>
                  </div>
                </div>
                <div className="ml-11 mt-2">
                  <div className="flex justify-between mb-1">
                    <div>
                      <p className="font-medium">BLR 07:30</p>
                      <p className="text-xs text-muted-foreground">Fri, 23 Aug</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">DEL 09:45</p>
                      <p className="text-xs text-muted-foreground">Fri, 23 Aug</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>2h 15m</span>
                    <span className="mx-2">•</span>
                    <span>Non-stop</span>
                    <span className="mx-2">•</span>
                    <span>Economy</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Plane className="h-4 w-4 text-blue-600" style={{ transform: 'rotate(180deg)' }} />
                  </div>
                  <div>
                    <p className="font-medium">Return Flight</p>
                    <p className="text-sm text-muted-foreground">IndiGo 6E-455</p>
                  </div>
                </div>
                <div className="ml-11 mt-2">
                  <div className="flex justify-between mb-1">
                    <div>
                      <p className="font-medium">DEL 18:20</p>
                      <p className="text-xs text-muted-foreground">Mon, 26 Aug</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">BLR 20:50</p>
                      <p className="text-xs text-muted-foreground">Mon, 26 Aug</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>2h 30m</span>
                    <span className="mx-2">•</span>
                    <span>Non-stop</span>
                    <span className="mx-2">•</span>
                    <span>Economy</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Continue to Payment</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="payment" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Enter your payment information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <p className="text-sm font-medium mb-3">Price Breakdown</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base fare</span>
                    <span>₹8,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & fees</span>
                    <span>₹2,100</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹10,350</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <p className="text-sm font-medium mb-3">Payment Method</p>
                <div className="space-y-2">
                  <div className="flex items-center p-2 border rounded bg-muted/50">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span className="text-sm">Credit/Debit Card</span>
                  </div>
                  <div className="flex items-center p-2 border rounded">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    <span className="text-sm">UPI Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Pay ₹10,350</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="details" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Flight Details</CardTitle>
            <CardDescription>
              Additional flight information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-md">
                <Map className="h-4 w-4 mr-3 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Route Information</p>
                  <p className="text-xs text-muted-foreground">Direct route with average flight time of 2h 20m</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <svg className="h-4 w-4 mr-3 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
                <div>
                  <p className="text-sm font-medium">Cabin Language</p>
                  <p className="text-xs text-muted-foreground">Hindi and English</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <Users className="h-4 w-4 mr-3 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Passenger Details</p>
                  <p className="text-xs text-muted-foreground">2 Adults (Economy Class)</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <svg className="h-4 w-4 mr-3 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <div>
                  <p className="text-sm font-medium">Baggage Allowance</p>
                  <p className="text-xs text-muted-foreground">15kg Check-in, 7kg Cabin</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Download Itinerary</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// Trip planning tabs
export function TripPlanningTabs() {
  return (
    <Tabs defaultValue="overview" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Trip Overview</TabsTrigger>
        <TabsTrigger value="hotels">Hotels</TabsTrigger>
        <TabsTrigger value="activities">Activities</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Bengaluru to Kerala Trip</CardTitle>
            <CardDescription>
              August 23 - August 30, 2024 (7 nights)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <p className="font-medium mb-2">Trip Summary</p>
                <div className="text-sm text-muted-foreground">
                  <p>• Round-trip flights from Bengaluru to Kochi</p>
                  <p>• 3 nights in Munnar, 2 nights in Alleppey, 2 nights in Kovalam</p>
                  <p>• Private transportation between destinations</p>
                  <p>• Daily breakfast included at all hotels</p>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <p className="font-medium mb-2">Weather Forecast</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Munnar</p>
                    <p>22°C - 26°C, Light Rain</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Alleppey</p>
                    <p>26°C - 30°C, Humid</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Kovalam</p>
                    <p>25°C - 32°C, Partly Cloudy</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="hotels" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Accommodation</CardTitle>
            <CardDescription>
              Your booked hotels for this trip
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Munnar Panorama Resort</p>
                  <p className="text-sm text-muted-foreground">3 nights</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Aug 23 - Aug 26, 2024</p>
                <div className="text-sm flex items-center text-amber-500">
                  {Array(4).fill(0).map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs">Premium Mountain View</span>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Alleppey Houseboat Cruises</p>
                  <p className="text-sm text-muted-foreground">2 nights</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Aug 26 - Aug 28, 2024</p>
                <div className="text-sm flex items-center text-amber-500">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs">Luxury Houseboat</span>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <p className="font-medium">Kovalam Beach Resort</p>
                  <p className="text-sm text-muted-foreground">2 nights</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Aug 28 - Aug 30, 2024</p>
                <div className="text-sm flex items-center text-amber-500">
                  {Array(4).fill(0).map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="ml-1 text-xs">Ocean View Suite</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="activities" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Activities</CardTitle>
            <CardDescription>
              Things to do during your Kerala vacation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <p className="font-medium mb-2">Munnar</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Tea Plantation Tour (₹800 per person)</li>
                  <li>Eravikulam National Park Visit (₹350 per person)</li>
                  <li>Spice Garden Walk (₹600 per person)</li>
                </ul>
              </div>
              
              <div className="border rounded-md p-4">
                <p className="font-medium mb-2">Alleppey</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Sunset Canoe Ride (₹950 per person)</li>
                  <li>Village Life Experience (₹700 per person)</li>
                  <li>Ayurvedic Spa Treatment (₹1,800 per person)</li>
                </ul>
              </div>
              
              <div className="border rounded-md p-4">
                <p className="font-medium mb-2">Kovalam</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Surfing Lessons (₹1,200 per person)</li>
                  <li>Lighthouse Beach Tour (₹400 per person)</li>
                  <li>Seafood Cooking Class (₹1,500 per person)</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Book Activities</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
} 