"use strict";

class Color {
	constructor(red, green, blue, alpha) {
		alpha = alpha || 100;
		this._red = red;
		this._green = green;
		this._blue = blue;
		this._alpha = alpha;
	}

	static fromRGB(red, green, blue) {
		return new Color(red, green, blue);
	}

	static fromRGBA(red, green, blue, alpha) {
		return new Color(red, green, blue, alpha);
	}

	// region Colors

	static get TRANSPARENT() {
		return new Color(255, 255, 255, 1);
	}

	static get WHITE() {
		return new Color(255, 255, 255);
	}

	static get LIGHT_GRAY() {
		return new Color(192, 192, 192);
	}

	static get GRAY() {
		return new Color(128, 128, 128);
	}

	static get DARK_GRAY() {
		return new Color(64, 64, 64);
	}

	static get BLACK() {
		return new Color(0, 0, 0);
	}

	static get RED() {
		return new Color(255, 0, 0);
	}

	static get PINK() {
		return new Color(255, 175, 175);
	}

	static get ORANGE() {
		return new Color(255, 200, 0);
	}

	static get YELLOW() {
		return new Color(255, 255, 0);
	}

	static get GREEN() {
		return new Color(0, 255, 0);
	}

	static get MAGENTA() {
		return new Color(255, 0, 255);
	}

	static get CYAN() {
		return new Color(0, 255, 255);
	}

	static get BLUE() {
		return new Color(0, 0, 255);
	}

	// endregion

	get red() {
		return this._red;
	}

	set red(value) {
		this._red = value;
	}

	get green() {
		return this._green;
	}

	set green(value) {
		this._green = value;
	}

	get blue() {
		return this._blue;
	}

	set blue(value) {
		this._blue = value;
	}

	get alpha() {
		return this._alpha;
	}

	set alpha(value) {
		this._alpha = value;
	}

	toModel() {
		return {
			alpha: this._alpha / 2.55,
			red: this._red,
			green: this._green,
			blue: this._blue,
		};
	}
}

exports.Color = Color;
