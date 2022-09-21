"use strict";
const fs = require("fs");

const { PkiExpressOperator } = require("./pkiexpress-operator");
const { PkiExpressConfig } = require("./pkiexpress-config");
const { PadesMeasurementUnits } = require("./pades-measurement-units");
const { Command } = require("./command");

class PdfMarker extends PkiExpressOperator {
	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);
		this._measurementUnits = PadesMeasurementUnits.CENTIMETERS;
		this._pageOptimization = null;
		this._marks = [];
		this._filePath = null;
		this._outputFilePath = null;
		this._overwriteOriginalFile = false;
	}

	get file() {
		return this._filePath;
	}

	// region setFileFromPath

	setFileFromPath(path) {
		return new Promise((resolve, reject) => {
			fs.access(path, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error("The provided file was not found"));
					return;
				}
				this._filePath = path;
				resolve();
			});
		});
	}

	setFileFromPathSync(path) {
		if (!fs.existsSync(path)) {
			throw new Error("The provided file was not found");
		}
		this._filePath = path;
	}

	// endregion

	// region setFileFromRaw

	setFileFromRaw(contentRaw) {
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
						this._filePath = tempFilePath;
						resolve();
					});
				})
				.catch((err) => reject(err));
		});
	}

	setFileFromRawSync(contentRaw) {
		let tempFilePath = this._createTempFileSync();
		fs.writeFileSync(tempFilePath, contentRaw);
		this._filePath = tempFilePath;
	}

	// endregion

	// region setFileFromBase64

	setFileFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {
			let raw = null;
			try {
				raw = Buffer.from(contentBase64, "base64");
			} catch (err) {
				reject(new Error("The provided file is not Base64-encoded"));
				return;
			}

			this.setFileFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
	}

	setFileFromBase64Sync(contentBase64) {
		let raw = null;
		try {
			raw = Buffer.from(contentBase64, "base64");
		} catch (err) {
			throw new Error("The provided file is not Base64-encoded");
		}
		this.setFileFromRawSync(raw);
	}

	// endregion

	get outputFile() {
		return this._outputFilePath;
	}

	set outputFile(value) {
		this._outputFilePath = value;
	}

	get measurementUnits() {
		return this._measurementUnits;
	}

	set measurementUnits(value) {
		this._measurementUnits = value;
	}

	get pageOptimization() {
		return this._pageOptimization;
	}

	set pageOptimization(value) {
		this._pageOptimization = value;
	}

	get marks() {
		return this._marks;
	}

	set marks(value) {
		this._marks = value;
	}

	get overwriteOriginalFile() {
		return this._overwriteOriginalFile;
	}

	set overwriteOriginalFile(value) {
		this._overwriteOriginalFile = value;
	}

	apply() {
		if (!this._filePath) {
			throw new Error("The file to be marked was not set");
		}

		let args = [this._filePath];

		// Generate changes file.
		let marksModels = [];
		for (let mark of this._marks) {
			marksModels.push(mark.toModel());
		}
		let request = {
			marks: marksModels,
			measurementUnits: this._measurementUnits,
			pageOptimization: this._pageOptimization,
		};

		return new Promise((resolve, reject) => {
			this._createTempFile()
				.then((tempFilePath) => {
					fs.writeFile(
						tempFilePath,
						JSON.stringify(request),
						(err) => {
							if (err) {
								reject(
									new Error(
										"Could not create apply marks's request file."
									)
								);
								return;
							}
							args.push(tempFilePath);

							// Logic to overwrite original file or use the output file.
							if (this._overwriteOriginalFile) {
								args.push("--overwrite");
							} else {
								args.push(this._outputFilePath);
							}

							// This operation can only be used on versions greater than 1.3
							// of the PKI Express.
							this._versionManager.requireVersion("1.3");

							// Invoke command.
							this._invoke(Command.EDIT_PDF, args)
								.then(() => resolve())
								.catch((err) => reject(err));
						}
					);
				})
				.catch((err) => reject(err));
		});
	}
}

exports.PdfMarker = PdfMarker;
