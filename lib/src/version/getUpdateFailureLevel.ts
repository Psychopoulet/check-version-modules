// deps

    // externals
    import semver from "semver";

    // locals
    import toSemverRange from "./toSemverRange";

// module

export default function getUpdateFailureLevel (version: string, latest: string): "fail_major" | "fail_minor" | "fail_patch" {

    const range: string = toSemverRange(version);
    const latestSemver: semver.SemVer | null = semver.parse(latest) ?? semver.coerce(latest);

    if (null === latestSemver) {
        return "fail_patch";
    }

    const minVersion: semver.SemVer | null = semver.minVersion(range);

    if (null === minVersion) {
        return "fail_patch";
    }

    const diff: string | null = semver.diff(minVersion, latestSemver);

    switch (diff) {

        case "major":
        case "premajor":
            return "fail_major";

        case "minor":
        case "preminor":
            return "fail_minor";

        default:
            return "fail_patch";

    }

}
