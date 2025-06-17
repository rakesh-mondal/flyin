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