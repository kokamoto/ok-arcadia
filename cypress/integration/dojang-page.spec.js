describe('The Dojang Page', () => {

  it('should show the Dojang page title', () => {
    cy.visit('http://localhost:3000/dojang');
    cy.get('h1').should('contain', 'The Dojang');
    cy.get('title').should('contain', 'OK Arcadia: The Dojang');
  });

  it('should be able to navigate to the USA Taekwondo Poomsae rankings via link', () => {
    cy.visit('http://localhost:3000/dojang');
    cy.get('a#poomsae-rankings-usa').click();
    cy.url().should('include', '/dojang/poomsae-rankings/usa')
  });

  it('should be able to navigate to the USA Taekwondo Poomsae rankings via URL', () => {
    cy.visit('http://localhost:3000/dojang/poomsae-rankings/usa');
    cy.get('h1').should('contain', 'The US National Poomsae Rankings');
    cy.get('title').should('contain', 'OK Arcadia: The Dojang');
  });
});