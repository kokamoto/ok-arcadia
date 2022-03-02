describe('The Dojang Page', () => {

  it('should show the Dojang page title', () => {
    cy.visit('/dojang');
    cy.get('h1').should('contain', 'The Dojang');
    cy.get('title').should('contain', 'OK Arcadia: The Dojang');
  });

  it('should be able to navigate to the USA Taekwondo Poomsae Rankings via link', () => {
    cy.visit('/dojang');
    cy.get('a#poomsae-rankings-usa').click();
    cy.url().should('include', '/dojang/poomsae-rankings/usa')
  });

  it('should be able to navigate to the USA Taekwondo Poomsae Rankings via URL', () => {
    cy.visit('/dojang/poomsae-rankings/usa');
    cy.get('h1').should('contain', 'The US National Poomsae Rankings');
    cy.get('title').should('contain', 'OK Arcadia: The Dojang');
  });

  it('should have a Recognized Poomsae section in the USA Taekwondo Poomsae Rankings page', () => {
    cy.visit('/dojang/poomsae-rankings/usa');
    cy.contains('Recognized Poomsae').should('be.visible');
  });

  it('should have a Freestyle Poomsae section in the USA Taekwondo Poomsae Rankings page', () => {
    cy.visit('/dojang/poomsae-rankings/usa');
    cy.contains('Freestyle Poomsae').should('be.visible');
  });
});