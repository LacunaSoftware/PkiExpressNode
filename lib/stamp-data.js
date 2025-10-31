const { TimestampAuthority } = require("./timestamp-authority");
const { PkiExpressConfig } = require("./pkiexpress-config");
const { Command } = require("./command");
const { PkiExpressOperator } = require("./pkiexpress-operator");

class StampData extends PkiExpressOperator {
    /**
     * Creates an instance of StampData.
     *
     * @constructor
     * @param {PkiExpressConfig} config - The configuration object for PKI Express.
     */
    constructor(config) {
        config = config || new PkiExpressConfig();
        super(config);
        this._data = null;
        this._tsaOptions = null; // Ensure consistency in internal field naming
        this._algorithm = null;
    }

    /**
     * Digest algorithm value.
     *
     * @type {string}
     */
    get algorithm() {
        return this._algorithm;
    }

    /**
     * Set digest algorithm value.
     *
     * @type {string}
     */
    set algorithm(value) {
        this._algorithm = value;
    }

    /**
     * Data to be stamped.
     *
     * @type {string}
     */
    get data() {
        return this._data;
    }

    /**
     * Set the data to be stamped.
     *
     * @type {string}
     */
    set data(value) {
        this._data = value;
    }

    /**
     * Set the timestamp authority options.
     *
     * @type {TimestampAuthority}
     */
    set timestampAuthorityOptions(value) {
        this._tsaOptions = value;
    }
    
    /**
     * Timestamp authority options.
     *
     * @type {TimestampAuthority}
     */
    get timestampAuthorityOptions() {
        return this._tsaOptions;
    }

     /**
     * Retrieves the digest algorithm value.
     *
     * @returns {string} The digest algorithm value.
     */
     getAlgorithm() {
        return this._algorithm;
    }

    /**
     * Sets the digest algorithm value.
     *
     * @param {string} value - The digest algorithm to be used.
     */
    setAlgorithm(value) {
        this._algorithm = value;
    }

    /**
     * Retrieves the data to be stamped.
     *
     * @returns {string} The data to be stamped.
     */
    getData() {
        return this._data;
    }

    /**
     * Sets the data to be stamped.
     *
     * @param {string} value - The data to be stamped.
     */
    setData(value) {
        this._data = value;
    }

    /**
     * Retrieves the timestamp authority options.
     *
     * @returns {TimestampAuthority} The timestamp authority options.
     */
    getTimestampAuthorityOptions() {
        return this._tsaOptions;
    }

    /**
     * Sets the timestamp authority options.
     *
     * @param {TimestampAuthority} value - The timestamp authority options.
     */
    setTimestampAuthorityOptions(value) {
        this._tsaOptions = value;
    }

    /**
     * Creates an array of arguments for the stamping operation.
     *
     * @throws {Error} If the data to be stamped is not set.
     * @returns {string[]} The array of arguments for the stamping operation.
     */
    createArgs() {
        if (!this._data) {
            throw new Error("The hash to be stamped cannot be null");
        }

        let args = [this._data];

        // If omitted, the algorithm is inferred from the size of the hash.
        if (this._algorithm) {
            args.push("--algorithm");
            args.push(this._algorithm);
        }

        this.timestampAuthorityOptions.addCmdArguments(args); // Use getter directly
        return args;
    }

    /**
     * Executes the stamping operation with the provided arguments.
     *
     * @returns {Promise<string>} A promise that resolves with the stamping result or rejects with an error.
     */
    stampData() {
        let args = this.createArgs();
        // Invoke command.
        return new Promise((resolve, reject) => {
            this._invoke(Command.STAMP_DATA, args)
                .then((response) => {
                    let result = response[0];
                    resolve(result);
                })
                .catch((err) => reject(err));
        });
    }
}

exports.StampData = StampData;
