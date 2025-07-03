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

// Flight card with different airports highlighted
export const DifferentAirports: Story = {
  args: {
    flight: {
      ...sampleFlightDataWithLayovers[0],
      departureCode: 'LGA', // Different from searched JFK
      arrivalCode: 'DWC', // Different from searched DXB
    },
    onClick: () => console.log('Flight card clicked'),
    isSelected: false,
    searchedOrigin: 'JFK', // User searched for JFK but flight uses LGA
    searchedDestination: 'DXB', // User searched for DXB but flight uses DWC
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

// Flight with discounted price
export const DiscountedPrice: Story = {
  args: {
    flight: sampleFlightDataWithLayovers[0], // Emirates with originalPrice
    onClick: () => console.log('Discounted flight card clicked'),
    isSelected: false,
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

// Airport highlighting showcase
export const AirportHighlightShowcase = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <h3 className="text-lg font-semibold mb-4">Different Airport Indication Examples</h3>
      <div className="space-y-4">
        {/* Normal airports - no highlighting */}
        <div className="text-sm text-gray-600 mb-2">✅ Exact match - no highlighting:</div>
        <FlightResultCard
          flight={{
            ...sampleFlightDataWithLayovers[0],
            departureCode: 'JFK',
            arrivalCode: 'DXB',
          }}
          onClick={() => console.log('Normal flight clicked')}
          isSelected={false}
          searchedOrigin="JFK"
          searchedDestination="DXB"
        />
        
        {/* Different but nearby airports - red dots */}
        <div className="text-sm text-gray-600 mb-2 mt-6">🔴 Nearby airports - red dots shown:</div>
        <FlightResultCard
          flight={{
            ...sampleFlightDataWithLayovers[0],
            departureCode: 'LGA', // LaGuardia instead of JFK
            arrivalCode: 'DWC',   // Al Maktoum instead of DXB
          }}
          onClick={() => console.log('Different airports flight clicked')}
          isSelected={false}
          searchedOrigin="JFK"
          searchedDestination="DXB"
        />
        
        {/* Another example */}
        <FlightResultCard
          flight={{
            ...sampleFlightDataWithLayovers[1],
            departureCode: 'EWR', // Newark instead of JFK
            arrivalCode: 'SHJ',   // Sharjah instead of DXB
          }}
          onClick={() => console.log('Another different airports flight clicked')}
          isSelected={false}
          searchedOrigin="JFK"
          searchedDestination="DXB"
        />
      </div>
    </div>
  ),
};

// Pricing showcase with discounts
export const PricingShowcase = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <h3 className="text-lg font-semibold mb-4">Pricing Examples (With and Without Discounts)</h3>
      <div className="space-y-4">
        {sampleFlightDataWithLayovers.filter(flight => flight.originalPrice).map((flight) => (
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