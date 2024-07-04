/**
 * This class represents the result of the Certificate Explorer operation.
 * It contains the certificate and validation of this certificate.
 */
export class CertificateExplorerResult {
    constructor(model: any);
    _certificate: PKCertificate | undefined;
    _validationResults: ValidationResults | undefined;
    /**
     * Gets the read certificate (@see PKCertificate)
     * @returns {PKCertificate} the certificate
     */
    get certificate(): PKCertificate;
    /**
     * Gets the validation results (@see ValidationResults)
     * @returns {ValidationResults} the validation results
     */
    get validationResults(): ValidationResults;
}
import { PKCertificate } from "./pk-certificate";
import { ValidationResults } from "./validation";
