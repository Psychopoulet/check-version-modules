"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formateVersion;
function formateVersion(_version) {
    const normalizedVersion = _version.trim().toLowerCase().replace(/\*/gm, "x");
    const segments = normalizedVersion.replace("^", "").replace("~", "").split(".").map((v) => {
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
