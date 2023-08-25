/// <reference path="../../lib/cjs/main.d.cts" />

"use strict";

// deps

	// locals
	import checker = require("../../lib/cjs/main.cjs");

// test

checker("./package.json").then((valid: boolean): void => {
  console.log(valid ? "ok": "old versions detected");
}).catch((err: Error): void => {
  console.error(err);
});
