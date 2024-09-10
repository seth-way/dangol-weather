describe('Load the application', () => {
  beforeEach(() => {
    cy.intercept('GET',
      'https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true'
    ).as('Google API Connection');
    cy.visit('http://localhost:5173/');
  });

  it('Should display a card with the app content', () => {
    cy.get('#title').contains("DANGOL'WEATHER", { matchCase: false });
    cy.get('.flex-row').children().should('have.length', 2);
    cy.get('.search-by-city').should('exist');
    cy.get('pre').should('exist');
  });
});
