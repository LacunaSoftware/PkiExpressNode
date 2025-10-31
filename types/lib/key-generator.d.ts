export const SupportedKeySizes: string[];
export class KeyGenerationResult {
    constructor(model: any);
    _key: any;
    _csr: any;
    getKey(): any;
    set key(value: any);
    get key(): any;
    setKey(value: any): void;
    getCsr(): any;
    set csr(value: any);
    get csr(): any;
    setCsr(value: any): void;
}
export class KeyGenerator extends PkiExpressOperator {
    constructor({ keySize, keyFormat, genCsr, config }?: {
        keySize: any;
        keyFormat: any;
        genCsr: any;
        config: any;
    });
    _keySize: any;
    _keyFormat: any;
    _genCsr: any;
    getKeySize(): any;
    set keySize(value: any);
    get keySize(): any;
    setKeySize(value: any): void;
    getKeyFormat(): any;
    set keyFormat(value: any);
    get keyFormat(): any;
    setKeyFormat(value: any): void;
    isGenCsr(): any;
    set genCsr(value: any);
    get genCsr(): any;
    setGenCsr(value: any): void;
    generate(keyFormat: any): Promise<any>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
