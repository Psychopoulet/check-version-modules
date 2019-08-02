/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { readFile } = require("fs");

// module

module.exports = function readJSONFile (file) {

	return new Promise(function promisification (resolve, reject) {

		readFile(file, function result (err, content) {

			return err ? reject(err) : resolve(content);

		});

	}).then(function parsing (content) {

		return Promise.resolve(JSON.parse(content));

	});

};
