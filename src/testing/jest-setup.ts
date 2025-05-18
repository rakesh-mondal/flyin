import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Extend global types
declare global {
  namespace NodeJS {
    interface Global {
      ResizeObserver: any;
    }
  }
  
  // Add jest to global scope
  const jest: any;
  const afterEach: (fn: () => void) => void;
}

// Automatically cleanup after each test
afterEach(cleanup);

// Mock matchMedia if needed by components
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Mock ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Add any custom matchers here 