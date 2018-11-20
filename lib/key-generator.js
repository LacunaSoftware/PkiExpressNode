'use strict';
const { Command } = require('./command');
const { KeyFormats } = require('./enums');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { PkiExpressOperator } = require('./pkiexpress-operador');

const SupportedKeySizes = ['1024', '2048', '4096'];

class KeyGenerator extends PkiExpressOperator {

	constructor({keySize, keyFormat, genCsr, config} = {}) {
		config = config || new PkiExpressConfig();
		super(config);

		this._keySize = keySize || '2048';
		this._keyFormat = keyFormat || KeyFormats.JSON;
		this._genCsr = genCsr || false;
	}

	//region "keySize" Accessors

	getKeySize() {
		return this._keySize;
	}

	get keySize() {
		return this._keySize;
	}

	setKeySize(value) {
		this._keySize = value;
	}

	set keySize(value) {
		this._keySize = value;
	}

	//endregion

	//region "keyFormat" Accessors

	getKeyFormat() {
		return this._keyFormat;
	}

	get keyFormat() {
		return this._keyFormat;
	}

	setKeyFormat(value) {
		this._keyFormat = value;
	}

	set keyFormat(value) {
		this._keyFormat = value;
	}

	//endregion

	//region "genCsr" Accessors

	isGenCsr() {
		return this._genCsr;
	}

	get genCsr() {
		return this._genCsr;
	}

	setGenCsr(value) {
		this._genCsr = value;
	}

	set genCsr(value) {
		this._genCsr = value;
	}

	//endregion

	generate(keyFormat) {
		return new Promise((resolve, reject) => {
			keyFormat = keyFormat || this._keyFormat;

			let args = [];
			if (this._keySize) {
				if (SupportedKeySizes.indexOf(this._keySize.toString()) === -1) {
					throw new Error(`Unsupported key size: ${this._keySize}`);
				}
				args.push('--size');
				args.push(this._keySize.toString());
			}

			if (this._keyFormat) {
				args.push('--format');
				args.push(keyFormat);
			}

			if (this._genCsr) {
				args.push('--gen-csr');
			}

			// This operation can only be used on version greater then 1.11 of the
			// PKI Express.
			//this._versionManager.requireVersion('1.11');

			this
				._invoke(Command.GEN_KEY, args)
				.then(response => {
					let output = KeyGenerator._parseOutput(response[0]);
					let generation = new KeyGenerationResult(output);
					resolve(generation);
				})
				.catch(err => reject(err));
		});
	}
}

class KeyGenerationResult {

	constructor(model) {
		this._key = model['key'] || null;
		this._csr = model['csr'] || null;
	}

	//region "key" Accessors

	getKey() {
		return this._key;
	}

	get key() {
		return this._key;
	}

	setKey(value) {
		this._key = value;
	}

	set key(value) {
		this._key = value;
	}

	//endregion

	//region "csr" Accessors

	getCsr() {
		return this._csr;
	}

	get csr() {
		return this._csr;
	}

	setCsr(value) {
		this._csr = value;
	}

	set csr(value) {
		this._csr = value;
	}

	//endregion
}

exports.SupportedKeySizes = SupportedKeySizes;
exports.KeyGenerationResult = KeyGenerationResult;
exports.KeyGenerator = KeyGenerator;