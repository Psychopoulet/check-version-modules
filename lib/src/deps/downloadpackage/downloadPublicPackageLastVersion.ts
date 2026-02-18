// deps

    // natives
    import { get } from "node:https";

// types & interfaces

    // natives
    import type { IncomingMessage } from "node:http";

    // locals
    type iPackageData = Record<string, object | string | number | boolean>;
    type iDependencies = Record<string, string>;

// private

    function _isValidPackageName (name: string): boolean {

        const s: string = name.trim();
        return -1 === s.indexOf("..")
            && -1 === s.indexOf("\\")
            && !/\r|\n/.test(s);

    }

// module

export default function downloadPublicPackageLastVersion (packageName: string): Promise<string> {

    if ("string" !== typeof packageName) {
        return Promise.reject(new Error("Package name is not a string"));
    }
    else if ("" === packageName.trim()) {
        return Promise.reject(new Error("Package name is empty"));
    }
    else if (!_isValidPackageName(packageName)) {
        return Promise.reject(new Error("Invalid package name \"" + packageName + "\" (forbidden: empty, \"..\", \"/\", \"\\\\\", newlines)"));
    }

    return new Promise((resolve: (content: string) => void, reject: (err: Error) => void): void => {

        get("https://registry.npmjs.org/" + packageName, (res: IncomingMessage): void => {

            if (200 !== res.statusCode) {

                res.resume();

                reject(new Error("Impossible to join \"" + packageName + "\" registry"));

            }
            else {

                res.setEncoding("utf8");

                let rawData: string = "";
                res.on("data", (chunk: string): void => {
                    rawData += chunk;
                }).on("end", (): void => {
                    resolve(rawData);
                });

            }

        }).on("error", reject);

    }).then((content: string) : Promise<iPackageData> => {

        return "" === content.trim()
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not return data"))
            : Promise.resolve(JSON.parse(content) as iPackageData);

    }).then((parsedData: iPackageData): Promise<iDependencies> => {

        return "undefined" === typeof parsedData["dist-tags"]
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not get dist-tags"))
            : Promise.resolve(parsedData["dist-tags"] as iDependencies);

    }).then((deps: iDependencies): Promise<string> => {

        return "string" !== typeof deps.latest
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not return latest version"))
            : Promise.resolve(deps.latest);

    });

}
