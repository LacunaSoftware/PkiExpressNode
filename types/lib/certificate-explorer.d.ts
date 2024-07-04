/**
 * This class represents the command to open a certificate using PKI Express.
 * You can also use it to validate a certificate and check the issuer chain.
 */
export class CertificateExplorer extends PkiExpressOperator {
    /**
     * Creates a Certificate Explorer
     *
     * @param {PkiExpressConfig} config the common configuration for the
     * command (@see PkiExpressConfig)
     */
    constructor(config: PkiExpressConfig);
    _certificatePath: any;
    _validate: boolean | null;
    _fillContent: boolean;
    _fillIssuer: any[];
    /**
     * Gets the certificate path
     * @returns {string} the path to the certificate file
     */
    get certificatePath(): string;
    /**
     * Sets the certificate file by its path asynchronously
     *
     * @param {string} path the path to the certificate
     * @returns {Promise} a promise without a content
     */
    setCertificateFromPath(path: string): Promise<any>;
    /**
     * Sets the certificate file by its path synchronously
     * @param {string} path the path to the certificate
     * @returns {Promise} a promise without a content
     */
    setCertificateFromPathSync(path: string): Promise<any>;
    /**
     * Sets the certificate file by its content asynchronously
     * @param {binary} contentRaw the content of the certificate file
     * @returns {Promise} a promise without a content
     */
    setCertificateFromRaw(contentRaw: binary): Promise<any>;
    /**
     * Sets the certificate file by its content synchronously
     * @param {binary} contentRaw the content of the certificate file
     * @returns {Promise} a promise without a content
     */
    setCertificateFromRawSync(contentRaw: binary): Promise<any>;
    /**
     * Sets the certificate file by its base64-encoded content asynchronously
     * @param {string} contentBase64 the base64-encoded content of the
     * certificate file
     * @returns {Promise} a promise without a content
     */
    setCertificateFromBase64(contentBase64: string): Promise<any>;
    /**
     * Sets the certificate file by its base64-encoded content synchronously
     * @param {string} contentBase64 the base64-encoded content of the
     * certificate file
     * @returns {Promise} a promise without a content
     */
    setCertificateFromBase64Sync(contentBase64: string): Promise<any>;
    /**
     * Sets the option that requires the CertificateExplorer to validate the
     * certificate or not
     * @param {boolean} value the option to validate the certificate
     */
    set validate(value: boolean);
    /**
     * Gets the option that requires the CertificateExplorer to validate the
     * certificate or not
     * @return {boolean} the option to validate the certificate
     */
    get validate(): boolean;
    /**
     * Sets the option that asks for PKI Express to fill the certificate's
     * "content" field
     * @param {boolean} value the option to fill the certificate's content
     */
    set fillContent(value: boolean);
    /**
     * Gets the option that tells PKI express to fill the certificate's
     * "content" field
     * @return {boolean} the option to fill the certificate's content
     */
    get fillContent(): boolean;
    /**
     * Sets the option that asks for PKI Express to fill the certificate's
     * "issuer" field with the PKCertificate representation of the certificate
     * issuer
     * @param {boolean} value the option to fill the certificate's issuer
     */
    set fillIssuer(value: boolean);
    /**
     * Gets the option that asks for PKI Express to fill the certificate's
     * "issuer" field with the PKCertificate representation of the certificate
     * issuer
     * @return {boolean} the option to fill the certificate's issuer
     */
    get fillIssuer(): boolean;
    /**
     * Reads and validates the certificate content.
     * @returns {CertificateExplorerResult} the result contains the certificate information and the
     * validation if the "--validate" option is passed (@see CertificateExplorerResult)
     */
    open(): CertificateExplorerResult;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
import { CertificateExplorerResult } from "./certificate-explorer-result";
import { PkiExpressConfig } from "./pkiexpress-config";
