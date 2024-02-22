// types & interfaces

    // locals
    import type { iDep } from "./formateDeps";
    import type { iResult } from "./checkDependenciesUpdates";

// module

export default function sortDeps (dependencies: Array<iDep | iResult>): Array<iDep | iResult> {

    return dependencies.sort((compared: iDep | iResult, compareTo: iDep | iResult) => {

        if (compared.dev && !compareTo.dev) {
            return 1;
        }
        else if (!compared.dev && compareTo.dev) {
            return -1;
        }
            else if (compared.name > compareTo.name) {
                return 1;
            }
            else if (compared.name < compareTo.name) {
                return -1;
            }
                else {
                    return 0;
                }

    });

}
