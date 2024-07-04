/** Class representing the result of the start-service-auth command */
export class StartServiceAuthResult {
    constructor(model: any);
    _authParameters: TrustServiceAuthParameters[];
    /**
     * Gets the auth parameters
     * @returns {string} the authParameters value
     */
    get authParameters(): string;
}
import { TrustServiceAuthParameters } from "./trust-service-auth-parameters.js";
