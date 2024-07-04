export class TrustServiceAuthParameters {
    constructor(model: any);
    _authUrl: any;
    _serviceInfo: TrustServiceInfo | undefined;
    get authUrl(): any;
    get serviceInfo(): TrustServiceInfo | undefined;
}
import { TrustServiceInfo } from "./trust-service-info.js";
