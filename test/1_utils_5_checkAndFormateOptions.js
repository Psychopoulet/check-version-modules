"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { strictEqual } = require("node:assert");

	// internal
	const checkAndFormateOptions = require(join(__dirname, "..", "lib", "cjs", "utils", "checkAndFormateOptions.js")).default;

// tests

describe("checkAndFormateOptions", () => {

	it("should test with no options", () => {

		return checkAndFormateOptions().then((options) => {

			strictEqual(typeof options, "object", "Generated options is not as expected");
			strictEqual(options.failAtMajor, true, "Generated options is not as expected");
			strictEqual(options.failAtMinor, true, "Generated options is not as expected");
			strictEqual(options.failAtPatch, false, "Generated options is not as expected");
			strictEqual(options.dev, true, "Generated options is not as expected");
			strictEqual(options.console, true, "Generated options is not as expected");

			return Promise.resolve();

		});

	});

	it("should test with wrong failAtMajor", (done) => {

		checkAndFormateOptions({
			"failAtMajor": "test"
		}).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test with wrong failAtMinor", (done) => {

		checkAndFormateOptions({
			"failAtMinor": "test"
		}).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test with wrong failAtPatch", (done) => {

		checkAndFormateOptions({
			"failAtPatch": "test"
		}).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test with wrong dev", (done) => {

		checkAndFormateOptions({
			"dev": "test"
		}).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test with wrong console", (done) => {

		checkAndFormateOptions({
			"console": "test"
		}).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test valid file", () => {

		return checkAndFormateOptions({
			"failAtMajor": false,
			"failAtMinor": false,
			"failAtPatch": true,
			"dev": false,
			"console": false
		}).then((options) => {

			strictEqual(typeof options, "object", "Generated options is not as expected");
			strictEqual(options.failAtMajor, false, "Generated options is not as expected");
			strictEqual(options.failAtMinor, false, "Generated options is not as expected");
			strictEqual(options.failAtPatch, true, "Generated options is not as expected");
			strictEqual(options.dev, false, "Generated options is not as expected");
			strictEqual(options.console, false, "Generated options is not as expected");

			return Promise.resolve();

		});

	});

});
