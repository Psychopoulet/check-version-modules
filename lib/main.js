
"use strict";

// deps

	// natives
	const { join } = require("node:path");

	// locals

	const extractAndFormateDeps = require(join(__dirname, "deps", "extractAndFormateDeps.js"));
	const checkDependenciesUpdates = require(join(__dirname, "deps", "checkDependenciesUpdates.js"));

	const checkFile = require(join(__dirname, "utils", "checkFile.js"));
	const checkAndFormateOptions = require(join(__dirname, "utils", "checkAndFormateOptions.js"));
	const getFormatedTime = require(join(__dirname, "utils", "getFormatedTime.js"));

// module

module.exports = (file, _options) => {

	// check params
	return Promise.resolve().then(() => {

		return checkFile(file);

	}).then(() => {

		return checkAndFormateOptions(_options);

	}).then((options) => {

		return extractAndFormateDeps(file, options.dev).then((dependencies) => {

			if (options.console) {
				(0, console).log(getFormatedTime(), file);
			}

			return checkDependenciesUpdates(dependencies, {
				"failAtMajor": options.failAtMajor,
				"failAtMinor": options.failAtMinor,
				"failAtPatch": options.failAtPatch,
				"console": options.console
			});

		});

	});

};
