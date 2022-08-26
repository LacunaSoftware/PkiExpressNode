'use strict';

const KeyFormats = {
	JSON: 'json',
	BLOB: 'blob',
	XML: 'xml',
};

// PAdES certification levels
const PadesCertificationLevels = {
	NOT_CERTIFIED: 'not-certified',
	CERTIFIED_FORM_FILLING: 'certified-form-filling',
	CERTIFIED_FORM_FILLING_AND_ANNOTATIONS:
		'certified-form-filling-annotations',
	CERTIFIED_NO_CHANGES_ALLOWED: 'certified-no-changes-allowed',
};

const XmlElementInsertions = {
	APPEND_CHILD: 'append-child',
	PREPEND_CHILD: 'prepend-child',
	APPEND_SIBLING: 'append-sibling',
	PREPEND_SIBLING: 'prepend-sibling',
};

exports.PadesCertificationLevels = PadesCertificationLevels;
exports.KeyFormats = KeyFormats;
exports.XmlElementInsertions = XmlElementInsertions;
