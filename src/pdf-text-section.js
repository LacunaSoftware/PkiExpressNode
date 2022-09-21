"use strict";

const { Color } = require("./color");
const { PdfTextStyle } = require("./pdf-text-style");

class PdfTextSection {
	constructor(text, color, fontSize) {
		fontSize = fontSize || null;
		color = color || null;
		text = text || null;

		this._style = PdfTextStyle.NORMAL;
		this._text = text;
		this._fontSize = fontSize;
		this._color = null;
		if (!color) {
			this._color = Color.BLACK;
		} else {
			this._color = color;
		}
	}

	get text() {
		return this._text;
	}

	set text(value) {
		this._text = value;
	}

	get color() {
		return this._color;
	}

	set color(value) {
		this._color = value;
	}

	get fontSize() {
		return this._fontSize;
	}

	set fontSize(value) {
		this._fontSize = value;
	}

	get style() {
		return this._style;
	}

	set style(value) {
		this._style = value;
	}

	// region FluentAPI

	withFontSize(fontSize) {
		this._fontSize = fontSize;
		return this;
	}

	withText(text) {
		this._text = text;
		return this;
	}

	bold() {
		this._style = PdfTextStyle.BOLD;
		return this;
	}

	italic() {
		this._style = PdfTextStyle.ITALIC;
		return this;
	}

	withColor(color) {
		this._color = color;
		return this;
	}

	// endregion

	toModel() {
		return {
			style: this._style,
			text: this._text,
			color: this._color ? this._color.toModel() : null,
			fontSize: this._fontSize,
		};
	}
}

exports.PdfTextSection = PdfTextSection;
