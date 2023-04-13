// type definitions for Cypress object "cy"
/// <reference types="cypress" />
declare namespace Cypress {
	interface Chainable {
		/**
		 * Cypress-axe checkA11y with custom console logging
		 * @example cy.checkA11yWithLog()
		 */
		checkA11yWithLog(
			context?: string | Node | axe.ContextObject | undefined,
			options?: Options | undefined
		): Chainable<void>;
	}
}
