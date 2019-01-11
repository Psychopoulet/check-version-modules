"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");

	// internal
	const checker = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("file existance", () => {

	it("should test does not exist", (done) => {

		checker("test.js").then(() => {
			done(new Error("No error detected"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "Error detected is not as expected");
			assert.strictEqual(err instanceof Error, true, "Error detected is not as expected");

			done();

		});

	});

	it("should test exists", () => {
		return checker(join(__dirname, "packages", "empty_package.json"));
	});

});
