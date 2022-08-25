'use strict';

/**
 *Create the Service State
 @param {string} state
 */
class GetServiceAuthResult {
	constructor(model) {
		this.customState = model['customState'];
	}
}

exports.GetServiceAuthResult = GetServiceAuthResult;
