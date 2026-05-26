// deps

    // externals
    import checkNonEmptyString from "../utils/checkNonEmptyString";

    // locals
    import { isSupportedVersionSyntax } from "./toSemverRange";

// consts

    const ALLOWED_VERSIONS_LITERAL: string = "valid semver range (^, ~, x, *, n, n.n, n.n.n, ...)";

// module

export default function checkVersionValidity (version: string, strict: boolean = true): Promise<"RUNNABLE" | "ALWAYS_UP_TO_UPDATE" | "NOT_RUNNABLE"> {

    return checkNonEmptyString(version).then((): Promise<"RUNNABLE" | "ALWAYS_UP_TO_UPDATE" | "NOT_RUNNABLE"> => {

        if (strict) {

            return isSupportedVersionSyntax(version) ? Promise.resolve("RUNNABLE") : Promise.reject(new Error(
                "\"version\" parameter (\"" + version + "\") does not follow the allowed patterns (\"" + ALLOWED_VERSIONS_LITERAL + "\")"
            ));

        }
        else if (version.includes("git")) {

            return Promise.resolve("ALWAYS_UP_TO_UPDATE");

        }
        else {

            return isSupportedVersionSyntax(version) ? Promise.resolve("RUNNABLE") : Promise.resolve("NOT_RUNNABLE");

        }

    });

}
