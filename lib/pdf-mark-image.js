"use strict";

const {
	ResourceContentOrReference,
} = require("./resource-content-or-reference");

class PdfMarkImage {
	constructor(imageContent, mimeType) {
		mimeType = mimeType || null;
		imageContent = imageContent || null;

		this._resource = new ResourceContentOrReference();
		if (imageContent) {
			this._resource.content =
				Buffer.from(imageContent).toString("base64");
		}
		if (mimeType) {
			this._resource.mimeType = mimeType;
		}
	}

	get resource() {
		return this._resource;
	}

	set resource(value) {
		this._resource = value;
	}

	toModel() {
		return {
			resource: this._resource.toModel(),
		};
	}
}

exports.PdfMarkImage = PdfMarkImage;
