export const sampleFlightData = {
  id: 1,
  airline: "SriLankan Airlines",
  airlineCode: "UL",
  airlineLogo: "https://airhex.com/images/airline-logos/ul.png",
  departureCity: "Bangalore",
  departureCode: "BLR",
  departureTime: "10:00",
  arrivalCity: "Dubai",
  arrivalCode: "DXB",
  arrivalTime: "21:40",
  duration: "13h 10m",
  stops: 1,
  price: 29804,
  baseFare: 24000,
  taxes: 4804,
  fees: 1000,
  carbonFootprint: "435kg CO2",
  tags: ["Best Value"],
  layoverInfo: "6h 55m in Colombo"
};

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