'use strict';
const fs = require('fs');
const path = require('path');

const { SignatureStarter } = require('./signature-starter');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { Command } = require('./command');

class CadesSignatureStarter extends SignatureStarter{

   constructor(config){
       config = config || new PkiExpressConfig();
       super(config);
       this._fileToSignPath = null;
       this._dataFilePath = null;
       this._encapsulateContent = true;
   }

    // region setFileToSign
        
    setFileToSignFromPath(path) {
        return new Promise((resolve, reject) => {
            fs.access(path, fs.constants.F_OK, (err) => {
                if (err) {
                    reject(new Error('The provided file to be signed was not found'));
                    return;
                }
                this._fileToSignPath = path;
                resolve();
            });
        });
    }

    setFileToSignFromPathSync(path){
        if (!fs.existsSync(path)){
            throw new Error('The provided file to be signed was not found');
        }
        this._fileToSignPath = path;
    }

    setFileToSignFromRaw(contentRaw) {
        return new Promise((resolve, reject) => {
            this._createTempFile()
                .then((tempFilePath) => {
                    fs.writeFile(tempFilePath, contentRaw, (err) => {
                        if (err) {
                            reject(new Error(`The provided content could not been stored: ${err}`));
                            return;
                        }
                        this._fileToSignPath = tempFilePath;
                        resolve();
                    });
                })
                .catch((err) => reject(err));
        });
    }

    setFileToSignFromRawSync(contentRaw) {
        let tempFilePath = this._createTempFileSync();
        fs.writeFileSync(tempFilePath, contentRaw);
        this._fileToSignPath = tempFilePath;
    }

    setFileToSignFromBase64(contentBase64) {
        return new Promise((resolve, reject) => {

            let raw = null;
            try {
                raw = Buffer.from(contentBase64, 'base64');
            } catch (err) {
                throw new Error('The provided file to be signed is not Base64-encoded');
            }

            this.setFileToSignFromRaw(raw)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    }

    setFileToSignFromBase64Sync(contentBase64) {

        let raw = null;
        try {
            raw = Buffer.from(contentBase64, 'base64');
        } catch (err) {
            throw new Error('The provided file to be signed is not Base64-encoded');
        }

        this.setFileToSignFromRawSync(raw);
    }

    // endregion

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

    
    start(){
        if (!this._fileToSignPath){
            throw new Error('The file to be signed was not set');
        }

        if (!this._certificatePath){
            throw new Error('The certificate was not set');
        }

        return new Promise((resolve, reject) => {
            // Generate transfer file
            CadesSignatureStarter._getTransferFileName()
                .then((transferFile) => {
                    const args = [
                        this._fileToSignPath,
                        this._certificatePath,
                        path.join(this._config.transferDataFolder, transferFile)
                    ];
                    
                    // Verify and add common options between signers
                    this._verifyAndAddCommonOption(args);

                    if(this._dataFilePath){
                        args.push('--data-file');
                        args.push(this._dataFilePath);
                    }
                    if(!this._encapsulateContent){
                        args.push('--detached');
                    }
                    // Invoke command with plain text output (to support PKI Express < 1.3)
                    this._invokePlain(Command.START_CADES, args)
                    .then((response) => resolve(SignatureStarter._getResult(response, transferFile)))
                    .catch((err) => reject(err));
                })
                .catch((err) => reject(err));
        });
    }

    get encapsulatedContent(){
        return this.getEncapsulatedContent();
    }

    getEncapsulatedContent(){
        return this._encapsulateContent;
    }

    set encapsulatedContent(value){
        this.setEncapsulatedContent(value);
    }

    setEncapsulatedContent(value){
        if (typeof (value) == "boolean") {
            this._encapsulateContent = value;
        } else {
            throw new Error('encapsulateContent is a boolean field');
        }
    }
}

exports.CadesSignatureStarter = CadesSignatureStarter;