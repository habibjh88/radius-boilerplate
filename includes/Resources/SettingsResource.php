<?php
namespace RadiusTheme\RadiusBoilerplate\Resources;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
use RadiusTheme\RadiusBoilerplate\Abstracts\BaseResource;

/**
 * Api/Resources/SettingsResource.php
 * Settings resource transformer
 *
 * @package RadiusTheme\RadiusBoilerplate\Resources
 */
class SettingsResource extends BaseResource {

	/**
	 * Transform a settings section into an API-friendly array.
	 *
	 * Settings are stored as plain arrays in wp_options, so the transformer
	 * returns the section data as-is.
	 *
	 * @param array|object $settings The settings section data.
	 * @return array Transformed data.
	 */
	public function transform( $settings ): array {
		if ( is_array( $settings ) ) {
			return $settings;
		}
		return (array) $settings;
	}
}
