"use strict";

const {
	TimestampAuthorityAuthType,
} = require("./timestamp-authority-auth-type");

class TimestampAuthority {
	constructor(url) {
		this._url = url;
		this._token = null;
		this._sslThumbprint = null;
		this._basicAuth = null;
		this._authType = TimestampAuthorityAuthType.NONE;
		this._requestTimeout = 15;
	}

	setOAuthTokenAuthentication(token) {
		this._token = token;
		this._authType = TimestampAuthorityAuthType.OAUTH_TOKEN;
	}

	setBasicAuthentication(username, password) {
		this._basicAuth = `${username}:${password}`;
		this._authType = TimestampAuthorityAuthType.BASIC_AUTH;
	}

	setSSLAuthentication(sslThumbprint) {
		this._sslThumbprint = sslThumbprint;
		this._authType = TimestampAuthorityAuthType.SSL;
	}

	get url() {
		return this._url;
	}

	get token() {
		return this._token;
	}

	get sslThumbprint() {
		return this._sslThumbprint;
	}

	get basicAuth() {
		return this._basicAuth;
	}

	addCmdArguments(args, versionManager) {
		args.push("--tsa-url");
		args.push(this._url);

		switch (this._authType) {
			case "None":
				break;
			case "BasicAuth":
				args.push("--tsa-basic-auth");
				args.push(this._basicAuth);
				break;
			case "SSL":
				args.push("--tsa-ssl-thumbprint");
				args.push(this._sslThumbprint);
				break;
			case "OAuthToken":
				args.push("--tsa-token");
				args.push(this._token);
				break;
			default:
				throw new Error(
					"Unknown authentication type of the timestamp authority"
				);
		}

		if (versionManager) {
			args.push("--ts-request-timeout");
			args.push(this._requestTimeout.toString());
			// This option can only be used on versions greater than 1.12.2 of
			// the PKI Express
			versionManager.requireVersion("1.12.2");
		}
	}
}

exports.TimestampAuthority = TimestampAuthority;
