export class Pkcs12Certificate {
    constructor({ pfx }: {
        pfx: any;
    });
    _content: Buffer | null;
    getContentRaw(): Buffer | null;
    set contentRaw(value: Buffer | null);
    get contentRaw(): Buffer | null;
    setContentRaw(value: any): void;
    getContentBase64(): string | null;
    set contentBase64(value: string | null);
    get contentBase64(): string | null;
    setContentBase64(value: any): void;
    writeToFile(path: any): Promise<any>;
    writeToFileSync(path: any): void;
}
