import React from 'react';
import Navigation from '../../src/components/Navigation';

describe('Navigation Component', () => {
  it('renders with home tab active and takes Percy snapshot', () => {
    // Setup a mock function for the onChangeTab prop
    const onChangeTabMock = cy.stub().as('onChangeTabHandler');
    
    // Mount the component with 'home' as the active tab
    cy.mount(
      <Navigation 
        activeTab="home"
        onChangeTab={onChangeTabMock}
      />
    );
    
    // Verify the home tab is active
    cy.contains('Discover').should('have.class', 'text-black');
    
    // Take a Percy snapshot
    cy.percySnapshot('Navigation - Home Tab Active');
  });
  
  it('renders with search tab active and takes Percy snapshot', () => {
    const onChangeTabMock = cy.stub().as('onChangeTabHandler');
    
    cy.mount(
      <Navigation 
        activeTab="search"
        onChangeTab={onChangeTabMock}
      />
    );
    
    // Verify the search tab is active
    cy.contains('Search').should('have.class', 'text-black');
    
    // Take a Percy snapshot
    cy.percySnapshot('Navigation - Search Tab Active');
  });
  
  it('handles tab click events', () => {
    const onChangeTabMock = cy.stub().as('onChangeTabHandler');
    
    cy.mount(
      <Navigation 
        activeTab="home"
        onChangeTab={onChangeTabMock}
      />
    );
    
    // Click on the Search tab
    cy.contains('Search').click();
    
    // Verify the onChangeTab callback was called with the correct tab id
    cy.get('@onChangeTabHandler').should('have.been.calledWith', 'search');
  });
  
  it('renders in hidden state when isVisible is false', () => {
    const onChangeTabMock = cy.stub();
    
    cy.mount(
      <Navigation 
        activeTab="home"
        onChangeTab={onChangeTabMock}
        isVisible={false}
      />
    );
    
    // Verify the navigation has the translate-y-full class for hiding it
    cy.get('div').first().should('have.class', 'translate-y-full');
    
    // Take a Percy snapshot
    cy.percySnapshot('Navigation - Hidden State');
  });
}); 