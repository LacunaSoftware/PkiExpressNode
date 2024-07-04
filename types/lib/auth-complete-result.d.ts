export class AuthCompleteResult {
    constructor(model: any);
    certificate: PKCertificate | undefined;
    validationResults: ValidationResults | undefined;
}
import { PKCertificate } from "./pk-certificate";
import { ValidationResults } from "./validation";
