'use strict';

const { TrustServiceAuthParameters } = require('./trust-service-auth-parameters.js');
/** Class representing the result of the start-service-auth command */
class StartServiceAuthResult {
	constructor(model) {
			this._authParameters = [];
		if (model['authParameters']) {
			for (let param of model['authParameters']) {
				this._authParameters.push(new TrustServiceAuthParameters(param));
			}
		}
	}

	/**
 	 * Gets the auth parameters
	 * @returns {string} the authParameters value
 	 */
	get authParameters(){
		return this._authParameters;
	}
}

exports.StartServiceAuthResult = StartServiceAuthResult;
