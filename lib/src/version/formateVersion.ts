export default function formateVersion (_version: string): string {

    const normalizedVersion: string = _version.trim().toLowerCase().replace(/\*/gm, "x");

    const segments: Array<string | number> = normalizedVersion.replace("^", "").replace("~", "").split(".").map((v: string): string | number => {
        return "x" === v ? "x" : parseInt(v, 10);
    });

    // "x", "x.n", "x.n.n"
    if ("x" === segments[0]) {
        return "x.x.x";
    }

    // "n"
    else if (1 === segments.length) {
        return normalizedVersion + ".x.x";
    }

    // "n.n"
    else if (2 === segments.length) {
        return normalizedVersion + ".x";
    }

    // "n.n.n"
    else if (3 === segments.length) {

        // "^"
        if ("^" === normalizedVersion[0]) {

            segments[1] = "x";
            segments[2] = "x";

            return segments.join(".");

        }

        // artifact
        else if ("~" === normalizedVersion[0]) {

            segments[2] = "x";

            return segments.join(".");

        }

        // "n.n.n"
        else {
            return normalizedVersion;
        }

    }

    // wtf ?
    else {
        return normalizedVersion;
    }

}
