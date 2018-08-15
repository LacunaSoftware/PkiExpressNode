'use strict';

const StandardSignaturePolicies = {
	PKI_BRAZIL_CADES_ADR_BASICA: 'adrb',
	PKI_BRAZIL_CADES_ADR_BASICA_WITH_REVOCATION_VALUE: 'adrb-rv',
	PKI_BRAZIL_CADES_ADR_TEMPO: 'adrt',
	PKI_BRAZIL_CADES_ADR_COMPLETA: 'adrc',
	CADES_BES: 'cades',
	CADES_BES_WITH_REVOCATION_VALUES: 'cades-rv',
	CADES_T: 'cades-t',

	PADES_BASIC: 'pades',
	PADES_BASIC_WITH_LTV: 'pades-ltv',
	PADES_T: 'pades-t',

	NFE_PADRAO_NACIONAL: 'nfe',
	XADES_BES: 'xades',
	XML_DSIG_BASIC: 'basic',
	PKI_BRAZIL_XML_ADR_BASICA: 'adrb',
	PKI_BRAZIL_XML_ADR_TEMPO: 'adrt',
	COD_WITH_SHA1: 'cod-sha1',
	COD_WITH_SHA256: 'cod-sh256'

};

const _requireTimestamp = function(policy) {
	if (!policy) {
		return false;
	}

	return policy === StandardSignaturePolicies.PKI_BRAZIL_CADES_ADR_TEMPO ||
		policy === StandardSignaturePolicies.PKI_BRAZIL_CADES_ADR_COMPLETA ||
		policy === StandardSignaturePolicies.CADES_T ||
		policy === StandardSignaturePolicies.PADES_T ||
		policy === StandardSignaturePolicies.PKI_BRAZIL_XML_ADR_TEMPO;
};

exports.StandardSignaturePolicies = StandardSignaturePolicies;
exports._requireTimestamp = _requireTimestamp;