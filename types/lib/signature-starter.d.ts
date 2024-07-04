export class SignatureStarter extends BaseSigner {
    static _getResult(response: any, transferFile: any): {
        toSignHash: any;
        digestAlgorithm: any;
        digestAlgorithmOid: any;
        transferFile: any;
    };
    _certificatePath: any;
    setCertificateFromPath(certificatePath: any): Promise<any>;
    setCertificateFromPathSync(certificatePath: any): void;
    setCertificateFromRaw(contentRaw: any): Promise<any>;
    setCertificateFromRawSync(contentRaw: any): void;
    setCertificateFromBase64(contentBase64: any): Promise<any>;
    setCertificateFromBase64Sync(contentBase64: any): void;
    start(): void;
}
import { BaseSigner } from "./base-signer";
