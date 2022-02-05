describe('Home Page', () => {

  it('should show a welcome message', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Welcome to OK Arcadia');
  });

  it('should have navigation to the Lab page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('the LAB').click();
    cy.url().should('contain', '/lab');
  });

});