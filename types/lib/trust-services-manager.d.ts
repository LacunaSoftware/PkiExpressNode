export class TrustServicesManager extends PkiExpressOperator {
    checkByCpf(service: any, cpf: any): Promise<any>;
    checkByCnpj(service: any, cnpj: any): Promise<any>;
    discoverByCpf(cpf: any, throwExceptions?: boolean): Promise<any>;
    discoverByCnpj(cnpj: any, throwExceptions?: boolean): Promise<any>;
    discoverByCpfAndStartAuth(cpf: any, redirectUrl: any, sessionType?: string, customState?: null, throwExceptions?: boolean): Promise<any>;
    discoverByCnpjAndStartAuth(cnpj: any, redirectUrl: any, sessionType?: string, customState?: null, throwExceptions?: boolean): Promise<any>;
    /**
     * Starts the authentication with all configured trusted service
     *
     * @param {string} redirectUrl The URL that the provider service with redirect to after the authorization from the user
     * @param {string} sessionType the type of the session (@see TrustServiceSessionTypes)
     * @param {int} sessionLifetime the time (in seconds) of the signature session
     * @param {string} customState the state that is preserve during the session
     *
     * @returns {StartServiceAuthResult} the command's result containing the auth parameters of all configured services
     */
    startAuth(redirectUrl: string, sessionType?: string, sessionLifetime?: int, customState?: string): StartServiceAuthResult;
    /**
     * Get the current state
     *
     *  @param {string} state the custom state passed when the trust service authorization session was started
     *  @returns {GetServiceAuthResult} the command's result that contains the signature session's custom state
     */
    getCustomState(state: string): GetServiceAuthResult;
    passwordAuthorize(service: any, username: any, password: any, sessionType?: string): Promise<any>;
    /**
     * Completes the authorization with the trusted service
     *
     * @param {string} code the "code" parameter received from the trust
     * service provider's redirection
     * @param {string} state the "state" parameter received from the trust
     * service provider's redirection
     * @returns {TrustServiceSessionResult} the result of the authentication
     * with the trusted service
     */
    completeAuth(code: string, state: string): TrustServiceSessionResult;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
import { StartServiceAuthResult } from "./start-service-auth-result.js";
import { GetServiceAuthResult } from "./get-service-auth-result.js";
import { TrustServiceSessionResult } from "./trust-service-session-result";
