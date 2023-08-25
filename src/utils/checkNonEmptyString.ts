"use strict";

// module

export default function checkNonEmptyString (data: string): Promise<void> {

	if ("undefined" === typeof data) {

		return Promise.reject(new ReferenceError("Missing \"data\" parameter"));

	}
		else if ("string" !== typeof data) {

			return Promise.reject(new TypeError("\"data\" parameter is not a string"));

		}
		else if ("" === data.trim()) {

			return Promise.reject(new RangeError("\"data\" parameter is empty"));

		}

	else {

		return Promise.resolve();

	}

};
