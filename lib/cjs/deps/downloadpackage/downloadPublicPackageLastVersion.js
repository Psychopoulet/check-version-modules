"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = downloadPublicPackageLastVersion;
// natives
const node_https_1 = require("node:https");
// consts
const DEFAULT_REGISTRY_TIMEOUT_MS = 30000;
// module
function downloadPublicPackageLastVersion(packageName) {
    return new Promise((resolve, reject) => {
        const req = (0, node_https_1.get)("https://registry.npmjs.org/" + packageName, (res) => {
            clearTimeout(timeoutId);
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
                    clearTimeout(timeoutId);
                    resolve(rawData);
                });
            }
        });
        const timeoutId = setTimeout(() => {
            req.destroy(new Error("Registry request timeout"));
        }, DEFAULT_REGISTRY_TIMEOUT_MS);
        req.on("error", (err) => {
            clearTimeout(timeoutId);
            reject(err);
        });
    }).then((content) => {
        return "" === content.trim()
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not return data"))
            : Promise.resolve(JSON.parse(content));
    }).then((parsedData) => {
        return "undefined" === typeof parsedData["dist-tags"]
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not get dist-tags"))
            : Promise.resolve(parsedData["dist-tags"]);
    }).then((deps) => {
        return "string" !== typeof deps.latest
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not return latest version"))
            : Promise.resolve(deps.latest);
    });
}
