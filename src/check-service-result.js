"use strict";

class CheckServiceResult {
	constructor(model) {
		this._userHasCertificates = model["userHasCertificates"];
	}
	get userHasCertificates() {
		return this._userHasCertificates;
	}
}

exports.CheckServiceResult = CheckServiceResult;
