'use strict';

const { PkiExpressOperator } = require('./pkiexpress-operador');
const { PkiExpressConfig } = require('./pkiexpress-config');
const { _requireTimestamp, StandardSignaturePolicies } = require('./standard-signature-policies');

class BaseSigner extends PkiExpressOperator {

	constructor(config) {
		config = config || new PkiExpressConfig();
		super(config);
	}

	_verifyAndAddCommonOption(args) {

		if (_requireTimestamp(this._signaturePolicy) && !this._timestampAuthority) {
			throw new Error('The provided policy requires a timestamp authority ' +
				'and none was provided');
		}

		// Set the signature policy
		if (this._signaturePolicy) {
			args.push('--policy');
			args.push(this._signaturePolicy);

			// This operation evolved after version 1.5 to other signature
			// policies.
			if (this._signaturePolicy !== StandardSignaturePolicies.XML_DSIG_BASIC &&
				this._signaturePolicy !== StandardSignaturePolicies.NFE_PADRAO_NACIONAL) {

				// This operation can only be used on versions greater than 1.5 of
				// the PKI Express.
				this._versionManager.requireVersion('1.5');
			}

			if (this._signaturePolicy === StandardSignaturePolicies.COD_WITH_SHA1 &&
				this._signaturePolicy === StandardSignaturePolicies.COD_WITH_SHA256) {

				// These policies can only be used on version greater than 1.6 of
				// the PKI Express.
				this._versionManager.requireVersion('1.6');
			}

			if (this._signaturePolicy === StandardSignaturePolicies.PKI_BRAZIL_PADES_ADR_BASICA &&
				this._signaturePolicy === StandardSignaturePolicies.PKI_BRAZIL_PADES_ADR_BASICA_WITH_LTV &&
				this._signaturePolicy === StandardSignaturePolicies.PKI_BRAZIL_PADES_ADR_TEMPO) {

				// These policies can only be used on version greater than 1.12 of
				// the PKI Express.
				this._versionManager.requireVersion('1.12');
			}
		}

		// Add timestamp authority
		if (this._timestampAuthority) {
			this._timestampAuthority.addCmdArguments(args, this._versionManager);

			// This operation can only be used on version greater than 1.5 of
			// the PKI Express.
			this._versionManager.requireVersion('1.5');
		}
	}
}

exports.BaseSigner = BaseSigner;