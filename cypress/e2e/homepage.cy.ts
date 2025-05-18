describe('Homepage Visual Regression', () => {
  before(() => {
    // Visit the homepage before all tests
    cy.visit('/');

    // Wait for any initial animations or data loading to complete
    cy.wait(1000);
  });

  it('renders the homepage correctly on desktop', () => {
    // Set a desktop viewport
    cy.viewport(1280, 800);
    
    // Take a Percy snapshot of the homepage
    cy.percySnapshot('Homepage - Desktop');
  });

  it('renders the homepage correctly on tablet', () => {
    // Set a tablet viewport
    cy.viewport(768, 1024);
    
    // Take a Percy snapshot of the homepage
    cy.percySnapshot('Homepage - Tablet');
  });

  it('renders the homepage correctly on mobile', () => {
    // Set a mobile viewport
    cy.viewport(375, 667);
    
    // Take a Percy snapshot of the homepage
    cy.percySnapshot('Homepage - Mobile');
  });

  it('displays navigation elements', () => {
    // Set back to desktop
    cy.viewport(1280, 800);
    
    // Check that main navigation elements exist
    cy.contains('Discover').should('be.visible');
    cy.contains('Search').should('be.visible');
    cy.contains('My Flights').should('be.visible');
    cy.contains('Profile').should('be.visible');
  });

  it('displays the search form', () => {
    // Check that the search form is visible
    cy.get('[data-testid="search-form"]').should('be.visible');
    
    // Take a Percy snapshot of the search form area
    cy.percySnapshot('Homepage - Search Form Focus');
  });
}); 