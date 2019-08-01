/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// externals
	require("colors");

	// locals
	const padleft = require(join(__dirname, "padleft.js"));

// module

module.exports = function getFormatedTime () {

	const date = new Date();

	return "[".white +
		(
			padleft(date.getHours()) + ":" +
			padleft(date.getMinutes()) + ":" +
			padleft(date.getSeconds())
		).grey +
	"]".white;

};
