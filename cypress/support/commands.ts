/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('dataCy', (value) => {
	return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('login', (email, password) => {
	cy.session(
		email,
		() => {
			cy.visit('/auth/login');
			cy.dataCy('email-input').type(email);
			cy.dataCy('password-input').type(password);
			cy.get('button[type=submit]').click();
			cy.intercept('http://localhost:3001/api/auth/callback/credentials?').as(
				'auth-completed',
			);

			cy.wait('@auth-completed');
			cy.dataCy('toaster')
				.should('contain.text', 'Success')
				.and('have.class', 'success');
			cy.getCookie('next-auth.session-token').should('exist');
			cy.url().should('include', '/dashboard');
		},
		{
			validate: () => {
				cy.getCookie('next-auth.session-token').should('exist');
			},
		},
	);
});
