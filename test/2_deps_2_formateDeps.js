"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const readJSONFile = require(join(__dirname, "..", "lib", "deps", "readJSONFile.js"));
	const formateDeps = require(join(__dirname, "..", "lib", "deps", "formateDeps.js"));

// tests

describe("formateDeps", () => {

	let data = null;

	before(() => {

		return readJSONFile(join(__dirname, "..", "package.json")).then(({ dependencies, devDependencies }) => {

			data = {
				dependencies,
				devDependencies
			};

			return Promise.resolve();

		});

	});

	it("should test formate valid package without dev", () => {

		const formated = formateDeps(data);

		strictEqual(typeof formated, "object", "Generated data is not as expected");
		strictEqual(formated instanceof Array, true, "Generated data is not as expected");
		strictEqual(formated.length, 0, "Generated data is not as expected");

	});

	it("should test formate valid package with dev", () => {

		const formated = formateDeps(data, true);

		strictEqual(typeof formated, "object", "Generated data is not as expected");
		strictEqual(formated instanceof Array, true, "Generated data is not as expected");
		strictEqual(formated.length, 8, "Generated data is not as expected");

	});

});
