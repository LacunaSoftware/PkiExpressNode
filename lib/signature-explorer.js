'use strict';
const fs = require('fs');

const { PkiExpressOperator } = require('./pkiexpress-operator');
const { PkiExpressConfig } = require('./pkiexpress-config');

class SignatureExplorer extends PkiExpressOperator {

	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);

		this._signatureFilePath = null;
		this._validate = null;
	}

	get signatureFile() {
		return this._signatureFilePath;
	}

	// region setSignatureFileFromPath

	setSignatureFileFromPath(path) {
		return new Promise((resolve, reject) => {
			fs.access(path, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided signature file was not found'));
					return;
				}
				this._signatureFilePath = path;
				resolve();
			});
		});
	}

	setSignatureFileFromPathSync(path) {
		if (!fs.existsSync(path)) {
			throw new Error('The provided signature file was not found');
		}
		this._signatureFilePath = path;
	}

	// endregion

	// region setSignatureFileFromRaw

	setSignatureFileFromRaw(contentRaw) {
		return new Promise((resolve, reject) => {
			this._createTempFile().then((tempFilePath) => {
				fs.writeFile(tempFilePath, contentRaw, (err) => {
					if (err) {
						reject(new Error(`The provided content could not been stored: ${err}`));
						return;
					}
					this._signatureFilePath = tempFilePath;
					resolve();
				});
			}).catch((err) => reject(err));
		});
	}

	setSignatureFileFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._signatureFilePath = tempFilePath;
	}

	// endregion

	// region setSignatureFileFromBase64

	setSignatureFileFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				reject(new Error('The provided signature file is not Base64-encoded'));
				return;
			}

			this.setSignatureFileFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	setSignatureFileFromBase64Sync(contentBase64) {

		let raw = null;
		try {
			raw = Buffer.from(contentBase64, 'base64');
		} catch (err) {
			throw new Error('The provided signature file is not Base64-encoded');
		}
		this.setSignatureFileFromRawSync(raw);
	}

	// endregion

	get validate() {
		return this._validate;
	}

	set validate(value) {
		this._validate = value;
	}

	_verifyAndAddCommonOption(args) {

		if (this._validate) {
			args.push('--validate');
		}
	}
}

exports.SignatureExplorer = SignatureExplorer;