<?php
/**
 * Item service.
 *
 * @package RadiusTheme\RadiusBoilerplate\Services
 */

namespace RadiusTheme\RadiusBoilerplate\Services;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

use RadiusTheme\RadiusBoilerplate\Repositories\ItemRepository;

/**
 * Class ItemService
 *
 * Business logic for items. Repositories are injected by the container —
 * see Core/config/bindings.php.
 */
class ItemService {

	/**
	 * Item repository.
	 *
	 * @var ItemRepository
	 */
	private ItemRepository $repository;

	/**
	 * Constructor.
	 *
	 * @param ItemRepository $repository Injected repository.
	 */
	public function __construct( ItemRepository $repository ) {
		$this->repository = $repository;
	}

	/**
	 * Publish an item and return the fresh model.
	 *
	 * @param int $id Item id.
	 *
	 * @return \RadiusTheme\RadiusBoilerplate\Models\Item|null
	 */
	public function publish( int $id ) {
		$item = $this->repository->find( $id );

		if ( ! $item ) {
			return null;
		}

		$item->update( array( 'status' => 'published' ) );

		return $this->repository->find( $id );
	}

	/**
	 * Items available to the public site app.
	 *
	 * @param int $limit Maximum number of rows.
	 *
	 * @return array
	 */
	public function publicList( int $limit = 20 ): array {
		return $this->repository->published( $limit );
	}
}
