// Mock trip data
export const mockTrips = [
  {
    id: 1,
    destination: 'Dubai, UAE',
    title: 'Cultural Dubai Experience',
    price: 3400,
    dates: 'June 10 - June 16, 2025',
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80',
    activities: ['Visit Burj Khalifa', 'Desert Safari', 'Dubai Mall Shopping'],
    flight: {
      airline: 'Emirates',
      departure: 'JFK 10:25 AM',
      arrival: 'DXB 8:15 AM (+1)',
      duration: '12h 50m'
    },
    hotel: {
      name: 'Address Downtown',
      rating: 4.8,
      type: 'Luxury Hotel',
      amenities: ['Free Wi-Fi', 'Breakfast included', 'City view']
    }
  },
  {
    id: 2,
    destination: 'Istanbul, Turkey',
    title: 'Magical Istanbul',
    price: 2800,
    dates: 'July 5 - July 12, 2025',
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80',
    activities: ['Blue Mosque Tour', 'Bosphorus Cruise', 'Grand Bazaar Shopping'],
    flight: {
      airline: 'Turkish Airlines',
      departure: 'JFK 7:15 PM',
      arrival: 'IST 12:30 PM (+1)',
      duration: '10h 15m'
    },
    hotel: {
      name: 'Four Seasons Istanbul',
      rating: 4.9,
      type: 'Luxury Hotel',
      amenities: ['Spa Services', 'Panoramic View', 'Fine Dining']
    }
  },
  {
    id: 3,
    destination: 'Cairo, Egypt',
    title: 'Ancient Cairo',
    price: 3100,
    dates: 'August 12 - August 19, 2025',
    duration: '7 nights',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&q=80',
    activities: ['Pyramids of Giza', 'Egyptian Museum', 'Nile River Cruise'],
    flight: {
      airline: 'EgyptAir',
      departure: 'JFK 11:45 AM',
      arrival: 'CAI 5:25 AM (+1)',
      duration: '10h 40m'
    },
    hotel: {
      name: 'The Nile Ritz-Carlton',
      rating: 4.7,
      type: 'Luxury Hotel',
      amenities: ['Nile View', 'Fine Dining', 'Spa Services']
    }
  },
  {
    id: 4,
    destination: 'Doha, Qatar',
    title: 'Magical Doha',
    price: 3600,
    dates: 'September 8 - September 15, 2025',
    duration: '7 nights',
    image: 'https://lp-cms-production.imgix.net/2019-06/f868443201b1370e5faa91e332e47ef8-al-corniche.jpg?w=1095&fit=crop&crop=faces,edges&auto=format&q=75',
    activities: ['Museum of Islamic Art', 'Souq Waqif Tour', 'Desert Safari'],
    flight: {
      airline: 'Qatar Airways',
      departure: 'EWR 10:30 PM',
      arrival: 'DOH 6:15 PM (+1)',
      duration: '12h 45m'
    },
    hotel: {
      name: 'Mandarin Oriental Doha',
      rating: 4.9,
      type: 'Luxury Hotel',
      amenities: ['Spa Services', 'Rooftop Pool', 'City View']
    }
  }
];
