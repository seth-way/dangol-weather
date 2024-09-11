import {
  boomHappyQuotes,
} from '../../src/assets/boomhauer_quotes/boomhauerQuotes.json';
describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET',
      'https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true'
    ).as('location');
    cy.intercept('GET', 'https://api.openweathermap.org/data/2.5/forecast?lat=40.4417&lon=-79.9901&units=imperial&appid=882333ffa9f50691f0a4fc01f80d4c92', { statusCode: 200, fixture: 'Weather' }).as('Get 5 day');
    
    cy.visit('http://localhost:5173/location/40.4416941/-79.9900861');

  });

  it('should correctly identify an invalid date and react accordingly', () => {
    cy.intercept('GET', 'https://api.openweathermap.org/data/2.5/forecast?lat=40.4417&lon=-79.9901&units=imperial&appid=8d90eba3b2dd0278b950d5c6fbe2725d', { statusCode: 200, fixture: 'Weather' }).as('Get 5 day');
    cy.visit('http://localhost:5173/location/40.4416941/-79.9900861');
    
    cy.get(':nth-child(2) > .italic').contains("Invalid Date")
    cy.get('.quote').contains(`""Tell y'what man, you talk'n bout ol' meanin' ah life, man, go read tha' ol hitchiker's guide, man, y'know talkin' bout ol, 42, man."" -Boomhauer`)
    
  })

  it('should correctly choose a quote/image appropriate for the weather', () => {
    
    cy.get('.text-center > :nth-child(2) > :nth-child(1)').contains("conditions: Clear");
    cy.get('.quote')
  })

  it('should correctly choose a quote/image appropriate for the weather', () => {
    
  })

});

