"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");

	// internal
	const checker = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("deps existance", () => {

	it("should test not existing deps", (done) => {

		checker(join(__dirname, "packages", "not_exists_package.json"), {
			"console": false
		}).then(() => {
			done(new Error("No error detected"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "Error detected is not as expected");
			assert.strictEqual(err instanceof Error, true, "Error detected is not as expected");

			done();

		});

	}).timeout(10 * 1000);

});
