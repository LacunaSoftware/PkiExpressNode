'use strict';

const { TrustServiceAuthParameters } = require('./trust-service-auth-parameters.js');

class StartServiceAuthResult {
	constructor(model) {
			this._authParameters = [];
		if (model['authParameters']) {
			for (let param of model['authParameters']) {
				this._authParameters.push(new TrustServiceAuthParameters(param));
			}
		}
	}


	get authParameters(){
		return this._authParameters;
	}
}

exports.StartServiceAuthResult = StartServiceAuthResult;
