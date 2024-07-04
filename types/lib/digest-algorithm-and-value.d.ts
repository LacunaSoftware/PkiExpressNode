export class DigestAlgorithmAndValue {
    constructor(model: any);
    _algorithm: import("./digest-algorithm").MD5DigestAlgorithm | import("./digest-algorithm").SHA1DigestAlgorithm | import("./digest-algorithm").SHA256DigestAlgorithm | import("./digest-algorithm").SHA384DigestAlgorithm | import("./digest-algorithm").SHA512DigestAlgorithm;
    _value: any;
    set algorithm(value: import("./digest-algorithm").MD5DigestAlgorithm | import("./digest-algorithm").SHA1DigestAlgorithm | import("./digest-algorithm").SHA256DigestAlgorithm | import("./digest-algorithm").SHA384DigestAlgorithm | import("./digest-algorithm").SHA512DigestAlgorithm);
    get algorithm(): import("./digest-algorithm").MD5DigestAlgorithm | import("./digest-algorithm").SHA1DigestAlgorithm | import("./digest-algorithm").SHA256DigestAlgorithm | import("./digest-algorithm").SHA384DigestAlgorithm | import("./digest-algorithm").SHA512DigestAlgorithm;
    set value(value: any);
    get value(): any;
    set hexValue(value: any);
    get hexValue(): any;
    toModel(): {
        algorithm: any;
        value: any;
    };
}
