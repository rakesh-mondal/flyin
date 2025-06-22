import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, addDays, eachDayOfInterval } from "date-fns";
import { ar } from "date-fns/locale";
import { useLanguage } from "../../hooks/useLanguage";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type PriceCalendarProps = React.ComponentProps<typeof DayPicker> & {
  priceData?: Record<string, number | null>;
  onDateSelect?: (date: Date, price?: number | null) => void;
};

// Generate mock price data for the next 3 months
function generateMockPriceData(): Record<string, number | null> {
  const priceData: Record<string, number | null> = {};
  const startDate = new Date();
  const endDate = addDays(startDate, 90); // 3 months ahead
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  days.forEach((day, index) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    
    // Use a simple seed based on date for consistent randomness
    const seed = (day.getDate() + day.getMonth() * 31) % 100;
    
    // 10% chance of no flights available (reduced from 15%)
    if (seed < 10) {
      priceData[dateKey] = null;
      return;
    }
    
    // Generate more realistic prices between 6000-15000
    const priceVariation = (seed * 137) % 9000; // Better pseudo-random
    const basePrice = 6000 + priceVariation;
    
    // Weekend multiplier (Friday-Sunday higher prices)
    const dayOfWeek = day.getDay();
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;
    const weekendMultiplier = isWeekend ? 1.3 : 1;
    
    // Discount multiplier for some dates (30% chance)
    const hasDiscount = seed % 10 < 3; // 30% chance of discount
    const discountMultiplier = hasDiscount ? 0.8 : 1;
    
    const finalPrice = Math.round(basePrice * weekendMultiplier * discountMultiplier);
    priceData[dateKey] = finalPrice;
  });
  
  return priceData;
}

function PriceCalendar({
  className,
  classNames,
  showOutsideDays = true,
  priceData,
  onDateSelect,
  ...props
}: PriceCalendarProps) {
  const { language } = useLanguage();
  const [mockPriceData] = React.useState(() => {
    const data = generateMockPriceData();
    console.log('Generated price data sample:', Object.entries(data).slice(0, 5));
    return data;
  });
  const finalPriceData = priceData || mockPriceData;
  
  // Calculate min price for highlighting best deals
  const availablePrices = Object.values(finalPriceData).filter(price => price !== null && price !== undefined) as number[];
  const minPrice = availablePrices.length > 0 ? Math.min(...availablePrices) : 0;
  const maxPrice = availablePrices.length > 0 ? Math.max(...availablePrices) : 0;
  const priceThreshold = availablePrices.length > 0 ? minPrice + (maxPrice - minPrice) * 0.3 : 0; // Bottom 30% are "good deals"

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      locale={language === 'ar' ? ar : undefined}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-3 sm:space-x-3 sm:space-y-0",
        month: "space-y-3",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-0.5",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-10 font-normal text-[0.75rem] text-center",
        row: "flex w-full mt-1",
        cell: "h-12 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          "h-12 w-10 p-0.5 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex flex-col items-center justify-center cursor-pointer rounded-md"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground font-semibold",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        DayContent: ({ date, activeModifiers }) => {
          const dateKey = format(date, 'yyyy-MM-dd');
          const price = finalPriceData[dateKey];
          const isGoodDeal = price !== null && price !== undefined && price <= priceThreshold;
          
          // Only apply white text for fully selected dates (dark blue background)
          // Not for range middle dates (light blue background)
          const isFullySelected = activeModifiers?.selected && !activeModifiers?.range_middle;
          
          // Format price to be more compact (show in thousands)
          const formatPrice = (price: number) => {
            if (price >= 1000) {
              return `₹${Math.round(price / 1000)}k`;
            }
            return `₹${price}`;
          };
          
          return (
            <div 
              className="flex flex-col items-center justify-center h-full w-full gap-0"
              onClick={() => onDateSelect?.(date, price)}
            >
              <span className={cn(
                "text-xs font-medium",
                isFullySelected ? "text-white drop-shadow-sm" : ""
              )}>
                {format(date, 'd')}
              </span>
              <span 
                className={cn(
                  "text-[9px] font-semibold leading-none",
                  isFullySelected 
                    ? "text-white drop-shadow-sm" // White text only for fully selected dates (dark blue)
                    : price === null || price === undefined
                      ? "text-gray-400" 
                      : isGoodDeal 
                        ? "text-green-600" 
                        : "text-gray-600"
                )}
              >
                {price === null || price === undefined ? '-' : formatPrice(price)}
              </span>
            </div>
          );
        },
      }}
      {...props}
    />
  );
}

PriceCalendar.displayName = "PriceCalendar";

export { PriceCalendar }; 