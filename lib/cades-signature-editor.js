'use strict';
const fs = require('fs');

const { PkiExpressConfig } = require('./pkiexpress-config');
const { PkiExpressOperator } = require('./pkiexpress-operador');
const { Command } = require('./command');

class CadesSignatureEditor extends PkiExpressOperator{

    constructor(config){
        config = config || new PkiExpressConfig();
        super(config);
        this._outputFilePath = null;
        this._dataFilePath = null;
        this._encapsulateContent = true;
        this._cmsFiles = [];
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

    get outputFilePath(){
        return this.getOutputFilePath();
    }

    getOutputFilePath(){
        return this._outputFilePath;
    }

    set outputFilePath(path){
        this.setOutputFilePath(path);
    }

    setOutputFilePath(path){
        this._outputFilePath = path;
    }

    get cmsFiles(){
        return this.getCmsFile();
    }

    getCmsFile(){
        return this._cmsFiles;
    }

    // region addCmsFile

    addCmsFileFromPath(path) {
        return new Promise((resolve, reject) => {
            fs.access(path, fs.constants.F_OK, (err) => {
                if (err) {
                    reject(new Error('The provided data file was not found'));
                    return;
                }
                this._cmsFiles.push(path);
                resolve();
            });
        });
    }

    addCmsFileFromPathSync(path){
        if (!fs.existsSync(path)){
            throw new Error('The provided data file was not found');
        }
        this._cmsFiles.push(path);
    }

    addCmsFileFromRaw(contentRaw) {
        return new Promise((resolve, reject) => {
            this._createTempFile()
                .then((tempFilePath) => {
                    fs.writeFile(tempFilePath, contentRaw, (err) => {
                        if (err) {
                            reject(new Error(`The provided content could not been stored: ${err}`));
                            return;
                        }
                        this._cmsFiles.push(tempFilePath);
                        resolve();
                    });
                })
                .catch((err) => reject(err));
        });
    }

    addCmsFileFromRawSync(contentRaw) {
        let tempFilePath = this._createTempFileSync();
        fs.writeFileSync(tempFilePath, contentRaw);
        this._cmsFiles.push(tempFilePath);
    }

    addCmsFileFromBase64(contentBase64) {
        return new Promise((resolve, reject) => {
            let raw = null;
            try {
                raw = Buffer.from(contentBase64, 'base64');
            } catch (err) {
                throw new Error('The provided data file is not Base64-encoded');
            }
            this.addCmsFileFromRaw(raw)
                .then(() => resolve())
                .catch((err) => reject(err));
        });
    }

    addCmsFileFromBase64Sync(contentBase64) {
        let raw = null;
        try {
            raw = Buffer.from(contentBase64, 'base64');
        } catch (err) {
            throw new Error('The provided data file is not Base64-encoded');
        }
        this.addCmsFileFromRawSync(raw);
    }

    // endregion

    get encapsulateContent(){
        return this.getEncapsulateContent();
    }

    getEncapsulateContent(){
        return this._encapsulateContent;
    }

    set encapsulateContent(value){
        this.setEncapsulateContent(value);
    }

    setEncapsulateContent(value){
		if (typeof (value) == "boolean") {
			this._encapsulateContent = value;
		} else {
			throw new Error('encapsulateContent is a boolean field');
		}
    }

    merge(){
        if (!this._cmsFiles || this._cmsFiles.length === 0){
            throw new Error('The CMS/CAdES files was not set');
        }
    
        if (this._cmsFiles.length < 2){
            throw new Error('Insufficient CMS/CAdES files for merging. Provided at least two signatures.');
        }
    
        if (!this._outputFilePath){
            throw new Error('The output destination was not set');
        }

        let args = [ this._outputFilePath ];
        args.push(...this._cmsFiles);
    
        if(this._dataFilePath){
            args.push('--data-file');
            args.push(this._dataFilePath);
        }
    
        if(!this._encapsulateContent){
            args.push('--detached');
        }
        this._versionManager.requireVersion('1.9');
    
        // Invoke command.
        return this._invoke(Command.MERGE_CMS, args);
    }
}

exports.CadesSignatureEditor = CadesSignatureEditor;