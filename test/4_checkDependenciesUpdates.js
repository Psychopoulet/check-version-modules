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

		return checkAndFormateOptions({
			"console": false
		}).then((opt) => {
			options = opt;
		});

	});

	it("should test \"x\" & \"*\" patterns", () => {

		return Promise.resolve().then(() => {

			const modules = _getModules();
				modules[0].version = "x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "*";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		});

	});

	it("should test \"x.n.n\" & \"x.x.n\" & \"x.x.x\" patterns", () => {

		return Promise.resolve().then(() => {

			const modules = _getModules();
				modules[0].version = "x.1.1";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "x.x.1";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "x.x.x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		});

	});

	it("should test \"n\" & \"n.x\" & \"n.x.x\" patterns", () => {

		return Promise.resolve().then(() => {

			const modules = _getModules();
				modules[0].version = "1";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "1.x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "1.x.x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		});

	});

	it("should test \"n.n\" & \"n.n.x\" patterns", () => {

		return Promise.resolve().then(() => {

			const modules = _getModules();
				modules[0].version = "1.4";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "1.4.x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		});

	});

	it("should test \"n.n.n\" pattern", () => {

		const modules = _getModules();
			modules[0].version = "1.4.1";
		return checkDependenciesUpdates(modules, options).then((valid) => {

			strictEqual(valid, true, "Generated validation is not as expected");

			return Promise.resolve();

		});

	});

	it("should test \"^n.n.n\" & \"^n.n.x\" & \"^n.x.x\" patterns", () => {

		return Promise.resolve().then(() => {

			const modules = _getModules();
				modules[0].version = "^1.4.0";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "^1.2.x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "^1.x.x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		});

	});

	it("should test \"~n.n.n\" & \"~n.n.x\" & \"~n.x.x\" patterns", () => {

		return Promise.resolve().then(() => {

			const modules = _getModules();
				modules[0].version = "~1.4.0";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "~1.4.x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		}).then(() => {

			const modules = _getModules();
				modules[0].version = "~1.x.x";
			return checkDependenciesUpdates(modules, options).then((valid) => {

				strictEqual(valid, true, "Generated validation is not as expected");

				return Promise.resolve();

			});

		});

	});

	it("should test wrong pattern \"n.n.n.n\" & \"^~n.n.n\"", () => {

		const modules = _getModules();
			modules[0].version = "1.2.1.1";
		checkDependenciesUpdates(modules, options).then((runnable) => {

			strictEqual(typeof runnable, "boolean", "Generated result is not as expected");
			strictEqual(runnable, false, "Generated result is not as expected");

		});

	});

	it("should test wrong pattern \"^~n.n.n\"", () => {

		const modules = _getModules();
			modules[0].version = "^~1.2.1.1";
		checkDependenciesUpdates(modules, options).then((runnable) => {

			strictEqual(typeof runnable, "boolean", "Generated result is not as expected");
			strictEqual(runnable, false, "Generated result is not as expected");

		});

	});

	it("should test wrong pattern string", () => {

		const modules = _getModules();
			modules[0].version = "git+https://git@github.com/Psychopoulet/check-version-modules";
		checkDependenciesUpdates(modules, {
			...options,
			"console": true
		}).then((runnable) => {

			strictEqual(typeof runnable, "boolean", "Generated result is not as expected");
			strictEqual(runnable, false, "Generated result is not as expected");

		});

	});

	describe("checkDependenciesUpdates", () => {

		it("should test good version", () => {

			return checkAndFormateOptions({
				"failAtMajor": true,
				"failAtMinor": true,
				"failAtPatch": true,
				"console": true
			}).then((opt) => {

				const modules = _getModules();
					modules[0].version = "1.4.0";
				return checkDependenciesUpdates(modules, opt).then((valid) => {

					strictEqual(valid, true, "Generated validation is not as expected");

					return Promise.resolve();

				});

			});

		});

		it("should test old major version", () => {

			return checkAndFormateOptions({
				"failAtMajor": true,
				"failAtMinor": true,
				"failAtPatch": true,
				"console": true
			}).then((opt) => {

				const modules = _getModules();
					modules[0].version = "0.2.1";
				return checkDependenciesUpdates(modules, opt).then((valid) => {

					strictEqual(valid, false, "Generated validation is not as expected");

					return Promise.resolve();

				});

			});

		});

		it("should test old minor version", () => {

			return checkAndFormateOptions({
				"failAtMajor": true,
				"failAtMinor": true,
				"failAtPatch": true,
				"console": true
			}).then((opt) => {

				const modules = _getModules();
					modules[0].version = "1.2.0";
				return checkDependenciesUpdates(modules, opt).then((valid) => {

					strictEqual(valid, false, "Generated validation is not as expected");

					return Promise.resolve();

				});

			});

		});

		it("should test old patch version", () => {

			return checkAndFormateOptions({
				"failAtMajor": true,
				"failAtMinor": true,
				"failAtPatch": true,
				"console": true
			}).then((opt) => {

				const modules = _getModules();
					modules[0].version = "1.3.0";
				return checkDependenciesUpdates(modules, opt).then((valid) => {

					strictEqual(valid, false, "Generated validation is not as expected");

					return Promise.resolve();

				});

			});

		});

	});

});
