"use strict";

const Command = {
	SIGN_CADES: "sign-cades",
	SIGN_PADES: "sign-pades",
	SIGN_XML: "sign-xml",
	START_CADES: "start-cades",
	START_PADES: "start-pades",
	START_XML: "start-xml",
	COMPLETE_SIG: "complete-sig",
	OPEN_PADES: "open-pades",
	OPEN_CADES: "open-cades",
	OPEN_CERT: "open-cert",
	EDIT_PDF: "edit-pdf",
	START_AUTH: "start-auth",
	COMPLETE_AUTH: "complete-auth",
	GEN_KEY: "gen-key",
	CREATE_PFX: "create-pfx",
	STAMP_PDF: "stamp-pdf",
	MERGE_CMS: "merge-cms",
	READ_CERT: "read-cert",
	CHECK_SERVICE: "check-service",
	DISCOVER_SERVICES: "discover-services",
	PASSWORD_AUTHORIZE: "pwd-auth",
	COMPLETE_SERVICE_AUTH: "complete-service-auth",
	START_SERVICE_AUTH: "start-service-auth",
	GET_SERVICE_AUTH_CUSTOM_STATE: "get-service-auth-custom-state",
};

exports.Command = Command;
