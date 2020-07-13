'use strict';

const KeyFormats = {
	JSON: 'json',
	BLOB: 'blob',
	XML: 'xml'
};

// PAdES certification levels
const PadesCertificationLevels = {
	NOT_CERTIFIED: 'NotCertified',
	CERTIFIED_FORM_FILLING: 'CertifiedFormFilling',
	CERTIFIED_FORM_FILLING_AND_ANNOTATIONS: 'CertifiedFormFillingAndAnnotations',
	CERTIFIED_NO_CHANGES_ALLOWED: 'CertifiedNoChangesAllowed',
};
 
exports.PadesCertificationLevels = PadesCertificationLevels;
exports.KeyFormats = KeyFormats;