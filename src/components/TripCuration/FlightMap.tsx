
import React, { useEffect, useRef } from 'react';
import { PlaneTakeoff, PlaneLanding } from 'lucide-react';

interface FlightMapProps {
  departureCity: string;
  departureCode: string;
  departureCoordinates?: [number, number];
  arrivalCity: string;
  arrivalCode: string;
  arrivalCoordinates?: [number, number];
}

// Default coordinates for common cities
const cityCoordinates: Record<string, [number, number]> = {
  'JFK': [-73.7781, 40.6413], // New York JFK
  'EWR': [-74.1745, 40.6895], // New York Newark
  'DXB': [55.3644, 25.2532], // Dubai
  'IST': [28.8146, 40.9768], // Istanbul
  'DOH': [51.6081, 25.2609], // Doha
  'CAI': [31.4056, 30.1219], // Cairo
};

const FlightMap = ({ 
  departureCity, 
  departureCode,
  departureCoordinates,
  arrivalCity, 
  arrivalCode,
  arrivalCoordinates
}: FlightMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Use provided coordinates or fallback to our lookup table
  const depCoords = departureCoordinates || cityCoordinates[departureCode] || [-74, 40.7];
  const arrCoords = arrivalCoordinates || cityCoordinates[arrivalCode] || [55.2, 25.2];
  
  // Calculate flight path
  useEffect(() => {
    if (!mapRef.current || !planeRef.current) return;
    
    const mapWidth = mapRef.current.clientWidth;
    const mapHeight = mapRef.current.clientHeight;
    
    // Simple mapping from coordinates to pixels
    // This is a very simplified version - in a real app, you'd use a mapping library
    const depX = ((depCoords[0] + 180) / 360) * mapWidth;
    const depY = ((90 - depCoords[1]) / 180) * mapHeight;
    const arrX = ((arrCoords[0] + 180) / 360) * mapWidth;
    const arrY = ((90 - arrCoords[1]) / 180) * mapHeight;
    
    // Create the path element for the flight
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const svgPath = `M ${depX} ${depY} Q ${(depX + arrX) / 2} ${Math.min(depY, arrY) - 50} ${arrX} ${arrY}`;
    path.setAttribute('d', svgPath);
    path.setAttribute('stroke', '#3b82f6');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-dasharray', '5,5');
    path.setAttribute('fill', 'transparent');
    
    // Add SVG to the map
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.appendChild(path);
    
    mapRef.current.appendChild(svg);
    
    // Create animation for the plane
    let progress = 0;
    const plane = planeRef.current;
    plane.style.position = 'absolute';
    plane.style.transform = 'translate(-50%, -50%)';
    
    // Animation loop
    const animatePlane = () => {
      if (!plane) return;
      
      progress += 0.005;
      if (progress > 1) progress = 0;
      
      // Calculate position along the curve
      // Using a quadratic bezier curve
      const t = progress;
      const x = (1-t)*(1-t)*depX + 2*(1-t)*t*((depX + arrX) / 2) + t*t*arrX;
      const y = (1-t)*(1-t)*depY + 2*(1-t)*t*(Math.min(depY, arrY) - 50) + t*t*arrY;
      
      // Rotate the plane to follow the path
      const angle = Math.atan2(
        y - ((1-t+0.01)*(1-t+0.01)*depY + 2*(1-t+0.01)*(t-0.01)*((depY + arrY) / 2 - 50) + (t-0.01)*(t-0.01)*arrY),
        x - ((1-t+0.01)*(1-t+0.01)*depX + 2*(1-t+0.01)*(t-0.01)*((depX + arrX) / 2) + (t-0.01)*(t-0.01)*arrX)
      ) * 180 / Math.PI;
      
      plane.style.left = `${x}px`;
      plane.style.top = `${y}px`;
      plane.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      
      animationRef.current = requestAnimationFrame(animatePlane);
    };
    
    animationRef.current = requestAnimationFrame(animatePlane);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mapRef.current && svg) {
        mapRef.current.removeChild(svg);
      }
    };
  }, [departureCode, arrivalCode, depCoords, arrCoords]);
  
  return (
    <div className="relative h-64 w-full bg-sky-50 rounded-lg overflow-hidden">
      <div ref={mapRef} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80')] bg-cover bg-center">
        {/* Departure marker */}
        <div className="absolute" style={{
          left: `${((depCoords[0] + 180) / 360) * 100}%`,
          top: `${((90 - depCoords[1]) / 180) * 100}%`,
          transform: 'translate(-50%, -50%)'
        }}>
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-1 rounded-full">
              <PlaneTakeoff className="h-4 w-4" />
            </div>
            <div className="bg-white px-2 py-0.5 rounded-md shadow-md mt-1 text-xs font-medium">
              {departureCode}
            </div>
          </div>
        </div>
        
        {/* Arrival marker */}
        <div className="absolute" style={{
          left: `${((arrCoords[0] + 180) / 360) * 100}%`,
          top: `${((90 - arrCoords[1]) / 180) * 100}%`,
          transform: 'translate(-50%, -50%)'
        }}>
          <div className="flex flex-col items-center">
            <div className="bg-red-500 text-white p-1 rounded-full">
              <PlaneLanding className="h-4 w-4" />
            </div>
            <div className="bg-white px-2 py-0.5 rounded-md shadow-md mt-1 text-xs font-medium">
              {arrivalCode}
            </div>
          </div>
        </div>
        
        {/* Animated plane */}
        <div ref={planeRef} className="text-blue-600">
          <div className="bg-white p-1 rounded-full shadow-md">
            <PlaneTakeoff className="h-5 w-5" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-2 bg-white/80 rounded px-2 py-1 text-xs font-medium">
        {departureCity} to {arrivalCity}
      </div>
    </div>
  );
};

export default FlightMap;
