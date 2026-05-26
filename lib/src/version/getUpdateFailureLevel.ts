// deps

    // externals
    import semver from "semver";

    // locals
    import formateVersion from "./formateVersion";

// module

export default function getUpdateFailureLevel (version: string, latest: string): "fail_major" | "fail_minor" | "fail_patch" {

    const currentVersions: Array<"x" | number> = formateVersion(version).split(".").map((v: string): "x" | number => {
        return "x" === v ? v : Number.parseInt(v, 10);
    });

    const latestVersion: semver.SemVer | null = semver.parse(latest);

    if (null === latestVersion) {
        return "fail_patch";
    }

    if ("x" !== currentVersions[0] && latestVersion.major > currentVersions[0]) {
        return "fail_major";
    }

    if ("x" !== currentVersions[1] && latestVersion.minor > currentVersions[1]) {
        return "fail_minor";
    }

    return "fail_patch";

}
