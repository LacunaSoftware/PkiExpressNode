"use strict";
const { PkiExpressConfig } = require("./pkiexpress-config");
const { DigestAlgorithms } = require("./digest-algorithm");
const { PkiExpressOperator } = require("./pkiexpress-operator");
const { Command } = require("./command");


class SignData extends PkiExpressOperator {
    /**
     * @param {PkiExpressConfig} config
     */
    constructor(config) {

        config = config || new PkiExpressConfig;
        super(config);
        this._toSignData = '';
        this._digestAlgorithm = '';
    }

    get toSignData() {
        return this._toSignData;
    }

    set toSignData(value) {
        if (typeof value !== 'string') {
            throw new Error('toSignData must be a string.');
        }

        this._toSignData = value;
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

        if (!this.toSignData) {
            throw new Error("The Data to be signed was not set");

        }
        if (!this.digestAlgorithm) {
            throw new Error("The DigestAlgorithms to be signed was not set");
        }

        let args = [this._toSignData];

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



        // Invoke command.
        return new Promise((resolve, reject) => {
            this._invoke(Command.SIGN_DATA, args)
                .then((response) => {
                    let result = response;
                    resolve(result);
                })
                .catch((err) => reject(err));
        });

    }
}

exports.SignData = SignData;