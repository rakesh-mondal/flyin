import { apiClient, handleApiError } from './apiClient';
import {
  PaymentCard,
  CreatePaymentCardRequest,
  PaymentTransaction,
  InitiatePaymentRequest,
  InitiatePaymentResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  RefundRequest,
  RefundResponse,
  PaymentMethodsResponse,
  Currency
} from './types/payment.types';

/**
 * Service for payment-related operations
 */
export const paymentService = {
  /**
   * Get available payment methods and saved cards
   */
  getPaymentMethods: async (): Promise<PaymentMethodsResponse> => {
    try {
      const response = await apiClient.get<PaymentMethodsResponse>('/payments/methods');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get user's saved payment cards
   */
  getSavedCards: async (): Promise<PaymentCard[]> => {
    try {
      const response = await apiClient.get<PaymentCard[]>('/payments/cards');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Add a new payment card
   */
  addCard: async (cardData: CreatePaymentCardRequest): Promise<PaymentCard> => {
    try {
      const response = await apiClient.post<PaymentCard>('/payments/cards', cardData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete a payment card
   */
  deleteCard: async (cardId: string): Promise<{ success: boolean }> => {
    try {
      const response = await apiClient.delete(`/payments/cards/${cardId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Set a card as default
   */
  setDefaultCard: async (cardId: string): Promise<{ success: boolean }> => {
    try {
      const response = await apiClient.put(`/payments/cards/${cardId}/default`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Initiate a payment transaction
   */
  initiatePayment: async (paymentData: InitiatePaymentRequest): Promise<InitiatePaymentResponse> => {
    try {
      const response = await apiClient.post<InitiatePaymentResponse>('/payments/initiate', paymentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Verify a payment transaction
   */
  verifyPayment: async (verifyData: VerifyPaymentRequest): Promise<VerifyPaymentResponse> => {
    try {
      const response = await apiClient.post<VerifyPaymentResponse>('/payments/verify', verifyData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get transaction details
   */
  getTransaction: async (transactionId: string): Promise<PaymentTransaction> => {
    try {
      const response = await apiClient.get<PaymentTransaction>(`/payments/transactions/${transactionId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get transaction history
   */
  getTransactionHistory: async (): Promise<PaymentTransaction[]> => {
    try {
      const response = await apiClient.get<PaymentTransaction[]>('/payments/transactions');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Request a refund for a transaction
   */
  requestRefund: async (refundData: RefundRequest): Promise<RefundResponse> => {
    try {
      const response = await apiClient.post<RefundResponse>('/payments/refund', refundData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get available currencies
   */
  getCurrencies: async (): Promise<Currency[]> => {
    try {
      const response = await apiClient.get<Currency[]>('/payments/currencies');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Calculate price with conversion
   */
  convertCurrency: async (amount: number, fromCurrency: string, toCurrency: string): Promise<{
    convertedAmount: number;
    exchangeRate: number;
  }> => {
    try {
      const response = await apiClient.get(`/payments/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 