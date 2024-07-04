/**
 * Represents a private key certificate
 */
export class PKCertificate {
    constructor(model: any);
    _emailAddress: any;
    _serialNumber: any;
    _validityStart: any;
    _validityEnd: any;
    _subjectName: Name | undefined;
    _issuerName: Name | undefined;
    _pkiBrazil: PkiBrazilCertificateFields | undefined;
    _pkiItaly: PkiItalyCertificateFields | undefined;
    _pkiArgentina: PkiArgentinaCertificateFields | undefined;
    _pkiEcuador: PkiEcuadorCertificateFields | undefined;
    _pkiParaguay: PkiParaguayCertificateFields | undefined;
    _pkiPeru: PkiPeruCertificateFields | undefined;
    _issuer: any;
    _certificatePolicies: CertificatePolicy[];
    get emailAddress(): any;
    get serialNumber(): any;
    /**
     * Gets the date when the certificate will become valid. This date is in
     * ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
     * @returns {string} the date when the certificate will become valid
     */
    get validityStart(): string;
    /**
     * Gets the date when the certificate will stop being valid. This date is in
     * ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
     * @returns {string} the date when the certificate will stop being valid
     */
    get validityEnd(): string;
    get subjectName(): Name | undefined;
    get issuerName(): Name | undefined;
    get pkiBrazil(): PkiBrazilCertificateFields | undefined;
    get pkiItaly(): PkiItalyCertificateFields | undefined;
    get pkiArgentina(): PkiArgentinaCertificateFields | undefined;
    get pkiEcuador(): PkiEcuadorCertificateFields | undefined;
    get pkiParaguay(): PkiParaguayCertificateFields | undefined;
    get pkiPeru(): PkiPeruCertificateFields | undefined;
    get certificatePolicies(): CertificatePolicy[];
    get issuer(): any;
}
export class PkiBrazilCertificateFields {
    constructor(model: any);
    _certificateType: any;
    _cpf: any;
    _cnpj: any;
    _responsavel: any;
    _companyName: any;
    _oabUF: any;
    _oabNumero: any;
    _rgNumero: any;
    _rgEmissor: any;
    _rgEmissorUF: any;
    _dateOfBirth: Date | undefined;
    get certificateType(): any;
    get cpf(): any;
    get cnpj(): any;
    get responsavel(): any;
    get companyName(): any;
    get oabUF(): any;
    get oabNumero(): any;
    get rgNumero(): any;
    get rgEmissor(): any;
    get rgEmissorUF(): any;
    get dateOfBirth(): Date | undefined;
    get cpfFormatted(): any;
    get cnpjFormatted(): any;
}
export class PkiItalyCertificateFields {
    constructor(model: any);
    _certificateType: any;
    _codiceFiscale: any;
    _idCarta: any;
    get certificateType(): any;
    get codiceFiscale(): any;
    get idCarta(): any;
}
export class PkiArgentinaCertificateFields {
    constructor(model: any);
    _cuil: any;
    _cuit: any;
    get cuil(): any;
    get cuit(): any;
}
export class PkiEcuadorCertificateFields {
    static CertificateTypes: {
        UNKNOWN: string;
        PERSONA_NATURAL: string;
        PERSONA_JURIDICA: string;
    };
    constructor(model: any);
    _certificateType: any;
    _cedulaDeIdentidad: any;
    _pasaporte: any;
    _rup: any;
    _ruc: any;
    _nombres: any;
    _apellidos: any;
    _razonSocial: any;
    get certificateType(): any;
    get cedulaDeIdentidad(): any;
    get pasaporte(): any;
    get rup(): any;
    get ruc(): any;
    get nombres(): any;
    get apellidos(): any;
    get razonSocial(): any;
}
export class PkiParaguayCertificateFields {
    static CertificateTypes: {
        UNKNOWN: string;
        F1: string;
        F2: string;
        C1: string;
        C2: string;
        F3: string;
        C3: string;
    };
    static PersonCertificateTypes: {
        UNKNOWN: string;
        PERSONA_FISICA: string;
        PERSONA_JURIDICA: string;
        APLICACION: string;
    };
    constructor(model: any);
    _personCertificateType: any;
    _certificateType: any;
    _ci: any;
    _cie: any;
    _pasaporte: any;
    _ruc: any;
    _responsable: any;
    get personCertificateType(): any;
    get certificateType(): any;
    get ci(): any;
    get cie(): any;
    get pasaporte(): any;
    get ruc(): any;
    get responsable(): any;
}
export class PkiPeruCertificateFields {
    constructor(model: any);
    _dni: any;
    _ruc: any;
    get dni(): any;
    get ruc(): any;
}
export class CertificatePolicy {
    static QualifierTypes: {
        CPS: string;
        USER_NOTICE: string;
    };
    constructor(model: any);
    _id: any;
    _qualifiers: CertificatePolicyQualifier[];
    get id(): any;
    get qualifiers(): CertificatePolicyQualifier[];
}
export class CertificatePolicyQualifier {
    constructor(model: any);
    _type: any;
    _cpsUri: any;
    _unOrganization: any;
    _unExplicitText: any;
    _unNoticeNumbers: any;
    get type(): any;
    get cpsUri(): any;
    get unOrganization(): any;
    get unExplicitText(): any;
    get unNoticeNumbers(): any;
}
export class Name {
    constructor(model: any);
    _commonName: any;
    _country: any;
    _dnQualifier: any;
    _emailAddress: any;
    _generationQualifier: any;
    _givenName: any;
    _initials: any;
    _locality: any;
    _organization: any;
    _organizationUnit: any;
    _pseudonym: any;
    _serialNumber: any;
    _stateName: any;
    _surname: any;
    _title: any;
    set commonName(value: any);
    get commonName(): any;
    set country(value: any);
    get country(): any;
    set dnQualifier(value: any);
    get dnQualifier(): any;
    set emailAddress(value: any);
    get emailAddress(): any;
    set generationQualifier(value: any);
    get generationQualifier(): any;
    set givenName(value: any);
    get givenName(): any;
    set initials(value: any);
    get initials(): any;
    set locality(value: any);
    get locality(): any;
    set organization(value: any);
    get organization(): any;
    set organizationUnit(value: any);
    get organizationUnit(): any;
    set pseudonym(value: any);
    get pseudonym(): any;
    set serialNumber(value: any);
    get serialNumber(): any;
    set stateName(value: any);
    get stateName(): any;
    set surname(value: any);
    get surname(): any;
    set title(value: any);
    get title(): any;
}
