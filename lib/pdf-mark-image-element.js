'use strict';

const { PdfMarkElement } = require('./pdf-mark-element');
const { PdfMarkElementType } = require('./pdf-mark-element-type');
const { PdfMarkImage } = require('./pdf-mark-image');

class PdfMarkImageElement extends PdfMarkElement {

	constructor(relativeContainer, image) {
		image = image || null;
		relativeContainer = relativeContainer || null;
		super(PdfMarkElementType.IMAGE, relativeContainer);
		this._image = image;
	}

	get image() {
		return this._image;
	}

	set image(value) {
		this._image = value;
	}

	// region FluentAPI

	withImage(image) {
		this._image = image;
		return this;
	}

	withImageContent(imageContent, mimeType) {
		this._image = new PdfMarkImage(imageContent, mimeType);
		return this;
	}

	// endregion

	toModel() {
		let model = super.toModel();
		model['image'] = this._image.toModel();
		return model;
	}
}

exports.PdfMarkImageElement = PdfMarkImageElement;