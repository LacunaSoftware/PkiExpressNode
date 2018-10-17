'use strict';
const fs = require('fs');

const { BaseSigner } = require('./base-signer');
const { PkiExpressConfig } = require('./pkiexpress-config');

class SignatureStarter extends BaseSigner {

	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);
		this._certificatePath = null;
	}

	// region setCertificateFromPath

	setCertificateFromPath(certificatePath) {

		return new Promise((resolve, reject) => {

			fs.access(certificatePath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided certificate was not found'));
					return;
				}
				this._certificatePath = certificatePath;
				resolve();
			});
		});
	}

	setCertificateFromPathSync(certificatePath) {
		if (!fs.existsSync(certificatePath)) {
			throw new Error('The provided certificate was not found');
		}

		this._certificatePath = certificatePath;
	}

	// endregion

	// region setCertificateFromRaw

	setCertificateFromRaw(contentRaw) {
		return new Promise((resolve, reject) => {

			this._createTempFile()
				.then((tempFilePath) => {
					fs.writeFile(tempFilePath, contentRaw, (err) => {
						if (err) {
							reject(new Error(`The provided content could not been stored: ${err}`));
							return;
						}
						this._certificatePath = tempFilePath;
						resolve();
					});
				})
				.catch((err) => reject(err));
		});
	}

	setCertificateFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._certificatePath = tempFilePath;
	}

	// endregion

	// region setCertificateFromBase64

	setCertificateFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				reject(new Error('The provided certificate was not Base64-encoded'));
				return;
			}

			this.setCertificateFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	setCertificateFromBase64Sync(contentBase64) {

		try {
			let raw = Buffer.from(contentBase64, 'base64');
			this.setCertificateFromRawSync(raw);
		} catch (err) {
			throw new Error('The provided certificate was not Base64-encoded');
		}
	}

	// endregion

	static _getResult(response, transferFile) {
		return {
			toSignHash: response[0],
			digestAlgorithm: response[1],
			digestAlgorithmOid: response[2],
			transferFile: transferFile
		};
	}

	start() {
		throw new Error('This method should be implemented');
	}
}

exports.SignatureStarter = SignatureStarter;