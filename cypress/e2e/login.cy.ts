describe('Login', () => {
	beforeEach(() => {
		cy.request('POST','/api/seed');
		cy.visit('/auth/login');
	});
	it('Login Successfully', () => {
		cy.fixture<{ email: string; password: string }>('user').then((user) => {
			const { email, password } = user;
			cy.dataCy('email-input').type(email);
			cy.dataCy('password-input').type(password);
			cy.get('button[type=submit]').click();
		});
		cy.intercept('http://localhost:3001/api/auth/callback/credentials?').as(
			'auth-completed',
		);

		cy.wait('@auth-completed');
		cy.dataCy('toaster')
			.should('contain.text', 'Success')
			.and('have.class', 'success');
		cy.getCookie('next-auth.session-token').should('exist');
		cy.url().should('include', '/dashboard');
	});
	it('Fails to login with invalid credentials', () => {
		cy.fixture<{ email: string; password: string }>('user').then((user) => {
			const { email, password } = user;
			cy.dataCy('email-input').type(email);
			cy.dataCy('password-input').type(password + 'wrong');
			cy.get('button[type=submit]').click();
		});
		cy.intercept('http://localhost:3001/api/auth/callback/credentials?').as(
			'auth-completed',
		);

		cy.wait('@auth-completed');
		cy.dataCy('toaster')
			.should('contain.text', 'Oops! Something went wrong')
			.and('have.class', 'destructive');
		cy.getCookie('next-auth.session-token').should('not.exist');
		cy.url().should('include', '/auth/login');
	});
	it('Gets redirected to login page when trying to access dashboard', () => {
		cy.visit('/dashboard');
		cy.url().should('include', '/auth/login');
	});
});
