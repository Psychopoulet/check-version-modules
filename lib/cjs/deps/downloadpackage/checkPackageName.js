"use strict";
// module
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkPackageName;
function checkPackageName(packageName) {
    if ("string" !== typeof packageName) {
        return Promise.reject(new Error("Package name is not a string"));
    }
    else if ("" === packageName.trim()) {
        return Promise.reject(new Error("Package name is empty"));
    }
    const s = packageName.trim();
    if (-1 < s.indexOf("..")
        || -1 < s.indexOf("\\")
        || /\r|\n/.test(s)) {
        return Promise.reject(new Error("Invalid package name \"" + packageName + "\" (forbidden: empty, \"..\", \"/\", \"\\\\\", newlines)"));
    }
    return Promise.resolve();
}
