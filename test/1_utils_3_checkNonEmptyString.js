"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const checkNonEmptyString = require(join(__dirname, "..", "lib", "utils", "checkNonEmptyString.js"));

// tests

describe("checkNonEmptyString", () => {

	it("should test nothing", (done) => {

		checkNonEmptyString().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof ReferenceError, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test not a string", (done) => {

		checkNonEmptyString(false).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof TypeError, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test empty string", (done) => {

		checkNonEmptyString("").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof RangeError, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test non empty string", () => {
		return checkNonEmptyString("1.1.1");
	});

});
