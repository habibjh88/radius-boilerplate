import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { get, put } from '@/api/client';

const SECTIONS = [
	{ key: 'general', label: __( 'General', 'radius-boilerplate' ) },
	{ key: 'display', label: __( 'Display', 'radius-boilerplate' ) },
];

/**
 * Settings screen.
 *
 * Reads `GET /settings`, writes one section at a time with
 * `PUT /settings/<section>`. Sections and their defaults are declared in
 * Helpers\SettingsHelper — add one there and render it here.
 *
 * @return {JSX.Element} Screen.
 */
export default function Settings() {
	const [ settings, setSettings ] = useState( null );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( '' );

	useEffect( () => {
		get( 'settings' )
			.then( ( { data } ) => setSettings( data.settings ?? data ) )
			.catch( ( error ) => setNotice( error.message ) );
	}, [] );

	const setField = ( section, field ) => ( value ) =>
		setSettings( ( current ) => ( {
			...current,
			[ section ]: { ...current[ section ], [ field ]: value },
		} ) );

	const save = async ( section ) => {
		setSaving( true );
		setNotice( '' );

		try {
			await put( `settings/${ section }`, settings[ section ] );
			setNotice( __( 'Settings saved.', 'radius-boilerplate' ) );
		} catch ( error ) {
			setNotice( error.message );
		} finally {
			setSaving( false );
		}
	};

	if ( ! settings ) {
		return (
			<p className="text-sm text-muted-foreground">
				{ notice || __( 'Loading settings…', 'radius-boilerplate' ) }
			</p>
		);
	}

	return (
		<div className="max-w-3xl space-y-4">
			{ notice ? (
				<p className="rounded-md border border-border bg-muted px-3 py-2 text-sm">
					{ notice }
				</p>
			) : null }

			<Tabs defaultValue="general">
				<TabsList>
					{ SECTIONS.map( ( { key, label } ) => (
						<TabsTrigger key={ key } value={ key }>
							{ label }
						</TabsTrigger>
					) ) }
				</TabsList>

				<TabsContent value="general">
					<Card>
						<CardHeader>
							<CardTitle>
								{ __( 'General', 'radius-boilerplate' ) }
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="rtbp-company">
									{ __(
										'Company name',
										'radius-boilerplate'
									) }
								</Label>
								<Input
									id="rtbp-company"
									value={
										settings.general?.companyName ?? ''
									}
									onChange={ ( event ) =>
										setField(
											'general',
											'companyName'
										)( event.target.value )
									}
								/>
							</div>

							<div>
								<Label htmlFor="rtbp-contact">
									{ __(
										'Contact email',
										'radius-boilerplate'
									) }
								</Label>
								<Input
									id="rtbp-contact"
									type="email"
									value={
										settings.general?.contactEmail ?? ''
									}
									onChange={ ( event ) =>
										setField(
											'general',
											'contactEmail'
										)( event.target.value )
									}
								/>
							</div>

							<div className="flex items-center justify-between rounded-md border border-border p-3">
								<Label htmlFor="rtbp-debug" className="m-0">
									{ __(
										'Enable debug logging',
										'radius-boilerplate'
									) }
								</Label>
								<Switch
									id="rtbp-debug"
									checked={ !! settings.general?.enableDebug }
									onCheckedChange={ setField(
										'general',
										'enableDebug'
									) }
								/>
							</div>

							<Button
								disabled={ saving }
								onClick={ () => save( 'general' ) }
							>
								{ saving
									? __( 'Saving…', 'radius-boilerplate' )
									: __(
											'Save changes',
											'radius-boilerplate'
									  ) }
							</Button>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="display">
					<Card>
						<CardHeader>
							<CardTitle>
								{ __( 'Display', 'radius-boilerplate' ) }
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="rtbp-color">
									{ __(
										'Primary color',
										'radius-boilerplate'
									) }
								</Label>
								<Input
									id="rtbp-color"
									type="color"
									className="h-10 w-20 p-1"
									value={
										settings.display?.primaryColor ??
										'#0040ff'
									}
									onChange={ ( event ) =>
										setField(
											'display',
											'primaryColor'
										)( event.target.value )
									}
								/>
							</div>

							<div>
								<Label htmlFor="rtbp-columns">
									{ __( 'Columns', 'radius-boilerplate' ) }
								</Label>
								<Input
									id="rtbp-columns"
									type="number"
									min="1"
									max="6"
									value={ settings.display?.columns ?? 3 }
									onChange={ ( event ) =>
										setField(
											'display',
											'columns'
										)( Number( event.target.value ) )
									}
								/>
							</div>

							<Button
								disabled={ saving }
								onClick={ () => save( 'display' ) }
							>
								{ saving
									? __( 'Saving…', 'radius-boilerplate' )
									: __(
											'Save changes',
											'radius-boilerplate'
									  ) }
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
