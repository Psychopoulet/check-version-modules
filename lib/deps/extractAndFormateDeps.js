/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// externals
	const { join } = require("path");

	// locals
	const readJSONFile = require(join(__dirname, "readJSONFile.js"));
	const formateDeps = require(join(__dirname, "formateDeps.js"));
	const sortDeps = require(join(__dirname, "sortDeps.js"));

// module

module.exports = function extractAndFormateDeps (file, dev) {

	return Promise.resolve().then(function extract () {

		return readJSONFile(file);

	}).then(function formate (packageData) {

		return Promise.resolve(formateDeps(packageData, dev));

	}).then(function sort (dependencies) {

		return Promise.resolve(sortDeps(dependencies));

	});

};
