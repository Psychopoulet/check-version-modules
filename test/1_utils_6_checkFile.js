"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const checkFile = require(join(__dirname, "..", "lib", "utils", "checkFile.js"));

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
