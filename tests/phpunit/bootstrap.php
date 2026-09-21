<?php
/**
 * PHPUnit bootstrap.
 *
 * Loads the WordPress test library from wp-phpunit and activates this plugin
 * before the suite runs. Intended to be executed inside wp-env:
 *
 *   npm run env:start
 *   npm run test:php
 *
 * @package RadiusTheme\RadiusBoilerplate
 */

$rtbp_autoload = dirname( __DIR__, 2 ) . '/vendor/autoload.php';

if ( file_exists( $rtbp_autoload ) ) {
	require_once $rtbp_autoload;
}

$rtbp_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $rtbp_tests_dir ) {
	$rtbp_tests_dir = dirname( __DIR__, 2 ) . '/vendor/wp-phpunit/wp-phpunit';
}

require_once $rtbp_tests_dir . '/includes/functions.php';

/**
 * Load the plugin under test.
 */
tests_add_filter(
	'muplugins_loaded',
	static function () {
		require dirname( __DIR__, 2 ) . '/radius-boilerplate.php';
	}
);

require $rtbp_tests_dir . '/includes/bootstrap.php';
