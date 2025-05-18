import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from './form';
import { Input } from './input';
import { Button } from './button';
import { Checkbox } from './checkbox';

const meta = {
  title: 'UI/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

// Example form schema using zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

// Base form component with React Hook Form
const FormExample = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This would handle form submission in a real application
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormDescription>
                Enter your name as it appears on your ID/passport.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Your booking confirmation will be sent to this email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept terms and conditions</FormLabel>
                <FormDescription>
                  I agree to the terms of service and privacy policy.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  );
};

// Basic form example story
export const BasicForm: Story = {
  render: () => <FormExample />,
};

// Flight booking form story with more specific fields
const FlightBookingFormExample = () => {
  // A more specific schema for flight booking
  const bookingSchema = z.object({
    passengerName: z.string().min(2, {
      message: "Passenger name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
      message: "Please enter a valid phone number.",
    }),
    dob: z.string().min(1, {
      message: "Date of birth is required.",
    }),
    passportNumber: z.string().min(8, {
      message: "Please enter a valid passport number.",
    }),
    termsAccepted: z.boolean().refine(val => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  });

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengerName: "",
      email: "",
      phone: "",
      dob: "",
      passportNumber: "",
      termsAccepted: false,
    },
  });

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    console.log(values);
    alert("Booking information submitted: " + JSON.stringify(values, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Passenger Information</h2>
        
        <FormField
          control={form.control}
          name="passengerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passenger Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name as in passport" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+91 98765 43210" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport Number</FormLabel>
                <FormControl>
                  <Input placeholder="J1234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Terms and Conditions</FormLabel>
                <FormDescription>
                  I agree to the booking terms, cancellation policy, and privacy policy.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Continue to Payment
        </Button>
      </form>
    </Form>
  );
};

export const FlightBookingForm: Story = {
  render: () => <FlightBookingFormExample />,
}; 