// deps

    // externals
    import checkNonEmptyString from "../utils/checkNonEmptyString";

// consts

    const REGEX_LITTERAL: string = "^[~^]{0,1}([*x0-9]+){1}(.[*x0-9]+){0,1}(.[*x0-9]+){0,1}$";
    const REGEX: RegExp = RegExp(REGEX_LITTERAL);

// module

export default function checkVersionValidity (version: string, strict: boolean = true): Promise<"RUNNABLE" | "ALWAYS_UP_TO_UPDATE" | "NOT_RUNNABLE"> {

    return checkNonEmptyString(version).then((): Promise<"RUNNABLE" | "ALWAYS_UP_TO_UPDATE" | "NOT_RUNNABLE"> => {

        if (strict) {

            return REGEX.test(version) ? Promise.resolve("RUNNABLE") : Promise.reject(new Error(
                "\"version\" parameter (\"" + version + "\") does not follow the allowed patterns (\"" + REGEX_LITTERAL + "\")"
            ));

        }
        else if (version.includes("git")) {

            return Promise.resolve("ALWAYS_UP_TO_UPDATE");

        }
        else {

            return REGEX.test(version) ? Promise.resolve("RUNNABLE") : Promise.resolve("NOT_RUNNABLE");

        }

    });

}
