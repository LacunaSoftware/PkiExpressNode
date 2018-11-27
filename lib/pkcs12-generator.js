'use strict';
const fs = require('fs');

const { Command } = require('./command');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { PkiExpressOperator } = require('./pkiexpress-operador');
const { Pkcs12Certificate } = require('./pkcs12-certificate');

class Pkcs12Generator extends PkiExpressOperator {

	constructor({key, certFilePath, password, config} = {}) {
		config = config || new PkiExpressConfig();
		super(config);

		this._key = key || null;
		this._certFilePath = certFilePath || null;
		this._password = password || null;
	}

	//region "key" Accessors

	getKey() {
		return this._key;
	}

	get key() {
		return this._key;
	}

	setKey(value) {
		this._key = value;
	}

	set key(value) {
		this._key = value;
	}

	//endregion

	//region "password" Accessors

	getPassword() {
		return this._password;
	}

	get password() {
		return this._password;
	}

	setPassword(value) {
		this._password = value;
	}

	set password(value) {
		this._password = value;
	}

	//endregion

	//region "certFilePath" Accessors

	getCertFilePath() {
		return this._certFilePath;
	}

	get certFilePath() {
		return this._certFilePath;
	}

	//endregion

	//region setCertFileFromPath

	setCertFileFromPath(path) {
		return new Promise(resolve => {
			fs.access(path, fs.constants.F_OK, (err) => {
				if (err) {
					throw new Error(`The provided certificate file was not found: ${err}`);
				}
				this._certFilePath = path;
				resolve();
			});
		});
	}

	setCertFileFromPathSync(path) {
		if (!fs.existsSync(path)) {
			throw new Error('The provided certificate file was not found');
		}
		this._certFilePath = path;
	}

	//endregion

	//region setCertFileFromRaw

	setCertFileFromRaw(contentRaw) {
		return new Promise((resolve, reject) => {
			this._createTempFile()
				.then(tempFilePath => {
					fs.writeFile(tempFilePath, contentRaw, (err) => {
						if (err) {
							throw new Error(`The provided content could not been stored: ${err}`);
						}
						this._certFilePath = tempFilePath;
						resolve();
					});
				})
				.catch(err => reject(err));
		});
	}

	setCertFileFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._certFilePath = tempFilePath;
	}

	//endregion

	//region setCertFileFromBase64

	setCertFileFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {
			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				throw new Error(`The provided certificate file is not Base64-encoded: ${err}`);
			}

			this.setCertFileFromRaw(raw)
				.then(() => resolve())
				.catch(err => reject(err));
		});
	}

	setCertFileFromBase64Sync(contentBase64) {
		let raw = null;
		try {
			raw = Buffer.from(contentBase64, 'base64');
		} catch (err) {
			throw new Error(`The provided certificate file is not Base64-encoded: ${err}`);
		}
		this.setCertFileFromRawSync(raw);
	}

	//endregion

	generate(password) {
		password = password || this._password;
		return new Promise((resolve, reject) => {

			if (!this._key) {
				throw new Error('The generated key was not set');
			}

			if (!this._certFilePath) {
				throw new Error('The certificate file was not set');
			}

			let args = [ this._key, this._certFilePath ];

			if (password) {
				args.push('--password');
				args.push(password);
			}

			// This operation can only be used on version greater then 1.11 of the
			// PKI Express.
			//this._versionManager.requireVersion('1.11');

			// Invoke command.
			this._invoke(Command.CREATE_PFX, args)
				.then(response => {
					let output = Pkcs12Generator._parseOutput(response[0]);
					let result = new Pkcs12GenerationResult(output);
					resolve(result);
				})
				.catch(err => reject(err));
		});
	}
}

class Pkcs12GenerationResult {

	constructor({ pfx }) {
		this._pfx = null;

		if (pfx) {
			this._pfx = new Pkcs12Certificate({ pfx });
		}
	}

	//region "pfx" Accessors

	getPfx() {
		return this._pfx;
	}

	get pfx() {
		return this._pfx;
	}

	setPfx(value) {
		this._pfx = value;
	}

	set pfx(value) {
		this._pfx = value;
	}

	//endregion
}

exports.Pkcs12GenerationResult = Pkcs12GenerationResult;
exports.Pkcs12Generator = Pkcs12Generator;