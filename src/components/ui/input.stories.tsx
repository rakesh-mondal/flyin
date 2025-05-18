import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is a pre-filled value',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const FlightSearch: Story = {
  args: {
    placeholder: 'BLR - Bengaluru',
    className: 'border-gray-300 focus-visible:ring-blue-500',
  },
};

export const BookingForm: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Passenger Name
        </label>
        <Input id="name" placeholder="Enter full name as in passport" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address
        </label>
        <Input id="email" type="email" placeholder="your.email@example.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Mobile Number
        </label>
        <Input id="phone" type="tel" placeholder="+91 98765 43210" />
      </div>
    </div>
  ),
}; 