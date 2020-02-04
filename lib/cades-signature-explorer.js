'use strict';
const fs = require('fs');

const { CadesSignature } = require('./cades-signature');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { SignatureExplorer } = require('./signature-explorer');
const { Command } = require('./command');


class CadesSignatureExplorer extends SignatureExplorer{
    constructor(config){
        config = config || new PkiExpressConfig();

        super(config);
        this._dataFilePath = null;
        this._extractContentPath = null;
    }

    get dataFilePath(){
        return this.getDataFilePath();
    }

    getDataFilePath(){
        return this._dataFilePath;
    }

    // region setDataFile
    setDataFileFromPath(path) {
        return new Promise((resolve, reject) => {
            fs.access(path, fs.constants.F_OK, (err) => {
                if (err) {
                    reject(new Error('The provided data file was not found'));
                    return;
                }
                this._dataFilePath = path;
                resolve();
            });
        });
    }

    setDataFileFromPathSync(path){
        if (!fs.existsSync(path)){
            throw new Error('The provided data file was not found');
        }
        this._dataFilePath = path;
    }

    setDataFileFromRaw(contentRaw) {
        return new Promise((resolve, reject) => {
            this._createTempFile()
                .then((tempFilePath) => {
                    fs.writeFile(tempFilePath, contentRaw, (err) => {
                        if (err) {
                            reject(new Error(`The provided content could not been stored: ${err}`));
                            return;
                        }
                        this._dataFilePath = tempFilePath;
                        resolve();
                    });
                })
                .catch((err) => reject(err));
        });
    }

    setDataFileFromRawSync(contentRaw) {
        let tempFilePath = this._createTempFileSync();
        fs.writeFileSync(tempFilePath, contentRaw);
        this._dataFilePath = tempFilePath;
    }

    setDataFileFromBase64(contentBase64) {
        return new Promise((resolve, reject) => {
            let raw = null;
            try {
                raw = Buffer.from(contentBase64, 'base64');
            } catch (err) {
                throw new Error('The provided data file is not Base64-encoded');
            }
            this.setDataFileFromRaw(raw)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    }

    setDataFileFromBase64Sync(contentBase64) {
        let raw = null;
        try {
            raw = Buffer.from(contentBase64, 'base64');
        } catch (err) {
            throw new Error('The provided data file is not Base64-encoded');
        }
        this.setDataFileFromRawSync(raw);
    }

    // endregion

    get extractContentPath() {
        return this.getExtractContentPath();
    }

    getExtractContentPath(){
        return this._extractContentPath;
    }


    set extractContentPath(value){
        this.setExtractContentPath(value);
    }

    setExtractContentPath(value){
        this._extractContentPath = value;
    }

    open(){
        if (!this._signatureFilePath){
            throw new Error('The provided signature file was not set');
        }
    
        let args = [this._signatureFilePath];

        // Verify and add common options
        this._verifyAndAddCommonOption(args);
    
        if (this._validate) {
            args.push('--validate');
        }

        if (this._dataFilePath){
            args.push('--data-file');
            args.push(this._dataFilePath);
        }
    
        if (this._extractContentPath){
            args.push('--extract-content');
            args.push(this._extractContentPath);
        }
    
        // This operation can only be used on versions greater than 1.3 of the
        // PKI Express.
        this._versionManager.requireVersion('1.3');
    
        // Invoke command.
        return new Promise((resolve, reject) =>{
            this._invoke(Command.OPEN_CADES, args)
            .then((response) => {
                const output = CadesSignatureExplorer._parseOutput(response[0]);
                const signature = new CadesSignature(output);
                resolve(signature);
            })
            .catch((err) => reject(err));
        });
    }
}
    
exports.CadesSignatureExplorer = CadesSignatureExplorer;