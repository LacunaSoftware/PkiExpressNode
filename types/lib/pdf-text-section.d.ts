export class PdfTextSection {
    constructor(text: any, color: any, fontSize: any);
    _style: string;
    _text: any;
    _fontSize: any;
    _color: any;
    set text(value: any);
    get text(): any;
    set color(value: any);
    get color(): any;
    set fontSize(value: any);
    get fontSize(): any;
    set style(value: string);
    get style(): string;
    withFontSize(fontSize: any): this;
    withText(text: any): this;
    bold(): this;
    italic(): this;
    withColor(color: any): this;
    toModel(): {
        style: string;
        text: any;
        color: any;
        fontSize: any;
    };
}
