describe('Products CRUD', () => {
	before(() => {
		cy.request('POST', '/api/seed');
	});
	beforeEach(() => {
		cy.fixture<{ email: string; password: string }>('user.json').then(
			(user) => {
				cy.login(user.email, user.password);
			},
		);
		cy.visit('/dashboard/products');
	});
	it('Should see products list with 7 table headers, including 5 with text', () => {
		const expectedHeadersTexts = [
			'Name',
			'Description',
			'Price',
			'In Stock',
			'Tags',
		];

		cy.get('h1').should('exist').and('contain.text', 'Products');
		cy.get('table').should('exist');

		/**
		 * The table should have 7 headers, 5 including text and 2 empty (select all and actions)
		 */
		cy.get('th').should('have.length', 7);

		expectedHeadersTexts.forEach((headerText) => {
			cy.get('th').should('contain.text', headerText);
		});
	});
	it('Should add a new product', () => {
		cy.get('tbody>tr').should('have.length', 3);
		cy.dataCy('add-new-product').click();
		cy.url().should('contain', '/dashboard/products/new');

		const productData = {
			nameInput: 'New Product added for test',
			descriptionTextarea: 'New Product Description For Test',
			priceInput: '100',
			inStockInput: '100',
			tagsInput: 'new,product',
		};

		Object.entries(productData).forEach(([key, value]) => {
			cy.dataCy(key).type(value);
		});
		cy.dataCy('submit-button').click();
		cy.dataCy('submit-button').should('contain.text', 'Saving...');

		cy.url().should('contain', '/dashboard/products');
		cy.get('tbody>tr').should('have.length', 4);
	});
	it('Should edit a product', () => {
		cy.dataCy('table-row-actions-button').last().click({ multiple: true });

		cy.dataCy('table-row-action-edit-link').click();

		const updatedProductData = {
			nameInput: 'Edited Product for test',
			descriptionTextarea: 'Edited Product Description For Test',
			priceInput: '50',
			inStockInput: '10',
			tagsInput: 'Edited tag,Not new tag',
		};
		Object.entries(updatedProductData).forEach(([key, value]) => {
			cy.dataCy(key).clear().type(value);
		});
		cy.dataCy('submit-button').click();
		cy.dataCy('submit-button').should('contain.text', 'Saving...');

		cy.url().should('contain', '/dashboard/products');

		cy.get('table>tbody>tr')
			.last()
			.within(() => {
				cy.contains(updatedProductData.nameInput);
				cy.contains(updatedProductData.descriptionTextarea);
				cy.contains(updatedProductData.priceInput);
				cy.contains(updatedProductData.inStockInput);
				updatedProductData.tagsInput.split(',').forEach((tag) => {
					cy.contains(tag.replaceAll(' ', '-'));
				});
			});
	});
	it('Should delete a product', () => {
		cy.get('tbody>tr').should('have.length', 4);
		cy.dataCy('table-row-actions-button').last().click({ multiple: true });

		cy.dataCy('table-row-action-delete-button').click();

		cy.dataCy('alert-deleting-product')
			.should('exist')
			.and('contain.text', 'Are you absolutely sure?');

		cy.dataCy('confirm-delete-product-button').click();

		cy.dataCy('alert-deleting-product').should('not.exist');

		cy.get('tbody>tr').should('have.length', 3);
	});
	it('Should delete all products', () => {
		cy.get('tbody>tr').should('have.length', 3);
		cy.dataCy('select-all-rows-checkbox').click({ multiple: true });

		cy.dataCy('delete-all-products-alert-trigger').click();
		cy.dataCy('alert-delete-all-products')
			.should('exist')
			.and('contain.text', 'Are you absolutely sure?');
		cy.dataCy('confirm-delete-all-products-button').click();
		cy.dataCy('alert-delete-all-products').should('not.exist');

		// When all products are deleted, the table should only have one row with
		// Some message like 'No results.'
		// So we put 1 as the expected length
		cy.get('tbody>tr').should('have.length', 1);
	});
});
