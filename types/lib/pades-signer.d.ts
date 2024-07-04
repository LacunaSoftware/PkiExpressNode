export class PadesSigner extends Signer {
    _pdfToSignPath: any;
    _vrJsonPath: any;
    _overwriteOriginalFile: boolean;
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
    set suppressDefaultVisualRep(value: boolean);
    get suppressDefaultVisualRep(): boolean;
    set reason(value: any);
    get reason(): any;
    sign(getCert?: boolean): Promise<any>;
    set overwriteOriginalFile(value: boolean);
    get overwriteOriginalFile(): boolean;
    set customSignatureFieldName(value: any);
    get customSignatureFieldName(): any;
    set certificationLevel(value: any);
    get certificationLevel(): any;
}
import { Signer } from "./signer";
