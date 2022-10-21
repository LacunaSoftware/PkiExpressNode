"use strict";
const { SignatureAlgorithm } = require("./pk-algorithms");

class SignatureAlgorithmAndValue {
	constructor(model) {
		this._algorithm = SignatureAlgorithm.getInstanceByApiModel(
			model["algorithmIdentifier"]
		);
		this._value = Buffer.from(model["value"], "base64");
	}

	get algorithm() {
		return this._algorithm;
	}

	set algorithm(value) {
		this._algorithm = value;
	}

	get value() {
		return this._value;
	}

	set value(value) {
		this._value = value;
	}
}

exports.SignatureAlgorithmAndValue = SignatureAlgorithmAndValue;
