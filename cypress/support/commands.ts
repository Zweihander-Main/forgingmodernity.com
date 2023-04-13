// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// cypress.commands.overwrite('visit', (originalfn, url, options) => { ... })
import axe from 'axe-core';

// Custom logging for axe
const terminalLog = (violations: axe.Result[]): void => {
	cy.task(
		'log',
		`${violations.length} accessibility violation${
			violations.length === 1 ? '' : 's'
		} ${violations.length === 1 ? 'was' : 'were'} detected`
	);
	// pluck specific keys to keep the table readable
	const violationData = violations.map(
		({ id, impact, description, nodes }) => ({
			id,
			impact,
			description,
			nodes: nodes.length,
		})
	);

	cy.task('table', violationData);
};

Cypress.Commands.add('checkA11yWithLog', (...args) => {
	const type = Cypress.env('type');
	return cy.checkA11y(
		args[0] || undefined,
		args[1] || undefined,
		type === 'cli' ? terminalLog : args[2] || undefined
	);
});

export {};
