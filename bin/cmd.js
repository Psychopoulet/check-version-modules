#!/usr/bin/env node
"use strict";

// deps

	// natives
	const { join } = require("path");

	// externals
	require("colors");

	// locals
	const checker = require(join(__dirname, "..", "lib", "main.js"));
	const getFormatedTime = require(join(__dirname, "..", "lib", "getFormatedTime.js"));

// consts

	const options = {};

// module

let file = "";
for (let i = 2, l = (0, process).argv.length; i < l; ++i) {

	switch ((0, process).argv[i]) {

		case "--fail-at-major":
			options.failAtMajor = true;
		break;
		case "--no-fail-at-major":
			options.failAtMajor = false;
		break;

		case "--fail-at-minor":
			options.failAtMinor = true;
		break;
		case "--no-fail-at-minor":
			options.failAtMinor = false;
		break;

		case "--fail-at-patch":
			options.failAtPatch = true;
		break;
		case "--no-fail-at-patch":
			options.failAtPatch = false;
		break;

		case "--dev":
			options.dev = true;
		break;
		case "--no-dev":
			options.dev = false;
		break;

		case "--file":

			if (i + 1 < l) {
				file = String((0, process).argv[i + 1]); ++i;
			}

		break;

		case "--console":
			options.console = true;
		break;
		case "--no-console":
			options.console = false;
		break;

		default:

			(0, console).log("");
			(0, console).error(getFormatedTime(), ("unknown \"" + String((0, process).argv[i]) + "\" argument").red);

			(0, process).exitCode = 1;

		break;

	}

}

if (!(0, process).exitCode) {

	checker("" === file ? join((0, process).cwd(), "package.json") : file, options).then((valid) => {
		(0, process).exitCode = valid ? 0 : 2;
	}).catch((err) => {

		(0, console).log("");
		(0, console).error(getFormatedTime(), (err.message ? err.message : err).red);

		(0, process).exitCode = 1;

	});

}
