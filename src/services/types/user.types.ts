/**
 * User-related type definitions
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  countryCode?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  currency: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  savedSearches: boolean;
  priceAlerts: boolean;
}

export interface TravelDocument {
  id: string;
  type: 'passport' | 'id_card' | 'visa';
  number: string;
  issuingCountry: string;
  expiryDate: string;
  holderName: string;
}

export interface SavedContact {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
  isEmergencyContact: boolean;
}

export interface UserProfile extends User {
  preferences: UserPreferences;
  travelDocuments: TravelDocument[];
  savedContacts: SavedContact[];
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  countryCode?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface TokenRefreshRequest {
  refreshToken: string;
}

export interface TokenRefreshResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordChangeRequest {
  token: string;
  newPassword: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  countryCode?: string;
  profileImage?: File | string;
}

export interface UpdatePreferencesRequest {
  currency?: string;
  language?: string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  };
  savedSearches?: boolean;
  priceAlerts?: boolean;
} 