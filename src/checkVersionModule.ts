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
        "failAtMajor": boolean;
        "failAtMinor": boolean;
        "failAtPatch": boolean;
        "dev": boolean;
    }

// module

export default function checkVersionModule (file: string, opts?: iOptions): Promise<iAnalyze> {

    // check params
    return Promise.resolve().then((): Promise<void> => {

        return checkFile(file);

    }).then((): Promise<iOptions> => {

        return checkAndFormateOptions(opts);

    }).then((options: iOptions): Promise<iAnalyze> => {

        return extractAndFormateDeps(file, options.dev).then((dependencies: iDep[]): Promise<iAnalyze> => {

            return checkDependenciesUpdates(dependencies, {
                "failAtMajor": options.failAtMajor,
                "failAtMinor": options.failAtMinor,
                "failAtPatch": options.failAtPatch,
                "dev": options.dev
            });

        });

    });

}
