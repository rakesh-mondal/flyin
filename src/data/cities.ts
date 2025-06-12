export interface City {
  id: string;
  name: string;
  code: string;
  country: string;
  countryCode: string;
  searchTerms: string[];
}

export const CITIES: City[] = [
  // Major Middle Eastern Cities
  {
    id: 'dxb',
    name: 'Dubai',
    code: 'DXB',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    searchTerms: ['dubai', 'dxb', 'uae', 'emirates']
  },
  {
    id: 'auh',
    name: 'Abu Dhabi',
    code: 'AUH',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    searchTerms: ['abu dhabi', 'auh', 'uae', 'emirates']
  },
  {
    id: 'doh',
    name: 'Doha',
    code: 'DOH',
    country: 'Qatar',
    countryCode: 'QA',
    searchTerms: ['doha', 'doh', 'qatar']
  },
  {
    id: 'ruh',
    name: 'Riyadh',
    code: 'RUH',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    searchTerms: ['riyadh', 'ruh', 'saudi', 'saudi arabia']
  },
  {
    id: 'jed',
    name: 'Jeddah',
    code: 'JED',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    searchTerms: ['jeddah', 'jed', 'saudi', 'saudi arabia']
  },
  {
    id: 'kwi',
    name: 'Kuwait City',
    code: 'KWI',
    country: 'Kuwait',
    countryCode: 'KW',
    searchTerms: ['kuwait', 'kuwait city', 'kwi']
  },
  {
    id: 'bah',
    name: 'Manama',
    code: 'BAH',
    country: 'Bahrain',
    countryCode: 'BH',
    searchTerms: ['manama', 'bahrain', 'bah']
  },
  
  // US Cities
  {
    id: 'jfk',
    name: 'New York',
    code: 'JFK',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['new york', 'nyc', 'jfk', 'john f kennedy', 'manhattan']
  },
  {
    id: 'lga',
    name: 'New York',
    code: 'LGA',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['new york', 'nyc', 'lga', 'laguardia', 'manhattan']
  },
  {
    id: 'ewr',
    name: 'New York',
    code: 'EWR',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['new york', 'nyc', 'ewr', 'newark', 'newark liberty']
  },
  {
    id: 'lax',
    name: 'Los Angeles',
    code: 'LAX',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['los angeles', 'la', 'lax', 'california']
  },
  {
    id: 'ord',
    name: 'Chicago',
    code: 'ORD',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['chicago', 'ord', 'ohare', 'illinois']
  },
  {
    id: 'mia',
    name: 'Miami',
    code: 'MIA',
    country: 'United States',
    countryCode: 'US',
    searchTerms: ['miami', 'mia', 'florida']
  },
  
  // European Cities
  {
    id: 'lhr',
    name: 'London',
    code: 'LHR',
    country: 'United Kingdom',
    countryCode: 'GB',
    searchTerms: ['london', 'lhr', 'heathrow', 'uk', 'england']
  },
  {
    id: 'lgw',
    name: 'London',
    code: 'LGW',
    country: 'United Kingdom',
    countryCode: 'GB',
    searchTerms: ['london', 'lgw', 'gatwick', 'uk', 'england']
  },
  {
    id: 'cdg',
    name: 'Paris',
    code: 'CDG',
    country: 'France',
    countryCode: 'FR',
    searchTerms: ['paris', 'cdg', 'charles de gaulle', 'france']
  },
  {
    id: 'fra',
    name: 'Frankfurt',
    code: 'FRA',
    country: 'Germany',
    countryCode: 'DE',
    searchTerms: ['frankfurt', 'fra', 'germany']
  },
  {
    id: 'ist',
    name: 'Istanbul',
    code: 'IST',
    country: 'Turkey',
    countryCode: 'TR',
    searchTerms: ['istanbul', 'ist', 'turkey']
  },
  {
    id: 'ams',
    name: 'Amsterdam',
    code: 'AMS',
    country: 'Netherlands',
    countryCode: 'NL',
    searchTerms: ['amsterdam', 'ams', 'netherlands', 'holland']
  },
  {
    id: 'mad',
    name: 'Madrid',
    code: 'MAD',
    country: 'Spain',
    countryCode: 'ES',
    searchTerms: ['madrid', 'mad', 'spain']
  },
  {
    id: 'bcn',
    name: 'Barcelona',
    code: 'BCN',
    country: 'Spain',
    countryCode: 'ES',
    searchTerms: ['barcelona', 'bcn', 'spain']
  },
  {
    id: 'fco',
    name: 'Rome',
    code: 'FCO',
    country: 'Italy',
    countryCode: 'IT',
    searchTerms: ['rome', 'fco', 'fiumicino', 'italy']
  },
  {
    id: 'muc',
    name: 'Munich',
    code: 'MUC',
    country: 'Germany',
    countryCode: 'DE',
    searchTerms: ['munich', 'muc', 'germany']
  },
  
  // Asian Cities
  {
    id: 'sin',
    name: 'Singapore',
    code: 'SIN',
    country: 'Singapore',
    countryCode: 'SG',
    searchTerms: ['singapore', 'sin', 'changi']
  },
  {
    id: 'del',
    name: 'Delhi',
    code: 'DEL',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['delhi', 'new delhi', 'del', 'india']
  },
  {
    id: 'bom',
    name: 'Mumbai',
    code: 'BOM',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['mumbai', 'bombay', 'bom', 'india']
  },
  {
    id: 'blr',
    name: 'Bangalore',
    code: 'BLR',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['bangalore', 'bengaluru', 'blr', 'india']
  },
  {
    id: 'maa',
    name: 'Chennai',
    code: 'MAA',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['chennai', 'madras', 'maa', 'india']
  },
  {
    id: 'hyd',
    name: 'Hyderabad',
    code: 'HYD',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['hyderabad', 'hyd', 'india']
  },
  {
    id: 'ccu',
    name: 'Kolkata',
    code: 'CCU',
    country: 'India',
    countryCode: 'IN',
    searchTerms: ['kolkata', 'calcutta', 'ccu', 'india']
  },
  {
    id: 'nrt',
    name: 'Tokyo',
    code: 'NRT',
    country: 'Japan',
    countryCode: 'JP',
    searchTerms: ['tokyo', 'nrt', 'narita', 'japan']
  },
  {
    id: 'hnd',
    name: 'Tokyo',
    code: 'HND',
    country: 'Japan',
    countryCode: 'JP',
    searchTerms: ['tokyo', 'hnd', 'haneda', 'japan']
  },
  {
    id: 'hkg',
    name: 'Hong Kong',
    code: 'HKG',
    country: 'Hong Kong',
    countryCode: 'HK',
    searchTerms: ['hong kong', 'hkg', 'hongkong']
  },
  {
    id: 'bkk',
    name: 'Bangkok',
    code: 'BKK',
    country: 'Thailand',
    countryCode: 'TH',
    searchTerms: ['bangkok', 'bkk', 'thailand']
  },
  {
    id: 'kul',
    name: 'Kuala Lumpur',
    code: 'KUL',
    country: 'Malaysia',
    countryCode: 'MY',
    searchTerms: ['kuala lumpur', 'kul', 'malaysia']
  },
  
  // African Cities  
  {
    id: 'cai',
    name: 'Cairo',
    code: 'CAI',
    country: 'Egypt',
    countryCode: 'EG',
    searchTerms: ['cairo', 'cai', 'egypt']
  },
  {
    id: 'cpt',
    name: 'Cape Town',
    code: 'CPT',
    country: 'South Africa',
    countryCode: 'ZA',
    searchTerms: ['cape town', 'cpt', 'south africa']
  },
  
  // Canadian Cities
  {
    id: 'yyz',
    name: 'Toronto',
    code: 'YYZ',
    country: 'Canada',
    countryCode: 'CA',
    searchTerms: ['toronto', 'yyz', 'canada', 'pearson']
  },
  {
    id: 'yvr',
    name: 'Vancouver',
    code: 'YVR',
    country: 'Canada',
    countryCode: 'CA',
    searchTerms: ['vancouver', 'yvr', 'canada']
  },
  
  // Australian Cities
  {
    id: 'syd',
    name: 'Sydney',
    code: 'SYD',
    country: 'Australia',
    countryCode: 'AU',
    searchTerms: ['sydney', 'syd', 'australia']
  },
  {
    id: 'mel',
    name: 'Melbourne',
    code: 'MEL',
    country: 'Australia',
    countryCode: 'AU',
    searchTerms: ['melbourne', 'mel', 'australia']
  }
];

export function searchCities(query: string): City[] {
  if (!query || query.length < 1) return [];
  
  const searchQuery = query.toLowerCase().trim();
  
  return CITIES.filter(city => {
    // Search in city name, airport code, country, and search terms
    return (
      city.name.toLowerCase().includes(searchQuery) ||
      city.code.toLowerCase().includes(searchQuery) ||
      city.country.toLowerCase().includes(searchQuery) ||
      city.searchTerms.some(term => term.includes(searchQuery))
    );
  }).slice(0, 8); // Limit to 8 results for better UX
}

export function getCityByCode(code: string): City | undefined {
  return CITIES.find(city => city.code.toLowerCase() === code.toLowerCase());
}

export function getCityById(id: string): City | undefined {
  return CITIES.find(city => city.id === id);
} 