export class CertificateStoreOptions {
    constructor({ machine, pkcs12, password, thumbprint, keyName, certFile }?: {
        machine?: null | undefined;
        pkcs12?: null | undefined;
        password?: null | undefined;
        thumbprint?: null | undefined;
        keyName?: null | undefined;
        certFile?: null | undefined;
    });
    args: (string | undefined)[];
    _machine: any;
    _pkcs12: any;
    _password: any;
    _thumbprint: any;
    _keyName: any;
    _certFile: any;
    CertStoreOptions: {
        machine: string;
        pkcs12: string;
        password: string;
        thumbprint: string;
        keyName: string;
        certFile: string;
    };
    entries: {
        machine: null;
        pkcs12: null;
        password: null;
        thumbprint: null;
        keyName: null;
        certFile: null;
    };
    set machine(value: any);
    get machine(): any;
    set pkcs12(value: any);
    get pkcs12(): any;
    set password(value: any);
    get password(): any;
    set thumbprint(value: any);
    get thumbprint(): any;
    set keyName(value: any);
    get keyName(): any;
    set certFile(value: any);
    get certFile(): any;
    getMachine(): any;
    setMachine(value: any): void;
    getPkcs12(): any;
    setPkcs12(value: any): void;
    getPassword(): any;
    setPassword(value: any): void;
    getThumbprint(): any;
    setThumbprint(value: any): void;
    getKeyName(): any;
    setKeyName(value: any): void;
    getCertFile(): any;
    setCertFile(value: any): void;
    getCertStoreOptions(): (string | undefined)[];
}
