import { apiClient, handleApiError } from './apiClient';
import {
  SignUpRequest,
  LoginRequest,
  AuthResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  PasswordResetRequest,
  PasswordChangeRequest
} from './types/user.types';

/**
 * Service for authentication-related operations
 */
export const authService = {
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
   * Login with social provider
   */
  socialLogin: async (provider: 'google' | 'facebook' | 'apple', token: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>(`/auth/social/${provider}`, { token });
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
    try {
      // Call logout endpoint to invalidate token server-side
      apiClient.post('/auth/logout');
    } finally {
      // Always clear local storage even if the API call fails
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    }
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
      authService.logout();
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
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  /**
   * Get the current auth token
   */
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  /**
   * Check if token is expired
   * Note: This is a simple check. For production, consider using JWT decode
   */
  isTokenExpired: (): boolean => {
    const token = authService.getToken();
    if (!token) return true;

    try {
      // This is a simplified version. For production, properly decode the JWT
      // and check the exp claim
      const tokenExpiry = localStorage.getItem('token_expiry');
      if (!tokenExpiry) return true;
      
      return new Date(tokenExpiry) < new Date();
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  }
}; 