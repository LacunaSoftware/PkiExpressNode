export class PkiExpressOperator {
    static _getTransferFileName(): Promise<any>;
    static _getTransferFileNameSync(): string;
    static _parseOutput(dataBase64: any): any;
    constructor(config: any);
    _tempFiles: any[];
    _fileReferences: {};
    _config: any;
    _versionManager: VersionManager;
    _trustedRoots: any[];
    _offline: boolean;
    _trustLacunaTestRoot: boolean;
    _signaturePolicy: any;
    _timestampAuthority: any;
    _maxBuffer: any;
    _trustServiceSession: string | null;
    _timezone: string | null;
    _culture: string | null;
    disposeSync(): Promise<any>;
    _invokePlain(command: any, args: any): Promise<any>;
    _invoke(command: any, args: any, plainOutput: any): Promise<any>;
    _getPkiExpressInvocationSync(): string[];
    _createTempFile(): Promise<any>;
    _createTempFileSync(): string;
    addFileReference(alias: any, referencePath: any): Promise<any>;
    addFileReferenceSync(alias: any, referencePath: any): void;
    addTrustedRoot(rootPath: any): Promise<any>;
    addTrustedRootSync(rootPath: any): void;
    set offline(value: boolean);
    get offline(): boolean;
    set trustLacunaTestRoot(value: boolean);
    get trustLacunaTestRoot(): boolean;
    set signaturePolicy(value: any);
    get signaturePolicy(): any;
    set timestampAuthority(value: any);
    get timestampAuthority(): any;
    set maxBuffer(value: any);
    get maxBuffer(): any;
    /**
     * Gets the session data for a communication to a trust service provider.
     * This value is returned by the TrustServicesManager.completeAuth() method
     *
     * @param {string} value the session data
     */
    set trustServiceSession(value: string);
    /**
     * Gets the session data for a communication to a trust service provider.
     * This value is returned by the TrustServicesManager.completeAuth() method
     *
     * @returns {string} the session data
     */
    get trustServiceSession(): string;
    /**
     * Sets the timezone to be used for date/time operations.
     * This value should be one of the timezone IDs from the TimeZones enum
     *
     * @param {string} value the timezone ID
     */
    set timezone(value: string);
    /**
     * Gets the timezone to be used for date/time operations.
     * This value should be one of the timezone IDs from the TimeZones enum
     *
     * @returns {string} the timezone ID
     */
    get timezone(): string;
    /**
     * Sets the culture to be used for date formatting.
     * Examples: "pt-BR", "en-US", "es-ES", etc.
     * The system's culture is used by default if not set.
     *
     * @param {string} value the culture ID
     */
    set culture(value: string);
    /**
     * Gets the culture to be used for date formatting.
     * The system's culture is used by default if not set.
     *
     * @returns {string} the culture ID
     */
    get culture(): string;
}
import { VersionManager } from "./version-manager";
