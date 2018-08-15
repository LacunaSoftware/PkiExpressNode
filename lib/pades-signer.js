'use strict';
const fs = require('fs');

const { Signer } = require('./signer');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { Command } = require('./command');

class PadesSigner extends Signer {

	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);

		this._pdfToSignPath = null;
		this._vrJsonPath = null;
		this._overwriteOriginalFile = false;
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

	sign() {
		if (!this._pdfToSignPath) {
			throw new Error('The PDF to be signed was not set');
		}

		if (!this._overwriteOriginalFile && !this._outputFilePath) {
			throw new Error('The output destination was not set');
		}

		let args = [this._pdfToSignPath];

		// Logic to overwrite original file or use the output file.
		if (this._overwriteOriginalFile) {
			args.push('--overwrite');
		} else {
			args.push(this._outputFilePath);
		}

		// Verify and add common option between signers.
		this._verifyAndAddCommonOption(args);

		if (this._vrJsonPath) {
			args.push('--visual-rep');
			args.push(this._vrJsonPath);
		}

		// Invoke command with plain text output (to support PKI Express < 1.3)
		return this._invokePlain(Command.SIGN_PADES, args);
	}

	get overwriteOriginalFile() {
		return this._overwriteOriginalFile;
	}

	set overwriteOriginalFile(value) {
		this._overwriteOriginalFile = value;
	}
}

exports.PadesSigner = PadesSigner;