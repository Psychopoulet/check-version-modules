
"use strict";

// deps

	// locals

	import extractAndFormateDeps from "./deps/extractAndFormateDeps";
	import checkDependenciesUpdates from "./deps/checkDependenciesUpdates";

	import checkFile from "./utils/checkFile";
	import checkAndFormateOptions from "./utils/checkAndFormateOptions";

// types & interfaces

	// locals

	export interface iOptions {
		"failAtMajor": boolean;
		"failAtMinor": boolean;
		"failAtPatch": boolean;
		"dev": boolean;
	};

	import { iDep } from "./deps/formateDeps";
	import { iAnalyze } from "./deps/checkDependenciesUpdates";

// module

export default function checkVersionModule (file: string, opts?: iOptions): Promise<iAnalyze> {

	// check params
	return Promise.resolve().then((): Promise<void> => {

		return checkFile(file);

	}).then((): Promise<iOptions> => {

		return checkAndFormateOptions(opts);

	}).then((options: iOptions): Promise<iAnalyze> => {

		return extractAndFormateDeps(file, options.dev).then((dependencies: Array<iDep>): Promise<iAnalyze> => {

			return checkDependenciesUpdates(dependencies, {
				"failAtMajor": options.failAtMajor,
				"failAtMinor": options.failAtMinor,
				"failAtPatch": options.failAtPatch,
				"dev": options.dev
			});

		});

	});

};
