<?php
/**
 * Container bindings.
 *
 * Every class the DI container knows how to build lives here. Loaded by
 * `Core\Config` on `plugins_loaded` and consumed by `Container::resolve()`.
 *
 * Add a binding as `Fqcn::class => fn() => new Fqcn( ...dependencies )`. Use
 * `Container::resolve()` inside the closure to inject other bound classes —
 * everything is lazy, so nothing is instantiated until it is first resolved.
 *
 * @package RadiusTheme\RadiusBoilerplate\Core\config
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use RadiusTheme\RadiusBoilerplate\Core\Container\Container;
use RadiusTheme\RadiusBoilerplate\Repositories\ItemRepository;
use RadiusTheme\RadiusBoilerplate\Repositories\SettingsRepository;
use RadiusTheme\RadiusBoilerplate\Services\ItemService;
use RadiusTheme\RadiusBoilerplate\Services\SettingsService;

return array(

	// Repositories.
	ItemRepository::class     => fn() => new ItemRepository(),
	SettingsRepository::class => fn() => new SettingsRepository(),

	// Services.
	ItemService::class        => fn() => new ItemService(
		Container::resolve( ItemRepository::class )
	),
	SettingsService::class    => fn() => new SettingsService(
		Container::resolve( SettingsRepository::class )
	),
);
