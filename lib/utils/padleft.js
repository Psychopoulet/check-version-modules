/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// module

module.exports = function padleft (msg) {

	if ("string" === typeof msg) {
		return 2 > msg.length ? "0" + msg : msg;
	}
	else {
		return padleft(String(msg));
	}

};
