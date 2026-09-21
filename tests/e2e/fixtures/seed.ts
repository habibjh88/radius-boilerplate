/**
 * Seed helpers built on @wordpress/e2e-test-utils-playwright's RequestUtils.
 *
 * One non-obvious thing this file works around: the plugin's
 * PermissionMiddleware (includes/Core/Api/Middleware/PermissionMiddleware.php)
 * rejects every REST call whose `Referer` header doesn't start with
 * `home_url()`. Playwright's APIRequestContext sends no Referer by default, so
 * `rest()` below sets one explicitly. Without it every call fails with a 403
 * "Invalid request source".
 *
 * Routes used (see includes/Routes/routes.php):
 *   GET/POST /radius-boilerplate/v1/items — required: title
 */
import type { RequestUtils } from '@wordpress/e2e-test-utils-playwright';

const BASE_URL = process.env.WP_BASE_URL || 'http://localhost:8889';

/**
 * REST call with the Referer the plugin's permission middleware requires.
 */
export async function rest(
	requestUtils: RequestUtils,
	options: Parameters< RequestUtils[ 'rest' ] >[ 0 ]
) {
	return requestUtils.rest( {
		...options,
		headers: { Referer: `${ BASE_URL }/`, ...( options.headers || {} ) },
	} );
}

export type SeededItem = { id: number; title: string };

/**
 * Create an item and return it.
 */
export async function createItem(
	requestUtils: RequestUtils,
	overrides: Record< string, unknown > = {}
): Promise< SeededItem > {
	const response = await rest( requestUtils, {
		method: 'POST',
		path: '/radius-boilerplate/v1/items',
		data: {
			title: `E2E item ${ Date.now() }`,
			description: 'Created by the Playwright suite.',
			status: 'published',
			price: 10,
			...overrides,
		},
	} );

	return response.data as SeededItem;
}

/**
 * Delete an item, ignoring a missing row.
 */
export async function deleteItem( requestUtils: RequestUtils, id: number ) {
	try {
		await rest( requestUtils, {
			method: 'DELETE',
			path: `/radius-boilerplate/v1/items/${ id }`,
		} );
	} catch {
		// Already gone — nothing to clean up.
	}
}

/**
 * Make sure at least one published item exists, so list views have content.
 */
export async function ensureSeedDefaults( requestUtils: RequestUtils ) {
	const existing = await rest( requestUtils, {
		method: 'GET',
		path: '/radius-boilerplate/v1/items?per_page=1',
	} );

	if ( ! existing?.data?.length ) {
		await createItem( requestUtils );
	}
}
