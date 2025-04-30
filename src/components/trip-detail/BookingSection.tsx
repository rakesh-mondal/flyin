
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BookingSectionProps {
  price: number;
}

export function BookingSection({ price }: BookingSectionProps) {
  const handleBookFlight = () => {
    toast.success("Flight reserved successfully!", {
      description: "Your booking confirmation has been sent to your email.",
    });
  };

  return (
    <div className="sticky bottom-0 mt-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total price</p>
          <p className="text-2xl font-medium">${price}</p>
        </div>
        <Button
          className={cn(
            "rounded-full bg-black px-6 py-6 text-white hover:bg-black/90",
            "transition-all duration-300"
          )}
          onClick={handleBookFlight}
        >
          <span>Book with</span>
          <svg className="ml-2 h-4" viewBox="0 0 43 19" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.7 1.6c.4-.5 1.1-.9 1.9-.9.1 0 .3 0 .4.1-.1.1-.2.2-.3.3-1 1-1.2 2.8-.6 4.1.7-1.1 2.5-1.8 4-1.2-1 2.9-2.5 5.4-4.4 7.9-1.9 2.4-3.7 4.9-6.8 4.9H.8C.4 16.7 0 16.4 0 16v-5.8c0-.4.3-.7.7-.7h.1c3.1 0 3.8-2 6-2.7 1.3-.4 2.8-.9 3.9-1.5-1.1-1-2.8-2.3-4-3.7zm36.3 9c0 2.8-2.3 5.1-5.1 5.1H20.5c-.4 0-.7-.3-.7-.7V6.3c0-.4.3-.7.7-.7h17c3.3 0 5.5 2.3 5.5 5zm-15.2-1.8h-.7v-1.1h.7V7h1v.7h1.1v1h-1.1V10h-1V8.8zM28.7 7h1v3h-1V7zm-1.9 3h-1.1V7h1.1v3zm9.9-2h-3v-.9h3V8zm0 2h-3v-1h3v1z" fill="currentColor"/>
          </svg>
        </Button>
      </div>
    </div>
  );
}
