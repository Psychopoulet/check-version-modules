/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// externals
	const { join } = require("path");
	require("colors");

	// locals

	const downloadPackageData = require(join(__dirname, "downloadPackageData.js"));
	const getFormatedTime = require(join(__dirname, "..", "utils", "getFormatedTime.js"));
	const checkVersionValidity = require(join(__dirname, "..", "version", "checkVersionValidity.js"));

// private

	// methods

		/**
		* Check dependencies
		* @param {Array} dependencies : dependencies to check
		* @param {object} options : compilation's options
		* @param {number} i : stepper
		* @param {boolean} valid : is tests passed
		* @returns {Promise} : Result operation
		*/
		function _checkDependenciesUpdates (dependencies, options, i = 0, valid = true) {

			if (i >= dependencies.length) {
				return Promise.resolve(valid);
			}
			else {

				const dependency = dependencies[i];

				return Promise.resolve().then(function checkVersion () {

					return checkVersionValidity(dependency.version);

				}).then(function getRegisteryData () {

					return downloadPackageData(dependency.name);

				}).then(function extractLastVersion (data) {

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

					return !dependencies.length ? Promise.resolve(result) : _checkDependenciesUpdates(dependencies, options, i + 1, result);

				});

			}

		}

// module

module.exports = _checkDependenciesUpdates;
