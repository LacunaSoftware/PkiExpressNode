"use strict";

class Version {
	constructor(version) {
		if (!version) {
			throw new Error("No string version was provided");
		}

		let versions = version.split(".");
		this._internalVersions = [];
		for (let version of versions) {
			this._internalVersions.push(parseInt(version));
		}
	}

	compareTo(comparedVersion) {
		let instanceInternalVersions = this._internalVersions.slice();
		let comparedInternalVersions = comparedVersion.internalVersions.slice();

		while (
			instanceInternalVersions.length !== comparedInternalVersions.length
		) {
			if (
				instanceInternalVersions.length >
				comparedInternalVersions.length
			) {
				comparedInternalVersions.push(0);
			} else {
				instanceInternalVersions.push(0);
			}
		}

		for (let i = 0; i < instanceInternalVersions.length; i++) {
			if (instanceInternalVersions[i] > comparedInternalVersions[i]) {
				return 1;
			} else if (
				instanceInternalVersions[i] < comparedInternalVersions[i]
			) {
				return -1;
			}
		}

		return 0;
	}

	get internalVersions() {
		return this._internalVersions;
	}

	toString() {
		let str = "";
		for (let i = 0; i < this._internalVersions.length - 1; i++) {
			str += this._internalVersions[i];
			str += ".";
		}

		if (this._internalVersions.length > 0) {
			str += this._internalVersions[this._internalVersions.length - 1];
		}

		return str;
	}
}

exports.Version = Version;
