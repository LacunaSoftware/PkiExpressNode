"use strict";

/**
 * Represents a private key certificate
 */
class PKCertificate {
	constructor(model) {
		this._emailAddress = model["emailAddress"];
		this._serialNumber = model["serialNumber"];
		this._validityStart = model["validityStart"];
		this._validityEnd = model["validityEnd"];
		if (model["subjectName"]) {
			this._subjectName = new Name(model["subjectName"]);
		}
		if (model["issuerName"]) {
			this._issuerName = new Name(model["issuerName"]);
		}
		if (model["pkiBrazil"]) {
			this._pkiBrazil = new PkiBrazilCertificateFields(
				model["pkiBrazil"]
			);
		}
		if (model["pkiItaly"]) {
			this._pkiItaly = new PkiItalyCertificateFields(model["pkiItaly"]);
		}
		if (model["pkiArgentina"]) {
			this._pkiArgentina = new PkiArgentinaCertificateFields(
				model["pkiArgentina"]
			);
		}
		if (model["pkiEcuador"]) {
			this._pkiEcuador = new PkiEcuadorCertificateFields(
				model["pkiEcuador"]
			);
		}
		if (model["pkiParaguay"]) {
			this._pkiParaguay = new PkiParaguayCertificateFields(
				model["pkiParaguay"]
			);
		}
		if (model["pkiPeru"]) {
			this._pkiPeru = new PkiPeruCertificateFields(model["pkiPeru"]);
		}
		if (model["issuer"]) {
			this._issuer = new PKCertificate(model["issuer"]);
		}

		this._certificatePolicies = [];
		let cps = model["certificatePolicies"];

		if (cps && cps.length) {
			for (let cpModel of cps) {
				this._certificatePolicies.push(new CertificatePolicy(cpModel));
			}
		}
	}

	get emailAddress() {
		return this._emailAddress;
	}

	get serialNumber() {
		return this._serialNumber;
	}

	/**
	 * Gets the date when the certificate will become valid. This date is in
	 * ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
	 * @returns {string} the date when the certificate will become valid
	 */
	get validityStart() {
		return this._validityStart;
	}

	/**
	 * Gets the date when the certificate will stop being valid. This date is in
	 * ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
	 * @returns {string} the date when the certificate will stop being valid
	 */
	get validityEnd() {
		return this._validityEnd;
	}

	get subjectName() {
		return this._subjectName;
	}

	get issuerName() {
		return this._issuerName;
	}

	get pkiBrazil() {
		return this._pkiBrazil;
	}

	get pkiItaly() {
		return this._pkiItaly;
	}

	get pkiArgentina() {
		return this._pkiArgentina;
	}

	get pkiEcuador() {
		return this._pkiEcuador;
	}

	get pkiParaguay() {
		return this._pkiParaguay;
	}

	get pkiPeru() {
		return this._pkiPeru;
	}

	get certificatePolicies() {
		return this._certificatePolicies;
	}

	get issuer() {
		return this._issuer;
	}
}

class PkiItalyCertificateFields {
	constructor(model) {
		this._certificateType = model["certificateType"];
		this._codiceFiscale = model["codiceFiscale"];
		this._idCarta = model["idCarta"];
	}

	get certificateType() {
		return this._certificateType;
	}

	get codiceFiscale() {
		return this._codiceFiscale;
	}

	get idCarta() {
		return this._idCarta;
	}
}

class PkiBrazilCertificateFields {
	constructor(model) {
		this._certificateType = model["certificateType"];
		this._cpf = model["cpf"];
		this._cnpj = model["cnpj"];
		this._responsavel = model["responsavel"];
		this._companyName = model["companyName"];
		this._oabUF = model["oabUF"];
		this._oabNumero = model["oabNumero"];
		this._rgNumero = model["rgNumero"];
		this._rgEmissor = model["rgEmissor"];
		this._rgEmissorUF = model["rgEmissorUF"];
		if (model["dateOfBirth"]) {
			this._dateOfBirth = new Date(model["dateOfBirth"]);
		}
	}

	get certificateType() {
		return this._certificateType;
	}

	get cpf() {
		return this._cpf;
	}

	get cnpj() {
		return this._cnpj;
	}

	get responsavel() {
		return this._responsavel;
	}

	get companyName() {
		return this._companyName;
	}

	get oabUF() {
		return this._oabUF;
	}

	get oabNumero() {
		return this._oabNumero;
	}

	get rgNumero() {
		return this._rgNumero;
	}

	get rgEmissor() {
		return this._rgEmissor;
	}

	get rgEmissorUF() {
		return this._rgEmissorUF;
	}

	get dateOfBirth() {
		return this._dateOfBirth;
	}

	get cpfFormatted() {
		if (!this._cpf) {
			return "";
		}
		if (!/^\d{11}$/.test(this._cpf)) {
			return this._cpf;
		}
		return `${this._cpf.substring(0, 3)}.${this._cpf.substring(
			3,
			6
		)}.${this._cpf.substring(6, 9)}-${this._cpf.substring(9)}`;
	}

	get cnpjFormatted() {
		if (!this._cnpj) {
			return "";
		}
		if (!/^\d{14}$/.test(this._cnpj)) {
			return this._cnpj;
		}
		return `${this._cnpj.substring(0, 2)}.${this._cnpj.substring(
			2,
			5
		)}.${this._cnpj.substring(5, 8)}/${this._cnpj.substring(
			8,
			12
		)}-${this._cnpj.substring(12)}`;
	}
}

class PkiArgentinaCertificateFields {
	constructor(model) {
		this._cuil = model["cuil"];
		this._cuit = model["cuit"];
	}

	get cuil() {
		return this._cuil;
	}

	get cuit() {
		return this._cuit;
	}
}

class PkiEcuadorCertificateFields {
	static CertificateTypes = {
		UNKNOWN: "Unknown",
		PERSONA_NATURAL: "PersonaNatural",
		PERSONA_JURIDICA: "PersonaJuridica",
	};

	constructor(model) {
		this._certificateType = model["certificateType"];
		this._cedulaDeIdentidad = model["cedulaDeIdentidad"];
		this._pasaporte = model["pasaporte"];
		this._rup = model["rup"];
		this._ruc = model["ruc"];
		this._nombres = model["nombres"];
		this._apellidos = model["apellidos"];
		this._razonSocial = model["razonSocial"];
	}

	get certificateType() {
		return this._certificateType;
	}

	get cedulaDeIdentidad() {
		return this._cedulaDeIdentidad;
	}

	get pasaporte() {
		return this._pasaporte;
	}

	get rup() {
		return this._rup;
	}

	get ruc() {
		return this._ruc;
	}

	get nombres() {
		return this._nombres;
	}

	get apellidos() {
		return this._apellidos;
	}

	get razonSocial() {
		return this._razonSocial;
	}
}

class PkiParaguayCertificateFields {
	static CertificateTypes = {
		UNKNOWN: "Unknown",
		F1: "F1",
		F2: "F2",
		C1: "C1",
		C2: "C2",
		F3: "F3",
		C3: "C3",
	};

	static PersonCertificateTypes = {
		UNKNOWN: "Unknown",
		PERSONA_FISICA: "PersonaFisica",
		PERSONA_JURIDICA: "PersonaJuridica",
		APLICACION: "Aplicacion",
	};

	constructor(model) {
		this._personCertificateType = model["personCertificateType"];
		this._certificateType = model["certificateType"];
		this._ci = model["ci"];
		this._cie = model["cie"];
		this._pasaporte = model["pasaporte"];
		this._ruc = model["ruc"];
		this._responsable = model["responsable"];
	}

	get personCertificateType() {
		return this._personCertificateType;
	}

	get certificateType() {
		return this._certificateType;
	}

	get ci() {
		return this._ci;
	}

	get cie() {
		return this._cie;
	}

	get pasaporte() {
		return this._pasaporte;
	}

	get ruc() {
		return this._ruc;
	}

	get responsable() {
		return this._responsable;
	}
}

class PkiPeruCertificateFields {
	constructor(model) {
		this._dni = model["dni"];
		this._ruc = model["ruc"];
	}

	get dni() {
		return this._dni;
	}

	get ruc() {
		return this._ruc;
	}
}

class CertificatePolicy {
	static QualifierTypes = {
		CPS: "Cps",
		USER_NOTICE: "UserNotice",
	};

	constructor(model) {
		this._id = model["id"];
		this._qualifiers = [];

		let qs = model["qualifiers"];

		if (qs && qs.length) {
			for (let qualifierModel of qs) {
				this._qualifiers.push(
					new CertificatePolicyQualifier(qualifierModel)
				);
			}
		}
	}

	get id() {
		return this._id;
	}

	get qualifiers() {
		return this._qualifiers;
	}
}

class CertificatePolicyQualifier {
	constructor(model) {
		this._type = model["type"];
		this._cpsUri = model["cpsUri"];
		this._unOrganization = model["unOrganization"];
		this._unExplicitText = model["unExplicitText"];
		this._unNoticeNumbers = model["unNoticeNumbers"];
	}

	get type() {
		return this._type;
	}

	get cpsUri() {
		return this._cpsUri;
	}

	get unOrganization() {
		return this._unOrganization;
	}

	get unExplicitText() {
		return this._unExplicitText;
	}

	get unNoticeNumbers() {
		return this._unNoticeNumbers;
	}
}

class Name {
	constructor(model) {
		this._commonName = model["commonName"];
		this._country = model["country"];
		this._dnQualifier = model["dnQualifier"];
		this._emailAddress = model["emailAddress"];
		this._generationQualifier = model["generationQualifier"];
		this._givenName = model["givenName"];
		this._initials = model["initials"];
		this._locality = model["locality"];
		this._organization = model["organization"];
		this._organizationUnit = model["organizationUnit"];
		this._pseudonym = model["pseudonym"];
		this._serialNumber = model["serialNumber"];
		this._stateName = model["stateName"];
		this._surname = model["surname"];
		this._title = model["title"];
	}

	get commonName() {
		return this._commonName;
	}

	set commonName(value) {
		this._commonName = value;
	}

	get country() {
		return this._country;
	}

	set country(value) {
		this._country = value;
	}

	get dnQualifier() {
		return this._dnQualifier;
	}

	set dnQualifier(value) {
		this._dnQualifier = value;
	}

	get emailAddress() {
		return this._emailAddress;
	}

	set emailAddress(value) {
		this._emailAddress = value;
	}

	get generationQualifier() {
		return this._generationQualifier;
	}

	set generationQualifier(value) {
		this._generationQualifier = value;
	}

	get givenName() {
		return this._givenName;
	}

	set givenName(value) {
		this._givenName = value;
	}

	get initials() {
		return this._initials;
	}

	set initials(value) {
		this._initials = value;
	}

	get locality() {
		return this._locality;
	}

	set locality(value) {
		this._locality = value;
	}

	get organization() {
		return this._organization;
	}

	set organization(value) {
		this._organization = value;
	}

	get organizationUnit() {
		return this._organizationUnit;
	}

	set organizationUnit(value) {
		this._organizationUnit = value;
	}

	get pseudonym() {
		return this._pseudonym;
	}

	set pseudonym(value) {
		this._pseudonym = value;
	}

	get serialNumber() {
		return this._serialNumber;
	}

	set serialNumber(value) {
		this._serialNumber = value;
	}

	get stateName() {
		return this._stateName;
	}

	set stateName(value) {
		this._stateName = value;
	}

	get surname() {
		return this._surname;
	}

	set surname(value) {
		this._surname = value;
	}

	get title() {
		return this._title;
	}

	set title(value) {
		this._title = value;
	}
}

exports.PKCertificate = PKCertificate;
exports.PkiBrazilCertificateFields = PkiBrazilCertificateFields;
exports.PkiItalyCertificateFields = PkiItalyCertificateFields;
exports.PkiArgentinaCertificateFields = PkiArgentinaCertificateFields;
exports.PkiEcuadorCertificateFields = PkiEcuadorCertificateFields;
exports.PkiParaguayCertificateFields = PkiParaguayCertificateFields;
exports.PkiPeruCertificateFields = PkiPeruCertificateFields;
exports.CertificatePolicy = CertificatePolicy;
exports.CertificatePolicyQualifier = CertificatePolicyQualifier;
exports.Name = Name;
