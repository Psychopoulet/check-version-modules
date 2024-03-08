// deps

    // natives
    import { readFile } from "node:fs/promises";

    // locals
    import formateDeps, { type iDep } from "./formateDeps";
    import sortDeps from "./sortDeps";

// types & interfaces

    type tPackageType = Record<string, object | string | number | boolean>;

// module

export default function extractAndFormateDeps (file: string, dev: boolean): Promise<iDep[]> {

    return readFile(file, "utf-8").then((content: string): tPackageType => {
        return JSON.parse(content) as tPackageType;
    }).then((packageData: tPackageType): iDep[] => {

        return formateDeps(packageData, dev);

    }).then((dependencies: iDep[]): iDep[] => {

        return sortDeps(dependencies);

    });

}
