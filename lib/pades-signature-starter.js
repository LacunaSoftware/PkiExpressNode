'use strict';
const fs = require('fs');
const path = require('path');

const { PkiExpressConfig } = require('./pkiexpress-config');
const { SignatureStarter } = require('./signature-starter');
const { Command } = require('./command');

class PadesSignatureStarter extends SignatureStarter {

	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);

		this._pdfToSignPath = null;
		this._vrJsonPath = null;
	}

	// region setPdfToSignFromPath

	setPdfToSignFromPath(pdfPath) {
		return new Promise((resolve, reject) => {
			fs.access(pdfPath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided PDF to be signed was not found'));
				}
				this._pdfToSignPath = pdfPath;
				resolve();
			});
		});
	}

	setPdfToSignFromPathSync(pdfPath) {
		if (!fs.existsSync(pdfPath)) {
			throw new Error('The provided PDF to be signed was not found');
		}

		this._pdfToSignPath = pdfPath;
	}

	// endregion

	// region setPdfToSignFromRaw

	setPdfToSignFromRaw(contentRaw) {
		return new Promise((resolve, reject) => {
			this._createTempFile()
			.then((tempFilePath) => {
				fs.writeFile(tempFilePath, contentRaw, (err) => {
					if (err) {
						reject(new Error(`The provided content could not been stored: ${err}`));
					}
					this._pdfToSignPath = tempFilePath;
					resolve();
				});
			})
			.catch((err) => reject(err));
		});
	}

	setPdfToSignFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._pdfToSignPath = tempFilePath;
	}

	// endregion

	// region setPdfToSignFromBase64

	setPdfToSignFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				reject(new Error('The provided PDF to be signed was not found'));
				return;
			}

			this.setPdfToSignFromRaw(raw)
			.then(() => resolve())
			.catch((err) => reject(err));
		});
	}

	setPdfToSignFromBase64Sync(contentBase64) {

		let raw = null;
		try {
			raw = Buffer.from(contentBase64, 'base64');
		} catch (err) {
			throw new Error('The provided PDF to be signed was not found');
		}

		this.setPdfToSignFromRawSync(raw);
	}

	// endregion

	// region setVisualRepresentationFile

	setVisualRepresentationFile(vrPath) {
		return new Promise((resolve, reject) => {

			fs.access(vrPath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided visual representation file was not found'));
				}
				this._vrJsonPath = vrPath;
				resolve();
			});
		});
	}

	setVisualRepresentationFileSync(vrPath) {
		if (!fs.existsSync(vrPath)) {
			throw new Error('The provided visual representation file was not found');
		}

		this._vrJsonPath = vrPath;
	}

	// endregion

	// region setVisualRepresentation

	setVisualRepresentation(representation) {
		let jsonStr = JSON.stringify(representation);
		return new Promise((resolve, reject) => {

			this._createTempFile()
			.then((tempFilePath) => {
				fs.writeFile(tempFilePath, jsonStr, (err) => {
					if (err) {
						reject(new Error(`The provided content could not been stored: ${err}`));
					}
					this._vrJsonPath = tempFilePath;
					resolve();
				});
			})
			.catch((err) => reject(err));
		});
	}

	setVisualRepresentationSync(representation) {
		let jsonStr = JSON.stringify(representation);
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, jsonStr);
		this._vrJsonPath = tempFilePath;
	}

	// endregion

	start() {
		if (!this._pdfToSignPath) {
			throw new Error('The PDF to be signed was not set');
		}

		if (!this._certificatePath) {
			throw new Error('The certificate was not set');
		}

		return new Promise((resolve, reject) => {

			// Generate transfer file
			PadesSignatureStarter._getTransferFileName()
			.then((transferFile) => {

				let args = [
					this._pdfToSignPath,
					this._certificatePath,
					path.join(this._config.transferDataFolder, transferFile)
				];

				// Verify and add common options between signers
				this._verifyAndAddCommonOption(args);

				if (this._vrJsonPath) {
					args.push('--visual-rep');
					args.push(this._vrJsonPath);
				}

				// Invoke command with plain text output (to support PKI Express < 1.3)
				this._invokePlain(Command.START_PADES, args)
				.then((response) => resolve(SignatureStarter._getResult(response, transferFile)))
				.catch((err) => reject(err));

			})
			.catch((err) => reject(err));
		});
	}
}

exports.PadesSignatureStarter = PadesSignatureStarter;