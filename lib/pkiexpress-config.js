'use strict';
const fs = require('fs');
const os = require('os');

class PkiExpressConfig {

   constructor(pkiExpressHome, tempFolder, transferDataFolder) {
      pkiExpressHome = pkiExpressHome || null;
      tempFolder = tempFolder || null;
      transferDataFolder = transferDataFolder || null;

      if (tempFolder) {
         try {
            fs.accessSync(tempFolder, fs.constants.F_OK);
            this._tempFolder = tempFolder;
         } catch (err) {
            this._tempFolder = os.tmpdir();
         }
      } else {
         this._tempFolder = os.tmpdir();
      }

      if (transferDataFolder) {
         try {
            fs.accessSync(transferDataFolder, fs.constants.F_OK);
            this._transferDataFolder = transferDataFolder;
         } catch (err) {
            this._transferDataFolder = this._tempFolder;
         }
      } else {
         this._transferDataFolder = this._tempFolder;
      }

      this._pkiExpressHome = pkiExpressHome;
   }

   get pkiExpressHome() {
      return this._pkiExpressHome;
   }

   get tempFolder() {
      return this._tempFolder;
   }

   get transferDataFolder() {
      return this._transferDataFolder;
   }
}

exports.PkiExpressConfig = PkiExpressConfig;