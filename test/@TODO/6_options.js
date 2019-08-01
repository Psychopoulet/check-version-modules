"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");

	// internal
	const checker = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("options", () => {

	it("should test old major", () => {

		const file = join(__dirname, "packages", "old_major_package.json");

		return checker(file, {
			"failAtMajor": true,
			"failAtMinor": false,
			"failAtPatch": false,
			"console": false
		}).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, false, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

	it("should test old minor", () => {

		const file = join(__dirname, "packages", "old_minor_package.json");

		return checker(file, {
			"failAtMajor": true,
			"failAtMinor": true,
			"failAtPatch": false,
			"console": false
		}).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, false, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

	it("should test old patch", () => {

		const file = join(__dirname, "packages", "old_patch_package.json");

		return checker(file, {
			"failAtMajor": true,
			"failAtMinor": true,
			"failAtPatch": true,
			"console": false
		}).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, false, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

});