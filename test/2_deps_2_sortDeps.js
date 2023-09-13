"use strict";

// deps

	// natives
	const { join } = require("node:path");
	const { strictEqual } = require("node:assert");

	// internal
	const sortDeps = require(join(__dirname, "..", "lib", "cjs", "deps", "sortDeps.js")).default;

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

		strictEqual(typeof sorted, "object");
		strictEqual(sorted instanceof Array, true);
		strictEqual(sorted.length, 2);

		strictEqual(sorted[0].name, "test1");
		strictEqual(sorted[1].name, "test2");

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

		strictEqual(typeof sorted, "object");
		strictEqual(sorted instanceof Array, true);
		strictEqual(sorted.length, 2);

		strictEqual(sorted[0].name, "test1");
		strictEqual(sorted[1].name, "test2");

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

		strictEqual(typeof sorted, "object");
		strictEqual(sorted instanceof Array, true);
		strictEqual(sorted.length, 2);

		strictEqual(sorted[0].name, "test1");
		strictEqual(sorted[1].name, "test2");

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

		strictEqual(typeof sorted, "object");
		strictEqual(sorted instanceof Array, true);
		strictEqual(sorted.length, 2);

		strictEqual(sorted[0].name, "test1");
		strictEqual(sorted[1].name, "test2");

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

		strictEqual(typeof sorted, "object");
		strictEqual(sorted instanceof Array, true);
		strictEqual(sorted.length, 2);

		strictEqual(sorted[0].name, "test1");
		strictEqual(sorted[1].name, "test1");

	});

});
