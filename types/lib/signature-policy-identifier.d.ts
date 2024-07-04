export class SignaturePolicyIdentifier {
    constructor(model: any);
    _digest: DigestAlgorithmAndValue;
    _oid: any;
    _uri: any;
    set digest(value: DigestAlgorithmAndValue);
    get digest(): DigestAlgorithmAndValue;
    set oid(value: any);
    get oid(): any;
    set uri(value: any);
    get uri(): any;
}
import { DigestAlgorithmAndValue } from "./digest-algorithm-and-value";
