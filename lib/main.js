
"use strict";

// deps

	// natives
	const { lstat } = require("fs");

	// externals
	require("colors");

	// locals
	const getFormatedTime = require(require("path").join(__dirname, "getFormatedTime.js"));
	const downloadPackageData = require(require("path").join(__dirname, "downloadPackageData.js"));

// consts

	const DEFAULT_OPTIONS = {
		"failAtMajor": true,
		"failAtMinor": true,
		"failAtPatch": false,
		"dev": true,
		"console": true
	};

	const REGEX = RegExp("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");

// private

	// methods

		/**
		* Check dependencies
		* @param {Array} dependencies : dependencies to check
		* @param {object} options : compilation's options
		* @param {boolean} valid : is tests passed
		* @returns {Promise} : Result operation
		*/
		function _checkDependenciesUpdates (dependencies, options, valid = true) {

			if (!dependencies.length) {
				return Promise.resolve(valid);
			}
			else {

				const dependency = dependencies.shift();

				return !REGEX.test(dependency.version) ? Promise.reject(new Error(
					"Dependency version (" + dependency.version +  ") must be strict : ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$"
				)) : Promise.resolve().then(() => {

					// get registery data
					return downloadPackageData(dependency.name)

					// extract last version
					.then((data) => {

						return !data["dist-tags"] || !data["dist-tags"].latest ?
							Promise.reject(new Error("\"" + dependency.name + "\" registry does not return latest version")) :
							Promise.resolve(data["dist-tags"].latest);

					// diff
					}).then((latest) => {

						let result = valid;

						const latestVersions = latest.split(".");
						const versions = dependency.version.split(".");

						if (parseInt(latestVersions[0], 10) > parseInt(versions[0], 10)) {

							if (options.failAtMajor) {
								result = false;
							}

							if (options.console) {

								(0, console).log(getFormatedTime(),
									dependency.path, "=>", (dependency.version + " < " + latest).bgRed
								);

							}

						}
						else if (parseInt(latestVersions[1], 10) > parseInt(versions[1], 10)) {

							if (options.failAtMinor) {
								result = false;
							}

							if (options.console) {

								(0, console).log(getFormatedTime(),
									dependency.path, "=>", (dependency.version + " < " + latest).red
								);

							}

						}
						else if (parseInt(latestVersions[2], 10) > parseInt(versions[2], 10)) {

							if (options.failAtPatch) {
								result = false;
							}

							if (options.console) {

								(0, console).log(getFormatedTime(),
									dependency.path, "=>", (dependency.version + " < " + latest).yellow
								);

							}

						}
						else if (options.console) {

							(0, console).log(getFormatedTime(),
								dependency.path, "=>", "Ok".green
							);

						}

						return !dependencies.length ? Promise.resolve(result) : _checkDependenciesUpdates(dependencies, options, result);

					});

				});

			}

		}

// module

module.exports = (file, options = DEFAULT_OPTIONS) => {

	// check params
	return Promise.resolve().then(() => {

		if ("undefined" === typeof file) {
			return Promise.reject(new ReferenceError("Missing \"file\" parameter"));
		}
		else if ("string" !== typeof file) {
			return Promise.reject(new TypeError("\"file\" parameter is not a string"));
		}
		else if ("" === file.trim()) {
			return Promise.reject(new Error("\"file\" parameter is empty"));
		}

		else if ("object" !== typeof options) {
			return Promise.reject(new TypeError("\"options\" parameter is not an object"));
		}

		else {

			return Promise.resolve().then(() => {

				options.failAtMajor = "undefined" === typeof options.failAtMajor ? DEFAULT_OPTIONS.failAtMajor : options.failAtMajor;
				options.failAtMinor = "undefined" === typeof options.failAtMinor ? DEFAULT_OPTIONS.failAtMinor : options.failAtMinor;
				options.failAtPatch = "undefined" === typeof options.failAtPatch ? DEFAULT_OPTIONS.failAtPatch : options.failAtPatch;
				options.dev = "undefined" === typeof options.dev ? DEFAULT_OPTIONS.dev : options.dev;
				options.console = "undefined" === typeof options.console ? DEFAULT_OPTIONS.console : options.console;

				if ("boolean" !== typeof options.failAtMajor) {
					return Promise.reject(new TypeError("\"options.failAtMajor\" parameter is not a boolean"));
				}
				else if ("boolean" !== typeof options.failAtMinor) {
					return Promise.reject(new TypeError("\"options.failAtMinor\" parameter is not a boolean"));
				}
				else if ("boolean" !== typeof options.failAtPatch) {
					return Promise.reject(new TypeError("\"options.failAtPatch\" parameter is not a boolean"));
				}
				else if ("boolean" !== typeof options.dev) {
					return Promise.reject(new TypeError("\"options.dev\" parameter is not a boolean"));
				}
				else if ("boolean" !== typeof options.console) {
					return Promise.reject(new TypeError("\"options.console\" parameter is not a boolean"));
				}

				else {
					return Promise.resolve();
				}

			});

		}

	// check file existance
	}).then(() => {

		return new Promise((resolve) => {

			lstat(file, (err, stats) => {

				if (err || !stats.isFile()) {
					resolve(false);
				}
				else {
					resolve(true);
				}

			});

		}).then((exists) => {
			return exists ? Promise.resolve() : Promise.reject(new Error("File \"" + file + "\" does not exists."));
		});

	// extract deps
	}).then(() => {

		const packageData = require(file);

		const result = [];

			const packageDependencies = packageData.dependencies;
			Object.keys(packageDependencies).forEach((dependency) => {

				result.push({
					"dev": false,
					"name": dependency,
					"version": packageDependencies[dependency]
				});

			});

			if (options.dev) {

				const packageDevDependencies = packageData.devDependencies;
				if (packageDevDependencies) {

					Object.keys(packageDevDependencies).forEach((dependency) => {

						result.push({
							"dev": true,
							"name": dependency,
							"version": packageDevDependencies[dependency]
						});

					});

				}

			}

		return Promise.resolve(result);

	// sort deps
	}).then((dependencies) => {

		const result = [];

			dependencies.sort((compared, compareTo) => {

				if (compared.dev && !compareTo.dev) {
					return 1;
				}
				else if (!compared.dev && compareTo.dev) {
					return -1;
				}
					else if (compared.name > compareTo.name) {
						return 1;
					}
					else if (compared.name < compareTo.name) {
						return -1;
					}
						else {
							return 0;
						}

			}).forEach((dependency) => {

				let path = dependency.name;
				path = dependency.dev ? "dev/" + path : path;

				result.push({
					path,
					"name": dependency.name,
					"version": dependency.version
				});

			});

		return Promise.resolve(result);

	// execute task
	}).then((dependencies) => {

		if (options.console) {
			(0, console).log(getFormatedTime(), file);
		}

		return _checkDependenciesUpdates(dependencies, {
			"failAtMajor": options.failAtMajor,
			"failAtMinor": options.failAtMinor,
			"failAtPatch": options.failAtPatch,
			"console": options.console
		});

	});

};
