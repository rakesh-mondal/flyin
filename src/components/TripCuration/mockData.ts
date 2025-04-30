
// Mock trip data
export const mockTrips = [
  {
    id: 1,
    destination: 'Paris, France',
    title: 'Romantic City Escape',
    price: 3200,
    dates: 'June 10 - June 16, 2025',
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9088d4687e?auto=format&fit=crop&q=80',
    activities: ['Visit Eiffel Tower', 'Seine River Cruise', 'Louvre Museum'],
    flight: {
      airline: 'Air France',
      departure: 'JFK 10:25 AM',
      arrival: 'CDG 11:55 PM',
      duration: '7h 30m'
    },
    hotel: {
      name: 'Le Grand Paris',
      rating: 4.8,
      type: 'Boutique Hotel',
      amenities: ['Free Wi-Fi', 'Breakfast included', 'City view']
    }
  },
  {
    id: 2,
    destination: 'Santorini, Greece',
    title: 'Mediterranean Dream',
    price: 4500,
    dates: 'July 5 - July 12, 2025',
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80',
    activities: ['Sunset in Oia', 'Catamaran Cruise', 'Wine Tasting'],
    flight: {
      airline: 'Aegean Airlines',
      departure: 'JFK 7:15 PM',
      arrival: 'JTR 2:45 PM (+1)',
      duration: '12h 30m'
    },
    hotel: {
      name: 'Astra Suites',
      rating: 4.9,
      type: 'Luxury Resort',
      amenities: ['Infinity Pool', 'Ocean View', 'Spa Services']
    }
  },
  {
    id: 3,
    destination: 'Tokyo, Japan',
    title: 'Modern City Adventure',
    price: 5200,
    dates: 'August 12 - August 19, 2025',
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80',
    activities: ['Visit Tokyo Tower', 'Shibuya Crossing', 'Senso-ji Temple'],
    flight: {
      airline: 'Japan Airlines',
      departure: 'JFK 11:45 AM',
      arrival: 'NRT 2:35 PM (+1)',
      duration: '14h 50m'
    },
    hotel: {
      name: 'Park Hyatt Tokyo',
      rating: 4.7,
      type: 'Luxury Hotel',
      amenities: ['City View', 'Fine Dining', 'Indoor Pool']
    }
  }
];
