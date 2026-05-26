// deps

    // externals
    import semver from "semver";

    // locals

    import sortDeps from "./sortDeps";

    import downloadPackageData from "./downloadPackageData";

    import getFormatedTime from "../utils/getFormatedTime";

    import checkVersionValidity from "../version/checkVersionValidity";
    import toSemverRange from "../version/toSemverRange";
    import getUpdateFailureLevel from "../version/getUpdateFailureLevel";

// types & interfaces

    // locals

    import type { iDep } from "./formateDeps";
    import type { iFormattedOptions } from "../checkVersionModule";

    export interface iResult extends iDep {
        "time": string;
        "result": "success" | "warning" | "fail_patch" | "fail_minor" | "fail_major";
        "message": string;
    }

    export interface iAnalyze {
        "result": boolean;
        "results": iResult[];
    }

// module

export default function checkDependenciesUpdates (dependencies: iDep[], options: iFormattedOptions): Promise<iAnalyze> {

    let valid: boolean = true;
    const results: iResult[] = [];

        function _execute (deps: iDep[]): Promise<void> {

            if (!deps.length) {
                return Promise.resolve();
            }

            const dependency: iResult = deps.shift() as iResult;

            return checkVersionValidity(dependency.version, false).then((runnable: "RUNNABLE" | "ALWAYS_UP_TO_UPDATE" | "NOT_RUNNABLE"): boolean => {

                if ("NOT_RUNNABLE" === runnable) {

                    results.push({
                        ...dependency,
                        "time": getFormatedTime(),
                        "result": "warning",
                        "message": "not managed " + dependency.version
                    });

                }
                else if ("ALWAYS_UP_TO_UPDATE" === runnable) {

                    results.push({
                        ...dependency,
                        "time": getFormatedTime(),
                        "result": "success",
                        "message": dependency.version
                    });

                }

                return "RUNNABLE" === runnable;

            }).then((runCheck: boolean): Promise<void> => {

                return !runCheck ? Promise.resolve() : checkVersionValidity(dependency.version).then((): Promise<void> => {

                    return downloadPackageData(dependency.name, options.npmrcFile).then((latest: string): void => {

                        const range: string = toSemverRange(dependency.version);

                        if (semver.satisfies(latest, range)) {

                            results.push({
                                ...dependency,
                                "time": getFormatedTime(),
                                "result": "success",
                                "message": "Ok"
                            });

                        }
                        else {

                            const failureLevel: "fail_major" | "fail_minor" | "fail_patch" = getUpdateFailureLevel(dependency.version, latest);

                            if ("fail_major" === failureLevel && options.failAtMajor) {
                                valid = false;
                            }
                            else if ("fail_minor" === failureLevel && options.failAtMinor) {
                                valid = false;
                            }
                            else if ("fail_patch" === failureLevel && options.failAtPatch) {
                                valid = false;
                            }

                            results.push({
                                ...dependency,
                                "time": getFormatedTime(),
                                "result": failureLevel,
                                "message": dependency.version + " < " + latest
                            });

                        }

                    }).catch((err: Error): Promise<void> => {

                        results.push({
                            ...dependency,
                            "time": getFormatedTime(),
                            "result": "warning",
                            "message": err.message
                        });

                        return Promise.resolve();

                    });

                });

            }).then((): Promise<void> => {

                return _execute(deps);

            });

        }

    return _execute([ ...dependencies ]).then((): iAnalyze => {

        return {
            "result": valid,
            "results": sortDeps(results) as iResult[]
        };

    });

}
