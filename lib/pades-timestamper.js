"use strict";
const fs = require("fs");
const { PkiExpressConfig } = require("./pkiexpress-config");
const { PkiExpressOperator } = require("./pkiexpress-operator");
const { Command } = require("./command");

class PadesTimestamper extends PkiExpressOperator {
	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);

		this._pdfPath = null;
		this._outputFilePath = null;
		this._overwriteOriginalFile = false;
		this._vrJsonPath = null;
	}

	get pdfPath() {
		return this.getPdfPath();
	}

	getPdfPath() {
		return this._pdfPath;
	}

	// region getSetPdfFromPath

	setPdfFromPath(pdfPath) {
		return new Promise((resolve, reject) => {
			fs.access(pdfPath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(
						new Error("The provided PDF to be signed was not found")
					);
					return;
				}
				this._pdfPath = pdfPath;
				resolve();
			});
		});
	}

	set pdfPath(value) {
		this.setPdfFromPath(value);
	}

	setPdfFromPathSync(pdfPath) {
		if (!fs.existsSync(pdfPath)) {
			throw new Error("The provided PDF was not found");
		}
		this._pdfPath = pdfPath;
	}

	// endregion

	// region setPdfFromRaw

	setPdfFromRaw(contentRaw) {
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
						this._pdfPath = tempFilePath;
						resolve();
					});
				})
				.catch((err) => reject(err));
		});
	}

	set pdfContentRaw(contentRaw) {
		this.setPdfFromRawSync(contentRaw);
	}

	setPdfFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._pdfPath = tempFilePath;
	}

	// endregion

	// region setPdfFromBase64

	setPdfFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {
			let raw = null;
			try {
				raw = Buffer.from(contentBase64, "base64");
			} catch (err) {
				throw new Error("The provided PDF is not Base64-encoded");
			}

			this.setPdfFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	set pdfContentBase64(contentBase64) {
		this.setPdfFromBase64Sync(contentBase64);
	}

	setPdfFromBase64Sync(contentBase64) {
		let raw = null;
		try {
			raw = Buffer.from(contentBase64, "base64");
		} catch (err) {
			throw new Error("The provided PDF is not Base64-encoded");
		}

		this.setPdfFromRawSync(raw);
	}

	// endregion

	// region "outputFilePath" accessors

	get outputFilePath() {
		return this.getOutputFilePath();
	}

	getOutputFilePath() {
		return this._outputFilePath;
	}

	set outputFilePath(value) {
		this.setOutputFilePath(value);
	}

	setOutputFilePath(value) {
		this._outputFilePath = value;
	}

	// endregion

	// region "overwriteOriginalFile" accessors

	get overwriteOriginalFile() {
		return this.getOverwriteOriginalFile();
	}

	getOverwriteOriginalFile() {
		return this._overwriteOriginalFile;
	}

	set overwriteOriginalFile(value) {
		this.setOverwriteOriginalFile(value);
	}

	setOverwriteOriginalFile(value) {
		if (typeof value == "boolean") {
			this._overwriteOriginalFile = value;
		} else {
			throw new Error("overwriteOriginalFile is a boolean field");
		}
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

	stamp() {
		if (this._pdfPath == null) {
			throw new Error("The PDF to be timestamped was not set");
		}
		if (!this._overwriteOriginalFile && this._outputFilePath == null) {
			throw new Error("The output destination was not set");
		}

		let args = [this._pdfPath];

		// Add timestamp authority
		if (this._timestampAuthority != null) {
			this._timestampAuthority.addCmdArguments(
				args,
				this._versionManager
			);

			// This option can only be used on versions greater then 1.5 of the
			// PKI Express.
			this._versionManager.requireVersion("1.5");
		}

		// Logic to overwrite original file or use the output file.
		if (this._overwriteOriginalFile) {
			args.push("--overwrite");
		} else {
			args.push(this._outputFilePath);
		}

		if (this._vrJsonPath) {
			args.push("--visual-rep");
			args.push(this._vrJsonPath);

			// This operation can only be used on versions greater than 1.18 of the
			// PKI Express.
			this._versionManager.requireVersion("1.18");
		}

		// This operation can only be used on versions greater than 1.7 of the
		// PKI Express.
		this._versionManager.requireVersion("1.7");

		// Invoke command.
		return this._invoke(Command.STAMP_PDF, args);
	}
}

exports.PadesTimestamper = PadesTimestamper;
