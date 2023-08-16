/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { lstat } = require("node:fs");

	// natives
	const checkNonEmptyString = require(join(__dirname, "checkNonEmptyString.js"));

// module

module.exports = function checkFile (file) {

	return checkNonEmptyString(file).then(function checkFileExistance () {

		return new Promise(function Promisification (resolve, reject) {

			lstat(file, function check (err, stats) {

				return !err && stats.isFile() ? resolve() : reject(new Error(
					"\"file\" parameter (" + file + ") is not a valid file"
				));

			});

		});

	});

};
