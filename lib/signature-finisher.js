'use strict';
const fs = require('fs');
const path = require('path');

const { PkiExpressOperator } = require('./pkiexpress-operador');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { Command } = require('./command');

class SignatureFinisher extends PkiExpressOperator {

	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);

		this._fileToSignPath = null;
		this._transferFilePath = null;
		this._dataFilePath = null;
		this._outputFilePath = null;
		this._signature = null;
	}

	// region setFileToSignFromPath

	setFileToSignFromPath(filePath) {
		return new Promise((resolve, reject) => {

			fs.access(filePath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided file to be signed was not found'));
					return;
				}
				this._fileToSignPath = filePath;
				resolve();
			});
		});
	}

	setFileToSignFromPathSync(filePath) {
		if (!fs.existsSync(filePath)) {
			throw new Error('The provided file to be signed was not found');
		}

		this._fileToSignPath = filePath;
	}

	// endregion

	// region setFileToSignFromRaw

	setFileToSignFromRaw(contentRaw) {
		return new Promise((resolve, reject) => {
			this._createTempFile()
				.then((tempFilePath) => {
					fs.writeFile(tempFilePath, contentRaw, (err) => {
						if (err) {
							reject(new Error(`The provided content could not been stored: ${err}`));
							return;
						}
						this._fileToSignPath = tempFilePath;
						resolve();
					});
				})
				.catch((err) => reject(err));
		});
	}

	setFileToSignFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._fileToSignPath = tempFilePath;
	}

	// endregion

	// region setFileToSignFromBase64

	setFileToSignFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				reject(new Error('The provided file to be signed was not Base64-encoded'));
				return;
			}

			this.setFileToSignFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	setFileToSignFromBase64Sync(contentBase64) {

		let raw = null;
		try {
			raw = Buffer.from(contentBase64, 'base64');
		} catch (err) {
			throw new Error('The provided file to be signed was not Base64-encoded');
		}

		this.setFileToSignFromRawSync(raw);
	}

	// endregion

	// region setTransferFileFromPath

	setTransferFileFromPath(file) {
		return new Promise((resolve, reject) => {

			let transferPath = path.join(this._config.transferDataFolder, file);
			fs.access(transferPath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided transfer file was not found'));
					return;
				}
				this._transferFilePath = file;
				resolve();
			});
		});
	}

	setTransferFileFromPathSync(file) {

		let transferPath = path.join(this._config.transferDataFolder, file);
		if (!fs.existsSync(transferPath)) {
			throw new Error('The provided transfer file was not found');
		}

		this._transferFilePath = file;
	}

	// endregion

	// region setTransferFileFromRaw

	setTransferFileFromRaw(contentRaw) {

		return new Promise((resolve, reject) => {
			this._createTempFile()
				.then((tempFilePath) => {
					fs.writeFile(tempFilePath, contentRaw, (err) => {
						if (err) {
							reject(new Error(`The provided content could not been stored: ${err}`));
							return;
						}
						this._transferFilePath = tempFilePath;
						resolve();
					});
				})
				.catch((err) => reject(err));
		});
	}

	setTransferFileFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._transferFilePath = tempFilePath;
	}

	// endregion

	// region setTransferFileFromBase64

	setTransferFileFromBase64(contentBase64) {

		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				reject(new Error('The provided transfer file was not Base64-encoded'));
				return;
			}

			this.setTransferFileFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	setTransferFileFromBase64Sync(contentBase64) {

		let raw = null;
		try {
			raw = Buffer.from(contentBase64, 'base64');
		} catch (err) {
			throw new Error('The provided transfer file was not Base64-encoded');
		}

		this.setTransferFileFromRawSync(raw);
	}

	// endregion

	// region setDataFileFromPath

	setDataFileFromPath(dataFilePath) {
		return new Promise((resolve, reject) => {

			fs.access(dataFilePath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided data file was not found'));
					return;
				}
				this._dataFilePath = dataFilePath;
				resolve();
			});
		});
	}

	setDataFileFromPathSync(dataFilePath) {
		if (!fs.existsSync(dataFilePath)) {
			throw new Error('The provided data file was not found');
		}

		this._dataFilePath = dataFilePath;
	}

	// endregion

	// region setDataFileFromRaw

	setDataFileFromRaw(contentRaw) {
		return new Promise((resolve, reject) => {
			this._createTempFile()
				.then((tempFilePath) => {
					fs.writeFile(tempFilePath, contentRaw, (err) => {
						if (err) {
							reject(new Error(`The provided content could not been stored: ${err}`));
							return;
						}
						this._dataFilePath = tempFilePath;
						resolve();
					});
				})
				.catch((err) => reject(err));
		});
	}

	setDataFileFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._dataFilePath = tempFilePath;
	}

	// endregion

	// region setDataFileFromBase64

	setDataFileFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				reject(new Error('The provided data file was not Base64-encoded'));
				return;
			}

			this.setDataFileFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	setDataFileFromBase64Sync(contentBase64) {

		let raw = null;
		try {
			raw = Buffer.from(contentBase64, 'base64');
		} catch (err) {
			throw new Error('The provided data file was not Base64-encoded');
		}

		this.setDataFileFromRawSync(raw);
	}

	// endregion

	get signature() {
		return this._signature;
	}

	set signature(value) {
		try {
			Buffer.from(value, 'base64');
			this._signature = value;
		} catch (err) {
			throw new Error('The provided signature was not valid');
		}
	}

	get outputFile() {
		return this._outputFilePath;
	}

	set outputFile(value) {
		this._outputFilePath = value;
	}

	complete() {
		if (!this._fileToSignPath) {
			throw new Error('The file to be signed was not set');
		}

		if (!this._transferFilePath) {
			throw new Error('The transfer file was not set');
		}

		if (!this._signature) {
			throw new Error('The signature was not set');
		}

		if (!this._outputFilePath) {
			throw new Error('The output destination was not set');
		}

		let args = [
			this._fileToSignPath,
			path.join(this._config.transferDataFolder, this._transferFilePath),
			this._signature,
			this._outputFilePath
		];

		if (this._dataFilePath) {
			args.push('--data-file');
			args.push(this._dataFilePath);
		}

		// Invoke command with plain text output (to support PKI Express < 1.3)
		return this._invokePlain(Command.COMPLETE_SIG, args);
	}
}

exports.SignatureFinisher = SignatureFinisher;