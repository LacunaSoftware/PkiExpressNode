export class StampData extends PkiExpressOperator {
    constructor(config: any, data: any, timestampUrl: any);
    _data: any;
    _tsaOptions: TimestampAuthority;
    set algorithm(value: any);
    get algorithm(): any;
    _algorithm: any;
    set data(value: any);
    get data(): any;
    get timestampAuthorityOptions(): TimestampAuthority;
    getAlgorithm(): any;
    setAlgorithm(value: any): void;
    getData(): any;
    setData(value: any): void;
    getTimestampAuthorityOptions(): TimestampAuthority;
    createArgs(): any[];
    stampData(): Promise<any>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
import { TimestampAuthority } from "./timestamp-authority";
