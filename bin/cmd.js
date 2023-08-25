#!/usr/bin/env node
"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { EOL } = require("node:os");

	// locals
	const checker = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// consts

	const ARGS = (0, process).argv.slice(2, (0, process).argv.length);

// module

Promise.resolve().then(() => {

	const errors = [];
	let file = "";
	const options = {};

		ARGS.forEach((arg, i) => {

			if ("--" !== arg && arg.startsWith("--")) {

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

						if (i + 1 < ARGS.length) {
							file = String((0, process).argv[i + 1]);
						}

					break;

					case "--console":
						options.console = true;
					break;
					case "--no-console":
						options.console = false;
					break;

					default:
						errors.push(new RangeError("Unknown \"" + String(arg) + "\" argument"));
					break;

				}

			}

		});

	return errors.length ?
		Promise.reject(new Error(errors.join(EOL))) :
		checker("" === file ? join((0, process).cwd(), "package.json") : file, options).then((valid) => {

			(0, process).exitCode = valid ? 0 : 2;
			(0, process).exit(valid ? 0 : 2);

		});

}).catch((err) => {

	(0, console).log("");
	(0, console).error(err.message ? err.message : err);

	(0, process).exitCode = 1;
	(0, process).exit(1);

});
