export class ValidationError extends CommandError {
    constructor(validationResults: any, innerError?: null);
}
import { CommandError } from "./command-error";
