'use strict';
const { DigestAlgorithmAndValue } = require('./digest-algorithm-and-value');
const { SignatureAlgorithmAndValue } = require('./signature-algorithm-and-value');
const { PKCertificate } = require('./pk-certificate');
const { SignaturePolicyIdentifier } = require('./signature-policy-identifier');
const { ValidationResults } = require('./validation');

class CadesSignature {

	/**
	 * Creates a CAdES signature from a model provided by PKI Express.
	 * @param {Object} model
	 */
	constructor(model) {
		this._encapsulatedContentType = model['encapsulatedContentType'];
		this._hasEncapsulatedContent = model['hasEncapsulatedContent'];
		this._signers = [];
		if (model['signers']) {
			for (let signer of model['signers']) {
				this._signers.push(new CadesSignerInfo(signer));
			}
		}
	}

	get encapsulatedContentType() {
		return this._encapsulatedContentType;
	}

	set encapsulatedContentType(value) {
		this._encapsulatedContentType = value;
	}

	get hasEncapsulatedContent() {
		return this._hasEncapsulatedContent;
	}

	set hasEncapsulatedContent(value) {
		this._hasEncapsulatedContent = value;
	}

	get signers() {
		return this._signers;
	}

	set signers(value) {
		this._signers = value;
	}
}

class CadesTimestamp extends CadesSignature {

	constructor(model) {
		super(model);
		this._genTime = model['genTime'];
		this._serialNumber = model['serialNumber'];
		this._messageImprint = new DigestAlgorithmAndValue(model['messageImprint']);
	}

	get genTime() {
		return this._genTime;
	}

	set genTime(value) {
		this._genTime = value;
	}

	get serialNumber() {
		return this._serialNumber;
	}

	set serialNumber(value) {
		this._serialNumber = value;
	}

	get messageImprint() {
		return this._messageImprint;
	}

	set messagaImprint(value) {
		this._messageImprint = value;
	}
}

class CadesSignerInfo {

	constructor(model) {
		this._signingTime = model['signingTime'];
		this._certifiedDateReference = model['certifiedDateReference'];

		if (model['messageDigest']) {
			this._messageDigest = new DigestAlgorithmAndValue(model['messageDigest']);
		}

		if (model['signature']) {
			this._signature = new SignatureAlgorithmAndValue(model['signature']);
		}

		if (model['certificate']) {
			this._certificate = new PKCertificate(model['certificate']);
		}

		if (model['signaturePolicy']) {
			this._signaturePolicy = new SignaturePolicyIdentifier(model['signaturePolicy']);
		}

		this._timestamps = [];
		if (model['timestamps']) {
			for (let timestamp of model['timestamps']) {
				this._timestamps.push(new CadesTimestamp(timestamp));
			}
		}

		if (model['validationResults']) {
			this._validationResults = new ValidationResults(model['validationResults']);
		}
	}

	get messageDigest() {
		return this._messageDigest;
	}

	set messageDigest(value) {
		this._messageDigest = value;
	}

	get signature() {
		return this._signature;
	}

	set signature(value) {
		this._signature = value;
	}

	get certificate() {
		return this._certificate;
	}

	set certificate(value) {
		this._certificate = value;
	}

	get signingTime() {
		return this._signingTime;
	}

	set signingTime(value) {
		this._signingTime = value;
	}

	get certifiedDateReference() {
		return this._certifiedDateReference;
	}

	set certifiedDateReference(value) {
		this._certifiedDateReference = value;
	}

	get signaturePolicy() {
		return this._signaturePolicy;
	}

	set signaturePolicy(value) {
		this._signaturePolicy = value;
	}

	get timestamps() {
		return this._timestamps;
	}

	set timestamps(value) {
		this._timestamps = value;
	}

	get validationResults() {
		return this._validationResults;
	}

	set validationResults(value) {
		this._validationResults = value;
	}
}

exports.CadesSignature = CadesSignature;
exports.CadesTimestamp = CadesTimestamp;
exports.CadesSignerInfo = CadesSignerInfo;