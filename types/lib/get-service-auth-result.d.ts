/** Class representing the result of the get-service-auth-custom-state command */
export class GetServiceAuthResult {
    /**
     * Creates a GetServiceAuthResult from model.
     * @param {object} model the model received from PKI Express
     */
    constructor(model: object);
    _customState: any;
    /**
     * Gets the custom state value
     * @returns {string} the customState value
     */
    get customState(): string;
}
