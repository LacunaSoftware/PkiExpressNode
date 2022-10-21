const { PKCertificate } = require("./pk-certificate");
const { ValidationResults } = require("./validation");

/**
 * This class represents the result of the Certificate Explorer operation.
 * It contains the certificate and validation of this certificate.
 */
class CertificateExplorerResult {
	constructor(model) {
		if (model["info"]) {
			this._certificate = new PKCertificate(model["info"]);
		}
		if (model["validationResults"]) {
			this._validationResults = new ValidationResults(
				model["validationResults"]
			);
		}
	}

	/**
	 * Gets the read certificate (@see PKCertificate)
	 * @returns {PKCertificate} the certificate
	 */
	get certificate() {
		return this._certificate;
	}

	/**
	 * Gets the validation results (@see ValidationResults)
	 * @returns {ValidationResults} the validation results
	 */
	get validationResults() {
		return this._validationResults;
	}
}

exports.CertificateExplorerResult = CertificateExplorerResult;
