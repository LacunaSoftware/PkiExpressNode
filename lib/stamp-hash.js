const { TimestampAuthority } = require("./timestamp-authority");
const { PkiExpressConfig } = require("./pkiexpress-config");
const { Command } = require("./command");
const { PkiExpressOperator } = require("./pkiexpress-operator");

/**
 * Class representing a stamp hash command.
 *
 * @class StampHash
 * @extends {PkiExpressOperator}
 */
class StampHash extends PkiExpressOperator {
    /**
     * Creates an instance of StampHash.
     *
     * @constructor
     * @param {PkiExpressConfig} config - The configuration object for PKI Express.
     */
    constructor(config) {
        config = config || new PkiExpressConfig();
        super(config);
        this._hash = null;
        this._tsaOptions = null;
        this._algorithm = null;
    }

    /**
     * Gets the digest algorithm value.
     *
     * @type {string}
     */
    get algorithm() {
        return this._algorithm;
    }

    /**
     * Sets the digest algorithm value.
     *
     * @type {string}
     */
    set algorithm(value) {
        this._algorithm = value;
    }

    /**
     * Gets the Base-64 encoded hash value to be stamped.
     *
     * @type {string}
     */
    get hash() {
        return this._hash;
    }

    /**
     * Sets the Base-64 encoded hash value to be stamped.
     *
     * @type {string}
     */
    set hash(value) {
        this._hash = value;
    }

    /**
     * Gets the timestamp authority options.
     *
     * @type {TimestampAuthority}
     */
    get timestampAuthorityOptions() {
        return this._tsaOptions;
    }

    /**
     * Sets the timestamp authority options.
     *
     * @type {TimestampAuthority}
     */
    set timestampAuthorityOptions(value) {
        this._tsaOptions = value;
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
     * Retrieves the Base-64 encoded hash value to be stamped.
     *
     * @returns {string} The hash value to be stamped.
     */
    getHash() {
        return this._hash;
    }

    /**
     * Sets the Base-64 encoded hash value to be stamped.
     *
     * @param {string} value - The hash value to be stamped.
     */
    setHash(value) {
        this._hash = value;
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
     * @throws {Error} If the hash to be stamped is not set.
     * @returns {string[]} The array of arguments for the stamping operation.
     */
    createArgs() {
        if (!this._hash) {
            throw new Error("The hash to be stamped cannot be null");
        }

        let args = [this._hash];

        // If omitted, the algorithm is inferred from the size of the hash.
        if (this._algorithm) {
            args.push("--algorithm");
            args.push(this._algorithm);
        }

        this.timestampAuthorityOptions.addCmdArguments(args); // Use getter directly
        return args;
    }

    /**
     * Executes the stamp-hash command with the provided arguments.
     *
     * @returns {Promise<*>} A promise that resolves with the stamping result or rejects with an error.
     */
    stampHash() {
        let args = this.createArgs();
        // Invoke command.
        return new Promise((resolve, reject) => {
            this._invoke(Command.STAMP_HASH, args)
                .then((response) => {
                    let result = response[0];
                    resolve(result);
                })
                .catch((err) => reject(err));
        });
    }
}

exports.StampHash = StampHash;