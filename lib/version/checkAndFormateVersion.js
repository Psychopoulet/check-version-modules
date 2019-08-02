/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// externals
	const checkVersionValidity = require(join(__dirname, "checkVersionValidity.js"));
	const formateVersion = require(join(__dirname, "formateVersion.js"));

// module

module.exports = function checkAndFormateVersion (version) {

	return checkVersionValidity(version).then(function formate () {

		return Promise.resolve(formateVersion(version));

	});

};
