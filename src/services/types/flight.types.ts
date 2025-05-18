/**
 * Flight-related type definitions
 */

export interface FlightDetails {
  id: number;
  airline: string;
  airlineCode: string;
  airlineLogo: string;
  departureCity: string;
  departureCode: string;
  departureTime: string;
  arrivalCity: string;
  arrivalCode: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  baseFare: number;
  taxes: number;
  fees: number;
  carbonFootprint: string;
  tags?: string[];
  layoverInfo?: string;
}

export interface Layover {
  duration: string;
  city: string;
}

export interface FlightOption {
  departureTime: string;
  arrivalTime: string;
  departureCode: string;
  arrivalCode: string;
  duration: string;
  stops: number;
  layover?: Layover;
  date: Date | string;
  airlineCode: string;
}

export interface SimilarFlightOptions {
  departureOptions: FlightOption[];
  returnOptions: FlightOption[];
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass: string;
  isRoundTrip: boolean;
}

export interface FlightSearchResponse {
  flights: FlightDetails[];
  totalResults: number;
  similarOptions?: SimilarFlightOptions;
}

export interface BookingDetails {
  flightId: number;
  passengers: Passenger[];
  seatSelections?: SeatSelection[];
  contactDetails: ContactDetails;
  paymentDetails?: PaymentDetails;
  totalAmount: number;
}

export interface Passenger {
  id?: string;
  type: 'adult' | 'child' | 'infant';
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: string;
}

export interface SeatSelection {
  flightId: number;
  passengerId: string;
  seatNumber: string;
  seatClass: string;
  price: number;
}

export interface ContactDetails {
  email: string;
  phone: string;
  countryCode: string;
}

export interface PaymentDetails {
  method: 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer';
  cardNumber?: string;
  cardholderName?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  transactionId?: string;
}

export interface BookingResponse {
  bookingId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  confirmationNumber: string;
  createdAt: string;
  flight: FlightDetails;
  passengers: Passenger[];
  seatSelections: SeatSelection[];
  contactDetails: ContactDetails;
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
} 