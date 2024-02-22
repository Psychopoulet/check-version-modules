// deps

    // natives
    import { lstat, type Stats } from "node:fs";

    // locals
    import checkNonEmptyString from "./checkNonEmptyString";

// module

export default function checkFile (file: string): Promise<void> {

    return checkNonEmptyString(file).then((): Promise<void> => {

        return new Promise((resolve: () => void, reject: (err: Error) => void): void => {

            lstat(file, (err: Error | null, stats: Stats): void => {

                return !err && stats.isFile() ? resolve() : reject(new Error(
                    "\"file\" parameter (" + file + ") is not a valid file"
                ));

            });

        });

    });

}
