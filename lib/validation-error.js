'use strict';
const { CommandError } = require('./command-error');

class ValidationError extends CommandError {

	constructor(code, validationResults, innerError = null) {
		super(code, validationResults, innerError);
	}
}

exports.ValidationError = ValidationError;