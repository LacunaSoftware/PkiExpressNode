'use strict';
/**
 *Create the Service State
 @param {string} state
 */
class GetServiceAuthResult {
	constructor(model) {
		this.state = model['customState'];
	}
}

exports.GetServiceAuthResult = GetServiceAuthResult;
