'use strict';

const { Version } = require('./version');

class VersionManager {

   constructor() {
      this._minVersion = new Version('0.0');
   }

   requireVersion(minVersionCandidate) {
      let candidate = new Version(minVersionCandidate);
      if (candidate.compareTo(this._minVersion) > 0) {
         this._minVersion = candidate;
      }
   }

   requireMinVersionFlag() {
      return this._minVersion.compareTo(new Version('1.3')) > 0;
   }

   get minVersion() {
      return this._minVersion;
   }
}

exports.VersionManager = VersionManager;