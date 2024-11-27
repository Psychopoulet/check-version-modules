// deps

    // natives
    import { get } from "node:https";

// types & interfaces

    // natives
    import type { IncomingMessage } from "node:http";

    // locals
    type iPackageData = Record<string, object | string | number | boolean>;
    type iDependencies = Record<string, string>;

// module

export default function downloadPublicPackageLastVersion (packageName: string): Promise<string> {

    return new Promise((resolve: (content: string) => void, reject: (err: Error) => void): undefined => {

        get("https://registry.npmjs.org/" + packageName, (res: IncomingMessage): undefined => {

            if (200 !== res.statusCode) {

                res.resume();

                reject(new Error("Impossible to join \"" + packageName + "\" registry"));

            }
            else {

                res.setEncoding("utf8");

                let rawData: string = "";
                res.on("data", (chunk: string): undefined => {
                    rawData += chunk;
                }).on("end", (): undefined => {
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
