"use strict";
const fs = require("fs");
const path = require("path");

const { PkiExpressConfig } = require("./pkiexpress-config");
const { SignatureStarter } = require("./signature-starter");
const { Command } = require("./command");

class XmlSignatureStarter extends SignatureStarter {
	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);

		this._xmlToSignPath = null;
		this._toSignElementId = null;
		this._signatureElementInsertion = null;
	}

	// region setXmlToSignFromPath

	setXmlToSignFromPath(xmlPath) {
		return new Promise((resolve, reject) => {
			fs.access(xmlPath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(
						new Error("The provided XML to be signed was not found")
					);
					return;
				}
				this._xmlToSignPath = xmlPath;
				resolve();
			});
		});
	}

	setXmlToSignFromPathSync(xmlPath) {
		if (!fs.existsSync(xmlPath)) {
			throw new Error("The provided XML to be signed was not found");
		}
		this._xmlToSignPath = xmlPath;
	}

	// endregion

	// region setXmlToSignFromRaw

	setXmlToSignFromRaw(contentRaw) {
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
						this._xmlToSignPath = tempFilePath;
						resolve();
					});
				})
				.catch((err) => reject(err));
		});
	}

	setXmlToSignFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._xmlToSignPath = tempFilePath;
	}

	// endregion

	// region setXmlToSignFromBase64

	setXmlToSignFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {
			let raw = null;
			try {
				raw = Buffer.from(contentBase64, "base64");
			} catch (err) {
				throw new Error(
					"The provided XML to be signed is not Base64-encoded"
				);
			}

			this.setXmlToSignFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	setXmlToSignFromBase64Sync(contentBase64) {
		let raw = null;
		try {
			raw = Buffer.from(contentBase64, "base64");
		} catch (err) {
			throw new Error(
				"The provided XML to be signed is not Base64-encoded"
			);
		}

		this.setXmlToSignFromRawSync(raw);
	}

	// endregion

	/**
	 * @param {string} value
	 */
	set toSignElementId(value) {
		this._toSignElementId = value;
	}

	setSignatureElementInsertion(insertion) {
		this._signatureElementInsertion = insertion;
	}

	start() {
		if (!this._xmlToSignPath) {
			throw new Error("The XML to be signed was not set");
		}

		if (!this._certificatePath) {
			throw new Error("The certificate was not set");
		}

		return new Promise((resolve, reject) => {
			// Generate transfer file
			XmlSignatureStarter._getTransferFileName()
				.then((transferFile) => {
					let args = [
						this._xmlToSignPath,
						this._certificatePath,
						path.join(
							this._config.transferDataFolder,
							transferFile
						),
					];

					// Verify and add common options between signers
					this._verifyAndAddCommonOption(args);

					// Set element id to be signed.
					if (this._toSignElementId) {
						args.push("--element-id");
						args.push(this._toSignElementId);
					}

					if (this._signatureElementInsertion) {
						args.push("--sig-element-insertion");
						args.push(this._signatureElementInsertion);

						this._versionManager.requireVersion("1.26.0");
					}

					// Invoke command with plain text output (to support PKI Express < 1.3)
					this._invokePlain(Command.START_XML, args)
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

exports.XmlSignatureStarter = XmlSignatureStarter;
