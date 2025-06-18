export interface City {
  id: string;
  name: string;
  code: string;
  country: string;
  countryCode: string;
  searchTerms: string[];
  // New properties for enhanced dropdown
  type?: 'city' | 'airport' | 'nearby';
  coordinates?: {
    lat: number;
    lng: number;
  };
  parentCity?: string; // For airports that belong to a city
  distance?: number; // Distance from parent city in km (for nearby airports)
  airportName?: string; // Full airport name
}

// Function to calculate distance between two coordinates (in km)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
           Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export const CITIES: City[] = [
  // Major Middle Eastern Cities
  {
    id: 'dubai-any',
    name: 'Dubai',
    code: 'Any',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    searchTerms: ['dubai', 'dxb', 'uae', 'emirates'],
    type: 'city',
    coordinates: { lat: 25.2048, lng: 55.2708 }
  },
  {
    id: 'dxb',
    name: 'Dubai',
    code: 'DXB',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    searchTerms: ['dubai', 'dxb', 'uae', 'emirates'],
    type: 'airport',
    parentCity: 'dubai-any',
    coordinates: { lat: 25.2532, lng: 55.3657 },
    airportName: 'Dubai International Airport'
  },
  {
    id: 'dwc',
    name: 'Dubai',
    code: 'DWC',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    searchTerms: ['dubai', 'dwc', 'al maktoum', 'uae', 'emirates'],
    type: 'airport',
    parentCity: 'dubai-any',
    coordinates: { lat: 24.8960, lng: 55.1611 },
    airportName: 'Al Maktoum International Airport'
  },
  {
    id: 'shj',
    name: 'Sharjah',
    code: 'SHJ',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    searchTerms: ['sharjah', 'shj', 'uae', 'emirates', 'dubai'],
    type: 'nearby',
    parentCity: 'dubai-any',
    coordinates: { lat: 25.3285, lng: 55.5177 },
    airportName: 'Sharjah International Airport'
  },
  {
    id: 'rkt',
    name: 'Ras Al Khaimah',
    code: 'RKT',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    searchTerms: ['ras al khaimah', 'rkt', 'uae', 'emirates', 'dubai'],
    type: 'nearby',
    parentCity: 'dubai-any',
    coordinates: { lat: 25.6137, lng: 55.9394 },
    airportName: 'Ras Al Khaimah International Airport'
  },
  {
    id: 'auh',
    name: 'Abu Dhabi',
    code: 'AUH',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    searchTerms: ['abu dhabi', 'auh', 'uae', 'emirates'],
    type: 'airport',
    coordinates: { lat: 24.4330, lng: 54.6511 },
    airportName: 'Abu Dhabi International Airport'
  },
  {
    id: 'doh',
    name: 'Doha',
    code: 'DOH',
    country: 'Qatar',
    countryCode: 'QA',
    searchTerms: ['doha', 'doh', 'qatar'],
    type: 'airport',
    coordinates: { lat: 25.2731, lng: 51.6086 },
    airportName: 'Hamad International Airport'
  },
  {
    id: 'ruh',
    name: 'Riyadh',
    code: 'RUH',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    searchTerms: ['riyadh', 'ruh', 'saudi', 'saudi arabia'],
    type: 'airport',
    coordinates: { lat: 24.9576, lng: 46.6988 },
    airportName: 'King Khalid International Airport'
  },
  {
    id: 'jed',
    name: 'Jeddah',
    code: 'JED',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    searchTerms: ['jeddah', 'jed', 'saudi', 'saudi arabia'],
    type: 'airport',
    coordinates: { lat: 21.6796, lng: 39.1564 },
    airportName: 'King Abdulaziz International Airport'
  },
  {
    id: 'kwi',
    name: 'Kuwait City',
    code: 'KWI',
    country: 'Kuwait',
    countryCode: 'KW',
    searchTerms: ['kuwait', 'kuwait city', 'kwi'],
    type: 'airport',
    coordinates: { lat: 29.2267, lng: 47.9689 },
    airportName: 'Kuwait International Airport'
  },
  {
    id: 'bah',
    name: 'Manama',
    code: 'BAH',
    country: 'Bahrain',
    countryCode: 'BH',
    searchTerms: ['manama', 'bahrain', 'bah'],
    type: 'airport',
    coordinates: { lat: 26.2708, lng: 50.6336 },
    airportName: 'Bahrain International Airport'
  },
  
  // US Cities - New York
  {
    id: 'nyc-any',
    name: 'New York',
    code: 'Any',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['new york', 'nyc', 'manhattan'],
    type: 'city',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: 'jfk',
    name: 'New York',
    code: 'JFK',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['new york', 'nyc', 'jfk', 'john f kennedy', 'manhattan'],
    type: 'airport',
    parentCity: 'nyc-any',
    coordinates: { lat: 40.6413, lng: -73.7781 },
    airportName: 'John F. Kennedy International Airport'
  },
  {
    id: 'lga',
    name: 'New York',
    code: 'LGA',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['new york', 'nyc', 'lga', 'laguardia', 'manhattan'],
    type: 'airport',
    parentCity: 'nyc-any',
    coordinates: { lat: 40.7769, lng: -73.8740 },
    airportName: 'LaGuardia Airport'
  },
  {
    id: 'ewr',
    name: 'New York',
    code: 'EWR',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['new york', 'nyc', 'ewr', 'newark', 'newark liberty'],
    type: 'airport',
    parentCity: 'nyc-any',
    coordinates: { lat: 40.6895, lng: -74.1745 },
    airportName: 'Newark Liberty International Airport'
  },
  {
    id: 'lax',
    name: 'Los Angeles',
    code: 'LAX',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['los angeles', 'la', 'lax', 'california'],
    type: 'airport',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    airportName: 'Los Angeles International Airport'
  },
  {
    id: 'ord',
    name: 'Chicago',
    code: 'ORD',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['chicago', 'ord', 'ohare', 'illinois'],
    type: 'airport',
    coordinates: { lat: 41.9742, lng: -87.9073 },
    airportName: "O'Hare International Airport"
  },
  {
    id: 'mia',
    name: 'Miami',
    code: 'MIA',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['miami', 'mia', 'florida'],
    type: 'airport',
    coordinates: { lat: 25.7933, lng: -80.2906 },
    airportName: 'Miami International Airport'
  },
  
  // European Cities - London
  {
    id: 'london-any',
    name: 'London',
    code: 'Any',
    country: 'United Kingdom',
    countryCode: 'GB',
    searchTerms: ['london', 'uk', 'england'],
    type: 'city',
    coordinates: { lat: 51.5074, lng: -0.1278 }
  },
  {
    id: 'lhr',
    name: 'London',
    code: 'LHR',
    country: 'United Kingdom',
    countryCode: 'GB',
    searchTerms: ['london', 'lhr', 'heathrow', 'uk', 'england'],
    type: 'airport',
    parentCity: 'london-any',
    coordinates: { lat: 51.4700, lng: -0.4543 },
    airportName: 'Heathrow Airport'
  },
  {
    id: 'lgw',
    name: 'London',
    code: 'LGW',
    country: 'United Kingdom',
    countryCode: 'GB',
    searchTerms: ['london', 'lgw', 'gatwick', 'uk', 'england'],
    type: 'airport',
    parentCity: 'london-any',
    coordinates: { lat: 51.1481, lng: -0.1903 },
    airportName: 'Gatwick Airport'
  },
  {
    id: 'cdg',
    name: 'Paris',
    code: 'CDG',
    country: 'France',
    countryCode: 'FR',
    searchTerms: ['paris', 'cdg', 'charles de gaulle', 'france'],
    type: 'airport',
    coordinates: { lat: 49.0097, lng: 2.5479 },
    airportName: 'Charles de Gaulle Airport'
  },
  {
    id: 'fra',
    name: 'Frankfurt',
    code: 'FRA',
    country: 'Germany',
    countryCode: 'DE',
    searchTerms: ['frankfurt', 'fra', 'germany'],
    type: 'airport',
    coordinates: { lat: 50.0379, lng: 8.5622 },
    airportName: 'Frankfurt Airport'
  },
  {
    id: 'ist',
    name: 'Istanbul',
    code: 'IST',
    country: 'Turkey',
    countryCode: 'TR',
    searchTerms: ['istanbul', 'ist', 'turkey'],
    type: 'airport',
    coordinates: { lat: 41.2753, lng: 28.7519 },
    airportName: 'Istanbul Airport'
  },
  {
    id: 'ams',
    name: 'Amsterdam',
    code: 'AMS',
    country: 'Netherlands',
    countryCode: 'NL',
    searchTerms: ['amsterdam', 'ams', 'netherlands', 'holland'],
    type: 'airport',
    coordinates: { lat: 52.3105, lng: 4.7683 },
    airportName: 'Amsterdam Schiphol Airport'
  },
  {
    id: 'mad',
    name: 'Madrid',
    code: 'MAD',
    country: 'Spain',
    countryCode: 'ES',
    searchTerms: ['madrid', 'mad', 'spain'],
    type: 'airport',
    coordinates: { lat: 40.4983, lng: -3.5676 },
    airportName: 'Adolfo Suárez Madrid–Barajas Airport'
  },
  {
    id: 'bcn',
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain',
    countryCode: 'ES',
    searchTerms: ['barcelona', 'bcn', 'spain'],
    type: 'airport',
    coordinates: { lat: 41.2971, lng: 2.0785 },
    airportName: 'Josep Tarradellas Barcelona–El Prat Airport'
  },
  {
    id: 'fco',
    name: 'Rome',
    code: 'FCO',
    country: 'Italy',
    countryCode: 'IT',
    searchTerms: ['rome', 'fco', 'fiumicino', 'italy'],
    type: 'airport',
    coordinates: { lat: 41.7999, lng: 12.2462 },
    airportName: 'Leonardo da Vinci International Airport'
  },
  {
    id: 'muc',
    name: 'Munich',
    code: 'MUC',
    country: 'Germany',
    countryCode: 'DE',
    searchTerms: ['munich', 'muc', 'germany'],
    type: 'airport',
    coordinates: { lat: 48.3537, lng: 11.7750 },
    airportName: 'Munich Airport'
  },
  
  // Asian Cities
  {
    id: 'sin',
    name: 'Singapore',
    code: 'SIN',
    country: 'Singapore',
    countryCode: 'SG',
    searchTerms: ['singapore', 'sin', 'changi'],
    type: 'airport',
    coordinates: { lat: 1.3644, lng: 103.9915 },
    airportName: 'Singapore Changi Airport'
  },
  {
    id: 'del',
    name: 'Delhi',
    code: 'DEL',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['delhi', 'new delhi', 'del', 'india'],
    type: 'airport',
    coordinates: { lat: 28.5665, lng: 77.1031 },
    airportName: 'Indira Gandhi International Airport'
  },
  {
    id: 'bom',
    name: 'Mumbai',
    code: 'BOM',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['mumbai', 'bombay', 'bom', 'india'],
    type: 'airport',
    coordinates: { lat: 19.0896, lng: 72.8656 },
    airportName: 'Chhatrapati Shivaji Maharaj International Airport'
  },
  {
    id: 'blr',
    name: 'Bangalore',
    code: 'BLR',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['bangalore', 'bengaluru', 'blr', 'india'],
    type: 'airport',
    coordinates: { lat: 13.1986, lng: 77.7066 },
    airportName: 'Kempegowda International Airport'
  },
  {
    id: 'maa',
    name: 'Chennai',
    code: 'MAA',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['chennai', 'madras', 'maa', 'india'],
    type: 'airport',
    coordinates: { lat: 12.9902, lng: 80.1693 },
    airportName: 'Chennai International Airport'
  },
  {
    id: 'hyd',
    name: 'Hyderabad',
    code: 'HYD',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['hyderabad', 'hyd', 'india'],
    type: 'airport',
    coordinates: { lat: 17.2313, lng: 78.4298 },
    airportName: 'Rajiv Gandhi International Airport'
  },
  {
    id: 'ccu',
    name: 'Kolkata',
    code: 'CCU',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['kolkata', 'calcutta', 'ccu', 'india'],
    type: 'airport',
    coordinates: { lat: 22.6544, lng: 88.4479 },
    airportName: 'Netaji Subhas Chandra Bose International Airport'
  },
  {
    id: 'nrt',
    name: 'Tokyo',
    code: 'NRT',
    country: 'Japan',
    countryCode: 'JP',
    searchTerms: ['tokyo', 'nrt', 'narita', 'japan'],
    type: 'airport',
    coordinates: { lat: 35.7647, lng: 140.3864 },
    airportName: 'Narita International Airport'
  },
  {
    id: 'hnd',
    name: 'Tokyo',
    code: 'HND',
    country: 'Japan',
    countryCode: 'JP',
    searchTerms: ['tokyo', 'hnd', 'haneda', 'japan'],
    type: 'airport',
    coordinates: { lat: 35.5494, lng: 139.7798 },
    airportName: 'Tokyo Haneda Airport'
  },
  {
    id: 'hkg',
    name: 'Hong Kong',
    code: 'HKG',
    country: 'Hong Kong',
    countryCode: 'HK',
    searchTerms: ['hong kong', 'hkg', 'hongkong'],
    type: 'airport',
    coordinates: { lat: 22.3080, lng: 113.9185 },
    airportName: 'Hong Kong International Airport'
  },
  {
    id: 'bkk',
    name: 'Bangkok',
    code: 'BKK',
    country: 'Thailand',
    countryCode: 'TH',
    searchTerms: ['bangkok', 'bkk', 'thailand'],
    type: 'airport',
    coordinates: { lat: 13.6900, lng: 100.7501 },
    airportName: 'Suvarnabhumi Airport'
  },
  {
    id: 'kul',
    name: 'Kuala Lumpur',
    code: 'KUL',
    country: 'Malaysia',
    countryCode: 'MY',
    searchTerms: ['kuala lumpur', 'kul', 'malaysia'],
    type: 'airport',
    coordinates: { lat: 2.7456, lng: 101.7072 },
    airportName: 'Kuala Lumpur International Airport'
  },
  
  // African Cities  
  {
    id: 'cai',
    name: 'Cairo',
    code: 'CAI',
    country: 'Egypt',
    countryCode: 'EG',
    searchTerms: ['cairo', 'cai', 'egypt'],
    type: 'airport',
    coordinates: { lat: 30.1219, lng: 31.4056 },
    airportName: 'Cairo International Airport'
  },
  {
    id: 'cpt',
    name: 'Cape Town',
    code: 'CPT',
    country: 'South Africa',
    countryCode: 'ZA',
    searchTerms: ['cape town', 'cpt', 'south africa'],
    type: 'airport',
    coordinates: { lat: -33.9648, lng: 18.6017 },
    airportName: 'Cape Town International Airport'
  },
  
  // Canadian Cities
  {
    id: 'yyz',
    name: 'Toronto',
    code: 'YYZ',
    country: 'Canada',
    countryCode: 'CA',
    searchTerms: ['toronto', 'yyz', 'canada', 'pearson'],
    type: 'airport',
    coordinates: { lat: 43.6777, lng: -79.6248 },
    airportName: 'Toronto Pearson International Airport'
  },
  {
    id: 'yvr',
    name: 'Vancouver',
    code: 'YVR',
    country: 'Canada',
    countryCode: 'CA',
    searchTerms: ['vancouver', 'yvr', 'canada'],
    type: 'airport',
    coordinates: { lat: 49.1967, lng: -123.1815 },
    airportName: 'Vancouver International Airport'
  },
  
  // Australian Cities
  {
    id: 'syd',
    name: 'Sydney',
    code: 'SYD',
    country: 'Australia',
    countryCode: 'AU',
    searchTerms: ['sydney', 'syd', 'australia'],
    type: 'airport',
    coordinates: { lat: -33.9399, lng: 151.1753 },
    airportName: 'Kingsford Smith Airport'
  },
  {
    id: 'mel',
    name: 'Melbourne',
    code: 'MEL',
    country: 'Australia',
    countryCode: 'AU',
    searchTerms: ['melbourne', 'mel', 'australia'],
    type: 'airport',
    coordinates: { lat: -37.6690, lng: 144.8410 },
    airportName: 'Melbourne Airport'
  }
];

export function searchCities(query: string): City[] {
  if (!query || query.length < 1) return [];
  
  const searchQuery = query.toLowerCase().trim();
  
  // Filter cities that match the search query
  const matchingCities = CITIES.filter(city => {
    return (
      city.name.toLowerCase().includes(searchQuery) ||
      city.code.toLowerCase().includes(searchQuery) ||
      city.country.toLowerCase().includes(searchQuery) ||
      city.searchTerms.some(term => term.includes(searchQuery))
    );
  });

  // Group and organize results
  const organizedResults: City[] = [];
  const processedCities = new Set<string>();

  // Find city entries and their related airports
  matchingCities.forEach(city => {
    if (city.type === 'city') {
      // Add the city "Any" option first
      organizedResults.push(city);
      processedCities.add(city.id);

      // Find all airports for this city
      const cityAirports = matchingCities.filter(airport => 
        airport.parentCity === city.id && airport.type === 'airport'
      );
      
      // Add airports for this city
      cityAirports.forEach(airport => {
        organizedResults.push(airport);
        processedCities.add(airport.id);
      });

      // Find nearby airports and calculate distances
      const nearbyAirports = matchingCities.filter(airport => 
        airport.parentCity === city.id && airport.type === 'nearby'
      );

      nearbyAirports.forEach(airport => {
        if (city.coordinates && airport.coordinates) {
          const distance = Math.round(calculateDistance(
            city.coordinates.lat,
            city.coordinates.lng,
            airport.coordinates.lat,
            airport.coordinates.lng
          ));
          // Create a copy with calculated distance
          const airportWithDistance = { ...airport, distance };
          organizedResults.push(airportWithDistance);
          processedCities.add(airport.id);
        }
      });
    }
  });

  // Add standalone airports that don't belong to a searched city
  matchingCities.forEach(city => {
    if (!processedCities.has(city.id) && city.type === 'airport') {
      organizedResults.push(city);
      processedCities.add(city.id);
    }
  });

  return organizedResults.slice(0, 10); // Limit to 10 results for better UX
}

export function getCityByCode(code: string): City | undefined {
  return CITIES.find(city => city.code.toLowerCase() === code.toLowerCase());
}

export function getCityById(id: string): City | undefined {
  return CITIES.find(city => city.id === id);
} 