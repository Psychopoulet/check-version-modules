
"use strict";

// deps

	// externals
	require("colors");

	// locals
	const padleft = require(require("path").join(__dirname, "padleft.js"));

// module

module.exports = () => {

	const date = new Date();

	return "[".white +
		(
			padleft(date.getHours()) + ":" +
			padleft(date.getMinutes()) + ":" +
			padleft(date.getSeconds())
		).grey +
	"]".white;

};
