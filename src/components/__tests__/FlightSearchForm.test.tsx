import React from 'react';
import { render, screen, waitFor } from '../../testing/test-utils';
import { FlightSearchForm } from '../../features/search/FlightSearchForm';
import { useSearchContext } from '../../context/SearchContext';

// Mock the SearchContext module
jest.mock('../../context/SearchContext', () => ({
  useSearchContext: jest.fn().mockReturnValue({
    searchParams: {
      tripType: 'roundtrip',
      origin: '',
      destination: '',
      departDate: '',
      returnDate: '',
      passengers: { adults: 1, children: 0, infants: 0 },
    },
    updateSearchParams: jest.fn(),
    executeSearch: jest.fn(),
  }),
}));

describe('FlightSearchForm Component', () => {
  it('renders form fields correctly', () => {
    render(<FlightSearchForm />);
    
    // Check for main form fields
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/depart/i)).toBeInTheDocument();
  });

  it('shows return date field for round trips', () => {
    render(<FlightSearchForm />);
    
    // Select round trip option if not already selected
    const roundTripOption = screen.getByLabelText(/round trip/i);
    if (!roundTripOption.getAttribute('aria-checked')) {
      roundTripOption.click();
    }
    
    expect(screen.getByLabelText(/return/i)).toBeInTheDocument();
  });

  it('hides return date field for one-way trips', async () => {
    const { user } = render(<FlightSearchForm />);
    
    // Find and click one-way option
    const oneWayOption = screen.getByLabelText(/one way/i);
    await user.click(oneWayOption);
    
    // Verify return date is disabled
    const returnField = screen.getByLabelText(/return/i);
    expect(returnField).toBeDisabled();
  });

  it('submits form with correct data', async () => {
    const mockExecuteSearch = jest.fn();
    (useSearchContext as jest.Mock).mockReturnValue({
      searchParams: {
        tripType: 'roundtrip',
        origin: '',
        destination: '',
        departDate: '',
        returnDate: '',
        passengers: { adults: 1, children: 0, infants: 0 },
      },
      updateSearchParams: jest.fn(),
      executeSearch: mockExecuteSearch,
    });

    const { user } = render(<FlightSearchForm />);
    
    // Fill form fields
    await user.type(screen.getByLabelText(/from/i), 'JFK');
    await user.type(screen.getByLabelText(/to/i), 'LAX');
    
    // Click search button
    await user.click(screen.getByRole('button', { name: /search flights/i }));
    
    // Verify search was executed
    await waitFor(() => {
      expect(mockExecuteSearch).toHaveBeenCalled();
    });
  });
});

// Helper for either/or assertions
function either(...matchers: Array<jest.AsymmetricMatcher>): jest.AsymmetricMatcher {
  return {
    asymmetricMatch: (actual: any) => {
      return matchers.some(matcher => matcher.asymmetricMatch(actual));
    },
    toString: () => `either(${matchers.join(', ')})`,
    toAsymmetricMatcher: () => `either(${matchers.join(', ')})`,
  };
} 