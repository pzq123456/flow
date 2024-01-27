let _id = 0;
/**
 * 这段代码定义了一个名为`Serializer`的类，该类继承自`EventTarget`。`Serializer`类的主要目的是为了实现对象的序列化和反序列化。
 */
export class Serializer extends EventTarget {

	constructor() {

		super();

		this._id = _id ++;

		this._serializable = true;

	}

	get id() {

		return this._id;

	}

	setSerializable( value ) {

		this._serializable = value;

		return this;

	}

	getSerializable() {

		return this._serializable;

	}

	serialize( /*data*/ ) {

		console.warn( 'Serializer: Abstract function.' );

	}

	deserialize( /*data*/ ) {

		console.warn( 'Serializer: Abstract function.' );

	}

	deserializeLib( /*data, lib*/ ) {

		// Abstract function.

	}

	get className() {

		return this.constructor.name;

	}

	toJSON( data = null ) {

		let object = null;

		const id = this.id;

		if ( data !== null ) {

			const objects = data.objects;

			object = objects[ id ];

			if ( object === undefined ) {

				object = { objects };

				this.serialize( object );

				delete object.objects;

				objects[ id ] = object;

			}

		} else {

			object = { objects: {} };

			this.serialize( object );

		}

		object.id = id;
		object.type = this.className;

		return object;

	}

}
