"use strict";

const { DigestAlgorithm } = require("./digest-algorithm");
const { Oids } = require("./oids");

// Private key algorithms enumeration
const PKAlgorithms = {
	RSA: "RSA",
};

// Signature algorithms enumeration
const SignatureAlgorithms = {
	MD5_WITH_RSA: "MD5WithRSA",
	SHA1_WITH_RSA: "SHA1WithRSA",
	SHA256_WITH_RSA: "SHA256WithRSA",
	SHA384_WITH_RSA: "SHA384WithRSA",
	SHA512_WITH_RSA: "SHA512WithRSA",
};

class SignatureAlgorithm {
	static get MD5WithRSA() {
		return new RSASignatureAlgorithm(DigestAlgorithm.MD5);
	}

	static get SHA1WithRSA() {
		return new RSASignatureAlgorithm(DigestAlgorithm.SHA1);
	}

	static get SHA256WithRSA() {
		return new RSASignatureAlgorithm(DigestAlgorithm.SHA256);
	}

	static get SHA384WithRSA() {
		return new RSASignatureAlgorithm(DigestAlgorithm.SHA384);
	}

	static get SHA512WithRSA() {
		return new RSASignatureAlgorithm(DigestAlgorithm.SHA512);
	}

	static get _algorithms() {
		return [
			SignatureAlgorithm.MD5WithRSA,
			SignatureAlgorithm.SHA1WithRSA,
			SignatureAlgorithm.SHA256WithRSA,
			SignatureAlgorithm.SHA384WithRSA,
			SignatureAlgorithm.SHA512WithRSA,
		];
	}

	static get _safeAlgorithms() {
		return [
			SignatureAlgorithm.SHA1WithRSA,
			SignatureAlgorithm.SHA256WithRSA,
			SignatureAlgorithm.SHA384WithRSA,
			SignatureAlgorithm.SHA512WithRSA,
		];
	}

	static getInstanceByName(name) {
		let sig = SignatureAlgorithm._algorithms.find((s) => s.name === name);

		if (!sig) {
			throw new Error(`Unrecognized digest algorithm name: ${name}`);
		}
		return sig;
	}

	static getInstanceByOid(oid) {
		let sig = SignatureAlgorithm._algorithms.find((s) => s.oid === oid);

		if (!sig) {
			throw new Error(`Unrecognized digest algorithm oid: ${oid}`);
		}
		return sig;
	}

	static getInstanceByXmlUri(xmlUri) {
		let sig = SignatureAlgorithm._algorithms.find(
			(s) => s.xmlUri === xmlUri
		);

		if (!sig) {
			throw new Error(`Unrecognized digest algorithm XML URI: ${xmlUri}`);
		}
		return sig;
	}

	static getInstanceByApiModel(model) {
		switch (model["algorithm"]) {
			case SignatureAlgorithms.MD5_WITH_RSA:
				return SignatureAlgorithm.MD5WithRSA;
			case SignatureAlgorithms.SHA1_WITH_RSA:
				return SignatureAlgorithm.SHA1WithRSA;
			case SignatureAlgorithms.SHA256_WITH_RSA:
				return SignatureAlgorithm.SHA256WithRSA;
			case SignatureAlgorithms.SHA384_WITH_RSA:
				return SignatureAlgorithm.SHA384WithRSA;
			case SignatureAlgorithms.SHA512_WITH_RSA:
				return SignatureAlgorithm.SHA512WithRSA;
			default:
				throw new Error(
					`Unsupported signature algorithm: ${model["algorithm"]}`
				);
		}
	}

	constructor(name, oid, xmlUri, digestAlgorithm, pkAlgorithm) {
		this._name = name;
		this._oid = oid;
		this._xmlUri = xmlUri;
		this._digestAlgorithm = digestAlgorithm;
		this._pkAlgorithm = pkAlgorithm;
	}

	get oid() {
		return this._oid;
	}

	set oid(value) {
		this._oid = value;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		this._name = value;
	}

	get xmlUri() {
		return this._xmlUri;
	}

	set xmlUri(value) {
		this._xmlUri = value;
	}

	get digestAlgorithm() {
		return this._digestAlgorithm;
	}

	set digestAlgorithm(value) {
		this._digestAlgorithm = value;
	}

	get pkAlgorithm() {
		return this._pkAlgorithm;
	}

	set pkAlgorithm(value) {
		this._pkAlgorithm = value;
	}
}

class RSASignatureAlgorithm extends SignatureAlgorithm {
	constructor(digestAlgorithm) {
		let name = `${digestAlgorithm.name} with RSA`;
		let pkAlgorithm = PKAlgorithm.RSA;

		let xmlUri = null;
		let oid = null;
		switch (digestAlgorithm) {
			case DigestAlgorithm.MD5:
				xmlUri = "http://www.w3.org/2001/04/xmldsig-more#rsa-md5";
				oid = Oids.MD5_WITH_RSA;
				break;
			case DigestAlgorithm.SHA1:
				xmlUri = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
				oid = Oids.SHA1_WITH_RSA;
				break;
			case DigestAlgorithm.SHA256:
				xmlUri = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
				oid = Oids.SHA256_WITH_RSA;
				break;
			case DigestAlgorithm.SHA384:
				xmlUri = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384";
				oid = Oids.SHA384_WITH_RSA;
				break;
			case DigestAlgorithm.SHA512:
				xmlUri = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";
				oid = Oids.SHA512_WITH_RSA;
				break;
			default:
				throw new Error(
					`Unsupported digest algorithm: ${digestAlgorithm}`
				);
		}

		super(name, oid, xmlUri, digestAlgorithm, pkAlgorithm);
	}
}

class PKAlgorithm {
	static get RSA() {
		return new RSAPKAlgorithm();
	}

	static get _algorithms() {
		return [PKAlgorithm.RSA];
	}

	static getInstanceByName(name) {
		let alg = PKAlgorithm._algorithms.find((a) => a.name === name);

		if (!alg) {
			throw new Error(`Unrecognized private key algorithm name: ${name}`);
		}
		return alg;
	}

	static getInstanceByOid(oid) {
		let alg = PKAlgorithm._algorithms.find((a) => a.oid === oid);

		if (!alg) {
			throw new Error(`Unrecognized private key algorithm oid: ${oid}`);
		}
		return alg;
	}

	static getInstanceByApiModel(algorithm) {
		switch (algorithm) {
			case PKAlgorithms.RSA:
				return PKAlgorithm.RSA;
			default:
				throw new Error(
					`Unsupported private key algorithms ${algorithm}`
				);
		}
	}

	equals(instance) {
		if (this === instance) {
			return true;
		}

		if (!instance) {
			return false;
		}

		return this._oid === instance["oid"];
	}

	constructor(name, oid) {
		this._name = name;
		this._oid = oid;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		this._name = value;
	}

	get oid() {
		return this._oid;
	}

	set oid(value) {
		this._oid = value;
	}

	static getSignatureAlgorithm(digestAlgorithm) {
		throw new Error(
			`This method should be implemented!: ${digestAlgorithm}`
		);
	}
}

class RSAPKAlgorithm extends PKAlgorithm {
	constructor() {
		let name = "RSA";
		let oid = Oids.RSA;
		super(name, oid);
	}

	static getSignatureAlgorithm(digestAlgorithm) {
		return new RSASignatureAlgorithm(digestAlgorithm);
	}
}

exports.PKAlgorithms = PKAlgorithms;
exports.SignatureAlgorithms = SignatureAlgorithms;
exports.SignatureAlgorithm = SignatureAlgorithm;
exports.RSASignatureAlgorithm = RSASignatureAlgorithm;
exports.RSAPKAlgorithm = RSAPKAlgorithm;
exports.PKAlgorithm = PKAlgorithm;
