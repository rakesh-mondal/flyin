export const AIRLINE_LOGOS: { [key: string]: string } = {
  'emirates': 'https://airhex.com/images/airline-logos/emirates.png',
  'air-india': 'https://airhex.com/images/airline-logos/air-india.png',
  'etihad': 'https://airhex.com/images/airline-logos/etihad-airways.png',
  'vistara': 'https://airhex.com/images/airline-logos/vistara.png',
  'qatar': 'https://airhex.com/images/airline-logos/qatar-airways.png',
  'lufthansa': 'https://airhex.com/images/airline-logos/lufthansa.png',
  'singapore': 'https://airhex.com/images/airline-logos/singapore-airlines.png',
  'srilankan': 'https://airhex.com/images/airline-logos/ul.png',
  'turkish': 'https://airhex.com/images/airline-logos/turkish-airlines.png',
  // Add mappings for full airline names
  'emirates airlines': 'https://airhex.com/images/airline-logos/emirates.png',
  'air india': 'https://airhex.com/images/airline-logos/air-india.png',
  'etihad airways': 'https://airhex.com/images/airline-logos/etihad-airways.png',
  'vistara airlines': 'https://airhex.com/images/airline-logos/vistara.png',
  'qatar airways': 'https://airhex.com/images/airline-logos/qatar-airways.png',
  'lufthansa airlines': 'https://airhex.com/images/airline-logos/lufthansa.png',
  'singapore airlines': 'https://airhex.com/images/airline-logos/singapore-airlines.png',
  'srilankan airlines': 'https://airhex.com/images/airline-logos/ul.png',
  'turkish airlines': 'https://airhex.com/images/airline-logos/turkish-airlines.png',
};

const normalizeAirlineName = (name: string): string => {
  return name.toLowerCase().trim();
};

export const getAirlineLogo = (airlineName: string): string => {
  const normalizedName = normalizeAirlineName(airlineName);
  
  // First try exact match
  if (AIRLINE_LOGOS[normalizedName]) {
    return AIRLINE_LOGOS[normalizedName];
  }
  
  // Try matching without "airlines" suffix
  const nameWithoutAirlines = normalizedName.replace(/\s+airlines?$/, '');
  if (AIRLINE_LOGOS[nameWithoutAirlines]) {
    return AIRLINE_LOGOS[nameWithoutAirlines];
  }
  
  // Try matching with just the first word (for cases like "Emirates Airlines" -> "emirates")
  const firstWord = normalizedName.split(' ')[0];
  if (AIRLINE_LOGOS[firstWord]) {
    return AIRLINE_LOGOS[firstWord];
  }
  
  // Fallback to airhex.com with the normalized name
  return `https://airhex.com/images/airline-logos/${normalizedName.replace(/\s+/g, '-')}.png`;
}; 