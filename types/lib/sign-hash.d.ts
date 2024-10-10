export class SignHash extends PkiExpressOperator {
    /**
     * @param {PkiExpressConfig} config
     */
    constructor(config: PkiExpressConfig, certificateStoreOptions: any);
    _toSignHash: string;
    _digestAlgorithm: string;
    _certStoreOptions: CertificateStoreOptions;
    set toSignHash(value: string);
    get toSignHash(): string;
    getToSignHash(): string;
    setToSignHash(value: any): void;
    set digestAlgorithm(value: string);
    get digestAlgorithm(): string;
    getDigestAlgorithm(): string;
    setDigestAlgorithm(value: any): void;
    set certificateStoreOptions(value: CertificateStoreOptions);
    get certificateStoreOptions(): CertificateStoreOptions;
    getCertificateStoreOptions(): CertificateStoreOptions;
    setCertificateStoreOptions(value: any): void;
    sign(): Promise<any>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
import { CertificateStoreOptions } from "./certificate-store-options";
import { PkiExpressConfig } from "./pkiexpress-config";
