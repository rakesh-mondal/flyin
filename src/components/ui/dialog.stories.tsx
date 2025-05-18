import type { Meta, StoryObj } from '@storybook/react';
import { 
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from './dialog';
import { Button } from './button';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

// Basic dialog example
export const Basic = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Basic Dialog</DialogTitle>
        <DialogDescription>
          This is a basic dialog component example.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <p>Dialog content goes here.</p>
      </div>
      <DialogFooter>
        <Button type="submit">Continue</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Flight booking confirmation dialog
export const FlightBookingConfirmation = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Confirm Booking</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Confirm Your Booking</DialogTitle>
        <DialogDescription>
          Please review your flight details before confirming your booking.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flight-summary border-b border-gray-200 pb-3">
          <h4 className="font-medium text-gray-900">Flight Details</h4>
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Bengaluru (BLR) → London (LHR)</span>
              <span className="text-gray-900 font-medium">₹42,500</span>
            </div>
            <div className="flight-times flex justify-between">
              <span className="text-gray-500">May 15, 2023 • 21:45</span>
              <span className="text-gray-500">Arrives: May 16 • 06:20</span>
            </div>
            <div className="text-gray-500">Air India • Direct Flight</div>
          </div>
        </div>
        
        <div className="passenger-details border-b border-gray-200 pb-3">
          <h4 className="font-medium text-gray-900">Passenger Information</h4>
          <div className="mt-2 space-y-1 text-sm">
            <div className="text-gray-500">Rahul Sharma</div>
            <div className="text-gray-500">Adult • Seat 24A</div>
            <div className="text-gray-500">Meal: Vegetarian</div>
          </div>
        </div>
        
        <div className="price-summary">
          <h4 className="font-medium text-gray-900">Price Summary</h4>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Base Fare</span>
              <span className="text-gray-700">₹36,750</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Taxes & Fees</span>
              <span className="text-gray-700">₹5,750</span>
            </div>
            <div className="flex justify-between font-medium text-gray-900 pt-2 border-t border-gray-200 mt-2">
              <span>Total Amount</span>
              <span>₹42,500</span>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter className="flex justify-between sm:justify-between">
        <Button variant="outline" className="w-[45%] sm:w-auto">Cancel</Button>
        <Button className="w-[45%] sm:w-auto">Confirm & Pay</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Seat selection dialog
export const SeatSelectionDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Select Your Seat</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Select Your Seat</DialogTitle>
        <DialogDescription>
          Choose your preferred seat for your flight from Bengaluru to London.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <div className="seat-map bg-gray-50 p-4 rounded-md">
          <div className="flex justify-center mb-4">
            <div className="plane-nose w-10 h-10 bg-gray-200 rounded-t-full flex items-end justify-center pb-1">
              <span className="text-xs text-gray-600">Front</span>
            </div>
          </div>
          
          <div className="seats grid grid-cols-6 gap-2 max-w-md mx-auto">
            {/* Legend */}
            <div className="col-span-6 flex justify-center gap-4 mb-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span>Occupied</span>
              </div>
            </div>
            
            {/* Row labels */}
            <div className="text-center text-xs font-medium">A</div>
            <div className="text-center text-xs font-medium">B</div>
            <div className="text-center text-xs font-medium">C</div>
            <div className="text-center text-xs font-medium">D</div>
            <div className="text-center text-xs font-medium">E</div>
            <div className="text-center text-xs font-medium">F</div>
            
            {/* Row 1 */}
            <div className="seat w-8 h-8 bg-gray-400 rounded text-center flex items-center justify-center text-xs text-white">1A</div>
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">1B</div>
            <div className="seat w-8 h-8 bg-gray-400 rounded text-center flex items-center justify-center text-xs text-white">1C</div>
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">1D</div>
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">1E</div>
            <div className="seat w-8 h-8 bg-gray-400 rounded text-center flex items-center justify-center text-xs text-white">1F</div>
            
            {/* Row 2 */}
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">2A</div>
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">2B</div>
            <div className="seat w-8 h-8 bg-gray-400 rounded text-center flex items-center justify-center text-xs text-white">2C</div>
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">2D</div>
            <div className="seat w-8 h-8 bg-blue-500 rounded text-center flex items-center justify-center text-xs text-white">2E</div>
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">2F</div>
            
            {/* Row 3 */}
            <div className="seat w-8 h-8 bg-gray-400 rounded text-center flex items-center justify-center text-xs text-white">3A</div>
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">3B</div>
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">3C</div>
            <div className="seat w-8 h-8 bg-gray-400 rounded text-center flex items-center justify-center text-xs text-white">3D</div>
            <div className="seat w-8 h-8 bg-gray-200 rounded text-center flex items-center justify-center text-xs">3E</div>
            <div className="seat w-8 h-8 bg-gray-400 rounded text-center flex items-center justify-center text-xs text-white">3F</div>
          </div>
          
          <div className="flex justify-center mt-6">
            <div className="seat-info text-center">
              <p className="text-sm font-medium">Selected: 2E (Window)</p>
              <p className="text-xs text-gray-500">Extra legroom, ₹1,200</p>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" className="mr-2">Cancel</Button>
        <Button>Confirm Seat Selection</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Cancellation policy dialog
export const CancellationPolicyDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">View Cancellation Policy</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Cancellation Policy</DialogTitle>
        <DialogDescription>
          Important information about cancelling your flight booking
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="policy-info space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-900">Economy Fare</h4>
            <ul className="mt-2 space-y-1 list-disc pl-5 text-gray-600">
              <li>Cancel more than 72 hours before departure: ₹3,500 cancellation fee</li>
              <li>Cancel between 24-72 hours before departure: ₹7,000 cancellation fee</li>
              <li>Cancel less than 24 hours before departure: Non-refundable</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900">Flexi Fare</h4>
            <ul className="mt-2 space-y-1 list-disc pl-5 text-gray-600">
              <li>Cancel more than 72 hours before departure: ₹1,500 cancellation fee</li>
              <li>Cancel between 24-72 hours before departure: ₹3,000 cancellation fee</li>
              <li>Cancel less than 24 hours before departure: ₹5,000 cancellation fee</li>
            </ul>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-900">Additional Information</h4>
            <ul className="mt-2 space-y-1 list-disc pl-5 text-gray-600">
              <li>Date changes are allowed with applicable fare difference</li>
              <li>Name changes are not permitted as per airline policy</li>
              <li>Refunds will be processed within 7-14 business days</li>
            </ul>
          </div>
          
          <p className="text-xs text-gray-500 pt-2">
            These policies are subject to the terms and conditions of Air India. For more details, please refer to the airline's website.
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button>I Understand</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
); 