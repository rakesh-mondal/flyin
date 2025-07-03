import { render, screen } from '@testing-library/react';
import FlightResultCard from '../FlightResultCard';
import { sampleFlightDataWithLayovers } from '@/data/sampleFlightData';

describe('FlightResultCard Layover Tags', () => {
  const mockOnClick = jest.fn();

  it('should show "Long Layover" tag for layovers longer than 4 hours', () => {
    const flightWithLongLayover = sampleFlightDataWithLayovers[0]; // 6h 55m layover
    render(
      <FlightResultCard 
        flight={flightWithLongLayover} 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.getByText('Long Layover')).toBeInTheDocument();
  });

  it('should show "Short Layover" tag for layovers shorter than 2 hours', () => {
    const flightWithShortLayover = sampleFlightDataWithLayovers[1]; // 1h 30m layover
    render(
      <FlightResultCard 
        flight={flightWithShortLayover} 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.getByText('Short Layover')).toBeInTheDocument();
  });

  it('should not show layover tag for normal layovers (2-4 hours)', () => {
    const flightWithNormalLayover = sampleFlightDataWithLayovers[2]; // 3h 15m layover
    render(
      <FlightResultCard 
        flight={flightWithNormalLayover} 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.queryByText('Long Layover')).not.toBeInTheDocument();
    expect(screen.queryByText('Short Layover')).not.toBeInTheDocument();
  });

  it('should not show layover tag for direct flights', () => {
    const directFlight = sampleFlightDataWithLayovers[4]; // Direct flight
    render(
      <FlightResultCard 
        flight={directFlight} 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.queryByText('Long Layover')).not.toBeInTheDocument();
    expect(screen.queryByText('Short Layover')).not.toBeInTheDocument();
  });

  it('should show layover duration in tooltip on hover', () => {
    const flightWithLayover = sampleFlightDataWithLayovers[0]; // 6h 55m layover
    render(
      <FlightResultCard 
        flight={flightWithLayover} 
        onClick={mockOnClick} 
      />
    );
    
    const layoverTag = screen.getByText('Long Layover');
    expect(layoverTag).toHaveClass('cursor-help');
  });

  it('should show very long layover as "Long Layover" tag', () => {
    const flightWithVeryLongLayover = sampleFlightDataWithLayovers[3]; // 8h 45m layover
    render(
      <FlightResultCard 
        flight={flightWithVeryLongLayover} 
        onClick={mockOnClick} 
      />
    );
    
    expect(screen.getByText('Long Layover')).toBeInTheDocument();
  });
});

describe('FlightResultCard Airport Highlighting', () => {
  const mockOnClick = jest.fn();

  it('should show red dot when departure airport is different from searched', () => {
    const flight = {
      ...sampleFlightDataWithLayovers[0],
      departureCode: 'LGA', // Different from searched JFK
    };
    
    render(
      <FlightResultCard 
        flight={flight}
        onClick={mockOnClick}
        searchedOrigin="JFK"
        searchedDestination="DXB"
      />
    );
    
    // Check that LGA is displayed
    expect(screen.getByText('LGA')).toBeInTheDocument();
    
    // Check that red dot is present for different departure airport
    const parentElement = screen.getByText('LGA').parentElement;
    expect(parentElement).toContainHTML('bg-red-500');
  });

  it('should show red dot when arrival airport is different from searched', () => {
    const flight = {
      ...sampleFlightDataWithLayovers[0],
      arrivalCode: 'DWC', // Different from searched DXB
    };
    
    render(
      <FlightResultCard 
        flight={flight}
        onClick={mockOnClick}
        searchedOrigin="JFK"
        searchedDestination="DXB"
      />
    );
    
    // Check that DWC is displayed
    expect(screen.getByText('DWC')).toBeInTheDocument();
    
    // Check that red dot is present for different arrival airport
    const parentElement = screen.getByText('DWC').parentElement;
    expect(parentElement).toContainHTML('bg-red-500');
  });

  it('should not show red dots when airports match searched airports', () => {
    const flight = {
      ...sampleFlightDataWithLayovers[0],
      departureCode: 'JFK',
      arrivalCode: 'DXB',
    };
    
    render(
      <FlightResultCard 
        flight={flight}
        onClick={mockOnClick}
        searchedOrigin="JFK"
        searchedDestination="DXB"
      />
    );
    
    // Check that airports are displayed
    expect(screen.getByText('JFK')).toBeInTheDocument();
    expect(screen.getByText('DXB')).toBeInTheDocument();
    
    // Check that no red dots are present
    const departureElement = screen.getByText('JFK').parentElement;
    const arrivalElement = screen.getByText('DXB').parentElement;
    expect(departureElement).not.toContainHTML('bg-red-500');
    expect(arrivalElement).not.toContainHTML('bg-red-500');
  });

  it('should work without searched airports provided', () => {
    const flight = sampleFlightDataWithLayovers[0];
    
    render(
      <FlightResultCard 
        flight={flight}
        onClick={mockOnClick}
      />
    );
    
    // Should render without errors
    expect(screen.getByText(flight.departureCode)).toBeInTheDocument();
    expect(screen.getByText(flight.arrivalCode)).toBeInTheDocument();
  });
});