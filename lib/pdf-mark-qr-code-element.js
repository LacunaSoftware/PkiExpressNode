'use strict';

const { PdfMarkElement } = require('./pdf-mark-element');
const { PdfMarkElementType } = require('./pdf-mark-element-type');

class PdfMarkQRCodeElement extends PdfMarkElement {

	constructor(relativeContainer, qrCodeData) {
		qrCodeData = qrCodeData || null;
		relativeContainer = relativeContainer || null;
		super(PdfMarkElementType.QR_CODE, relativeContainer);

		this._qrCodeData = qrCodeData;
		this._drawQuietZones = false;
	}

	get qrCodeData() {
		return this._qrCodeData;
	}

	set qrCodeData(value) {
		this._qrCodeData = value;
	}

	// region Fluent API

	withQRCodeData(qrCodeData) {
		this._qrCodeData = qrCodeData;
		return this;
	}

	drawQuietZones() {
		this._drawQuietZones = true;
		return this;
	}

	// endregion

	toModel() {
		let model = super.toModel();
		model['qrCodeData'] = this._qrCodeData;
		model['qrCodeDrawQuietZones'] = this._drawQuietZones;
		return model;
	}

}

exports.PdfMarkQRCodeElement = PdfMarkQRCodeElement;