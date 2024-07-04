export class DiscoverServicesResult {
    constructor(model: any);
    _services: TrustServiceInfo[];
    _authParameters: TrustServiceAuthParameters[];
    get services(): TrustServiceInfo[];
    get authParameters(): TrustServiceAuthParameters[];
}
import { TrustServiceInfo } from "./trust-service-info.js";
import { TrustServiceAuthParameters } from "./trust-service-auth-parameters.js";
