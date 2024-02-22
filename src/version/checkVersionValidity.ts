// deps

    // externals
    import checkNonEmptyString from "../utils/checkNonEmptyString";

// consts

    const REGEX_LITTERAL: string = "^[~^]{0,1}([*x0-9]+){1}(.[*x0-9]+){0,1}(.[*x0-9]+){0,1}$";
    const REGEX: RegExp = RegExp(REGEX_LITTERAL);

// module

export default function checkVersionValidity (version: string, strict: boolean = true): Promise<boolean> {

    return checkNonEmptyString(version).then((): Promise<boolean> | boolean => {

        if (strict) {

            return REGEX.test(version) ? Promise.resolve(true) : Promise.reject(new Error(
                "\"version\" parameter (\"" + version + "\") does not follow the allowed patterns (\"" + REGEX_LITTERAL + "\")"
            ));

        }
        else {

            return REGEX.test(version);

        }

    });

}
