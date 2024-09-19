export class SignatureAlgorithmAndValue {
    constructor(model: any);
    _algorithm: import("./pk-algorithms").RSASignatureAlgorithm;
    _value: Buffer;
    set algorithm(value: import("./pk-algorithms").RSASignatureAlgorithm);
    get algorithm(): import("./pk-algorithms").RSASignatureAlgorithm;
    set value(value: Buffer);
    get value(): Buffer;
}
