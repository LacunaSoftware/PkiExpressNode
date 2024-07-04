export class Pkcs12Certificate {
    constructor({ pfx }: {
        pfx: any;
    });
    _content: any;
    getContentRaw(): any;
    set contentRaw(value: any);
    get contentRaw(): any;
    setContentRaw(value: any): void;
    getContentBase64(): any;
    set contentBase64(value: any);
    get contentBase64(): any;
    setContentBase64(value: any): void;
    writeToFile(path: any): Promise<any>;
    writeToFileSync(path: any): void;
}
