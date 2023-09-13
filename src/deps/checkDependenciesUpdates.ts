"use strict";

// deps

	// locals

	import sortDeps from "./sortDeps";

	import downloadPackageData from "./downloadPackageData";

	import getFormatedTime from "../utils/getFormatedTime";

	import checkVersionValidity from "../version/checkVersionValidity";
	import checkAndFormateVersion from "../version/checkAndFormateVersion";

// types & interfaces

	// locals

	import { iDep } from "./formateDeps";
	import { iOptions } from "../checkVersionModule";

	export interface iResult extends iDep {
		"time": string;
		"result": "success" | "warning" | "fail_patch" | "fail_minor" | "fail_major";
		"message": string;
	};

	export interface iAnalyze {
		"result": boolean;
		"results": Array<iResult>;
	};

// module

export default function checkDependenciesUpdates (dependencies: Array<iDep>, options: iOptions): Promise<iAnalyze> {

	let valid: boolean = true;
	const results: Array<iResult> = [];

		function _execute (deps: Array<iDep>): Promise<void>  {

			if (!deps.length) {
				return Promise.resolve();
			}

			const dependency: iResult = deps.shift() as iResult;

			return checkVersionValidity(dependency.version, false).then((runnable: boolean): boolean => {

				if (!runnable) {

					results.push({
						...dependency,
						"time": getFormatedTime(),
						"result": "warning",
						"message": "not managed " + dependency.version
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

								results.push({
									...dependency,
									"time": getFormatedTime(),
									"result": "fail_major",
									"message": dependency.version + " < " + latest
								});

							}

						}).then((): void => {

							if (!failed && "x" !== currentVersions[1] && latestVersions[1] > currentVersions[1]) {

								failed = true;

								if (options.failAtMinor) {
									valid = false;
								}

								results.push({
									...dependency,
									"time": getFormatedTime(),
									"result": "fail_minor",
									"message": dependency.version + " < " + latest
								});

							}

						}).then((): void => {

							if (!failed && "x" !== currentVersions[2] && latestVersions[2] > currentVersions[2]) {

								failed = true;

								if (options.failAtPatch) {
									valid = false;
								}

								results.push({
									...dependency,
									"time": getFormatedTime(),
									"result": "fail_patch",
									"message": dependency.version + " < " + latest
								});

							}

						}).then((): void => {

							if (!failed) {

								results.push({
									...dependency,
									"time": getFormatedTime(),
									"result": "success",
									"message": "Ok"
								});

							}

						});

					});

				});

			}).then((): Promise<void> => {

				return _execute(deps);

			});

		}

	return _execute([ ...dependencies ]).then((): iAnalyze => {

		return {
			"result": valid,
			"results": sortDeps(results) as Array<iResult>
		};

	});

};
