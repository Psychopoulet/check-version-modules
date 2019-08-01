"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const checkBoolean = require(join(__dirname, "..", "lib", "utils", "checkBoolean.js"));

// tests

describe("checkBoolean", () => {

	it("should test nothing", (done) => {

		checkBoolean().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof ReferenceError, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test not a string", (done) => {

		checkBoolean("test").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof TypeError, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test non empty string", () => {
		return checkBoolean(true);
	});

});
