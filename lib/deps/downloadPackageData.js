/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { get } = require("node:https");

// private

	// attributes

		const _alreadyDownloaded = [];

// module

module.exports = function downloadPackageData (packageName) {

	return Promise.resolve().then(function getData () {

		const searchedModule = _alreadyDownloaded.filter(function filter (m) {
			return m.name === packageName;
		})[0] || null;

		return searchedModule ? Promise.resolve(searchedModule.latestVersion) : new Promise(function requestNPMRegistery (resolve, reject) {

			get("https://registry.npmjs.org/" + packageName, function requestResult (res) {

				if (200 !== res.statusCode) {
					res.resume();
					reject(new Error("Impossible to join \"" + packageName + "\" registry"));
				}
				else {

					res.setEncoding("utf8");

					let rawData = "";
					res.on("data", function requestData (chunk) {
						rawData += chunk;
					}).on("end", function requestEnd () {
						resolve(rawData);
					});

				}

			}).on("error", reject);

		}).then(function parseData (data) {

			return "" === data.trim() ?
				Promise.reject(new Error("\"" + packageName + "\" registry does not return data")) :
				Promise.resolve(JSON.parse(data));

		}).then(function extractLastVersion (data) {

			return !data["dist-tags"] || !data["dist-tags"].latest ?
				Promise.reject(new Error("\"" + packageName + "\" registry does not return latest version")) :
				Promise.resolve(data["dist-tags"].latest);

		}).then(function saveData (latestVersion) {

			_alreadyDownloaded.push({
				"name": packageName,
				"latestVersion": latestVersion
			});

			return Promise.resolve(latestVersion);

		});

	});

};
