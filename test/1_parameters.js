"use strict";

// deps

	// natives
	const assert = require("assert");

	// internal
	const checker = require(require("path").join(__dirname, "..", "lib", "main.js"));

// tests

describe("parameters", () => {

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
