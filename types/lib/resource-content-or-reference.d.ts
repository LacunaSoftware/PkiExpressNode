export class ResourceContentOrReference {
    _url: any;
    _mimeType: any;
    _content: any;
    set url(value: any);
    get url(): any;
    set mimeType(value: any);
    get mimeType(): any;
    set content(value: any);
    get content(): any;
    toModel(): {
        content: any;
        url: any;
        mimeType: any;
    };
}
