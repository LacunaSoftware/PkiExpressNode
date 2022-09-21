"use strict";

class TrustServiceNameModel {
	constructor(model) {
		this._name = model["name"];
	}
	get name() {
		return this._name;
	}
}

exports.TrustServiceNameModel = TrustServiceNameModel;
