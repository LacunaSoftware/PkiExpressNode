"use strict";

const { TrustServiceNameModel } = require("./trust-service-name-model.js");

class TrustServiceSessionResult {
	constructor(model) {
		this._session = model["session"];
		this._customState = model["customState"];
		this._sessionType = model["type"];
		if (model["service"]) {
			this._service = new TrustServiceNameModel(model["service"]);
		}
		if (model["expiresOn"]) {
			this._expiresOn = new Date(model["expiresOn"]);
		}
	}
	get session() {
		return this._session;
	}
	get customState() {
		return this._customState;
	}
	get sessionType() {
		return this._sessionType;
	}
	get service() {
		return this._service;
	}
	get expiresOn() {
		return this._expiresOn;
	}
}

exports.TrustServiceSessionResult = TrustServiceSessionResult;
