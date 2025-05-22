import React, { useState } from 'react';
import { X, ArrowRight, Coffee, Clock, Sofa, Baby, Footprints, Timer, MoveRight, Wifi, Landmark, ShoppingBag, Utensils, Bed, Info, PlaneLanding, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface FlightDetailsProps {
  flight?: {
    airline: string;
    flightNumber: string;
    class: string;
    departureTime: string;
    departureCode: string;
    departureCity: string;
    arrivalTime: string;
    arrivalCode: string;
    arrivalCity: string;
    duration: string;
    stopType: string;
    segments?: Array<{
      airline: string;
      flightNumber: string;
      departureTime: string;
      departureCode: string;
      departureCity: string;
      departureAirport: string;
      arrivalTime: string;
      arrivalCode: string;
      arrivalCity: string;
      arrivalAirport: string;
      duration: string;
      date: string;
    }>;
    layover?: string;
    price?: string;
    date?: string;
    aircraft?: {
      type: string;
      seatConfiguration: string;
      seatType?: string;
    };
    baggage?: {
      checkIn: string;
      cabin: string;
    };
    airport?: {
      prayerRoom: string;
      lounges: string;
      babyRoom?: string;
      foodOptions: {
        name: string;
        logo?: string;
      }[];
      amenities: {
        name: string;
        icon?: React.ReactNode;
      }[];
    };
  };
  onClose?: () => void;
}

export function FlightDetails({ flight, onClose }: FlightDetailsProps) {
  const [activeTab, setActiveTab] = useState<'trip' | 'facility'>('trip');
  
  // Default data if flight is not provided
  const defaultFlight = {
    airline: "Emirates",
    flightNumber: "AI 840",
    class: "Economy",
    departureTime: "13:10",
    departureCode: "RUH",
    departureCity: "Riyadh",
    arrivalTime: "20:05",
    arrivalCode: "DXB",
    arrivalCity: "Dubai",
    duration: "6h 45min",
    stopType: "1 stop",
    date: "Fri, 30 May",
    segments: [
      {
        airline: "Emirates",
        flightNumber: "AI 840",
        departureTime: "13:10",
        departureCode: "RUH",
        departureCity: "Riyadh",
        departureAirport: "King Khaled Int'l",
        arrivalTime: "15:05",
        arrivalCode: "JED",
        arrivalCity: "Jeddah",
        arrivalAirport: "King Abdulaziz Int'l",
        duration: "1h 55m",
        date: "Mon, 19 May"
      },
      {
        airline: "Emirates",
        flightNumber: "AI 853",
        departureTime: "16:05",
        departureCode: "JED",
        departureCity: "Jeddah",
        departureAirport: "King Abdulaziz Int'l",
        arrivalTime: "20:05",
        arrivalCode: "DXB",
        arrivalCity: "Dubai",
        arrivalAirport: "Dubai Int'l",
        duration: "3h",
        date: "Mon, 19 May"
      }
    ],
    layover: "1hr layover in Jeddah",
    price: "₹35,909",
    aircraft: {
      type: "Boeing 777-300ER",
      seatConfiguration: "3-4-3",
      seatType: "Standard (Limited seat tile)"
    },
    baggage: {
      checkIn: "23kg",
      cabin: "7kg"
    },
    airport: {
      prayerRoom: "Near Gate 12",
      lounges: "Emirates lounge, priority pass",
      babyRoom: "Near gate 14",
      foodOptions: [
        { name: "Starbucks", logo: "/logos/starbucks.png" },
        { name: "Shake Shack", logo: "/logos/shakeshack.png" },
        { name: "McDonald's", logo: "/logos/mcdonalds.png" },
        { name: "Subway", logo: "/logos/subway.png" }
      ],
      amenities: [
        { name: "Wi-Fi" },
        { name: "Power Outlets" },
        { name: "Entertainment" },
        { name: "Meals" }
      ]
    }
  };

  const data = flight || defaultFlight;

  // Airport facilities data for all segments
  const airportFacilities = [
    {
      name: data.segments?.[0]?.departureAirport || "King Khaled Intl Airport",
      facilities: {
        prayerRoom: "Near gate 10",
        lounges: "Emirates lounge, priority pass",
        babyRoom: "Near gate 14",
        foodOptions: [
          { name: "Starbucks", logo: "/logos/starbucks.png" },
          { name: "Shake Shack", logo: "/logos/shakeshack.png" },
          { name: "Subway", logo: "/logos/subway.png" },
          { name: "McDonald's", logo: "/logos/mcdonalds.png" }
        ]
      }
    },
    {
      name: data.segments?.[0]?.arrivalAirport || "King Abdulaziz Intl Airport",
      facilities: {
        prayerRoom: "Near gate 12",
        lounges: "Emirates lounge, priority pass",
        babyRoom: "Near gate 10",
        foodOptions: [
          { name: "Starbucks", logo: "/logos/starbucks.png" },
          { name: "Shake Shack", logo: "/logos/shakeshack.png" },
          { name: "Subway", logo: "/logos/subway.png" },
          { name: "McDonald's", logo: "/logos/mcdonalds.png" }
        ]
      }
    },
    {
      name: data.segments?.[1]?.arrivalAirport || "Dubai International Airport Terminal",
      facilities: {
        prayerRoom: "Near gate 12",
        lounges: "Emirates lounge, priority pass",
        babyRoom: "Near gate 10",
        foodOptions: [
          { name: "Starbucks", logo: "/logos/starbucks.png" },
          { name: "Shake Shack", logo: "/logos/shakeshack.png" },
          { name: "Subway", logo: "/logos/subway.png" },
          { name: "McDonald's", logo: "/logos/mcdonalds.png" }
        ]
      }
    }
  ];

  // Function to render the logo based on the logo property
  const renderLogo = (food) => {
    // Keep fallback for Shake Shack if its PNG is still problematic
    if (food.logo === "shake-shack" && !food.logo.endsWith('.png')) { // A more robust check might be needed
      return (
        <div className="w-8 h-8 rounded-md mr-1 flex items-center justify-center" style={{ background: '#1D8938' }}>
          <span className="text-white font-bold text-xs">SS</span>
        </div>
      );
    }
    // Default to img tag for all PNGs
    return (
      <img 
        src={food.logo} 
        alt={food.name} 
        className="w-8 h-8 mr-1 object-contain rounded-md bg-white p-0.5"
        style={{ maxWidth: '32px', maxHeight: '32px' }}
        onError={(e) => {
          // Fallback for any image that fails to load, e.g., show initials or a generic icon
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loop if fallback also fails
          target.style.display = 'none'; // Hide broken image
          // Optionally, replace with a placeholder div:
          // const placeholder = document.createElement('div');
          // placeholder.className = "w-8 h-8 rounded-md mr-1 flex items-center justify-center bg-gray-200 text-gray-500 text-xs";
          // placeholder.textContent = food.name.substring(0, 2).toUpperCase();
          // target.parentNode?.insertBefore(placeholder, target.nextSibling);
        }}
      />
    );
  };

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-auto flex flex-col">
      {/* Tabs */}
      <div className="flex border-b">
        <button 
          className={cn(
            "px-4 py-3 text-base font-medium flex-1 text-center", 
            activeTab === 'trip' 
              ? "text-blue-600 border-b-2 border-blue-600" 
              : "text-gray-800 hover:text-blue-600"
          )}
          onClick={() => setActiveTab('trip')}
        >
          Flight Details
        </button>
        <button 
          className={cn(
            "px-4 py-3 text-base font-medium flex-1 text-center", 
            activeTab === 'facility' 
              ? "text-blue-600 border-b-2 border-blue-600" 
              : "text-gray-800 hover:text-blue-600"
          )}
          onClick={() => setActiveTab('facility')}
        >
          Airport Details
        </button>
        <button 
          onClick={onClose}
          className="p-3 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="px-4 py-4 flex-1 overflow-auto">
        {activeTab === 'trip' ? (
          <>
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-[18px] font-bold flex items-center">
                {data.departureCity} <span className="mx-2">→</span> {data.arrivalCity}
              </h2>
              <div className="text-gray-600 mt-1 text-[14px] font-medium flex flex-wrap gap-2">
                {data.duration} <span className="mx-1">•</span> {data.stopType} <span className="mx-1">•</span> {data.date} <span className="mx-1">•</span> {data.class}
              </div>
            </div>

            {/* Flight Segments Card */}
            <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-4 mb-6">
              {data.segments?.map((segment, index) => (
                <div key={index} className={index !== 0 ? 'pt-8 border-t border-gray-200 relative' : ''}>
                  {/* Layover pill */}
                  {index !== 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center cursor-pointer">
                          <span className="px-4 py-0.5 rounded-full bg-white border border-gray-300 text-[11px] font-medium shadow-sm flex items-center gap-1 whitespace-nowrap justify-center">
                            <span className="text-blue-700 font-semibold">Change of flights</span>
                            <span className="mx-1">•</span>
                            <span className="font-bold">1 hr</span> layover in Jeddah
                            <Info className="ml-1 h-3.5 w-3.5 text-blue-500" />
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="center" sideOffset={8} className="bg-white rounded-xl shadow-xl border border-gray-200 p-0 max-w-xs w-[320px]">
                        <div className="p-4">
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Footprints className="h-4 w-4 text-blue-500" />
                              <span className="font-semibold text-sm text-gray-900">Walking Information</span>
                            </div>
                            <ul className="ml-6 mt-1 text-xs text-gray-700 space-y-0.5">
                              <li className="flex items-center gap-2"><MoveRight className="h-3 w-3 text-gray-400" />Distance: ~800m between terminals</li>
                              <li className="flex items-center gap-2"><Timer className="h-3 w-3 text-gray-400" />Walking time: 8-12 minutes</li>
                              <li className="flex items-center gap-2"><MoveRight className="h-3 w-3 text-gray-400" />Escalators/moving walkways available</li>
                            </ul>
                          </div>
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <PlaneLanding className="h-4 w-4 text-blue-500" />
                              <span className="font-semibold text-sm text-gray-900">Terminal Transfer</span>
                            </div>
                            <ul className="ml-6 mt-1 text-xs text-gray-700 space-y-0.5">
                              <li>Arrival: <span className="font-medium">Terminal 1, Gate A12</span></li>
                              <li>Departure: <span className="font-medium">Terminal 1, Gate B8</span></li>
                              <li className="flex items-center gap-2"><BadgeCheck className="h-3 w-3 text-green-500" />Same terminal - no shuttle required</li>
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Info className="h-4 w-4 text-blue-500" />
                              <span className="font-semibold text-sm text-gray-900">Important Notes</span>
                            </div>
                            <ul className="ml-6 mt-1 text-xs text-gray-700 space-y-0.5">
                              <li>No visa required for transit</li>
                              <li>Stay in international transit area</li>
                              <li>Boarding begins 45 minutes before departure</li>
                            </ul>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {/* Airline row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img src="https://airhex.com/images/airline-logos/emirates.png" alt="Emirates" className="h-7 w-7 rounded bg-white border object-contain" />
                      <span className="font-bold text-[14px] text-gray-900">Emirates</span>
                      <span className="text-gray-500 font-medium">|</span>
                      <span className="text-gray-700 font-normal text-[14px]">{segment.flightNumber}</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <span className="ml-1 text-gray-400 cursor-pointer flex items-center" tabIndex={0} aria-label="Flight info">
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#A0AEC0" strokeWidth="2"/><rect x="11" y="10" width="2" height="6" rx="1" fill="#A0AEC0"/><rect x="11" y="7" width="2" height="2" rx="1" fill="#A0AEC0"/></svg>
                          </span>
                        </PopoverTrigger>
                        <PopoverContent align="start" sideOffset={8} className="p-0 w-[320px] bg-white border border-gray-200 rounded-xl shadow-xl">
                          <div className="p-4">
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                              <div className="flex items-center gap-2 text-gray-500 text-[12px] leading-[18px]">
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M2 16l20-4M2 8l20 4M10 6.5L12 4l2 2.5M10 17.5L12 20l2-2.5" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                Aircraft type
                              </div>
                              <div className="text-right font-medium text-gray-900 text-[12px] leading-[18px]">{data.aircraft?.type || '—'}</div>
                              <div className="flex items-center gap-2 text-gray-500 text-[12px] leading-[18px]">
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#A0AEC0" strokeWidth="1.5"/><rect x="8" y="3" width="8" height="4" rx="1" stroke="#A0AEC0" strokeWidth="1.5"/></svg>
                                Seat type
                              </div>
                              <div className="text-right font-semibold text-gray-900 text-[12px] leading-[18px]">{data.aircraft?.seatType || '—'}</div>
                              <div className="flex items-center gap-2 text-gray-500 text-[12px] leading-[18px]">
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#A0AEC0" strokeWidth="1.5"/><rect x="8" y="3" width="8" height="4" rx="1" stroke="#A0AEC0" strokeWidth="1.5"/></svg>
                                Seat configuration
                              </div>
                              <div className="text-right font-medium text-gray-900 text-[12px] leading-[18px]">{data.aircraft?.seatConfiguration || '—'}</div>
                              <div className="flex items-center gap-2 text-gray-500 text-[12px] leading-[18px]">
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                Low CO2 emission
                              </div>
                              <div className="text-right font-semibold text-gray-900 text-[12px] leading-[18px]">Low</div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center px-2 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-semibold border border-green-100">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="mr-1"><path d="M5 13l4 4L19 7" stroke="#38A169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        90% on-time
                      </span>
                      <span className="flex items-center px-2 py-0.5 rounded bg-yellow-50 text-yellow-800 text-[10px] font-semibold border border-yellow-100">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#F6E05E"/></svg>
                        4.6%(3124)
                      </span>
                    </div>
                  </div>
                  {/* Timeline + Content */}
                  <div className="flex w-full">
                    {/* Timeline and vertical line */}
                    <div className="relative flex flex-col items-center mr-4" style={{ minWidth: 16 }}>
                      {/* Top dot aligned with departure time */}
                      <div className="flex items-center justify-center" style={{ height: 32 }}>
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      </div>
                      {/* Vertical line exactly between dots */}
                      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 20, bottom: 28, width: '2px', background: '#D1D5DB', zIndex: 0 }} />
                      {/* Bottom dot aligned with arrival time */}
                      <div className="flex items-center justify-center mt-auto" style={{ height: 48 }}>
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      </div>
                    </div>
                    {/* Main content */}
                    <div className="flex-1 flex flex-col justify-between">
                      {/* Departure Row */}
                      <div className="flex items-center gap-3">
                        <div className="text-[18px] font-bold text-gray-900 leading-tight">{segment.departureTime}</div>
                        <div className="text-gray-700 font-medium text-[14px] leading-tight truncate">{segment.departureCode} – {segment.departureCity}, <span className="text-gray-500 font-normal">{segment.departureAirport}</span></div>
                      </div>
                      <div className="text-gray-500 text-[12px] mt-0.5 leading-tight">{segment.date}</div>
                      {/* Duration, amenities, and baggage info on the same row, with equal gap above and below */}
                      <div className="flex items-center py-[0.65rem] flex-wrap">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="text-gray-700 font-medium text-[14px]">{segment.duration}</div>
                          {/* Amenities icons with tooltips */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <img src="/icons/wifi.png" alt="Wi-Fi" className="w-4 h-4 rounded-md bg-white object-contain cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8} className="bg-black text-white px-3 py-2 rounded text-xs border-none shadow-lg">
                              In-flight Wi-Fi available
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <img src="/icons/power.png" alt="Power" className="w-4 h-4 rounded-md bg-white object-contain cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8} className="bg-black text-white px-3 py-2 rounded text-xs border-none shadow-lg">
                              Power outlets at your seat
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <img src="/icons/entertainment.png" alt="Entertainment" className="w-4 h-4 rounded-md bg-white object-contain cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8} className="bg-black text-white px-3 py-2 rounded text-xs border-none shadow-lg">
                              Personal entertainment screen
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <img src="/icons/baby.png" alt="Baby" className="w-4 h-4 rounded-md bg-white object-contain cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8} className="bg-black text-white px-3 py-2 rounded text-xs border-none shadow-lg">
                              Baby care facilities available
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <img src="/icons/meal.png" alt="Meal" className="w-4 h-4 rounded-md bg-white object-contain cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8} className="bg-black text-white px-3 py-2 rounded text-xs border-none shadow-lg">
                              Meal included
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        {/* Baggage info as two lines in a column */}
                        <div className="flex flex-col gap-1 min-w-[180px] items-end text-right">
                          <div className="flex items-center text-gray-500 text-[10px]">
                            <svg className="inline-block align-middle" width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="2" stroke="#A0AEC0" strokeWidth="2"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="#A0AEC0" strokeWidth="2"/></svg>
                            <span className="ml-1">Cabin:</span>
                            <span className="font-bold text-gray-900 ml-1">7kg</span>
                            <span className="font-bold text-gray-900 ml-1">per adult</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-[10px]">
                            <svg className="inline-block align-middle" width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="2" stroke="#A0AEC0" strokeWidth="2"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="#A0AEC0" strokeWidth="2"/></svg>
                            <span className="ml-1">Check-in:</span>
                            <span className="font-bold text-gray-900 ml-1">15kg</span>
                            <span className="font-bold text-gray-900 ml-1">per adult</span>
                          </div>
                        </div>
                      </div>
                      {/* Arrival Row */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="text-[18px] font-bold text-gray-900 leading-tight">{segment.arrivalTime}</div>
                        <div className="text-gray-700 font-medium text-[14px] leading-tight truncate">{segment.arrivalCode} – {segment.arrivalCity}, <span className="text-gray-500 font-normal">{segment.arrivalAirport}</span></div>
                      </div>
                      <div className="text-gray-500 text-[12px] mt-0.5 leading-tight">{segment.date}</div>
                    </div>
                  </div>
                  {/* Add consistent margin after each segment except the last */}
                  {index !== data.segments.length - 1 && <div className="mb-6" />}
                </div>
              ))}
            </div>

            {/* Special Offers */}
            <div className="mt-6">
              <h3 className="text-[16px] font-bold mb-3">Special Offers for you</h3>
              
              <div className="relative">
                <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 min-w-[180px] max-w-[200px] flex-shrink-0">
                    <div className="text-amber-600 uppercase font-bold text-xs mb-1">TRAVEL UPDATE</div>
                    <p className="text-gray-800 text-xs">
                      Due to evolving air travel conditions, please stay informed about the latest updates.
                    </p>
                    <button className="mt-2 bg-amber-500 text-white px-3 py-1 rounded-md text-xs font-medium">
                      Know More
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 flex-col min-w-[180px] max-w-[200px] flex-shrink-0">
                    <div className="font-medium text-xs mb-1">Domestic Fares starting at <span className="font-bold">₹1,199</span></div>
                    <div className="font-medium text-xs">& Int'l Fares starting at <span className="font-bold">₹4,599</span></div>
                    <div className="mt-2 p-1 bg-white rounded w-fit">
                      <span className="text-indigo-600 font-bold text-xs">IndiGo</span>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 min-w-[180px] max-w-[200px] flex-shrink-0">
                    <div className="text-blue-600 uppercase font-bold text-xs mb-1">FLIGHT PROTECTION</div>
                    <p className="text-gray-800 text-xs">
                      Add flight protection for only ₹299 per traveler.
                    </p>
                    <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium">
                      Add Protection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Airport Details tab content
          <div className="text-gray-800">
            {/* Airport Facilities Sections - One per each airport in the journey */}
            {airportFacilities.map((airport, index) => (
              <div className="mb-6" key={index}>
                <h3 className="text-[16px] font-bold mb-3">{airport.name} Facilities</h3>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="grid grid-cols-2 gap-y-4">
                    {/* Prayer Room */}
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="text-gray-600 text-sm">Prayer room</div>
                    </div>
                    <div className="text-right font-semibold text-sm">{airport.facilities.prayerRoom}</div>
                    
                    {/* Lounges */}
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500">
                        <Sofa className="h-5 w-5" />
                      </div>
                      <div className="text-gray-600 text-sm">Lounges</div>
                    </div>
                    <div className="text-right font-semibold text-sm">{airport.facilities.lounges}</div>
                    
                    {/* Baby Room */}
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500">
                        <Baby className="h-5 w-5" />
                      </div>
                      <div className="text-gray-600 text-sm">Baby Room</div>
                    </div>
                    <div className="text-right font-semibold text-sm">{airport.facilities.babyRoom}</div>
                    
                    {/* Food Options - Using colored boxes for unavailable logos */}
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500">
                        <Coffee className="h-5 w-5" />
                      </div>
                      <div className="text-gray-600 text-sm">Food options</div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="grid grid-cols-2 gap-x-2">
                        {/* Column 1: Starbucks and Shake Shack */}
                        <div className="flex flex-col items-end">
                          {airport.facilities.foodOptions.slice(0, 2).map((food, idx) => (
                            <div key={idx} className="flex items-center justify-end mb-1 last:mb-0">
                              {renderLogo(food)}
                              <span className="text-sm text-gray-800 whitespace-nowrap">{food.name}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Column 2: Subway and McDonald's */}
                        <div className="flex flex-col items-end">
                          {airport.facilities.foodOptions.slice(2, 4).map((food, idx) => (
                            <div key={idx} className="flex items-center justify-end mb-1 last:mb-0">
                              {renderLogo(food)}
                              <span className="text-sm text-gray-800 whitespace-nowrap">{food.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Bottom price and CTA */}
      <div className="mt-auto border-t border-gray-200 p-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">{data.price}</div>
          <div className="text-gray-600 text-sm">per person</div>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-primary-foreground hover:text-[#194E91] font-semibold rounded-lg px-5 py-2 text-sm min-w-[110px]">
          Select
        </button>
      </div>
    </div>
  );
}
