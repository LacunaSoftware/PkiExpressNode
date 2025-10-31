export class PdfMarkImageElement extends PdfMarkElement {
    _image: any;
    set image(value: any);
    get image(): any;
    withImage(image: any): this;
    withImageContent(imageContent: any, mimeType: any): this;
}
import { PdfMarkElement } from "./pdf-mark-element";
