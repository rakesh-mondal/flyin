export const sampleFlightData = {
  id: 1,
  airline: "SriLankan Airlines",
  airlineCode: "UL",
  airlineLogo: "srilankan",
  departureCity: "Bangalore",
  departureCode: "BLR",
  departureTime: "10:00",
  arrivalCity: "Dubai",
  arrivalCode: "DXB",
  arrivalTime: "21:40",
  duration: "13h 10m",
  stops: 1,
  price: 29804,
  originalPrice: 35000,
  baseFare: 24000,
  taxes: 4804,
  fees: 1000,
  carbonFootprint: "435kg CO2",
  tags: ["Best Value"],
  layoverInfo: "6h 55m in Colombo"
};

// Additional sample flights for testing layover tags
export const sampleFlightDataWithLayovers = [
  {
    id: 1,
    airline: "Emirates",
    airlineCode: "EK", 
    airlineLogo: "emirates",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "21:00",
    arrivalCity: "Dubai", 
    arrivalCode: "DXB",
    arrivalTime: "07:05",
    duration: "14h 35m",
    stops: 1,
    price: 35909,
    originalPrice: 42000,
    baseFare: 30000,
    taxes: 4909,
    fees: 1000,
    carbonFootprint: "500kg CO2",
    tags: ["Long Layover"],
    layoverInfo: "6h 55m in Dubai" // Long layover - should show "Long Layover" tag
  },
  {
    id: 2,
    airline: "Turkish Airlines",
    airlineCode: "TK",
    airlineLogo: "turkish",
    departureCity: "New York",
    departureCode: "JFK", 
    departureTime: "23:15",
    arrivalCity: "Dubai",
    arrivalCode: "DXB",
    arrivalTime: "10:00",
    duration: "14h 45m",
    stops: 1,
    price: 36200,
    baseFare: 31000,
    taxes: 4200,
    fees: 1000,
    carbonFootprint: "480kg CO2",
    tags: ["Short Layover"],
    layoverInfo: "1h 30m in Istanbul" // Short layover - should show "Short Layover" tag
  },
  {
    id: 3,
    airline: "Lufthansa",
    airlineCode: "LH",
    airlineLogo: "lufthansa",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "22:30",
    arrivalCity: "Dubai",
    arrivalCode: "DXB", 
    arrivalTime: "09:00",
    duration: "14h 30m",
    stops: 1,
    price: 37500,
    baseFare: 32000,
    taxes: 4500,
    fees: 1000,
    carbonFootprint: "450kg CO2",
    tags: ["Normal Layover"],
    layoverInfo: "3h 15m in Frankfurt" // Normal layover - should show no tag
  },
  {
    id: 4,
    airline: "Qatar Airways",
    airlineCode: "QR",
    airlineLogo: "qatar",
    departureCity: "New York", 
    departureCode: "JFK",
    departureTime: "19:00",
    arrivalCity: "Dubai",
    arrivalCode: "DXB",
    arrivalTime: "05:30",
    duration: "15h 00m",
    stops: 1,
    price: 33800,
    originalPrice: 39500,
    baseFare: 28000,
    taxes: 4800,
    fees: 1000,
    carbonFootprint: "520kg CO2",
    tags: ["Very Long Layover"],
    layoverInfo: "8h 45m in Doha" // Very long layover - should show "Long Layover" tag
  },
  {
    id: 5,
    airline: "Air India",
    airlineCode: "AI",
    airlineLogo: "airindia",
    departureCity: "New York",
    departureCode: "JFK",
    departureTime: "14:20",
    arrivalCity: "Dubai",
    arrivalCode: "DXB",
    arrivalTime: "20:20",
    duration: "10h 30m",
    stops: 0,
    price: 30000,
    baseFare: 26000,
    taxes: 3000,
    fees: 1000,
    carbonFootprint: "400kg CO2",
    tags: ["Direct Flight"],
    layoverInfo: undefined // Direct flight - no layover info, no tag
  }
];

export const similarFlightOptions = {
  departureOptions: [
    {
      departureTime: "10:00",
      arrivalTime: "21:40",
      departureCode: "BLR",
      arrivalCode: "DXB",
      duration: "13h 10m",
      stops: 1,
      layover: {
        duration: "6h 55m",
        city: "Colombo"
      },
      date: new Date("2024-05-03"),
      airlineCode: "UL"
    },
    {
      departureTime: "03:05",
      arrivalTime: "21:40",
      departureCode: "BLR",
      arrivalCode: "DXB",
      duration: "20h 5m",
      stops: 1,
      layover: {
        duration: "13h 50m",
        city: "Colombo"
      },
      date: new Date("2024-05-03"),
      airlineCode: "UL"
    }
  ],
  returnOptions: [
    {
      departureTime: "23:00",
      arrivalTime: "02:00",
      departureCode: "DXB",
      arrivalCode: "BLR",
      duration: "25h 30m",
      stops: 1,
      layover: {
        duration: "19h 40m",
        city: "Colombo"
      },
      date: new Date("2024-05-06"),
      airlineCode: "UL"
    }
  ]
};

// Test flights for different airport indication with red dots
export const sampleFlightWithDifferentAirports = {
  id: 6,
  airline: "Delta Airlines",
  airlineCode: "DL",
  airlineLogo: "delta",
  departureCity: "New York",
  departureCode: "LGA", // Different from searched JFK - should show red dot
  departureTime: "18:30",
  arrivalCity: "Dubai",
  arrivalCode: "DWC", // Different from searched DXB - should show red dot
  arrivalTime: "11:45",
  duration: "13h 15m",
  stops: 1,
  price: 42500,
  originalPrice: 48000,
  baseFare: 37000,
  taxes: 4500,
  fees: 1000,
  carbonFootprint: "520kg CO2",
  tags: ["Different Airport"],
  layoverInfo: "2h 30m in London"
};

// Add the different airport flight to the layovers array for testing
export const sampleFlightDataWithLayoversAndDifferentAirports = [
  ...sampleFlightDataWithLayovers,
  sampleFlightWithDifferentAirports
]; 