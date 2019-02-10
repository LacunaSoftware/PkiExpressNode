'use strict';

class CommandError extends Error {
	constructor(code, message, innerError = null) {
		super(message);

		this._code = code;

		// Build stack trace.
		Error.captureStackTrace(this, this.constructor);
		if (innerError && innerError.stack) {
			this.stack += '\n';
			this.stack += innerError.stack;
		}
	}

	// region Getters "code" field

	get code() {
		return this._code;
	}

	getCode() {
		return this._code;
	}

	// endregion

	// region Setters "code" field

	set code(value) {
		this._code = value;
	}

	setCode(value) {
		this._code = value;
	}

	// endregion
}

exports.CommandError = CommandError;
