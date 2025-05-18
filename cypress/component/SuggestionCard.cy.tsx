import React from 'react';
import SuggestionCard from '../../src/components/SuggestionCard';

describe('SuggestionCard Component', () => {
  const mockProps = {
    title: 'New York City',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Popular',
    price: '199',
    departure: 'Oct 15',
    onClick: cy.stub().as('onClickHandler')
  };

  it('renders with all props and takes Percy snapshot', () => {
    // Mount the component with all props
    cy.mount(
      <div className="p-4 bg-gray-100">
        <SuggestionCard {...mockProps} />
      </div>
    );
    
    // Verify key elements are displayed
    cy.contains('New York City').should('be.visible');
    cy.contains('Popular').should('be.visible');
    cy.contains('$199').should('be.visible');
    cy.contains('Oct 15').should('be.visible');
    
    // Take a Percy snapshot
    cy.percySnapshot('SuggestionCard - Complete');
  });

  it('renders without optional props', () => {
    // Mount with only required props
    const minimalProps = {
      title: 'Paris',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
      onClick: cy.stub().as('onClickHandler')
    };
    
    cy.mount(
      <div className="p-4 bg-gray-100">
        <SuggestionCard {...minimalProps} />
      </div>
    );
    
    // Verify only required elements are present
    cy.contains('Paris').should('be.visible');
    cy.contains('Popular').should('not.exist');
    cy.contains('$').should('not.exist');
    
    // Take a Percy snapshot
    cy.percySnapshot('SuggestionCard - Minimal');
  });

  it('shows image fallback when image fails to load', () => {
    // Mount with invalid image URL to trigger error
    const invalidImageProps = {
      ...mockProps,
      image: 'https://invalid-image-url.jpg'
    };
    
    cy.mount(
      <div className="p-4 bg-gray-100">
        <SuggestionCard {...invalidImageProps} />
      </div>
    );
    
    // Wait for error handling to trigger
    cy.wait(500);
    
    // Check that fallback text appears
    cy.contains('Image unavailable').should('exist');
    
    // Take a Percy snapshot
    cy.percySnapshot('SuggestionCard - Image Error');
  });

  it('handles click events', () => {
    cy.mount(
      <div className="p-4 bg-gray-100">
        <SuggestionCard {...mockProps} />
      </div>
    );
    
    // Click on the card
    cy.get('[class*="group relative h-32"]').click();
    
    // Verify the onClick handler was called
    cy.get('@onClickHandler').should('have.been.calledOnce');
  });
}); 