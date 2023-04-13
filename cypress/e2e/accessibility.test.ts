describe('Accessibility tests', () => {
	beforeEach(() => {
		cy.visit('/').get('main').injectAxe();
	});
	it('Has no detectable accessibility violations on load', () => {
		cy.checkA11yWithLog();
	});
	it('Navigates to the author page and checks a11y', () => {
		cy.findByTitle(/About the author/)
			.click()
			.window();
		cy.get('main').injectAxe();
		cy.get('main').checkA11yWithLog();
	});
	it('Navigates to the map and checks a11y', () => {
		cy.findByTitle(
			/Navigable map featuring information about early industrial canals/
		)
			.click()
			.window();

		cy.get('#map').injectAxe();
		cy.get('#map').checkA11yWithLog();
	});
});

export {};
