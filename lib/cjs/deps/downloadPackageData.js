"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const node_https_1 = require("node:https");
;
// private
// attributes
const _alreadyDownloaded = [];
// module
function downloadPackageData(packageName) {
    const searchedModule = _alreadyDownloaded.filter((m) => {
        return m.name === packageName;
    })[0] || null;
    return searchedModule ? Promise.resolve(searchedModule.latestVersion) : new Promise((resolve, reject) => {
        (0, node_https_1.get)("https://registry.npmjs.org/" + packageName, (res) => {
            if (200 !== res.statusCode) {
                res.resume();
                reject(new Error("Impossible to join \"" + packageName + "\" registry"));
            }
            else {
                res.setEncoding("utf8");
                let rawData = "";
                res.on("data", function requestData(chunk) {
                    rawData += chunk;
                }).on("end", function requestEnd() {
                    resolve(rawData);
                });
            }
        }).on("error", reject);
    }).then((data) => {
        return "" === data.trim() ?
            Promise.reject(new Error("\"" + packageName + "\" registry does not return data")) :
            Promise.resolve(JSON.parse(data));
    }).then((data) => {
        return !data["dist-tags"] || !data["dist-tags"].latest ?
            Promise.reject(new Error("\"" + packageName + "\" registry does not return latest version")) :
            Promise.resolve(data["dist-tags"].latest);
    }).then((latestVersion) => {
        _alreadyDownloaded.push({
            "name": packageName,
            "latestVersion": latestVersion
        });
        return latestVersion;
    });
}
exports.default = downloadPackageData;
;
