// deps

    // natives
    import { get } from "node:https";

// types & interfaces

    // natives
    import type { IncomingMessage } from "node:http";

    interface iModule {
        "name": string;
        "latestVersion": string;
    }

// private

    // attributes

        const _alreadyDownloaded: iModule[] = [];

// module

export default function downloadPackageData (packageName: string): Promise<string> {

    const searchedModule: iModule | undefined = _alreadyDownloaded.filter((m: iModule): boolean => {
        return m.name === packageName;
    }).shift();

    return "undefined" !== typeof searchedModule ? Promise.resolve(searchedModule.latestVersion) : new Promise((resolve: (content: string) => void, reject: (err: Error) => void): void => {

        get("https://registry.npmjs.org/" + packageName, (res: IncomingMessage): void => {

            if (200 !== res.statusCode) {
                res.resume();
                reject(new Error("Impossible to join \"" + packageName + "\" registry"));
            }
            else {

                res.setEncoding("utf8");

                let rawData = "";
                res.on("data", (chunk) => {
                    rawData += chunk;
                }).on("end", () => {
                    resolve(rawData);
                });

            }

        }).on("error", reject);

    }).then((data: string): Promise<Record<string, any>> => {

        return "" === data.trim()
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not return data"))
            : Promise.resolve(JSON.parse(data));

    }).then((data: Record<string, any>): Promise<string> => {

        const distTags: Record<string, any> | undefined = data["dist-tags"] as Record<string, any> | undefined;

        return "string" !== typeof distTags?.latest
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not return latest version"))
            : Promise.resolve(distTags.latest);

    }).then((latestVersion: string): string => {

        _alreadyDownloaded.push({
            "name": packageName,
            "latestVersion": latestVersion
        });

        return latestVersion;

    });

}
