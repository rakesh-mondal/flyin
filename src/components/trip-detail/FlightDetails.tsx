import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
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
      lounges: "Emirates Lounge, Priority Pass",
      foodOptions: [
        { name: "Starbucks", logo: "/logos/starbucks.svg" },
        { name: "Shake Shack", logo: "/logos/shakeshack.svg" },
        { name: "McDonald's", logo: "/logos/mcdonalds.svg" },
        { name: "Subway", logo: "/logos/subway.svg" }
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
          Flight and Facility Details
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
          // Flight and Facility details tab content
          <div className="text-gray-800">
            {/* Aircraft Information Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Aircraft Information</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-600">Type</div>
                  <div className="text-right font-medium">{data.aircraft?.type}</div>
                  
                  <div className="text-gray-600">Seat Configuration</div>
                  <div className="text-right font-medium">{data.aircraft?.seatConfiguration}</div>
                  
                  <div className="text-gray-600">Seat Type</div>
                  <div className="text-right font-medium">{data.aircraft?.seatType}</div>
                </div>
              </div>
            </div>
            
            {/* Airport Facilities Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Airport Facilities</h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                      </svg>
                    </div>
                    <div className="text-gray-600">Prayer room</div>
                  </div>
                  <div className="text-right font-medium">{data.airport?.prayerRoom}</div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="15" rx="2"></rect>
                        <path d="M16 2v5M8 2v5"></path>
                      </svg>
                    </div>
                    <div className="text-gray-600">Lounges</div>
                  </div>
                  <div className="text-right font-medium">{data.airport?.lounges}</div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                      </svg>
                    </div>
                    <div className="text-gray-600">Food options</div>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      {data.airport?.foodOptions?.map((food, idx) => (
                        <div key={idx} className="inline-flex items-center bg-white px-2 py-1 rounded-md border border-gray-200 text-xs">
                          {food.logo ? (
                            <img src={food.logo} alt={food.name} className="h-4 w-4 mr-1" />
                          ) : (
                            <div className="h-3 w-3 bg-green-100 rounded-full mr-1 flex items-center justify-center">
                              <span className="text-[8px] font-bold text-green-600">{food.name.charAt(0)}</span>
                            </div>
                          )}
                          {food.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="18" rx="2"></rect>
                        <line x1="8" y1="10" x2="16" y2="10"></line>
                        <line x1="8" y1="14" x2="16" y2="14"></line>
                        <line x1="8" y1="18" x2="12" y2="18"></line>
                      </svg>
                    </div>
                    <div className="text-gray-600">Amenities</div>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      {data.airport?.amenities?.map((amenity, idx) => (
                        <div key={idx} className="inline-flex items-center bg-white px-2 py-1 rounded-md border border-gray-200 text-xs">
                          {amenity.icon || (
                            <svg className="h-3 w-3 mr-1 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          {amenity.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Special Offers Section (same as in Trip tab) */}
            <div>
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
          Add flight
        </button>
      </div>
    </div>
  );
}
