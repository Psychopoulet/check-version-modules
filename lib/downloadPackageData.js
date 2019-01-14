
"use strict";

// deps

	// natives
	const { get } = require("https");

// module

module.exports = (packageName) => {

	// get registery data
	return new Promise((resolve, reject) => {

		get("https://registry.npmjs.org/" + packageName, (res) => {

			if (200 !== res.statusCode) {
				res.resume();
				reject(new Error("Impossible to join \"" + packageName + "\" registry"));
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
			Promise.reject(new Error("\"" + packageName + "\" registry does not return data")) :
			Promise.resolve(JSON.parse(data));

	});

};
