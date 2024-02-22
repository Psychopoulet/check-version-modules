export default function formateVersion (_version: string): string {

    const version: string = _version.trim().toLowerCase().replace(/\*/gm, "x");

    const versions: Array<string | number> = version.replace("^", "").replace("~", "").split(".").map((v: string): string | number => {
        return "x" === v ? "x" : parseInt(v, 10);
    });

    // "x", "x.n", "x.n.n"
    if ("x" === versions[0]) {
        return "x.x.x";
    }

    // "n"
    else if (1 === versions.length) {
        return version + ".x.x";
    }

    // "n.n"
    else if (2 === versions.length) {
        return version + ".x";
    }

    // "n.n.n"
    else if (3 === versions.length) {

        // "^"
        if ("^" === version[0]) {

            versions[1] = "x";
            versions[2] = "x";

            return versions.join(".");

        }

        // artifact
        else if ("~" === version[0]) {

            versions[2] = "x";

            return versions.join(".");

        }

        // "n.n.n"
        else {
            return version;
        }

    }

    // wtf ?
    else {
        return version;
    }

}
