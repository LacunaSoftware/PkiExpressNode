'use strict';
const fs = require('fs');

const { PkiExpressOperator } = require('./pkiexpress-operator');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { AuthCompleteResult } = require('./auth-complete-result');
const { AuthStartResult } = require('./auth-start-result');
const { Command } = require('./command');

class Authentication extends PkiExpressOperator {

    constructor(config) {
        config = config || new PkiExpressConfig();
        super(config);
        this._nonce = null;
        this._certificatePath = null;
        this._signature = null;
        this._useExternalStorage = false;
    }

    setNonce(nonceBase64) {
        try {
            Buffer.from(nonceBase64, 'base64');
            this._nonce = nonceBase64;
        } catch (err) {
            throw new Error('The provided nonce is not valid');
        }
    }

    // region setCertificateFromPath

    setCertificateFromPath(certificatePath) {

        return new Promise((resolve, reject) => {

            fs.access(certificatePath, fs.constants.F_OK, (err) => {
                if (err) {
                    reject(new Error('The provided certificate was not found'));
                    return;
                }
                this._certificatePath = certificatePath;
                resolve();
            });
        });
    }

    setCertificateFromPathSync(certificatePath) {
        if (!fs.existsSync(certificatePath)) {
            throw new Error('The provided certificate was not found');
        }

        this._certificatePath = certificatePath;
    }

    // endregion

    // region setCertificateFromRaw

    setCertificateFromRaw(contentRaw) {
        return new Promise((resolve, reject) => {

            this._createTempFile()
                .then((tempFilePath) => {
                    fs.writeFile(tempFilePath, contentRaw, (err) => {
                        if (err) {
                            reject(new Error(`The provided content could not been stored: ${err}`));
                            return;
                        }
                        this._certificatePath = tempFilePath;
                        resolve();
                    });
                })
                .catch((err) => reject(err));
        });
    }

    setCertificateFromRawSync(contentRaw) {
        let tempFilePath = this._createTempFileSync();
        fs.writeFileSync(tempFilePath, contentRaw);
        this._certificatePath = tempFilePath;
    }

    // endregion

    // region setCertificateFromBase64

    setCertificateFromBase64(contentBase64) {
        return new Promise((resolve, reject) => {

            let raw = null;
            try {
                raw = Buffer.from(contentBase64, 'base64');
            } catch (err) {
                reject(new Error('The provided certificate was not Base64-encoded'));
                return;
            }

            this.setCertificateFromRaw(raw)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    }

    setCertificateFromBase64Sync(contentBase64) {

        try {
            let raw = Buffer.from(contentBase64, 'base64');
            this.setCertificateFromRawSync(raw);
        } catch (err) {
            throw new Error('The provided certificate was not Base64-encoded');
        }
    }

    // endregion
    
    setSignature(signatureBase64) {
        try {
            Buffer.from(signatureBase64, 'base64');
            this._signature = signatureBase64;
        } catch (err) {
            throw new Error('The provided signature was not valid');
        }
    }

    /**
     * @param {boolean} value
     */
    set externalStorage(value) {
        this._useExternalStorage = value;
    }

    start() {
        let args = [];

        // The option 'use external storage' is used to ignore the 
        // PKI Express's nonce verification, to make a own nonce
        // store and nonce verification.
        if (!this._useExternalStorage) {
            args.push('--nonce-store');
            args.push(this._config.transferDataFolder);
        }

        // This operation can only be used on versions greater than 1.4 of the PKI Express.
        this._versionManager.requireVersion('1.4');

        return new Promise((resolve, reject) => {
            // Invoke command.
            this._invoke(Command.START_AUTH, args)
            .then((response) => {
                // Parse output and return result.
                const output = Authentication._parseOutput(response[0]);
                const result = new AuthStartResult(output);
                resolve(result);
            })
            .catch((err) => reject(err));
        });
    }
    
    complete() {
        if (!this._nonce) {
            throw new Error('The nonce value was not set');
        }

        if (!this._certificatePath) {
            throw new Error('The certificate file was not set');
        }

        if (!this._signature) {
            throw new Error('The signature was not set');
        }

        let args = [
            this._nonce,
            this._certificatePath,
            this._signature
        ];

        // The option 'use external storage' is used to ignore the PKI Express's nonce verification, to make a own nonce
        // store and nonce verification.
        if (!this._useExternalStorage) {
            args.push('--nonce-store');
            args.push(this._config.transferDataFolder);
        }

        // This option can only be used on versions greater than 1.4 of the PKI Express.
        this._versionManager.requireVersion('1.4');

        // Invoke command.
        return new Promise((resolve, reject) => {
            this._invoke(Command.COMPLETE_AUTH, args)
            .then((response) => {
                // Parse output and return result.
                const output = Authentication._parseOutput(response[0]);
                const result = new AuthCompleteResult(output);
                resolve(result);
            })
            .catch((err) => reject(err));
        });
    }
}

exports.Authentication = Authentication;