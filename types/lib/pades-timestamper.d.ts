export class PadesTimestamper extends PkiExpressOperator {
    _pdfPath: any;
    _outputFilePath: any;
    _overwriteOriginalFile: boolean;
    _vrJsonPath: any;
    set pdfPath(value: any);
    get pdfPath(): any;
    getPdfPath(): any;
    setPdfFromPath(pdfPath: any): Promise<any>;
    setPdfFromPathSync(pdfPath: any): void;
    setPdfFromRaw(contentRaw: any): Promise<any>;
    set pdfContentRaw(contentRaw: any);
    setPdfFromRawSync(contentRaw: any): void;
    setPdfFromBase64(contentBase64: any): Promise<any>;
    set pdfContentBase64(contentBase64: any);
    setPdfFromBase64Sync(contentBase64: any): void;
    set outputFilePath(value: any);
    get outputFilePath(): any;
    getOutputFilePath(): any;
    setOutputFilePath(value: any): void;
    set overwriteOriginalFile(value: boolean);
    get overwriteOriginalFile(): boolean;
    getOverwriteOriginalFile(): boolean;
    setOverwriteOriginalFile(value: any): void;
    setVisualRepresentation(representation: any): Promise<any>;
    setVisualRepresentationSync(representation: any): void;
    stamp(): Promise<any>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
