describe('Load the application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/weather-west/');
  })
  it('Should a card with the app title', () => {
    cy.get("#title").contains('DANGOL\'WEATHER.');
  });
});
