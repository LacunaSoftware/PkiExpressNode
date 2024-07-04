export class VersionManager {
    _minVersion: Version;
    requireVersion(minVersionCandidate: any): void;
    requireMinVersionFlag(): boolean;
    get minVersion(): Version;
}
import { Version } from "./version";
