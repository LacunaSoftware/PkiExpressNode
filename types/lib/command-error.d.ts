export class CommandError extends Error {
    constructor(code: any, message: any, innerError?: null);
    _name: string;
    _code: any;
    _innerError: any;
    getName(): string;
    setName(value: any): void;
    getCode(): any;
    set code(value: any);
    get code(): any;
    setCode(value: any): void;
    getInnerError(): any;
    set innerError(value: any);
    get innerError(): any;
    setInnerError(value: any): void;
}
