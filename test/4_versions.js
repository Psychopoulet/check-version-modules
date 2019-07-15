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

		return checker(join(__dirname, "packages", "old_major_package.json"), {
			"failAtMajor": true,
			"failAtMinor": false,
			"failAtPatch": false,
			"console": true // for console tests
		}).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, false, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

	it("should test old major with approx", (done) => {

		checker(join(__dirname, "packages", "old_major_package_with_approx.json"), {
			"failAtMajor": true,
			"failAtMinor": false,
			"failAtPatch": false,
			"console": true // for console tests
		}).then((valid) => {
			done(new Error("Not strict version does not generate an Error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "Generated error is not as expected");
			assert.strictEqual(err instanceof Error, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test old minor", () => {

		return checker(join(__dirname, "packages", "old_minor_package.json"), {
			"failAtMajor": true,
			"failAtMinor": true,
			"failAtPatch": false,
			"console": true // for console tests
		}).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, false, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

	it("should test old patch", () => {

		return checker(join(__dirname, "packages", "old_patch_package.json"), {
			"failAtMajor": true,
			"failAtMinor": true,
			"failAtPatch": true,
			"console": true // for console tests
		}).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, false, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

	it("should test recent", () => {

		return checker(join(__dirname, "packages", "recent_package.json"), {
			"console": false
		}).then((valid) => {

			assert.strictEqual(typeof valid, "boolean", "Returned data detected is not as expected");
			assert.strictEqual(valid, true, "Error detected is not as expected");

			return Promise.resolve();

		});

	});

});
