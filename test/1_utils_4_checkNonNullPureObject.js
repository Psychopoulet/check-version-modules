"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const checkNonNullPureObject = require(join(__dirname, "..", "lib", "utils", "checkNonNullPureObject.js"));

// tests

describe("checkNonNullPureObject", () => {

	it("should test nothing", (done) => {

		checkNonNullPureObject().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof ReferenceError, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test not an object", (done) => {

		checkNonNullPureObject("test").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof TypeError, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test null", (done) => {

		checkNonNullPureObject(null).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof TypeError, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test an Array", (done) => {

		checkNonNullPureObject([]).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof TypeError, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test object", () => {
		return checkNonNullPureObject({});
	});

});
