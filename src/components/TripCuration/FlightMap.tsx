import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface FlightMapProps {
  departureCity: string;
  departureCode: string;
  arrivalCity: string;
  arrivalCode: string;
}

export default function FlightMap({
  departureCity,
  departureCode,
  arrivalCity,
  arrivalCode
}: FlightMapProps) {
  // Mock coordinates (in real app, these would come from an API)
  const coordinates = {
    departure: [12.9716, 77.5946], // Bengaluru coordinates
    arrival: [51.5074, -0.1278], // London coordinates
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <div className="absolute inset-0">
        <MapContainer
          center={[30, 0]} // Center the map between departure and arrival
          zoom={2}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          dragging={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="opacity-50"
          />
          
          {/* Departure Marker */}
          <Marker position={coordinates.departure as [number, number]}>
            <Popup>
              <div className="text-sm">
                <strong>{departureCity}</strong>
                <br />
                {departureCode}
              </div>
            </Popup>
          </Marker>

          {/* Arrival Marker */}
          <Marker position={coordinates.arrival as [number, number]}>
            <Popup>
              <div className="text-sm">
                <strong>{arrivalCity}</strong>
                <br />
                {arrivalCode}
              </div>
            </Popup>
          </Marker>

          {/* Flight path - this would be a curved line in the real app */}
          <svg
            className="absolute inset-0 z-[400] pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          >
            <defs>
              <linearGradient id="flightPath" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
            <path
              d={`M ${coordinates.departure[1]} ${coordinates.departure[0]} L ${coordinates.arrival[1]} ${coordinates.arrival[0]}`}
              stroke="url(#flightPath)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
          </svg>
        </MapContainer>
      </div>

      {/* Map overlay with city names */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 text-white">
        <div className="flex items-center justify-between text-sm">
          <div>
            <div className="font-medium">{departureCity}</div>
            <div className="text-xs opacity-75">{departureCode}</div>
          </div>
          <div className="text-right">
            <div className="font-medium">{arrivalCity}</div>
            <div className="text-xs opacity-75">{arrivalCode}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
