import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Default API configuration
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'https://api.flyin.com';
const API_TIMEOUT = 30000; // 30 seconds

// Error handling
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
  status?: number;
}

// Response transformation
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * Creates a configured axios instance
 */
export const createApiClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...config,
  });

  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      // Get auth token from localStorage if available
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      // Handle specific error cases
      if (error.response?.status === 401) {
        // Handle unauthorized (e.g., clear token, redirect to login)
        localStorage.removeItem('auth_token');
        // Could dispatch an event or action here
      }
      
      // Transform error to standard format
      const apiError: ApiError = {
        code: error.code || 'unknown_error',
        message: error.message || 'An unknown error occurred',
        status: error.response?.status,
        details: error.response?.data,
      };
      
      return Promise.reject(apiError);
    }
  );

  return apiClient;
};

// Create default API client
export const apiClient = createApiClient();

/**
 * Transforms an API response to a standardized format
 */
export const transformResponse = <T>(response: AxiosResponse): ApiResponse<T> => {
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers as Record<string, string>,
  };
};

/**
 * Handles and normalizes API errors
 */
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      code: error.code || 'api_error',
      message: error.message || 'API request failed',
      status: error.response?.status,
      details: error.response?.data,
    };
  }
  
  if (error instanceof Error) {
    return {
      code: 'error',
      message: error.message,
    };
  }
  
  return {
    code: 'unknown_error',
    message: 'An unknown error occurred',
    details: error,
  };
}; 