"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");

	// internal
	const checker = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("unsorted versions", () => {

	it("should test unsorted package", () => {

		return checker(join(__dirname, "packages", "unsorted_package.json")).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, true, "Error detected is not as expected");

			return Promise.resolve();

		});

	}).timeout(5 * 1000);

});
