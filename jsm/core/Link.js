export class Link {
	/**
	 * 这里的 io 的概念是相对于 Element 本身而言的
	 * - outputElement ----> [link] ----> inputElement
	 * @param {*} inputElement - 被输入的元素
	 * @param {*} outputElement - 输出元素
	 */
	constructor( inputElement = null, outputElement = null ) {

		this.inputElement = inputElement;
		this.outputElement = outputElement;

	}

	get lioElement() {

		if ( Link.InputDirection === 'left' ) {

			return this.outputElement;

		} else {

			return this.inputElement;

		}

	}

	get rioElement() {

		if ( Link.InputDirection === 'left' ) {

			return this.inputElement;

		} else {

			return this.outputElement;

		}

	}

}

//Link.InputDirection = 'right';
Link.InputDirection = 'left';
