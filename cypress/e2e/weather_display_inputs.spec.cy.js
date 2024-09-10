describe('template spec', () => {
  beforeEach(() => {
    cy.intercept(
      'https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true'
    ).as('Google API Connection');
    cy.intercept('https://api.openweathermap.org/data/2.5/forecast?lat=40.4417&lon=-79.9901&units=imperial&appid=8d90eba3b2dd0278b950d5c6fbe2725d').as('Get 5 Day');
    cy.visit('http://localhost:5173/location/40.4416941/-79.9900861');
  });

  it('should display todays weather on page load', () => {});

  it('should display tomorrows weather on user selection', () => {});
})
