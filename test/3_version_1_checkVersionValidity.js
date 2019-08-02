"use strict";

// deps

	// natives
	const { join } = require("path");

	// internal
	const checkVersionValidity = require(join(__dirname, "..", "lib", "version", "checkVersionValidity.js"));

// tests

describe("checkVersionValidity", () => {

	it("should test \"x\" & \"*\" patterns", () => {

		return checkVersionValidity("x").then(() => {
			return checkVersionValidity("*");
		});

	});

	it("should test \"x.n.n\" & \"x.x.n\" & \"x.x.x\" patterns", () => {

		return checkVersionValidity("x.1.1").then(() => {
			return checkVersionValidity("x.x.1");
		}).then(() => {
			return checkVersionValidity("x.x.x");
		});

	});

	it("should test \"n\" pattern", () => {

		return checkVersionValidity("1");

	});

	it("should test \"n.n\" pattern", () => {

		return checkVersionValidity("1.1");

	});

	it("should test \"n.n.n\" pattern", () => {

		return checkVersionValidity("1.1.1");

	});

	it("should test \"^n.n.n\" pattern", () => {

		return checkVersionValidity("^1.1.1");

	});

	it("should test \"~n.n.n\" pattern", () => {

		return checkVersionValidity("~1.1.1");

	});

});
