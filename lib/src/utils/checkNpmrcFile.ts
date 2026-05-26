// deps

    // locals
    import checkNonEmptyString from "./checkNonEmptyString";
    import checkFile from "./checkFile";

// module

export default function checkNpmrcFile (npmrcFile: unknown): Promise<void> {

    if ("" === npmrcFile) {

        return Promise.resolve();

    }
    else if ("string" !== typeof npmrcFile) {

        return Promise.reject(new TypeError("\"npmrcFile\" parameter is not a string"));

    }
    else {

        return checkNonEmptyString(npmrcFile).then((): Promise<void> => {
            return checkFile(npmrcFile);
        });

    }

}
