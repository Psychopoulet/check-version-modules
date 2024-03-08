// deps

    // locals

    import extractAndFormateDeps from "./deps/extractAndFormateDeps";
    import checkDependenciesUpdates, { type iAnalyze } from "./deps/checkDependenciesUpdates";

    import checkFile from "./utils/checkFile";
    import checkAndFormateOptions from "./utils/checkAndFormateOptions";

// types & interfaces

    // locals
    import type { iDep } from "./deps/formateDeps";

    export interface iOptions {
        "failAtMajor"?: boolean;
        "failAtMinor"?: boolean;
        "failAtPatch"?: boolean;
        "dev"?: boolean;
        "npmrcFile"?: string;
    }

    export interface iFormattedOptions {
        "failAtMajor": boolean;
        "failAtMinor": boolean;
        "failAtPatch": boolean;
        "dev": boolean;
        "npmrcFile": string;
    }

// module

export default function checkVersionModule (file: string, opts?: iOptions): Promise<iAnalyze> {

    // check params
    return Promise.resolve().then((): Promise<void> => {

        return checkFile(file);

    }).then((): Promise<iFormattedOptions> => {

        return checkAndFormateOptions(opts);

    }).then((options: iFormattedOptions): Promise<iAnalyze> => {

        return extractAndFormateDeps(file, options.dev).then((dependencies: iDep[]): Promise<iAnalyze> => {
            return checkDependenciesUpdates(dependencies, options);
        });

    });

}
