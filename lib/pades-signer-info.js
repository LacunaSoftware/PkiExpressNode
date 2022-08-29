"use strict";
const { CadesSignerInfo } = require("./cades-signature");

class PadesSignerInfo extends CadesSignerInfo {
	constructor(model) {
		super(model);
		this._isDocumentTimestamp = model["isDocumentTimestamp"];
		this._signatureFieldName = model["signatureFieldName"];
	}

	get isDocumentTimestamp() {
		return this._isDocumentTimestamp;
	}

	set isDocumentTimestamp(value) {
		this._isDocumentTimestamp = value;
	}

	get signatureFieldName() {
		return this._signatureFieldName;
	}

	set signatureFieldName(value) {
		this._signatureFieldName = value;
	}
}

exports.PadesSignerInfo = PadesSignerInfo;
