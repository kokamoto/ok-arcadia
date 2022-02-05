describe('About Page', () => {

  it('should show the About page title', () => {
    cy.visit('http://localhost:3000/about');
    cy.get('h1').should('contain', 'About');
    cy.get('title').should('contain', 'OK Arcadia: About');
  });
    
});