"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// internal
	const checkAndFormateOptions = require(join(__dirname, "..", "lib", "utils", "checkAndFormateOptions.js"));
	const checkDependenciesUpdates = require(join(__dirname, "..", "lib", "deps", "checkDependenciesUpdates.js"));

// private

	/**
	* Return formated modules
	* @returns {Array} : formated modules
	*/
	function _getModules () {

		return [
			{
				"version": "",
				"name": "check-version-modules",
				"path": "check-version-modules"
			}
		];

	}

// tests

describe("checkDependenciesUpdates", () => {

	let options = null;

	before(() => {

		return checkAndFormateOptions().then((opt) => {
			options = opt;
		});

	});

	it("should test \"x\" & \"*\" patterns", () => {

		return Promise.resolve().then(() => {

			const modules = _getModules();
				modules[0].version = "*";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		});

	});

	it("should test \"x\" & \"*\" patterns", () => {

		// strictEqual(formateVersion("x"), "x.x.x", "Formated version is not as expected");
		// strictEqual(formateVersion("*"), "x.x.x", "Formated version is not as expected");

	});

	it("should test \"x.n.n\" & \"x.x.n\" & \"x.x.x\" patterns", () => {

		// strictEqual(formateVersion("x.1.1"), "x.x.x", "Formated version is not as expected");
		// strictEqual(formateVersion("*.1.1"), "x.x.x", "Formated version is not as expected");

		// strictEqual(formateVersion("x.x.1"), "x.x.x", "Formated version is not as expected");
		// strictEqual(formateVersion("*.*.1"), "x.x.x", "Formated version is not as expected");

		// strictEqual(formateVersion("x.x.x"), "x.x.x", "Formated version is not as expected");
		// strictEqual(formateVersion("*.*.*"), "x.x.x", "Formated version is not as expected");

		// strictEqual(formateVersion("x.*.x"), "x.x.x", "Formated version is not as expected");

	});

	it("should test \"n\" & \"n.x\" & \"n.x.x\" patterns", () => {

		// strictEqual(formateVersion("1"), "1.x.x", "Formated version is not as expected");
		// strictEqual(formateVersion("1.x"), "1.x.x", "Formated version is not as expected");
		// strictEqual(formateVersion("1.x.x"), "1.x.x", "Formated version is not as expected");

	});

	it("should test \"n.n\" & \"n.n.x\" patterns", () => {

		// strictEqual(formateVersion("1.1"), "1.1.x", "Formated version is not as expected");
		// strictEqual(formateVersion("1.1.x"), "1.1.x", "Formated version is not as expected");

	});

	it("should test \"n.n.n\" pattern", () => {

		// strictEqual(formateVersion("1.1.1"), "1.1.1", "Formated version is not as expected");

	});

	it("should test \"^n.n.n\" & \"^n.n.x\" & \"^n.x.x\" patterns", () => {

		// strictEqual(formateVersion("^1.1.1"), "1.x.x", "Formated version is not as expected");
		// strictEqual(formateVersion("^1.1.x"), "1.x.x", "Formated version is not as expected");
		// strictEqual(formateVersion("^1.x.x"), "1.x.x", "Formated version is not as expected");

	});

	it("should test \"~n.n.n\" & \"~n.n.x\" & \"~n.x.x\" patterns", () => {

		// strictEqual(formateVersion("~1.1.1"), "1.1.x", "Formated version is not as expected");
		// strictEqual(formateVersion("~1.1.x"), "1.1.x", "Formated version is not as expected");
		// strictEqual(formateVersion("~1.x.x"), "1.x.x", "Formated version is not as expected");

	});

	it("should test wrong patterns", () => {

		// strictEqual(formateVersion("1.1.1.1"), "1.1.1.1", "Formated version is not as expected");

	});

});
