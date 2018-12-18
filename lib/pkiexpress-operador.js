'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const tmp = require('tmp');
const crypto = require('crypto');
const { exec } = require('child_process');

const { InstallationNotFoundError } = require('./installation-not-found-error');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { VersionManager } = require('./version-manager');
const { Version } = require('./version');
const { _shellEscape } = require('./escape');

class PkiExpressOperator {

	constructor(config) {
		config = config || new PkiExpressConfig();
		this._tempFiles = [];
		this._fileReferences = {};

		this._config = config;
		this._versionManager = new VersionManager();
		this._trustedRoots = [];
		this._offline = false;
		this._trustLacunaTestRoot = false;
		this._signaturePolicy = null;
		this._timestampAuthority = null;
	}

	disposeSync() {
		return new Promise(resolve => {
			for (let tempFile of this._tempFiles) {
				if (fs.existsSync(tempFile)) {
					try {
						fs.unlinkSync(tempFile);
					} catch (err) {
						// TODO: log
					}
				}
			}
			resolve();
		});
	}

	_invokePlain(command, args) {
		args = args || [];
		return this._invoke(command, args, true);
	}

	_invoke(command, args, plainOutput) {
		args = args || [];
		plainOutput = plainOutput || false;

		// Add PKI Express invocation arguments
		let cmdArgs = [];
		for (let invocationArgs of this._getPkiExpressInvocationSync()) {
			cmdArgs.push(invocationArgs);
		}

		// Add PKI Express command
		cmdArgs.push(command);

		// Add PKI Express arguments
		cmdArgs.push(...args);

		// Add file reference if added.
		if (this._fileReferences) {
			for (let key in this._fileReferences) {
				if (this._fileReferences.hasOwnProperty(key)) {
					cmdArgs.push('--file-reference');
					cmdArgs.push(`${key}=${this._fileReferences[key]}`);
				}
			}
		}

		// Add trusted roots if added.
		if (this._trustedRoots && this._trustedRoots.length > 0) {
			for (let trustedRoot of this._trustedRoots) {
				cmdArgs.push('--trust-root');
				cmdArgs.push(trustedRoot);
			}
		}

		// Add trust Lacuna test root if set
		if (this._trustLacunaTestRoot) {
			cmdArgs.push('--trust-test');
		}

		// Add offline option if provided
		if (this._offline) {
			cmdArgs.push('--offline');
			// This option can only be used on versions greater than 1.2 of the
			// PKI Express
			this._versionManager.requireVersion('1.2');
		}

		// Add base64 output option
		if (!plainOutput) {
			cmdArgs.push('--base64');
		}

		// Verify the necessity of using the --min-version flag.
		if (this._versionManager.requireMinVersionFlag()) {
			cmdArgs.push('--min-version');
			cmdArgs.push(this._versionManager.minVersion.toString());
		}

		// Perform the "dotnet" command
		return new Promise((resolve, reject) => {
			exec(_shellEscape(cmdArgs), (err, stdout) => {
				if (err) {
					if (err.code === 1 && this._versionManager.minVersion > new Version('1.0')) {
						reject(new Error(`${stdout.split(os.EOL)} ${os.EOL}  ` +
							'>>>>> TIP: This operation requires PKI Express ' +
							`${this._versionManager.minVersion}, please check your ` +
							'PKI Express version.'));
						return;
					} else if (err.code === 127) {
						throw new InstallationNotFoundError('Could not find PKI Express\'s installation.', err);
					}

					reject(new Error(`${stdout.split(os.EOL)}`));
					return;
				}

				resolve(stdout.split(os.EOL));
			});
		});
	}

	_getPkiExpressInvocationSync() {

		// Identify OS
		let system = null;
		if (os.platform() === 'linux') {
			system = 'linux';
		} else if (os.platform() === 'win32') {
			system = 'win';
		} else {
			throw new Error(`Unsupported OS: ${os.platform()}`);
		}

		// Verify if the PKI Express home is set on configuration
		let home = this._config.pkiExpressHome;
		if (home) {

			if (system === 'linux') {
				if (!fs.existsSync(path.join(home, 'pkie.dll'))) {
					throw new InstallationNotFoundError(`The file pkie.dll could not be found on directory ${home}`);
				}
			} else if (!fs.existsSync(path.join(home, 'pki.exe'))) {
				throw new InstallationNotFoundError(`The file pki.exe could not be found on directory ${home}`);
			}

		} else if (system === 'win') {

			if (fs.existsSync(path.join(process.env.ProgramW6432, 'Lacuna Software', 'PKI Express', 'pkie.exe'))) {
				home = path.join(process.env.ProgramW6432, 'Lacuna Software', 'PKI Express');
			} else if (fs.existsSync(path.join(process.env['ProgramFiles(x86)'], 'Lacuna Software', 'PKI Express', 'pkie.exe'))) {
				home = path.join(process.env['ProgramFiles(x86)'], 'Lacuna Software', 'PKI Express');
			} else if (fs.existsSync(path.join(process.env.LOCALAPPDATA, 'Lacuna Software', 'PKI Express', 'pkie.exe'))) {
				home = path.join(process.env.LOCALAPPDATA, 'Lacuna Software', 'PKI Express');
			} else if (fs.existsSync(path.join(process.env.LOCALAPPDATA, 'Lacuna Software (x86)', 'PKI Express', 'pkie.exe'))) {
				home = path.join(process.env.LOCALAPPDATA, 'Lacuna Software (x86)', 'PKI Express');
			}

			if (!home) {
				throw new InstallationNotFoundError('Could not determine the ' +
					'installation folder of PKI Express. If you installed ' +
					'PKI Express on a custom folder, make sure your chosen ' +
					'folder are specified it on the PkiExpressConfig object');
			}
		}

		if (system === 'linux') {

			if (home) {
				return ['dotnet', path.join(home, 'pkie.dll')];
			}

			return ['pkie'];
		}

		return [path.join(home, 'pkie.exe')];
	}

	// region _createTempFile

	_createTempFile() {
		return new Promise((resolve, reject) => {
			tmp.file({
				discardDescriptor: true,
				detachDescriptor: false,
				prefix: 'pkie',
				dir: this._config.tempFolder
			}, (err, tempFilePath) => {
				if (err) {
					reject(new Error(`Could not create temporary file: ${err}`));
					return;
				}
				this._tempFiles.push(tempFilePath);
				resolve(tempFilePath);
			});
		});
	}

	_createTempFileSync() {
		let tempFile = tmp.fileSync({
			discardDescriptor: true,
			detachDescriptor: false,
			prefix: 'pkie',
			dir: this._config.tempFolder
		});
		this._tempFiles.push(tempFile.name);
		return tempFile.name;
	}

	// endregion

	// region _getTransferFileName

	static _getTransferFileName() {

		let sizeBuffer = 16;
		return new Promise((resolve, reject) => {

			crypto.randomBytes(sizeBuffer, (err, rndBuffer) => {
				if (err) {
					reject(new Error(`Could not generate transfer file's name: ${err}`));
					return;
				}
				resolve(rndBuffer.toString('hex'));
			});
		});
	}

	static _getTransferFileNameSync() {
		let sizeBuffer = 16;
		let rndBuffer = crypto.randomBytes(sizeBuffer);
		return rndBuffer.toString('hex');
	}

	// endregion

	static _parseOutput(dataBase64) {
		let buf = new Buffer(dataBase64, 'base64');
		return JSON.parse(buf.toString());
	}

	// region addFileReference

	addFileReference(alias, referencePath) {

		return new Promise((resolve, reject) => {

			if (!referencePath) {
				reject(new Error('The provided file path is not valid'));
			}

			fs.access(referencePath, fs.constants.F_OK, (err) => {
				if (err) {
					reject(new Error('The provided file was not found'));
					return;
				}
				this._fileReferences[alias] = referencePath;
				resolve();
			});
		});
	}

	addFileReferenceSync(alias, referencePath) {

		if (!referencePath || !fs.existsSync(referencePath)) {
			throw new Error('The provided file reference\' path is not valid');
		}

		this._fileReferences[alias] = referencePath;
	}

	// endregion

	// region addTrustedRoot

	addTrustedRoot(rootPath) {
		return new Promise((resolve, reject) => {

			if (!rootPath) {
				throw new Error('The provided trusted root path is not valid');
			}

			fs.access(rootPath, fs.constants.F_OK, (err) => {
				if (err) {
					throw new Error(`The provided trusted root path doesn't exist: ${rootPath}`);
				}
				this._trustedRoots.push(rootPath);
				resolve();
			});
		});
	}

	addTrustedRootSync(rootPath) {

		if (!rootPath) {
			throw new Error('The provided trusted root path is not valid');
		}

		if (!fs.existsSync(rootPath)) {
			throw new Error(`The provided trusted root path doesn't exist: ${rootPath}`);
		}

		this._trustedRoots.push(rootPath);
	}

	// endregion

	get offline() {
		return this._offline;
	}

	set offline(value) {
		this._offline = value;
	}

	get trustLacunaTestRoot() {
		return this._trustLacunaTestRoot;
	}

	set trustLacunaTestRoot(value) {
		this._trustLacunaTestRoot = value;
	}

	get signaturePolicy() {
		return this._signaturePolicy;
	}

	set signaturePolicy(value) {
		this._signaturePolicy = value;
	}

	get timestampAuthority() {
		return this._timestampAuthority;
	}

	set timestampAuthority(value) {
		this._timestampAuthority = value;
	}
}

exports.PkiExpressOperator = PkiExpressOperator;