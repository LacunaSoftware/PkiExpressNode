"use strict";

const { Color } = require("./color");
const { PdfMarkPageOptions } = require("./pdf-mark-page-options");

class PdfMark {
	constructor() {
		this._container = null;
		this._borderWidth = 0.0;
		this._borderColor = Color.BLACK;
		this._backgroundColor = Color.TRANSPARENT;
		this._elements = [];
		this._pageOption = PdfMarkPageOptions.ALL_PAGES;
		this._pageOptionNumber = null;
	}

	get container() {
		return this._container;
	}

	set container(value) {
		this._container = value;
	}

	get borderWidth() {
		return this._borderWidth;
	}

	set borderWidth(value) {
		this._borderWidth = value;
	}

	get borderColor() {
		return this._borderColor;
	}

	set borderColor(value) {
		this._borderColor = value;
	}

	get backgroundColor() {
		return this._backgroundColor;
	}

	set backgroundColor(value) {
		this._backgroundColor = value;
	}

	get elements() {
		return this._elements;
	}

	set elements(value) {
		this._elements = value;
	}

	get pageOption() {
		return this._pageOption;
	}

	set pageOption(value) {
		this._pageOption = value;
	}

	get pageOptionNumber() {
		return this._pageOptionNumber;
	}

	set pageOptionNumber(value) {
		this._pageOptionNumber = value;
	}

	// region Fluent API

	onContainer(container) {
		this._container = container;
		return this;
	}

	withBorderWidth(borderWidth) {
		this._borderWidth = borderWidth;
		return this;
	}

	onAllPages() {
		this._pageOption = PdfMarkPageOptions.ALL_PAGES;
		return this;
	}

	onNewPage() {
		this._pageOption = PdfMarkPageOptions.NEW_PAGE;
		return this;
	}

	onSinglePage() {
		this._pageOption = PdfMarkPageOptions.SINGLE_PAGE;
		return this;
	}

	onSinglePageFromEnd() {
		this._pageOption = PdfMarkPageOptions.SINGLE_PAGE_FROM_END;
		return this;
	}

	addElement(element) {
		this._elements.push(element);
		return this;
	}

	withBorderColor(borderColor) {
		this._borderColor = borderColor;
		return this;
	}

	withBackgroundColor(backgroundColor) {
		this._backgroundColor = backgroundColor;
		return this;
	}

	// endregion

	toModel() {
		let model = {
			container: this._container ? this._container.toModel() : null,
			backgroundColor: this._backgroundColor
				? this._backgroundColor.toModel()
				: null,
			borderColor: this._borderColor ? this._borderColor.toModel() : null,
			borderWidth: this._borderWidth,
			pageOption: this._pageOption,
			pageOptionNumber: this._pageOptionNumber,
			elements: [],
		};
		for (let element of this._elements) {
			model["elements"].push(element.toModel());
		}
		return model;
	}
}

exports.PdfMark = PdfMark;
