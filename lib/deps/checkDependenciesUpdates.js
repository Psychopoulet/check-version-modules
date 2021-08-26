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
	const checkAndFormateVersion = require(join(__dirname, "..", "version", "checkAndFormateVersion.js"));

// module

module.exports = function checkDependenciesUpdates (dependencies, options) {

	let valid = true;
	const results = [];

	return Promise.all(dependencies.map((dependency) => {

		return Promise.resolve().then(function isVersionRunnable () {

			return checkVersionValidity(dependency.version, false).then((runnable) => {

				if (!runnable && options.console) {

					results.push({
						"time": getFormatedTime(),
						"dependency": dependency.path,
						"result": "not managed " + dependency.version.yellow
					});

				}

				return Promise.resolve(runnable);

			});

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

					return Promise.resolve().then(function compareMajor () {

						if (!failed && "x" !== currentVersions[0] && latestVersions[0] > currentVersions[0]) {

							failed = true;

							if (options.failAtMajor) {
								valid = false;
							}

							if (options.console) {

								results.push({
									"time": getFormatedTime(),
									"dependency": dependency.path,
									"result": (dependency.version + " < " + latest).bgRed
								});

							}

						}

						return Promise.resolve();

					}).then(function compareMinor () {

						if (!failed && "x" !== currentVersions[1] && latestVersions[1] > currentVersions[1]) {

							failed = true;

							if (options.failAtMinor) {
								valid = false;
							}

							if (options.console) {

								results.push({
									"time": getFormatedTime(),
									"dependency": dependency.path,
									"result": (dependency.version + " < " + latest).red
								});

							}

						}

						return Promise.resolve();

					}).then(function comparePatch () {

						if (!failed && "x" !== currentVersions[2] && latestVersions[2] > currentVersions[2]) {

							failed = true;

							if (options.failAtPatch) {
								valid = false;
							}

							if (options.console) {

								results.push({
									"time": getFormatedTime(),
									"dependency": dependency.path,
									"result": (dependency.version + " < " + latest).yellow
								});

							}

						}

						return Promise.resolve();

					}).then(function ok () {

						if (!failed && options.console) {

							results.push({
								"time": getFormatedTime(),
								"dependency": dependency.path,
								"result": "Ok".green
							});

						}

						return Promise.resolve();

					});

				});

			});

		});

	})).then(() => {

		results.sort((a, b) => {

			if (a.dependency < b.dependency) {
				return -1;
			}
			else if (a.dependency > b.dependency) {
				return 1;
			}
			else {
				return 0;
			}

		}).forEach((r) => {
			(0, console).log(r.time, r.dependency, "=>", r.result);
		});

		return Promise.resolve(valid);
	});

};
