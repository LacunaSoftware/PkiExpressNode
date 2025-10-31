export class XmlSigner extends Signer {
    _xmlToSignPath: any;
    _toSignElementId: string | null;
    _signatureElementInsertion: any;
    setXmlToSignFromPath(xmlPath: any): Promise<any>;
    setXmlToSignFromPathSync(xmlPath: any): void;
    setXmlToSignFromRaw(contentRaw: any): Promise<any>;
    setXmlToSignFromRawSync(contentRaw: any): void;
    setXmlToSignFromBase64(contentBase64: any): Promise<any>;
    setXmlToSignFromBase64Sync(contentBase64: any): void;
    /**
     * @param {string} value
     */
    set toSignElementId(value: string);
    setSignatureElementInsertion(insertion: any): void;
    sign(getCert?: boolean): Promise<any>;
}
import { Signer } from "./signer";
