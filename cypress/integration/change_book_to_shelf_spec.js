describe('Change book to shelf', () => {
    it('succesfully performs to change book to shelf', () => {

        cy.viewport(1024, 768)

        //currentlyReading
        //wantToRead
        //read

        // visit 'baseUrl'
        cy.visit('/');

        // Check if button is visible
        cy.get('div#currentlyReading button#change-book').first().should('be.visible');

        // Click in the button
        cy.get('div#currentlyReading button#change-book').first().click();

        // Check if button is visible
        cy.get('li#change-shelf').eq(1).should('be.visible');

        // Click in button to change book to other shelf
        cy.get('li#change-shelf').eq(1).click();

        // Wait for 2 seconds
        cy.wait(2000);

        // Check if button is visible
        cy.get('div#wantToRead button#change-book').last().should('be.visible');

        // Click in the button
        cy.get('div#wantToRead button#change-book').last().click();

        // Check if button is visible
        cy.get('li#change-shelf').eq(0).should('be.visible');

        // Click in button to change book to other shelf
        cy.get('li#change-shelf').eq(0).click();
    });
});
