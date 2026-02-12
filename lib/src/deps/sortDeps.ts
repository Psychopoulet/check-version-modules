// types & interfaces

    // locals
    import type { iDep } from "./formateDeps";
    import type { iResult } from "./checkDependenciesUpdates";

// module

export default function sortDeps (dependencies: Array<iDep | iResult>): Array<iDep | iResult> {

    return [ ...dependencies ].sort((compared: iDep | iResult, compareTo: iDep | iResult) => {

        // 1 - not dev, not optionnal
        // 2 - dev
        // 3 - optional

        // if "compared" is [not dev or optional] and "compareTo" is [dev or optional], "compared" first
        if (!compared.dev && !compared.optional && (compareTo.dev || compareTo.optional)) {
            return -1; // compared first
        }

        // if "compared" is dev and "compareTo" is optional, "compared" first
        else if (compared.dev && compareTo.optional) {
            return -1; // compared first
        }

        // if equality, sort by name

        // if "compared" name is before and "compareTo" name, "compared" first
        else if (compared.name < compareTo.name) {
            return -1;
        }
        else if (compared.name > compareTo.name) {
            return 1;
        }

        // otherwise
        else {
            return 0;
        }

    });

}
