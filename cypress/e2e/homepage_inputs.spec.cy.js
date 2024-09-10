describe('template spec', () => {
  beforeEach(()=> {
    cy.intercept('GET','https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true', {

    })
    cy.visit('http://localhost:5173/')
  })
  it('should check form being filled and value rendering in input field', ()=> {
    cy.get('.search-by-city').should('exist');
    cy.get('.search-by-city').type('Pittsburgh,PA{enter}');
    // cy.get('.search-by-city').should('contain', 'Pittsburgh{enter}');
    cy.url().should('include', 'location/40.4416941/-79.990086')
  })

})
