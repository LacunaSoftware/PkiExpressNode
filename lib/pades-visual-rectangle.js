'use strict';

class PadesVisualRectangle {

	constructor() {
		this._left = null;
		this._top = null;
		this._right = null;
		this._bottom = null;
		this._width = null;
		this._height = null;
	}

	get left() {
		return this._left;
	}

	set left(value) {
		this._left = value;
	}

	get top() {
		return this._top;
	}

	set top(value) {
		this._top = value;
	}

	get right() {
		return this._right;
	}

	set right(value) {
		this._right = value;
	}

	get bottom() {
		return this._bottom;
	}

	set bottom(value) {
		this._bottom = value;
	}

	get width() {
		return this._width;
	}

	set width(value) {
		this._width = value;
	}

	get height() {
		return this._height;
	}

	set height(value) {
		this._height = value;
	}

	toModel() {
		return {
			left: this._left,
			top: this._top,
			right: this._right,
			bottom: this._bottom,
			width: this._width,
			height: this._height
		};
	}
}

exports.PadesVisualRectangle = PadesVisualRectangle;