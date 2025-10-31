export class PdfHelper {
    container(): PdfContainerDefinition.Initial;
    mark(): PdfMark;
    textElement(): PdfMarkTextElement;
    imageElement(): PdfMarkImageElement;
    qrCodeElement(): PdfMarkQRCodeElement;
    textSection(text: any): PdfTextSection;
}
import PdfContainerDefinition = require("./pdf-container-definition");
import { PdfMark } from "./pdf-mark";
import { PdfMarkTextElement } from "./pdf-mark-text-element";
import { PdfMarkImageElement } from "./pdf-mark-image-element";
import { PdfMarkQRCodeElement } from "./pdf-mark-qr-code-element";
import { PdfTextSection } from "./pdf-text-section";
