"use strict";

class AuthStartResult {
	constructor(model) {
		this.nonce = model["toSignData"];
		this.digestAlgorithm = model["digestAlgorithmName"];
		this.digestAlgorithmOid = model["digestAlgorithmOid"];
	}
}

exports.AuthStartResult = AuthStartResult;
