import { apiClient, handleApiError } from './apiClient';
import {
  User,
  UserProfile,
  SignUpRequest,
  LoginRequest,
  AuthResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  PasswordResetRequest,
  PasswordChangeRequest,
  UpdateProfileRequest,
  UpdatePreferencesRequest,
  UserPreferences,
  TravelDocument,
  SavedContact
} from './types/user.types';

/**
 * Service for user-related operations
 */
export const userService = {
  /**
   * Register a new user
   */
  signUp: async (userData: SignUpRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/signup', userData);
      // Store auth token in localStorage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Login user with email and password
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      // Store auth token in localStorage
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (): Promise<TokenRefreshResponse> => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const request: TokenRefreshRequest = { refreshToken };
      const response = await apiClient.post<TokenRefreshResponse>('/auth/refresh', request);
      
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      
      return response.data;
    } catch (error) {
      // If token refresh fails, logout
      userService.logout();
      throw handleApiError(error);
    }
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (request: PasswordResetRequest): Promise<{ success: boolean }> => {
    try {
      const response = await apiClient.post('/auth/password-reset', request);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Change password with token
   */
  changePassword: async (request: PasswordChangeRequest): Promise<{ success: boolean }> => {
    try {
      const response = await apiClient.post('/auth/password-change', request);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get user profile information
   */
  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get<UserProfile>('/user/profile');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData: UpdateProfileRequest): Promise<User> => {
    try {
      const response = await apiClient.put<User>('/user/profile', profileData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get user preferences
   */
  getPreferences: async (): Promise<UserPreferences> => {
    try {
      const response = await apiClient.get<UserPreferences>('/user/preferences');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update user preferences
   */
  updatePreferences: async (preferences: UpdatePreferencesRequest): Promise<UserPreferences> => {
    try {
      const response = await apiClient.put<UserPreferences>('/user/preferences', preferences);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get user's travel documents
   */
  getTravelDocuments: async (): Promise<TravelDocument[]> => {
    try {
      const response = await apiClient.get<TravelDocument[]>('/user/travel-documents');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Add a travel document
   */
  addTravelDocument: async (document: Omit<TravelDocument, 'id'>): Promise<TravelDocument> => {
    try {
      const response = await apiClient.post<TravelDocument>('/user/travel-documents', document);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete a travel document
   */
  deleteTravelDocument: async (documentId: string): Promise<{ success: boolean }> => {
    try {
      const response = await apiClient.delete(`/user/travel-documents/${documentId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get user's saved contacts
   */
  getSavedContacts: async (): Promise<SavedContact[]> => {
    try {
      const response = await apiClient.get<SavedContact[]>('/user/contacts');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Add a saved contact
   */
  addContact: async (contact: Omit<SavedContact, 'id'>): Promise<SavedContact> => {
    try {
      const response = await apiClient.post<SavedContact>('/user/contacts', contact);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete a saved contact
   */
  deleteContact: async (contactId: string): Promise<{ success: boolean }> => {
    try {
      const response = await apiClient.delete(`/user/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Get user bookings
   */
  getBookings: async (): Promise<any[]> => {
    try {
      const response = await apiClient.get('/user/bookings');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 