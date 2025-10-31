export class StampData extends PkiExpressOperator {
    /**
     * Creates an instance of StampData.
     *
     * @constructor
     * @param {PkiExpressConfig} config - The configuration object for PKI Express.
     */
    constructor(config: PkiExpressConfig);
    _data: string | null;
    _tsaOptions: TimestampAuthority | null;
    _algorithm: string | null;
    /**
     * Set digest algorithm value.
     *
     * @type {string}
     */
    set algorithm(value: string);
    /**
     * Digest algorithm value.
     *
     * @type {string}
     */
    get algorithm(): string;
    /**
     * Set the data to be stamped.
     *
     * @type {string}
     */
    set data(value: string);
    /**
     * Data to be stamped.
     *
     * @type {string}
     */
    get data(): string;
    /**
     * Set the timestamp authority options.
     *
     * @type {TimestampAuthority}
     */
    set timestampAuthorityOptions(value: TimestampAuthority);
    /**
     * Timestamp authority options.
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
     * Retrieves the data to be stamped.
     *
     * @returns {string} The data to be stamped.
     */
    getData(): string;
    /**
     * Sets the data to be stamped.
     *
     * @param {string} value - The data to be stamped.
     */
    setData(value: string): void;
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
     * @throws {Error} If the data to be stamped is not set.
     * @returns {string[]} The array of arguments for the stamping operation.
     */
    createArgs(): string[];
    /**
     * Executes the stamping operation with the provided arguments.
     *
     * @returns {Promise<string>} A promise that resolves with the stamping result or rejects with an error.
     */
    stampData(): Promise<string>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
import { TimestampAuthority } from "./timestamp-authority";
import { PkiExpressConfig } from "./pkiexpress-config";
