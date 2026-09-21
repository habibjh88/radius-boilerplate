<?php
/**
 * REST route definitions.
 *
 * Loaded by Core\Api\ApiManager on `rest_api_init`. `$this->router` (also
 * available as `$router`) is a Core\Api\Routes\RouteRegistrar bound to the
 * `radius-boilerplate/v1` namespace.
 *
 *   $this->router->resource( 'items', ItemController::class );
 *     => GET    /items            index
 *        POST   /items            store
 *        GET    /items/{id}       show
 *        PUT    /items/{id}       update
 *        DELETE /items/{id}       destroy
 *
 * @package RadiusTheme\RadiusBoilerplate\Routes
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use RadiusTheme\RadiusBoilerplate\Controllers\ItemController;
use RadiusTheme\RadiusBoilerplate\Controllers\SettingsController;

/** Item routes — the example CRUD resource. */
$this->router->resource( 'items', ItemController::class );
$this->router->put( 'items/(?P<id>\d+)/publish', array( ItemController::class, 'publish' ) );

/** Settings routes. */
$this->router->get( 'settings', array( SettingsController::class, 'index' ) );
$this->router->put( 'settings', array( SettingsController::class, 'update' ) );
$this->router->put( 'settings/reset', array( SettingsController::class, 'reset' ) );
$this->router->get( 'settings/(?P<section>[a-zA-Z0-9_-]+)', array( SettingsController::class, 'show' ) ); // phpcs:ignore
$this->router->put( 'settings/(?P<section>[a-zA-Z0-9_-]+)', array( SettingsController::class, 'updateSection' ) ); // phpcs:ignore

/**
 * Add-on routes — an add-on plugin registers its own endpoints here rather than
 * editing this file. It can also append a whole route file via the
 * `rtbp_api_route_paths` filter.
 *
 * @param \RadiusTheme\RadiusBoilerplate\Core\Api\Routes\RouteRegistrar $router
 */
do_action( 'rtbp_register_addon_routes', $this->router );
