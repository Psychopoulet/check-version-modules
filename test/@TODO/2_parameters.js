"use strict";

// deps

	// natives
	const assert = require("assert");

	// internal
	const checker = require(require("path").join(__dirname, "..", "lib", "utils", "main.js"));

// tests

describe("parameters", () => {

	describe("options", () => {

		it("should test missing data", (done) => {

			checker().then(() => {
				done(new Error("No error detected"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Error detected is not as expected");
				assert.strictEqual(err instanceof ReferenceError, true, "Error detected is not as expected");

				done();

			});

		});

		it("should test wrong data", (done) => {

			checker(false).then(() => {
				done(new Error("No error detected"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Error detected is not as expected");
				assert.strictEqual(err instanceof TypeError, true, "Error detected is not as expected");

				done();

			});

		});

		it("should test empty data", (done) => {

			checker("").then(() => {
				done(new Error("No error detected"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Error detected is not as expected");
				assert.strictEqual(err instanceof Error, true, "Error detected is not as expected");

				done();

			});

		});

	});

	describe("options", () => {

		it("should test wrong data", (done) => {

			checker("test", false).then(() => {
				done(new Error("No error detected"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Error detected is not as expected");
				assert.strictEqual(err instanceof TypeError, true, "Error detected is not as expected");

				done();

			});

		});

		it("should test wrong failAtMajor", (done) => {

			checker("test", {
				"failAtMajor": "test"
			}).then(() => {
				done(new Error("No error detected"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Error detected is not as expected");
				assert.strictEqual(err instanceof TypeError, true, "Error detected is not as expected");

				done();

			});

		});

		it("should test wrong failAtMinor", (done) => {

			checker("test", {
				"failAtMinor": "test"
			}).then(() => {
				done(new Error("No error detected"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Error detected is not as expected");
				assert.strictEqual(err instanceof TypeError, true, "Error detected is not as expected");

				done();

			});

		});

		it("should test wrong failAtPatch", (done) => {

			checker("test", {
				"failAtPatch": "test"
			}).then(() => {
				done(new Error("No error detected"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Error detected is not as expected");
				assert.strictEqual(err instanceof TypeError, true, "Error detected is not as expected");

				done();

			});

		});

		it("should test wrong dev", (done) => {

			checker("test", {
				"dev": "test"
			}).then(() => {
				done(new Error("No error detected"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Error detected is not as expected");
				assert.strictEqual(err instanceof TypeError, true, "Error detected is not as expected");

				done();

			});

		});

		it("should test wrong console", (done) => {

			checker("test", {
				"console": "test"
			}).then(() => {
				done(new Error("No error detected"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Error detected is not as expected");
				assert.strictEqual(err instanceof TypeError, true, "Error detected is not as expected");

				done();

			});

		});

	});

});
