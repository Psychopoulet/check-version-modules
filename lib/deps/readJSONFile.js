/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { readFile } = require("node:fs/promises");

// module

module.exports = function readJSONFile (file) {

	return readFile(file, "utf-8").then(function parsing (content) {

		return Promise.resolve(JSON.parse(content));

	});

};
