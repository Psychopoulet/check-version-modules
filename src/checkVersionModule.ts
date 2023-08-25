
"use strict";

// deps

	// locals

	import extractAndFormateDeps from "./deps/extractAndFormateDeps";
	import checkDependenciesUpdates from "./deps/checkDependenciesUpdates";

	import checkFile from "./utils/checkFile";
	import checkAndFormateOptions from "./utils/checkAndFormateOptions";
	import getFormatedTime from "./utils/getFormatedTime";

// types & interfaces

	// locals

	export interface iOptions {
		"failAtMajor": boolean;
		"failAtMinor": boolean;
		"failAtPatch": boolean;
		"dev": boolean;
		"console": boolean;
	};

	import { iResult } from "./deps/formateDeps";

// module

export default function checkVersionModule (file: string, opts?: iOptions): Promise<boolean> {

	// check params
	return Promise.resolve().then((): Promise<void> => {

		return checkFile(file);

	}).then((): Promise<iOptions> => {

		return checkAndFormateOptions(opts);

	}).then((options: iOptions): Promise<boolean> => {

		return extractAndFormateDeps(file, options.dev).then((dependencies: Array<iResult>): Promise<boolean> => {

			if (options.console) {
				console.log(getFormatedTime(), file);
			}

			return checkDependenciesUpdates(dependencies, {
				"failAtMajor": options.failAtMajor,
				"failAtMinor": options.failAtMinor,
				"failAtPatch": options.failAtPatch,
				"console": options.console
			});

		});

	});

};
