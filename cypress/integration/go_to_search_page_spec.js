describe('Go to search page', () => {
    it('succesfully performs search page', () => {

        cy.viewport(1024, 768)

        // visit 'baseUrl'
        cy.visit('/');

        // Check if button is visible
        cy.get('button#search-link').should('be.visible');

        // Click in the button
        cy.get('button#search-link').click();
    });
});
