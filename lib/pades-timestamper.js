'use strict';
const fs = require('fs');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { PkiExpressOperator } = require('./pkiexpress-operador');
const { VersionManager } = require('./version-manager');
const { Command } = require('./command');

class PadesTimestamper extends PkiExpressOperator{

    constructor(config=null){
        if (config == null){
            config = new PkiExpressConfig();
        }
        super(config);
        this._pdfPath = null;
        this._outputFilePath = null;
        this._overwriteOriginalFile = false;
        this._versionManager = new VersionManager();
    }
    
    // region getSetPdfPath

    getPdfPath(){
        return this._pdfPath;
    }

    setPdfFromPath(pdfPath) {
		if (!fs.existsSync(pdfPath)) {
			throw new Error('The provided PDF was not found');
		}
		this._pdfPath = pdfPath;
    }
    
    setPdfFromRaw(contentRaw) {
		return new Promise((resolve, reject) => {
			this._createTempFile()
				.then((tempFilePath) => {
					fs.writeFile(tempFilePath, contentRaw, (err) => {
						if (err) {
							reject(new Error(`The provided content could not been stored: ${err}`));
							return;
						}
						this._pdfPath = tempFilePath;
						resolve();
					});
				})
				.catch((err) => reject(err));
		});
    }
    
    setPdfFromBase64(contentBase64) {
		return new Promise((resolve, reject) => {

			let raw = null;
			try {
				raw = Buffer.from(contentBase64, 'base64');
			} catch (err) {
				throw new Error('The provided PDF is not Base64-encoded');
			}

			this.setPdfFromRaw(raw)
				.then(() => resolve())
				.catch((err) => reject(err));
		});
    }
    
    // endregion

    // region getSetOutputFilePath
    setOutputFilePath(value){
        this._outputFilePath = value;
    }
    
    getOutputFilePath(){
        return this._outputFilePath;
    }
    // endregion

    // region getSetOverwriteOriginalFile
    getOverwriteOriginalFile(){
        return this._overwriteOriginalFile;
    }

    setOverwriteOriginalFile(value){
        if (typeof(value) == "boolean"){
            this._overwriteOriginalFile = value;
        }else{
            throw new Error('Overwrite Original File is a boolean field');
        }
    }
    // endregion

    stamp(){
        if(this._pdfPath == null){
            throw new Error('The PDF to be timestamped was not set');
        }
        if(this._overwriteOriginalFile == false && this._outputFilePath == null){
            throw new Error('The output destination was not set');
        }

        let args = [this._pdfPath];

        // Add timestamp authority
        if(this._timestampAuthority != null){
            this._timestampAuthority.addCmdArguments(args, this._versionManager);
            
            // This option can only be used on versions greater then 1.5 of the
            // PKI Express.
            this._versionManager.requireVersion('1.5');
        }

        // Logic to overwrite original file or use the output file.
        if (this._overwriteOriginalFile){
            args.push('--overwrite');
        } else {
            args.push(this._outputFilePath);
        }

        // This operation can only be used on versions greater than 1.7 of the
        // PKI Express.
        this._versionManager.requireVersion('1.7');

        return new Promise((resolve, reject) => {
            // Invoke command.
            this._invoke(Command.STAMP_PDF, args).then((result)=>{resolve(result);}).catch((err)=>{reject(err)});
        });

    }

}

exports.PadesTimestamper = PadesTimestamper;