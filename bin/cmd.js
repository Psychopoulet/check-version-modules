#!/usr/bin/env node
"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const checker = require(join(__dirname, "..", "lib", "main.js"));

// module

checker(join((0, process).cwd(), "package.json")).then((valid) => {
	(0, process).exitCode = valid ? 0 : 2;
}).catch((err) => {
	(0, console).error(err);
	(0, process).exitCode = 1;
});
