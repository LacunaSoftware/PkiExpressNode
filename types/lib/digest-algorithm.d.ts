export namespace DigestAlgorithms {
    let MD5: string;
    let SHA1: string;
    let SHA256: string;
    let SHA384: string;
    let SHA512: string;
}
export class DigestAlgorithm {
    static get MD5(): MD5DigestAlgorithm;
    static get SHA1(): SHA1DigestAlgorithm;
    static get SHA256(): SHA256DigestAlgorithm;
    static get SHA384(): SHA384DigestAlgorithm;
    static get SHA512(): SHA512DigestAlgorithm;
    static get _algorithms(): (MD5DigestAlgorithm | SHA1DigestAlgorithm | SHA256DigestAlgorithm | SHA384DigestAlgorithm | SHA512DigestAlgorithm)[];
    static getInstanceByName(name: any): MD5DigestAlgorithm | SHA1DigestAlgorithm | SHA256DigestAlgorithm | SHA384DigestAlgorithm | SHA512DigestAlgorithm;
    static getInstanceByOid(oid: any): MD5DigestAlgorithm | SHA1DigestAlgorithm | SHA256DigestAlgorithm | SHA384DigestAlgorithm | SHA512DigestAlgorithm;
    static getInstanceByXmlUri(xmlUri: any): MD5DigestAlgorithm | SHA1DigestAlgorithm | SHA256DigestAlgorithm | SHA384DigestAlgorithm | SHA512DigestAlgorithm;
    static getInstanceByApiModel(algorithm: any): MD5DigestAlgorithm | SHA1DigestAlgorithm | SHA256DigestAlgorithm | SHA384DigestAlgorithm | SHA512DigestAlgorithm;
    constructor(name: any, oid: any, byteLength: any, apiModel: any, xmlUri: any, cryptoHash: any);
    _name: any;
    _oid: any;
    _byteLength: any;
    _apiModel: any;
    _xmlUri: any;
    _cryptoHash: any;
    equals(instance: any): boolean;
    computeHash(content: any, output_encoding: any): any;
    checkLength(digestValue: any): void;
    set name(value: any);
    get name(): any;
    set oid(value: any);
    get oid(): any;
    set byteLength(value: any);
    get byteLength(): any;
    set apiModel(value: any);
    get apiModel(): any;
    set xmlUri(value: any);
    get xmlUri(): any;
    set cryptoHash(value: any);
    get cryptoHash(): any;
}
export class MD5DigestAlgorithm extends DigestAlgorithm {
    constructor();
}
export class SHA1DigestAlgorithm extends DigestAlgorithm {
    constructor();
}
export class SHA256DigestAlgorithm extends DigestAlgorithm {
    constructor();
}
export class SHA384DigestAlgorithm extends DigestAlgorithm {
    constructor();
}
export class SHA512DigestAlgorithm extends DigestAlgorithm {
    constructor();
}
