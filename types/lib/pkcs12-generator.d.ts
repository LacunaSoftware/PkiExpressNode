export class Pkcs12GenerationResult {
    constructor({ pfx }: {
        pfx: any;
    });
    _pfx: Pkcs12Certificate | null;
    getPfx(): Pkcs12Certificate | null;
    set pfx(value: Pkcs12Certificate | null);
    get pfx(): Pkcs12Certificate | null;
    setPfx(value: any): void;
}
export class Pkcs12Generator extends PkiExpressOperator {
    constructor({ key, certFilePath, password, config }?: {
        key: any;
        certFilePath: any;
        password: any;
        config: any;
    });
    _key: any;
    _certFilePath: any;
    _password: any;
    getKey(): any;
    set key(value: any);
    get key(): any;
    setKey(value: any): void;
    getPassword(): any;
    set password(value: any);
    get password(): any;
    setPassword(value: any): void;
    getCertFilePath(): any;
    get certFilePath(): any;
    setCertFileFromPath(path: any): Promise<any>;
    setCertFileFromPathSync(path: any): void;
    setCertFileFromRaw(contentRaw: any): Promise<any>;
    setCertFileFromRawSync(contentRaw: any): void;
    setCertFileFromBase64(contentBase64: any): Promise<any>;
    setCertFileFromBase64Sync(contentBase64: any): void;
    generate(password: any): Promise<any>;
}
import { Pkcs12Certificate } from "./pkcs12-certificate";
import { PkiExpressOperator } from "./pkiexpress-operator";
