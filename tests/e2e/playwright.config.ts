/**
 * Playwright configuration for the radius-boilerplate plugin.
 *
 * We extend the official @wordpress/scripts base config — it bundles the
 * webServer setup (auto-starts wp-env), storageState handling, output dirs,
 * and the WordPress-specific test fixtures (admin, editor, pageUtils,
 * requestUtils). The only customization here is testDir so specs live next
 * to fixtures/.
 *
 * If you need to customize further, spread baseConfig as the starting point.
 * Reference: https://developer.wordpress.org/news/2026/05/getting-started-writing-wordpress-e2e-tests-with-playwright/
 */
import { defineConfig } from '@playwright/test';
import baseConfig from '@wordpress/scripts/config/playwright.config';

export default defineConfig({
	...baseConfig,
	testDir: './specs',
});
