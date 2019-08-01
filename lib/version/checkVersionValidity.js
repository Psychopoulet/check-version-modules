/*
	eslint-disable prefer-arrow-callback, no-useless-escape
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// externals
	const checkNonEmptyString = require(join(__dirname, "..", "utils", "checkNonEmptyString.js"));

// consts

	const REGEX_LITTERAL = "^([\^~]){0,1}([*x0-9]+){0,1}(.[*x0-9]+){0,1}(.[*x0-9]+){0,1}$";
	const REGEX = RegExp(REGEX_LITTERAL);

// module

module.exports = function checkVersionValidity (version) {

	return checkNonEmptyString(version).then(function checkVersionPattern () {

		return REGEX.test(version) ? Promise.resolve() : Promise.reject(new Error(
			"\"version\" parameter (" + version + ") does not follow the allowed patterns (" + REGEX_LITTERAL + ")"
		));

	});

};
