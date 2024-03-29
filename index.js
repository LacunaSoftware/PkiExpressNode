"use strict";
const { AuthCompleteResult } = require("./lib/auth-complete-result");
const { AuthStartResult } = require("./lib/auth-start-result");
const { Authentication } = require("./lib/authentication");
const { BaseSigner } = require("./lib/base-signer");
const {
	CadesSignature,
	CadesTimestamp,
	CadesSignerInfo,
} = require("./lib/cades-signature");
const { CadesSignatureEditor } = require("./lib/cades-signature-editor");
const { CadesSignatureExplorer } = require("./lib/cades-signature-explorer");
const { CadesSignatureStarter } = require("./lib/cades-signature-starter");
const { CadesSigner } = require("./lib/cades-signer");
const { CertificateExplorer } = require("./lib/certificate-explorer");
const {
	CertificateExplorerResult,
} = require("./lib/certificate-explorer-result");
const { CheckServiceResult } = require("./lib/check-service-result");
const { Color } = require("./lib/color");
const {
	DigestAlgorithms,
	DigestAlgorithm,
	MD5DigestAlgorithm,
	SHA1DigestAlgorithm,
	SHA256DigestAlgorithm,
	SHA384DigestAlgorithm,
	SHA512DigestAlgorithm,
} = require("./lib/digest-algorithm");
const { DigestAlgorithmAndValue } = require("./lib/digest-algorithm-and-value");
const { DiscoverServicesResult } = require("./lib/discover-services-result");
const { ErrorCodes } = require("./lib/error-codes");
const {
	KeyFormats,
	PadesCertificationLevels,
	XmlElementInsertions,
} = require("./lib/enums");
const {
	InstallationNotFoundError,
} = require("./lib/installation-not-found-error");
const { KeyGenerator, KeyGenerationResult } = require("./lib/key-generator");
const { Oids } = require("./lib/oids");
const { PadesHorizontalAlign } = require("./lib/pades-horizontal-align");
const { PadesMeasurementUnits } = require("./lib/pades-measurement-units");
const { PadesSignature } = require("./lib/pades-signature");
const { PadesSignatureExplorer } = require("./lib/pades-signature-explorer");
const { PadesSignatureStarter } = require("./lib/pades-signature-starter");
const { PadesSigner } = require("./lib/pades-signer");
const { PadesVerticalAlign } = require("./lib/pades-vertical-align");
const { PadesVisualRectangle } = require("./lib/pades-visual-rectangle");
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
} = require("./lib/pdf-container-definition");
const { PadesTimestamper } = require("./lib/pades-timestamper");
const { PdfHelper } = require("./lib/pdf-helper");
const { PdfMark } = require("./lib/pdf-mark");
const { PdfMarkElement } = require("./lib/pdf-mark-element");
const { PdfMarkElementType } = require("./lib/pdf-mark-element-type");
const { PdfMarkImage } = require("./lib/pdf-mark-image");
const { PdfMarkImageElement } = require("./lib/pdf-mark-image-element");
const { PdfMarkPageOptions } = require("./lib/pdf-mark-page-options");
const { PdfMarkQRCodeElement } = require("./lib/pdf-mark-qr-code-element");
const { PdfMarkTextElement } = require("./lib/pdf-mark-text-element");
const { PdfMarker } = require("./lib/pdf-marker");
const { PdfTextSection } = require("./lib/pdf-text-section");
const { PdfTextStyle } = require("./lib/pdf-text-style");
const {
	PKAlgorithms,
	SignatureAlgorithms,
	SignatureAlgorithm,
	RSASignatureAlgorithm,
	RSAPKAlgorithm,
	PKAlgorithm,
} = require("./lib/pk-algorithms");
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
} = require("./lib/pk-certificate");
const { Pkcs12Certificate } = require("./lib/pkcs12-certificate");
const {
	Pkcs12Generator,
	Pkcs12GenerationResult,
} = require("./lib/pkcs12-generator");
const { PkiExpressConfig } = require("./lib/pkiexpress-config");
const { PkiExpressOperator } = require("./lib/pkiexpress-operator");
const {
	ResourceContentOrReference,
} = require("./lib/resource-content-or-reference");
const {
	SignatureAlgorithmAndValue,
} = require("./lib/signature-algorithm-and-value");
const { SignatureExplorer } = require("./lib/signature-explorer");
const { SignatureFinisher } = require("./lib/signature-finisher");
const {
	SignaturePolicyIdentifier,
} = require("./lib/signature-policy-identifier");
const { SignatureStarter } = require("./lib/signature-starter");
const { Signer } = require("./lib/signer");
const {
	StandardSignaturePolicies,
} = require("./lib/standard-signature-policies");
const { TimestampAuthority } = require("./lib/timestamp-authority");
const {
	TimestampAuthorityAuthType,
} = require("./lib/timestamp-authority-auth-type");
const {
	TrustServiceAuthParameters,
} = require("./lib/trust-service-auth-parameters");
const { TrustServiceInfo } = require("./lib/trust-service-info");
const { TrustServiceNameModel } = require("./lib/trust-service-name-model");
const {
	TrustServiceSessionResult,
} = require("./lib/trust-service-session-result");
const {
	TrustServiceSessionTypes,
} = require("./lib/trust-service-session-types");
const { TrustServicesManager } = require("./lib/trust-services-manager");
const { ValidationError } = require("./lib/validation-error");
const { ValidationResults, ValidationItem } = require("./lib/validation");
const { XmlSignatureStarter } = require("./lib/xml-signature-starter");
const { XmlSigner } = require("./lib/xml-signer");

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
exports.CertificateExplorer = CertificateExplorer;
exports.CertificateExplorerResult = CertificateExplorerResult;
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
