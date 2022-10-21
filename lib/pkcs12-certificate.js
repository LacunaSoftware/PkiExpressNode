"use strict";
const fs = require("fs");

class Pkcs12Certificate {
	constructor({ pfx }) {
		this._content = null;
		if (pfx) {
			this._content = Buffer.from(pfx, "base64");
		}
	}

	//region "contentRaw" Accessors

	getContentRaw() {
		return this._content;
	}

	get contentRaw() {
		return this._content;
	}

	setContentRaw(value) {
		this._content = value;
	}

	set contentRaw(value) {
		this._content = value;
	}

	//endregion

	//region "contentBase64" Accessors

	getContentBase64() {
		if (!this._content) {
			return null;
		}
		return Buffer.from(this._content).toString("base64");
	}

	get contentBase64() {
		if (!this._content) {
			return null;
		}
		return Buffer.from(this._content).toString("base64");
	}

	setContentBase64(value) {
		let raw = null;
		try {
			raw = Buffer.from(value, "base64");
		} catch (err) {
			throw new Error("The provided PFX content is not Base64-encoded");
		}

		this._content = raw;
	}

	set contentBase64(value) {
		let raw = null;
		try {
			raw = Buffer.from(value, "base64");
		} catch (err) {
			throw new Error("The provided PFX content is not Base64-encoded");
		}

		this._content = raw;
	}

	//endregion

	writeToFile(path) {
		return new Promise((resolve) => {
			fs.writeFile(path, this._content, (err) => {
				if (err) {
					throw new Error(
						`The provided PDF file could not been stored: ${err}`
					);
				}
				resolve();
			});
		});
	}

	writeToFileSync(path) {
		fs.writeFileSync(path, this._content);
	}
}

exports.Pkcs12Certificate = Pkcs12Certificate;
