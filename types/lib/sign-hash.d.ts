export class SignHash extends PkiExpressOperator {
    /**
     * @param {PkiExpressConfig} config
     */
    constructor(config: PkiExpressConfig);
    _toSignHash: string;
    _digestAlgorithm: string;
    _pkcs12Path: string;
    _certThumb: string;
    _certPassword: string;
    _keyName: string;
    _certFilePath: string;
    set toSignHash(value: string);
    get toSignHash(): string;
    set digestAlgorithm(value: string);
    get digestAlgorithm(): string;
    get pkcs12(): string;
    set certThumb(value: string);
    get certThumb(): string;
    set certPassword(value: string);
    get certPassword(): string;
    set keyName(value: string);
    get keyName(): string;
    get certFilePath(): string;
    sign(): Promise<any>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
import { PkiExpressConfig } from "./pkiexpress-config";
