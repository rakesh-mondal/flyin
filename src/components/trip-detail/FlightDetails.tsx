import React from 'react';
import { X, ArrowRight, Wifi, Luggage, Minus } from 'lucide-react';

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
    aircraft: {
      type: string;
      seatConfiguration: string;
    };
    baggage: {
      checkIn: string;
      cabin: string;
    };
    airport: {
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
  // Default data if flight is not provided
  const defaultFlight = {
    airline: "Etihad Airways",
    flightNumber: "EK 501",
    class: "Economy",
    departureTime: "14:20",
    departureCode: "DXB",
    departureCity: "Dubai",
    arrivalTime: "20:20",
    arrivalCode: "JFK",
    arrivalCity: "New York",
    duration: "10h 30m",
    stopType: "non-stop",
    aircraft: {
      type: "Boeing 777-300ER",
      seatConfiguration: "3-4-3"
    },
    baggage: {
      checkIn: "23kg",
      cabin: "7kg"
    },
    airport: {
      prayerRoom: "Near Gate 12",
      lounges: "Emirates Lounge, Priority Pass",
      foodOptions: [
        { name: "Starbucks", logo: "/logos/starbucks.png" },
        { name: "Shake Shack", logo: "/logos/shake-shack.png" },
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

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6">
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Flight Details</h2>
        <button 
          onClick={onClose}
          className="p-1"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Airline info */}
      <div className="flex mb-8">
        <div className="w-16 h-16 mr-4 bg-gray-100 rounded flex items-center justify-center">
          <div className="w-12 h-12 relative">
            {/* Airline logo placeholder */}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">{data.airline}</h3>
          <div className="text-gray-600">Flight: {data.flightNumber}</div>
          <div className="text-gray-600">{data.class}</div>
        </div>
      </div>

      {/* Flight route */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="text-4xl font-bold">{data.departureTime}</div>
          <div className="text-blue-600 mx-4">
            <ArrowRight className="h-6 w-6" />
          </div>
          <div className="text-4xl font-bold">{data.arrivalTime}</div>
        </div>
        
        <div className="flex items-center justify-between mb-1">
          <div className="text-xl font-semibold text-blue-600">{data.departureCode}</div>
          <div className="flex-1"></div>
          <div className="text-xl font-semibold text-blue-600">{data.arrivalCode}</div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-600">{data.departureCity}</div>
          <div className="text-gray-400 mx-2">→</div>
          <div className="text-gray-600">{data.arrivalCity}</div>
        </div>
        
        <div className="text-gray-600">
          Duration: {data.duration} · {data.stopType}
        </div>
      </div>

      {/* Aircraft Information */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-2">Aircraft Information</h3>
        <div>
          <div className="text-gray-600">Type: {data.aircraft.type}</div>
          <div className="text-gray-600">Seat Configuration: {data.aircraft.seatConfiguration}</div>
        </div>
      </section>

      {/* Baggage Details */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-3">Baggage Details</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Luggage className="text-gray-400 mr-3 h-6 w-6" />
            <span className="text-gray-600">Check-in: {data.baggage.checkIn}</span>
          </div>
          <div className="flex items-center">
            <Luggage className="text-gray-400 mr-3 h-6 w-6" />
            <span className="text-gray-600">Cabin: {data.baggage.cabin}</span>
          </div>
        </div>
      </section>

      {/* Airport Information */}
      <section>
        <h3 className="text-xl font-bold mb-3">Airport Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-6 h-6 mr-3 text-blue-600">↓</div>
            <div>
              <span className="font-medium">Prayer Room:</span> {data.airport.prayerRoom}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-6 h-6 mr-3 text-amber-600">🔑</div>
            <div>
              <span className="font-medium">Lounges:</span> {data.airport.lounges}
            </div>
          </div>
          
          <div className="mt-2">
            <div className="font-medium mb-2">Food Options:</div>
            <div className="flex flex-wrap gap-4">
              {data.airport.foodOptions.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                    {/* Food logo placeholder */}
                  </div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-2">
            <div className="font-medium mb-2">Amenities</div>
            <div className="flex flex-col gap-2">
              {data.airport.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-6 mr-3 text-gray-500">
                    {idx === 0 && <Wifi className="h-5 w-5" />}
                    {idx === 1 && <span className="text-xl">⚡</span>}
                    {idx === 2 && <span className="text-xl">▶</span>}
                    {idx === 3 && <span className="text-xl">≡</span>}
                  </div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
