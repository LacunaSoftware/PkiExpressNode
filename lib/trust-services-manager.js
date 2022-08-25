'use strict';
const { CheckServiceResult } = require('./check-service-result.js');
const { DiscoverServicesResult } = require('./discover-services-result');
const { TrustServiceSessionResult } = require('./trust-service-session-result');
const { StartServiceAuthResult } = require('./start-service-auth-result.js');
const { GetServiceAuthResult } = require('./get-service-auth-result.js');
const { TrustServiceSessionTypes } = require('./trust-service-session-types.js');
const { SessionType } = require('./enums.js');
const { PkiExpressOperator } = require('./pkiexpress-operator');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { Command } = require('./command');

class TrustServicesManager extends PkiExpressOperator {
	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);
	}
	
	// Check if the given CPF exists on the given trusted services.
	checkByCpf(service, cpf) {
		if(!service){
			throw new Error('The provided service is not valid');
		}
		if(!cpf){
			throw new Error('The provided CPF is not valid');
		}

		let args = [ service, '--cpf', cpf ];

		// This operation can only be used on versions 
		// greater than 1.18 of the PKI Express.
		this._versionManager.requireVersion('1.18');

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.CHECK_SERVICE, args)
				.then(response => {
					// Parse output and return model.
					let output = TrustServicesManager._parseOutput(response[0]);
					let result = new CheckServiceResult(output);
					resolve(result);
				})
				.catch(err => reject(err));
		});
	}
	
	// Check if the given CNPJ exists on the given trusted services.
	checkByCnpj(service, cnpj) {
		if(!service){
			throw new Error('The provided service is not valid');
		}
		if(!cnpj){
			throw new Error('The provided CNPJ is not valid');
		}
		
		let args = [ service, '--cnpj', cnpj ];

		// This operation can only be used on versions 
		// greater than 1.18 of the PKI Express.
		this._versionManager.requireVersion('1.18');

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.CHECK_SERVICE, args)
				.then(response => {
					// Parse output and return model.
					let output = TrustServicesManager._parseOutput(response[0]);
					let result = new CheckServiceResult(output);
					resolve(result);
				})
				.catch(err => reject(err));
		});
	}

	// Search in all configured trusted services to find 
	// those that have a certificate that contains the 
	// provided CPF.
	discoverByCpf(cpf, throwExceptions=false) {
		if(!cpf){
			throw new Error('The provided CPF is not valid');
		}

		let args = ['--cpf', cpf];

		if(throwExceptions){
			args.push('--throw');
		}

		// This operation can only be used on versions 
		// greater than 1.18 of the PKI Express.
		this._versionManager.requireVersion('1.18');

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.DISCOVER_SERVICES, args)
				.then(response => {
					// Parse output and return model.
					let output = TrustServicesManager._parseOutput(response[0]);
					let result = new DiscoverServicesResult(output);
					resolve(result.services);
				})
				.catch(err => reject(err));
		});
	}
	
	// Search in all configured trusted services to find 
	// those that have a certificate that contains the 
	// provided CNPJ.
	discoverByCnpj(cnpj, throwExceptions=false) {
		if(!cnpj){
			throw new Error('The provided CNPJ is not valid');
		}

		let args = ['--cnpj', cnpj];

		if(throwExceptions){
			args.push('--throw');
		}

		// This operation can only be used on versions 
		// greater than 1.18 of the PKI Express.
		this._versionManager.requireVersion('1.18');

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.DISCOVER_SERVICES, args)
				.then(response => {
					// Parse output and return model.
					let output = TrustServicesManager._parseOutput(response[0]);
					let result = new DiscoverServicesResult(output);
					resolve(result.services);
				})
				.catch(err => reject(err));
		});
	}

	// Search in all configured trusted services to find 
	// those that have a certificate that contains the 
	// provided CPF and start the authentication.
	discoverByCpfAndStartAuth(
		cpf,
		redirectUrl, 
		sessionType=TrustServiceSessionTypes.SIGNATURE_SESSION, 
		customState=null, 
		throwExceptions=false) 
	{
		if (!cpf){
			throw new Error('The provided CPF is not valid');
		}
		if (!redirectUrl){
			throw new Error('The provided redirectUrl is not valid');
		}
		if (!sessionType){
			throw new Error('No session type was provided');
		}

		let args = [
			'--cpf', cpf, 
			'--redirect-url', redirectUrl, 
			'--session-type', sessionType,
			'--custom-state', customState
		];

		if(throwExceptions){
			args.push('--throw');
		}
		
		// This operation can only be used on versions 
		// greater than 1.18 of the PKI Express.
		this._versionManager.requireVersion('1.18');

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.DISCOVER_SERVICES, args)
				.then(response => {
					// Parse output and return model.
					let output = TrustServicesManager._parseOutput(response[0]);
					let result = new DiscoverServicesResult(output);
					resolve(result.authParameters);
				})
				.catch(err => reject(err));
		});
	}

	// Search in all configured trusted services to find 
	// those that have a certificate that contains the 
	// provided CNPJ and start the authentication.
	discoverByCnpjAndStartAuth(
		cnpj,
		redirectUrl, 
		sessionType=TrustServiceSessionTypes.SIGNATURE_SESSION, 
		customState=null, 
		throwExceptions=false) 
	{
		if (!cnpj){
			throw new Error('The provided CNPJ is not valid');
		}
		if (!redirectUrl){
			throw new Error('The provided redirectUrl is not valid');
		}
		if (!sessionType){
			throw new Error('No session type was provided');
		}

		let args = [
			'--cnpj', cnpj, 
			'--redirect-url', redirectUrl, 
			'--session-type', sessionType,
			'--custom-state', customState
		];

		if(throwExceptions){
			args.push('--throw');
		}
		
		// This operation can only be used on versions 
		// greater than 1.18 of the PKI Express.
		this._versionManager.requireVersion('1.18');

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.DISCOVER_SERVICES, args)
			.then(response => {
				// Parse output and return model.
				let output = TrustServicesManager._parseOutput(response[0]);
				let result = new DiscoverServicesResult(output);
				resolve(result.authParameters);
			})
			.catch(err => reject(err));
		});
	}

/** Start the authentication with all configured trusted service
 *
 * @param {string} redirectUrl
 *
 *
 * @param {SessionType} sessionType @see TrustServiceSessionTypes
 *
 * @param {string} sessionLifetime
 *
 * @param {string} customState
 *
 * @returns {StartServiceAuthResult}
 */
	startAuth(
		redirectUrl,
		sessionType = TrustServiceSessionTypes.SIGNATURE_SESSION,
		sessionLifetime = null,
		customState = null
		)
		{
		if (!redirectUrl){
			throw new Error('No redirectUrl was provided');
		}

		let args = [
			redirectUrl,
		];

	    if(sessionType){
				args.push('--session-type');
				args.push(sessionType);
			}
		if(sessionLifetime){
			args.push('--session-lifetime');
			args.push(sessionLifetime);
			}
		if(customState){
				args.push('--custom-state');
				args.push(customState);
			}

		// This operation can only be used on versions
		// greater than 1.18 of the PKI Express.
		this._versionManager.requireVersion('1.28');

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.START_SERVICE_AUTH, args)
				.then(response => {
					// Parse output and return model.
					let output = TrustServicesManager._parseOutput(response[0]);
					let result = new StartServiceAuthResult(output);
					resolve(result);
				})
				.catch(err => reject(err));
		});

	}

/**
 * Get the current state
 *
 *  @param {string} state
 *  @returns {GetServiceAuthResult}
 */
	getCustomState(state)
		{
		if (!state){
			throw new Error('The provided state is not valid');
		}

		let args = [
			state,
		]

	    return new Promise((resolve, reject) => {
			this._invoke(Command.GET_SERVICE_AUTH, args)
				.then(response => {
					let output = GetServiceAuthResult._parseOutput(response[0]);
					let result = new GetServiceAuthResult(output);
					resolve(result);
				})
				.catch(err => reject(err));
		});
	}

	// Authorize the session on the given service using the
	// given username and password.
	passwordAuthorize(
		service, 
		username, 
		password, 
		sessionType=TrustServiceSessionTypes.SIGNATURE_SESSION
	){
		if (!service){
			throw new Error('The provided service is not valid');
		}
		if (!username){
			throw new Error('The provided username is not valid');
		}
		if (!password){
			throw new Error('The provided password is not valid');
		}
		if (!sessionType){
			throw new Error('No session type was provided');
		}

		let args = [service, username, password, sessionType];
				
		// This operation can only be used on versions 
		// greater than 1.18 of the PKI Express.
		this._versionManager.requireVersion('1.18');

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.PASSWORD_AUTHORIZE, args)
				.then(response => {
					// Parse output and return model.
					let output = TrustServicesManager._parseOutput(response[0]);
					let result = new TrustServiceSessionResult(output);
					resolve(result);
				})
				.catch(err => reject(err));
		});
	}

	// Complete the authorization with the trusted service.
	completeAuth(code, state){
		if (!code){
			throw new Error('The provided code is not valid');
		}
		if (!state){
			throw new Error('The provided state is not valid');
		}

		let args = [code, state];

		// This operation can only be used on versions 
		// greater than 1.18 of the PKI Express.
		this._versionManager.requireVersion('1.18');

		// Invoke command.
		return new Promise((resolve, reject) => {
			this._invoke(Command.COMPLETE_SERVICE_AUTH, args)
				.then(response => {
					// Parse output and return model.
					let output = TrustServicesManager._parseOutput(response[0]);
					let result = new TrustServiceSessionResult(output);
					resolve(result);
				})
				.catch(err => reject(err));
		});
	}
}

exports.TrustServicesManager = TrustServicesManager;