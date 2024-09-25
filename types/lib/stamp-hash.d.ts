export class StampHash extends PkiExpressOperator {
    constructor(config: any, hash: any, timestampUrl: any);
    _hash: any;
    _tsaOptions: TimestampAuthority;
    set algorithm(value: any);
    get algorithm(): any;
    _algorithm: any;
    set hash(value: any);
    get hash(): any;
    get timestampAuthorityOptions(): TimestampAuthority;
    getAlgorithm(): any;
    setAlgorithm(value: any): void;
    getHash(): any;
    setHash(value: any): void;
    getTimestampAuthorityOptions(): TimestampAuthority;
    createArgs(): any[];
    stampHash(): Promise<any>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
import { TimestampAuthority } from "./timestamp-authority";
