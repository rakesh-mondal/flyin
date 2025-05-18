import bookingReducer, {
  setFlightDetails,
  setPassengerInfo,
  clearBooking,
  setLoading,
  setError,
  BookingState,
  FlightDetails,
  PassengerInfo
} from '../bookingSlice';

describe('bookingSlice', () => {
  const initialState: BookingState = {
    flightDetails: null,
    passengerInfo: null,
    isRoundTrip: false,
    loading: false,
    error: null
  };

  it('should handle initial state', () => {
    expect(bookingReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setFlightDetails', () => {
    it('should handle setFlightDetails for one-way flight', () => {
      const mockFlightDetails: FlightDetails = {
        id: 'flight123',
        origin: 'NYC',
        destination: 'LAX',
        departureDate: '2023-05-15',
        price: 349.99,
        airline: 'Delta'
      };

      const actual = bookingReducer(initialState, setFlightDetails(mockFlightDetails));
      
      expect(actual.flightDetails).toEqual(mockFlightDetails);
      expect(actual.isRoundTrip).toBe(false);
    });

    it('should handle setFlightDetails for round-trip flight', () => {
      const mockFlightDetails: FlightDetails = {
        id: 'flight123',
        origin: 'NYC',
        destination: 'LAX',
        departureDate: '2023-05-15',
        returnDate: '2023-05-20',
        price: 349.99,
        airline: 'Delta'
      };

      const actual = bookingReducer(initialState, setFlightDetails(mockFlightDetails));
      
      expect(actual.flightDetails).toEqual(mockFlightDetails);
      expect(actual.isRoundTrip).toBe(true);
    });
  });

  describe('setPassengerInfo', () => {
    it('should handle setPassengerInfo', () => {
      const mockPassengerInfo: PassengerInfo = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890'
      };

      const actual = bookingReducer(initialState, setPassengerInfo(mockPassengerInfo));
      
      expect(actual.passengerInfo).toEqual(mockPassengerInfo);
    });
  });

  describe('clearBooking', () => {
    it('should handle clearBooking', () => {
      // First, set up a state with flight details and passenger info
      const stateWithBooking: BookingState = {
        flightDetails: {
          id: 'flight123',
          origin: 'NYC',
          destination: 'LAX',
          departureDate: '2023-05-15',
          price: 349.99,
          airline: 'Delta'
        },
        passengerInfo: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com'
        },
        isRoundTrip: false,
        loading: false,
        error: 'Some previous error'
      };

      const actual = bookingReducer(stateWithBooking, clearBooking());
      
      expect(actual.flightDetails).toBeNull();
      expect(actual.passengerInfo).toBeNull();
      expect(actual.error).toBeNull();
      expect(actual.isRoundTrip).toBe(false); // This should remain unchanged
    });
  });

  describe('setLoading', () => {
    it('should handle setLoading', () => {
      const actual = bookingReducer(initialState, setLoading(true));
      expect(actual.loading).toBe(true);
      
      const updatedState = bookingReducer(actual, setLoading(false));
      expect(updatedState.loading).toBe(false);
    });
  });

  describe('setError', () => {
    it('should handle setError', () => {
      const errorMessage = 'Something went wrong!';
      const stateWithLoading: BookingState = {
        ...initialState,
        loading: true
      };

      const actual = bookingReducer(stateWithLoading, setError(errorMessage));
      
      expect(actual.error).toBe(errorMessage);
      expect(actual.loading).toBe(false); // Should set loading to false
    });
  });
}); 