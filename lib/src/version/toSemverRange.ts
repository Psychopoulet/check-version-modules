// deps

    // externals
    import semver from "semver";

// module

export function isSupportedVersionSyntax (version: string): boolean {

    const range: string = toSemverRange(version);

    return null !== semver.validRange(range) || null !== semver.valid(range);

}

export default function toSemverRange (version: string): string {

    const normalizedVersion: string = version.trim().toLowerCase().replace(/\*/g, "x");

    if ("x" === normalizedVersion || normalizedVersion.startsWith("x.")) {
        return "*";
    }

    const validRange: string | null = semver.validRange(normalizedVersion);

    if (null !== validRange) {
        return validRange;
    }

    const validVersion: string | null = semver.valid(normalizedVersion);

    if (null !== validVersion) {
        return validVersion;
    }

    return normalizedVersion;

}
