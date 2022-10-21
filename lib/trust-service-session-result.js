"use strict";

const { TrustServiceNameModel } = require("./trust-service-name-model.js");

/**
 * Represents the result of the trust service authentication process that is
 * returned by the completeAuth() method.
 */
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

	/**
	 * Gets the session data resulted by the trust service authentication
	 * @returns {string} the session data
	 */
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
