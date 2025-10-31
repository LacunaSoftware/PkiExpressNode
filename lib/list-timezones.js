const { PkiExpressConfig } = require("./pkiexpress-config");
const { PkiExpressOperator } = require("./pkiexpress-operator");
const { Command } = require("./command");
const { TimezoneListResult } = require("./timezone-models");

class ListTimezones extends PkiExpressOperator {
	/**
	 * @param {PkiExpressConfig} config
	*/
	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);
	}

	/**
	 * Lists all available timezones supported by PKI Express.
	 * This command does not require any additional parameters.
	 *
	 * @returns {Promise<TimezoneListResult>} A promise that resolves to the structured timezone list
	 */
	list() {
		// Invoke command with no additional arguments
		return new Promise((resolve, reject) => {
			this._invoke(Command.LIST_TIMEZONES, [])
				.then((response) => {
					// The response contains the list of timezones as base64-encoded JSON
					let result = response[0];
					
					// Decode base64 and parse the JSON
					try {
						// Decode base64 to string
						const decodedString = Buffer.from(result, 'base64').toString('utf8');
						
						// Parse the JSON and create structured result
						const jsonData = JSON.parse(decodedString);
						const timezoneList = TimezoneListResult.fromJson(jsonData);
						resolve(timezoneList);
					} catch (error) {
						reject(new Error(`Failed to decode or parse timezone data: ${error.message}`));
					}
				})
				.catch((err) => reject(err));
		});
	}
}

exports.ListTimezones = ListTimezones; 