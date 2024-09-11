describe('template spec', () => {
  beforeEach(()=> {
    cy.intercept('GET','https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true', {

    })
    cy.intercept('GET', 'https://api.openweathermap.org/data/2.5/forecast?lat=40.4406&lon=-79.9959&units=imperial&appid=882333ffa9f50691f0a4fc01f80d4c92', {
      statusCode: 200,
      fixture: 'Weather'
    }).as('pitWeather')
    cy.visit('http://localhost:5173/')
  })
  it('should check form being filled and value rendering in input field', ()=> {
    cy.get('#airplane-mode').click()
    cy.get('.search-by-city').should('exist');
    cy.get('.search-by-city').type('Pit')
    cy.get('.pac-container > :nth-child(1)').should('be.visible')
    cy.get('.pac-container > :nth-child(1)').click()
    cy.wait('@pitWeather')
    cy.url().should('include', '/location/40.44062479999999/-79.9958864')

    cy.get('.text-lg').contains('Pittsburgh')
    cy.get('.text-center > :nth-child(2)').should('be.visible')
    cy.get('pre').should('be.visible')
    cy.get('.quote').should('be.visible')
    cy.get('.ml-2').click()
    cy.get('#title').should('be.visible')
    cy.get('#airplane-mode').click()
   })

})