'use strict';

const { TrustServiceAuthParameters } = require('./trust-service-auth-parameters.js');
const { TrustServiceInfo } = require('./trust-service-info.js');

class DiscoverServicesResult {
	constructor(model) {
		this._services = [];
		if (model['services']) {
			for (let param of model['services']) {
				this._services.push(new TrustServiceInfo(param));
			}
		}

		this._authParameters = [];
		if (model['authParameters']) {
			for (let param of model['authParameters']) {
				this._authParameters.push(new TrustServiceAuthParameters(param));
			}
		}
	}

	get services(){
		return this._services;
	}
	get authParameters(){
		return this._authParameters;
	}
}

exports.DiscoverServicesResult = DiscoverServicesResult;