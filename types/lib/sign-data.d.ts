export class SignData extends PkiExpressOperator {
    /**
     * @param {PkiExpressConfig} config
    */
    constructor(config: PkiExpressConfig, certStoreOptions: any);
    _toSignData: string;
    _digestAlgorithm: string;
    _certStoreOptions: CertificateStoreOptions;
    set toSignData(value: string);
    get toSignData(): string;
    getToSignData(): string;
    setToSignData(value: any): void;
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
