"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");

	// internal
	const checker = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("old versions", () => {

	it("should test old major", () => {

		return checker(join(__dirname, "packages", "old_major_package.json")).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, false, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

	it("should test old minor", () => {

		return checker(join(__dirname, "packages", "old_minor_package.json")).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, false, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

	it("should test old patch", () => {

		return checker(join(__dirname, "packages", "old_patch_package.json")).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, true, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

	it("should test recent", () => {

		return checker(join(__dirname, "packages", "recent_package.json")).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, true, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

});
