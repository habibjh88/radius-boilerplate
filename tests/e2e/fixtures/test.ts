/**
 * Extended test fixture.
 *
 * Re-exports `test` and `expect` from @wordpress/e2e-test-utils-playwright with
 * one addition: the first time any spec asks for `requestUtils`, the default
 * seed data is created. Specs should import from this file rather than from
 * the package directly:
 *
 *     import { test, expect } from '../fixtures/test';
 */
import { test as base, expect } from '@wordpress/e2e-test-utils-playwright';
import { ensureSeedDefaults } from './seed';

// Worker-scoped so seeding runs at most once per worker, even when several
// spec files share one.
let seeded = false;

export const test = base.extend( {
	requestUtils: async ( { requestUtils }, use ) => {
		if ( ! seeded ) {
			await ensureSeedDefaults( requestUtils );
			seeded = true;
		}
		await use( requestUtils );
	},
} );

export { expect };
