'use strict';
const fs = require('fs');

const { BaseSigner } = require('./base-signer');
const { PkiExpressConfig } = require('./pkiexpress-config');

class Signer extends BaseSigner {

	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);
		this._outputFilePath = null;
		this._pkcs12Path = null;
		this._certThumb = null;
		this._certPassword = null;
	}

	// region setPkcs12FromPath

	setPkcs12FromPath(pkcs12Path) {

		return new Promise((resolve, reject) => {

			fs.access(pkcs12Path, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided PKCS #12 certificate file was not found'));
				}
				this._pkcs12Path = pkcs12Path;
				resolve();
			});
		});
	}

	setPkcs12FromPathSync(pkcs12Path) {
		if (!fs.existsSync(pkcs12Path)) {
			throw new Error('The provided PKCS #12 certificate file was not found');
		}

		this._pkcs12Path = pkcs12Path;
	}

	// endregion

	// region setPkcs12FromRaw

	setPkcs12FromRaw(contentRaw) {

		return new Promise((resolve, reject) => {
			this._createTempFile()
			.then((tempFilePath) => {
				fs.writeFile(tempFilePath, contentRaw, (err) => {
					if (err) {
						reject(new Error(`The provided content could not been stored: ${err}`));
					}
					this._pkcs12Path = tempFilePath;
					resolve();
				});
			})
			.catch((err) => reject(err));
		});
	}

	setPkcs12FromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._pkcs12Path = tempFilePath;
	}

	// endregion

	// region setPkcs12FromBase64

	setPkcs12FromBase64(contentBase64) {

		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				reject(new Error('The provided certificate was not Base64-encoded'));
				return;
			}

			this.setPkcs12FromRaw(raw)
			.then(() => resolve())
			.catch((err) => reject(err));
		});
	}

	setPkcs12FromBase64Sync(contentBase64) {

		let raw = null;
		try {
			raw = Buffer.from(contentBase64, 'base64');
		} catch (err) {
			throw new Error('The provided certificate was not Base64-encoded');
		}

		this.setPkcs12FromRawSync(raw);
	}

	// endregion

	get pkcs12() {
		return this._pkcs12Path;
	}

	get outputFile() {
		return this._outputFilePath;
	}

	set outputFile(value) {
		this._outputFilePath = value;
	}

	get certThumb() {
		return this._certThumb;
	}

	set certThumb(value) {
		this._certThumb = value;
	}

	get certPassword() {
		return this._certPassword;
	}

	set certPassword(value) {
		this._certPassword = value;
	}

	_verifyAndAddCommonOption(args) {

		// Verify and add common options between signers and signature starters.
		super._verifyAndAddCommonOption(args);

		if (!this._certThumb && !this._pkcs12Path) {
			throw new Error('The certificate\'s thumbprint and the PKCS #12 were not set');
		}

		if (this._certThumb) {
			args.push('--thumbprint');
			args.push(this._certThumb);

			// This operation can only be used on versions greater than 1.3 of the
			// PKI Express.
			this._versionManager.requireVersion('1.3');
		}

		if (this._pkcs12Path) {
			args.push('--pkcs12');
			args.push(this._pkcs12Path);

			// This operation can only be used on versions greater than 1.3 of the
			// PKI Express.
			this._versionManager.requireVersion('1.3');
		}

		if (this._certPassword) {
			args.push('--password');
			args.push(this._certPassword);

			// This operation can only be used on versions greater than 1.3 of the
			// PKI Express.
			this._versionManager.requireVersion('1.3');
		}
	}
}

exports.Signer = Signer;