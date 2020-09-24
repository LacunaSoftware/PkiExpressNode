'use strict';

const { TrustServiceNameModel } = require('./trust-service-name-model.js');

class TrustServiceInfo {
	constructor(model) {
		this._provider = model['provider'];
		this._badgeUrl = model['badgeUrl'];
		if (model['service']) {
			this._service = new TrustServiceNameModel(model['service']);
		}
	}
	get provider(){
		return this._provider;
	}
	get badgeUrl(){
		return this._badgeUrl;
	}
	get service(){
		return this._service;
	}
}

exports.TrustServiceInfo = TrustServiceInfo;