describe('Modal tests', () => {
	beforeEach(() => {
		cy.visit('/').get('main');
	});
	it('Retailers can be opened', () => {
		cy.findByTitle(/Where to buy/).click();
		cy.findByTitle(/The Lutterworth Press/).should('be.visible');
	});
	it('Retailers can be closed', () => {
		cy.findByTitle(/Where to buy/).click();
		cy.findByTitle(/Close/).click();
		cy.findByTitle(/The Lutterworth Press/).should('not.be.visible');
	});
	it('Navigates to the map and check modal can be opened and closed', () => {
		cy.findByTitle(
			/Navigable map featuring information about early industrial canals/
		)
			.click()
			.window();

		cy.findByTestId('trentAndMersey').click({ force: true });
		cy.findByTestId('close-trentAndMersey').as('closeButton');
		cy.get('@closeButton').should('be.visible');
		cy.get('@closeButton').click();
		cy.get('@closeButton').should('not.be.visible');
	});
});

export {};
