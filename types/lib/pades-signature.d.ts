export class PadesSignature {
    constructor(model: any);
    _signers: PadesSignerInfo[];
    set signers(value: PadesSignerInfo[]);
    get signers(): PadesSignerInfo[];
}
import { PadesSignerInfo } from "./pades-signer-info";
