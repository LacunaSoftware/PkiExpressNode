"use strict";

const { TrustServiceInfo } = require("./trust-service-info.js");

class TrustServiceAuthParameters {
	constructor(model) {
		this._authUrl = model["authUrl"];

		if (model["serviceInfo"]) {
			this._serviceInfo = new TrustServiceInfo(model["serviceInfo"]);
		}
	}
	get authUrl() {
		return this._authUrl;
	}
	get serviceInfo() {
		return this._serviceInfo;
	}
}

exports.TrustServiceAuthParameters = TrustServiceAuthParameters;
