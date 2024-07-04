export class PadesSignatureStarter extends SignatureStarter {
    _pdfToSignPath: any;
    _vrJsonPath: any;
    _customSignatureFieldName: any;
    _suppressDefaultVisualRep: boolean;
    _certificationLevel: any;
    _reason: any;
    setPdfToSignFromPath(pdfPath: any): Promise<any>;
    setPdfToSignFromPathSync(pdfPath: any): void;
    setPdfToSignFromRaw(contentRaw: any): Promise<any>;
    setPdfToSignFromRawSync(contentRaw: any): void;
    setPdfToSignFromBase64(contentBase64: any): Promise<any>;
    setPdfToSignFromBase64Sync(contentBase64: any): void;
    setVisualRepresentationFile(vrPath: any): Promise<any>;
    setVisualRepresentationFileSync(vrPath: any): void;
    setVisualRepresentation(representation: any): Promise<any>;
    setVisualRepresentationSync(representation: any): void;
    set customSignatureFieldName(value: any);
    get customSignatureFieldName(): any;
    set certificationLevel(value: any);
    get certificationLevel(): any;
    set reason(value: any);
    get reason(): any;
    set suppressDefaultVisualRep(value: boolean);
    get suppressDefaultVisualRep(): boolean;
    start(): Promise<any>;
}
import { SignatureStarter } from "./signature-starter";
