describe('Go to search page and search a book', () => {
    it('succesfully performs search page and search a book', () => {

        cy.viewport(1024, 768);

        // visit 'baseUrl'
        cy.visit('/search');

        // Check if button is visible
        cy.get('input#search-input').should('be.visible');

        // Click in the button
        cy.get('input#search-input').focus();

        // Type in search input
        cy.get('input#search-input').type('Android');

        // Clic in body to close auto complete
        cy.get('body').click();

        // Wait for 2 seconds
        cy.wait(2000);

        // Check if button is visible
        cy.get('div#search-book-container button#change-book').last().should('be.visible');

        // Click in the button
        cy.get('div#search-book-container button#change-book').last().click();

        // Check if button is visible
        cy.get('li#change-shelf').eq(0).should('be.visible');

        // Click in button to change book to other shelf
        cy.get('li#change-shelf').eq(0).click();

        // Wait for 1 second
        cy.wait(2000);

        // visit 'baseUrl'
        cy.visit('/');
    });
});
