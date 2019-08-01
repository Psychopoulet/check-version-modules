"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");

	// internal
	const checker = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("file existance", () => {

	it("should test not existing file", (done) => {

		checker("test.js", {
			"console": false
		}).then(() => {
			done(new Error("No error detected"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "Error detected is not as expected");
			assert.strictEqual(err instanceof Error, true, "Error detected is not as expected");

			done();

		});

	});

	it("should test exists", () => {

		return checker(join(__dirname, "packages", "empty_package.json"), {
			"console": false
		}).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, true, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

});
