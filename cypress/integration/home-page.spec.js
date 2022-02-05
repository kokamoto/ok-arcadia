describe('Home Page', () => {

  it('should show a welcome message', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Welcome to OK Arcadia');
  });

  it('should provide navigation to the Lab page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('LAB').click();
    cy.url().should('contain', '/lab');
  });

  it('should provide navigation to the About page', () => {
     cy.visit('http://localhost:3000');
     cy.contains('ABOUT').click();
     cy.url().should('contain', '/about');
  });

});