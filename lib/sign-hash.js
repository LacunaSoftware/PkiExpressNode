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
    sign() {

        if (!this.toSignHash) {
            throw new Error("The Hash to be signed was not set");
        }
        if (!this.digestAlgorithm) {
            throw new Error("The DigestAlgorithms to be signed was not set");
        }


        let args = [this._digestAlgorithm];

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
            case DigestAlgorithms.SHA512:
                args.push(this._digestAlgorithm);
                break;
            default:
                throw new Error("Wrong DigestAlgorithm");;
        }

        args.push("--algorithm");


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