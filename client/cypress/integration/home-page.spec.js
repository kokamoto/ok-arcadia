describe('Home Page', () => {

  it('should show a welcome message', () => {
    cy.visit('/');
    cy.get('.title').should('contain', 'Welcome to OK Arcadia');
  });

  it('should provide navigation to the Lab page', () => {
    cy.visit('/');
    cy.contains('LAB').click();
    cy.url().should('contain', '/lab');
  });

  it('should provide navigation to the About page', () => {
     cy.visit('/');
     cy.contains('ABOUT').click();
     cy.url().should('contain', '/about');
  });

  it('should provide navigation to the Dojang page', () => {
    cy.visit('/');
    cy.contains('DOJANG').click();
    cy.url().should('contain', '/dojang');
 });
});