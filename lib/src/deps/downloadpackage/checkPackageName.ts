// module

export default function checkPackageName (packageName: string): Promise<void> {

    if ("string" !== typeof packageName) {
        return Promise.reject(new Error("Package name is not a string"));
    }
    else if ("" === packageName.trim()) {
        return Promise.reject(new Error("Package name is empty"));
    }

    const s: string = packageName.trim();
    if (-1 < s.indexOf("..")
        || -1 < s.indexOf("\\")
        || /\r|\n/.test(s)) {
        return Promise.reject(new Error("Invalid package name \"" + packageName + "\" (forbidden: empty, \"..\", \"/\", \"\\\\\", newlines)"));
    }

    return Promise.resolve();

}
