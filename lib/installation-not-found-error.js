'use strict';

class InstallationNotFoundError extends Error {
	constructor(message, innerError = null) {
		super(message);

		// Build stack trace.
		Error.captureStackTrace(this, this.constructor);
		if (innerError && innerError.stack) {
			this.stack += '\n';
			this.stack += innerError.stack;
		}
	}
}

exports.InstallationNotFoundError = InstallationNotFoundError;