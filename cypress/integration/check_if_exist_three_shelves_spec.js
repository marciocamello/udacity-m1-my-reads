describe('Check if exist three shelves in main page', () => {
    it('succesfully performs to check three shelves in main page', () => {

        cy.viewport(1024, 768)

        // visit 'baseUrl'
        cy.visit('/');

        // Check if button is visible
        cy.get('div#currentlyReading h4').should('be.visible');
        cy.get('div#currentlyReading h4').contains('Currently Reading');

        cy.get('div#wantToRead h4').should('be.visible');
        cy.get('div#wantToRead h4').contains('Want To Read');

        cy.get('div#read h4').should('be.visible');
        cy.get('div#read h4').contains('Read');
    });
});
