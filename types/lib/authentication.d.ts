export class Authentication extends PkiExpressOperator {
    _nonce: any;
    _certificatePath: any;
    _signature: any;
    _useExternalStorage: boolean;
    setNonce(nonceBase64: any): void;
    setCertificateFromPath(certificatePath: any): Promise<any>;
    setCertificateFromPathSync(certificatePath: any): void;
    setCertificateFromRaw(contentRaw: any): Promise<any>;
    setCertificateFromRawSync(contentRaw: any): void;
    setCertificateFromBase64(contentBase64: any): Promise<any>;
    setCertificateFromBase64Sync(contentBase64: any): void;
    setSignature(signatureBase64: any): void;
    /**
     * @param {boolean} value
     */
    set externalStorage(value: boolean);
    start(): Promise<any>;
    complete(): Promise<any>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
