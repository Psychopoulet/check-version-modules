"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const readJSONFile = require(join(__dirname, "..", "lib", "deps", "readJSONFile.js"));

// tests

describe("readJSONFile", () => {

	it("should test not a file", (done) => {

		readJSONFile("test").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test valid file", () => {

		return readJSONFile(join(__dirname, "..", "package.json")).then((data) => {

			strictEqual(typeof data, "object", "Generated data is not as expected");
			strictEqual(typeof data.name, "string", "Generated data is not as expected");
			strictEqual(typeof data.version, "string", "Generated data is not as expected");
			strictEqual(typeof data.description, "string", "Generated data is not as expected");
			strictEqual(typeof data.main, "string", "Generated data is not as expected");
			strictEqual(typeof data.scripts, "object", "Generated data is not as expected");
			strictEqual(typeof data.bin, "object", "Generated data is not as expected");
			strictEqual(typeof data.files, "object", "Generated data is not as expected");
			strictEqual(data.files instanceof Array, true, "Generated data is not as expected");
			strictEqual(typeof data.husky, "object", "Generated data is not as expected");
			strictEqual(typeof data.repository, "object", "Generated data is not as expected");
			strictEqual(typeof data.keywords, "object", "Generated data is not as expected");
			strictEqual(data.keywords instanceof Array, true, "Generated data is not as expected");
			strictEqual(typeof data.author, "string", "Generated data is not as expected");
			strictEqual(typeof data.license, "string", "Generated data is not as expected");
			strictEqual(typeof data.bugs, "object", "Generated data is not as expected");
			strictEqual(typeof data.dependencies, "object", "Generated data is not as expected");
			strictEqual(typeof data.devDependencies, "object", "Generated data is not as expected");
			strictEqual(typeof data.homepage, "string", "Generated data is not as expected");
			strictEqual(typeof data.engines, "object", "Generated data is not as expected");

			return Promise.resolve();

		});

	});

});
