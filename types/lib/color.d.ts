export class Color {
    static fromRGB(red: any, green: any, blue: any): Color;
    static fromRGBA(red: any, green: any, blue: any, alpha: any): Color;
    static get TRANSPARENT(): Color;
    static get WHITE(): Color;
    static get LIGHT_GRAY(): Color;
    static get GRAY(): Color;
    static get DARK_GRAY(): Color;
    static get BLACK(): Color;
    static get RED(): Color;
    static get PINK(): Color;
    static get ORANGE(): Color;
    static get YELLOW(): Color;
    static get GREEN(): Color;
    static get MAGENTA(): Color;
    static get CYAN(): Color;
    static get BLUE(): Color;
    constructor(red: any, green: any, blue: any, alpha: any);
    _red: any;
    _green: any;
    _blue: any;
    _alpha: any;
    set red(value: any);
    get red(): any;
    set green(value: any);
    get green(): any;
    set blue(value: any);
    get blue(): any;
    set alpha(value: any);
    get alpha(): any;
    toModel(): {
        alpha: number;
        red: any;
        green: any;
        blue: any;
    };
}
