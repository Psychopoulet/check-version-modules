
"use strict";

// deps

	// natives
	const { get } = require("https");
	const { lstat } = require("fs");

	// externals
	require("colors");

// private

	// methods

		/**
		* Formate string with left padder
		* @param {string} msg : string to pad
		* @returns {Promise} : Formated string
		*/
		function _padleft (msg) {

			let result = "string" === typeof msg ? msg : String(msg);

				for (let currentSize = result.length; 2 > currentSize; ++currentSize) {
					result = "0" + result;
				}

			return result;

		}

		/**
		* Formate time for console logging
		* @param {string} msg : string to pad
		* @returns {Promise} : Formated time
		*/
		function _getFormatedTime () {

			const date = new Date();

			return "[".white +
				(
					_padleft(date.getHours()) + ":" +
					_padleft(date.getMinutes()) + ":" +
					_padleft(date.getSeconds())
				).grey +
			"]".white;

		}

		/**
		* Check dependencies
		* @param {Array} dependencies : dependencies to check
		* @param {boolean} valid : is tests passed
		* @returns {Promise} : Result operation
		*/
		function _checkDependenciesUpdates (dependencies, valid = true) {

			if (!dependencies.length) {
				return Promise.resolve();
			}
			else {

				const dependency = dependencies.shift();

				// get registery data
				return new Promise((resolve, reject) => {

					get("https://registry.npmjs.org/" + dependency.name, (res) => {

						if (200 !== res.statusCode) {
							res.resume();
							reject(new Error("Impossible to join \"" + dependency.name + "\" registry"));
						}
						else {

							res.setEncoding("utf8");

							let rawData = "";
							res.on("data", (chunk) => {
								rawData += chunk;
							}).on("end", () => {
								resolve(rawData);
							});

						}

					}).on("error", reject);

				// parse registery data
				}).then((data) => {

					return "" === data.trim() ?
						Promise.reject(new Error("\"" + dependency.name + "\" registry does not return data")) :
						Promise.resolve(JSON.parse(data));

				// extract last version
				}).then((data) => {

					return !data["dist-tags"] || !data["dist-tags"].latest ?
						Promise.reject(new Error("\"" + dependency.name + "\" registry does not return latest version")) :
						Promise.resolve(data["dist-tags"].latest);

				// diff
				}).then((latest) => {

					let result = valid;

					const latestVersions = latest.split(".");
					const versions = dependency.version.split(".");

					if (parseInt(latestVersions[0], 10) > parseInt(versions[0], 10)) {

						result = false;

						(0, console).log(_getFormatedTime(),
							dependency.path, "=>", (dependency.version + " < " + latest).bgRed
						);

					}
					else if (parseInt(latestVersions[1], 10) > parseInt(versions[1], 10)) {

						result = false;

						(0, console).log(_getFormatedTime(),
							dependency.path, "=>", (dependency.version + " < " + latest).red
						);

					}
					else if (parseInt(latestVersions[2], 10) > parseInt(versions[2], 10)) {

						(0, console).log(_getFormatedTime(),
							dependency.path, "=>", (dependency.version + " < " + latest).yellow
						);

					}
					else {

						(0, console).log(_getFormatedTime(),
							dependency.path, "=>", "Ok".green
						);

					}

					return !dependencies.length ? Promise.resolve(result) : _checkDependenciesUpdates(dependencies, result);

				});

			}

		}

// module

module.exports = (file) => {

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
		else {
			return Promise.resolve();
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
		return _checkDependenciesUpdates(dependencies);
	});

};
