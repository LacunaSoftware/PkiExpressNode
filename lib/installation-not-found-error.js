'use strict';
const { CommandError } = require('./command-error');
const { ErrorCodes } = require('./error-codes');

class InstallationNotFoundError extends CommandError {

	constructor(message, innerError = null) {
		super(ErrorCodes.COMMAND_NOT_FOUND, message, innerError);
	}
}

exports.InstallationNotFoundError = InstallationNotFoundError;