export class CadesSignature {
    /**
     * Creates a CAdES signature from a model provided by PKI Express.
     * @param {Object} model
     */
    constructor(model: Object);
    _encapsulatedContentType: any;
    _hasEncapsulatedContent: any;
    _signers: CadesSignerInfo[];
    set encapsulatedContentType(value: any);
    get encapsulatedContentType(): any;
    set hasEncapsulatedContent(value: any);
    get hasEncapsulatedContent(): any;
    set signers(value: CadesSignerInfo[]);
    get signers(): CadesSignerInfo[];
}
export class CadesTimestamp extends CadesSignature {
    constructor(model: any);
    _genTime: any;
    _serialNumber: any;
    _messageImprint: DigestAlgorithmAndValue;
    set genTime(value: any);
    get genTime(): any;
    set serialNumber(value: any);
    get serialNumber(): any;
    get messageImprint(): DigestAlgorithmAndValue;
    set messagaImprint(value: any);
}
export class CadesSignerInfo {
    constructor(model: any);
    _signingTime: any;
    _certifiedDateReference: any;
    _messageDigest: DigestAlgorithmAndValue | undefined;
    _signature: SignatureAlgorithmAndValue | undefined;
    _certificate: PKCertificate | undefined;
    _signaturePolicy: SignaturePolicyIdentifier | undefined;
    _timestamps: CadesTimestamp[];
    _validationResults: ValidationResults | undefined;
    set messageDigest(value: DigestAlgorithmAndValue | undefined);
    get messageDigest(): DigestAlgorithmAndValue | undefined;
    set signature(value: SignatureAlgorithmAndValue | undefined);
    get signature(): SignatureAlgorithmAndValue | undefined;
    set certificate(value: PKCertificate | undefined);
    get certificate(): PKCertificate | undefined;
    set signingTime(value: any);
    get signingTime(): any;
    set certifiedDateReference(value: any);
    get certifiedDateReference(): any;
    set signaturePolicy(value: SignaturePolicyIdentifier | undefined);
    get signaturePolicy(): SignaturePolicyIdentifier | undefined;
    set timestamps(value: CadesTimestamp[]);
    get timestamps(): CadesTimestamp[];
    set validationResults(value: ValidationResults | undefined);
    get validationResults(): ValidationResults | undefined;
}
import { DigestAlgorithmAndValue } from "./digest-algorithm-and-value";
import { SignatureAlgorithmAndValue } from "./signature-algorithm-and-value";
import { PKCertificate } from "./pk-certificate";
import { SignaturePolicyIdentifier } from "./signature-policy-identifier";
import { ValidationResults } from "./validation";
