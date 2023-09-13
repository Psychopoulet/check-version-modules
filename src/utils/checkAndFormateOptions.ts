"use strict";

// deps

	// locals
	import checkBoolean from "./checkBoolean";
	import checkNonNullPureObject from "./checkNonNullPureObject";

// types & interfaces

	import { iOptions } from "../checkVersionModule";

// consts

	const DEFAULT_OPTIONS: iOptions = {
		"failAtMajor": true,
		"failAtMinor": true,
		"failAtPatch": false,
		"dev": true
	};

// module

export default function checkAndFormateOptions (options: iOptions = DEFAULT_OPTIONS): Promise<iOptions> {

	return checkNonNullPureObject(options).then((): Promise<void> => {

		options.failAtMajor = "undefined" === typeof options.failAtMajor ? DEFAULT_OPTIONS.failAtMajor : options.failAtMajor;
		options.failAtMinor = "undefined" === typeof options.failAtMinor ? DEFAULT_OPTIONS.failAtMinor : options.failAtMinor;
		options.failAtPatch = "undefined" === typeof options.failAtPatch ? DEFAULT_OPTIONS.failAtPatch : options.failAtPatch;
		options.dev = "undefined" === typeof options.dev ? DEFAULT_OPTIONS.dev : options.dev;

		return checkBoolean(options.failAtMajor);

	}).then((): Promise<void> => {

		return checkBoolean(options.failAtMinor);

	}).then((): Promise<void> => {

		return checkBoolean(options.failAtPatch);

	}).then((): Promise<void> => {

		return checkBoolean(options.dev);

	}).then((): Promise<iOptions> => {

		return Promise.resolve(options);

	});

};
