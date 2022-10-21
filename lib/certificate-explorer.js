"use strict";

const { Command } = require("./command");
const { PkiExpressOperator } = require("./pkiexpress-operator");
const { PkiExpressConfig } = require("./pkiexpress-config");
const { CertificateExplorerResult } = require("./certificate-explorer-result");

/**
 * This class represents the command to open a certificate using PKI Express.
 * You can also use it to validate a certificate and check the issuer chain.
 */
class CertificateExplorer extends PkiExpressOperator {
	/**
	 * Creates a Certificate Explorer
	 *
	 * @param {PkiExpressConfig} config the common configuration for the
	 * command (@see PkiExpressConfig)
	 */
	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);
		this._certificatePath = null;
		this._validate = null;
		this._fillContent = true;
		this._fillIssuer = [];
	}

	/**
	 * Gets the certificate path
	 * @returns {string} the path to the certificate file
	 */
	get certificatePath() {
		return this._certificatePath;
	}

	/**
	 * Sets the certificate file by its path asynchronously
	 *
	 * @param {string} path the path to the certificate
	 * @returns {Promise} a promise without a content
	 */
	setCertificateFromPath(path) {
		return new Promise((resolve, reject) => {
			fs.access(path, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error("The provided certificate was not found"));
					return;
				}
				this._certificatePath = path;
				resolve();
			});
		});
	}

	/**
	 * Sets the certificate file by its path synchronously
	 * @param {string} path the path to the certificate
	 * @returns {Promise} a promise without a content
	 */
	setCertificateFromPathSync(path) {
		if (!fs.existsSync(path)) {
			throw new Error("The provided certificate was not found");
		}
		this._certificatePath = path;
	}

	/**
	 * Sets the certificate file by its content asynchronously
	 * @param {binary} contentRaw the content of the certificate file
	 * @returns {Promise} a promise without a content
	 */
	setCertificateFromRaw(contentRaw) {
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
						this._certificatePath = tempFilePath;
						resolve();
					});
				})
				.catch((err) => reject(err));
		});
	}

	/**
	 * Sets the certificate file by its content synchronously
	 * @param {binary} contentRaw the content of the certificate file
	 * @returns {Promise} a promise without a content
	 */
	setCertificateFromRawSync(contentRaw) {
		const tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._certificatePath = tempFilePath;
	}

	/**
	 * Sets the certificate file by its base64-encoded content asynchronously
	 * @param {string} contentBase64 the base64-encoded content of the
	 * certificate file
	 * @returns {Promise} a promise without a content
	 */
	setCertificateFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {
			let raw = null;
			try {
				raw = Buffer.from(contentBase64, "base64");
			} catch (err) {
				throw new Error(
					"The provided certificate is not Base64-encoded"
				);
			}
			this.setCertificateFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	/**
	 * Sets the certificate file by its base64-encoded content synchronously
	 * @param {string} contentBase64 the base64-encoded content of the
	 * certificate file
	 * @returns {Promise} a promise without a content
	 */
	setCertificateFromBase64Sync(contentBase64) {
		let raw = null;
		try {
			raw = Buffer.from(contentBase64, "base64");
		} catch (err) {
			throw new Error("The provided certificate is not Base64-encoded");
		}
		this.setCertificateFromRawSync(raw);
	}

	/**
	 * Gets the option that requires the CertificateExplorer to validate the
	 * certificate or not
	 * @return {boolean} the option to validate the certificate
	 */
	get validate() {
		return this._validate;
	}

	/**
	 * Sets the option that requires the CertificateExplorer to validate the
	 * certificate or not
	 * @param {boolean} value the option to validate the certificate
	 */
	set validate(value) {
		this._validate = value;
	}

	/**
	 * Gets the option that tells PKI express to fill the certificate's
	 * "content" field
	 * @return {boolean} the option to fill the certificate's content
	 */
	get fillContent() {
		return this._fillContent;
	}

	/**
	 * Sets the option that asks for PKI Express to fill the certificate's
	 * "content" field
	 * @param {boolean} value the option to fill the certificate's content
	 */
	set fillContent(value) {
		this._fillContent = value;
	}

	/**
	 * Gets the option that asks for PKI Express to fill the certificate's
	 * "issuer" field with the PKCertificate representation of the certificate
	 * issuer
	 * @return {boolean} the option to fill the certificate's issuer
	 */
	get fillIssuer() {
		return this._fillIssuer;
	}

	/**
	 * Sets the option that asks for PKI Express to fill the certificate's
	 * "issuer" field with the PKCertificate representation of the certificate
	 * issuer
	 * @param {boolean} value the option to fill the certificate's issuer
	 */
	set fillIssuer(value) {
		this._fillIssuer = value;
	}

	/**
	 * Reads and validates the certificate content.
	 * @returns {CertificateExplorerResult} the result contains the certificate information and the
	 * validation if the "--validate" option is passed (@see CertificateExplorerResult)
	 */
	async open() {
		const args = [];

		if (this._certificatePath) args.push("--file", this.certificatePath);
		if (this._validate) args.push("--validate");
		if (this._fillContent) {
			args.push("--fill-content");
			this._versionManager.requireVersion("1.22");
		}
		if (this._fillIssuer) {
			args.push("--fill-issuer");
			this._versionManager.requireVersion("1.22");
		}

		this._versionManager.requireVersion("1.20");

		const response = await this._invoke(Command.OPEN_CERT);
		const output = CertificateExplorer._parseOutput(response[0]);
		return new CertificateExplorerResult(output);
	}
}

exports.CertificateExplorer = CertificateExplorer;
