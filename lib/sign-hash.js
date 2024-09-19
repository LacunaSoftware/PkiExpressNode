"use strict";
const { PkiExpressConfig } = require("./pkiexpress-config");
const { DigestAlgorithms } = require("./digest-algorithm");
const { PkiExpressOperator } = require("./pkiexpress-operator");
const { Command } = require("./command");
const { CertificateStoreOptions } = require("./certificate-store-options");


class SignHash extends PkiExpressOperator {
    /**
     * @param {PkiExpressConfig} config
     */
    constructor(config, certificateStoreOptions) {

        config = config || new PkiExpressConfig;
        super(config);
        this._toSignHash = '';
        this._digestAlgorithm = '';
		if(certificateStoreOptions){
			this._certStoreOptions = new CertificateStoreOptions(certificateStoreOptions);
		}
		this._certStoreOptions = new CertificateStoreOptions();
    }

    get toSignHash() {
        return this._toSignHash;
    }

    set toSignHash(value) {
        if (typeof value !== 'string') {
            throw new Error('toSignHash must be a string.');
        }

        this._toSignHash = value;
    }

	getToSignHash() {
        return this._toSignHash;
    }

    setToSignHash(value) {
        if (typeof value !== 'string') {
            throw new Error('toSignHash must be a string.');
        }

        this._toSignHash = value;
    }

	get digestAlgorithm() {
        return this._digestAlgorithm;
    }

    set digestAlgorithm(value) {
		if (typeof value !== 'string') {
            throw new Error('digestAlgorithm must be a string.');
        }
        this._digestAlgorithm = value;
    }

    getDigestAlgorithm() {
        return this._digestAlgorithm;
    }

    setDigestAlgorithm(value) {
		if (typeof value !== 'string') {
            throw new Error('digestAlgorithm must be a string.');
        }
        this._digestAlgorithm = value;
    }

    get certificateStoreOptions() {
        return this._certStoreOptions;
    }

    set certificateStoreOptions(value) {
        this._certStoreOptions = new CertificateStoreOptions(value);
    }

    getCertificateStoreOptions() {
        return this._certStoreOptions;
    }

    setCertificateStoreOptions(value) {
        this._certStoreOptions = new CertificateStoreOptions(value);
    }

    sign() {

        if (!this.toSignHash) {
            throw new Error("The Hash to be signed was not set");

        }
        if (!this.digestAlgorithm) {
            throw new Error("The DigestAlgorithms to be signed was not set");
        }

        let args = [this._toSignHash];

        args.push("--algorithm");

        switch (this._digestAlgorithm) {
            case DigestAlgorithms.MD5:
                args.push(this._digestAlgorithm);
                break;
            case DigestAlgorithms.SHA1:
                args.push(this._digestAlgorithm);
                break;
            case DigestAlgorithms.SHA256:
                args.push(this._digestAlgorithm);
                break;
            case DigestAlgorithms.SHA384:
                args.push(this._digestAlgorithm);
                break;
            case DigestAlgorithms.SHA512:
                args.push(this._digestAlgorithm);
                break;
            default:
                throw new Error(`Unsupported digest algorithm: ${this._digestAlgorithm}`);;
        }

		if (
			!this._certStoreOptions.getThumbprint() &&
			!this._certStoreOptions.getPkcs12() &&
			!this._certStoreOptions.getKeyName() &&
            !this._trustServiceSession
		) {
			throw new Error(
				"Neither the certificate's thumbprint, the \
			PKCS #12 file, nor the key name was provided"
			);
		}

		if (this._certStoreOptions.getThumbprint()) {
			args.push("--thumbprint");
			args.push(this._certStoreOptions.getThumbprint());

			// This operation can only be used on versions greater than 1.3 of the
			// PKI Express.
			this._versionManager.requireVersion("1.3");
		}

		if (this._certStoreOptions.getPkcs12()) {
			args.push("--pkcs12");
			args.push(this._certStoreOptions.getPkcs12());

			// This operation can only be used on versions greater than 1.3 of the
			// PKI Express.
			this._versionManager.requireVersion("1.3");
		}

		if (this._certStoreOptions.getKeyName()) {
			if (!this._certStoreOptions.getCertFile()) {
				throw new Error(
					"The key name was passed, but no certificate file was provided."
				);
			}
			args.push("--key-name");
			args.push(this._certStoreOptions.getKeyName());
			args.push("--cert-file");
			args.push(this._certStoreOptions.getCertFile());

			// This operation can only be used on versions greater than 1.14 of the
			// PKI Express.
			this._versionManager.requireVersion("1.14");
		}

		if (this._certStoreOptions.getPassword()) {
			args.push("--password");
			args.push(this._certStoreOptions.getPassword());

			// This operation can only be used on versions greater than 1.3 of the
			// PKI Express.
			this._versionManager.requireVersion("1.3");
		}
		
		// Concat the certStoreOptions with the current args array
		args.concat(this._certStoreOptions.getCertStoreOptions())

        // Invoke command.
        return new Promise((resolve, reject) => {
            this._invoke(Command.SIGN_HASH, args)
                .then((response) => {
                    let result = response[0];
                    resolve(result);
                })
                .catch((err) => reject(err));
        });

    }
}

exports.SignHash = SignHash;