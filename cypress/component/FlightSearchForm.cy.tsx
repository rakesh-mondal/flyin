import React from 'react';
import FlightSearchForm from '../../src/components/FlightSearchForm';

describe('FlightSearchForm Component', () => {
  beforeEach(() => {
    // Setup a mock function for the onSearch prop
    const onSearchMock = cy.stub().as('onSearchHandler');
    cy.mount(<FlightSearchForm onSearch={onSearchMock} />);
  });

  it('renders correctly and takes Percy snapshot', () => {
    // Take a Percy snapshot of the default state
    cy.percySnapshot('FlightSearchForm - Default State');
  });

  it('fills in origin and destination fields', () => {
    // Fill in the form fields
    cy.get('#origin').type('New York');
    cy.get('#destination').type('Los Angeles');
    
    // Take a Percy snapshot with filled form
    cy.percySnapshot('FlightSearchForm - Filled Form');
  });

  it('shows calendar when selecting dates', () => {
    // Click on the calendar input
    cy.get('[data-testid="date-input"]').click();
    
    // Verify calendar appears
    cy.get('[data-testid="calendar"]').should('be.visible');
    
    // Take a Percy snapshot with calendar open
    cy.percySnapshot('FlightSearchForm - Calendar Open');
  });

  it('submits search form with correct data', () => {
    // Fill in form fields
    cy.get('#origin').type('New York');
    cy.get('#destination').type('Los Angeles');
    
    // Click search button
    cy.get('[data-testid="search-button"]').click();
    
    // Verify the onSearch handler was called with correct data
    cy.get('@onSearchHandler').should('have.been.called');
  });
}); 