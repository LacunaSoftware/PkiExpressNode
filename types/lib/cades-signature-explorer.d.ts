export class CadesSignatureExplorer extends SignatureExplorer {
    _dataFilePath: any;
    _extractContentPath: any;
    get dataFilePath(): any;
    getDataFilePath(): any;
    setDataFileFromPath(path: any): Promise<any>;
    setDataFileFromPathSync(path: any): void;
    setDataFileFromRaw(contentRaw: any): Promise<any>;
    setDataFileFromRawSync(contentRaw: any): void;
    setDataFileFromBase64(contentBase64: any): Promise<any>;
    setDataFileFromBase64Sync(contentBase64: any): void;
    set extractContentPath(value: any);
    get extractContentPath(): any;
    getExtractContentPath(): any;
    setExtractContentPath(value: any): void;
    open(): Promise<any>;
}
import { SignatureExplorer } from "./signature-explorer";
