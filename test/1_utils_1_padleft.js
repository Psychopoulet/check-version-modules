"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { strictEqual } = require("node:assert");

	// internal
	const padleft = require(join(__dirname, "..", "lib", "cjs", "utils", "padleft.js")).default;

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
