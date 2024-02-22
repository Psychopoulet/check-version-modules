"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const sortDeps_1 = __importDefault(require("./sortDeps"));
const downloadPackageData_1 = __importDefault(require("./downloadPackageData"));
const getFormatedTime_1 = __importDefault(require("../utils/getFormatedTime"));
const checkVersionValidity_1 = __importDefault(require("../version/checkVersionValidity"));
const checkAndFormateVersion_1 = __importDefault(require("../version/checkAndFormateVersion"));
// module
function checkDependenciesUpdates(dependencies, options) {
    let valid = true;
    const results = [];
    function _execute(deps) {
        if (!deps.length) {
            return Promise.resolve();
        }
        const dependency = deps.shift();
        return (0, checkVersionValidity_1.default)(dependency.version, false).then((runnable) => {
            if (!runnable) {
                results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": "warning", "message": "not managed " + dependency.version }));
            }
            return runnable;
        }).then((runCheck) => {
            return !runCheck ? Promise.resolve() : (0, checkAndFormateVersion_1.default)(dependency.version).then((formatedVersion) => {
                return (0, downloadPackageData_1.default)(dependency.name).then((latest) => {
                    const latestVersions = latest.split(".").map((v) => {
                        return parseInt(v, 10);
                    });
                    const currentVersions = formatedVersion.split(".").map((v) => {
                        return "x" === v ? v : parseInt(v, 10);
                    });
                    let failed = false;
                    return Promise.resolve().then(() => {
                        if (!failed && "x" !== currentVersions[0] && latestVersions[0] > currentVersions[0]) {
                            failed = true;
                            if (options.failAtMajor) {
                                valid = false;
                            }
                            results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": "fail_major", "message": dependency.version + " < " + latest }));
                        }
                    }).then(() => {
                        if (!failed && "x" !== currentVersions[1] && latestVersions[1] > currentVersions[1]) {
                            failed = true;
                            if (options.failAtMinor) {
                                valid = false;
                            }
                            results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": "fail_minor", "message": dependency.version + " < " + latest }));
                        }
                    }).then(() => {
                        if (!failed && "x" !== currentVersions[2] && latestVersions[2] > currentVersions[2]) {
                            failed = true;
                            if (options.failAtPatch) {
                                valid = false;
                            }
                            results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": "fail_patch", "message": dependency.version + " < " + latest }));
                        }
                    }).then(() => {
                        if (!failed) {
                            results.push(Object.assign(Object.assign({}, dependency), { "time": (0, getFormatedTime_1.default)(), "result": "success", "message": "Ok" }));
                        }
                    });
                });
            });
        }).then(() => {
            return _execute(deps);
        });
    }
    return _execute([...dependencies]).then(() => {
        return {
            "result": valid,
            "results": (0, sortDeps_1.default)(results)
        };
    });
}
exports.default = checkDependenciesUpdates;
