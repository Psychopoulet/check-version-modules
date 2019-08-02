"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const sortDeps = require(join(__dirname, "..", "lib", "deps", "sortDeps.js"));

// tests

describe("sortDeps", () => {

	it("should test sort by dev 1", () => {

		const data = [
			{
				"dev": false,
				"name": "test1",
				"version": "1.1.1"
			},
			{
				"dev": true,
				"name": "test2",
				"version": "1.1.1"
			}
		];

		const sorted = sortDeps(data);

		strictEqual(typeof sorted, "object", "Generated data is not as expected");
		strictEqual(sorted instanceof Array, true, "Generated data is not as expected");
		strictEqual(sorted.length, 2, "Generated data is not as expected");

		strictEqual(sorted[0].name, "test1", "Generated data is not as expected");
		strictEqual(sorted[1].name, "test2", "Generated data is not as expected");

	});

	it("should test sort by dev 2", () => {

		const data = [
			{
				"dev": true,
				"name": "test2",
				"version": "1.1.1"
			},
			{
				"dev": false,
				"name": "test1",
				"version": "1.1.1"
			}
		];

		const sorted = sortDeps(data);

		strictEqual(typeof sorted, "object", "Generated data is not as expected");
		strictEqual(sorted instanceof Array, true, "Generated data is not as expected");
		strictEqual(sorted.length, 2, "Generated data is not as expected");

		strictEqual(sorted[0].name, "test1", "Generated data is not as expected");
		strictEqual(sorted[1].name, "test2", "Generated data is not as expected");

	});

	it("should test sort by name 1", () => {

		const data = [
			{
				"dev": false,
				"name": "test1",
				"version": "1.1.1"
			},
			{
				"dev": false,
				"name": "test2",
				"version": "1.1.1"
			}
		];

		const sorted = sortDeps(data);

		strictEqual(typeof sorted, "object", "Generated data is not as expected");
		strictEqual(sorted instanceof Array, true, "Generated data is not as expected");
		strictEqual(sorted.length, 2, "Generated data is not as expected");

		strictEqual(sorted[0].name, "test1", "Generated data is not as expected");
		strictEqual(sorted[1].name, "test2", "Generated data is not as expected");

	});

	it("should test sort by name 2", () => {

		const data = [
			{
				"dev": false,
				"name": "test2",
				"version": "1.1.1"
			},
			{
				"dev": false,
				"name": "test1",
				"version": "1.1.1"
			}
		];

		const sorted = sortDeps(data);

		strictEqual(typeof sorted, "object", "Generated data is not as expected");
		strictEqual(sorted instanceof Array, true, "Generated data is not as expected");
		strictEqual(sorted.length, 2, "Generated data is not as expected");

		strictEqual(sorted[0].name, "test1", "Generated data is not as expected");
		strictEqual(sorted[1].name, "test2", "Generated data is not as expected");

	});

	it("should test same package", () => {

		const data = [
			{
				"dev": false,
				"name": "test1",
				"version": "1.1.1"
			},
			{
				"dev": false,
				"name": "test1",
				"version": "1.1.1"
			}
		];

		const sorted = sortDeps(data);

		strictEqual(typeof sorted, "object", "Generated data is not as expected");
		strictEqual(sorted instanceof Array, true, "Generated data is not as expected");
		strictEqual(sorted.length, 2, "Generated data is not as expected");

		strictEqual(sorted[0].name, "test1", "Generated data is not as expected");
		strictEqual(sorted[1].name, "test1", "Generated data is not as expected");

	});

});
