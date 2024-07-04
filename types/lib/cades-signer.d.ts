export class CadesSigner extends Signer {
    _fileToSignPath: any;
    _dataFilePath: any;
    _encapsulatedContent: boolean;
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
    set outputFilePath(path: any);
    get outputFilePath(): any;
    getOutputFilePath(): any;
    setOutputFilePath(path: any): void;
    sign(getCert: any): Promise<any>;
}
import { Signer } from "./signer";
