'use strict';
const { CommandError } = require('./command-error');
const { ErrorCodes } = require('./error-codes');

class ValidationError extends CommandError {

	constructor(validationResults, innerError = null) {
		super(ErrorCodes.VALIDATION_FAILED, validationResults, innerError);
	}
}

exports.ValidationError = ValidationError;