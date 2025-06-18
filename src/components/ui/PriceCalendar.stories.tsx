import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { format } from 'date-fns';
import { PriceCalendar } from './PriceCalendar';
import { DateRange } from 'react-day-picker';

const meta = {
  title: 'UI/PriceCalendar',
  component: PriceCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PriceCalendar>;

export default meta;
type Story = StoryObj<typeof PriceCalendar>;

// Custom price data for demonstration (matching the reference image)
const customPriceData = {
  // June 2025
  '2025-06-01': null, // No flights
  '2025-06-02': 8220,
  '2025-06-03': 11763,
  '2025-06-04': 9597,
  '2025-06-05': 11844,
  '2025-06-06': 11562,
  '2025-06-07': 12354,
  '2025-06-08': 11763,
  '2025-06-09': 12099,
  '2025-06-10': null, // No flights
  '2025-06-11': 8220,
  '2025-06-12': 11127,
  '2025-06-13': 11697,
  '2025-06-14': 8370,
  '2025-06-15': 11844,
  '2025-06-16': 8370,
  '2025-06-17': 8370,
  '2025-06-18': 11364,
  '2025-06-19': 12453,
  '2025-06-20': 12453,
  '2025-06-21': 11856,
  '2025-06-22': 10845, // Selected in the image
  '2025-06-23': 11844,
  '2025-06-24': 9528, // Green price (good deal)
  '2025-06-25': 10452,
  '2025-06-26': 11127,
  '2025-06-27': 10830,
  '2025-06-28': 10104,
  '2025-06-29': 10797,
  '2025-06-30': 12453,
  
  // July 2025
  '2025-07-01': 8220,
  '2025-07-02': 11763,
  '2025-07-03': 9597,
  '2025-07-04': 11844,
  '2025-07-05': 11562,
  '2025-07-06': 12354,
  '2025-07-07': 11763,
  '2025-07-08': 12099,
  '2025-07-09': null,
  '2025-07-10': 8220,
  '2025-07-11': 11127,
  '2025-07-12': 11697,
  '2025-07-13': 8370,
  '2025-07-14': 11844,
  '2025-07-15': 8370,
  '2025-07-16': 8370,
  '2025-07-17': 8220,
  '2025-07-18': 9207,
  '2025-07-19': 9597,
  '2025-07-20': 8916,
  '2025-07-21': 8916,
  '2025-07-22': null,
  '2025-07-23': 8517,
  '2025-07-24': null,
  '2025-07-25': 8124, // Green price (good deal)
  '2025-07-26': 8220,
  '2025-07-27': 8220,
  '2025-07-28': 8220,
  '2025-07-29': null,
  '2025-07-30': 8124, // Green price (good deal)
  '2025-07-31': 8220,
};

// Single month price calendar
export const SingleMonth: Story = {
  args: {
    mode: 'single',
    numberOfMonths: 1,
    defaultMonth: new Date('2025-06-01'),
    priceData: customPriceData,
    className: 'rounded-md border',
  },
};

// Dual month price calendar (like in the reference image)
export function DualMonthPriceCalendar() {
  const [selected, setSelected] = useState<Date | undefined>(new Date('2025-06-22'));
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">Flight Prices: NYC to Dubai</h3>
      <p className="text-sm text-gray-500">Select your travel date to see the price</p>
      <PriceCalendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        onDateSelect={(date, price) => {
          console.log('Selected:', format(date, 'MMM dd, yyyy'), 'Price:', price);
        }}
        defaultMonth={new Date('2025-06-01')}
        numberOfMonths={2}
        priceData={customPriceData}
        className="rounded-md border"
      />
      {selected && (
        <div className="text-center text-sm">
          <p className="font-medium">Selected: {format(selected, 'EEEE, MMMM d, yyyy')}</p>
          {customPriceData[format(selected, 'yyyy-MM-dd')] && (
            <p className="text-lg font-bold text-primary">
              ₹{customPriceData[format(selected, 'yyyy-MM-dd')]?.toLocaleString()}
            </p>
          )}
          {customPriceData[format(selected, 'yyyy-MM-dd')] === null && (
            <p className="text-gray-500">No flights available</p>
          )}
        </div>
      )}
    </div>
  );
}

// Date range selection with prices
export function DateRangePriceCalendar() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date('2025-06-22'),
    to: new Date('2025-07-25'),
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">Round Trip Flight Prices</h3>
      <p className="text-sm text-gray-500">Select departure and return dates</p>
      <PriceCalendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        onDateSelect={(date, price) => {
          console.log('Date clicked:', format(date, 'MMM dd'), 'Price:', price);
        }}
        defaultMonth={new Date('2025-06-01')}
        numberOfMonths={2}
        priceData={customPriceData}
        className="rounded-md border"
      />
      {dateRange?.from && dateRange?.to && (
        <div className="text-center text-sm">
          <p className="font-medium">
            {format(dateRange.from, 'MMM dd')} → {format(dateRange.to, 'MMM dd')}
          </p>
          <div className="flex gap-4 justify-center mt-2">
            <div>
              <span className="text-gray-500">Departure: </span>
              <span className="font-bold">
                ₹{customPriceData[format(dateRange.from, 'yyyy-MM-dd')]?.toLocaleString() || 'N/A'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Return: </span>
              <span className="font-bold">
                ₹{customPriceData[format(dateRange.to, 'yyyy-MM-dd')]?.toLocaleString() || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Auto-generated prices example
export function AutoGeneratedPrices() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">Dynamic Flight Prices</h3>
      <p className="text-sm text-gray-500">Prices generated automatically with realistic patterns</p>
      <PriceCalendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        onDateSelect={(date, price) => {
          console.log('Selected:', format(date, 'MMM dd, yyyy'), 'Price:', price);
        }}
        numberOfMonths={2}
        className="rounded-md border"
      />
      {selected && (
        <div className="text-center text-sm">
          <p className="font-medium">Selected: {format(selected, 'EEEE, MMMM d, yyyy')}</p>
          <p className="text-gray-500">Prices auto-generate with weekend premiums and random discounts</p>
        </div>
      )}
    </div>
  );
} 