"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { strictEqual } = require("node:assert");

	// internal
	const checkNonNullPureObject = require(join(__dirname, "..", "lib", "cjs", "utils", "checkNonNullPureObject.js")).default;

// tests

describe("checkNonNullPureObject", () => {

	it("should test nothing", (done) => {

		checkNonNullPureObject().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object");
			strictEqual(err instanceof ReferenceError, true);

			done();

		});

	});

	it("should test not an object", (done) => {

		checkNonNullPureObject("test").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object");
			strictEqual(err instanceof TypeError, true);

			done();

		});

	});

	it("should test null", (done) => {

		checkNonNullPureObject(null).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object");
			strictEqual(err instanceof TypeError, true);

			done();

		});

	});

	it("should test an Array", (done) => {

		checkNonNullPureObject([]).then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object");
			strictEqual(err instanceof TypeError, true);

			done();

		});

	});

	it("should test object", () => {
		return checkNonNullPureObject({});
	});

});
