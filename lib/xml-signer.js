"use strict";
const fs = require("fs");

const { Signer } = require("./signer");
const { PkiExpressConfig } = require("./pkiexpress-config");
const { Command } = require("./command");
const { PKCertificate } = require("./pk-certificate");

class XmlSigner extends Signer {
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

	sign(getCert = false) {
		if (!this._xmlToSignPath) {
			throw new Error("The XML to be signed was not set");
		}

		if (!this._outputFilePath) {
			throw new Error("The output destination was not set");
		}

		let args = [this._xmlToSignPath, this._outputFilePath];

		// Verify and add common option between signers.
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

		if (getCert) {
			// This operation can only be used on version greater than 1.8 of the
			// PKI Express.
			this._versionManager.requireVersion("1.8");

			// Invoke command.
			return new Promise((resolve, reject) => {
				this._invoke(Command.SIGN_XML, args)
					.then((response) => {
						// Parse output and return model.
						let output = Signer._parseOutput(response[0]);
						let result = new PKCertificate(output["signer"]);
						resolve(result);
					})
					.catch((err) => reject(err));
			});
		} else {
			// Invoke command with plain text output (to support PKI Express < 1.3)
			return this._invokePlain(Command.SIGN_XML, args);
		}
	}
}

exports.XmlSigner = XmlSigner;
