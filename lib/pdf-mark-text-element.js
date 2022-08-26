"use strict";

const { PadesHorizontalAlign } = require("./pades-horizontal-align");
const { PdfMarkElement } = require("./pdf-mark-element");
const { PdfMarkElementType } = require("./pdf-mark-element-type");
const { PdfTextSection } = require("./pdf-text-section");

class PdfMarkTextElement extends PdfMarkElement {
	constructor(relativeContainer, textSections) {
		textSections = textSections || null;
		relativeContainer = relativeContainer || null;
		super(PdfMarkElementType.TEXT, relativeContainer);

		this._textSections = null;
		if (!textSections) {
			this._textSections = [];
		} else {
			this._textSections = textSections;
		}
		this._align = PadesHorizontalAlign.LEFT;
	}

	// region FluentAPI

	alignTextLeft() {
		this._align = PadesHorizontalAlign.LEFT;
		return this;
	}

	alignTextRight() {
		this._align = PadesHorizontalAlign.RIGHT;
		return this;
	}

	alignTextCenter() {
		this._align = PadesHorizontalAlign.CENTER;
		return this;
	}

	addSectionFromText(section) {
		this._textSections.push(new PdfTextSection(section));
		return this;
	}

	addSection(section) {
		this._textSections.push(section);
		return this;
	}

	// endregion

	get textSections() {
		return this._textSections;
	}

	set textSections(value) {
		this._textSections = value;
	}

	get align() {
		return this._align;
	}

	set align(value) {
		this._align = value;
	}

	toModel() {
		let model = super.toModel();
		model["align"] = this._align;
		model["textSections"] = [];
		for (let section of this._textSections) {
			model["textSections"].push(section.toModel());
		}
		return model;
	}
}

exports.PdfMarkTextElement = PdfMarkTextElement;
