/**
 * Public app entry.
 *
 * Mounted into the node printed by templates/items/item-list.php, which the
 * `[rtbp_items]` shortcode, the `radius-boilerplate/items` block and the
 * Elementor widget all render.
 */
import { createRoot } from 'react-dom/client';

import App from './App';
import '../site.css';

const container = document.getElementById( 'radius-boilerplate-site' );

if ( container ) {
	createRoot( container ).render(
		<App
			layout={ container.dataset.layout || 'grid' }
			columns={ Number( container.dataset.columns ) || 3 }
			perPage={ Number( container.dataset.perPage ) || 9 }
		/>
	);
}
