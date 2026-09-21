import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * `radius-boilerplate/items` — the example block.
 *
 * Attributes mirror the shortcode's, and the front end is rendered by the
 * block's PHP render_callback, so both paths produce identical markup.
 */
registerBlockType( 'radius-boilerplate/items', {
	apiVersion: 3,
	title: __( 'Item List', 'radius-boilerplate' ),
	description: __( 'Displays the published items.', 'radius-boilerplate' ),
	category: 'radius-boilerplate',
	icon: 'screenoptions',
	supports: { html: false },
	attributes: {
		layout: { type: 'string', default: 'grid' },
		columns: { type: 'number', default: 3 },
		perPage: { type: 'number', default: 9 },
	},

	edit: function Edit( { attributes, setAttributes } ) {
		const { layout, columns, perPage } = attributes;
		const blockProps = useBlockProps();

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Layout', 'radius-boilerplate' ) }>
						<SelectControl
							label={ __( 'Layout', 'radius-boilerplate' ) }
							value={ layout }
							options={ [
								{
									label: __( 'Grid', 'radius-boilerplate' ),
									value: 'grid',
								},
								{
									label: __( 'List', 'radius-boilerplate' ),
									value: 'list',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { layout: value } )
							}
							__nextHasNoMarginBottom
						/>
						<RangeControl
							label={ __( 'Columns', 'radius-boilerplate' ) }
							value={ columns }
							min={ 1 }
							max={ 6 }
							onChange={ ( value ) =>
								setAttributes( { columns: value } )
							}
							__nextHasNoMarginBottom
						/>
						<RangeControl
							label={ __(
								'Items per page',
								'radius-boilerplate'
							) }
							value={ perPage }
							min={ 1 }
							max={ 48 }
							onChange={ ( value ) =>
								setAttributes( { perPage: value } )
							}
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div className="components-placeholder">
						<div className="components-placeholder__label">
							{ __( 'Item List', 'radius-boilerplate' ) }
						</div>
						<div className="components-placeholder__instructions">
							{ __(
								'The published items render here on the front end.',
								'radius-boilerplate'
							) }
						</div>
					</div>
				</div>
			</>
		);
	},

	// Rendered in PHP — see Blocks\BlockManager::render_items_block().
	save() {
		return null;
	},
} );
