"use strict";

const { Command } = require("./command");
const { PadesSignature } = require("./pades-signature");
const { PkiExpressConfig } = require("./pkiexpress-config");
const { SignatureExplorer } = require("./signature-explorer");

class PadesSignatureExplorer extends SignatureExplorer {
	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);
	}

	open() {
		if (!this._signatureFilePath) {
			throw new Error("The signature file was not set");
		}

		let args = [this._signatureFilePath];

		// Verify and add common options
		this._verifyAndAddCommonOption(args);

		// This operation can only be used on versions greater than 1.3 of the
		// PKI Express.
		this._versionManager.requireVersion("1.3");

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.OPEN_PADES, args)
				.then((response) => {
					let output = PadesSignatureExplorer._parseOutput(
						response[0]
					);
					let signature = new PadesSignature(output);
					resolve(signature);
				})
				.catch((err) => reject(err));
		});
	}
}

exports.PadesSignatureExplorer = PadesSignatureExplorer;
