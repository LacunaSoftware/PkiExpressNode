'use strict';

const PdfContainerDefinition = require('./pdf-container-definition');
const { PdfMark } = require('./pdf-mark');
const { PdfMarkTextElement } = require('./pdf-mark-text-element');
const { PdfMarkImageElement } = require('./pdf-mark-image-element');
const { PdfMarkQRCodeElement } = require('./pdf-mark-qr-code-element');
const { PdfTextSection } = require('./pdf-text-section');

class PdfHelper {

	constructor() {

	}

	container() {
		return new PdfContainerDefinition.Initial();
	}

	mark() {
		return new PdfMark();
	}

	textElement() {
		return new PdfMarkTextElement();
	}

	imageElement() {
		return new PdfMarkImageElement();
	}

	qrCodeElement() {
		return new PdfMarkQRCodeElement();
	}

	textSection(text) {
		text = text || null;
		return new PdfTextSection(text);
	}
}

exports.PdfHelper = PdfHelper;