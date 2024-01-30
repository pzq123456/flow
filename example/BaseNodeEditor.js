import { Node, ButtonInput, TitleElement, ContextMenu } from '../jsm/Flow.js';


export class BaseNodeEditor extends Node {

	constructor( name, value = null, width = 300 ) {

		super();

		const getObjectCallback = ( /*output = null*/ ) => {

			return this.value;

		};

		this.setWidth( width );

		this.outputLength = 1;

		const title = new TitleElement( name )
			.setObjectCallback( getObjectCallback )
			.setSerializable( false )
			.setOutput( this.outputLength );

		const contextButton = new ButtonInput().onClick( () => {

			context.open();

		} ).setIcon( 'ti ti-dots' );

		const onAddButtons = () => {

			context.removeEventListener( 'show', onAddButtons );

			context.add( new ButtonInput( 'Remove' ).setIcon( 'ti ti-trash' ).onClick( () => {

				this.dispose();

			} ) );

			if ( this.hasJSON() ) {

				this.context.add( new ButtonInput( 'Export' ).setIcon( 'ti ti-download' ).onClick( () => {

					exportJSON( this.exportJSON(), this.constructor.name );

				} ) );

			}

			context.add( new ButtonInput( 'Isolate' ).setIcon( 'ti ti-3d-cube-sphere' ).onClick( () => {

				this.context.hide();

				this.title.dom.dispatchEvent( new MouseEvent( 'dblclick' ) );

			} ) );

		};

		const context = new ContextMenu( this.dom );
		context.addEventListener( 'show', onAddButtons );

		this.title = title;

		if ( this.icon ) this.setIcon( 'ti ti-' + this.icon );

		this.contextButton = contextButton;
		this.context = context;

		title.addButton( contextButton );

		this.add( title );

		this.editor = null;

		this.value = value;

	}

	hasJSON() {

		return this.value && typeof this.value.toJSON === 'function';

	}

	exportJSON() {

		return this.value.toJSON();

	}

	serialize( data ) {

		super.serialize( data );

		delete data.width;

	}

	deserialize( data ) {

		delete data.width;

		super.deserialize( data );

	}

	setEditor( value ) {

		this.editor = value;

		this.dispatchEvent( new Event( 'editor' ) );

		return this;

	}

	add( element ) {

		element.onValid( ( source, target ) => this.onValidElement( source, target ) );

		return super.add( element );

	}

	setName( value ) {

		this.title.setTitle( value );

		return this;

	}

	setIcon( value ) {

		this.title.setIcon( 'ti ti-' + value );

		return this;

	}

	getName() {

		return this.title.getTitle();

	}

	setOutputLength( value ) {

		this.outputLength = value;

		this.updateOutputConnection();

		return;

	}

	setObjectCallback( callback ) {

		this.title.setObjectCallback( callback );

		return this;

	}

	getObject( callback ) {

		return this.title.getObject( callback );

	}

	setColor( color ) {

		this.title.setColor( color );

		return this;

	}
	invalidate() {

		this.title.dispatchEvent( new Event( 'connect' ) );

	}

	dispose() {

		this.setEditor( null );

		this.context.hide();

		super.dispose();

	}

}

export function exportJSON( object, name ) {

	const json = JSON.stringify( object );

	const a = document.createElement( 'a' );
	const file = new Blob( [ json ], { type: 'text/plain' } );

	a.href = URL.createObjectURL( file );
	a.download = name + '.json';
	a.click();

}