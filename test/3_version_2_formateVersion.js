"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { strictEqual } = require("node:assert");

	// internal
	const formateVersion = require(join(__dirname, "..", "lib", "cjs", "version", "formateVersion.js")).default;

// tests

describe("formateVersion", () => {

	it("should test \"x\" & \"*\" patterns", () => {

		strictEqual(formateVersion("x"), "x.x.x");
		strictEqual(formateVersion("*"), "x.x.x");

	});

	it("should test \"x.n.n\" & \"x.x.n\" & \"x.x.x\" patterns", () => {

		strictEqual(formateVersion("x.1.1"), "x.x.x");
		strictEqual(formateVersion("*.1.1"), "x.x.x");

		strictEqual(formateVersion("x.x.1"), "x.x.x");
		strictEqual(formateVersion("*.*.1"), "x.x.x");

		strictEqual(formateVersion("x.x.x"), "x.x.x");
		strictEqual(formateVersion("*.*.*"), "x.x.x");

		strictEqual(formateVersion("x.*.x"), "x.x.x");

	});

	it("should test \"n\" & \"n.x\" & \"n.x.x\" patterns", () => {

		strictEqual(formateVersion("1"), "1.x.x");
		strictEqual(formateVersion("1.x"), "1.x.x");
		strictEqual(formateVersion("1.x.x"), "1.x.x");

	});

	it("should test \"n.n\" & \"n.n.x\" patterns", () => {

		strictEqual(formateVersion("1.1"), "1.1.x");
		strictEqual(formateVersion("1.1.x"), "1.1.x");

	});

	it("should test \"n.n.n\" pattern", () => {

		strictEqual(formateVersion("1.1.1"), "1.1.1");

	});

	it("should test \"^n.n.n\" & \"^n.n.x\" & \"^n.x.x\" patterns", () => {

		strictEqual(formateVersion("^1.1.1"), "1.x.x");
		strictEqual(formateVersion("^1.1.x"), "1.x.x");
		strictEqual(formateVersion("^1.x.x"), "1.x.x");

	});

	it("should test \"~n.n.n\" & \"~n.n.x\" & \"~n.x.x\" patterns", () => {

		strictEqual(formateVersion("~1.1.1"), "1.1.x");
		strictEqual(formateVersion("~1.1.x"), "1.1.x");
		strictEqual(formateVersion("~1.x.x"), "1.x.x");

	});

	it("should test wrong pattern \"n.n.n.n\"", () => {

		strictEqual(formateVersion("1.1.1.1"), "1.1.1.1");

	});

});
