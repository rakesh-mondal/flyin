import React from 'react';
import TripProposal from '../../src/components/TripProposal';

describe('TripProposal Component', () => {
  const mockTrip = {
    id: 1,
    destination: 'Paris, France',
    title: 'Romantic Gateway',
    price: 1299,
    dates: 'Jun 15 - Jun 22, 2023',
    duration: '7 days',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    flight: {
      airline: 'Air France',
      departure: '9:00 AM',
      arrival: '11:30 AM',
      duration: '2h 30m'
    },
    hotel: {
      name: 'Le Grand Hotel',
      rating: 4.7,
      type: 'Boutique Hotel',
      amenities: ['WiFi', 'Breakfast', 'Pool', 'Spa']
    }
  };

  it('renders with full trip details and takes Percy snapshot', () => {
    // Setup a mock function for the onClick prop
    const onClickMock = cy.stub().as('onClickHandler');
    
    // Mount the component with mock trip data
    cy.mount(
      <div className="max-w-sm p-4 bg-gray-100">
        <TripProposal 
          trip={mockTrip}
          onClick={onClickMock}
        />
      </div>
    );
    
    // Verify basic trip details are displayed
    cy.contains('Romantic Gateway').should('be.visible');
    cy.contains('Paris, France').should('be.visible');
    cy.contains('$1299').should('be.visible');
    
    // Take a Percy snapshot
    cy.percySnapshot('TripProposal - Full Details');
  });
  
  it('renders with minimal trip details (no flight or hotel)', () => {
    const minimalTrip = {
      id: 2,
      destination: 'Rome, Italy',
      title: 'Cultural Experience',
      price: 899,
      dates: 'Jul 10 - Jul 15, 2023',
      duration: '5 days',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    };
    
    const onClickMock = cy.stub().as('onClickHandler');
    
    cy.mount(
      <div className="max-w-sm p-4 bg-gray-100">
        <TripProposal 
          trip={minimalTrip}
          onClick={onClickMock}
        />
      </div>
    );
    
    // Verify the trip renders without flight and hotel sections
    cy.contains('Air France').should('not.exist');
    cy.contains('Le Grand Hotel').should('not.exist');
    
    // Take a Percy snapshot
    cy.percySnapshot('TripProposal - Minimal Details');
  });
  
  it('handles click events', () => {
    const onClickMock = cy.stub().as('onClickHandler');
    
    cy.mount(
      <div className="max-w-sm p-4 bg-gray-100">
        <TripProposal 
          trip={mockTrip}
          onClick={onClickMock}
        />
      </div>
    );
    
    // Click on the trip proposal
    cy.get('[class*="overflow-hidden rounded-xl bg-white"]').click();
    
    // Verify the onClick callback was called
    cy.get('@onClickHandler').should('have.been.calledOnce');
  });
}); 