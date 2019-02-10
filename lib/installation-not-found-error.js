'use strict';
const { CommandError } = require('./command-error');

class InstallationNotFoundError extends CommandError {
	constructor(code, message, innerError = null) {
		super(code, message, innerError);
	}
}

exports.InstallationNotFoundError = InstallationNotFoundError;