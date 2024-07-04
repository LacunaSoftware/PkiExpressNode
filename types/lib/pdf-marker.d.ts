export class PdfMarker extends PkiExpressOperator {
    _measurementUnits: string;
    _pageOptimization: any;
    _marks: any[];
    _filePath: any;
    _outputFilePath: any;
    _overwriteOriginalFile: boolean;
    get file(): any;
    setFileFromPath(path: any): Promise<any>;
    setFileFromPathSync(path: any): void;
    setFileFromRaw(contentRaw: any): Promise<any>;
    setFileFromRawSync(contentRaw: any): void;
    setFileFromBase64(contentBase64: any): Promise<any>;
    setFileFromBase64Sync(contentBase64: any): void;
    set outputFile(value: any);
    get outputFile(): any;
    set measurementUnits(value: string);
    get measurementUnits(): string;
    set pageOptimization(value: any);
    get pageOptimization(): any;
    set marks(value: any[]);
    get marks(): any[];
    set overwriteOriginalFile(value: boolean);
    get overwriteOriginalFile(): boolean;
    apply(): Promise<any>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
