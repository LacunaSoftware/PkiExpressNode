"use strict";

function _shellEscape(cmdArgs) {
	let escaped = [];

	for (let arg of cmdArgs) {
		let s = arg.replace(/\\/g, "\\\\");
		if (/[^A-Za-z0-9_\/:=-]/.test(arg)) {
			s = `"${s.replace(/"/g, "'")}"`;
		}
		escaped.push(s);
	}

	return escaped.join(" ");
}

exports._shellEscape = _shellEscape;
