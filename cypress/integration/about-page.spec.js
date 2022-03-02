describe('About Page', () => {

  it('should show the About page title', () => {
    cy.visit('/about');
    cy.get('h1').should('contain', 'About');
    cy.get('title').should('contain', 'OK Arcadia: About');
  });

});