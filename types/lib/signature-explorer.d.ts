export class SignatureExplorer extends PkiExpressOperator {
    _signatureFilePath: any;
    _validate: any;
    get signatureFile(): any;
    setSignatureFileFromPath(path: any): Promise<any>;
    setSignatureFileFromPathSync(path: any): void;
    setSignatureFileFromRaw(contentRaw: any): Promise<any>;
    setSignatureFileFromRawSync(contentRaw: any): void;
    setSignatureFileFromBase64(contentBase64: any): Promise<any>;
    setSignatureFileFromBase64Sync(contentBase64: any): void;
    set validate(value: any);
    get validate(): any;
    _verifyAndAddCommonOption(args: any): void;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
