"use strict";
const { PadesVisualRectangle } = require("./pades-visual-rectangle");

class Initial {
	constructor() {
		this._container = new PadesVisualRectangle();
	}

	width(value) {
		this._container.width = value;
		return new FixedWidth(this._container);
	}

	varWidth() {
		return new VarWidth(this._container);
	}

	fullWidth() {
		this._container.left = 0.0;
		this._container.right = 0.0;
		return new WidthDefined(this._container);
	}

	height(value) {
		this._container.height = value;
		return new FixedHeight(this._container);
	}

	varHeight() {
		return new VarHeight(this._container);
	}

	fullHeight() {
		this._container.top = 0.0;
		this._container.bottom = 0.0;
		return new HeightDefined(this._container);
	}

	varWidthAndHeight() {
		return new VarWidthAndHeight(this._container);
	}

	full() {
		this._container.top = 0.0;
		this._container.right = 0.0;
		this._container.bottom = 0.0;
		this._container.left = 0.0;
		return this._container;
	}
}

class FixedWidth {
	constructor(container) {
		this._container = container;
	}

	anchorLeft(margin) {
		margin = margin || 0.0;
		this._container.left = margin;
		return new WidthDefined(this._container);
	}

	anchorRight(margin) {
		margin = margin || 0.0;
		this._container.right = margin;
		return new WidthDefined(this._container);
	}

	center() {
		return new WidthDefined(this._container);
	}
}

class VarWidth {
	constructor(container) {
		this._container = container;
	}

	margins(leftMargin, rightMargin) {
		rightMargin = rightMargin || leftMargin;
		this._container.left = leftMargin;
		this._container.right = rightMargin;
		return new WidthDefined(this._container);
	}
}

class FixedHeight {
	constructor(container) {
		this._container = container;
	}

	anchorTop(margin) {
		margin = margin || 0.0;
		this._container.top = margin;
		return new HeightDefined(this._container);
	}

	anchorBottom(margin) {
		margin = margin || 0.0;
		this._container.bottom = margin;
		return new HeightDefined(this._container);
	}

	center() {
		return new HeightDefined(this._container);
	}
}

class VarHeight {
	constructor(container) {
		this._container = container;
	}

	margins(topMargin, bottomMargin) {
		bottomMargin = bottomMargin || topMargin;
		this._container.top = topMargin;
		this._container.bottom = bottomMargin;
		return new HeightDefined(this._container);
	}
}

class WidthDefined {
	constructor(container) {
		this._container = container;
	}

	height(value) {
		this._container.height = value;
		return new WidthDefinedFixedHeight(this._container);
	}

	varHeight() {
		return new WidthDefinedVarHeight(this._container);
	}

	fullHeight() {
		this._container.top = 0.0;
		this._container.bottom = 0.0;
		return this._container;
	}
}

class HeightDefined {
	constructor(container) {
		this._container = container;
	}

	width(value) {
		this._container.width = value;
		return new HeightDefinedFixedWidth(this._container);
	}

	varWidth() {
		return new HeightDefinedVarWidth(this._container);
	}

	fullWidth() {
		this._container.left = 0.0;
		this._container.right = 0.0;
		return this._container;
	}
}

class WidthDefinedFixedHeight {
	constructor(container) {
		this._container = container;
	}

	anchorTop(margin) {
		margin = margin || 0.0;
		this._container.top = margin;
		return this._container;
	}

	anchorBottom(margin) {
		margin = margin || 0.0;
		this._container.bottom = margin;
		return this._container;
	}

	center() {
		return this._container;
	}
}

class WidthDefinedVarHeight {
	constructor(container) {
		this._container = container;
	}

	margins(topMargin, bottomMargin) {
		bottomMargin = bottomMargin || topMargin;
		this._container.top = topMargin;
		this._container.bottom = bottomMargin;
		return this._container;
	}
}

class HeightDefinedFixedWidth {
	constructor(container) {
		this._container = container;
	}

	anchorLeft(margin) {
		margin = margin || 0.0;
		this._container.left = margin;
		return this._container;
	}

	anchorRight(margin) {
		margin = margin || 0.0;
		this._container.right = margin;
		return this._container;
	}

	center() {
		return this._container;
	}
}

class HeightDefinedVarWidth {
	constructor(container) {
		this._container = container;
	}

	margins(leftMargin, rightMargin) {
		rightMargin = rightMargin || leftMargin;
		this._container.left = leftMargin;
		this._container.right = rightMargin;
		return this._container;
	}
}

class VarWidthAndHeight {
	constructor(container) {
		this._container = container;
	}

	margins(topMargin, rightMargin, bottomMargin, leftMargin) {
		rightMargin = rightMargin || topMargin;
		bottomMargin = bottomMargin || topMargin;
		leftMargin = leftMargin || rightMargin;
		this._container.top = topMargin;
		this._container.right = rightMargin;
		this._container.left = leftMargin;
		this._container.bottom = bottomMargin;
		return this._container;
	}
}

exports.Initial = Initial;
exports.FixedWidth = FixedWidth;
exports.VarWidth = VarWidth;
exports.FixedHeight = FixedHeight;
exports.VarHeight = VarHeight;
exports.WidthDefined = WidthDefined;
exports.HeightDefined = HeightDefined;
exports.WidthDefinedFixedHeight = WidthDefinedFixedHeight;
exports.WidthDefinedVarHeight = WidthDefinedVarHeight;
exports.HeightDefinedFixedWidth = HeightDefinedFixedWidth;
exports.HeightDefinedVarWidth = HeightDefinedVarWidth;
exports.VarWidthAndHeight = VarWidthAndHeight;
