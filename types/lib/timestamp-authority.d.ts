export class TimestampAuthority {
    constructor(url: any);
    _url: any;
    _token: any;
    _sslThumbprint: any;
    _basicAuth: string | null;
    _authType: string;
    _requestTimeout: number;
    setOAuthTokenAuthentication(token: any): void;
    setBasicAuthentication(username: any, password: any): void;
    setSSLAuthentication(sslThumbprint: any): void;
    get url(): any;
    get token(): any;
    get sslThumbprint(): any;
    get basicAuth(): string | null;
    addCmdArguments(args: any, versionManager: any): void;
}
