describe('Home Page', () => {

  it('should show a welcome message', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'Welcome to OK Arcadia');
  });

});