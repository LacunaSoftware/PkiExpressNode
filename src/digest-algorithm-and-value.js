"use strict";
const { DigestAlgorithm } = require("./digest-algorithm");

class DigestAlgorithmAndValue {
	constructor(model) {
		if (!model["algorithm"]) {
			throw new Error("The algorithm was not set");
		}

		if (!model["value"]) {
			throw new Error("The value was not set");
		}

		this._algorithm = DigestAlgorithm.getInstanceByApiModel(
			model["algorithm"]
		);
		this._value = new Buffer(model["value"], "base64");
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

	get hexValue() {
		return this._value.toString("hex");
	}

	set hexValue(value) {
		this._value = new Buffer(value, "hex");
	}

	toModel() {
		return {
			algorithm: this._algorithm.apiModel,
			value: this._value,
		};
	}
}

exports.DigestAlgorithmAndValue = DigestAlgorithmAndValue;
