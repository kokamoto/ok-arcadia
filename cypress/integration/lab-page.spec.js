describe('Lab Page', () => {

  it('should show the Lab page title', () => {
    cy.visit('http://localhost:3000/lab');
    cy.get('h1').should('contain', 'The Lab');
    cy.get('title').should('contain', 'OK Arcadia: The Lab');
  });
  
});