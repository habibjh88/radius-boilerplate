/**
 * Smoke test: the admin app boots and the Items screen lists what the REST API
 * returns.
 *
 * BOILERPLATE: the reference spec. Copy it for your own screens.
 */
import { test, expect } from '../fixtures/test';
import { createItem, deleteItem } from '../fixtures/seed';

test.describe( 'Items admin screen', () => {
	let itemId: number;
	let itemTitle: string;

	test.beforeAll( async ( { requestUtils } ) => {
		const item = await createItem( requestUtils, {
			title: `Playwright item ${ Date.now() }`,
		} );
		itemId = item.id;
		itemTitle = item.title;
	} );

	test.afterAll( async ( { requestUtils } ) => {
		await deleteItem( requestUtils, itemId );
	} );

	test( 'admin can see the seeded item', async ( { admin, page } ) => {
		await admin.visitAdminPage( 'admin.php', 'page=radius-boilerplate' );

		// The app mounts into the node printed by views/app.php.
		await expect( page.locator( '#radius-boilerplate' ) ).toBeVisible();

		await page.goto(
			`${ page.url().split( '#' )[ 0 ] }#/items`
		);

		await expect(
			page.getByRole( 'textbox', { name: /search items/i } )
		).toBeVisible();

		await expect( page.getByText( itemTitle ) ).toBeVisible();
	} );

	test( 'the add-item dialog opens', async ( { admin, page } ) => {
		await admin.visitAdminPage( 'admin.php', 'page=radius-boilerplate' );
		await page.goto( `${ page.url().split( '#' )[ 0 ] }#/items` );

		await page.getByRole( 'button', { name: /add item/i } ).click();

		await expect( page.getByRole( 'dialog' ) ).toBeVisible();
		await expect( page.getByLabel( /title/i ) ).toBeVisible();
	} );
} );
