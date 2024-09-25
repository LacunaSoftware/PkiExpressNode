"use strict";
const { AuthCompleteResult } = require("./lib/auth-complete-result");
const { AuthStartResult } = require("./lib/auth-start-result");
const { Authentication } = require("./lib/authentication");
const { BaseSigner } = require("./lib/base-signer");
const { SignData } = require("./lib/sign-data");
const { SignHash } = require("./lib/sign-hash");
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
const { CertificateStoreOptions } = require("./lib/certificate-store-options");
const { StampHash } = require("./lib/stamp-hash");
const { StampData } = require("./lib/stamp-data");

exports.AuthCompleteResult = AuthCompleteResult;
exports.Authentication = Authentication;
exports.AuthStartResult = AuthStartResult;
exports.BaseSigner = BaseSigner;
exports.CadesSignature = CadesSignature;
exports.CadesSignatureEditor = CadesSignatureEditor;
exports.CadesSignatureExplorer = CadesSignatureExplorer;
exports.CadesSignatureStarter = CadesSignatureStarter;
exports.CadesSigner = CadesSigner;
exports.CadesSignerInfo = CadesSignerInfo;
exports.CadesTimestamp = CadesTimestamp;
exports.CertificateExplorer = CertificateExplorer;
exports.CertificateExplorerResult = CertificateExplorerResult;
exports.CertificatePolicy = CertificatePolicy;
exports.CertificatePolicyQualifier = CertificatePolicyQualifier;
exports.CertificateStoreOptions = CertificateStoreOptions;
exports.CheckServiceResult = CheckServiceResult;
exports.Color = Color;
exports.DigestAlgorithm = DigestAlgorithm;
exports.DigestAlgorithmAndValue = DigestAlgorithmAndValue;
exports.DigestAlgorithms = DigestAlgorithms;
exports.DiscoverServicesResult = DiscoverServicesResult;
exports.ErrorCodes = ErrorCodes;
exports.FixedHeight = FixedHeight;
exports.FixedWidth = FixedWidth;
exports.HeightDefined = HeightDefined;
exports.HeightDefinedFixedWidth = HeightDefinedFixedWidth;
exports.HeightDefinedVarWidth = HeightDefinedVarWidth;
exports.Initial = Initial;
exports.InstallationNotFoundError = InstallationNotFoundError;
exports.KeyFormats = KeyFormats;
exports.KeyGenerationResult = KeyGenerationResult;
exports.KeyGenerator = KeyGenerator;
exports.MD5DigestAlgorithm = MD5DigestAlgorithm;
exports.Name = Name;
exports.Oids = Oids;
exports.PadesCertificationLevels = PadesCertificationLevels;
exports.PadesHorizontalAlign = PadesHorizontalAlign;
exports.PadesMeasurementUnits = PadesMeasurementUnits;
exports.PadesSignature = PadesSignature;
exports.PadesSignatureExplorer = PadesSignatureExplorer;
exports.PadesSignatureStarter = PadesSignatureStarter;
exports.PadesSigner = PadesSigner;
exports.PadesTimestamper = PadesTimestamper;
exports.PadesVerticalAlign = PadesVerticalAlign;
exports.PadesVisualRectangle = PadesVisualRectangle;
exports.PdfHelper = PdfHelper;
exports.PdfMark = PdfMark;
exports.PdfMarkElement = PdfMarkElement;
exports.PdfMarkElementType = PdfMarkElementType;
exports.PdfMarker = PdfMarker;
exports.PdfMarkImage = PdfMarkImage;
exports.PdfMarkImageElement = PdfMarkImageElement;
exports.PdfMarkPageOptions = PdfMarkPageOptions;
exports.PdfMarkQRCodeElement = PdfMarkQRCodeElement;
exports.PdfMarkTextElement = PdfMarkTextElement;
exports.PdfTextSection = PdfTextSection;
exports.PdfTextStyle = PdfTextStyle;
exports.PKAlgorithm = PKAlgorithm;
exports.PKAlgorithms = PKAlgorithms;
exports.PKCertificate = PKCertificate;
exports.Pkcs12Certificate = Pkcs12Certificate;
exports.Pkcs12GenerationResult = Pkcs12GenerationResult;
exports.Pkcs12Generator = Pkcs12Generator;
exports.PkiArgentinaCertificateFields = PkiArgentinaCertificateFields;
exports.PkiBrazilCertificateFields = PkiBrazilCertificateFields;
exports.PkiEcuadorCertificateFields = PkiEcuadorCertificateFields;
exports.PkiExpressConfig = PkiExpressConfig;
exports.PkiExpressOperator = PkiExpressOperator;
exports.PkiItalyCertificateFields = PkiItalyCertificateFields;
exports.PkiParaguayCertificateFields = PkiParaguayCertificateFields;
exports.PkiPeruCertificateFields = PkiPeruCertificateFields;
exports.ResourceContentOrReference = ResourceContentOrReference;
exports.RSAPKAlgorithm = RSAPKAlgorithm;
exports.RSASignatureAlgorithm = RSASignatureAlgorithm;
exports.SHA1DigestAlgorithm = SHA1DigestAlgorithm;
exports.SHA256DigestAlgorithm = SHA256DigestAlgorithm;
exports.SHA384DigestAlgorithm = SHA384DigestAlgorithm;
exports.SHA512DigestAlgorithm = SHA512DigestAlgorithm;
exports.SignatureAlgorithm = SignatureAlgorithm;
exports.SignatureAlgorithmAndValue = SignatureAlgorithmAndValue;
exports.SignatureAlgorithms = SignatureAlgorithms;
exports.SignatureExplorer = SignatureExplorer;
exports.SignatureFinisher = SignatureFinisher;
exports.SignaturePolicyIdentifier = SignaturePolicyIdentifier;
exports.SignatureStarter = SignatureStarter;
exports.SignData = SignData;
exports.Signer = Signer;
exports.SignHash = SignHash;
exports.StampData = StampData;
exports.StampHash = StampHash;
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
exports.ValidationItem = ValidationItem;
exports.ValidationResults = ValidationResults;
exports.VarHeight = VarHeight;
exports.VarWidth = VarWidth;
exports.VarWidthAndHeight = VarWidthAndHeight;
exports.WidthDefined = WidthDefined;
exports.WidthDefinedFixedHeight = WidthDefinedFixedHeight;
exports.WidthDefinedVarHeight = WidthDefinedVarHeight;
exports.XmlElementInsertions = XmlElementInsertions;
exports.XmlSignatureStarter = XmlSignatureStarter;
exports.XmlSigner = XmlSigner;