import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
import { Badge } from './badge';
import { Check, Info, AlertCircle } from 'lucide-react';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px] border border-gray-200 rounded-md">
      <AccordionItem value="item-1" className="border-b border-gray-200">
        <AccordionTrigger className="text-foreground hover:no-underline px-4">Is it accessible?</AccordionTrigger>
        <AccordionContent className="px-4 text-gray-600">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b border-gray-200">
        <AccordionTrigger className="text-foreground hover:no-underline px-4">Is it styled?</AccordionTrigger>
        <AccordionContent className="px-4 text-gray-600">
          Yes. It comes with default styles that match your app's design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-foreground hover:no-underline px-4">Is it animated?</AccordionTrigger>
        <AccordionContent className="px-4 text-gray-600">
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[400px] border border-gray-200 rounded-md">
      <AccordionItem value="item-1" className="border-b border-gray-200">
        <AccordionTrigger className="text-foreground hover:no-underline px-4">Baggage Policy</AccordionTrigger>
        <AccordionContent className="px-4 text-gray-600">
          <p className="mb-2">Economy tickets include:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>1 cabin bag (up to 7 kg)</li>
            <li>1 checked bag (up to 23 kg)</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b border-gray-200">
        <AccordionTrigger className="text-foreground hover:no-underline px-4">Cancellation Policy</AccordionTrigger>
        <AccordionContent className="px-4 text-gray-600">
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Badge className="bg-green-100 text-green-800 mr-2">Full Refund</Badge>
              <span>Cancel more than 72 hours before departure</span>
            </div>
            <div className="flex items-center">
              <Badge className="bg-yellow-100 text-yellow-800 mr-2">Partial Refund</Badge>
              <span>Cancel 24-72 hours before departure</span>
            </div>
            <div className="flex items-center">
              <Badge className="bg-red-100 text-red-800 mr-2">No Refund</Badge>
              <span>Cancel less than 24 hours before departure</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-foreground hover:no-underline px-4">Meal Options</AccordionTrigger>
        <AccordionContent className="px-4 text-gray-600">
          <div className="space-y-2 text-sm">
            <p>Meals are included on all international flights over 6 hours.</p>
            <p>Dietary options available (request 48h in advance):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Vegetarian</li>
              <li>Vegan</li>
              <li>Gluten-free</li>
              <li>Diabetic</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FlightFAQs: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[450px] border border-gray-200 rounded-md shadow-sm">
      <AccordionItem value="item-1" className="border-b border-gray-200">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center text-left">
            <Info className="h-4 w-4 mr-2 text-primary" />
            <span>What's included in my ticket price?</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3 text-gray-600 text-sm">
          <p className="mb-2">Your ticket includes:</p>
          <ul className="space-y-1">
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-1 text-green-600 mt-0.5" />
              <span>1 cabin bag (up to 7 kg)</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-1 text-green-600 mt-0.5" />
              <span>1 checked bag (up to 23 kg)</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-1 text-green-600 mt-0.5" />
              <span>Meal on international flights over 6 hours</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mr-1 text-green-600 mt-0.5" />
              <span>In-flight entertainment</span>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b border-gray-200">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center text-left">
            <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
            <span>What are the cancellation charges?</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3 text-gray-600 text-sm">
          <div className="space-y-2">
            <div className="flex items-center py-1 border-b border-gray-100">
              <div className="w-40">Before 72 hours</div>
              <div className="font-medium text-green-600">₹2,500</div>
            </div>
            <div className="flex items-center py-1 border-b border-gray-100">
              <div className="w-40">Within 24-72 hours</div>
              <div className="font-medium text-amber-600">₹5,000</div>
            </div>
            <div className="flex items-center py-1 border-b border-gray-100">
              <div className="w-40">Less than 24 hours</div>
              <div className="font-medium text-red-600">Non-refundable</div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center text-left">
            <Info className="h-4 w-4 mr-2 text-primary" />
            <span>Can I select my seat in advance?</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3 text-gray-600 text-sm">
          <p>Yes, you can select your seat during the booking process or later through the manage booking section. Standard seat selection is free, but premium seats (extra legroom, front rows) come with an additional charge between ₹800-₹2,500 depending on the flight duration and seat location.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Basic accordion example
export const Basic: Story = {
  args: {
    type: 'single',
    collapsible: true,
    className: 'w-full max-w-[500px]',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos;
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// Flight FAQ Accordion
export function FlightFAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-[600px]">
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-medium">
          What is the baggage allowance on domestic flights within India?
        </AccordionTrigger>
        <AccordionContent className="text-sm">
          <p className="mb-2">Baggage allowance varies by airline and fare class:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Air India: 25kg check-in, 8kg cabin baggage</li>
            <li>IndiGo: 15kg check-in, 7kg cabin baggage</li>
            <li>SpiceJet: 15kg check-in, 7kg cabin baggage</li>
            <li>Vistara: 20kg check-in, 7kg cabin baggage</li>
          </ul>
          <p className="mt-2 text-muted-foreground">Additional baggage can be purchased during booking or at the airport (rates vary by airline).</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-medium">
          What documents do I need for domestic travel in India?
        </AccordionTrigger>
        <AccordionContent className="text-sm">
          <p className="mb-2">For domestic flights within India, passengers must carry:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Valid government-issued photo ID (Aadhaar, PAN, Voter ID, Driving License, or Passport)</li>
            <li>Boarding pass (printed or electronic)</li>
            <li>For children below 2 years, a birth certificate is required</li>
          </ul>
          <p className="mt-2 text-muted-foreground">It's advisable to reach the airport at least 2 hours before departure for domestic flights.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="font-medium">
          What is the cancellation and refund policy?
        </AccordionTrigger>
        <AccordionContent className="text-sm">
          <p className="mb-2">Cancellation charges depend on when you cancel your flight:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>0-2 hours before departure: No refund (most airlines)</li>
            <li>2-24 hours before departure: 25-50% refund minus fees</li>
            <li>24-72 hours before departure: 50-75% refund minus fees</li>
            <li>More than 72 hours: Full refund minus cancellation fees</li>
          </ul>
          <p className="mt-2 text-muted-foreground">Government taxes are usually refunded. Some fare types like "Flexi" or "Premium" may have more favorable cancellation terms.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="font-medium">
          How can I select or change my seat?
        </AccordionTrigger>
        <AccordionContent className="text-sm">
          <p className="mb-2">You can select your seat through multiple channels:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>During the initial booking process</li>
            <li>Through the Flyin app or website using "Manage Booking"</li>
            <li>During web check-in (24-48 hours before departure)</li>
            <li>At the airport check-in counter</li>
          </ul>
          <p className="mt-2 text-muted-foreground">Premium seats (emergency exit, front rows, extra legroom) may incur additional charges ranging from ₹200 to ₹1,500 depending on the airline and route.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Flight Details Accordion
export function FlightDetailsAccordion() {
  return (
    <Accordion type="multiple" className="w-full max-w-[600px] border rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Bengaluru to Delhi</h3>
        <p className="text-sm text-muted-foreground">Air India AI-505 • Fri, 23 Aug 2024</p>
      </div>
      
      <AccordionItem value="flight-details" className="border-b-0">
        <AccordionTrigger className="py-3 px-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">Flight Details</span>
            <Badge variant="outline" className="text-xs font-normal">Non-stop</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-semibold">07:30</p>
                <p className="text-xs text-muted-foreground">Fri, 23 Aug</p>
                <p className="mt-1">Bengaluru (BLR)</p>
                <p className="text-xs text-muted-foreground">Kempegowda International Airport</p>
              </div>
              <div className="flex flex-col items-center justify-center px-4">
                <p className="text-xs text-muted-foreground">2h 15m</p>
                <div className="w-24 h-px bg-muted my-2 relative">
                  <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p className="text-xs font-medium">Non-stop</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">09:45</p>
                <p className="text-xs text-muted-foreground">Fri, 23 Aug</p>
                <p className="mt-1">Delhi (DEL)</p>
                <p className="text-xs text-muted-foreground">Indira Gandhi International Airport</p>
              </div>
            </div>
            
            <div className="text-sm space-y-2 bg-muted/30 p-3 rounded-md">
              <p className="font-medium">Flight Information</p>
              <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                <div>
                  <p className="text-xs">Aircraft</p>
                  <p className="text-sm">Airbus A320</p>
                </div>
                <div>
                  <p className="text-xs">Flight Number</p>
                  <p className="text-sm">AI-505</p>
                </div>
                <div>
                  <p className="text-xs">Class</p>
                  <p className="text-sm">Economy</p>
                </div>
                <div>
                  <p className="text-xs">Duration</p>
                  <p className="text-sm">2h 15m</p>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="baggage-info" className="border-b-0">
        <AccordionTrigger className="py-3 px-1">
          <span className="font-medium">Baggage Information</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2.5-3z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>
              </div>
              <div>
                <p className="font-medium">Cabin Baggage</p>
                <p className="text-muted-foreground">1 piece up to 8kg</p>
                <p className="text-xs text-muted-foreground mt-1">Maximum dimensions: 55cm x 35cm x 25cm (including handles, wheels, and pockets)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <rect x="2" y="6" width="20" height="14" rx="2" />
                  <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Check-in Baggage</p>
                <p className="text-muted-foreground">1 piece up to 25kg</p>
                <p className="text-xs text-muted-foreground mt-1">Sum of length, width, and height should not exceed 158cm</p>
              </div>
            </div>
            
            <div className="text-xs bg-amber-50 text-amber-800 p-3 rounded-md mt-3">
              Note: Excess baggage charges apply for baggage exceeding these limits. Current rate is ₹500 per extra kg for domestic flights within India.
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="fare-rules" className="border-b-0">
        <AccordionTrigger className="py-3 px-1">
          <span className="font-medium">Fare Rules</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">Cancellation Charges</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground mt-1">
                <li>0-2 hours before departure: Non-refundable</li>
                <li>2-4 hours before departure: 90% of fare</li>
                <li>4-24 hours before departure: 75% of fare</li>
                <li>24-72 hours before departure: 50% of fare</li>
                <li>More than 72 hours: ₹1,500 flat fee</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium">Date Change Charges</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground mt-1">
                <li>0-2 hours before departure: Not allowed</li>
                <li>2-4 hours before departure: ₹3,500 + fare difference</li>
                <li>4-24 hours before departure: ₹3,000 + fare difference</li>
                <li>24-72 hours before departure: ₹2,500 + fare difference</li>
                <li>More than 72 hours: ₹1,500 + fare difference</li>
              </ul>
            </div>
            
            <div className="text-xs bg-green-50 text-green-800 p-3 rounded-md mt-3">
              Tip: Consider our "Flexi Fare" option for more lenient cancellation and change policies.
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Fare Comparison Accordion
export function FareComparisonAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-[600px] border rounded-lg">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Compare Fare Options</h3>
        <p className="text-sm text-muted-foreground">Bengaluru to Delhi • 23 Aug 2024</p>
      </div>
      
      <AccordionItem value="economy-saver" className="border-b">
        <AccordionTrigger className="px-4">
          <div className="flex justify-between w-full items-center pr-2">
            <span className="font-medium">Economy Saver</span>
            <span className="font-semibold text-primary">₹5,400</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>8kg cabin baggage</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>15kg check-in baggage</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span className="text-muted-foreground">No seat selection</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span className="text-muted-foreground">No date changes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span className="text-muted-foreground">No cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <span className="text-muted-foreground">No meal</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="economy-standard" className="border-b">
        <AccordionTrigger className="px-4">
          <div className="flex justify-between w-full items-center pr-2">
            <div className="flex items-center">
              <span className="font-medium">Economy Standard</span>
              <Badge className="ml-2 bg-blue-500" variant="default">Recommended</Badge>
            </div>
            <span className="font-semibold text-primary">₹6,850</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>8kg cabin baggage</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>20kg check-in baggage</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Free seat selection</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Date changes (₹1,500 fee)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Cancellation (₹2,000 fee)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Complimentary meal</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="economy-flex" className="border-b-0">
        <AccordionTrigger className="px-4">
          <div className="flex justify-between w-full items-center pr-2">
            <span className="font-medium">Economy Flex</span>
            <span className="font-semibold text-primary">₹8,300</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4">
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>8kg cabin baggage</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>25kg check-in baggage</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Premium seat selection</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Free date changes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Full refund on cancellation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Premium meal with choices</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
} 