import { apiClient, handleApiError } from './apiClient';
import {
  FlightSearchParams,
  FlightSearchResponse,
  FlightDetails,
  SimilarFlightOptions,
  BookingDetails,
  BookingResponse,
} from './types/flight.types';

/**
 * Service for flight-related operations
 */
export const flightService = {
  /**
   * Search for flights based on the provided parameters
   */
  search: async (params: FlightSearchParams): Promise<FlightSearchResponse> => {
    try {
      const response = await apiClient.post<FlightSearchResponse>('/flights/search', params);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get details for a specific flight
   */
  getFlightDetails: async (flightId: number | string): Promise<FlightDetails> => {
    try {
      const response = await apiClient.get<FlightDetails>(`/flights/${flightId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get similar flight options for a given flight
   */
  getSimilarOptions: async (flightId: number | string): Promise<SimilarFlightOptions> => {
    try {
      const response = await apiClient.get<SimilarFlightOptions>(`/flights/${flightId}/similar`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Check flight availability before booking
   */
  checkAvailability: async (flightId: number | string): Promise<{ available: boolean; remainingSeats: number }> => {
    try {
      const response = await apiClient.get(`/flights/${flightId}/availability`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Create a booking for a flight
   */
  createBooking: async (bookingDetails: BookingDetails): Promise<BookingResponse> => {
    try {
      const response = await apiClient.post<BookingResponse>('/bookings', bookingDetails);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get details of an existing booking
   */
  getBooking: async (bookingId: string): Promise<BookingResponse> => {
    try {
      const response = await apiClient.get<BookingResponse>(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Cancel a booking
   */
  cancelBooking: async (bookingId: string): Promise<{ success: boolean; refundAmount?: number }> => {
    try {
      const response = await apiClient.post(`/bookings/${bookingId}/cancel`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Modify an existing booking
   */
  modifyBooking: async (bookingId: string, updates: Partial<BookingDetails>): Promise<BookingResponse> => {
    try {
      const response = await apiClient.put<BookingResponse>(`/bookings/${bookingId}`, updates);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get available seats for a flight
   */
  getAvailableSeats: async (flightId: number | string): Promise<{ 
    seatMap: Array<{ 
      row: string; 
      seats: Array<{ 
        number: string; 
        available: boolean; 
        class: string; 
        price: number 
      }> 
    }> 
  }> => {
    try {
      const response = await apiClient.get(`/flights/${flightId}/seats`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get popular destinations from a specific origin
   */
  getPopularDestinations: async (originCode: string): Promise<Array<{
    city: string;
    code: string;
    country: string;
    price: number;
    imageUrl: string;
  }>> => {
    try {
      const response = await apiClient.get(`/destinations/popular?origin=${originCode}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 