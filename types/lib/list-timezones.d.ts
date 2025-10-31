export class ListTimezones extends PkiExpressOperator {
    /**
     * @param {PkiExpressConfig} config
    */
    constructor(config: PkiExpressConfig);
    /**
     * Lists all available timezones supported by PKI Express.
     * This command does not require any additional parameters.
     *
     * @returns {Promise<TimezoneListResult>} A promise that resolves to the structured timezone list
     */
    list(): Promise<TimezoneListResult>;
}
import { PkiExpressOperator } from "./pkiexpress-operator";
import { TimezoneListResult } from "./timezone-models";
import { PkiExpressConfig } from "./pkiexpress-config";
