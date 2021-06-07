/*
	eslint-disable prefer-arrow-callback, max-len
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
	const checkAndFormateVersion = require(join(__dirname, "..", "version", "checkAndFormateVersion.js"));

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

			return i >= dependencies.length ? Promise.resolve(valid) : Promise.resolve().then(function run () {

				const dependency = dependencies[i];

				return Promise.resolve().then(function isVersionRunnable () {

					return checkVersionValidity(dependency.version, false);

				}).then(function runCheckifRunnable (runCheck) {

					return !runCheck ? Promise.resolve(runCheck) : checkAndFormateVersion(dependency.version).then(function runWithVersion (formatedVersion) {

						return Promise.resolve().then(function getRegisteryData () {

							return downloadPackageData(dependency.name);

						}).then(function compare (latest) {

							const latestVersions = latest.split(".").map(function formate (v) {
								return parseInt(v, 10);
							});
							const currentVersions = formatedVersion.split(".").map(function formate (v) {
								return "x" === v ? v : parseInt(v, 10);
							});

							let failed = false;
							let result = valid;

							return Promise.resolve().then(function compareMajor () {

								if (!failed && "x" !== currentVersions[0] && latestVersions[0] > currentVersions[0]) {

									failed = true;

									if (options.failAtMajor) {
										result = false;
									}

									if (options.console) {

										(0, console).log(getFormatedTime(),
											dependency.path, "=>", (dependency.version + " < " + latest).bgRed
										);

									}

								}

								return Promise.resolve();

							}).then(function compareMinor () {

								if (!failed && "x" !== currentVersions[1] && latestVersions[1] > currentVersions[1]) {

									failed = true;

									if (options.failAtMinor) {
										result = false;
									}

									if (options.console) {

										(0, console).log(getFormatedTime(),
											dependency.path, "=>", (dependency.version + " < " + latest).red
										);

									}

								}

								return Promise.resolve();

							}).then(function comparePatch () {

								if (!failed && "x" !== currentVersions[2] && latestVersions[2] > currentVersions[2]) {

									failed = true;

									if (options.failAtPatch) {
										result = false;
									}

									if (options.console) {

										(0, console).log(getFormatedTime(),
											dependency.path, "=>", (dependency.version + " < " + latest).yellow
										);

									}

								}

								return Promise.resolve();

							}).then(function ok () {

								if (!failed && options.console) {

									(0, console).log(getFormatedTime(),
										dependency.path, "=>", "Ok".green
									);

								}

								return Promise.resolve();

							}).then(function next () {

								return _checkDependenciesUpdates(
									dependencies, options, i + 1, result
								);

							});

						});

					});

				});

			});

		}

// module

module.exports = _checkDependenciesUpdates;
