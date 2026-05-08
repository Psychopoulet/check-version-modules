// deps

    // natives
    import { readFile } from "node:fs/promises";

    // locals

    import checkDependenciesUpdates, { type iAnalyze } from "./deps/checkDependenciesUpdates";

    import checkAndFormateOptions from "./utils/checkAndFormateOptions";
    import checkFile from "./utils/checkFile";
    import formateDeps from "./deps/formateDeps";
    import sortDeps from "./deps/sortDeps";
    import isPlainObject from "./utils/isPlainObject";

// types & interfaces

    // locals
    import type { iDep } from "./deps/formateDeps";

    type tPackageType = Record<string, object | string | number | boolean>;

    export interface iOptions {
        "failAtMajor"?: boolean;
        "failAtMinor"?: boolean;
        "failAtPatch"?: boolean;
        "dev"?: boolean;
        "optional"?: boolean;
        "npmrcFile"?: string;
    }

    export interface iFormattedOptions {
        "failAtMajor": boolean;
        "failAtMinor": boolean;
        "failAtPatch": boolean;
        "dev": boolean;
        "optional": boolean;
        "npmrcFile": string;
    }

// module

export type { iAnalyze };

export default function checkVersionModule (source: string | tPackageType, opts?: iOptions): Promise<iAnalyze> {

    return checkAndFormateOptions(opts).then((options: iFormattedOptions): Promise<iAnalyze> => {

        return Promise.resolve().then((): Promise<tPackageType> | tPackageType => {

            if ("string" === typeof source) {

                return checkFile(source).then(() => {
                    return readFile(source, "utf-8");
                }).then((content: string): tPackageType => {
                    return JSON.parse(content) as tPackageType;
                });

            }
            else if (isPlainObject(source)) {

                return source;

            }
            else {

                throw new TypeError("\"source\" parameter is not a string or a package type");

            }

        }).then((packageData: tPackageType): iDep[] => {

            return formateDeps(packageData, options.dev, options.optional);

        }).then((dependencies: iDep[]): iDep[] => {

            return sortDeps(dependencies);

        }).then((dependencies: iDep[]): Promise<iAnalyze> => {

            return checkDependenciesUpdates(dependencies, options);

        });

    });

}
