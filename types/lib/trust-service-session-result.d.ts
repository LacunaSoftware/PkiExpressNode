/**
 * Represents the result of the trust service authentication process that is
 * returned by the completeAuth() method.
 */
export class TrustServiceSessionResult {
    constructor(model: any);
    _session: any;
    _customState: any;
    _sessionType: any;
    _service: TrustServiceNameModel | undefined;
    _expiresOn: Date | undefined;
    /**
     * Gets the session data resulted by the trust service authentication
     * @returns {string} the session data
     */
    get session(): string;
    get customState(): any;
    get sessionType(): any;
    get service(): TrustServiceNameModel | undefined;
    get expiresOn(): Date | undefined;
}
import { TrustServiceNameModel } from "./trust-service-name-model.js";
