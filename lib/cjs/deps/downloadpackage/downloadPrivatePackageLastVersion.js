"use strict";
// deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = downloadPrivatePackageLastVersion;
// natives
const node_path_1 = require("node:path");
const promises_1 = require("node:fs/promises");
const node_os_1 = require("node:os");
const node_child_process_1 = require("node:child_process");
// module
function downloadPrivatePackageLastVersion(packageName, npmrcFile) {
    const packageDir = (0, node_path_1.join)((0, node_os_1.homedir)(), "check-version-modules-" + (Math.random() + 1).toString(36).substring(2));
    return (0, promises_1.mkdir)(packageDir, {
        "recursive": true
    }).then(() => {
        return "" !== npmrcFile ? (0, promises_1.copyFile)(npmrcFile, (0, node_path_1.join)(packageDir, (0, node_path_1.basename)(npmrcFile))) : Promise.resolve();
    }).then(() => {
        return new Promise((resolve, reject) => {
            (0, node_child_process_1.exec)("npm init --yes", {
                "cwd": packageDir,
                "windowsHide": true
            }, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }
                else if (stderr) {
                    reject(new Error(stderr));
                }
                else {
                    resolve();
                }
            });
        });
    }).then(() => {
        return new Promise((resolve, reject) => {
            (0, node_child_process_1.exec)("npm install " + packageName, {
                "cwd": packageDir,
                "windowsHide": true
            }, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                }
                else if (stderr) {
                    reject(new Error(stderr));
                }
                else {
                    resolve();
                }
            });
        });
    }).then(() => {
        return (0, promises_1.readFile)((0, node_path_1.join)(packageDir, "package.json"), "utf8");
    }).then((content) => {
        return "" === content.trim()
            ? Promise.reject(new Error("\"" + packageName + "\" registry does not return data"))
            : Promise.resolve(JSON.parse(content));
    }).then((parsedData) => {
        return "undefined" === typeof parsedData.dependencies
            ? Promise.reject(new Error("\"" + packageName + "\" installation does not get dependencies"))
            : Promise.resolve(parsedData.dependencies);
    }).then((deps) => {
        return !deps[packageName]
            ? Promise.reject(new Error("\"" + packageName + "\" installation does not get \"" + packageName + "\" dependency"))
            : Promise.resolve(deps[packageName].replace("^", "").replace("~", ""));
    }).then((data) => {
        return (0, promises_1.rm)(packageDir, {
            "recursive": true
        }).then(() => {
            return Promise.resolve(data);
        });
    }).catch((err) => {
        return (0, promises_1.rm)(packageDir, {
            "recursive": true
        }).then(() => {
            return Promise.reject(err);
        });
    });
}
