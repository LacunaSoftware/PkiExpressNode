'use strict';

/** Class representing the result of the get-service-auth-custom-state command */
class GetServiceAuthResult {
     /**
     * Creates a GetServiceAuthResult from model.
     * @param {object} model the model received from PKI Express
     */
	constructor(model) {
		this._customState = model['customState'];
	}
     /**
     * Gets the custom state value
     * @returns {string} the customState value
     */
	 get customState() { return this._customState; }
}

exports.GetServiceAuthResult = GetServiceAuthResult;
