"use strict";
const { PkiExpressConfig } = require("./pkiexpress-config");
const { DigestAlgorithms } = require("./digest-algorithm");
const { PkiExpressOperator } = require("./pkiexpress-operator");
const { Command } = require("./command");


class SignHash extends PkiExpressOperator {
    /**
     * @param {PkiExpressConfig} config
     */
    constructor(config) {

        config = config || new PkiExpressConfig;
        super(config);
        this._toSignHash = '';
        this._digestAlgorithm = '';
		this._pkcs12Path = '';
		this._certThumb = '';
		this._certPassword = '';
		this._keyName = '';
		this._certFilePath = '';
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

    get digestAlgorithm() {
        return this._digestAlgorithm;
    }

    set digestAlgorithm(value) {
        if (typeof value !== 'string') {
            throw new Error('digestAlgorithm must be a string.');
        }
        this._digestAlgorithm = value;
    }

	get pkcs12() {
		return this._pkcs12Path;
	}

	get certThumb() {
		return this._certThumb;
	}

	set certThumb(value) {
		this._certThumb = value;
	}

	get certPassword() {
		return this._certPassword;
	}

	set certPassword(value) {
		this._certPassword = value;
	}

	get keyName() {
		return this._keyName;
	}

	set keyName(value) {
		this._keyName = value;
	}

	get certFilePath() {
		return this._certFilePath;
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
			!this._certThumb &&
			!this._pkcs12Path &&
			!this._keyName 
		) {
			throw new Error(
				"Neither the certificate's thumbprint, the \
			PKCS #12 file, nor the key name was provided"
			);
		}

		if (this._certThumb) {
			args.push("--thumbprint");
			args.push(this._certThumb);

			// This operation can only be used on versions greater than 1.3 of the
			// PKI Express.
			this._versionManager.requireVersion("1.3");
		}

		if (this._pkcs12Path) {
			args.push("--pkcs12");
			args.push(this._pkcs12Path);

			// This operation can only be used on versions greater than 1.3 of the
			// PKI Express.
			this._versionManager.requireVersion("1.3");
		}

		if (this._keyName) {
			if (!this._certFilePath) {
				throw new Error(
					"The key name was passed, but no certificate file was provided."
				);
			}
			args.push("--key-name");
			args.push(this._keyName);
			args.push("--cert-file");
			args.push(this._certFilePath);

			// This operation can only be used on versions greater than 1.14 of the
			// PKI Express.
			this._versionManager.requireVersion("1.14");
		}

		if (this._certPassword) {
			args.push("--password");
			args.push(this._certPassword);

			// This operation can only be used on versions greater than 1.3 of the
			// PKI Express.
			this._versionManager.requireVersion("1.3");
		}


        // Invoke command.
        return new Promise((resolve, reject) => {
            this._invoke(Command.SIGN_HASH, args)
                .then((response) => {
                    let result = response;
                    resolve(result);
                })
                .catch((err) => reject(err));
        });

    }
}

exports.SignHash = SignHash;