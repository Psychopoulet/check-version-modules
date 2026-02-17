"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = downloadPackageData;
// locals
const downloadPublicPackageLastVersion_1 = __importDefault(require("./downloadpackage/downloadPublicPackageLastVersion"));
const downloadPrivatePackageLastVersion_1 = __importDefault(require("./downloadpackage/downloadPrivatePackageLastVersion"));
// private
// attributes
const _alreadyDownloaded = new Map();
// module
function downloadPackageData(packageName, npmrcFile) {
    if (_alreadyDownloaded.has(packageName)) {
        return Promise.resolve(_alreadyDownloaded.get(packageName).latestVersion);
    }
    return new Promise((resolve, reject) => {
        (0, downloadPublicPackageLastVersion_1.default)(packageName).then(resolve).catch((err) => {
            (0, downloadPrivatePackageLastVersion_1.default)(packageName, npmrcFile).then(resolve).catch(() => {
                return reject(err);
            });
        });
    }).then((latestVersion) => {
        _alreadyDownloaded.set(packageName, {
            "name": packageName,
            "latestVersion": latestVersion
        });
        return latestVersion;
    });
}
