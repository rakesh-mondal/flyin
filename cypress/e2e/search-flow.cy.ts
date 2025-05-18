describe('Flight Search Flow Visual Regression', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
    
    // Wait for any initial animations or data loading to complete
    cy.wait(1000);
  });

  it('captures the complete search flow', () => {
    // Take a Percy snapshot of the initial search form
    cy.percySnapshot('Search Flow - Initial Search Form');
    
    // Fill in the origin field
    cy.get('#origin').type('New York');
    
    // Fill in the destination field
    cy.get('#destination').type('Los Angeles');
    
    // Take a Percy snapshot after filling in search fields
    cy.percySnapshot('Search Flow - Filled Search Form');
    
    // Intercept the flight search API call to ensure consistent results for visual testing
    cy.intercept('GET', '/api/flights*', { fixture: 'flights.json' }).as('flightSearch');
    
    // Click the search button
    cy.get('[data-testid="search-button"]').click();
    
    // Wait for the API response
    cy.wait('@flightSearch');
    
    // Take a Percy snapshot of the search results page
    cy.percySnapshot('Search Flow - Flight Results');
    
    // Click on the first flight result
    cy.get('[data-testid="flight-card"]').first().click();
    
    // Take a Percy snapshot of the flight details page
    cy.percySnapshot('Search Flow - Flight Details');
  });

  it('tests responsive behavior of search results', () => {
    // Fill in the search form
    cy.get('#origin').type('New York');
    cy.get('#destination').type('Los Angeles');
    
    // Intercept the flight search API call
    cy.intercept('GET', '/api/flights*', { fixture: 'flights.json' }).as('flightSearch');
    
    // Submit the search
    cy.get('[data-testid="search-button"]').click();
    
    // Wait for the API response
    cy.wait('@flightSearch');
    
    // Test desktop view
    cy.viewport(1280, 800);
    cy.percySnapshot('Search Results - Desktop');
    
    // Test tablet view
    cy.viewport(768, 1024);
    cy.percySnapshot('Search Results - Tablet');
    
    // Test mobile view
    cy.viewport(375, 667);
    cy.percySnapshot('Search Results - Mobile');
  });

  it('captures search filter interactions', () => {
    // Fill in the search form
    cy.get('#origin').type('New York');
    cy.get('#destination').type('Los Angeles');
    
    // Intercept the flight search API call
    cy.intercept('GET', '/api/flights*', { fixture: 'flights.json' }).as('flightSearch');
    
    // Submit the search
    cy.get('[data-testid="search-button"]').click();
    
    // Wait for the API response
    cy.wait('@flightSearch');
    
    // Open the filters panel
    cy.get('[data-testid="filter-button"]').click();
    
    // Take a Percy snapshot with filters open
    cy.percySnapshot('Search Flow - Filters Panel Open');
    
    // Apply a price filter
    cy.get('[data-testid="price-slider"]').click();
    
    // Take a Percy snapshot with filter applied
    cy.percySnapshot('Search Flow - Price Filter Applied');
  });
}); 