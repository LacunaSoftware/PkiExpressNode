export class PdfMarkImage {
    constructor(imageContent: any, mimeType: any);
    _resource: ResourceContentOrReference;
    set resource(value: ResourceContentOrReference);
    get resource(): ResourceContentOrReference;
    toModel(): {
        resource: {
            content: any;
            url: any;
            mimeType: any;
        };
    };
}
import { ResourceContentOrReference } from "./resource-content-or-reference";
