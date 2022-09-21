"use strict";
const { AuthCompleteResult } = require("./auth-complete-result");
const { AuthStartResult } = require("./auth-start-result");
const { Authentication } = require("./authentication");
const { BaseSigner } = require("./base-signer");
const {
	CadesSignature,
	CadesTimestamp,
	CadesSignerInfo,
} = require("./cades-signature");
const { CadesSignatureEditor } = require("./cades-signature-editor");
const { CadesSignatureExplorer } = require("./cades-signature-explorer");
const { CadesSignatureStarter } = require("./cades-signature-starter");
const { CadesSigner } = require("./cades-signer");
const { CheckServiceResult } = require("./check-service-result");
const { Color } = require("./color");
const {
	DigestAlgorithms,
	DigestAlgorithm,
	MD5DigestAlgorithm,
	SHA1DigestAlgorithm,
	SHA256DigestAlgorithm,
	SHA384DigestAlgorithm,
	SHA512DigestAlgorithm,
} = require("./digest-algorithm");
const { DigestAlgorithmAndValue } = require("./digest-algorithm-and-value");
const { DiscoverServicesResult } = require("./discover-services-result");
const { ErrorCodes } = require("./error-codes");
const {
	KeyFormats,
	PadesCertificationLevels,
	XmlElementInsertions,
} = require("./enums");
const { InstallationNotFoundError } = require("./installation-not-found-error");
const { KeyGenerator, KeyGenerationResult } = require("./key-generator");
const { Oids } = require("./oids");
const { PadesHorizontalAlign } = require("./pades-horizontal-align");
const { PadesMeasurementUnits } = require("./pades-measurement-units");
const { PadesSignature } = require("./pades-signature");
const { PadesSignatureExplorer } = require("./pades-signature-explorer");
const { PadesSignatureStarter } = require("./pades-signature-starter");
const { PadesSigner } = require("./pades-signer");
const { PadesVerticalAlign } = require("./pades-vertical-align");
const { PadesVisualRectangle } = require("./pades-visual-rectangle");
const {
	Initial,
	FixedWidth,
	VarWidth,
	FixedHeight,
	VarHeight,
	WidthDefined,
	HeightDefined,
	WidthDefinedFixedHeight,
	WidthDefinedVarHeight,
	HeightDefinedFixedWidth,
	HeightDefinedVarWidth,
	VarWidthAndHeight,
} = require("./pdf-container-definition");
const { PadesTimestamper } = require("./pades-timestamper");
const { PdfHelper } = require("./pdf-helper");
const { PdfMark } = require("./pdf-mark");
const { PdfMarkElement } = require("./pdf-mark-element");
const { PdfMarkElementType } = require("./pdf-mark-element-type");
const { PdfMarkImage } = require("./pdf-mark-image");
const { PdfMarkImageElement } = require("./pdf-mark-image-element");
const { PdfMarkPageOptions } = require("./pdf-mark-page-options");
const { PdfMarkQRCodeElement } = require("./pdf-mark-qr-code-element");
const { PdfMarkTextElement } = require("./pdf-mark-text-element");
const { PdfMarker } = require("./pdf-marker");
const { PdfTextSection } = require("./pdf-text-section");
const { PdfTextStyle } = require("./pdf-text-style");
const {
	PKAlgorithms,
	SignatureAlgorithms,
	SignatureAlgorithm,
	RSASignatureAlgorithm,
	RSAPKAlgorithm,
	PKAlgorithm,
} = require("./pk-algorithms");
const {
	PKCertificate,
	PkiBrazilCertificateFields,
	PkiItalyCertificateFields,
	PkiArgentinaCertificateFields,
	PkiEcuadorCertificateFields,
	PkiParaguayCertificateFields,
	PkiPeruCertificateFields,
	CertificatePolicy,
	CertificatePolicyQualifier,
	Name,
} = require("./pk-certificate");
const { Pkcs12Certificate } = require("./pkcs12-certificate");
const {
	Pkcs12Generator,
	Pkcs12GenerationResult,
} = require("./pkcs12-generator");
const { PkiExpressConfig } = require("./pkiexpress-config");
const { PkiExpressOperator } = require("./pkiexpress-operator");
const {
	ResourceContentOrReference,
} = require("./resource-content-or-reference");
const {
	SignatureAlgorithmAndValue,
} = require("./signature-algorithm-and-value");
const { SignatureExplorer } = require("./signature-explorer");
const { SignatureFinisher } = require("./signature-finisher");
const { SignaturePolicyIdentifier } = require("./signature-policy-identifier");
const { SignatureStarter } = require("./signature-starter");
const { Signer } = require("./signer");
const { StandardSignaturePolicies } = require("./standard-signature-policies");
const { TimestampAuthority } = require("./timestamp-authority");
const {
	TimestampAuthorityAuthType,
} = require("./timestamp-authority-auth-type");
const {
	TrustServiceAuthParameters,
} = require("./trust-service-auth-parameters");
const { TrustServiceInfo } = require("./trust-service-info");
const { TrustServiceNameModel } = require("./trust-service-name-model");
const { TrustServiceSessionResult } = require("./trust-service-session-result");
const { TrustServiceSessionTypes } = require("./trust-service-session-types");
const { TrustServicesManager } = require("./trust-services-manager");
const { ValidationError } = require("./validation-error");
const { ValidationResults, ValidationItem } = require("./validation");
const { XmlSignatureStarter } = require("./xml-signature-starter");
const { XmlSigner } = require("./xml-signer");

exports.AuthCompleteResult = AuthCompleteResult;
exports.AuthStartResult = AuthStartResult;
exports.Authentication = Authentication;
exports.BaseSigner = BaseSigner;
exports.CadesSignature = CadesSignature;
exports.CadesTimestamp = CadesTimestamp;
exports.CadesSignatureEditor = CadesSignatureEditor;
exports.CadesSignatureExplorer = CadesSignatureExplorer;
exports.CadesSignatureStarter = CadesSignatureStarter;
exports.CadesSigner = CadesSigner;
exports.CadesSignerInfo = CadesSignerInfo;
exports.CheckServiceResult = CheckServiceResult;
exports.Color = Color;
exports.DigestAlgorithms = DigestAlgorithms;
exports.DigestAlgorithm = DigestAlgorithm;
exports.MD5DigestAlgorithm = MD5DigestAlgorithm;
exports.SHA1DigestAlgorithm = SHA1DigestAlgorithm;
exports.SHA256DigestAlgorithm = SHA256DigestAlgorithm;
exports.SHA384DigestAlgorithm = SHA384DigestAlgorithm;
exports.SHA512DigestAlgorithm = SHA512DigestAlgorithm;
exports.DigestAlgorithmAndValue = DigestAlgorithmAndValue;
exports.DiscoverServicesResult = DiscoverServicesResult;
exports.ErrorCodes = ErrorCodes;
exports.KeyFormats = KeyFormats;
exports.PadesCertificationLevels = PadesCertificationLevels;
exports.XmlElementInsertions = XmlElementInsertions;
exports.InstallationNotFoundError = InstallationNotFoundError;
exports.KeyGenerator = KeyGenerator;
exports.KeyGenerationResult = KeyGenerationResult;
exports.Oids = Oids;
exports.PadesHorizontalAlign = PadesHorizontalAlign;
exports.PadesMeasurementUnits = PadesMeasurementUnits;
exports.PadesSignature = PadesSignature;
exports.PadesSignatureExplorer = PadesSignatureExplorer;
exports.PadesSignatureStarter = PadesSignatureStarter;
exports.PadesVerticalAlign = PadesVerticalAlign;
exports.PadesVisualRectangle = PadesVisualRectangle;
exports.Initial = Initial;
exports.FixedWidth = FixedWidth;
exports.VarWidth = VarWidth;
exports.FixedHeight = FixedHeight;
exports.VarHeight = VarHeight;
exports.WidthDefined = WidthDefined;
exports.HeightDefined = HeightDefined;
exports.WidthDefinedFixedHeight = WidthDefinedFixedHeight;
exports.WidthDefinedVarHeight = WidthDefinedVarHeight;
exports.HeightDefinedFixedWidth = HeightDefinedFixedWidth;
exports.HeightDefinedVarWidth = HeightDefinedVarWidth;
exports.VarWidthAndHeight = VarWidthAndHeight;
exports.PadesTimestamper = PadesTimestamper;
exports.PdfHelper = PdfHelper;
exports.PdfMark = PdfMark;
exports.PdfMarkElement = PdfMarkElement;
exports.PdfMarkElementType = PdfMarkElementType;
exports.PdfMarkImage = PdfMarkImage;
exports.PdfMarkImageElement = PdfMarkImageElement;
exports.PdfMarkPageOptions = PdfMarkPageOptions;
exports.PdfMarkQRCodeElement = PdfMarkQRCodeElement;
exports.PdfMarkTextElement = PdfMarkTextElement;
exports.PdfMarker = PdfMarker;
exports.PdfTextSection = PdfTextSection;
exports.PdfTextStyle = PdfTextStyle;
exports.PKAlgorithms = PKAlgorithms;
exports.SignatureAlgorithms = SignatureAlgorithms;
exports.SignatureAlgorithm = SignatureAlgorithm;
exports.RSASignatureAlgorithm = RSASignatureAlgorithm;
exports.RSAPKAlgorithm = RSAPKAlgorithm;
exports.PKAlgorithm = PKAlgorithm;
exports.PKCertificate = PKCertificate;
exports.Pkcs12Certificate = Pkcs12Certificate;
exports.PkiBrazilCertificateFields = PkiBrazilCertificateFields;
exports.PkiItalyCertificateFields = PkiItalyCertificateFields;
exports.PkiArgentinaCertificateFields = PkiArgentinaCertificateFields;
exports.PkiEcuadorCertificateFields = PkiEcuadorCertificateFields;
exports.PkiParaguayCertificateFields = PkiParaguayCertificateFields;
exports.PkiPeruCertificateFields = PkiPeruCertificateFields;
exports.CertificatePolicy = CertificatePolicy;
exports.CertificatePolicyQualifier = CertificatePolicyQualifier;
exports.Name = Name;
exports.Pkcs12Generator = Pkcs12Generator;
exports.Pkcs12GenerationResult = Pkcs12GenerationResult;
exports.PadesSigner = PadesSigner;
exports.PkiExpressConfig = PkiExpressConfig;
exports.PkiExpressOperator = PkiExpressOperator;
exports.ResourceContentOrReference = ResourceContentOrReference;
exports.SignatureAlgorithmAndValue = SignatureAlgorithmAndValue;
exports.SignatureExplorer = SignatureExplorer;
exports.SignaturePolicyIdentifier = SignaturePolicyIdentifier;
exports.SignatureFinisher = SignatureFinisher;
exports.SignatureStarter = SignatureStarter;
exports.Signer = Signer;
exports.StandardSignaturePolicies = StandardSignaturePolicies;
exports.TimestampAuthority = TimestampAuthority;
exports.TimestampAuthorityAuthType = TimestampAuthorityAuthType;
exports.TrustServiceAuthParameters = TrustServiceAuthParameters;
exports.TrustServiceInfo = TrustServiceInfo;
exports.TrustServiceNameModel = TrustServiceNameModel;
exports.TrustServiceSessionResult = TrustServiceSessionResult;
exports.TrustServiceSessionTypes = TrustServiceSessionTypes;
exports.TrustServicesManager = TrustServicesManager;
exports.ValidationError = ValidationError;
exports.ValidationResults = ValidationResults;
exports.ValidationItem = ValidationItem;
exports.XmlSignatureStarter = XmlSignatureStarter;
exports.XmlSigner = XmlSigner;
