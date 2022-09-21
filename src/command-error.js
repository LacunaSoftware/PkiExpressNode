"use strict";

class CommandError extends Error {
	constructor(code, message, innerError = null) {
		super(message);

		this._name = this.constructor.name;
		this._code = code;
		this._innerError = innerError;

		// Build stack trace.
		Error.captureStackTrace(this, this.constructor);
		if (innerError && innerError.stack) {
			this.stack += "\n";
			this.stack += innerError.stack;
		}
	}

	// region "name" Accessors

	getName() {
		return this._name;
	}

	get name() {
		return this._name;
	}

	setName(value) {
		this._name = value;
	}

	set name(value) {
		this._name = value;
	}

	// endregion

	// region "code" Accessors

	getCode() {
		return this._code;
	}

	get code() {
		return this._code;
	}

	setCode(value) {
		this._code = value;
	}

	set code(value) {
		this._code = value;
	}

	// endregion

	// region "innerError" Accessors

	getInnerError() {
		return this._innerError;
	}

	get innerError() {
		return this._innerError;
	}

	setInnerError(value) {
		this._innerError = value;
	}

	set innerError(value) {
		this._innerError = value;
	}

	// endregion
}

exports.CommandError = CommandError;
