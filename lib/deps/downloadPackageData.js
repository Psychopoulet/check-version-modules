/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { get } = require("https");

// module

module.exports = function downloadPackageData (packageName) {

	// get registery data
	return new Promise(function request (resolve, reject) {

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

	// parse registery data
	}).then(function parse (data) {

		return "" === data.trim() ?
			Promise.reject(new Error("\"" + packageName + "\" registry does not return data")) :
			Promise.resolve(JSON.parse(data));

	});

};
