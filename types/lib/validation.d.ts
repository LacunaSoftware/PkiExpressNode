export class ValidationResults {
    constructor(model: any);
    _errors: any[];
    _warnings: any[];
    _passedChecks: any[];
    isValid(): boolean;
    getChecksPerformed(): number;
    hasErrors(): boolean;
    hasWarnings(): boolean;
    toString(indentationLevel: any): string;
    getSummary(indentationLevel: any): string;
    _convertItems(items: any): any[];
    _joinItems(items: any, indentationLevel: any): string;
}
export class ValidationItem {
    constructor(model: any);
    _type: any;
    _message: any;
    _detail: any;
    _innerValidationResults: ValidationResults | undefined;
    set type(value: any);
    get type(): any;
    set message(value: any);
    get message(): any;
    set detail(value: any);
    get detail(): any;
    toString(indentationLevel: any): string;
}
