"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const padleft = require(join(__dirname, "..", "lib", "utils", "padleft.js"));

// tests

describe("padleft", () => {

	it("should test padleft already padded", () => {
		strictEqual(padleft("01"), "01", "Padded data is not as expected");
	});

	it("should test padleft not padded", () => {
		strictEqual(padleft("1"), "01", "Padded data is not as expected");
	});

	it("should test number padleft not padded", () => {
		strictEqual(padleft(1), "01", "Padded data is not as expected");
	});

});
