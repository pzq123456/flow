import { Element } from '../core/Element.js';
import { draggableDOM } from '../core/Utils.js';

export class DraggableElement extends Element {

	constructor( draggable = true ) {

		super();

		this.draggable = draggable;

		const onDrag = () => {

			if ( this.draggable === true ) {

				draggableDOM( this.node.dom );

			}

		};

		const { dom } = this;

		dom.addEventListener( 'mousedown', onDrag );
		dom.addEventListener( 'touchstart', onDrag );

	}

}
