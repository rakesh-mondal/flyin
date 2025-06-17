import type { Meta, StoryObj } from '@storybook/react';
import FlightResultCard from './FlightResultCard';
import { sampleFlightDataWithLayovers } from '@/data/sampleFlightData';

const meta = {
  title: 'TripCuration/FlightResultCard',
  component: FlightResultCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FlightResultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic flight card
export const Default: Story = {
  args: {
    flight: sampleFlightDataWithLayovers[4], // Air India - Direct flight (no layover tag)
    onClick: () => console.log('Flight card clicked'),
    isSelected: false,
  },
};

// Flight with long layover
export const LongLayover: Story = {
  args: {
    flight: sampleFlightDataWithLayovers[0], // Emirates - 6h 55m layover (Long Layover tag)
    onClick: () => console.log('Flight card clicked'),
    isSelected: false,
  },
};

// Flight with short layover
export const ShortLayover: Story = {
  args: {
    flight: sampleFlightDataWithLayovers[1], // Turkish Airlines - 1h 30m layover (Short Layover tag)
    onClick: () => console.log('Flight card clicked'),
    isSelected: false,
  },
};

// Flight with normal layover (no tag)
export const NormalLayover: Story = {
  args: {
    flight: sampleFlightDataWithLayovers[2], // Lufthansa - 3h 15m layover (no tag)
    onClick: () => console.log('Flight card clicked'),
    isSelected: false,
  },
};

// Flight with very long layover
export const VeryLongLayover: Story = {
  args: {
    flight: sampleFlightDataWithLayovers[3], // Qatar Airways - 8h 45m layover (Long Layover tag)
    onClick: () => console.log('Flight card clicked'),
    isSelected: false,
  },
};

// Selected flight card
export const Selected: Story = {
  args: {
    flight: sampleFlightDataWithLayovers[0], // Emirates with long layover
    onClick: () => console.log('Flight card clicked'),
    isSelected: true,
  },
};

// Multiple cards showcase
export const LayoverShowcase = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <h3 className="text-lg font-semibold mb-4">Layover Tag Examples</h3>
      <div className="space-y-4">
        {sampleFlightDataWithLayovers.map((flight) => (
          <FlightResultCard
            key={flight.id}
            flight={flight}
            onClick={() => console.log(`Flight ${flight.id} clicked`)}
            isSelected={false}
          />
        ))}
      </div>
    </div>
  ),
}; 