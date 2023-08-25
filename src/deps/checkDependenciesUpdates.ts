"use strict";

// deps

	// externals

	let colors: { [key:string]: (msg: string) => string } | null = null;
	try { // test require optional deps
		colors = require("colors/safe");
	}
	catch (e) {
		// nothing to do here
	}

	// locals

	import sortDeps from "./sortDeps";

	import downloadPackageData from "./downloadPackageData";

	import getFormatedTime from "../utils/getFormatedTime";

	import checkVersionValidity from "../version/checkVersionValidity";
	import checkAndFormateVersion from "../version/checkAndFormateVersion";

// types & interfaces

	// locals

	import { iDep, iResult } from "./formateDeps";
	import { iOptions } from "../checkVersionModule";

// module

export default function checkDependenciesUpdates (dependencies: Array<iResult>, options: iOptions): Promise<boolean> {

	let valid: boolean = true;
	const results: Array<iResult> = [];

		function _execute (deps: Array<iResult>): Promise<void>  {

			if (!deps.length) {
				return Promise.resolve();
			}

			const dependency: iResult = deps.shift() as iResult;

			return checkVersionValidity(dependency.version, false).then((runnable: boolean): boolean => {

				if (!runnable && options.console) {

					results.push({
						...dependency,
						"time": getFormatedTime(),
						"result": "not managed " + (colors && colors.yellow ? colors.yellow(dependency.version) : dependency.version)
					});

				}

				return runnable;

			}).then((runCheck: boolean): Promise<void> => {

				return !runCheck ? Promise.resolve() : checkAndFormateVersion(dependency.version).then((formatedVersion: string): Promise<void> => {

					return downloadPackageData(dependency.name).then((latest: string): Promise<void> => {

						const latestVersions: Array<number> = latest.split(".").map((v: string): number => {
							return parseInt(v, 10);
						});
						const currentVersions: Array<"x"|number> = formatedVersion.split(".").map((v: string): "x"|number => {
							return "x" === v ? v : parseInt(v, 10);
						});

						let failed: boolean = false;

						return Promise.resolve().then((): void => {

							if (!failed && "x" !== currentVersions[0] && latestVersions[0] > currentVersions[0]) {

								failed = true;

								if (options.failAtMajor) {
									valid = false;
								}

								if (options.console) {

									results.push({
										...dependency,
										"time": getFormatedTime(),
										"result": colors && colors.bgRed ? colors.bgRed(dependency.version + " < " + latest) : dependency.version + " < " + latest
									});

								}

							}

						}).then((): void => {

							if (!failed && "x" !== currentVersions[1] && latestVersions[1] > currentVersions[1]) {

								failed = true;

								if (options.failAtMinor) {
									valid = false;
								}

								if (options.console) {

									results.push({
										...dependency,
										"time": getFormatedTime(),
										"result": colors && colors.red ? colors.red(dependency.version + " < " + latest) : dependency.version + " < " + latest
									});

								}

							}

						}).then((): void => {

							if (!failed && "x" !== currentVersions[2] && latestVersions[2] > currentVersions[2]) {

								failed = true;

								if (options.failAtPatch) {
									valid = false;
								}

								if (options.console) {

									results.push({
										...dependency,
										"time": getFormatedTime(),
										"result": colors && colors.yellow ? colors.yellow(dependency.version + " < " + latest) : dependency.version + " < " + latest
									});

								}

							}

						}).then((): void => {

							if (!failed && options.console) {

								results.push({
									...dependency,
									"time": getFormatedTime(),
									"result": colors && colors.green ? colors.green("Ok") : "Ok"
								});

							}

						});

					});

				});

			}).then((): Promise<void> => {

				return _execute(deps);

			});

		}

	return _execute([ ...dependencies ]).then((): boolean => {

		sortDeps(results).forEach((r: iDep|iResult): void => {
			console.log((r as iResult).time, r.path, "=>", (r as iResult).result);
		});

		return valid;

	});

};
