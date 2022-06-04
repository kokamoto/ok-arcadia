describe('Lab Page', () => {

  it('should show the Lab page title', () => {
    cy.visit('/lab');
    cy.get('h1').should('contain', 'The Lab');
    cy.get('title').should('contain', 'OK Arcadia: The Lab');
  });
  
});