export class PdfMark {
    _container: any;
    _borderWidth: number;
    _borderColor: Color;
    _backgroundColor: Color;
    _elements: any[];
    _pageOption: string;
    _pageOptionNumber: any;
    set container(value: any);
    get container(): any;
    set borderWidth(value: number);
    get borderWidth(): number;
    set borderColor(value: Color);
    get borderColor(): Color;
    set backgroundColor(value: Color);
    get backgroundColor(): Color;
    set elements(value: any[]);
    get elements(): any[];
    set pageOption(value: string);
    get pageOption(): string;
    set pageOptionNumber(value: any);
    get pageOptionNumber(): any;
    onContainer(container: any): this;
    withBorderWidth(borderWidth: any): this;
    onAllPages(): this;
    onNewPage(): this;
    onSinglePage(): this;
    onSinglePageFromEnd(): this;
    addElement(element: any): this;
    withBorderColor(borderColor: any): this;
    withBackgroundColor(backgroundColor: any): this;
    toModel(): {
        container: any;
        backgroundColor: {
            alpha: number;
            red: any;
            green: any;
            blue: any;
        } | null;
        borderColor: {
            alpha: number;
            red: any;
            green: any;
            blue: any;
        } | null;
        borderWidth: number;
        pageOption: string;
        pageOptionNumber: any;
        elements: never[];
    };
}
import { Color } from "./color";
