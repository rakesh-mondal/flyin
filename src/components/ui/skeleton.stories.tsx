import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';
import { Card, CardContent, CardFooter, CardHeader } from './card';
import { Avatar } from './avatar';
import { Badge } from './badge';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Default skeleton
export const Default: Story = {
  args: {
    className: 'w-[100px] h-[20px] rounded-full',
  },
};

// Flight search results loading state
export function FlightSearchResults() {
  return (
    <div className="flex w-full max-w-3xl flex-col space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* Flight Card 1 */}
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          </div>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between py-4">
            <div className="text-center">
              <Skeleton className="mx-auto h-5 w-16" />
              <Skeleton className="mx-auto mt-2 h-4 w-24" />
            </div>
            <div className="flex flex-1 items-center justify-center">
              <Skeleton className="h-[2px] w-full max-w-[160px]" />
            </div>
            <div className="text-center">
              <Skeleton className="mx-auto h-5 w-16" />
              <Skeleton className="mx-auto mt-2 h-4 w-24" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[140px]" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-9 w-[120px]" />
        </CardFooter>
      </Card>

      {/* Flight Card 2 */}
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[140px]" />
              <Skeleton className="h-4 w-[90px]" />
            </div>
          </div>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between py-4">
            <div className="text-center">
              <Skeleton className="mx-auto h-5 w-16" />
              <Skeleton className="mx-auto mt-2 h-4 w-24" />
            </div>
            <div className="flex flex-1 items-center justify-center">
              <Skeleton className="h-[2px] w-full max-w-[160px]" />
            </div>
            <div className="text-center">
              <Skeleton className="mx-auto h-5 w-16" />
              <Skeleton className="mx-auto mt-2 h-4 w-24" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[140px]" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-9 w-[120px]" />
        </CardFooter>
      </Card>

      <div className="flex justify-center pt-4">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

// Flight details page loading
export function FlightDetails() {
  return (
    <div className="flex w-full max-w-3xl flex-col space-y-5">
      {/* Header */}
      <div className="flex justify-between">
        <Skeleton className="h-8 w-[180px]" />
        <Skeleton className="h-8 w-[120px]" />
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Flight Summary */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-[240px]" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between pb-6 pt-2">
            <div className="text-center">
              <Skeleton className="mx-auto h-6 w-20" />
              <Skeleton className="mx-auto mt-2 h-4 w-32" />
              <Skeleton className="mx-auto mt-2 h-4 w-24" />
            </div>
            <div className="flex-1 px-4">
              <Skeleton className="mx-auto h-[2px] w-full" />
              <div className="flex justify-center">
                <Skeleton className="mt-2 h-4 w-32" />
              </div>
            </div>
            <div className="text-center">
              <Skeleton className="mx-auto h-6 w-20" />
              <Skeleton className="mx-auto mt-2 h-4 w-32" />
              <Skeleton className="mx-auto mt-2 h-4 w-24" />
            </div>
          </div>
          
          {/* Flight details */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[90px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-[240px]" />
          </div>
          <Skeleton className="h-9 w-[120px]" />
        </CardFooter>
      </Card>

      {/* Price breakdown */}
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-[180px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[140px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[160px]" />
            <Skeleton className="h-4 w-[70px]" />
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-5 w-[90px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passenger information */}
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-6 w-[220px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[140px]" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[160px]" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}

// Booking confirmation loading
export function BookingConfirmation() {
  return (
    <div className="flex w-full max-w-md flex-col items-center space-y-6 text-center">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-7 w-[250px]" />
      <Skeleton className="h-5 w-[300px]" />
      
      <div className="w-full space-y-3 rounded-lg border p-6">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-[120px]" />
          <Skeleton className="h-5 w-[140px]" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-[90px]" />
          <Skeleton className="h-5 w-[170px]" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-[110px]" />
          <Skeleton className="h-5 w-[150px]" />
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[80px]" />
            <Skeleton className="h-6 w-[100px]" />
          </div>
        </div>
      </div>
      
      <div className="flex w-full space-x-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

// Mobile Profile loading
export function MobileProfile() {
  return (
    <div className="w-full max-w-md space-y-5 p-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-5 w-[120px]" />
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border p-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="mt-2 h-4 w-[80px]" />
            <Skeleton className="mt-1 h-4 w-[60px]" />
          </div>
          <div className="rounded-lg border p-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="mt-2 h-4 w-[90px]" />
            <Skeleton className="mt-1 h-4 w-[70px]" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <Skeleton className="h-5 w-[140px]" />
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center">
              <Skeleton className="h-6 w-6 rounded-md" />
              <Skeleton className="ml-3 h-4 w-[120px]" />
            </div>
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center">
              <Skeleton className="h-6 w-6 rounded-md" />
              <Skeleton className="ml-3 h-4 w-[150px]" />
            </div>
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center">
              <Skeleton className="h-6 w-6 rounded-md" />
              <Skeleton className="ml-3 h-4 w-[160px]" />
            </div>
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>
      </div>
      
      <Skeleton className="h-10 w-full" />
    </div>
  );
} 