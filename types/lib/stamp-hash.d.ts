/**
 * Class representing a stamp hash command.
 *
 * @class StampHash
 * @extends {PkiExpressOperator}
 */
export class StampHash extends PkiExpressOperator {
    /**
     * Creates an instance of StampHash.
     *
     * @constructor
     * @param {PkiExpressConfig} config - The configuration object for PKI Express.
     */
    constructor(config: PkiExpressConfig);
    _hash: string | null;
    _tsaOptions: TimestampAuthority | null;
    _algorithm: string | null;
    /**
     * Sets the digest algorithm value.
     *
     * @type {string}
     */
    set algorithm(value: string);
    /**
     * Gets the digest algorithm value.
     *
     * @type {string}
     */
    get algorithm(): string;
    /**
     * Sets the Base-64 encoded hash value to be stamped.
     *
     * @type {string}
     */
    set hash(value: string);
    /**
     * Gets the Base-64 encoded hash value to be stamped.
     *
     * @type {string}
     */
    get hash(): string;
    /**
     * Sets the timestamp authority options.
     *
     * @type {TimestampAuthority}
     */
    set timestampAuthorityOptions(value: TimestampAuthority);
    /**
     * Gets the timestamp authority options.
     *
     * @type {TimestampAuthority}
     */
    get timestampAuthorityOptions(): TimestampAuthority;
    /**
     * Retrieves the digest algorithm value.
     *
     * @returns {string} The digest algorithm value.
     */
    getAlgorithm(): string;
    /**
     * Sets the digest algorithm value.
     *
     * @param {string} value - The digest algorithm to be used.
     */
    setAlgorithm(value: string): void;
    /**
     * Retrieves the Base-64 encoded hash value to be stamped.
     *
     * @returns {string} The hash value to be stamped.
     */
    getHash(): string;
    /**
     * Sets the Base-64 encoded hash value to be stamped.
     *
     * @param {string} value - The hash value to be stamped.
     */
    setHash(value: string): void;
    /**
     * Retrieves the timestamp authority options.
     *
     * @returns {TimestampAuthority} The timestamp authority options.
     */
    getTimestampAuthorityOptions(): TimestampAuthority;
    /**
     * Sets the timestamp authority options.
     *
     * @param {TimestampAuthority} value - The timestamp authority options.
     */
    setTimestampAuthorityOptions(value: TimestampAuthority): void;
    /**
     * Creates an array of arguments for the stamping operation.
     *
     * @throws {Error} If the hash to be stamped is not set.
     * @returns {string[]} The array of arguments for the stamping operation.
     */
    createArgs(): string[];
    /**
     * Executes the stamp-hash command with the provided arguments.
     *
     * @returns {Promise<*>} A promise that resolves with the stamping result or rejects with an error.
     */
    stampHash(): Promise<any>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
import { TimestampAuthority } from "./timestamp-authority";
import { PkiExpressConfig } from "./pkiexpress-config";
