// types & interfaces

    // locals
    import type { iDep } from "./formateDeps";
    import type { iResult } from "./checkDependenciesUpdates";

// module

export default function sortDeps (dependencies: Array<iDep | iResult>): Array<iDep | iResult> {

    return dependencies.sort((compared: iDep | iResult, compareTo: iDep | iResult) => {

        // by dev
        if (compared.dev && !compareTo.dev) {
            return 1;
        }
        else if (!compared.dev && compareTo.dev) {
            return -1;
        }

        // by optional
        else if (compared.optional && !compareTo.optional) {
            return 1;
        }
        else if (!compared.optional && compareTo.optional) {
            return -1;
        }

        // by name
        else if (compared.name > compareTo.name) {
            return 1;
        }
        else if (compared.name < compareTo.name) {
            return -1;
        }

        // otherwise
        else {
            return 0;
        }

    });

}
