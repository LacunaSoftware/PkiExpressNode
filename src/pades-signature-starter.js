"use strict";
const fs = require("fs");
const path = require("path");

const { PkiExpressConfig } = require("./pkiexpress-config");
const { SignatureStarter } = require("./signature-starter");
const { Command } = require("./command");

class PadesSignatureStarter extends SignatureStarter {
	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);

		this._pdfToSignPath = null;
		this._vrJsonPath = null;
		this._customSignatureFieldName = null;
		this._suppressDefaultVisualRep = false;
		this._certificationLevel = null;
		this._reason = null;
	}

	// region setPdfToSignFromPath

	setPdfToSignFromPath(pdfPath) {
		return new Promise((resolve, reject) => {
			fs.access(pdfPath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(
						new Error("The provided PDF to be signed was not found")
					);
					return;
				}
				this._pdfToSignPath = pdfPath;
				resolve();
			});
		});
	}

	setPdfToSignFromPathSync(pdfPath) {
		if (!fs.existsSync(pdfPath)) {
			throw new Error("The provided PDF to be signed was not found");
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
							reject(
								new Error(
									`The provided content could not been stored: ${err}`
								)
							);
							return;
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
				raw = Buffer.from(contentBase64, "base64");
			} catch (err) {
				throw new Error(
					"The provided PDF to be signed is not Base64-encoded"
				);
			}

			this.setPdfToSignFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	setPdfToSignFromBase64Sync(contentBase64) {
		let raw = null;
		try {
			raw = Buffer.from(contentBase64, "base64");
		} catch (err) {
			throw new Error(
				"The provided PDF to be signed is not Base64-encoded"
			);
		}

		this.setPdfToSignFromRawSync(raw);
	}

	// endregion

	// region setVisualRepresentationFile

	setVisualRepresentationFile(vrPath) {
		return new Promise((resolve, reject) => {
			fs.access(vrPath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(
						new Error(
							"The provided visual representation file was not found"
						)
					);
					return;
				}
				this._vrJsonPath = vrPath;
				resolve();
			});
		});
	}

	setVisualRepresentationFileSync(vrPath) {
		if (!fs.existsSync(vrPath)) {
			throw new Error(
				"The provided visual representation file was not found"
			);
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
							reject(
								new Error(
									`The provided content could not been stored: ${err}`
								)
							);
							return;
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

	get customSignatureFieldName() {
		return this._customSignatureFieldName;
	}

	set customSignatureFieldName(value) {
		this._customSignatureFieldName = value;
	}

	get certificationLevel() {
		return this._certificationLevel;
	}

	set certificationLevel(value) {
		this._certificationLevel = value;
	}

	get reason() {
		return this._reason;
	}

	set reason(value) {
		this._reason = value;
	}

	get suppressDefaultVisualRep() {
		return this._suppressDefaultVisualRep;
	}

	set suppressDefaultVisualRep(value) {
		return (this._suppressDefaultVisualRep = value);
	}

	start() {
		if (!this._pdfToSignPath) {
			throw new Error("The PDF to be signed was not set");
		}

		if (!this._certificatePath) {
			throw new Error("The certificate was not set");
		}

		return new Promise((resolve, reject) => {
			// Generate transfer file
			PadesSignatureStarter._getTransferFileName()
				.then((transferFile) => {
					let args = [
						this._pdfToSignPath,
						this._certificatePath,
						path.join(
							this._config.transferDataFolder,
							transferFile
						),
					];

					// Verify and add common options between signers
					this._verifyAndAddCommonOption(args);

					if (this._vrJsonPath) {
						args.push("--visual-rep");
						args.push(this._vrJsonPath);
					}

					if (this._customSignatureFieldName) {
						args.push("--custom-signature-field-name");
						args.push(this._customSignatureFieldName);

						// This operation can only be used on versions greater than 1.15 of
						// the PKI Express.
						this._versionManager.requireVersion("1.15");
					}

					if (this._reason) {
						args.push("--reason");
						args.push(this._reason);

						// This operation can only be used on versions greater than 1.13 of
						// the PKI Express.
						this._versionManager.requireVersion("1.13");
					}

					if (this._suppressDefaultVisualRep) {
						args.push("--suppress-default-visual-rep");

						// This operation can only be used on versions greater than 1.13.1 of
						// the PKI Express.
						this._versionManager.requireVersion("1.13.1");
					}

					if (this._certificationLevel) {
						args.push("--certification-level");
						args.push(this._certificationLevel);

						// This operation can only be used on versions greater than 1.16 of
						// the PKI Express.
						this._versionManager.requireVersion("1.16");
					}

					// Invoke command with plain text output (to support PKI Express < 1.3)
					this._invokePlain(Command.START_PADES, args)
						.then((response) =>
							resolve(
								SignatureStarter._getResult(
									response,
									transferFile
								)
							)
						)
						.catch((err) => reject(err));
				})
				.catch((err) => reject(err));
		});
	}
}

exports.PadesSignatureStarter = PadesSignatureStarter;
