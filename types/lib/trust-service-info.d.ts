export class TrustServiceInfo {
    constructor(model: any);
    _provider: any;
    _badgeUrl: any;
    _service: TrustServiceNameModel | undefined;
    get provider(): any;
    get badgeUrl(): any;
    get service(): TrustServiceNameModel | undefined;
}
import { TrustServiceNameModel } from "./trust-service-name-model.js";
