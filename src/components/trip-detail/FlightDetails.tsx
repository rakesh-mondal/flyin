import React, { useState } from 'react';
import { X, ArrowRight, Coffee, Clock, Sofa, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          Trip Details
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
            {/* Route Header */}
            <div className="mb-4">
              <h2 className="text-xl font-bold flex items-center">
                {data.departureCity} <span className="mx-2">→</span> {data.arrivalCity}
              </h2>
              <div className="text-gray-600 mt-1">
                {data.duration} • {data.stopType} • {data.date} • {data.class}
              </div>
            </div>

            {/* Flight Segments */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              {data.segments?.map((segment, index) => (
                <div key={index}>
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-white rounded-full mr-2 flex items-center justify-center border border-gray-200 overflow-hidden">
                      <span className="text-xs font-bold text-blue-600">
                        {segment.airline?.charAt(0) || 'E'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">{segment.airline}</span> | <span className="text-gray-600">{segment.flightNumber}</span>
                    </div>
                  </div>
                  
                  <div className="flex mt-3">
                    {/* Left column - Departure */}
                    <div className="w-28 text-left">
                      <div className="text-gray-600">{segment.date}</div>
                      <div className="text-2xl font-bold">{segment.departureTime}</div>
                      <div className="text-gray-900 font-medium">{segment.departureCode} - {segment.departureCity}</div>
                      <div className="text-gray-600 text-sm">{segment.departureAirport}</div>
                    </div>
                    
                    {/* Middle - Flight duration */}
                    <div className="flex-1 px-2 flex flex-col items-center justify-start pt-6">
                      <div className="text-gray-500 text-sm mb-1">{segment.duration}</div>
                      <div className="w-full flex items-center">
                        <div className="h-[2px] flex-1 bg-gray-300"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 mx-1"></div>
                      </div>
                    </div>
                    
                    {/* Right column - Arrival */}
                    <div className="w-28 text-right">
                      <div className="text-gray-600">{segment.date}</div>
                      <div className="text-2xl font-bold">{segment.arrivalTime}</div>
                      <div className="text-gray-900 font-medium">{segment.arrivalCode} - {segment.arrivalCity}</div>
                      <div className="text-gray-600 text-sm">{segment.arrivalAirport}</div>
                    </div>
                  </div>

                  {/* Layover info */}
                  {index < (data.segments.length - 1) && (
                    <div className="my-4 py-2 border-t border-b border-dashed border-gray-300 flex justify-center">
                      <div className="px-3 py-1.5 bg-blue-50 rounded-full text-sm text-blue-700 flex items-center">
                        <span>Change of flights</span>
                        <span className="mx-2">•</span>
                        <span>{data.layover}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Special Offers */}
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">Special Offers for you</h3>
              
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
                <h3 className="text-lg font-bold mb-3">{airport.name} Facilities</h3>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="grid grid-cols-2 gap-y-4">
                    {/* Prayer Room */}
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="text-gray-600 text-sm">Prayer room</div>
                    </div>
                    <div className="text-right font-medium text-sm">{airport.facilities.prayerRoom}</div>
                    
                    {/* Lounges */}
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500">
                        <Sofa className="h-5 w-5" />
                      </div>
                      <div className="text-gray-600 text-sm">Lounges</div>
                    </div>
                    <div className="text-right font-medium text-sm">{airport.facilities.lounges}</div>
                    
                    {/* Baby Room */}
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500">
                        <Baby className="h-5 w-5" />
                      </div>
                      <div className="text-gray-600 text-sm">Baby Room</div>
                    </div>
                    <div className="text-right font-medium text-sm">{airport.facilities.babyRoom}</div>
                    
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
