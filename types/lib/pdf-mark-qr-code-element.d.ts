export class PdfMarkQRCodeElement extends PdfMarkElement {
    _qrCodeData: any;
    _drawQuietZones: boolean;
    set qrCodeData(value: any);
    get qrCodeData(): any;
    withQRCodeData(qrCodeData: any): this;
    drawQuietZones(): this;
}
import { PdfMarkElement } from "./pdf-mark-element";
