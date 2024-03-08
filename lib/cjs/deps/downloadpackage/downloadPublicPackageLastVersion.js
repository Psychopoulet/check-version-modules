"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
// natives
const node_https_1 = require("node:https");
// module
function downloadPublicPackageLastVersion(packageName) {
    return new Promise((resolve, reject) => {
        (0, node_https_1.get)("https://registry.npmjs.org/" + packageName, (res) => {
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
exports.default = downloadPublicPackageLastVersion;
