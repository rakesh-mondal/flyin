/**
 * Payment-related type definitions
 */

export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer';

export interface PaymentCard {
  id: string;
  type: 'credit' | 'debit';
  network: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';
  lastFourDigits: string;
  expiryMonth: string;
  expiryYear: string;
  cardholderName: string;
  isDefault: boolean;
}

export interface CreatePaymentCardRequest {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  setDefault?: boolean;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: PaymentMethod;
  cardLastFour?: string;
  createdAt: string;
  updatedAt: string;
  bookingId?: string;
  description: string;
  receiptUrl?: string;
}

export interface InitiatePaymentRequest {
  amount: number;
  currency: string;
  method: PaymentMethod;
  bookingId?: string;
  description: string;
  returnUrl: string;
  cardId?: string;  // For saved cards
  // For new card payments
  cardDetails?: {
    cardNumber?: string;
    expiryMonth?: string;
    expiryYear?: string;
    cvv?: string;
    cardholderName?: string;
    saveCard?: boolean;
  };
}

export interface InitiatePaymentResponse {
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  redirectUrl?: string;  // For 3DS or external payment methods
  paymentSessionId?: string;
}

export interface VerifyPaymentRequest {
  transactionId: string;
  paymentSessionId?: string;
}

export interface VerifyPaymentResponse {
  transactionId: string;
  status: 'completed' | 'failed' | 'pending';
  message?: string;
  receiptUrl?: string;
}

export interface RefundRequest {
  transactionId: string;
  amount?: number;  // If not provided, full amount is refunded
  reason?: string;
}

export interface RefundResponse {
  refundId: string;
  transactionId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface PaymentMethodsResponse {
  availableMethods: PaymentMethod[];
  savedCards: PaymentCard[];
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;  // Exchange rate to base currency
} 