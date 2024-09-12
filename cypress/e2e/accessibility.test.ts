describe('Accessibility tests', () => {
	beforeEach(() => {
		cy.visit('/').get('main').injectAxe();
	});
	it('Has no detectable accessibility violations on load', () => {
		/**
		 * Axe is not waiting for the hero animations to finish in CI, see below.
		 */
		cy.wait(500);
		cy.checkA11yWithLog();
	});
	it('Opens the modal and checks violations', () => {
		cy.findByTitle(/Where to buy/).click();
		cy.findByTitle(/Stores which stock the book/).should('be.visible');
		/**
		 * Axe is picking up the h2 element in the modal as a color-violation
		 * because it's not waiting for the animation to finish. There are a
		 * bunch of issues on axe related to layering and animations so this is
		 * likely one of them.
		 *
		 * Hacky solution is to wait until the animation and all jank is done.
		 */
		cy.wait(500);
		cy.get('main').checkA11yWithLog();
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
