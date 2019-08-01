/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// module

module.exports = function padleft (msg) {
	return 2 > msg.length ? "0" + msg : msg;
};
