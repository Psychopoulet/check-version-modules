// deps

    // natives
    import { readFile } from "node:fs/promises";

    // locals
    import formateDeps, { type iDep } from "./formateDeps";
    import sortDeps from "./sortDeps";

// module

export default function extractAndFormateDeps (file: string, dev: boolean): Promise<iDep[]> {

    return readFile(file, "utf-8").then((content: string): Record<string, any> => {
        return JSON.parse(content);
    }).then((packageData: Record<string, any>): iDep[] => {

        return formateDeps(packageData, dev);

    }).then((dependencies: iDep[]): iDep[] => {

        return sortDeps(dependencies);

    });

}
