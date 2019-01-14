"use strict";

// deps

	// natives
	const assert = require("assert");

	// internal
	const padleft = require(require("path").join(__dirname, "..", "lib", "padleft.js"));

// tests

describe("padleft", () => {

	it("should test padleft already padded", () => {
		assert.strictEqual(padleft("01"), "01", "Padded data is not as expected");
	});

	it("should test padleft not padded", () => {
		assert.strictEqual(padleft("1"), "01", "Padded data is not as expected");
	});

});
