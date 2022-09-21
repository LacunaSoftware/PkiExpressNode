"use strict";
const { DigestAlgorithmAndValue } = require("./digest-algorithm-and-value");

class SignaturePolicyIdentifier {
	constructor(model) {
		this._digest = new DigestAlgorithmAndValue(model["digest"]);
		this._oid = model["oid"];
		this._uri = model["uri"];
	}

	get digest() {
		return this._digest;
	}

	set digest(value) {
		this._digest = value;
	}

	get oid() {
		return this._oid;
	}

	set oid(value) {
		this._oid = value;
	}

	get uri() {
		return this._uri;
	}

	set uri(value) {
		this._uri = value;
	}
}

exports.SignaturePolicyIdentifier = SignaturePolicyIdentifier;
