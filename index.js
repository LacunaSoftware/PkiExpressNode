'use strict';
const { BaseSigner } = require('./lib/base-signer');
const {
	CadesSignature,
	CadesTimestamp,
	CadesSignerInfo
} = require('./lib/cades-signature');
const { Color } = require('./lib/color');
const {
	DigestAlgorithms,
	DigestAlgorithm,
	MD5DigestAlgorithm,
	SHA1DigestAlgorithm,
	SHA256DigestAlgorithm,
	SHA384DigestAlgorithm,
	SHA512DigestAlgorithm
} = require('./lib/digest-algorithm');
const { DigestAlgorithmAndValue } = require('./lib/digest-algorithm-and-value');
const { KeyFormats } = require('./lib/enums');
const {
	KeyGenerator,
	KeyGenerationResult
} = require('./lib/key-generator');
const { Oids } = require('./lib/oids');
const { PadesHorizontalAlign } = require('./lib/pades-horizontal-align');
const { PadesMeasurementUnits } = require('./lib/pades-measurement-units');
const { PadesSignature } = require('./lib/pades-signature');
const { PadesSignatureExplorer } = require('./lib/pades-signature-explorer');
const { PadesSignatureStarter } = require('./lib/pades-signature-starter');
const { PadesSigner } = require('./lib/pades-signer');
const { PadesVerticalAlign } = require('./lib/pades-vertical-align');
const { PadesVisualRectangle } = require('./lib/pades-visual-rectangle');
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
	VarWidthAndHeight
} = require('./lib/pdf-container-definition');
const { PdfHelper } = require('./lib/pdf-helper');
const { PdfMark } = require('./lib/pdf-mark');
const { PdfMarkElement } = require('./lib/pdf-mark-element');
const { PdfMarkElementType } = require('./lib/pdf-mark-element-type');
const { PdfMarkImage } = require('./lib/pdf-mark-image');
const { PdfMarkImageElement } = require('./lib/pdf-mark-image-element');
const { PdfMarkPageOptions } = require('./lib/pdf-mark-page-options');
const { PdfMarkQRCodeElement } = require('./lib/pdf-mark-qr-code-element');
const { PdfMarkTextElement } = require('./lib/pdf-mark-text-element');
const { PdfMarker } = require('./lib/pdf-marker');
const { PdfTextSection } = require('./lib/pdf-text-section');
const { PdfTextStyle } = require('./lib/pdf-text-style');
const {
	PKAlgorithms,
	SignatureAlgorithms,
	SignatureAlgorithm,
	RSASignatureAlgorithm,
	RSAPKAlgorithm,
	PKAlgorithm
} = require('./lib/pk-algorithms');
const {
	PKCertificate,
	PkiBrazilCertificateFields,
	PkiItalyCertificateFields,
	Name
} = require('./lib/pk-certificate');
const { Pkcs12Certificate } = require('./lib/pkcs12-certificate');
const {
	Pkcs12Generator,
	Pkcs12GenerationResult
} = require('./lib/pkcs12-generator');
const { PkiExpressConfig } = require('./lib/pkiexpress-config');
const { PkiExpressOperator } = require('./lib/pkiexpress-operador');
const { ResourceContentOrReference } = require('./lib/resource-content-or-reference');
const { SignatureAlgorithmAndValue } = require('./lib/signature-algorithm-and-value');
const { SignatureExplorer } = require('./lib/signature-explorer');
const { SignatureFinisher } = require('./lib/signature-finisher');
const { SignaturePolicyIdentifier } = require('./lib/signature-policy-identifier');
const { SignatureStarter } = require('./lib/signature-starter');
const { Signer } = require('./lib/signer');
const { StandardSignaturePolicies } = require('./lib/standard-signature-policies');
const { TimestampAuthority } = require('./lib/timestamp-authority');
const { TimestampAuthorityAuthType } = require('./lib/timestamp-authority-auth-type');
const {
	ValidationResults,
	ValidationItem
} = require('./lib/validation');

exports.BaseSigner = BaseSigner;
exports.CadesSignature = CadesSignature;
exports.CadesTimestamp = CadesTimestamp;
exports.CadesSignerInfo = CadesSignerInfo;
exports.Color = Color;
exports.DigestAlgorithms = DigestAlgorithms;
exports.DigestAlgorithm = DigestAlgorithm;
exports.MD5DigestAlgorithm = MD5DigestAlgorithm;
exports.SHA1DigestAlgorithm = SHA1DigestAlgorithm;
exports.SHA256DigestAlgorithm = SHA256DigestAlgorithm;
exports.SHA384DigestAlgorithm = SHA384DigestAlgorithm;
exports.SHA512DigestAlgorithm = SHA512DigestAlgorithm;
exports.DigestAlgorithmAndValue = DigestAlgorithmAndValue;
exports.KeyFormats = KeyFormats;
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
exports.SignatureAlgorithms =SignatureAlgorithms;
exports.SignatureAlgorithm = SignatureAlgorithm;
exports.RSASignatureAlgorithm = RSASignatureAlgorithm;
exports.RSAPKAlgorithm = RSAPKAlgorithm;
exports.PKAlgorithm = PKAlgorithm;
exports.PKCertificate = PKCertificate;
exports.Pkcs12Certificate = Pkcs12Certificate;
exports.PkiBrazilCertificateFields = PkiBrazilCertificateFields;
exports.PkiItalyCertificateFields = PkiItalyCertificateFields;
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
exports.ValidationResults = ValidationResults;
exports.ValidationItem = ValidationItem;