/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// module

module.exports = function checkNonEmptyString (file) {

	if ("undefined" === typeof file) {

		return Promise.reject(new ReferenceError("Missing \"file\" parameter"));

	}
		else if ("string" !== typeof file) {

			return Promise.reject(new TypeError("\"file\" parameter is not a string"));

		}
		else if ("" === file.trim()) {

			return Promise.reject(new RangeError("\"file\" parameter is empty"));

		}

	else {

		return Promise.resolve();

	}

};
