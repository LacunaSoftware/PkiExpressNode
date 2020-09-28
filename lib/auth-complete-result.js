'use strict';
const { PKCertificate } = require('./pk-certificate');
const { ValidationResults } = require('./validation');

class AuthCompleteResult {
	constructor(model) {
		if (model['certificate']){
			this.certificate = new PKCertificate(model['certificate']);
		}
		if (model['validationResults']){
			this.validationResults = new ValidationResults(model['validationResults']);
		}
	}
}

exports.AuthCompleteResult = AuthCompleteResult;