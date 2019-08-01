
"use strict";

// deps

	// externals
	const { join } = require("path");
	require("colors");

	// locals

	const downloadPackageData = require(join(__dirname, "downloadPackageData.js"));

	const extractAndFormateDeps = require(join(__dirname, "deps", "extractAndFormateDeps.js"));

	const checkFile = require(join(__dirname, "utils", "checkFile.js"));
	const checkAndFormateOptions = require(join(__dirname, "utils", "checkAndFormateOptions.js"));
	const getFormatedTime = require(join(__dirname, "utils", "getFormatedTime.js"));

// consts

	const REGEX = RegExp("^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$");

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
					"Dependency version (" + dependency.version + ") must be strict : ^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$"
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

module.exports = (file, _options) => {

	// check params
	return Promise.resolve().then(() => {

		return checkFile(file);

	}).then(() => {

		return checkAndFormateOptions(_options);

	}).then((options) => {

		return extractAndFormateDeps(file, options.dev).then((dependencies) => {

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

	});

};
