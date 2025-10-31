export class CadesSignatureStarter extends SignatureStarter {
    _fileToSignPath: any;
    _dataFilePath: any;
    _encapsulateContent: boolean;
    setFileToSignFromPath(path: any): Promise<any>;
    setFileToSignFromPathSync(path: any): void;
    setFileToSignFromRaw(contentRaw: any): Promise<any>;
    setFileToSignFromRawSync(contentRaw: any): void;
    setFileToSignFromBase64(contentBase64: any): Promise<any>;
    setFileToSignFromBase64Sync(contentBase64: any): void;
    setDataFileFromPath(path: any): Promise<any>;
    setDataFileFromPathSync(path: any): void;
    setDataFileFromRaw(contentRaw: any): Promise<any>;
    setDataFileFromRawSync(contentRaw: any): void;
    setDataFileFromBase64(contentBase64: any): Promise<any>;
    setDataFileFromBase64Sync(contentBase64: any): void;
    start(): Promise<any>;
    set encapsulatedContent(value: boolean);
    get encapsulatedContent(): boolean;
    getEncapsulatedContent(): boolean;
    setEncapsulatedContent(value: any): void;
}
import { SignatureStarter } from "./signature-starter";
