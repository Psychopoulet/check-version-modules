"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { strictEqual } = require("node:assert");

	// internal
	const checkFile = require(join(__dirname, "..", "lib", "cjs", "utils", "checkFile.js")).default;

// tests

describe("checkFile", () => {

	it("should test not a file", (done) => {

		checkFile("test").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test valid file", () => {
		return checkFile(__filename);
	});

});
