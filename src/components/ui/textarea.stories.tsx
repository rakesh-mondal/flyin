import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Textarea } from './textarea';
import { Label } from './label';
import { Button } from './button';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

// Basic textarea example
export const Basic: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Textarea {...args} />
    </div>
  ),
};

// With label example
export const WithLabel: Story = {
  args: {
    placeholder: 'Type your message here.',
    id: 'message',
  },
  render: (args) => (
    <div className="grid w-full max-w-md gap-1.5">
      <Label htmlFor={args.id}>Your message</Label>
      <Textarea {...args} />
    </div>
  ),
};

// Disabled textarea
export const Disabled: Story = {
  args: {
    placeholder: 'You cannot type here.',
    disabled: true,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Textarea {...args} />
    </div>
  ),
};

// Flight feedback form
export function FlightFeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const maxLength = 500;

  return (
    <div className="w-full max-w-md p-6 border rounded-lg space-y-4">
      <div>
        <h3 className="text-lg font-medium">Flight Experience Feedback</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your recent flight from Bengaluru to Delhi
        </p>
      </div>
      
      <div className="grid gap-1.5">
        <Label htmlFor="feedback" className="text-sm font-medium">
          Your feedback
        </Label>
        <Textarea 
          id="feedback" 
          placeholder="Please share your experience, including service quality, in-flight meals, seat comfort, and overall satisfaction."
          className="min-h-[120px]"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          maxLength={maxLength}
        />
        <div className="flex justify-end">
          <span className="text-xs text-muted-foreground">
            {feedback.length}/{maxLength} characters
          </span>
        </div>
      </div>
      
      <Button className="w-full">Submit Feedback</Button>
    </div>
  );
}

// Special requests form for flight booking
export function SpecialRequestsForm() {
  return (
    <div className="w-full max-w-md p-6 border rounded-lg space-y-4">
      <div>
        <h3 className="text-lg font-medium">Special Requests</h3>
        <p className="text-sm text-muted-foreground">
          Add any special requests for your Bengaluru to London flight
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-1.5">
          <Label htmlFor="dietary" className="text-sm font-medium">
            Dietary Requirements
          </Label>
          <Textarea 
            id="dietary" 
            placeholder="Please specify any dietary restrictions or meal preferences (e.g., vegetarian, gluten-free, etc.)"
            className="min-h-[80px]"
          />
        </div>
        
        <div className="grid gap-1.5">
          <Label htmlFor="medical" className="text-sm font-medium">
            Medical Assistance
          </Label>
          <Textarea 
            id="medical" 
            placeholder="Please specify any medical conditions or assistance needed during the flight"
            className="min-h-[80px]"
          />
        </div>
        
        <div className="grid gap-1.5">
          <Label htmlFor="seating" className="text-sm font-medium">
            Seating Preferences
          </Label>
          <Textarea 
            id="seating" 
            placeholder="Please specify any seating preferences (e.g., aisle, window, extra legroom, etc.)"
            className="min-h-[80px]"
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline">Skip</Button>
        <Button>Save Requests</Button>
      </div>
    </div>
  );
}

// Trip notes component
export function TripNotesComponent() {
  const [notes, setNotes] = useState('');
  
  return (
    <div className="w-full max-w-md p-6 border rounded-lg space-y-4">
      <div>
        <h3 className="text-lg font-medium">Trip Notes</h3>
        <p className="text-sm text-muted-foreground">
          Keep track of important details for your upcoming trip
        </p>
      </div>
      
      <div className="grid gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="notes" className="text-sm font-medium">
            Personal Notes
          </Label>
          <span className="text-xs text-blue-600 cursor-pointer">
            Save to Cloud
          </span>
        </div>
        <Textarea 
          id="notes" 
          placeholder="Add reminders, packing list, contact information, or any other important details for your trip"
          className="min-h-[150px]"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <div className="bg-muted/50 p-3 rounded-md">
        <p className="text-xs text-muted-foreground">
          These notes are automatically saved to your device and can be accessed offline during your trip. Notes are private and not shared with the airline.
        </p>
      </div>
    </div>
  );
} 