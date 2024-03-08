"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const downloadPublicPackageLastVersion_1 = __importDefault(require("./downloadpackage/downloadPublicPackageLastVersion"));
const downloadPrivatePackageLastVersion_1 = __importDefault(require("./downloadpackage/downloadPrivatePackageLastVersion"));
// private
// attributes
const _alreadyDownloaded = [];
// module
function downloadPackageData(packageName, npmrcFile) {
    const searchedModule = _alreadyDownloaded.filter((m) => {
        return m.name === packageName;
    }).shift();
    return "undefined" !== typeof searchedModule ? Promise.resolve(searchedModule.latestVersion) : new Promise((resolve, reject) => {
        (0, downloadPublicPackageLastVersion_1.default)(packageName).then(resolve).catch((err) => {
            (0, downloadPrivatePackageLastVersion_1.default)(packageName, npmrcFile).then(resolve).catch(() => {
                reject(err);
            });
        });
    }).then((latestVersion) => {
        _alreadyDownloaded.push({
            "name": packageName,
            "latestVersion": latestVersion
        });
        return latestVersion;
    });
}
exports.default = downloadPackageData;
