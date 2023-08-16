/*
	eslint-disable prefer-arrow-callback
*/

"use strict";

// deps

	// natives
	const { join } = require("node:path");

	// locals
	const checkBoolean = require(join(__dirname, "checkBoolean.js"));
	const checkNonNullPureObject = require(join(__dirname, "checkNonNullPureObject.js"));

// consts

	const DEFAULT_OPTIONS = {
		"failAtMajor": true,
		"failAtMinor": true,
		"failAtPatch": false,
		"dev": true,
		"console": true
	};

// module

module.exports = function checkAndFormateOptions (options = DEFAULT_OPTIONS) {

	return Promise.resolve().then(function checkOptions () {

		return checkNonNullPureObject(options);

	}).then(function autocomplete () {

		options.failAtMajor = "undefined" === typeof options.failAtMajor ? DEFAULT_OPTIONS.failAtMajor : options.failAtMajor;
		options.failAtMinor = "undefined" === typeof options.failAtMinor ? DEFAULT_OPTIONS.failAtMinor : options.failAtMinor;
		options.failAtPatch = "undefined" === typeof options.failAtPatch ? DEFAULT_OPTIONS.failAtPatch : options.failAtPatch;
		options.dev = "undefined" === typeof options.dev ? DEFAULT_OPTIONS.dev : options.dev;
		options.console = "undefined" === typeof options.console ? DEFAULT_OPTIONS.console : options.console;

		return Promise.resolve();

	}).then(function checkFailAtMajor () {

		return checkBoolean(options.failAtMajor);

	}).then(function checkFailAtMinor () {

		return checkBoolean(options.failAtMinor);

	}).then(function checkFailAtPatch () {

		return checkBoolean(options.failAtPatch);

	}).then(function checkDev () {

		return checkBoolean(options.dev);

	}).then(function checkConsole () {

		return checkBoolean(options.console);

	}).then(function result () {

		return Promise.resolve(options);

	});

};
