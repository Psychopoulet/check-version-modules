/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { join } = require("node:path");

	// externals

	let colors = null;
	try { // test require optional deps
		colors = require("colors/safe");
	}
	catch (e) {
		// nothing to do here
	}

	// locals
	const padleft = require(join(__dirname, "padleft.js"));

// module

module.exports = function getFormatedTime () {

	const date = new Date();

	const content =
		padleft(date.getHours()) + ":" +
		padleft(date.getMinutes()) + ":" +
		padleft(date.getSeconds());

	return (colors.white ? colors.white("[") : "[") +
		(colors.grey ? colors.grey(content) : content) +
	(colors.white ? colors.white("]") : "]");

};
