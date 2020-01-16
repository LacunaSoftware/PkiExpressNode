'use strict';
const fs = require('fs');
const { VersionManager } = require('./version-manager');

const { Signer } = require('./signer');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { Command } = require('./command');
const { PKCertificate } = require('./pk-certificate');

class CadesSigner extends Signer {
	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);

		this._fileToSignPath = null;
		this._dataFilePath = null;
		this._encapsulatedContent = true;
		this._outputFilePath = null;
		this._versionManager = new VersionManager();
	}

	// region setFileToSign
	
	setFileToSignFromPath(path) {
		return new Promise((resolve, reject) => {
			fs.access(path, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided file to be signed was not found'));
					return;
				}
				this._fileToSignPath = path;
				resolve();
			});
		});
	}

	setFileToSignFromPathSync(path){
		if (!fs.existsSync(path)){
			throw new Error('The provided file to be signed was not found');
		}
		this._fileToSignPath = path;
	}

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

	setFileToSignFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				throw new Error('The provided file to be signed is not Base64-encoded');
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
			throw new Error('The provided file to be signed is not Base64-encoded');
		}

		this.setFileToSignFromRawSync(raw);
	}

	// region setDataFile
	setDataFileFromPath(path) {
		return new Promise((resolve, reject) => {
			fs.access(path, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided data file was not found'));
					return;
				}
				this._dataFilePath = path;
				resolve();
			});
		});
	}

	setDataFileFromPathSync(path){
		if (!fs.existsSync(path)){
			throw new Error('The provided data file was not found');
		}
		this._dataFilePath = path;
	}

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

	setDataFileFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				throw new Error('The provided data file is not Base64-encoded');
			}

			this.setFileToSignFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	setDataFileFromBase64Sync(contentBase64) {

		let raw = null;
		try {
			raw = Buffer.from(contentBase64, 'base64');
		} catch (err) {
			throw new Error('The provided data file is not Base64-encoded');
		}

		this.setFileToSignFromRawSync(raw);
	}

	// region setOutputFilePath

	setOutputFilePath(path){
		this._outputFilePath = path;
	}

	set outputFilePath(path){
		this._outputFilePath = path;
	}

	// endregion

	sign(getCert){
		getCert = getCert || false;

		if (!this._fileToSignPath) {
			throw new Error('The file to be signed was not set');
		}

		if (!this._outputFilePath) {
			throw new Error('The output destination was not set');
		}

		let args = [this._fileToSignPath, this._outputFilePath];
		
		// Verify and add common option between signers.
		this._verifyAndAddCommonOption(args);

		if (this._dataFilePath) {
			args.push('--data-file');
			args.push(this._dataFilePath);
		}
		if(!this._encapsulatedContent){
			args.push('--detached');
		}

		if (getCert){
			// This operation can only be used on version greater than 1.8 of the
			// PKI Express.
			this._versionManager.requireVersion('1.8');

			// Invoke command.
			return new Promise((resolve, reject) => {
				this._invoke(Command.SIGN_CADES, args)
					.then(response => {
						// Parse output and return model.
						let output = Signer._parseOutput(response[0]);
						let result = new PKCertificate(output['signer']);
						resolve(result);
					})
					.catch(err => reject(err));
			});

		} else {
			// Invoke command with plain text output (to support PKI Express < 1.3)
			return this._invokePlain(Command.SIGN_CADES, args);
		}
	}
}
exports.CadessSigner = CadesSigner;