export class Initial {
    _container: PadesVisualRectangle;
    width(value: any): FixedWidth;
    varWidth(): VarWidth;
    fullWidth(): WidthDefined;
    height(value: any): FixedHeight;
    varHeight(): VarHeight;
    fullHeight(): HeightDefined;
    varWidthAndHeight(): VarWidthAndHeight;
    full(): PadesVisualRectangle;
}
export class FixedWidth {
    constructor(container: any);
    _container: any;
    anchorLeft(margin: any): WidthDefined;
    anchorRight(margin: any): WidthDefined;
    center(): WidthDefined;
}
export class VarWidth {
    constructor(container: any);
    _container: any;
    margins(leftMargin: any, rightMargin: any): WidthDefined;
}
export class FixedHeight {
    constructor(container: any);
    _container: any;
    anchorTop(margin: any): HeightDefined;
    anchorBottom(margin: any): HeightDefined;
    center(): HeightDefined;
}
export class VarHeight {
    constructor(container: any);
    _container: any;
    margins(topMargin: any, bottomMargin: any): HeightDefined;
}
export class WidthDefined {
    constructor(container: any);
    _container: any;
    height(value: any): WidthDefinedFixedHeight;
    varHeight(): WidthDefinedVarHeight;
    fullHeight(): any;
}
export class HeightDefined {
    constructor(container: any);
    _container: any;
    width(value: any): HeightDefinedFixedWidth;
    varWidth(): HeightDefinedVarWidth;
    fullWidth(): any;
}
export class WidthDefinedFixedHeight {
    constructor(container: any);
    _container: any;
    anchorTop(margin: any): any;
    anchorBottom(margin: any): any;
    center(): any;
}
export class WidthDefinedVarHeight {
    constructor(container: any);
    _container: any;
    margins(topMargin: any, bottomMargin: any): any;
}
export class HeightDefinedFixedWidth {
    constructor(container: any);
    _container: any;
    anchorLeft(margin: any): any;
    anchorRight(margin: any): any;
    center(): any;
}
export class HeightDefinedVarWidth {
    constructor(container: any);
    _container: any;
    margins(leftMargin: any, rightMargin: any): any;
}
export class VarWidthAndHeight {
    constructor(container: any);
    _container: any;
    margins(topMargin: any, rightMargin: any, bottomMargin: any, leftMargin: any): any;
}
import { PadesVisualRectangle } from "./pades-visual-rectangle";
