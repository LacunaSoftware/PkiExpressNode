export class Version {
    constructor(version: any);
    _internalVersions: number[];
    compareTo(comparedVersion: any): 0 | 1 | -1;
    get internalVersions(): number[];
    toString(): string;
}
