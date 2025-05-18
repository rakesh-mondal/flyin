import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FlightDetails {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  price: number;
  airline: string;
}

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface BookingState {
  flightDetails: FlightDetails | null;
  passengerInfo: PassengerInfo | null;
  isRoundTrip: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  flightDetails: null,
  passengerInfo: null,
  isRoundTrip: false,
  loading: false,
  error: null
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setFlightDetails: (state, action: PayloadAction<FlightDetails>) => {
      state.flightDetails = action.payload;
      state.isRoundTrip = !!action.payload.returnDate;
    },
    setPassengerInfo: (state, action: PayloadAction<PassengerInfo>) => {
      state.passengerInfo = action.payload;
    },
    clearBooking: (state) => {
      state.flightDetails = null;
      state.passengerInfo = null;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { 
  setFlightDetails, 
  setPassengerInfo, 
  clearBooking,
  setLoading,
  setError
} = bookingSlice.actions;

export default bookingSlice.reducer; 